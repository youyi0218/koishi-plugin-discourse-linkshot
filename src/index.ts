import { Context, h, Logger, Middleware, Schema, Session } from 'koishi'

const TEXT = {
  enabled: '\u662f\u5426\u542f\u7528\u8bba\u575b\u94fe\u63a5\u622a\u56fe\u529f\u80fd\u3002',
  platforms: '\u4ec5\u5728\u8fd9\u4e9b\u5e73\u53f0\u4e0a\u751f\u6548\uff1b\u7559\u7a7a\u8868\u793a\u6240\u6709\u5e73\u53f0\u3002',
  forumOrigin: '\u8bba\u575b\u4e3b\u7ad9\u5730\u5740\uff0c\u4f8b\u5982 https://forum.example.com',
  frontProxyEnabled: '\u662f\u5426\u542f\u7528\u8bbf\u95ee\u8bba\u575b\u7684\u524d\u7f6e\u57df\u4ee3\u7406\uff0c\u53ef\u4e0e proxyServer \u540c\u65f6\u5f00\u542f\u3002',
  frontProxyOrigin: '\u524d\u7f6e\u57df\u4ee3\u7406\u5730\u5740\uff0c\u4f8b\u5982 https://forum-proxy.example.com\uff1b\u542f\u7528\u540e\u4f1a\u628a forumOrigin \u7684\u94fe\u63a5\u6539\u5199\u5230\u8fd9\u91cc\u8bbf\u95ee\u3002',
  allowedHosts: '\u5141\u8bb8\u89e6\u53d1\u622a\u56fe\u7684\u57df\u540d\u5217\u8868\uff1b\u4e3a\u7a7a\u65f6\u4f1a\u81ea\u52a8\u5305\u542b forumOrigin \u5bf9\u5e94\u57df\u540d\u3002',
  allowSubdomains: '\u662f\u5426\u5141\u8bb8\u5339\u914d\u4e0a\u8ff0\u57df\u540d\u7684\u5b50\u57df\u540d\u3002',
  tCookie: '\u767b\u5f55 Cookie \u4e2d _t \u7684\u503c\uff1b\u65e2\u53ef\u4ee5\u76f4\u63a5\u586b _t \u7684\u5185\u5bb9\uff0c\u4e5f\u53ef\u4ee5\u7c98\u8d34\u5b8c\u6574 Cookie \u5934\uff0c\u63d2\u4ef6\u4f1a\u81ea\u52a8\u63d0\u53d6 _t \u5e76\u4e00\u5e76\u6ce8\u5165\u5176\u4ed6 Cookie\u3002',
  executablePath: '\u6d4f\u89c8\u5668\u53ef\u6267\u884c\u6587\u4ef6\u8def\u5f84\uff0c\u586b\u5199\u672c\u673a Chrome / Edge \u7684\u5b8c\u6574\u8def\u5f84\u3002',
  userAgent: '\u622a\u56fe\u8bbf\u95ee\u8bba\u575b\u65f6\u4f7f\u7528\u7684 User-Agent\u3002',
  navigationTimeout: '\u63a5\u53e3\u8bf7\u6c42\u3001\u7d20\u6750\u52a0\u8f7d\u4e0e\u622a\u56fe\u7684\u8d85\u65f6\u65f6\u95f4\uff08\u6beb\u79d2\uff09\u3002',
  captureDelay: '\u751f\u6210\u622a\u56fe\u524d\u989d\u5916\u7b49\u5f85\u7684\u65f6\u95f4\uff08\u6beb\u79d2\uff09\uff0c\u7528\u4e8e\u7b49\u5f85\u56fe\u7247\u8d44\u6e90\u5b8c\u6210\u52a0\u8f7d\u3002',
  viewportWidth: '\u622a\u56fe\u6d4f\u89c8\u5668\u89c6\u53e3\u5bbd\u5ea6\u3002',
  viewportHeight: '\u622a\u56fe\u6d4f\u89c8\u5668\u89c6\u53e3\u9ad8\u5ea6\u3002',
  headless: '\u662f\u5426\u4ee5\u65e0\u5934\u6a21\u5f0f\u542f\u52a8\u6d4f\u89c8\u5668\u3002',
  sendFailureMessage: '\u622a\u56fe\u5931\u8d25\u65f6\uff0c\u662f\u5426\u5728\u804a\u5929\u4e2d\u53d1\u9001\u5931\u8d25\u63d0\u793a\u3002',
  publicRetryMessage: '\u516c\u5f00\u8bbf\u95ee\u5931\u8d25\uff0c\u6b63\u5728\u91cd\u8bd5\uff1a',
  authMissingMessage: '\u672a\u914d\u7f6e\u767b\u5f55\u4fe1\u606f\uff0c\u65e0\u6cd5\u7ee7\u7eed\u91cd\u8bd5\u3002',
  publicErrorLabel: '\u516c\u5f00',
  authErrorLabel: '\u767b\u5f55',
  proxyRetryMessage: '\u4ee3\u7406\u8bbf\u95ee\u5931\u8d25\uff0c\u6b63\u5728\u76f4\u8fde\u91cd\u8bd5\uff1a',
  proxyErrorLabel: '\u4ee3\u7406',
  directErrorLabel: '\u76f4\u8fde',
  proxyServer: '\u6d4f\u89c8\u5668\u4ee3\u7406\u5730\u5740\uff0c\u4f8b\u5982 http://127.0.0.1:7890 \u6216 socks5://127.0.0.1:1080\u3002',
  proxyBypass: '\u4ee3\u7406\u7ed5\u8fc7\u5217\u8868\uff0c\u591a\u4e2a\u503c\u7528\u9017\u53f7\u5206\u9694\uff0c\u4f8b\u5982 localhost,127.0.0.1\u3002',
  dohEnabled: '\u662f\u5426\u5f00\u542f DoH\uff08Secure DNS\uff09\u3002',
  dohTemplates: '\u81ea\u5b9a\u4e49 DoH \u5730\u5740\uff0c\u4f8b\u5982 https://dns.google/dns-query \uff1b\u591a\u4e2a\u5730\u5740\u7528\u7a7a\u683c\u5206\u9694\u3002',
  configIncomplete: '\u63d2\u4ef6\u5c1a\u672a\u5b8c\u6210\u914d\u7f6e\uff1a\u81f3\u5c11\u9700\u8981\u586b\u5199 forumOrigin\u3001executablePath\uff1b\u5982\u679c\u542f\u7528\u4e86\u524d\u7f6e\u57df\u4ee3\u7406\uff0c\u8fd8\u9700\u8981\u586b\u5199 frontProxyOrigin\u3002',
  listenAll: '\u5df2\u542f\u7528\u8bba\u575b\u94fe\u63a5\u76d1\u542c\uff0c\u5c06\u76d1\u542c\u6240\u6709\u9002\u914d\u5668\uff1b\u5339\u914d\u524d\u7f00\uff1a',
  listenPlatforms: '\u5df2\u542f\u7528\u8bba\u575b\u94fe\u63a5\u76d1\u542c\uff0c\u4ec5\u5728\u8fd9\u4e9b\u5e73\u53f0\u751f\u6548\uff1a',
  detected: '\u76d1\u542c\u5230\u8bba\u575b\u94fe\u63a5\uff1a',
  success: '\u8bba\u575b\u5feb\u7167\u53d1\u9001\u6210\u529f\uff1a',
  failure: '\u8bba\u575b\u5feb\u7167\u53d1\u9001\u5931\u8d25\uff1a',
  failureMessage: '\u8bba\u575b\u94fe\u63a5\u622a\u56fe\u5931\u8d25\uff1a',
} as const

const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
const URL_REGEXP = /https?:\/\/[^\s<>"']+/giu
const TRAILING_PUNCTUATION = /[),.;!?]+$/u
const DEFAULT_TIMEOUT = 30000
const DEFAULT_DELAY = 1200
const DISCOURSE_PAGE_SIZE = 20
const DEFAULT_AVATAR_SIZE = 96

export const name = 'discourse-linkshot'

export interface Config {
  enabled?: boolean
  platforms?: string[]
  forumOrigin?: string
  frontProxyEnabled?: boolean
  frontProxyOrigin?: string
  allowedHosts?: string[]
  allowSubdomains?: boolean
  tCookie?: string
  cookieHeader?: string
  executablePath?: string
  userAgent?: string
  navigationTimeout?: number
  captureDelay?: number
  viewportWidth?: number
  viewportHeight?: number
  headless?: boolean
  sendFailureMessage?: boolean
  proxyServer?: string
  proxyBypass?: string
  dohEnabled?: boolean
  dohTemplates?: string
}

export interface ResolvedConfig {
  enabled: boolean
  platforms: string[]
  forumOrigin: string
  frontProxyEnabled: boolean
  frontProxyOrigin: string
  allowedHosts: string[]
  allowSubdomains: boolean
  tCookie: string
  authCookieSource: string
  executablePath: string
  userAgent: string
  navigationTimeout: number
  captureDelay: number
  viewportWidth: number
  viewportHeight: number
  headless: boolean
  sendFailureMessage: boolean
  proxyServer: string
  proxyBypass: string
  dohEnabled: boolean
  dohTemplates: string
}

interface BrowserCookie {
  name: string
  value: string
  url: string
}

