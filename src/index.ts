import { Context, h, Logger, Middleware, Schema, Session } from 'koishi'

const TEXT = {
  enabled: '\u662f\u5426\u542f\u7528\u8bba\u575b\u94fe\u63a5\u622a\u56fe\u529f\u80fd\u3002',
  forumOrigin: '\u8bba\u575b\u4e3b\u7ad9\u5730\u5740\uff0c\u4f8b\u5982 https://forum.example.com',
  frontProxyEnabled: '\u662f\u5426\u542f\u7528\u8bbf\u95ee\u8bba\u575b\u7684\u524d\u7f6e\u57df\u4ee3\u7406\uff0c\u53ef\u4e0e proxyServer \u540c\u65f6\u5f00\u542f\u3002',
  frontProxyOrigin: '\u524d\u7f6e\u57df\u4ee3\u7406\u5730\u5740\uff0c\u4f8b\u5982 https://forum-proxy.example.com\uff1b\u542f\u7528\u540e\u4f1a\u628a forumOrigin \u7684\u94fe\u63a5\u6539\u5199\u5230\u8fd9\u91cc\u8bbf\u95ee\u3002',
  tCookie: '\u767b\u5f55 Cookie \u4e2d _t \u7684\u503c\uff1b\u65e2\u53ef\u4ee5\u76f4\u63a5\u586b _t \u7684\u5185\u5bb9\uff0c\u4e5f\u53ef\u4ee5\u7c98\u8d34\u5b8c\u6574 Cookie \u5934\uff0c\u63d2\u4ef6\u4f1a\u81ea\u52a8\u63d0\u53d6 _t \u5e76\u4e00\u5e76\u6ce8\u5165\u5176\u4ed6 Cookie\u3002',
  executablePath: '\u6d4f\u89c8\u5668\u53ef\u6267\u884c\u6587\u4ef6\u8def\u5f84\uff0c\u586b\u5199\u672c\u673a Chrome / Edge \u7684\u5b8c\u6574\u8def\u5f84\u3002',
  userAgent: '\u622a\u56fe\u8bbf\u95ee\u8bba\u575b\u65f6\u4f7f\u7528\u7684 User-Agent\u3002',
  navigationTimeout: '\u63a5\u53e3\u8bf7\u6c42\u3001\u7d20\u6750\u52a0\u8f7d\u4e0e\u622a\u56fe\u7684\u8d85\u65f6\u65f6\u95f4\uff08\u6beb\u79d2\uff09\u3002',
  pageWaitUntil: '\u9875\u9762\u52a0\u8f7d\u5b8c\u6210\u7684\u5224\u5b9a\u65b9\u5f0f\uff1b\u9ed8\u8ba4 domcontentloaded \uff0c\u9047\u5230 load \u8d85\u65f6\u65f6\u5efa\u8bae\u4f7f\u7528\u8fd9\u4e2a\u3002',
  browserTimeout: '\u6d4f\u89c8\u5668\u542f\u52a8 / \u5efa\u8fde\u8d85\u65f6\u65f6\u95f4\uff08\u6beb\u79d2\uff09\uff0c0 \u8868\u793a\u4e0d\u68c0\u6d4b\u8d85\u65f6\u3002',
  captureDelay: '\u751f\u6210\u622a\u56fe\u524d\u989d\u5916\u7b49\u5f85\u7684\u65f6\u95f4\uff08\u6beb\u79d2\uff09\uff0c\u7528\u4e8e\u7b49\u5f85\u56fe\u7247\u8d44\u6e90\u5b8c\u6210\u52a0\u8f7d\u3002',
  commentWindowCount: '\u989d\u5916\u9644\u5e26\u7684\u8bc4\u8bba\u697c\u5c42\u6570\uff1b\u7559\u7a7a\u5219\u4fdd\u6301\u9ed8\u8ba4\u884c\u4e3a\uff0c\u586b\u5199\u540e\u4f1a\u6309\u697c\u5c42\u622a\u53d6\u5bf9\u5e94\u6570\u91cf\u7684\u8bc4\u8bba\u3002',
  viewportWidth: '\u622a\u56fe\u6d4f\u89c8\u5668\u89c6\u53e3\u5bbd\u5ea6\u3002',
  viewportHeight: '\u622a\u56fe\u6d4f\u89c8\u5668\u89c6\u53e3\u9ad8\u5ea6\u3002',
  headless: '\u662f\u5426\u4ee5\u65e0\u5934\u6a21\u5f0f\u542f\u52a8\u6d4f\u89c8\u5668\u3002',
  closeBrowserAfterCapture: '\u662f\u5426\u5728\u6e32\u67d3\u5b8c\u6210\u540e\u7acb\u5373\u5173\u95ed\u6d4f\u89c8\u5668\u8fde\u63a5\u3002\u542f\u7528\u540e\u4f1a\u589e\u52a0\u6bcf\u6b21\u6e32\u67d3\u7684\u542f\u52a8\u65f6\u95f4\uff0c\u9002\u7528\u4e8e\u4f4e\u9891\u7387\u6e32\u67d3\u573a\u666f\u3002',
  sendFailureMessage: '\u622a\u56fe\u5931\u8d25\u65f6\uff0c\u662f\u5426\u5728\u804a\u5929\u4e2d\u53d1\u9001\u5931\u8d25\u63d0\u793a\u3002',
  napcatMergedForward: '\u662f\u5426\u5728 NapCat / OneBot QQ \u573a\u666f\u4e0b\u989d\u5916\u53d1\u9001\u5e16\u5b50\u5185\u6587\u4ef6\u4e0e\u94fe\u63a5\u7684\u5408\u5e76\u8f6c\u53d1\u3002',
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
  forumOrigin?: string
  frontProxyEnabled?: boolean
  frontProxyOrigin?: string
  tCookie?: string
  cookieHeader?: string
  executablePath?: string
  userAgent?: string
  navigationTimeout?: number
  pageWaitUntil?: BrowserWaitUntil
  browserTimeout?: number
  captureDelay?: number
  commentWindowCount?: number
  viewportWidth?: number
  viewportHeight?: number
  headless?: boolean
  closeBrowserAfterCapture?: boolean
  sendFailureMessage?: boolean
  napcatMergedForward?: boolean
  proxyServer?: string
  proxyBypass?: string
  dohEnabled?: boolean
  dohTemplates?: string
}

