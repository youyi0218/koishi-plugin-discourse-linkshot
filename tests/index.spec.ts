import { App } from 'koishi'
import mock from '@koishijs/plugin-mock'
import { mock as jest } from 'node:test'
import { expect } from 'chai'
import {
  createBrowserLaunchOptions,
  createDiscourseCookies,
  createDiscourseCookiesForOrigins,
  createLinkshotMiddleware,
  createTopicJsonUrl,
  createTopicPageJsonUrl,
  detectUnexpectedDiscourseRoute,
  extractRequestedPostNumber,
  extractTCookie,
  extractUrls,
  getCookieOrigin,
  getCookieOrigins,
  getPostLikeCount,
  matchesForumOrigin,
  normalizeTopicUrl,
  PlaywrightDiscourseRenderer,
  resolveCategoryLabel,
  resolveConfig,
  rewriteUrlWithFrontProxy,
  type SnapshotRenderer,
} from '../src'

describe('@koishijs/plugin-discourse-linkshot helpers', () => {
  it('extracts and trims urls', () => {
    expect(extractUrls('check https://forum.example.com/t/topic/1).'))
      .to.deep.equal(['https://forum.example.com/t/topic/1'])
  })

  it('extracts _t cookie value from raw input', () => {
    expect(extractTCookie('token-value')).to.equal('token-value')
    expect(extractTCookie('_forum_session=abc; _t=token-value; theme_id=1')).to.equal('token-value')
    expect(extractTCookie('_t=token-value')).to.equal('token-value')
  })

  it('creates discourse auth cookies from _t', () => {
    expect(createDiscourseCookies('token-value', 'https://forum.example.com'))
      .to.deep.equal([
        { name: '_t', value: 'token-value', url: 'https://forum.example.com' },
      ])
  })

  it('creates discourse auth cookies from a full cookie header', () => {
    expect(createDiscourseCookies('_forum_session=abc; _t=token-value; cf_clearance=xyz', 'https://forum.example.com'))
      .to.deep.equal([
        { name: '_forum_session', value: 'abc', url: 'https://forum.example.com' },
        { name: '_t', value: 'token-value', url: 'https://forum.example.com' },
        { name: 'cf_clearance', value: 'xyz', url: 'https://forum.example.com' },
      ])
  })

  it('creates discourse auth cookies for every configured access origin', () => {
    const resolved = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      frontProxyEnabled: true,
      frontProxyOrigin: 'https://proxy.example.com',
      tCookie: 'token-value',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    })

    expect(getCookieOrigins(resolved, 'https://proxy.example.com/t/topic/1'))
      .to.deep.equal(['https://forum.example.com', 'https://proxy.example.com'])
    expect(createDiscourseCookiesForOrigins('token-value', getCookieOrigins(resolved, 'https://proxy.example.com/t/topic/1')))
      .to.deep.equal([
        { name: '_t', value: 'token-value', url: 'https://forum.example.com' },
        { name: '_t', value: 'token-value', url: 'https://proxy.example.com' },
      ])
  })

  it('normalizes proxy settings', () => {
    expect(resolveConfig({
      forumOrigin: 'https://forum.example.com',
      tCookie: 'token-value',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      proxyServer: ' http://127.0.0.1:7890 ',
      proxyBypass: ' localhost,127.0.0.1 ',
    })).to.include({
      proxyServer: 'http://127.0.0.1:7890',
      proxyBypass: 'localhost,127.0.0.1',
    })
  })

  it('supports front proxy and browser proxy at the same time', () => {
    const resolved = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      frontProxyEnabled: true,
      frontProxyOrigin: ' https://front-proxy.example.com/base/ignored?x=1 ',
      tCookie: 'token-value',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      proxyServer: ' http://127.0.0.1:7890 ',
      proxyBypass: ' localhost,127.0.0.1 ',
    })

    expect(resolved.frontProxyEnabled).to.equal(true)
    expect(resolved.frontProxyOrigin).to.equal('https://front-proxy.example.com')
    expect(getCookieOrigin(resolved)).to.equal('https://front-proxy.example.com')
    expect(rewriteUrlWithFrontProxy('https://forum.example.com/t/topic/1?a=1#reply', resolved.forumOrigin, resolved.frontProxyOrigin, resolved.frontProxyEnabled))
      .to.equal('https://front-proxy.example.com/t/topic/1?a=1#reply')
    expect(createBrowserLaunchOptions(resolved).proxy).to.deep.equal({
      server: 'http://127.0.0.1:7890',
      bypass: 'localhost,127.0.0.1',
    })
    expect(createBrowserLaunchOptions(resolved, false).proxy).to.equal(undefined)
  })

  it('supports simplified doh config', () => {
    const resolved = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      dohEnabled: true,
      dohTemplates: ' https://dns.google/dns-query https://cloudflare-dns.com/dns-query ',
    })

    expect(resolved.dohEnabled).to.equal(true)
    expect(resolved.dohTemplates).to.equal('https://dns.google/dns-query https://cloudflare-dns.com/dns-query')
    expect(createBrowserLaunchOptions(resolved).args).to.include('--dns-over-https-mode=secure')
    expect(createBrowserLaunchOptions(resolved).args).to.include('--dns-over-https-templates=https://dns.google/dns-query https://cloudflare-dns.com/dns-query')
  })

  it('uses automatic doh mode when enabled without custom template', () => {
    const resolved = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      dohEnabled: true,
    })

    expect(createBrowserLaunchOptions(resolved).args).to.include('--dns-over-https-mode=automatic')
  })

  it('adds docker-friendly software rendering launch args', () => {
    const resolved = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    })

    expect(createBrowserLaunchOptions(resolved).args).to.include('--disable-vulkan')
    expect(createBrowserLaunchOptions(resolved).args).to.include('--use-gl=swiftshader')
  })

  it('supports browser timeout and disable-timeout mode', () => {
    const normal = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      browserTimeout: 45000,
    })
    const disabled = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      browserTimeout: 0,
    })

    expect(createBrowserLaunchOptions(normal).timeout).to.equal(45000)
    expect(createBrowserLaunchOptions(disabled).timeout).to.equal(0)
  })

  it('defaults page wait mode to domcontentloaded and supports overriding it', () => {
    const normal = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    })
    const custom = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      pageWaitUntil: 'load',
    })

    expect(normal.pageWaitUntil).to.equal('domcontentloaded')
    expect(custom.pageWaitUntil).to.equal('load')
  })

  it('supports closeBrowserAfterCapture config', () => {
    const resolved = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      closeBrowserAfterCapture: true,
    })

    expect(resolved.closeBrowserAfterCapture).to.equal(true)
  })

  it('launches isolated browsers when closeBrowserAfterCapture is enabled', async () => {
    const resolved = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      closeBrowserAfterCapture: true,
    })
    const renderer = new PlaywrightDiscourseRenderer(resolved) as any
    const firstBrowser = { close: jest.fn(async () => {}) }
    const secondBrowser = { close: jest.fn(async () => {}) }
    let launchCount = 0
    const launch = jest.fn(async () => (++launchCount === 1 ? firstBrowser : secondBrowser))
    renderer.launch = launch

    const first = await renderer.getBrowser(false)
    const second = await renderer.getBrowser(false)

    expect(first).to.equal(firstBrowser)
    expect(second).to.equal(secondBrowser)
    expect(first).to.not.equal(second)
    expect(renderer.directBrowserTask).to.equal(undefined)
    expect(launch.mock.calls).to.have.length(2)
  })

  it('supports legacy cookieHeader as fallback source for _t', () => {
    const resolved = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      cookieHeader: '_forum_session=abc; _t=token-from-header; theme_id=1',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    })

    expect(resolved.tCookie).to.equal('token-from-header')
  })

  it('matches urls that start with forumOrigin', () => {
    const resolved = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      tCookie: 'token-value',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    })

    expect(matchesForumOrigin('https://forum.example.com/t/topic/1', resolved)).to.equal(true)
    expect(matchesForumOrigin('https://forum.example.com?from=share', resolved)).to.equal(true)
    expect(matchesForumOrigin('https://forum.example.com#reply-1', resolved)).to.equal(true)
    expect(matchesForumOrigin('https://sub.forum.example.com/t/topic/1', resolved)).to.equal(false)
  })

  it('normalizes topic urls to the op floor', () => {
    expect(normalizeTopicUrl('https://forum.example.com/t/topic/1790348/41', 'https://forum.example.com'))
      .to.equal('https://forum.example.com/t/topic/1790348/1')
    expect(normalizeTopicUrl('https://forum.example.com/t/topic/1790348', 'https://forum.example.com'))
      .to.equal('https://forum.example.com/t/topic/1790348/1')
  })

  it('extracts requested post numbers from path and hash', () => {
    expect(extractRequestedPostNumber('https://forum.example.com/t/topic/1790348/41')).to.equal(41)
    expect(extractRequestedPostNumber('https://forum.example.com/t/topic/1790348#post_9')).to.equal(9)
    expect(extractRequestedPostNumber('https://forum.example.com/t/topic/1790348')).to.equal(1)
  })

  it('creates topic json urls', () => {
    const resolved = resolveConfig({
      forumOrigin: 'https://forum.example.com',
      tCookie: 'token-value',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    })

    expect(createTopicJsonUrl('https://forum.example.com/t/topic/1790348/41', resolved))
      .to.equal('https://forum.example.com/t/topic/1790348.json?print=true')
    expect(createTopicPageJsonUrl('https://forum.example.com/t/topic/1790348/41', resolved, 3))
      .to.equal('https://forum.example.com/t/topic/1790348.json?page=3')
  })

  it('detects redirect routes that should stop capture instead of parsing search pages', () => {
    expect(detectUnexpectedDiscourseRoute('https://forum.example.com/search?q=1790348', 'https://forum.example.com/t/topic/1790348/1'))
      .to.equal('\u9875\u9762\u8df3\u5230\u4e86\u641c\u7d22\u9875\uff0c\u672a\u83b7\u53d6\u5230\u76ee\u6807\u5e16\u5b50\u3002')
    expect(detectUnexpectedDiscourseRoute('https://forum.example.com/login', 'https://forum.example.com/t/topic/1790348/1'))
      .to.equal('\u9875\u9762\u8df3\u5230\u4e86\u767b\u5f55\u9875\uff0c\u767b\u5f55\u72b6\u6001\u53ef\u80fd\u672a\u751f\u6548\u3002')
    expect(detectUnexpectedDiscourseRoute('https://forum.example.com/t/topic/1790348/1', 'https://forum.example.com/t/topic/1790348/1'))
      .to.equal('')
  })

  it('resolves like counts and category labels', () => {
    expect(getPostLikeCount({ like_count: 2, actions_summary: [{ id: 2, count: 9 }] })).to.equal(9)
    expect(getPostLikeCount({ like_count: 2 })).to.equal(2)
    expect(resolveCategoryLabel(2, {
      categories: [
        { id: 1, name: 'Develop' },
        { id: 2, name: 'Plugins', parent_category_id: 1 },
      ],
    })).to.equal('Develop / Plugins')
  })
})