interface BrowserPage {
  goto(url: string, options: { waitUntil: 'domcontentloaded' | 'load' | 'networkidle'; timeout: number }): Promise<unknown>
  url(): string
  setContent(html: string, options: { waitUntil: 'domcontentloaded' | 'load' | 'networkidle'; timeout: number }): Promise<void>
  waitForTimeout(timeout: number): Promise<void>
  evaluate<R, A = void>(pageFunction: (arg: A) => R | Promise<R>, arg?: A): Promise<R>
  screenshot(options: { type: 'png'; fullPage?: boolean; timeout: number }): Promise<Uint8Array>
  close(): Promise<void>
}

interface BrowserContext {
  addCookies(cookies: BrowserCookie[]): Promise<void>
  addInitScript(script: { content: string } | string): Promise<void>
  newPage(): Promise<BrowserPage>
  close(): Promise<void>
}

interface Browser {
  newContext(options: {
    viewport: { width: number; height: number }
    userAgent: string
    locale: string
  }): Promise<BrowserContext>
  close(): Promise<void>
}

interface BrowserLaunchOptions {
  executablePath: string
  headless: boolean
  args: string[]
  proxy?: {
    server: string
    bypass?: string
  }
}

interface ChromiumLauncher {
  launch(options: BrowserLaunchOptions): Promise<Browser>
}

interface TopicPost {
  id?: number
  post_number?: number
  cooked?: string
  like_count?: number
  reply_count?: number
  reply_to_post_number?: number | null
  updated_at?: string
  created_at?: string
  username?: string
  name?: string | null
  display_username?: string | null
  avatar_template?: string
  user_title?: string | null
  actions_summary?: Array<{
    id?: number
    count?: number
  }>
}

interface TopicCategory {
  id?: number
  name?: string
  color?: string
  text_color?: string
  slug?: string
  parent_category_id?: number | null
}

interface TopicPayload {
  title?: string
  views?: number
  posts_count?: number
  like_count?: number
  slug?: string
  tags?: string[]
  category_id?: number
  post_stream?: {
    posts?: TopicPost[]
    stream?: number[]
  }
}

interface SitePayload {
  categories?: TopicCategory[]
  category_list?: {
    categories?: TopicCategory[]
  }
}

interface ExtractedDomCategory {
  name: string
  color?: string
  textColor?: string
}

interface ExtractedDomPost {
  postNumber: number
  cooked: string
  likeCount: number
  replyCount: number
  createdAt: string
  username: string
  name?: string | null
  avatarUrl?: string
  replyToPostNumber?: number | null
}

interface ExtractedDomTopic {
  title: string
  tags: string[]
  viewCount: number
  likeCount: number
  category?: ExtractedDomCategory
  opPost?: ExtractedDomPost
  requestedPost?: ExtractedDomPost
}

export interface CaptureOptions {
  authenticated?: boolean
  useProxy?: boolean
}

export interface SnapshotRenderer {
  capture(url: string, options?: CaptureOptions): Promise<Buffer>
  dispose?(): Promise<void>
}

export const Config: Schema<Config> = Schema.object({
  enabled: Schema.boolean().description(TEXT.enabled).default(true),
  platforms: Schema.array(String).description(TEXT.platforms).default([]),
  forumOrigin: Schema.string().description(TEXT.forumOrigin).default(''),
  frontProxyEnabled: Schema.boolean().description(TEXT.frontProxyEnabled).default(false),
  frontProxyOrigin: Schema.string().description(TEXT.frontProxyOrigin).default(''),
  allowedHosts: Schema.array(String).description(TEXT.allowedHosts).default([]),
  allowSubdomains: Schema.boolean().description(TEXT.allowSubdomains).default(false),
  tCookie: Schema.string().role('secret').description(TEXT.tCookie).default(''),
  executablePath: Schema.string().description(TEXT.executablePath).default(''),
  userAgent: Schema.string().description(TEXT.userAgent).default(DEFAULT_USER_AGENT),
  navigationTimeout: Schema.number().description(TEXT.navigationTimeout).default(DEFAULT_TIMEOUT),
  captureDelay: Schema.number().description(TEXT.captureDelay).default(DEFAULT_DELAY),
  viewportWidth: Schema.number().description(TEXT.viewportWidth).default(1280),
  viewportHeight: Schema.number().description(TEXT.viewportHeight).default(960),
  headless: Schema.boolean().description(TEXT.headless).default(true),
  sendFailureMessage: Schema.boolean().description(TEXT.sendFailureMessage).default(false),
  proxyServer: Schema.string().description(TEXT.proxyServer).default(''),
  proxyBypass: Schema.string().description(TEXT.proxyBypass).default(''),
  dohEnabled: Schema.boolean().description(TEXT.dohEnabled).default(false),
  dohTemplates: Schema.string().description(TEXT.dohTemplates).default(''),
})

const DISCOURSE_WAIT_IMAGES_SCRIPT = String.raw`
  const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout))
  const getDataValue = (element, names) => {
    for (const name of names) {
      const value = element.getAttribute(name)
      if (value && value.trim()) return value.trim()
    }
    return ''
  }
  const prepareImage = (img) => {
    if (!(img instanceof HTMLImageElement)) return
    img.loading = 'eager'
    img.decoding = 'sync'
    try { img.fetchPriority = 'high' } catch {}
    const src = getDataValue(img, ['src', 'data-src', 'data-lazy-src', 'data-original', 'data-orig-src'])
    if (src && img.getAttribute('src') !== src) img.setAttribute('src', src)
    const srcset = getDataValue(img, ['srcset', 'data-srcset', 'data-original-srcset'])
    if (srcset && img.getAttribute('srcset') !== srcset) img.setAttribute('srcset', srcset)
  }
  const prepareSource = (source) => {
    if (!(source instanceof HTMLSourceElement)) return
    const srcset = getDataValue(source, ['srcset', 'data-srcset', 'data-original-srcset'])
    if (srcset && source.getAttribute('srcset') !== srcset) source.setAttribute('srcset', srcset)
  }
  const waitForImage = async (img) => {
    prepareImage(img)
    for (const source of Array.from(img.parentElement?.querySelectorAll?.('source') || [])) prepareSource(source)

    const hasSource = () => !!(img.currentSrc || img.getAttribute('src') || img.getAttribute('srcset'))
    const isReady = () => img.complete && (img.naturalWidth > 0 || img.naturalHeight > 0 || !hasSource())
    const deadline = Date.now() + 8000

    while (Date.now() < deadline) {
      prepareImage(img)
      for (const source of Array.from(img.parentElement?.querySelectorAll?.('source') || [])) prepareSource(source)

      if (isReady()) {
        if (typeof img.decode === 'function' && hasSource()) {
          try {
            await Promise.race([img.decode(), sleep(1500)])
          } catch {}
        }
        return
      }

      try { img.scrollIntoView({ block: 'center', inline: 'center' }) } catch {}

      await new Promise((resolve) => {
        let finished = false
        const done = () => {
          if (finished) return
          finished = true
          clearTimeout(timer)
          resolve()
        }
        const timer = setTimeout(done, 600)
        img.addEventListener('load', done, { once: true })
        img.addEventListener('error', done, { once: true })
      })
    }
  }

  const images = Array.from(document.images)
  return Promise.all(images.map((img) => waitForImage(img)))
`