export interface ResolvedConfig {
  enabled: boolean
  forumOrigin: string
  frontProxyEnabled: boolean
  frontProxyOrigin: string
  tCookie: string
  authCookieSource: string
  executablePath: string
  userAgent: string
  navigationTimeout: number
  pageWaitUntil: BrowserWaitUntil
  browserTimeout: number
  captureDelay: number
  commentWindowCount?: number
  viewportWidth: number
  viewportHeight: number
  headless: boolean
  closeBrowserAfterCapture: boolean
  sendFailureMessage: boolean
  napcatMergedForward: boolean
  proxyServer: string
  proxyBypass: string
  dohEnabled: boolean
  dohTemplates: string
}

type BrowserWaitUntil = 'domcontentloaded' | 'load' | 'networkidle'

interface BrowserCookie {
  name: string
  value: string
  url: string
}

interface BrowserPage {
  goto(url: string, options: { waitUntil: BrowserWaitUntil; timeout: number }): Promise<unknown>
  url(): string
  setContent(html: string, options: { waitUntil: BrowserWaitUntil; timeout: number }): Promise<void>
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
  timeout?: number
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
  postCount: number
  likeCount: number
  category?: ExtractedDomCategory
  opPost?: ExtractedDomPost
  requestedPost?: ExtractedDomPost
  posts: ExtractedDomPost[]
}

export interface CaptureOptions {
  authenticated?: boolean
  useProxy?: boolean
}

export interface SnapshotForwardItem {
  type: 'link' | 'file'
  url: string
  title: string
  sourcePostNumber?: number
  sourceAuthor?: string
}

export interface CaptureResult {
  buffer: Buffer
  forwardItems?: SnapshotForwardItem[]
}

export interface SnapshotRenderer {
  capture(url: string, options?: CaptureOptions): Promise<Buffer | CaptureResult>
  dispose?(): Promise<void>
}