describe('@koishijs/plugin-discourse-linkshot middleware', () => {
  const app = new App()
  app.plugin(mock)

  const capture = jest.fn<SnapshotRenderer['capture']>(async () => Buffer.from('png-data'))
  const renderer: SnapshotRenderer = { capture }
  const config = resolveConfig({
    forumOrigin: 'https://forum.example.com',
    tCookie: 'token-value',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  })

  app.middleware(createLinkshotMiddleware(config, renderer, app.logger('test')))

  const client = app.mock.client('123')

  before(() => app.start())

  it('sends snapshot when a matching link appears', async () => {
    capture.mock.resetCalls()
    await client.shouldReply('check https://forum.example.com/t/topic/1', '<img src="data:image/png;base64,cG5nLWRhdGE="/>')
    expect(capture.mock.calls).to.have.length(1)
    expect(capture.mock.calls[0].arguments).to.deep.equal(['https://forum.example.com/t/topic/1', { authenticated: false, useProxy: false }])
  })

  it('ignores unrelated hosts', async () => {
    capture.mock.resetCalls()
    await client.shouldNotReply('https://example.com/post/1')
    expect(capture.mock.calls).to.have.length(0)
  })

  it('retries without proxy after proxy failure', async () => {
    const retryApp = new App()
    retryApp.plugin(mock)
    const retryCapture = jest.fn<SnapshotRenderer['capture']>(async (_url, options) => {
      if (options?.useProxy) throw new Error('proxy down')
      return Buffer.from('png-data')
    })
    retryApp.middleware(createLinkshotMiddleware(resolveConfig({
      forumOrigin: 'https://forum.example.com',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      proxyServer: 'http://127.0.0.1:7890',
    }), { capture: retryCapture }, retryApp.logger('retry')))

    const retryClient = retryApp.mock.client('456')
    await retryApp.start()

    await retryClient.shouldReply('check https://forum.example.com/t/topic/1', [
      '\u4ee3\u7406\u8bbf\u95ee\u5931\u8d25\uff0c\u6b63\u5728\u76f4\u8fde\u91cd\u8bd5\uff1ahttps://forum.example.com/t/topic/1',
      '<img src="data:image/png;base64,cG5nLWRhdGE="/>'
    ])
    expect(retryCapture.mock.calls.map((call) => call.arguments)).to.deep.equal([
      ['https://forum.example.com/t/topic/1', { authenticated: false, useProxy: true }],
      ['https://forum.example.com/t/topic/1', { authenticated: false, useProxy: false }],
    ])

    await retryApp.stop()
  })

  it('does not send intermediate text when public retry succeeds with auth', async () => {
    const retryApp = new App()
    retryApp.plugin(mock)
    const retryCapture = jest.fn<SnapshotRenderer['capture']>(async (_url, options) => {
      if (!options?.authenticated) throw new Error('public denied')
      return Buffer.from('png-data')
    })
    retryApp.middleware(createLinkshotMiddleware(resolveConfig({
      forumOrigin: 'https://forum.example.com',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      tCookie: 'token-value',
    }), { capture: retryCapture }, retryApp.logger('retry-auth-success')))

    const retryClient = retryApp.mock.client('789')
    await retryApp.start()

    await retryClient.shouldReply('check https://forum.example.com/t/topic/1', '<img src="data:image/png;base64,cG5nLWRhdGE="/>')
    expect(retryCapture.mock.calls.map((call) => call.arguments)).to.deep.equal([
      ['https://forum.example.com/t/topic/1', { authenticated: false, useProxy: false }],
      ['https://forum.example.com/t/topic/1', { authenticated: true, useProxy: false }],
    ])

    await retryApp.stop()
  })

  it('returns only final error after public and auth both fail', async () => {
    const retryApp = new App()
    retryApp.plugin(mock)
    const retryCapture = jest.fn<SnapshotRenderer['capture']>(async (_url, options) => {
      if (!options?.authenticated) throw new Error('public denied')
      throw new Error('auth denied')
    })
    retryApp.middleware(createLinkshotMiddleware(resolveConfig({
      forumOrigin: 'https://forum.example.com',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      tCookie: 'token-value',
    }), { capture: retryCapture }, retryApp.logger('retry-auth')))

    const retryClient = retryApp.mock.client('790')
    await retryApp.start()

    await retryClient.shouldReply('check https://forum.example.com/t/topic/1', '\u8bba\u575b\u94fe\u63a5\u622a\u56fe\u5931\u8d25\uff1ahttps://forum.example.com/t/topic/1\n\u516c\u5f00\uff1apublic denied\n\u767b\u5f55\uff1aauth denied')
    expect(retryCapture.mock.calls.map((call) => call.arguments)).to.deep.equal([
      ['https://forum.example.com/t/topic/1', { authenticated: false, useProxy: false }],
      ['https://forum.example.com/t/topic/1', { authenticated: true, useProxy: false }],
    ])

    await retryApp.stop()
  })
})