const SNAPSHOT_POST_PROCESS_SCRIPT = String.raw`
  const clean = (value) => (value || '').replace(/\s+/g, ' ').trim()
  const stripUrl = (value) => clean(value).replace(/^https?:\/\//i, '').replace(/\/+$/u, '')
  const createBlockNote = (label, detail) => {
    const note = document.createElement('div')
    note.className = 'snapshot-hidden-block-note'
    const chip = document.createElement('span')
    chip.className = 'snapshot-hidden-chip'
    chip.textContent = label
    const text = document.createElement('span')
    text.className = 'snapshot-hidden-note-text'
    text.textContent = detail
    note.append(chip, text)
    return note
  }
  const createInlineNote = (label) => {
    const note = document.createElement('span')
    note.className = 'snapshot-hidden-inline-note'
    note.textContent = label
    return note
  }
  const insertBlockNoteBefore = (node, label, detail) => {
    if (!node?.parentElement) return
    const previous = node.previousElementSibling
    if (previous?.classList?.contains('snapshot-hidden-block-note')) return
    node.parentElement.insertBefore(createBlockNote(label, detail), node)
  }
  const markDetails = (root) => {
    const detailsList = Array.from(root.querySelectorAll('details'))
    for (const details of detailsList) {
      if (!(details instanceof HTMLElement)) continue
      details.open = true
      details.classList.add('snapshot-expanded-hidden')
      insertBlockNoteBefore(details, '\u539f\u6298\u53e0\u5185\u5bb9', 'details \u5df2\u81ea\u52a8\u5c55\u5f00')
      const summary = details.querySelector(':scope > summary')
      if (summary instanceof HTMLElement) summary.classList.add('snapshot-details-summary')
    }
  }
  const markSpoilers = (root) => {
    const spoilers = Array.from(root.querySelectorAll('.spoiler-blurred, .spoiled, .spoiler, [data-theme-spoiler]'))
    for (const node of spoilers) {
      if (!(node instanceof HTMLElement)) continue
      if (node.classList.contains('snapshot-spoiler-open')) continue
      if (node.parentElement?.closest('.snapshot-spoiler-open')) continue
      node.classList.add('snapshot-spoiler-open')
      const display = getComputedStyle(node).display
      const blockLike = !['inline', 'contents', 'inline-block'].includes(display)
        || ['DIV', 'P', 'ASIDE', 'SECTION', 'ARTICLE', 'BLOCKQUOTE', 'PRE', 'UL', 'OL', 'LI', 'TABLE', 'FIGURE'].includes(node.tagName)
      if (blockLike) {
        node.classList.add('snapshot-spoiler-block')
        insertBlockNoteBefore(node, '\u539f\u5267\u900f\u5185\u5bb9', '\u5df2\u81ea\u52a8\u5c55\u5f00')
      } else if (!node.querySelector(':scope > .snapshot-hidden-inline-note')) {
        node.prepend(createInlineNote('\u539f\u5267\u900f'))
      }

      const stack = [node, ...Array.from(node.querySelectorAll('*'))]
      for (const element of stack) {
        if (!(element instanceof HTMLElement)) continue
        element.style.filter = 'none'
        element.style.webkitFilter = 'none'
        element.style.backdropFilter = 'none'
        element.style.color = 'inherit'
        element.style.textShadow = 'none'
        element.style.opacity = '1'
        element.style.visibility = 'visible'
        if (element !== node) element.style.backgroundColor = 'transparent'
      }
    }
  }
  const prepareMedia = (root) => {
    for (const img of Array.from(root.querySelectorAll('img'))) {
      if (!(img instanceof HTMLImageElement)) continue
      img.loading = 'eager'
      img.decoding = 'sync'
      try { img.fetchPriority = 'high' } catch {}
      const src = img.getAttribute('data-src') || img.getAttribute('data-lazy-src') || img.getAttribute('data-original') || img.getAttribute('data-orig-src')
      if (src && img.getAttribute('src') !== src) img.setAttribute('src', src)
      const srcset = img.getAttribute('data-srcset') || img.getAttribute('data-original-srcset')
      if (srcset && img.getAttribute('srcset') !== srcset) img.setAttribute('srcset', srcset)
    }
    for (const source of Array.from(root.querySelectorAll('source'))) {
      if (!(source instanceof HTMLSourceElement)) continue
      const srcset = source.getAttribute('data-srcset') || source.getAttribute('data-original-srcset')
      if (srcset && source.getAttribute('srcset') !== srcset) source.setAttribute('srcset', srcset)
    }
  }
  const isMediaAnchor = (anchor) => {
    if (!(anchor instanceof HTMLAnchorElement)) return false
    if (anchor.classList.contains('lightbox') || anchor.classList.contains('image-lightbox')) return true
    if (anchor.querySelector('img, picture, source, video, audio, svg, figure, .lightbox-wrapper, .lightbox__content, .image-wrapper, .attachment')) return true
    const href = clean(anchor.href || anchor.getAttribute('href'))
    return /\.(?:png|jpe?g|gif|webp|bmp|svg|avif)(?:$|[?#])/i.test(href)
  }
  const collectHiddenLinks = (root) => {
    const seen = new Set()
    const results = []
    const anchors = Array.from(root.querySelectorAll('a[href]'))
    for (const anchor of anchors) {
      if (!(anchor instanceof HTMLAnchorElement) || isMediaAnchor(anchor)) continue
      const href = clean(anchor.href || anchor.getAttribute('href'))
      const text = clean(anchor.textContent)
      if (!href || !text) continue
      if (stripUrl(text) === stripUrl(href)) continue
      const key = text + '|' + href
      if (seen.has(key)) continue
      seen.add(key)
      results.push({ text, href })
    }
    return results
  }
  const appendHiddenLinks = (root, links) => {
    if (!links.length) return
    const container = root.closest('.post-shell, .comment-card')
    if (!container || container.querySelector(':scope > .snapshot-link-reference-section')) return
    const section = document.createElement('section')
    section.className = 'snapshot-link-reference-section'
    const title = document.createElement('div')
    title.className = 'snapshot-link-reference-title'
    title.textContent = '\u94fe\u63a5\u5c55\u5f00\uff08\u6587\u5b57 \u2192 \u5b9e\u9645\u94fe\u63a5\uff09'
    const list = document.createElement('div')
    list.className = 'snapshot-link-reference-list'
    for (const item of links) {
      const row = document.createElement('div')
      row.className = 'snapshot-link-reference-item'
      const text = document.createElement('span')
      text.className = 'snapshot-link-reference-text'
      text.textContent = item.text
      const arrow = document.createElement('span')
      arrow.className = 'snapshot-link-reference-arrow'
      arrow.textContent = '\u2192'
      const link = document.createElement('a')
      link.className = 'snapshot-link-reference-url'
      link.href = item.href
      link.textContent = item.href
      row.append(text, arrow, link)
      list.appendChild(row)
    }
    section.append(title, list)
    container.appendChild(section)
  }
  for (const body of Array.from(document.querySelectorAll('[data-snapshot-post-body]'))) {
    if (!(body instanceof HTMLElement)) continue
    const links = collectHiddenLinks(body)
    markDetails(body)
    markSpoilers(body)
    prepareMedia(body)
    appendHiddenLinks(body, links)
  }
`

const DISCOURSE_DOM_EXTRACT_SCRIPT = String.raw`
  const clean = (value) => (value || '').replace(/\s+/g, ' ').trim()
  const text = (node) => clean(node?.textContent)
  const attr = (node, name) => clean(node?.getAttribute(name))
  const parseNumber = (value) => {
    const digits = (value || '').replace(/[^\d]/g, '')
    return digits ? Number(digits) : 0
  }
  const cssVar = (node, name) => clean(node?.getAttribute('style')?.match(new RegExp(name + ':\\s*([^;]+)'))?.[1]) || clean(node ? getComputedStyle(node).getPropertyValue(name) : '')
  const parsePostNumber = (article) => parseNumber(article?.id || article?.getAttribute('data-post-number') || '')
  const getLikeCount = (article) => {
    if (!article) return 0
    const counters = Array.from(article.querySelectorAll('.discourse-reactions-counter'))
    let max = 0
    for (const counter of counters) {
      max = Math.max(
        max,
        parseNumber(text(counter.querySelector('.reactions-counter'))),
        parseNumber(attr(counter, 'aria-label')),
        parseNumber(text(counter)),
      )
    }
    return max
  }
  const getReplyCount = (article) => {
    const wrapper = article?.closest('.topic-post')
    return parseNumber(text(wrapper?.querySelector('.show-replies .d-button-label, .show-replies')))
  }
  const getPost = (article) => {
    if (!article) return undefined
    const cooked = article.querySelector('.cooked')?.innerHTML?.trim() || ''
    const fullName = text(article.querySelector('.names .full-name a, .names .full-name, .names .first.full-name a, .names .first.full-name'))
    const username = text(article.querySelector('.names .username a, .names .username, .names .second a, .names .second, .names .first.username a, .names .first.username'))
    const createdAt = attr(article.querySelector('.post-info.post-date .relative-date, time[datetime]'), 'title')
      || attr(article.querySelector('time[datetime]'), 'datetime')
      || text(article.querySelector('.post-info.post-date .relative-date, .post-date, time'))
    const avatarUrl = attr(article.querySelector('.topic-avatar img.avatar, .topic-avatar img, img.avatar'), 'src')
    return {
      postNumber: parsePostNumber(article),
      cooked,
      likeCount: getLikeCount(article),
      replyCount: getReplyCount(article),
      createdAt,
      username,
      name: fullName || username || undefined,
      avatarUrl,
      replyToPostNumber: null,
    }
  }

  if (document.querySelector('.page-not-found')) {
    return { title: '', tags: [], viewCount: 0, likeCount: 0, error: text(document.querySelector('.page-not-found .heading, .page-not-found')) || '\u627e\u4e0d\u5230\u9875\u9762\u6216\u5f53\u524d\u8d26\u53f7\u65e0\u6743\u8bbf\u95ee\u8be5\u5e16\u5b50\u3002' }
  }

  const routePath = (location.pathname || '').toLowerCase()
  if (/^\/search(?:\/|$)/.test(routePath) || document.querySelector('.search-page, .search-container, #search-page, .full-page-search')) {
    return { title: '', tags: [], viewCount: 0, likeCount: 0, error: '\u9875\u9762\u8df3\u5230\u4e86\u641c\u7d22\u9875\uff0c\u672a\u83b7\u53d6\u5230\u76ee\u6807\u5e16\u5b50\u3002' }
  }

  if (/^\/login(?:\/|$)/.test(routePath) || document.querySelector('body.login-page, #login-form, .login-form, .login-modal, .auth-form')) {
    return { title: '', tags: [], viewCount: 0, likeCount: 0, error: '\u9875\u9762\u8df3\u5230\u4e86\u767b\u5f55\u9875\uff0c\u767b\u5f55\u72b6\u6001\u53ef\u80fd\u672a\u751f\u6548\u3002' }
  }

  const title = text(document.querySelector('.fancy-title span, .fancy-title, h1[data-topic-id], .header-title'))
  if (!title) {
    return { title: '', tags: [], viewCount: 0, likeCount: 0, error: '\u672a\u80fd\u4ece Discourse \u9875\u9762\u63d0\u53d6\u6807\u9898\u3002' }
  }

  const categoryElement = document.querySelector('.title-wrapper .badge-category[data-category-id], .title-wrapper .badge-category, .category-breadcrumb .badge-category, .badge-category[data-category-id]')
  const categoryName = text(categoryElement?.querySelector('.badge-category__name')) || text(categoryElement)
  const tags = [...new Set(Array.from(document.querySelectorAll('.discourse-tag, a.discourse-tag')).map((element) => text(element)).filter(Boolean))]
  const topicMap = document.querySelector('.topic-map')
  const opArticle = document.querySelector('article#post_1')
  const requestedArticle = requestedPostNumber > 1 ? document.querySelector('#post_' + requestedPostNumber) : undefined

  return {
    title,
    tags,
    viewCount: parseNumber(text(topicMap?.querySelector('.topic-map__views-trigger .number')) || text(topicMap?.querySelector('.topic-map__views-trigger'))),
    likeCount: parseNumber(text(topicMap?.querySelector('.topic-map__likes-trigger .number')) || text(topicMap?.querySelector('.topic-map__likes-trigger'))),
    category: categoryName ? {
      name: categoryName,
      color: cssVar(categoryElement, '--category-badge-color'),
      textColor: cssVar(categoryElement, '--category-badge-text-color'),
    } : undefined,
    opPost: getPost(opArticle),
    requestedPost: getPost(requestedArticle),
  }
`