export const Config: Schema<Config> = Schema.object({
  enabled: Schema.boolean().description(TEXT.enabled).default(true),
  forumOrigin: Schema.string().description(TEXT.forumOrigin).default(''),
  frontProxyEnabled: Schema.boolean().description(TEXT.frontProxyEnabled).default(false),
  frontProxyOrigin: Schema.string().description(TEXT.frontProxyOrigin).default(''),
  tCookie: Schema.string().role('secret').description(TEXT.tCookie).default(''),
  executablePath: Schema.string().description(TEXT.executablePath).default(''),
  userAgent: Schema.string().description(TEXT.userAgent).default(DEFAULT_USER_AGENT),
  navigationTimeout: Schema.number().description(TEXT.navigationTimeout).default(DEFAULT_TIMEOUT),
  pageWaitUntil: Schema.union([
    Schema.const('domcontentloaded').description('推荐：页面主结构就绪后继续抓取。'),
    Schema.const('load').description('等待 load 事件；若超时建议改用 domcontentloaded。'),
    Schema.const('networkidle').description('等待网络空闲；适合静态页面，不适合长连接站点。'),
  ]).role('radio').default('domcontentloaded').description(TEXT.pageWaitUntil),
  browserTimeout: Schema.number().description(TEXT.browserTimeout).default(DEFAULT_TIMEOUT),
  captureDelay: Schema.number().description(TEXT.captureDelay).default(DEFAULT_DELAY),
  commentWindowCount: Schema.natural().min(1).description(TEXT.commentWindowCount),
  viewportWidth: Schema.number().description(TEXT.viewportWidth).default(1280),
  viewportHeight: Schema.number().description(TEXT.viewportHeight).default(960),
  headless: Schema.boolean().description(TEXT.headless).default(true),
  closeBrowserAfterCapture: Schema.boolean().description(TEXT.closeBrowserAfterCapture).default(false),
  sendFailureMessage: Schema.boolean().description(TEXT.sendFailureMessage).default(false),
  napcatMergedForward: Schema.boolean().description(TEXT.napcatMergedForward).default(false),
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
  const unique = (values) => [...new Set(values.map((value) => clean(value)).filter(Boolean))]
  const textOf = (node) => clean(node?.textContent)
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
      insertBlockNoteBefore(details, '原折叠内容', 'details 已自动展开')
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
        insertBlockNoteBefore(node, '原剧透内容', '已自动展开')
      } else if (!node.querySelector(':scope > .snapshot-hidden-inline-note')) {
        node.prepend(createInlineNote('原剧透'))
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
  const collectQuoteLines = (root, fallbackHref) => {
    if (!(root instanceof HTMLElement)) return fallbackHref ? [fallbackHref] : []
    const nodes = Array.from(root.querySelectorAll('p, li, pre, code, blockquote, .quote, .onebox-metadata, .onebox-summary, .contents'))
    const lines = unique(nodes.map((node) => textOf(node)))
      .filter((line) => line.length <= 220)
      .slice(0, 4)
    if (lines.length) return lines
    const fallback = textOf(root)
    return fallback ? [fallback.slice(0, 220)] : (fallbackHref ? [fallbackHref] : [])
  }
  const simplifyQuotes = (root) => {
    const quoteSelectors = ['aside.quote', 'aside.quote-modified', 'aside.onebox', 'aside.onebox-body', '.onebox.allowlistedgeneric', '.quote-modified']
    const nodes = Array.from(root.querySelectorAll(quoteSelectors.join(',')))
    for (const node of nodes) {
      if (!(node instanceof HTMLElement)) continue
      if (node.dataset.snapshotSimpleQuote === 'true') continue
      node.dataset.snapshotSimpleQuote = 'true'

      const titleAnchors = Array.from(node.querySelectorAll(':scope > .title a[href], :scope header a[href], :scope a[href]'))
        .filter((anchor) => anchor instanceof HTMLAnchorElement)
      const titleAnchor = titleAnchors.find((anchor) => clean(anchor.textContent) && !clean(anchor.textContent).endsWith(':')) || titleAnchors[titleAnchors.length - 1]
      const href = clean(node.getAttribute('data-onebox-src')) || clean(titleAnchor?.href || titleAnchor?.getAttribute('href'))
      const title = clean(
        titleAnchor?.textContent
        || node.querySelector('.onebox-title, .title .quote-topic, .title, header, .source')?.textContent
      ) || stripUrl(href)

      const metaParts = unique([
        textOf(node.querySelector(':scope > .title a[href], .source a[href], .onebox-metadata .label1, .onebox-metadata .domain')),
        href ? stripUrl(href).split('/')[0] : '',
      ]).filter((value) => value && value !== title)

      const bodyRoot = node.querySelector(':scope > blockquote, .onebox-body, .onebox-metadata, .contents, .quote, article, .source') || node
      const lines = collectQuoteLines(bodyRoot, href)
        .filter((line) => line && line !== title && !metaParts.includes(line))
        .slice(0, 4)

      const replacement = document.createElement('blockquote')
      replacement.className = 'snapshot-simple-quote'
      if (href) {
        const link = document.createElement('a')
        link.className = 'snapshot-quote-title'
        link.href = href
        link.textContent = title || href
        replacement.appendChild(link)
      } else if (title) {
        const heading = document.createElement('strong')
        heading.className = 'snapshot-quote-title'
        heading.textContent = title
        replacement.appendChild(heading)
      }
      if (metaParts.length) {
        const meta = document.createElement('span')
        meta.className = 'snapshot-quote-meta'
        meta.textContent = metaParts.join(' / ')
        replacement.appendChild(meta)
      }
      for (const line of lines) {
        const paragraph = document.createElement('p')
        paragraph.className = 'snapshot-quote-line'
        paragraph.textContent = line
        replacement.appendChild(paragraph)
      }
      if (!replacement.children.length) continue
      node.replaceWith(replacement)
    }
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
    title.textContent = '\u94fe\u63a5\u5c55\u5f00\uff08\u6587\u5b57 -> \u5b9e\u9645\u94fe\u63a5\uff09'
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
      arrow.textContent = '->'
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
    simplifyQuotes(body)
    const links = collectHiddenLinks(body)
    markDetails(body)
    markSpoilers(body)
    prepareMedia(body)
    appendHiddenLinks(body, links)
  }
`

const SNAPSHOT_FORWARD_ITEM_SCRIPT = String.raw`
  const clean = (value) => (value || '').replace(/\s+/g, ' ').trim()
  const normalizeHref = (value) => {
    const source = clean(value)
    if (!source) return ''
    try {
      const url = new URL(source, document.baseURI)
      url.hash = ''
      return url.toString()
    } catch {
      return source
    }
  }
  const inferTitle = (anchor, href) => {
    const text = clean(anchor?.querySelector('.attachment-name, .title, .snapshot-quote-title')?.textContent) || clean(anchor?.textContent)
    if (text) return text
    try {
      return decodeURIComponent(new URL(href).pathname.split('/').filter(Boolean).pop() || href)
    } catch {
      return href
    }
  }
  const isMediaAnchor = (anchor) => {
    if (!(anchor instanceof HTMLAnchorElement)) return false
    if (anchor.classList.contains('lightbox') || anchor.classList.contains('image-lightbox')) return true
    if (anchor.querySelector('img, picture, source, video, audio, svg, figure, .lightbox-wrapper, .lightbox__content, .image-wrapper')) return true
    const href = normalizeHref(anchor.href || anchor.getAttribute('href'))
    return /\.(?:png|jpe?g|gif|webp|bmp|svg|avif)(?:$|[?#])/i.test(href)
  }
  const isFileAnchor = (anchor) => {
    if (!(anchor instanceof HTMLAnchorElement)) return false
    if (isMediaAnchor(anchor)) return false
    if (anchor.hasAttribute('download')) return true
    if (anchor.classList.contains('attachment')) return true
    if (anchor.closest('.attachment, .attachment-wrapper, .attachment-list')) return true
    const href = normalizeHref(anchor.href || anchor.getAttribute('href'))
    return /\.(?:zip|rar|7z|tar|gz|bz2|xz|pdf|epub|txt|md|csv|json|ya?ml|toml|log|apk|ipa|exe|msi|dmg|pkg|deb|rpm|jar|iso|img|docx?|xlsx?|pptx?|psd|ai|sketch|torrent)(?:$|[?#])/i.test(href)
  }
  const forumRoot = (() => {
    try {
      const url = new URL(document.baseURI)
      url.pathname = '/'
      url.search = ''
      url.hash = ''
      return url.toString()
    } catch {
      return ''
    }
  })()
  const seen = new Set()
  const items = []
  const push = (item) => {
    if (!item?.url || !item?.type) return
    const key = item.type + '|' + item.url
    if (seen.has(key)) return
    seen.add(key)
    items.push(item)
  }
  for (const body of Array.from(document.querySelectorAll('[data-snapshot-post-body]'))) {
    if (!(body instanceof HTMLElement)) continue
    const sourcePostNumber = Number(body.getAttribute('data-source-post-number') || '') || undefined
    const sourceAuthor = clean(body.getAttribute('data-source-author')) || undefined
    for (const anchor of Array.from(body.querySelectorAll('a[href]'))) {
      if (!(anchor instanceof HTMLAnchorElement)) continue
      if (anchor.closest('.snapshot-link-reference-section')) continue
      const url = normalizeHref(anchor.href || anchor.getAttribute('href'))
      if (!url || isMediaAnchor(anchor)) continue
      const title = inferTitle(anchor, url)
      const normalizedTitle = clean(title).toLowerCase()
      const normalizedUrl = url.toLowerCase()
      if (url === forumRoot && (!normalizedTitle || normalizedTitle === normalizedUrl || normalizedTitle === stripUrl(url).toLowerCase())) continue
      if (isFileAnchor(anchor)) {
        push({ type: 'file', url, title, sourcePostNumber, sourceAuthor })
      } else {
        push({ type: 'link', url, title, sourcePostNumber, sourceAuthor })
      }
    }
  }
  return items
`

const DISCOURSE_DOM_EXTRACT_SCRIPT = String.raw`
  const clean = (value) => (value || '').replace(/\s+/g, ' ').trim()
  const text = (node) => clean(node?.textContent)
  const attr = (node, name) => clean(node?.getAttribute(name))
  const expandCompactNumber = (source) => {
    const compactMatch = source.match(/^(\d+(?:\.\d+)?)\s*(k|m|b|w|\u4e07|\u5104|\u4ebf)?$/i)
    if (!compactMatch) return 0

    const base = Number(compactMatch[1])
    const unit = (compactMatch[2] || '').toLowerCase()
    const multiplier = unit === 'k' ? 1e3
      : unit === 'm' ? 1e6
      : unit === 'b' ? 1e9
      : unit === 'w' || unit === '\u4e07' ? 1e4
      : unit === '\u5104' || unit === '\u4ebf' ? 1e8
      : 1
    return Number.isFinite(base) ? Math.round(base * multiplier) : 0
  }
  const parseStandaloneNumber = (value) => {
    const source = clean(String(value || '')).replace(/,/g, '')
    if (!source) return 0

    const normalized = source
      .replace(/^(?:about|approximately|approx\.?|\u7ea6|\u5927\u7ea6)\s+/i, '')
      .replace(/\s*(?:\u4f4d|\u4eba|\u4e2a)?\s*(?:\u70b9\u8d5e|\u8d5e\u540c|\u8d5e|\u53cd\u5e94|\u56de\u5e94|likes?|reactions?|views?|\u6d4f\u89c8|\u6b21\u6d4f\u89c8|\u6b21\u67e5\u770b|\u67e5\u770b)?$/i, '')
      .trim()

    return expandCompactNumber(normalized)
  }
  const parseNumber = (value) => {
    const source = clean(String(value || '')).replace(/,/g, '')
    if (!source) return 0

    const standalone = expandCompactNumber(source)
    if (standalone) return standalone

    const numericMatch = source.match(/\d+(?:\.\d+)?/)
    if (!numericMatch) return 0
    const numeric = Number(numericMatch[0])
    return Number.isFinite(numeric) ? Math.round(numeric) : 0
  }
  const cssVar = (node, name) => clean(node?.getAttribute('style')?.match(new RegExp(name + ':\\s*([^;]+)'))?.[1]) || clean(node ? getComputedStyle(node).getPropertyValue(name) : '')
  const parsePostNumber = (article) => parseNumber(article?.id || article?.getAttribute('data-post-number') || '')
  const getLikeCount = (article) => {
    if (!article) return 0

    const reactionSpanTotal = Array.from(article.querySelectorAll('.discourse-reactions-counter .reactions-counter'))
      .map((node) => parseStandaloneNumber(attr(node, 'data-value')) || parseStandaloneNumber(text(node)))
      .filter(Boolean)
      .reduce((sum, count) => sum + count, 0)

    const fallbackValues = [
      parseStandaloneNumber(attr(article, 'data-like-count')),
      parseStandaloneNumber(attr(article.querySelector('[data-like-count]'), 'data-like-count')),
      parseStandaloneNumber(text(article.querySelector('.like-count, .who-liked, .toggle-like .d-button-label, button.toggle-like .d-button-label'))),
    ]

    return Math.max(reactionSpanTotal, ...fallbackValues, 0)
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
  const getPostCount = (articles, topicMap) => {
    const candidates = articles.map(parsePostNumber)
    const counterNodes = document.querySelectorAll('[data-highest-post-number], [data-topic-post-count], [data-post-count], #topic-progress-wrapper [aria-valuemax], .timeline-scrollarea[aria-valuemax], .timeline-handle[aria-valuemax]')
    for (const element of Array.from(counterNodes)) {
      candidates.push(parseNumber(
        attr(element, 'data-highest-post-number')
        || attr(element, 'data-topic-post-count')
        || attr(element, 'data-post-count')
        || attr(element, 'aria-valuemax')
      ))
    }

    const topicMapPostCount = parseNumber(
      text(topicMap?.querySelector('.topic-map__posts-trigger .number, .topic-map-post-links .number, .topic-map-posts .number, .posts-map .number'))
      || text(topicMap?.querySelector('.topic-map__posts-trigger, .topic-map-post-links, .topic-map-posts, .posts-map'))
    )
    if (topicMapPostCount) candidates.push(topicMapPostCount)

    return Math.max(0, ...candidates)
  }

  if (document.querySelector('.page-not-found')) {
    return { title: '', tags: [], viewCount: 0, likeCount: 0, error: '\u627e\u4e0d\u5230\u9875\u9762\u6216\u5f53\u524d\u8d26\u53f7\u65e0\u6743\u8bbf\u95ee\u8be5\u5e16\u5b50\u3002' }
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
  const articles = Array.from(document.querySelectorAll('article[id^="post_"]'))
  const posts = articles
    .map(getPost)
    .filter((post) => post && post.postNumber > 0)
    .sort((left, right) => left.postNumber - right.postNumber)
  const opArticle = articles.find((article) => parsePostNumber(article) === 1)
  const requestedArticle = requestedPostNumber > 1
    ? articles.find((article) => parsePostNumber(article) === requestedPostNumber)
    : undefined

  return {
    title,
    tags,
    viewCount: parseNumber(
      attr(topicMap?.querySelector('.topic-map__views-trigger .number, .topic-map__views-trigger'), 'data-value')
      || text(topicMap?.querySelector('.topic-map__views-trigger .number'))
      || text(topicMap?.querySelector('.topic-map__views-trigger'))
    ),
    postCount: getPostCount(articles, topicMap),
    likeCount: parseNumber(
      attr(topicMap?.querySelector('.topic-map__likes-trigger .number, .topic-map__likes-trigger'), 'data-value')
      || text(topicMap?.querySelector('.topic-map__likes-trigger .number'))
      || text(topicMap?.querySelector('.topic-map__likes-trigger'))
    ),
    category: categoryName ? {
      name: categoryName,
      color: cssVar(categoryElement, '--category-badge-color'),
      textColor: cssVar(categoryElement, '--category-badge-text-color'),
    } : undefined,
    opPost: getPost(opArticle),
    requestedPost: getPost(requestedArticle),
    posts,
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
  return urls.find((url) => matchesForumOrigin(url, config))
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
  if (targetOrigin && matchesForumOrigin(targetOrigin, config)) {
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

function normalizeOptionalPositiveInteger(value?: number) {
  if (value == null || value === '') return undefined
  const normalized = Math.trunc(Number(value))
  return Number.isFinite(normalized) && normalized > 0 ? normalized : undefined
}

export function resolveConfig(config: Config): ResolvedConfig {
  const forumOrigin = normalizeOrigin(config.forumOrigin)
  const frontProxyOrigin = normalizeOrigin(config.frontProxyOrigin)
  const authCookieSource = (config.tCookie || config.cookieHeader || '').trim()

  return {
    enabled: config.enabled ?? true,
    forumOrigin,
    frontProxyEnabled: config.frontProxyEnabled ?? false,
    frontProxyOrigin,
    tCookie: extractTCookie(authCookieSource),
    authCookieSource,
    executablePath: config.executablePath?.trim() || '',
    userAgent: config.userAgent?.trim() || DEFAULT_USER_AGENT,
    navigationTimeout: config.navigationTimeout ?? DEFAULT_TIMEOUT,
    pageWaitUntil: config.pageWaitUntil ?? 'domcontentloaded',
    browserTimeout: Math.max(0, config.browserTimeout ?? DEFAULT_TIMEOUT),
    captureDelay: config.captureDelay ?? DEFAULT_DELAY,
    commentWindowCount: normalizeOptionalPositiveInteger(config.commentWindowCount),
    viewportWidth: config.viewportWidth ?? 1280,
    viewportHeight: config.viewportHeight ?? 960,
    headless: config.headless ?? true,
    closeBrowserAfterCapture: config.closeBrowserAfterCapture ?? false,
    sendFailureMessage: config.sendFailureMessage ?? false,
    napcatMergedForward: config.napcatMergedForward ?? false,
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

function normalizeForwardItemUrl(value?: string) {
  const source = value?.trim()
  if (!source) return ''

  try {
    const url = new URL(source)
    url.hash = ''
    return url.toString()
  } catch {
    return source
  }
}

function inferForwardItemTitle(url: string, fallback?: string) {
  const preferred = fallback?.trim()
  if (preferred) return preferred

  try {
    const pathname = new URL(url).pathname.split('/').filter(Boolean).pop() || url
    return decodeURIComponent(pathname)
  } catch {
    return url
  }
}

function dedupeForwardItems(items?: SnapshotForwardItem[]) {
  const map = new Map<string, SnapshotForwardItem>()

  for (const item of items || []) {
    const url = normalizeForwardItemUrl(item?.url)
    if (!url || !item?.type) continue
    const title = inferForwardItemTitle(url, item.title)
    const key = `${item.type}|${url}`
    if (map.has(key)) continue
    map.set(key, {
      type: item.type,
      url,
      title,
      sourcePostNumber: item.sourcePostNumber,
      sourceAuthor: item.sourceAuthor?.trim() || undefined,
    })
  }

  return [...map.values()]
}

function normalizeCaptureResult(result: Buffer | CaptureResult) {
  if (Buffer.isBuffer(result)) return { buffer: result, forwardItems: [] as SnapshotForwardItem[] }
  if (result && typeof result === 'object' && Buffer.isBuffer(result.buffer)) {
    return { buffer: result.buffer, forwardItems: dedupeForwardItems(result.forwardItems) }
  }

  throw new Error('\u622a\u56fe\u6e32\u67d3\u5668\u672a\u8fd4\u56de\u6709\u6548\u7684\u56fe\u7247\u6570\u636e\u3002')
}

function toNapCatActionName(action: string) {
  return action.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase())
}

function isDirectSession(session: Session) {
  const directSession = session as Session & { isDirect?: boolean; subtype?: string; channel?: { type?: number | string } }
  return directSession.isDirect === true
    || directSession.subtype === 'private'
    || directSession.channel?.type === 1
    || (!session.guildId && !!session.userId && session.channelId === session.userId)
}

function resolveNapCatForwardTarget(session: Session) {
  if (isDirectSession(session) && session.userId) return { direct: true as const, user_id: String(session.userId) }

  const groupId = session.guildId || session.channelId
  if (groupId) return { direct: false as const, group_id: String(groupId) }
  if (session.userId) return { direct: true as const, user_id: String(session.userId) }
  return null
}

async function callNapCatAction(session: Session, action: string, params: Record<string, any>) {
  const bot = session.bot as Record<string, any> | undefined
  const internal = bot?.internal as Record<string, any> | undefined
  const actionNames = [action, toNapCatActionName(action)]

  for (const target of [internal, bot]) {
    for (const name of actionNames) {
      if (typeof target?.[name] === 'function') return await target[name](params)
    }
  }

  for (const target of [internal, bot]) {
    if (typeof target?.request === 'function') return await target.request(action, params)
    if (typeof target?._request === 'function') return await target._request(action, params)
    if (typeof target?.call === 'function') return await target.call(action, params)
    if (typeof target?.get === 'function') return await target.get(action, params)
  }

  throw new Error('\u5f53\u524d\u9002\u914d\u5668\u672a\u66b4\u9732 NapCat \u5408\u5e76\u8f6c\u53d1\u63a5\u53e3\u3002')
}

function formatNapCatNodeNickname(item: SnapshotForwardItem) {
  const parts = [item.type === 'file' ? '\u5e16\u5b50\u6587\u4ef6' : '\u5e16\u5b50\u94fe\u63a5']
  if (item.sourcePostNumber) parts.push(`#${item.sourcePostNumber}`)
  if (item.sourceAuthor?.trim()) parts.push(item.sourceAuthor.trim())
  return parts.join(' / ')
}

function buildNapCatNodeContent(item: SnapshotForwardItem) {
  if (item.type === 'file') {
    return [{
      type: 'file',
      data: {
        file: item.url,
        url: item.url,
        name: inferForwardItemTitle(item.url, item.title),
      },
    }]
  }

  const title = inferForwardItemTitle(item.url, item.title)
  const text = title && title !== item.url ? `${title}
${item.url}` : item.url
  return [{ type: 'text', data: { text } }]
}

async function sendNapCatMergedForward(session: Session, items: SnapshotForwardItem[]) {
  const forwardItems = dedupeForwardItems(items)
  if (!forwardItems.length) return false

  const target = resolveNapCatForwardTarget(session)
  if (!target) return false

  const senderId = String((session.bot as any)?.selfId || (session as any)?.selfId || session.userId || 0)
  const messages = forwardItems.map((item) => ({
    type: 'node',
    data: {
      user_id: senderId,
      nickname: formatNapCatNodeNickname(item),
      content: buildNapCatNodeContent(item),
    },
  }))

  const action = target.direct ? 'send_private_forward_msg' : 'send_group_forward_msg'
  const payload = { ...target, messages }

  try {
    await callNapCatAction(session, action, payload)
  } catch {
    await callNapCatAction(session, 'send_forward_msg', payload)
  }

  return true
}

function sortPostsByNumber(posts: TopicPost[]) {
  return [...posts].sort((left, right) => (left.post_number ?? 0) - (right.post_number ?? 0))
}

export function selectCommentPosts(posts: TopicPost[] | undefined, requestedPostNumber: number, commentWindowCount?: number) {
  const replyPosts = sortPostsByNumber((posts || []).filter((post) => (post.post_number ?? 0) > 1))
  const normalizedWindow = normalizeOptionalPositiveInteger(commentWindowCount)

  if (!normalizedWindow) {
    if (requestedPostNumber <= 1) return []
    return replyPosts.filter((post) => post.post_number === requestedPostNumber).slice(0, 1)
  }

  if (!replyPosts.length) return []

  if (requestedPostNumber <= 1) {
    return replyPosts.slice(0, normalizedWindow)
  }

  const targetIndex = replyPosts.findIndex((post) => post.post_number === requestedPostNumber)
  if (targetIndex < 0) return []

  const expectedSize = normalizedWindow % 2 === 0 ? normalizedWindow + 1 : normalizedWindow
  const finalSize = Math.min(expectedSize, replyPosts.length)
  const half = Math.floor(finalSize / 2)
  let start = targetIndex - half
  let end = targetIndex + half

  if (start < 0) {
    end = Math.min(replyPosts.length - 1, end - start)
    start = 0
  }

  if (end > replyPosts.length - 1) {
    const overflow = end - (replyPosts.length - 1)
    start = Math.max(0, start - overflow)
    end = replyPosts.length - 1
  }

  while (end - start + 1 < finalSize && start > 0) start -= 1
  while (end - start + 1 < finalSize && end < replyPosts.length - 1) end += 1

  return replyPosts.slice(start, end + 1)
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
    items.push(`<span class="meta-badge meta-badge-category" style="--badge-bg:${background};--badge-fg:${foreground}">${escapeHtml(category)}</span>`)
  }

  items.push(...tags.map((tag) => `<span class="meta-badge meta-badge-tag">#${escapeHtml(tag)}</span>`))
  return `<div class="meta-badges">${items.join('')}</div>`
}

function renderStatCard(label: string, value: string) {
  return `<div class="meta-stat"><span class="meta-stat-label">${escapeHtml(label)}</span><strong class="meta-stat-value">${escapeHtml(value)}</strong></div>`
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
    <header class="topic-author-card">
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
    </header>`
}

function renderCommentCard(post: TopicPost, baseOrigin: string) {
  if (!post.post_number || post.post_number <= 1) return ''

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
  const cooked = post.cooked || '<p>\u8be5\u697c\u5c42\u6682\u65f6\u65e0\u53ef\u5c55\u793a\u5185\u5bb9\u3002</p>'

  return `
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
                <span class="comment-pill comment-floor-pill">#${post.post_number}</span>
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
        <div class="post comment-body" data-snapshot-post-body="comment" data-source-post-number="${post.post_number}" data-source-author="${escapeHtml(displayNameText)}">${cooked}</div>
      </article>`
}

function renderCommentSections(posts: TopicPost[], baseOrigin: string) {
  const commentPosts = posts.filter((post) => (post.post_number ?? 0) > 1)
  if (!commentPosts.length) return ''

  return `
    <section class="comment-section">
      <div class="section-heading">
        <span class="section-kicker">\u76f8\u5173\u8bc4\u8bba</span>
        <strong>${commentPosts.length} \u6761</strong>
      </div>
      <div class="comment-list">
        ${commentPosts.map((post) => renderCommentCard(post, baseOrigin)).join('')}
      </div>
    </section>`
}

function renderTopicHtml(payload: TopicPayload, opPost: TopicPost, commentPosts: TopicPost[], baseOrigin: string, sitePayload?: SitePayload) {
  const title = escapeHtml(payload.title || 'Discourse Topic')
  const cooked = opPost.cooked || '<p>\u672a\u83b7\u53d6\u5230\u697c\u4e3b\u6b63\u6587\u3002</p>'
  const viewCount = payload.views ?? 0
  const postCount = payload.posts_count ?? 0
  const likeCount = getPostLikeCount(opPost)
  const createdAt = formatDateTime(opPost.created_at)
  const badges = renderTopicBadges(payload, sitePayload)
  const topicAuthorHeader = renderTopicAuthorHeader(opPost, baseOrigin)
  const commentSection = renderCommentSections(commentPosts, baseOrigin)
  const authorName = escapeHtml(getDisplayName(opPost))

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
      --page: #f5f7fb;
      --panel: #ffffff;
      --panel-soft: #f8fafc;
      --line: #d8dee9;
      --line-strong: #c4ccd8;
      --text: #111827;
      --text-soft: #4b5563;
      --accent: #2563eb;
      --quote: #eff6ff;
      --quote-line: #93c5fd;
      --radius-lg: 18px;
      --radius-md: 14px;
      --shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      --sans: 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--page);
      color: var(--text);
      font-family: var(--sans);
    }
    .wrap {
      width: min(960px, calc(100vw - 32px));
      margin: 0 auto;
      padding: 16px 0 24px;
    }
    .panel {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 22px;
      box-shadow: var(--shadow);
      padding: 22px;
    }
    .title {
      margin: 0;
      font-size: 34px;
      line-height: 1.3;
      font-weight: 800;
      word-break: break-word;
    }
    .meta-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 14px;
    }
    .meta-badge {
      display: inline-flex;
      align-items: center;
      min-height: 30px;
      padding: 0 12px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 700;
      border: 1px solid rgba(148, 163, 184, 0.28);
    }
    .meta-badge-category {
      background: var(--badge-bg, #f97316);
      color: var(--badge-fg, #ffffff);
      border-color: transparent;
    }
    .meta-badge-tag {
      background: #f8fafc;
      color: #1d4ed8;
    }
    .topic-author-card, .post-shell, .comment-card {
      background: var(--panel-soft);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
    }
    .topic-author-card {
      margin-top: 16px;
      padding: 16px;
    }
    .topic-author, .comment-author {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      min-width: 0;
    }
    .topic-author-avatar, .comment-avatar {
      width: 52px;
      height: 52px;
      flex: 0 0 52px;
      border-radius: 50%;
      object-fit: cover;
      background: #ffffff;
      border: 1px solid var(--line-strong);
    }
    .topic-author-avatar-fallback, .comment-avatar-fallback {
      display: grid;
      place-items: center;
      font-weight: 800;
      color: var(--accent);
      background: #dbeafe;
    }
    .topic-author-copy, .comment-author-copy { min-width: 0; }
    .topic-author-name-row, .comment-name-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      line-height: 1.4;
    }
    .topic-author-username, .comment-username {
      color: var(--text-soft);
      font-size: 13px;
      font-weight: 600;
    }
    .topic-author-meta-row, .comment-meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }
    .comment-pill {
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      padding: 0 10px;
      border-radius: 999px;
      background: #e0ecff;
      color: #1d4ed8;
      font-size: 12px;
      font-weight: 700;
    }
    .section-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
      color: var(--text-soft);
    }
    .section-kicker {
      font-size: 13px;
      font-weight: 700;
      color: var(--accent);
    }
    .post-shell {
      margin-top: 16px;
      padding: 18px;
    }
    .post {
      font-size: 17px;
      line-height: 1.85;
      color: var(--text);
      word-break: break-word;
    }
    .post > :first-child { margin-top: 0; }
    .post > :last-child { margin-bottom: 0; }
    .post p, .post ul, .post ol, .post blockquote, .post pre, .post table, .post aside, .post details { margin: 0 0 1em; }
    .post a {
      color: #1d4ed8;
      text-decoration: none;
      border-bottom: 1px solid rgba(37, 99, 235, 0.24);
    }
    .post a.lightbox, .post figure > a, .post .lightbox-wrapper > a, .post .image-wrapper > a { border-bottom: none; }
    .post .lightbox-wrapper .meta, .post figure figcaption, .post .image-wrapper .image-caption { display: none !important; }
    .post .image-wrapper, .post .lightbox-wrapper, .post figure {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      width: 100%;
      max-width: 100%;
      margin: 14px 0 16px;
    }
    .post img:not(.emoji):not(.d-emoji):not([alt^=':']):not([title^=':']), .post video, .post iframe {
      max-width: 100% !important;
      height: auto !important;
      display: block;
      margin: 12px auto;
      border-radius: 14px;
      background: #ffffff;
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
    .post code { padding: 0.12em 0.38em; border-radius: 8px; background: #e5eefc; font-size: 0.92em; }
    .post pre { padding: 14px 16px; border-radius: 14px; background: #0f172a; color: #f8fafc; overflow: hidden; }
    .post pre code { padding: 0; background: transparent; color: inherit; }
    .post blockquote {
      margin-left: 0;
      padding: 12px 14px;
      border-left: 3px solid var(--quote-line);
      border-radius: 0 12px 12px 0;
      background: var(--quote);
      color: var(--text-soft);
    }
    .post blockquote.snapshot-simple-quote {
      padding: 12px 14px;
      border-left-width: 4px;
    }
    .snapshot-quote-title, .snapshot-quote-meta, .snapshot-quote-line {
      display: block;
      margin: 0;
      word-break: break-word;
    }
    .snapshot-quote-title {
      color: var(--text);
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .snapshot-quote-meta {
      color: #64748b;
      font-size: 12px;
      margin-bottom: 6px;
    }
    .snapshot-quote-line::before {
      content: '> ';
      color: #64748b;
      font-weight: 700;
    }
    .snapshot-quote-line + .snapshot-quote-line { margin-top: 2px; }
    .post table { width: 100%; display: block; overflow-x: auto; border-collapse: collapse; border: 1px solid var(--line); border-radius: 12px; background: #ffffff; }
    .post th, .post td { padding: 10px 12px; border-bottom: 1px solid var(--line); border-right: 1px solid var(--line); text-align: left; }
    .post details.snapshot-expanded-hidden { padding: 14px 16px; border-radius: 14px; border: 1px solid var(--line); background: #ffffff; }
    .post details.snapshot-expanded-hidden > summary { cursor: default; color: var(--accent); font-weight: 700; margin-bottom: 10px; }
    .snapshot-hidden-block-note { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 0 0 10px; }
    .snapshot-hidden-chip, .snapshot-hidden-inline-note { display: inline-flex; align-items: center; min-height: 24px; padding: 0 8px; border-radius: 999px; background: #e0ecff; color: #1d4ed8; font-size: 12px; font-weight: 700; white-space: nowrap; }
    .snapshot-hidden-note-text { color: var(--text-soft); font-size: 13px; font-weight: 600; }
    .snapshot-hidden-inline-note { margin-right: 0.45em; vertical-align: middle; }
    .snapshot-spoiler-open { filter: none !important; -webkit-filter: none !important; backdrop-filter: none !important; color: inherit !important; text-shadow: none !important; background: #eef6ff !important; border: 1px dashed #93c5fd; border-radius: 10px; padding: 0.05em 0.4em; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
    .snapshot-spoiler-open img { filter: none !important; -webkit-filter: none !important; }
    .snapshot-spoiler-open.snapshot-spoiler-block { display: block; padding: 12px 14px; margin-bottom: 1em; }
    .snapshot-link-reference-section { margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--line-strong); }
    .snapshot-link-reference-title { color: var(--text-soft); font-size: 12px; font-weight: 700; margin-bottom: 8px; }
    .snapshot-link-reference-list { display: grid; gap: 8px; }
    .snapshot-link-reference-item { display: grid; grid-template-columns: minmax(0, 180px) auto minmax(0, 1fr); gap: 8px; align-items: start; padding: 10px 12px; border-radius: 12px; background: #ffffff; border: 1px solid var(--line); }
    .snapshot-link-reference-text { color: var(--text); font-weight: 700; word-break: break-word; }
    .snapshot-link-reference-arrow { color: var(--text-soft); font-weight: 700; }
    .snapshot-link-reference-url { color: var(--accent); word-break: break-all; }
    .summary {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
      margin-top: 16px;
    }
    .meta-stat {
      display: grid;
      gap: 6px;
      padding: 12px 14px;
      border-radius: 14px;
      background: var(--panel-soft);
      border: 1px solid var(--line);
    }
    .meta-stat-label {
      color: var(--text-soft);
      font-size: 12px;
      font-weight: 700;
    }
    .meta-stat-value {
      color: var(--text);
      font-size: 20px;
      line-height: 1.35;
    }
    .comment-section { margin-top: 20px; }
    .comment-list { display: grid; gap: 12px; }
    .comment-card { padding: 16px; }
    .comment-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 14px;
      margin-bottom: 12px;
    }
    .comment-stats {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 8px;
    }
    .comment-stat {
      display: inline-flex;
      align-items: baseline;
      gap: 6px;
      min-height: 30px;
      padding: 0 10px;
      border-radius: 999px;
      background: #ffffff;
      border: 1px solid var(--line);
      color: var(--text-soft);
      font-size: 13px;
    }
    .comment-stat strong { color: var(--text); font-size: 14px; }
    .comment-body { font-size: 15px; line-height: 1.8; }
    @media (max-width: 860px) {
      .wrap { width: min(100vw - 20px, 960px); padding: 10px 0 18px; }
      .panel { padding: 16px; }
      .title { font-size: 28px; }
      .summary { grid-template-columns: 1fr 1fr; }
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
      <div class="section-heading">
        <span class="section-kicker">Discourse Snapshot</span>
        <span>${escapeHtml(createdAt)}</span>
      </div>
      <h1 class="title">${title}</h1>
      ${badges}
      ${topicAuthorHeader}
      <section class="post-shell">
        <div class="section-heading">
          <span class="section-kicker">\u9996\u697c\u6b63\u6587</span>
          <strong>#1</strong>
        </div>
        <article class="post" data-snapshot-post-body="op" data-source-post-number="1" data-source-author="${authorName}">${cooked}</article>
      </section>
      <section class="summary">
        ${renderStatCard('\u6d4f\u89c8\u91cf', formatNumber(viewCount))}
        ${renderStatCard('\u603b\u697c\u5c42', formatNumber(postCount))}
        ${renderStatCard('\u53d1\u5e16\u65f6\u95f4', createdAt)}
        ${renderStatCard('\u9996\u697c\u70b9\u8d5e', formatNumber(likeCount))}
      </section>
      ${commentSection}
    </section>
  </main>
</body>
</html>`
}

async function extractTopicFromPage(page: BrowserPage, url: string, requestedPostNumber: number, config: ResolvedConfig): Promise<ExtractedDomTopic> {
  await page.goto(url, {
    waitUntil: config.pageWaitUntil,
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

function toTopicPosts(posts: ExtractedDomPost[] | undefined) {
  return (posts || []).map((post) => toTopicPost(post)).filter((post): post is TopicPost => !!post)
}

function mergeExtractedPosts(...postGroups: Array<ExtractedDomPost[] | undefined>) {
  const merged = new Map<number, ExtractedDomPost>()
  for (const group of postGroups) {
    for (const post of group || []) {
      if (!post?.postNumber) continue
      merged.set(post.postNumber, post)
    }
  }
  return [...merged.values()].sort((left, right) => left.postNumber - right.postNumber)
}

function buildRenderDataFromExtractedTopic(snapshot: ExtractedDomTopic) {
  const categoryId = snapshot.category?.name ? 1 : undefined
  const payload: TopicPayload = {
    title: snapshot.title,
    views: snapshot.viewCount,
    posts_count: snapshot.postCount,
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
  }
}

export function createBrowserLaunchOptions(config: ResolvedConfig, useProxy = true): BrowserLaunchOptions {
  const options: BrowserLaunchOptions = {
    executablePath: config.executablePath,
    headless: config.headless,
    timeout: config.browserTimeout > 0 ? config.browserTimeout : 0,
    args: [
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-vulkan',
      '--use-gl=swiftshader',
      '--no-first-run',
    ],
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
      let captureResult: Buffer | CaptureResult

      try {
        captureResult = await captureWithProxyFallback(false)
      } catch (publicError) {
        logger.warn(publicError)

        if (!config.authCookieSource && !config.tCookie) {
          await session.send(formatCaptureFailureMessage(targetUrl, publicError))
          logger.warn(`${TEXT.failure}${targetUrl}`)
          return result
        }

        try {
          captureResult = await captureWithProxyFallback(true)
        } catch (authError) {
          logger.warn(authError)
          logger.warn(`${TEXT.failure}${targetUrl}`)
          await session.send(formatCaptureFailureMessage(targetUrl, publicError, authError))
          return result
        }
      }

      const { buffer, forwardItems } = normalizeCaptureResult(captureResult)
      await sendSnapshot(session, buffer)

      if (config.napcatMergedForward && forwardItems.length) {
        try {
          await sendNapCatMergedForward(session, forwardItems)
        } catch (forwardError) {
          logger.warn(forwardError)
        }
      }

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

  private memoizeBrowserTask(useProxy: boolean) {
    const task = this.launch(useProxy).catch((error) => {
      if (useProxy) this.proxyBrowserTask = undefined
      else this.directBrowserTask = undefined
      throw error
    })

    if (useProxy) this.proxyBrowserTask = task
    else this.directBrowserTask = task
    return task
  }

  private async getBrowser(useProxy: boolean) {
    if (this.config.closeBrowserAfterCapture) {
      return this.launch(useProxy)
    }

    if (useProxy && this.config.proxyServer) {
      return this.proxyBrowserTask ||= this.memoizeBrowserTask(true)
    }

    return this.directBrowserTask ||= this.memoizeBrowserTask(false)
  }

  private async launch(useProxy: boolean) {
    const chromium = await loadChromium()
    return chromium.launch(createBrowserLaunchOptions(this.config, useProxy))
  }

  private async closeBrowser(useProxy: boolean) {
    const task = useProxy && this.config.proxyServer ? this.proxyBrowserTask : this.directBrowserTask
    if (useProxy && this.config.proxyServer) this.proxyBrowserTask = undefined
    else this.directBrowserTask = undefined

    const browser = await task?.catch(() => null)
    if (browser) await browser.close().catch(() => null)
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

    try {
      const requestedPostNumber = extractRequestedPostNumber(url)
      const opSourceUrl = createTopicPostUrl(url, this.config, 1)
      const opSnapshot = await this.withPage(browser, opSourceUrl, authenticated, (page) => extractTopicFromPage(page, opSourceUrl, 1, this.config))
      if (!opSnapshot.opPost) throw new Error('\u672a\u4ece Discourse \u9875\u9762\u4e2d\u83b7\u53d6\u5230\u697c\u4e3b\u9996\u5e16\u3002')

      let focusSnapshot: ExtractedDomTopic | undefined
      if (requestedPostNumber > 1) {
        const replySourceUrl = createTopicPostUrl(url, this.config, requestedPostNumber)
        focusSnapshot = await this.withPage(browser, replySourceUrl, authenticated, (page) => extractTopicFromPage(page, replySourceUrl, requestedPostNumber, this.config))
      }

      const mergedPosts = mergeExtractedPosts(opSnapshot.posts, focusSnapshot?.posts)
      const commentPosts = selectCommentPosts(toTopicPosts(mergedPosts), requestedPostNumber, this.config.commentWindowCount)
      const baseOrigin = this.config.frontProxyEnabled && this.config.frontProxyOrigin ? this.config.frontProxyOrigin : this.config.forumOrigin
      const { payload, sitePayload, opPost } = buildRenderDataFromExtractedTopic({
        ...opSnapshot,
        postCount: Math.max(opSnapshot.postCount ?? 0, focusSnapshot?.postCount ?? 0),
      })
      if (!opPost) throw new Error('\u672a\u4ece Discourse \u9875\u9762\u4e2d\u83b7\u53d6\u5230\u697c\u4e3b\u9996\u5e16\u3002')
      const html = renderTopicHtml(payload, opPost, commentPosts, baseOrigin, sitePayload)

      return this.withPage(browser, baseOrigin, authenticated, async (page) => {
        await page.setContent(html, { waitUntil: this.config.pageWaitUntil, timeout: this.config.navigationTimeout })
        await page.evaluate((script) => new Function(script)(), SNAPSHOT_POST_PROCESS_SCRIPT)
        const forwardItems = await page.evaluate((script) => new Function(script)() as SnapshotForwardItem[], SNAPSHOT_FORWARD_ITEM_SCRIPT)
        if (this.config.captureDelay > 0) await page.waitForTimeout(this.config.captureDelay)

        await page.evaluate((script) => new Function(script)(), DISCOURSE_WAIT_IMAGES_SCRIPT)

        const buffer = await page.screenshot({
          type: 'png',
          fullPage: true,
          timeout: this.config.navigationTimeout,
        })

        return {
          buffer: Buffer.from(buffer),
          forwardItems,
        }
      })
    } finally {
      if (this.config.closeBrowserAfterCapture) {
        await browser.close().catch(() => null)
      }
    }
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

  logger.info(`${TEXT.listenAll}${resolved.forumOrigin}`)

  const renderer = new PlaywrightDiscourseRenderer(resolved)
  ctx.middleware(createLinkshotMiddleware(resolved, renderer, logger))
  ctx.on('dispose', () => renderer.dispose())
}