export function normalizeOrigin(value?: string) {
  if (!value) return ''
  try {
    return new URL(value).origin
  } catch {
    return ''
  }
}

export function normalizeHost(value: string) {
  return value.trim().toLowerCase()
}

export function trimUrlCandidate(value: string) {
  return value.replace(TRAILING_PUNCTUATION, '')
}

export function extractUrls(content: string) {
  if (!content) return []
  const matches = content.match(URL_REGEXP) || []
  return [...new Set(matches
    .map(trimUrlCandidate)
    .filter(Boolean)
    .filter((value) => {
      try {
        new URL(value)
        return true
      } catch {
        return false
      }
    }))]
}

export function extractTCookie(value?: string) {
  const source = value?.trim() || ''
  if (!source) return ''

  if (source.startsWith('_t=') || source.includes(';')) {
    const segment = source
      .split(/;\s*/g)
      .map((item) => item.trim())
      .find((item) => item.startsWith('_t='))
    return segment?.slice(3).trim() || ''
  }

  return source
}

const COOKIE_ATTRIBUTE_NAMES = new Set(['path', 'domain', 'expires', 'max-age', 'secure', 'httponly', 'samesite', 'priority', 'partitioned'])

export function extractDiscourseCookiePairs(value?: string) {
  const source = value?.trim() || ''
  if (!source) return [] as Array<{ name: string, value: string }>

  if (!source.includes(';') && !source.includes('=')) {
    return [{ name: '_t', value: source }]
  }

  const pairs = new Map<string, string>()
  for (const segment of source.split(/;\s*/g)) {
    const item = segment.trim()
    if (!item) continue
    const index = item.indexOf('=')
    if (index <= 0) continue
    const name = item.slice(0, index).trim()
    const cookieValue = item.slice(index + 1).trim()
    if (!name || !cookieValue) continue
    if (COOKIE_ATTRIBUTE_NAMES.has(name.toLowerCase())) continue
    pairs.set(name, cookieValue)
  }

  if (!pairs.size && source) {
    return [{ name: '_t', value: source }]
  }

  return [...pairs].map(([name, cookieValue]) => ({ name, value: cookieValue }))
}

export function createDiscourseCookiesForOrigins(cookieSource: string, origins: string[]): BrowserCookie[] {
  const cookiePairs = extractDiscourseCookiePairs(cookieSource)
  if (!cookiePairs.length) return []

  const normalizedOrigins = [...new Set(origins
    .map((origin) => normalizeOrigin(origin))
    .filter((origin): origin is string => !!origin))]

  return normalizedOrigins.flatMap((origin) => cookiePairs.map(({ name, value }) => ({ name, value, url: origin })))
}

export function createDiscourseCookies(cookieSource: string, forumOrigin: string): BrowserCookie[] {
  return createDiscourseCookiesForOrigins(cookieSource, [forumOrigin])
}

interface ProxyFallbackError {
  proxyError?: unknown
  directError: unknown
}

function summarizeError(error: unknown) {
  const message = (error instanceof Error ? error.message : String(error || '\u672a\u77e5\u9519\u8bef'))
    .replace(/\s+/g, ' ')
    .trim()
  return message.length > 120 ? `${message.slice(0, 117)}...` : message
}

function isProxyFallbackError(error: unknown): error is ProxyFallbackError {
  return !!error && typeof error === 'object' && 'directError' in error
}

function summarizeAttemptError(error: unknown) {
  if (!isProxyFallbackError(error)) return summarizeError(error)

  const parts: string[] = []
  if (error.proxyError) parts.push(`${TEXT.proxyErrorLabel}\uff1a${summarizeError(error.proxyError)}`)
  parts.push(`${TEXT.directErrorLabel}\uff1a${summarizeError(error.directError)}`)
  return parts.join('\uff1b')
}

function formatCaptureFailureMessage(targetUrl: string, publicError: unknown, authError?: unknown) {
  const lines = [`${TEXT.failureMessage}${targetUrl}`, `${TEXT.publicErrorLabel}\uff1a${summarizeAttemptError(publicError)}`]
  if (authError) lines.push(`${TEXT.authErrorLabel}\uff1a${summarizeAttemptError(authError)}`)
  return lines.join('\n')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatNumber(value?: number) {
  return new Intl.NumberFormat('zh-CN').format(value || 0)
}

function formatDateTime(value?: string) {
  if (!value) return '\u672a\u77e5'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('zh-CN', { hour12: false })
}

function normalizeColor(value?: string, fallback = '#1f2937') {
  const source = value?.trim().replace(/^#/, '')
  return source && /^[\da-fA-F]{3,8}$/.test(source) ? `#${source}` : fallback
}

export function matchesAllowedHost(targetUrl: string, config: ResolvedConfig) {
  if (!config.allowedHosts.length) return false
  const hostname = new URL(targetUrl).hostname.toLowerCase()
  return config.allowedHosts.some((allowedHost) => hostname === allowedHost || (config.allowSubdomains && hostname.endsWith(`.${allowedHost}`)))
}

export function matchesForumOrigin(targetUrl: string, config: ResolvedConfig) {
  if (!config.forumOrigin) return false
  return targetUrl === config.forumOrigin
    || targetUrl.startsWith(`${config.forumOrigin}/`)
    || targetUrl.startsWith(`${config.forumOrigin}?`)
    || targetUrl.startsWith(`${config.forumOrigin}#`)
}

export function pickTargetUrl(session: Session, config: ResolvedConfig) {
  const content = session.content || session.elements?.join('') || ''
  const urls = extractUrls(content)
  return urls.find((url) => matchesForumOrigin(url, config) || matchesAllowedHost(url, config))
}

export function extractRequestedPostNumber(targetUrl: string) {
  try {
    const url = new URL(targetUrl)
    const hashMatch = url.hash.match(/(?:post|reply|comment)[_-]?(\d+)/i)
    if (hashMatch) return Math.max(1, Number(hashMatch[1]) || 1)

    const segments = url.pathname.split('/').filter(Boolean)
    const numericSegments = segments.filter((segment) => /^\d+$/.test(segment)).map((segment) => Number(segment))
    if (numericSegments.length >= 2) return Math.max(1, numericSegments[numericSegments.length - 1] || 1)
    return 1
  } catch {
    return 1
  }
}

export function normalizeTopicUrl(targetUrl: string, forumOrigin: string) {
  try {
    const url = new URL(targetUrl)
    if (forumOrigin && url.origin !== forumOrigin) return targetUrl

    const segments = url.pathname.split('/').filter(Boolean)
    const numericIndexes = segments
      .map((segment, index) => (/^\d+$/.test(segment) ? index : -1))
      .filter((index) => index >= 0)

    if (!numericIndexes.length) return targetUrl
    const topicIdIndex = numericIndexes.length >= 2 ? numericIndexes[numericIndexes.length - 2] : numericIndexes[numericIndexes.length - 1]
    const normalized = new URL(url.origin)
    normalized.pathname = `/${segments.slice(0, topicIdIndex + 1).join('/')}/1`
    return normalized.toString()
  } catch {
    return targetUrl
  }
}

export function rewriteUrlWithFrontProxy(targetUrl: string, forumOrigin: string, frontProxyOrigin: string, enabled: boolean) {
  if (!enabled || !forumOrigin || !frontProxyOrigin) return targetUrl
  try {
    const target = new URL(targetUrl)
    if (target.origin !== forumOrigin) return targetUrl

    const proxied = new URL(frontProxyOrigin)
    proxied.pathname = target.pathname
    proxied.search = target.search
    proxied.hash = target.hash
    return proxied.toString()
  } catch {
    return targetUrl
  }
}

export function getCookieOrigin(config: ResolvedConfig) {
  if (config.frontProxyEnabled && config.frontProxyOrigin) return config.frontProxyOrigin
  return config.forumOrigin
}

export function getCookieOrigins(config: ResolvedConfig, targetUrl?: string) {
  const origins = new Set<string>()
  const appendOrigin = (value?: string) => {
    const origin = normalizeOrigin(value)
    if (origin) origins.add(origin)
  }

  appendOrigin(config.forumOrigin)
  if (config.frontProxyEnabled) appendOrigin(config.frontProxyOrigin)

  const targetOrigin = normalizeOrigin(targetUrl)
  if (targetOrigin && (matchesForumOrigin(targetOrigin, config) || matchesAllowedHost(targetOrigin, config))) {
    appendOrigin(targetOrigin)
  }

  return [...origins]
}

function createTopicJsonBase(targetUrl: string, config: ResolvedConfig) {
  try {
    const normalized = normalizeTopicUrl(targetUrl, config.forumOrigin)
    const rewritten = rewriteUrlWithFrontProxy(normalized, config.forumOrigin, config.frontProxyOrigin, config.frontProxyEnabled)
    const url = new URL(rewritten)
    const segments = url.pathname.split('/').filter(Boolean)
    if (!segments.length) return null

    if (/^\d+$/.test(segments[segments.length - 1])) {
      segments.pop()
    }

    if (!segments.length) return null
    url.pathname = `/${segments.join('/')}.json`
    url.hash = ''
    return url
  } catch {
    return null
  }
}

export function createTopicJsonUrl(targetUrl: string, config: ResolvedConfig) {
  const url = createTopicJsonBase(targetUrl, config)
  if (!url) return ''
  url.search = ''
  url.searchParams.set('print', 'true')
  return url.toString()
}

export function createTopicPageJsonUrl(targetUrl: string, config: ResolvedConfig, page: number) {
  const url = createTopicJsonBase(targetUrl, config)
  if (!url) return ''
  url.search = ''
  url.searchParams.set('page', String(Math.max(1, Math.trunc(page) || 1)))
  return url.toString()
}

export function createTopicPostUrl(targetUrl: string, config: ResolvedConfig, postNumber = 1) {
  try {
    const url = new URL(targetUrl)
    const segments = url.pathname.split('/').filter(Boolean)
    const numericIndexes = segments
      .map((segment, index) => (/^\d+$/.test(segment) ? index : -1))
      .filter((index) => index >= 0)

    if (!numericIndexes.length) {
      return rewriteUrlWithFrontProxy(targetUrl, config.forumOrigin, config.frontProxyOrigin, config.frontProxyEnabled)
    }

    const topicIdIndex = numericIndexes.length >= 2 ? numericIndexes[numericIndexes.length - 2] : numericIndexes[numericIndexes.length - 1]
    const normalized = new URL(url.origin)
    normalized.pathname = `/${segments.slice(0, topicIdIndex + 1).join('/')}/${Math.max(1, Math.trunc(postNumber) || 1)}`
    return rewriteUrlWithFrontProxy(normalized.toString(), config.forumOrigin, config.frontProxyOrigin, config.frontProxyEnabled)
  } catch {
    return rewriteUrlWithFrontProxy(targetUrl, config.forumOrigin, config.frontProxyOrigin, config.frontProxyEnabled)
  }
}

export function detectUnexpectedDiscourseRoute(currentUrl: string, expectedUrl?: string) {
  try {
    const current = new URL(currentUrl)
    const currentPath = current.pathname.toLowerCase()
    const expected = expectedUrl ? new URL(expectedUrl) : null
    const expectedPath = expected?.pathname.toLowerCase() || ''

    if (expected && current.origin !== expected.origin) {
      return `\u9875\u9762\u5df2\u8df3\u8f6c\u5230 ${current.origin}\uff0c\u672a\u505c\u7559\u5728\u76ee\u6807\u8bba\u575b\u5e16\u5b50\u9875\u3002`
    }

    if (/^\/search(?:\/|$)/.test(currentPath)) {
      return '\u9875\u9762\u8df3\u5230\u4e86\u641c\u7d22\u9875\uff0c\u672a\u83b7\u53d6\u5230\u76ee\u6807\u5e16\u5b50\u3002'
    }

    if (/^\/login(?:\/|$)/.test(currentPath)) {
      return '\u9875\u9762\u8df3\u5230\u4e86\u767b\u5f55\u9875\uff0c\u767b\u5f55\u72b6\u6001\u53ef\u80fd\u672a\u751f\u6548\u3002'
    }

    if (expectedPath.startsWith('/t') && !currentPath.startsWith('/t')) {
      return '\u9875\u9762\u5df2\u8df3\u8f6c\uff0c\u672a\u505c\u7559\u5728\u76ee\u6807\u5e16\u5b50\u9875\u3002'
    }

    return ''
  } catch {
    return ''
  }
}

function createSiteJsonUrl(config: ResolvedConfig) {
  const baseOrigin = getCookieOrigin(config) || config.forumOrigin
  if (!baseOrigin) return ''

  try {
    const url = new URL(baseOrigin)
    url.pathname = '/site.json'
    url.search = ''
    url.hash = ''
    return url.toString()
  } catch {
    return ''
  }
}

export function resolveConfig(config: Config): ResolvedConfig {
  const forumOrigin = normalizeOrigin(config.forumOrigin)
  const frontProxyOrigin = normalizeOrigin(config.frontProxyOrigin)
  const forumHost = forumOrigin ? new URL(forumOrigin).hostname.toLowerCase() : ''
  const allowedHosts = [...new Set([...(config.allowedHosts?.map(normalizeHost) || []), forumHost].filter(Boolean))]

  const authCookieSource = (config.tCookie || config.cookieHeader || '').trim()

  return {
    enabled: config.enabled ?? true,
    platforms: config.platforms?.map((value) => value.trim()).filter(Boolean) || [],
    forumOrigin,
    frontProxyEnabled: config.frontProxyEnabled ?? false,
    frontProxyOrigin,
    allowedHosts,
    allowSubdomains: config.allowSubdomains ?? false,
    tCookie: extractTCookie(authCookieSource),
    authCookieSource,
    executablePath: config.executablePath?.trim() || '',
    userAgent: config.userAgent?.trim() || DEFAULT_USER_AGENT,
    navigationTimeout: config.navigationTimeout ?? DEFAULT_TIMEOUT,
    captureDelay: config.captureDelay ?? DEFAULT_DELAY,
    viewportWidth: config.viewportWidth ?? 1280,
    viewportHeight: config.viewportHeight ?? 960,
    headless: config.headless ?? true,
    sendFailureMessage: config.sendFailureMessage ?? false,
    proxyServer: config.proxyServer?.trim() || '',
    proxyBypass: config.proxyBypass?.trim() || '',
    dohEnabled: config.dohEnabled ?? false,
    dohTemplates: config.dohTemplates?.trim() || '',
  }
}

export async function sendSnapshot(session: Session, buffer: Buffer) {
  const src = `data:image/png;base64,${buffer.toString('base64')}`
  await session.send(h('img', { src }))
}

function selectOpPost(payload: TopicPayload) {
  return payload.post_stream?.posts?.find((post) => post.post_number === 1) || payload.post_stream?.posts?.[0]
}

function selectRequestedPost(payload: TopicPayload, requestedPostNumber: number) {
  if (requestedPostNumber <= 1) return undefined
  return payload.post_stream?.posts?.find((post) => post.post_number === requestedPostNumber)
}

export function getPostLikeCount(post: TopicPost, fallback = 0) {
  const fromActions = post.actions_summary?.find((action) => action.id === 2)?.count
  return fromActions ?? post.like_count ?? fallback
}

function getSiteCategories(payload?: SitePayload) {
  return payload?.categories || payload?.category_list?.categories || []
}

export function resolveCategoryLabel(categoryId: number | undefined, payload?: SitePayload) {
  if (!categoryId) return ''
  const categories = getSiteCategories(payload)
  if (!categories.length) return ''

  const map = new Map<number, TopicCategory>()
  for (const category of categories) {
    if (category.id) map.set(category.id, category)
  }

  const labels: string[] = []
  const visited = new Set<number>()
  let cursor = map.get(categoryId)

  while (cursor?.id && !visited.has(cursor.id)) {
    visited.add(cursor.id)
    if (cursor.name?.trim()) labels.unshift(cursor.name.trim())
    cursor = cursor.parent_category_id ? map.get(cursor.parent_category_id) : undefined
  }

  return labels.join(' / ')
}

function getDisplayName(post: TopicPost) {
  return post.name?.trim() || post.display_username?.trim() || post.username?.trim() || '\u533f\u540d\u7528\u6237'
}

function resolveAvatarUrl(post: TopicPost, baseOrigin: string) {
  const template = post.avatar_template?.replace(/\{size\}/g, String(DEFAULT_AVATAR_SIZE))
  if (!template) return ''

  try {
    return new URL(template, `${baseOrigin}/`).toString()
  } catch {
    return template
  }
}

function renderTopicBadges(payload: TopicPayload, sitePayload?: SitePayload) {
  const category = resolveCategoryLabel(payload.category_id, sitePayload)
  const tags = payload.tags?.map((tag) => tag.trim()).filter(Boolean) || []
  if (!category && !tags.length) return ''

  const items: string[] = []
  if (category) {
    const categoryInfo = getSiteCategories(sitePayload).find((item) => item.id === payload.category_id)
    const background = normalizeColor(categoryInfo?.color, '#f97316')
    const foreground = normalizeColor(categoryInfo?.text_color, '#ffffff')
    items.push(`<span class="badge badge-category" style="--badge-bg:${background};--badge-fg:${foreground}">${escapeHtml(category)}</span>`)
  }

  items.push(...tags.map((tag) => `<span class="badge badge-tag">#${escapeHtml(tag)}</span>`))
  return `<div class="badge-row">${items.join('')}</div>`
}

function renderStatCard(label: string, value: string) {
  return `<div class="stat"><div class="stat-label">${escapeHtml(label)}</div><div class="stat-value">${escapeHtml(value)}</div></div>`
}

function renderCommentStat(label: string, value: string) {
  return `<span class="comment-stat"><span class="comment-stat-label">${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></span>`
}

function renderTopicAuthorHeader(post: TopicPost, baseOrigin: string) {
  const avatar = resolveAvatarUrl(post, baseOrigin)
  const displayNameText = getDisplayName(post)
  const displayName = escapeHtml(displayNameText)
  const username = post.username?.trim() && post.username?.trim() !== displayNameText
    ? `<span class="topic-author-username">@${escapeHtml(post.username.trim())}</span>`
    : ''
  const createdAt = formatDateTime(post.created_at)

  return `
    <section class="topic-author-card">
      <div class="topic-author">
        ${avatar ? `<img class="topic-author-avatar" src="${escapeHtml(avatar)}" alt="${displayName}" />` : '<div class="topic-author-avatar topic-author-avatar-fallback">#</div>'}
        <div class="topic-author-copy">
          <div class="topic-author-name-row">
            <strong>${displayName}</strong>
            ${username}
          </div>
          <div class="topic-author-meta-row">
            <span class="comment-pill">\u697c\u4e3b</span>
            <span class="comment-pill">\u53d1\u8868\u4e8e ${escapeHtml(createdAt)}</span>
          </div>
        </div>
      </div>
    </section>`
}

function renderCommentSection(post: TopicPost | undefined, baseOrigin: string) {
  if (!post || !post.post_number || post.post_number <= 1) return ''

  const avatar = resolveAvatarUrl(post, baseOrigin)
  const displayNameText = getDisplayName(post)
  const displayName = escapeHtml(displayNameText)
  const username = post.username?.trim() && post.username?.trim() !== displayNameText
    ? `<span class="comment-username">@${escapeHtml(post.username.trim())}</span>`
    : ''
  const createdAt = formatDateTime(post.created_at)
  const likeCount = formatNumber(getPostLikeCount(post))
  const replyCount = formatNumber(post.reply_count ?? 0)
  const replyTo = post.reply_to_post_number ? `<span class="comment-pill">\u56de\u590d #${post.reply_to_post_number}</span>` : ''
  const cooked = post.cooked || '<p>\u8be5\u697c\u5c42\u6682\u65e0\u53ef\u5c55\u793a\u5185\u5bb9\u3002</p>'

  return `
    <section class="comment-section">
      <div class="section-heading">
        <span class="section-kicker">\u5173\u8054\u697c\u5c42</span>
        <h2>#${post.post_number}</h2>
      </div>
      <article class="comment-card">
        <header class="comment-header">
          <div class="comment-author">
            ${avatar ? `<img class="comment-avatar" src="${escapeHtml(avatar)}" alt="${displayName}" />` : '<div class="comment-avatar comment-avatar-fallback">#</div>'}
            <div class="comment-author-copy">
              <div class="comment-name-row">
                <strong>${displayName}</strong>
                ${username}
              </div>
              <div class="comment-meta-row">
                <span class="comment-pill">\u53d1\u8868\u4e8e ${escapeHtml(createdAt)}</span>
                ${replyTo}
              </div>
            </div>
          </div>
          <div class="comment-stats">
            ${renderCommentStat('\u56de\u590d', replyCount)}
            ${renderCommentStat('\u70b9\u8d5e', likeCount)}
          </div>
        </header>
        <div class="post comment-body" data-snapshot-post-body="comment">${cooked}</div>
      </article>
    </section>`
}

function renderTopicHtml(payload: TopicPayload, opPost: TopicPost, requestedPost: TopicPost | undefined, baseOrigin: string, sitePayload?: SitePayload) {
  const title = escapeHtml(payload.title || 'Discourse Topic')
  const cooked = opPost.cooked || '<p>\u672a\u83b7\u53d6\u5230\u697c\u4e3b\u6b63\u6587\u3002</p>'
  const viewCount = payload.views ?? 0
  const likeCount = getPostLikeCount(opPost, payload.like_count ?? 0)
  const createdAt = formatDateTime(opPost.created_at)
  const badges = renderTopicBadges(payload, sitePayload)
  const topicAuthorHeader = renderTopicAuthorHeader(opPost, baseOrigin)
  const commentSection = renderCommentSection(requestedPost, baseOrigin)

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <base href="${escapeHtml(baseOrigin)}/" />
  <title>${title}</title>
  <style>
    :root {
      color-scheme: light;
      --paper: #f4efe7;
      --paper-strong: #efe5d6;
      --ink: #1c1917;
      --ink-soft: #57534e;
      --line: rgba(120, 53, 15, 0.14);
      --card: rgba(255, 255, 255, 0.88);
      --card-strong: rgba(255, 251, 245, 0.96);
      --accent: #b45309;
      --accent-soft: #f59e0b;
      --shadow: 0 24px 80px rgba(120, 53, 15, 0.14);
      --radius-xl: 28px;
      --radius-lg: 20px;
      --sans: 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
      --serif: 'Source Han Serif SC', 'Noto Serif SC', 'Songti SC', 'STSong', serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background:
        radial-gradient(circle at top left, rgba(245, 158, 11, 0.20), transparent 30%),
        radial-gradient(circle at top right, rgba(180, 83, 9, 0.18), transparent 34%),
        linear-gradient(180deg, #fbf8f3 0%, var(--paper) 46%, #efe7dc 100%);
      color: var(--ink);
      font-family: var(--sans);
    }
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(120, 53, 15, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(120, 53, 15, 0.04) 1px, transparent 1px);
      background-size: 28px 28px;
      mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.45), transparent 88%);
    }
    .wrap {
      position: relative;
      width: min(980px, calc(100vw - 40px));
      margin: 0 auto;
      padding: 28px 0 36px;
    }
    .panel {
      position: relative;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: var(--radius-xl);
      background: linear-gradient(180deg, rgba(255, 251, 245, 0.98), rgba(255, 248, 240, 0.92));
      box-shadow: var(--shadow);
      padding: 30px 30px 26px;
    }
    .section-kicker {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--accent);
      font-weight: 700;
    }
    .section-kicker::before {
      content: '';
      width: 32px;
      height: 1px;
      background: currentColor;
      opacity: 0.5;
    }
    .title {
      margin: 14px 0 0;
      font-family: var(--serif);
      font-size: 38px;
      line-height: 1.22;
      font-weight: 700;
      letter-spacing: 0.01em;
      color: #1f1a17;
      word-break: break-word;
    }
    .badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      min-height: 34px;
      padding: 7px 13px;
      border-radius: 999px;
      border: 1px solid rgba(120, 53, 15, 0.10);
      font-size: 14px;
      font-weight: 700;
      line-height: 1;
    }
    .badge-category {
      background: var(--badge-bg, #f97316);
      color: var(--badge-fg, #ffffff);
    }
    .badge-tag {
      background: rgba(255, 255, 255, 0.8);
      color: var(--accent);
    }
    .hero-divider {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 16px;
      margin: 24px 0 22px;
      color: rgba(180, 83, 9, 0.6);
      font-size: 13px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 700;
    }
    .hero-divider::before,
    .hero-divider::after {
      content: '';
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(180, 83, 9, 0.24), transparent);
    }
    .topic-author-card {
      margin-top: 22px;
      border-radius: 22px;
      border: 1px solid rgba(120, 53, 15, 0.13);
      background: rgba(255, 252, 247, 0.94);
      padding: 18px;
      position: relative;
      overflow: hidden;
    }
    .topic-author { display: flex; align-items: flex-start; gap: 14px; min-width: 0; }
    .topic-author-avatar { width: 62px; height: 62px; flex: 0 0 62px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(180, 83, 9, 0.16); background: #fff; }
    .topic-author-avatar-fallback { display: grid; place-items: center; font-size: 20px; font-weight: 800; color: var(--accent); background: rgba(245, 158, 11, 0.16); }
    .topic-author-copy { min-width: 0; }
    .topic-author-name-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; color: #1f1a17; font-size: 19px; line-height: 1.4; }
    .topic-author-username { color: var(--ink-soft); font-size: 14px; font-weight: 600; }
    .topic-author-meta-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .post-shell {
      border-radius: 22px;
      border: 1px solid rgba(120, 53, 15, 0.13);
      background: rgba(255, 252, 247, 0.94);
      padding: 18px;
    }
    .post {
      font-size: 18px;
      line-height: 1.9;
      color: var(--ink);
      word-break: break-word;
    }
    .post > :first-child { margin-top: 0; }
    .post > :last-child { margin-bottom: 0; }
    .post p, .post ul, .post ol, .post blockquote, .post pre, .post table, .post aside, .post details { margin: 0 0 1.08em; }
    .post a { color: #9a3412; text-decoration: none; border-bottom: 1px solid rgba(154, 52, 18, 0.22); }
    .post a.lightbox, .post figure > a, .post .lightbox-wrapper > a, .post .image-wrapper > a { border-bottom: none; }
    .post .lightbox-wrapper .meta, .post figure figcaption, .post .image-wrapper .image-caption { display: none !important; }
    .post .image-wrapper, .post .lightbox-wrapper, .post figure {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      width: 100%;
      max-width: 100%;
      margin: 16px 0 18px;
    }
    .post img:not(.emoji):not(.d-emoji):not([alt^=':']):not([title^=':']), .post video, .post iframe {
      max-width: 100% !important;
      height: auto !important;
      display: block;
      margin: 16px auto;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.85);
    }
    .post figure img:not(.emoji):not(.d-emoji):not([alt^=':']):not([title^=':']), .post .lightbox-wrapper img:not(.emoji):not(.d-emoji):not([alt^=':']):not([title^=':']), .post .image-wrapper img:not(.emoji):not(.d-emoji):not([alt^=':']):not([title^=':']) { margin: 0; }
    .post img.emoji, .post img.d-emoji, .post img[alt^=':'], .post img[title^=':'] {
      display: inline-block !important;
      width: 1.25em !important;
      height: 1.25em !important;
      min-width: 1.25em;
      margin: 0 0.15em !important;
      vertical-align: -0.2em;
      border-radius: 0 !important;
      background: transparent !important;
      object-fit: contain;
    }
    .post figure figcaption, .post .lightbox-wrapper figcaption, .post .lightbox-wrapper .meta, .post .lightbox-wrapper .meta .filename, .post .lightbox-wrapper .meta .informations, .post .image-wrapper .image-caption {
      width: 100%;
      margin: 0;
      text-align: left !important;
      word-break: break-word;
    }
    .post pre, .post code { font-family: 'Cascadia Code', 'JetBrains Mono', Consolas, monospace; white-space: pre-wrap; word-break: break-word; }
    .post code { padding: 0.14em 0.4em; border-radius: 8px; background: rgba(120, 53, 15, 0.08); font-size: 0.92em; }
    .post pre { padding: 16px 18px; border-radius: 16px; background: #1f1a17; color: #fef3c7; overflow: hidden; }
    .post pre code { padding: 0; background: transparent; color: inherit; }
    .post blockquote { margin-left: 0; padding: 14px 18px; border-left: 4px solid rgba(180, 83, 9, 0.42); border-radius: 0 16px 16px 0; background: rgba(245, 158, 11, 0.08); color: var(--ink-soft); }
    .post table { width: 100%; display: block; overflow-x: auto; border-collapse: collapse; border: 1px solid rgba(120, 53, 15, 0.12); border-radius: 14px; background: rgba(255, 255, 255, 0.9); }
    .post th, .post td { padding: 10px 12px; border-bottom: 1px solid rgba(120, 53, 15, 0.08); border-right: 1px solid rgba(120, 53, 15, 0.08); text-align: left; }
    .post details.snapshot-expanded-hidden { padding: 16px 18px; border-radius: 18px; border: 1px solid rgba(120, 53, 15, 0.14); background: rgba(255, 255, 255, 0.88); }
    .post details.snapshot-expanded-hidden > summary { cursor: default; color: #7c2d12; font-weight: 800; margin-bottom: 12px; }
    .snapshot-hidden-block-note { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 0 0 10px; }
    .snapshot-hidden-chip, .snapshot-hidden-inline-note { display: inline-flex; align-items: center; min-height: 26px; padding: 0 10px; border-radius: 999px; background: rgba(180, 83, 9, 0.12); color: #9a3412; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; white-space: nowrap; }
    .snapshot-hidden-note-text { color: var(--ink-soft); font-size: 13px; font-weight: 700; }
    .snapshot-hidden-inline-note { margin-right: 0.55em; vertical-align: middle; }
    .snapshot-spoiler-open { filter: none !important; -webkit-filter: none !important; backdrop-filter: none !important; color: inherit !important; text-shadow: none !important; background: rgba(245, 158, 11, 0.10) !important; border: 1px dashed rgba(180, 83, 9, 0.24); border-radius: 12px; padding: 0.05em 0.45em; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
    .snapshot-spoiler-open img { filter: none !important; -webkit-filter: none !important; }
    .snapshot-spoiler-open.snapshot-spoiler-block { display: block; padding: 14px 16px; margin-bottom: 1.08em; }
    .snapshot-link-reference-section { margin-top: 18px; padding-top: 14px; border-top: 1px dashed rgba(120, 53, 15, 0.18); }
    .snapshot-link-reference-title { color: #9a3412; font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 10px; }
    .snapshot-link-reference-list { display: grid; gap: 10px; }
    .snapshot-link-reference-item { display: grid; grid-template-columns: minmax(0, 220px) auto minmax(0, 1fr); gap: 10px; align-items: start; padding: 10px 12px; border-radius: 14px; background: rgba(255, 255, 255, 0.72); border: 1px solid rgba(120, 53, 15, 0.08); }
    .snapshot-link-reference-text { color: #1f1a17; font-weight: 700; word-break: break-word; }
    .snapshot-link-reference-arrow { color: var(--ink-soft); font-weight: 700; }
    .snapshot-link-reference-url { color: #9a3412; word-break: break-all; }
    .summary {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      margin-top: 22px;
    }
    .stat { border-radius: 18px; border: 1px solid rgba(120, 53, 15, 0.11); background: rgba(255, 251, 245, 0.96); padding: 16px 18px; }
    .stat-label { color: var(--ink-soft); font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; font-weight: 700; }
    .stat-value { color: #1f1a17; font-size: 24px; font-weight: 800; line-height: 1.3; word-break: break-word; }
    .comment-section { margin-top: 28px; }
    .section-heading { display: flex; align-items: end; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
    .section-heading h2 { margin: 8px 0 0; font-family: var(--serif); font-size: 24px; color: #1f1a17; }
    .comment-card { border-radius: 22px; border: 1px solid rgba(120, 53, 15, 0.13); background: rgba(255, 252, 247, 0.94); padding: 18px; }
    .comment-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; margin-bottom: 16px; }
    .comment-author { display: flex; align-items: flex-start; gap: 14px; min-width: 0; }
    .comment-avatar { width: 56px; height: 56px; flex: 0 0 56px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(180, 83, 9, 0.16); background: #fff; }
    .comment-avatar-fallback { display: grid; place-items: center; font-size: 18px; font-weight: 800; color: var(--accent); background: rgba(245, 158, 11, 0.16); }
    .comment-author-copy { min-width: 0; }
    .comment-name-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; color: #1f1a17; font-size: 18px; line-height: 1.4; }
    .comment-username { color: var(--ink-soft); font-size: 14px; font-weight: 600; }
    .comment-meta-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .comment-pill { display: inline-flex; align-items: center; min-height: 30px; padding: 0 11px; border-radius: 999px; background: rgba(245, 158, 11, 0.10); color: #9a3412; font-size: 13px; font-weight: 700; }
    .comment-stats { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
    .comment-stat { display: inline-flex; align-items: baseline; gap: 6px; min-height: 34px; padding: 0 12px; border-radius: 999px; background: rgba(255, 255, 255, 0.85); border: 1px solid rgba(120, 53, 15, 0.10); color: var(--ink-soft); font-size: 14px; }
    .comment-stat strong { color: #1f1a17; font-size: 15px; }
    .comment-body { font-size: 16px; line-height: 1.84; }
    @media (max-width: 860px) {
      .wrap { width: min(100vw - 24px, 980px); padding: 18px 0 22px; }
      .panel { padding: 22px 18px 20px; }
      .title { font-size: 31px; }
      .summary { grid-template-columns: 1fr; }
      .comment-header { flex-direction: column; }
      .comment-stats { justify-content: flex-start; }
      .snapshot-link-reference-item { grid-template-columns: 1fr; gap: 6px; }
      .snapshot-link-reference-arrow { display: none; }
    }
  </style>
</head>
<body>
  <main class="wrap">
    <section class="panel">
      <span class="section-kicker">Discourse Snapshot</span>
      <h1 class="title">${title}</h1>
      ${badges}
      ${topicAuthorHeader}
      <div class="hero-divider">\u9996\u697c\u6b63\u6587</div>
      <section class="post-shell">
        <article class="post" data-snapshot-post-body="op">${cooked}</article>
      </section>
      <section class="summary">
        ${renderStatCard('\u6d4f\u89c8\u91cf', formatNumber(viewCount))}
        ${renderStatCard('\u53d1\u5e16\u65f6\u95f4', createdAt)}
        ${renderStatCard('\u70b9\u8d5e\u91cf', formatNumber(likeCount))}
      </section>
      ${commentSection}
    </section>
  </main>
</body>
</html>`
}

async function extractTopicFromPage(page: BrowserPage, url: string, requestedPostNumber: number, config: ResolvedConfig): Promise<ExtractedDomTopic> {
  await page.goto(url, {
    waitUntil: 'load',
    timeout: config.navigationTimeout,
  })

  await page.waitForTimeout(Math.min(Math.max(config.captureDelay, 2500), 5000))

  const redirectedError = detectUnexpectedDiscourseRoute(page.url(), url)
  if (redirectedError) throw new Error(redirectedError)

  const snapshot = await page.evaluate<ExtractedDomTopic & { error?: string }, { requestedPostNumber: number, script: string }>(
    ({ requestedPostNumber, script }) => new Function('requestedPostNumber', script)(requestedPostNumber) as ExtractedDomTopic & { error?: string },
    { requestedPostNumber, script: DISCOURSE_DOM_EXTRACT_SCRIPT },
  )

  if (snapshot.error) throw new Error(snapshot.error)
  return snapshot
}

function toTopicPost(post: ExtractedDomPost | undefined): TopicPost | undefined {
  if (!post) return undefined
  return {
    post_number: post.postNumber,
    cooked: post.cooked,
    like_count: post.likeCount,
    reply_count: post.replyCount,
    reply_to_post_number: post.replyToPostNumber,
    created_at: post.createdAt,
    username: post.username,
    name: post.name || null,
    avatar_template: post.avatarUrl,
  }
}

function buildRenderDataFromExtractedTopic(snapshot: ExtractedDomTopic, requestedPost?: ExtractedDomPost) {
  const categoryId = snapshot.category?.name ? 1 : undefined
  const payload: TopicPayload = {
    title: snapshot.title,
    views: snapshot.viewCount,
    like_count: snapshot.likeCount,
    tags: snapshot.tags,
    category_id: categoryId,
  }

  const sitePayload: SitePayload | undefined = snapshot.category?.name ? {
    categories: [{
      id: 1,
      name: snapshot.category.name,
      color: snapshot.category.color,
      text_color: snapshot.category.textColor,
    }],
  } : undefined

  return {
    payload,
    sitePayload,
    opPost: toTopicPost(snapshot.opPost),
    requestedPost: toTopicPost(requestedPost),
  }
}

export function createBrowserLaunchOptions(config: ResolvedConfig, useProxy = true): BrowserLaunchOptions {
  const options: BrowserLaunchOptions = {
    executablePath: config.executablePath,
    headless: config.headless,
    args: ['--disable-dev-shm-usage', '--disable-gpu', '--no-first-run'],
  }

  if (useProxy && config.proxyServer) {
    options.proxy = { server: config.proxyServer, bypass: config.proxyBypass || undefined }
  }

  if (config.dohEnabled) {
    if (config.dohTemplates) {
      options.args.push('--dns-over-https-mode=secure')
      options.args.push(`--dns-over-https-templates=${config.dohTemplates}`)
    } else {
      options.args.push('--dns-over-https-mode=automatic')
    }
  }

  return options
}

export function createLinkshotMiddleware(config: ResolvedConfig, renderer: SnapshotRenderer, logger: Pick<Logger, 'info' | 'warn'>): Middleware {
  return async (session, next) => {
    const result = await next()
    if (!config.enabled) return result
    if (config.platforms.length && !config.platforms.includes(session.platform)) return result

    const targetUrl = pickTargetUrl(session, config)
    if (!targetUrl) return result

    const captureWithProxyFallback = async (authenticated: boolean) => {
      if (!config.proxyServer) return renderer.capture(targetUrl, { authenticated, useProxy: false })

      try {
        return await renderer.capture(targetUrl, { authenticated, useProxy: true })
      } catch (proxyError) {
        logger.warn(proxyError)
        await session.send(`${TEXT.proxyRetryMessage}${targetUrl}`)

        try {
          return await renderer.capture(targetUrl, { authenticated, useProxy: false })
        } catch (directError) {
          throw { proxyError, directError } as ProxyFallbackError
        }
      }
    }

    logger.info(`${TEXT.detected}${targetUrl}\uff08${session.platform}\uff09`)

    try {
      let buffer: Buffer

      try {
        buffer = await captureWithProxyFallback(false)
      } catch (publicError) {
        logger.warn(publicError)

        if (!config.authCookieSource && !config.tCookie) {
          await session.send(`${formatCaptureFailureMessage(targetUrl, publicError)}\n${TEXT.authMissingMessage}`)
          logger.warn(`${TEXT.failure}${targetUrl}`)
          return result
        }

        await session.send(`${TEXT.publicRetryMessage}${targetUrl}`)

        try {
          buffer = await captureWithProxyFallback(true)
        } catch (authError) {
          logger.warn(authError)
          logger.warn(`${TEXT.failure}${targetUrl}`)
          await session.send(formatCaptureFailureMessage(targetUrl, publicError, authError))
          return result
        }
      }

      await sendSnapshot(session, buffer)
      logger.info(`${TEXT.success}${targetUrl}`)
    } catch (error) {
      logger.warn(error)
      logger.warn(`${TEXT.failure}${targetUrl}`)
      if (config.sendFailureMessage) {
        await session.send(`${TEXT.failureMessage}${targetUrl}`)
      }
    }

    return result
  }
}

async function loadChromium(): Promise<ChromiumLauncher> {
  const module = await import('playwright-core')
  return module.chromium as unknown as ChromiumLauncher
}

export class PlaywrightDiscourseRenderer implements SnapshotRenderer {
  private proxyBrowserTask?: Promise<Browser>
  private directBrowserTask?: Promise<Browser>

  constructor(private readonly config: ResolvedConfig) {}

  private async getBrowser(useProxy: boolean) {
    if (useProxy && this.config.proxyServer) {
      this.proxyBrowserTask ||= this.launch(true)
      return this.proxyBrowserTask
    }

    this.directBrowserTask ||= this.launch(false)
    return this.directBrowserTask
  }

  private async launch(useProxy: boolean) {
    const chromium = await loadChromium()
    return chromium.launch(createBrowserLaunchOptions(this.config, useProxy))
  }

  private async withPage<T>(browser: Browser, targetUrl: string | undefined, authenticated: boolean, callback: (page: BrowserPage) => Promise<T>) {
    const context = await browser.newContext({
      viewport: { width: this.config.viewportWidth, height: this.config.viewportHeight },
      userAgent: this.config.userAgent,
      locale: 'zh-CN',
    })

    try {
      if (authenticated && (this.config.authCookieSource || this.config.tCookie)) {
        const cookieOrigins = getCookieOrigins(this.config, targetUrl)
        const cookies = createDiscourseCookiesForOrigins(this.config.authCookieSource || this.config.tCookie, cookieOrigins)
        if (cookies.length) await context.addCookies(cookies)
      }
      const page = await context.newPage()
      return await callback(page)
    } finally {
      await context.close()
    }
  }

  async capture(url: string, options: CaptureOptions = {}) {
    const authenticated = options.authenticated ?? true
    const useProxy = options.useProxy ?? !!this.config.proxyServer
    const browser = await this.getBrowser(useProxy)
    const requestedPostNumber = extractRequestedPostNumber(url)
    const opSourceUrl = createTopicPostUrl(url, this.config, 1)
    const opSnapshot = await this.withPage(browser, opSourceUrl, authenticated, (page) => extractTopicFromPage(page, opSourceUrl, 1, this.config))
    if (!opSnapshot.opPost) throw new Error('\u672a\u4ece Discourse \u9875\u9762\u4e2d\u83b7\u53d6\u5230\u697c\u4e3b\u9996\u5e16\u3002')

    let requestedPost: ExtractedDomPost | undefined
    if (requestedPostNumber > 1) {
      const replySourceUrl = createTopicPostUrl(url, this.config, requestedPostNumber)
      const replySnapshot = await this.withPage(browser, replySourceUrl, authenticated, (page) => extractTopicFromPage(page, replySourceUrl, requestedPostNumber, this.config))
      requestedPost = replySnapshot.requestedPost
    }

    const baseOrigin = this.config.frontProxyEnabled && this.config.frontProxyOrigin ? this.config.frontProxyOrigin : this.config.forumOrigin
    const { payload, sitePayload, opPost, requestedPost: requestedTopicPost } = buildRenderDataFromExtractedTopic(opSnapshot, requestedPost)
    if (!opPost) throw new Error('\u672a\u4ece Discourse \u9875\u9762\u4e2d\u83b7\u53d6\u5230\u697c\u4e3b\u9996\u5e16\u3002')
    const html = renderTopicHtml(payload, opPost, requestedTopicPost, baseOrigin, sitePayload)

    return this.withPage(browser, baseOrigin, authenticated, async (page) => {
      await page.setContent(html, { waitUntil: 'load', timeout: this.config.navigationTimeout })
      await page.evaluate((script) => new Function(script)(), SNAPSHOT_POST_PROCESS_SCRIPT)
      if (this.config.captureDelay > 0) await page.waitForTimeout(this.config.captureDelay)

      await page.evaluate((script) => new Function(script)(), DISCOURSE_WAIT_IMAGES_SCRIPT)

      const buffer = await page.screenshot({
        type: 'png',
        fullPage: true,
        timeout: this.config.navigationTimeout,
      })

      return Buffer.from(buffer)
    })
  }

  async dispose() {
    const browsers = await Promise.all([
      this.proxyBrowserTask?.catch(() => null),
      this.directBrowserTask?.catch(() => null),
    ])
    this.proxyBrowserTask = undefined
    this.directBrowserTask = undefined
    await Promise.all(browsers.filter(Boolean).map((browser) => browser!.close()))
  }
}

function isConfigReady(config: ResolvedConfig) {
  return !!(config.enabled
    && config.forumOrigin
    && config.executablePath
    && (!config.frontProxyEnabled || config.frontProxyOrigin))
}

export function apply(ctx: Context, config: Config) {
  const resolved = resolveConfig(config)
  const logger = ctx.logger(name)

  if (!isConfigReady(resolved)) {
    logger.warn(TEXT.configIncomplete)
    return
  }

  if (resolved.platforms.length) {
    logger.info(`${TEXT.listenPlatforms}${resolved.platforms.join(', ')}`)
  } else {
    logger.info(`${TEXT.listenAll}${resolved.forumOrigin}`)
  }

  const renderer = new PlaywrightDiscourseRenderer(resolved)
  ctx.middleware(createLinkshotMiddleware(resolved, renderer, logger))
  ctx.on('dispose', () => renderer.dispose())
}
