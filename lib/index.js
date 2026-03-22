var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Config: () => Config,
  DISCOURSE_CANVAS_HOOK_SCRIPT: () => DISCOURSE_CANVAS_HOOK_SCRIPT,
  PlaywrightDiscourseRenderer: () => PlaywrightDiscourseRenderer,
  apply: () => apply,
  createBrowserLaunchOptions: () => createBrowserLaunchOptions,
  createDiscourseCookies: () => createDiscourseCookies,
  createDiscourseCookiesForOrigins: () => createDiscourseCookiesForOrigins,
  createLinkshotMiddleware: () => createLinkshotMiddleware,
  createTopicJsonUrl: () => createTopicJsonUrl,
  createTopicPageJsonUrl: () => createTopicPageJsonUrl,
  createTopicPostUrl: () => createTopicPostUrl,
  detectUnexpectedDiscourseRoute: () => detectUnexpectedDiscourseRoute,
  extractDiscourseCookiePairs: () => extractDiscourseCookiePairs,
  extractRequestedPostNumber: () => extractRequestedPostNumber,
  extractTCookie: () => extractTCookie,
  extractUrls: () => extractUrls,
  getCookieOrigin: () => getCookieOrigin,
  getCookieOrigins: () => getCookieOrigins,
  getPostLikeCount: () => getPostLikeCount,
  matchesAllowedHost: () => matchesAllowedHost,
  matchesForumOrigin: () => matchesForumOrigin,
  name: () => name,
  normalizeHost: () => normalizeHost,
  normalizeOrigin: () => normalizeOrigin,
  normalizeTopicUrl: () => normalizeTopicUrl,
  pickTargetUrl: () => pickTargetUrl,
  resolveCategoryLabel: () => resolveCategoryLabel,
  resolveConfig: () => resolveConfig,
  rewriteUrlWithFrontProxy: () => rewriteUrlWithFrontProxy,
  sendSnapshot: () => sendSnapshot,
  trimUrlCandidate: () => trimUrlCandidate
});
module.exports = __toCommonJS(index_exports);
var import_koishi = require("koishi");
var TEXT = {
  enabled: "是否启用论坛链接截图功能。",
  platforms: "仅在这些平台上生效；留空表示所有平台。",
  forumOrigin: "论坛主站地址，例如 https://forum.example.com",
  frontProxyEnabled: "是否启用访问论坛的前置域代理，可与 proxyServer 同时开启。",
  frontProxyOrigin: "前置域代理地址，例如 https://forum-proxy.example.com；启用后会把 forumOrigin 的链接改写到这里访问。",
  allowedHosts: "允许触发截图的域名列表；为空时会自动包含 forumOrigin 对应域名。",
  allowSubdomains: "是否允许匹配上述域名的子域名。",
  tCookie: "登录 Cookie 中 _t 的值；既可以直接填 _t 的内容，也可以粘贴完整 Cookie 头，插件会自动提取 _t 并一并注入其他 Cookie。",
  executablePath: "浏览器可执行文件路径，填写本机 Chrome / Edge 的完整路径。",
  userAgent: "截图访问论坛时使用的 User-Agent。",
  navigationTimeout: "接口请求、素材加载与截图的超时时间（毫秒）。",
  captureDelay: "生成截图前额外等待的时间（毫秒），用于等待图片资源完成加载。",
  viewportWidth: "截图浏览器视口宽度。",
  viewportHeight: "截图浏览器视口高度。",
  headless: "是否以无头模式启动浏览器。",
  sendFailureMessage: "截图失败时，是否在聊天中发送失败提示。",
  publicRetryMessage: "公开访问失败，正在重试：",
  authMissingMessage: "未配置登录信息，无法继续重试。",
  publicErrorLabel: "公开",
  authErrorLabel: "登录",
  proxyRetryMessage: "代理访问失败，正在直连重试：",
  proxyErrorLabel: "代理",
  directErrorLabel: "直连",
  proxyServer: "浏览器代理地址，例如 http://127.0.0.1:7890 或 socks5://127.0.0.1:1080。",
  proxyBypass: "代理绕过列表，多个值用逗号分隔，例如 localhost,127.0.0.1。",
  dohEnabled: "是否开启 DoH（Secure DNS）。",
  dohTemplates: "自定义 DoH 地址，例如 https://dns.google/dns-query ；多个地址用空格分隔。",
  injectCanvasHook: "是否注入 canvas / shadow hook。当前 JSON 渲染模式下通常不需要。",
  configIncomplete: "插件尚未完成配置：至少需要填写 forumOrigin、executablePath；如果启用了前置域代理，还需要填写 frontProxyOrigin。",
  listenAll: "已启用论坛链接监听，将监听所有适配器；匹配前缀：",
  listenPlatforms: "已启用论坛链接监听，仅在这些平台生效：",
  detected: "监听到论坛链接：",
  success: "论坛快照发送成功：",
  failure: "论坛快照发送失败：",
  failureMessage: "论坛链接截图失败："
};
var DEFAULT_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var URL_REGEXP = /https?:\/\/[^\s<>"']+/giu;
var TRAILING_PUNCTUATION = /[),.;!?]+$/u;
var DEFAULT_TIMEOUT = 3e4;
var DEFAULT_DELAY = 1200;
var DEFAULT_AVATAR_SIZE = 96;
var name = "discourse-linkshot";
var Config = import_koishi.Schema.object({
  enabled: import_koishi.Schema.boolean().description(TEXT.enabled).default(true),
  platforms: import_koishi.Schema.array(String).description(TEXT.platforms).default([]),
  forumOrigin: import_koishi.Schema.string().description(TEXT.forumOrigin).default(""),
  frontProxyEnabled: import_koishi.Schema.boolean().description(TEXT.frontProxyEnabled).default(false),
  frontProxyOrigin: import_koishi.Schema.string().description(TEXT.frontProxyOrigin).default(""),
  allowedHosts: import_koishi.Schema.array(String).description(TEXT.allowedHosts).default([]),
  allowSubdomains: import_koishi.Schema.boolean().description(TEXT.allowSubdomains).default(false),
  tCookie: import_koishi.Schema.string().role("secret").description(TEXT.tCookie).default(""),
  executablePath: import_koishi.Schema.string().description(TEXT.executablePath).default(""),
  userAgent: import_koishi.Schema.string().description(TEXT.userAgent).default(DEFAULT_USER_AGENT),
  navigationTimeout: import_koishi.Schema.number().description(TEXT.navigationTimeout).default(DEFAULT_TIMEOUT),
  captureDelay: import_koishi.Schema.number().description(TEXT.captureDelay).default(DEFAULT_DELAY),
  viewportWidth: import_koishi.Schema.number().description(TEXT.viewportWidth).default(1280),
  viewportHeight: import_koishi.Schema.number().description(TEXT.viewportHeight).default(960),
  headless: import_koishi.Schema.boolean().description(TEXT.headless).default(true),
  sendFailureMessage: import_koishi.Schema.boolean().description(TEXT.sendFailureMessage).default(false),
  proxyServer: import_koishi.Schema.string().description(TEXT.proxyServer).default(""),
  proxyBypass: import_koishi.Schema.string().description(TEXT.proxyBypass).default(""),
  dohEnabled: import_koishi.Schema.boolean().description(TEXT.dohEnabled).default(false),
  dohTemplates: import_koishi.Schema.string().description(TEXT.dohTemplates).default(""),
  injectCanvasHook: import_koishi.Schema.boolean().description(TEXT.injectCanvasHook).default(true)
});
var DISCOURSE_CANVAS_HOOK_SCRIPT = String.raw`(() => {
  const transparentPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
  if (typeof originalToDataURL === 'function') {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
      configurable: true,
      writable: true,
      value: function(type, encoderOptions) {
        const looksLikeWatermarkSize = this.width > 100 && this.width < 500 && this.width === this.height;
        if (looksLikeWatermarkSize) return transparentPng;
        return originalToDataURL.apply(this, arguments);
      },
    });
  }
})();`;
var DISCOURSE_WAIT_IMAGES_SCRIPT = String.raw`
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
`;
var SNAPSHOT_POST_PROCESS_SCRIPT = String.raw`
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
`;
var DISCOURSE_DOM_EXTRACT_SCRIPT = String.raw`
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
`;
function normalizeOrigin(value) {
  if (!value) return "";
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}
__name(normalizeOrigin, "normalizeOrigin");
function normalizeHost(value) {
  return value.trim().toLowerCase();
}
__name(normalizeHost, "normalizeHost");
function trimUrlCandidate(value) {
  return value.replace(TRAILING_PUNCTUATION, "");
}
__name(trimUrlCandidate, "trimUrlCandidate");
function extractUrls(content) {
  if (!content) return [];
  const matches = content.match(URL_REGEXP) || [];
  return [...new Set(matches.map(trimUrlCandidate).filter(Boolean).filter((value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }))];
}
__name(extractUrls, "extractUrls");
function extractTCookie(value) {
  const source = value?.trim() || "";
  if (!source) return "";
  if (source.startsWith("_t=") || source.includes(";")) {
    const segment = source.split(/;\s*/g).map((item) => item.trim()).find((item) => item.startsWith("_t="));
    return segment?.slice(3).trim() || "";
  }
  return source;
}
__name(extractTCookie, "extractTCookie");
var COOKIE_ATTRIBUTE_NAMES = /* @__PURE__ */ new Set(["path", "domain", "expires", "max-age", "secure", "httponly", "samesite", "priority", "partitioned"]);
function extractDiscourseCookiePairs(value) {
  const source = value?.trim() || "";
  if (!source) return [];
  if (!source.includes(";") && !source.includes("=")) {
    return [{ name: "_t", value: source }];
  }
  const pairs = /* @__PURE__ */ new Map();
  for (const segment of source.split(/;\s*/g)) {
    const item = segment.trim();
    if (!item) continue;
    const index = item.indexOf("=");
    if (index <= 0) continue;
    const name2 = item.slice(0, index).trim();
    const cookieValue = item.slice(index + 1).trim();
    if (!name2 || !cookieValue) continue;
    if (COOKIE_ATTRIBUTE_NAMES.has(name2.toLowerCase())) continue;
    pairs.set(name2, cookieValue);
  }
  if (!pairs.size && source) {
    return [{ name: "_t", value: source }];
  }
  return [...pairs].map(([name2, cookieValue]) => ({ name: name2, value: cookieValue }));
}
__name(extractDiscourseCookiePairs, "extractDiscourseCookiePairs");
function createDiscourseCookiesForOrigins(cookieSource, origins) {
  const cookiePairs = extractDiscourseCookiePairs(cookieSource);
  if (!cookiePairs.length) return [];
  const normalizedOrigins = [...new Set(origins.map((origin) => normalizeOrigin(origin)).filter((origin) => !!origin))];
  return normalizedOrigins.flatMap((origin) => cookiePairs.map(({ name: name2, value }) => ({ name: name2, value, url: origin })));
}
__name(createDiscourseCookiesForOrigins, "createDiscourseCookiesForOrigins");
function createDiscourseCookies(cookieSource, forumOrigin) {
  return createDiscourseCookiesForOrigins(cookieSource, [forumOrigin]);
}
__name(createDiscourseCookies, "createDiscourseCookies");
function summarizeError(error) {
  const message = (error instanceof Error ? error.message : String(error || "未知错误")).replace(/\s+/g, " ").trim();
  return message.length > 120 ? `${message.slice(0, 117)}...` : message;
}
__name(summarizeError, "summarizeError");
function isProxyFallbackError(error) {
  return !!error && typeof error === "object" && "directError" in error;
}
__name(isProxyFallbackError, "isProxyFallbackError");
function summarizeAttemptError(error) {
  if (!isProxyFallbackError(error)) return summarizeError(error);
  const parts = [];
  if (error.proxyError) parts.push(`${TEXT.proxyErrorLabel}：${summarizeError(error.proxyError)}`);
  parts.push(`${TEXT.directErrorLabel}：${summarizeError(error.directError)}`);
  return parts.join("；");
}
__name(summarizeAttemptError, "summarizeAttemptError");
function formatCaptureFailureMessage(targetUrl, publicError, authError) {
  const lines = [`${TEXT.failureMessage}${targetUrl}`, `${TEXT.publicErrorLabel}：${summarizeAttemptError(publicError)}`];
  if (authError) lines.push(`${TEXT.authErrorLabel}：${summarizeAttemptError(authError)}`);
  return lines.join("\n");
}
__name(formatCaptureFailureMessage, "formatCaptureFailureMessage");
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
__name(escapeHtml, "escapeHtml");
function formatNumber(value) {
  return new Intl.NumberFormat("zh-CN").format(value || 0);
}
__name(formatNumber, "formatNumber");
function formatDateTime(value) {
  if (!value) return "未知";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("zh-CN", { hour12: false });
}
__name(formatDateTime, "formatDateTime");
function normalizeColor(value, fallback = "#1f2937") {
  const source = value?.trim().replace(/^#/, "");
  return source && /^[\da-fA-F]{3,8}$/.test(source) ? `#${source}` : fallback;
}
__name(normalizeColor, "normalizeColor");
function matchesAllowedHost(targetUrl, config) {
  if (!config.allowedHosts.length) return false;
  const hostname = new URL(targetUrl).hostname.toLowerCase();
  return config.allowedHosts.some((allowedHost) => hostname === allowedHost || config.allowSubdomains && hostname.endsWith(`.${allowedHost}`));
}
__name(matchesAllowedHost, "matchesAllowedHost");
function matchesForumOrigin(targetUrl, config) {
  if (!config.forumOrigin) return false;
  return targetUrl === config.forumOrigin || targetUrl.startsWith(`${config.forumOrigin}/`) || targetUrl.startsWith(`${config.forumOrigin}?`) || targetUrl.startsWith(`${config.forumOrigin}#`);
}
__name(matchesForumOrigin, "matchesForumOrigin");
function pickTargetUrl(session, config) {
  const content = session.content || session.elements?.join("") || "";
  const urls = extractUrls(content);
  return urls.find((url) => matchesForumOrigin(url, config) || matchesAllowedHost(url, config));
}
__name(pickTargetUrl, "pickTargetUrl");
function extractRequestedPostNumber(targetUrl) {
  try {
    const url = new URL(targetUrl);
    const hashMatch = url.hash.match(/(?:post|reply|comment)[_-]?(\d+)/i);
    if (hashMatch) return Math.max(1, Number(hashMatch[1]) || 1);
    const segments = url.pathname.split("/").filter(Boolean);
    const numericSegments = segments.filter((segment) => /^\d+$/.test(segment)).map((segment) => Number(segment));
    if (numericSegments.length >= 2) return Math.max(1, numericSegments[numericSegments.length - 1] || 1);
    return 1;
  } catch {
    return 1;
  }
}
__name(extractRequestedPostNumber, "extractRequestedPostNumber");
function normalizeTopicUrl(targetUrl, forumOrigin) {
  try {
    const url = new URL(targetUrl);
    if (forumOrigin && url.origin !== forumOrigin) return targetUrl;
    const segments = url.pathname.split("/").filter(Boolean);
    const numericIndexes = segments.map((segment, index) => /^\d+$/.test(segment) ? index : -1).filter((index) => index >= 0);
    if (!numericIndexes.length) return targetUrl;
    const topicIdIndex = numericIndexes.length >= 2 ? numericIndexes[numericIndexes.length - 2] : numericIndexes[numericIndexes.length - 1];
    const normalized = new URL(url.origin);
    normalized.pathname = `/${segments.slice(0, topicIdIndex + 1).join("/")}/1`;
    return normalized.toString();
  } catch {
    return targetUrl;
  }
}
__name(normalizeTopicUrl, "normalizeTopicUrl");
function rewriteUrlWithFrontProxy(targetUrl, forumOrigin, frontProxyOrigin, enabled) {
  if (!enabled || !forumOrigin || !frontProxyOrigin) return targetUrl;
  try {
    const target = new URL(targetUrl);
    if (target.origin !== forumOrigin) return targetUrl;
    const proxied = new URL(frontProxyOrigin);
    proxied.pathname = target.pathname;
    proxied.search = target.search;
    proxied.hash = target.hash;
    return proxied.toString();
  } catch {
    return targetUrl;
  }
}
__name(rewriteUrlWithFrontProxy, "rewriteUrlWithFrontProxy");
function getCookieOrigin(config) {
  if (config.frontProxyEnabled && config.frontProxyOrigin) return config.frontProxyOrigin;
  return config.forumOrigin;
}
__name(getCookieOrigin, "getCookieOrigin");
function getCookieOrigins(config, targetUrl) {
  const origins = /* @__PURE__ */ new Set();
  const appendOrigin = /* @__PURE__ */ __name((value) => {
    const origin = normalizeOrigin(value);
    if (origin) origins.add(origin);
  }, "appendOrigin");
  appendOrigin(config.forumOrigin);
  if (config.frontProxyEnabled) appendOrigin(config.frontProxyOrigin);
  const targetOrigin = normalizeOrigin(targetUrl);
  if (targetOrigin && (matchesForumOrigin(targetOrigin, config) || matchesAllowedHost(targetOrigin, config))) {
    appendOrigin(targetOrigin);
  }
  return [...origins];
}
__name(getCookieOrigins, "getCookieOrigins");
function createTopicJsonBase(targetUrl, config) {
  try {
    const normalized = normalizeTopicUrl(targetUrl, config.forumOrigin);
    const rewritten = rewriteUrlWithFrontProxy(normalized, config.forumOrigin, config.frontProxyOrigin, config.frontProxyEnabled);
    const url = new URL(rewritten);
    const segments = url.pathname.split("/").filter(Boolean);
    if (!segments.length) return null;
    if (/^\d+$/.test(segments[segments.length - 1])) {
      segments.pop();
    }
    if (!segments.length) return null;
    url.pathname = `/${segments.join("/")}.json`;
    url.hash = "";
    return url;
  } catch {
    return null;
  }
}
__name(createTopicJsonBase, "createTopicJsonBase");
function createTopicJsonUrl(targetUrl, config) {
  const url = createTopicJsonBase(targetUrl, config);
  if (!url) return "";
  url.search = "";
  url.searchParams.set("print", "true");
  return url.toString();
}
__name(createTopicJsonUrl, "createTopicJsonUrl");
function createTopicPageJsonUrl(targetUrl, config, page) {
  const url = createTopicJsonBase(targetUrl, config);
  if (!url) return "";
  url.search = "";
  url.searchParams.set("page", String(Math.max(1, Math.trunc(page) || 1)));
  return url.toString();
}
__name(createTopicPageJsonUrl, "createTopicPageJsonUrl");
function createTopicPostUrl(targetUrl, config, postNumber = 1) {
  try {
    const url = new URL(targetUrl);
    const segments = url.pathname.split("/").filter(Boolean);
    const numericIndexes = segments.map((segment, index) => /^\d+$/.test(segment) ? index : -1).filter((index) => index >= 0);
    if (!numericIndexes.length) {
      return rewriteUrlWithFrontProxy(targetUrl, config.forumOrigin, config.frontProxyOrigin, config.frontProxyEnabled);
    }
    const topicIdIndex = numericIndexes.length >= 2 ? numericIndexes[numericIndexes.length - 2] : numericIndexes[numericIndexes.length - 1];
    const normalized = new URL(url.origin);
    normalized.pathname = `/${segments.slice(0, topicIdIndex + 1).join("/")}/${Math.max(1, Math.trunc(postNumber) || 1)}`;
    return rewriteUrlWithFrontProxy(normalized.toString(), config.forumOrigin, config.frontProxyOrigin, config.frontProxyEnabled);
  } catch {
    return rewriteUrlWithFrontProxy(targetUrl, config.forumOrigin, config.frontProxyOrigin, config.frontProxyEnabled);
  }
}
__name(createTopicPostUrl, "createTopicPostUrl");
function detectUnexpectedDiscourseRoute(currentUrl, expectedUrl) {
  try {
    const current = new URL(currentUrl);
    const currentPath = current.pathname.toLowerCase();
    const expected = expectedUrl ? new URL(expectedUrl) : null;
    const expectedPath = expected?.pathname.toLowerCase() || "";
    if (expected && current.origin !== expected.origin) {
      return `页面已跳转到 ${current.origin}，未停留在目标论坛帖子页。`;
    }
    if (/^\/search(?:\/|$)/.test(currentPath)) {
      return "页面跳到了搜索页，未获取到目标帖子。";
    }
    if (/^\/login(?:\/|$)/.test(currentPath)) {
      return "页面跳到了登录页，登录状态可能未生效。";
    }
    if (expectedPath.startsWith("/t") && !currentPath.startsWith("/t")) {
      return "页面已跳转，未停留在目标帖子页。";
    }
    return "";
  } catch {
    return "";
  }
}
__name(detectUnexpectedDiscourseRoute, "detectUnexpectedDiscourseRoute");
function resolveConfig(config) {
  const forumOrigin = normalizeOrigin(config.forumOrigin);
  const frontProxyOrigin = normalizeOrigin(config.frontProxyOrigin);
  const forumHost = forumOrigin ? new URL(forumOrigin).hostname.toLowerCase() : "";
  const allowedHosts = [...new Set([...config.allowedHosts?.map(normalizeHost) || [], forumHost].filter(Boolean))];
  const authCookieSource = (config.tCookie || config.cookieHeader || "").trim();
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
    executablePath: config.executablePath?.trim() || "",
    userAgent: config.userAgent?.trim() || DEFAULT_USER_AGENT,
    navigationTimeout: config.navigationTimeout ?? DEFAULT_TIMEOUT,
    captureDelay: config.captureDelay ?? DEFAULT_DELAY,
    viewportWidth: config.viewportWidth ?? 1280,
    viewportHeight: config.viewportHeight ?? 960,
    headless: config.headless ?? true,
    sendFailureMessage: config.sendFailureMessage ?? false,
    proxyServer: config.proxyServer?.trim() || "",
    proxyBypass: config.proxyBypass?.trim() || "",
    dohEnabled: config.dohEnabled ?? false,
    dohTemplates: config.dohTemplates?.trim() || "",
    injectCanvasHook: config.injectCanvasHook ?? true
  };
}
__name(resolveConfig, "resolveConfig");
async function sendSnapshot(session, buffer) {
  const src = `data:image/png;base64,${buffer.toString("base64")}`;
  await session.send((0, import_koishi.h)("img", { src }));
}
__name(sendSnapshot, "sendSnapshot");
function getPostLikeCount(post, fallback = 0) {
  const fromActions = post.actions_summary?.find((action) => action.id === 2)?.count;
  return fromActions ?? post.like_count ?? fallback;
}
__name(getPostLikeCount, "getPostLikeCount");
function getSiteCategories(payload) {
  return payload?.categories || payload?.category_list?.categories || [];
}
__name(getSiteCategories, "getSiteCategories");
function resolveCategoryLabel(categoryId, payload) {
  if (!categoryId) return "";
  const categories = getSiteCategories(payload);
  if (!categories.length) return "";
  const map = /* @__PURE__ */ new Map();
  for (const category of categories) {
    if (category.id) map.set(category.id, category);
  }
  const labels = [];
  const visited = /* @__PURE__ */ new Set();
  let cursor = map.get(categoryId);
  while (cursor?.id && !visited.has(cursor.id)) {
    visited.add(cursor.id);
    if (cursor.name?.trim()) labels.unshift(cursor.name.trim());
    cursor = cursor.parent_category_id ? map.get(cursor.parent_category_id) : void 0;
  }
  return labels.join(" / ");
}
__name(resolveCategoryLabel, "resolveCategoryLabel");
function getDisplayName(post) {
  return post.name?.trim() || post.display_username?.trim() || post.username?.trim() || "匿名用户";
}
__name(getDisplayName, "getDisplayName");
function resolveAvatarUrl(post, baseOrigin) {
  const template = post.avatar_template?.replace(/\{size\}/g, String(DEFAULT_AVATAR_SIZE));
  if (!template) return "";
  try {
    return new URL(template, `${baseOrigin}/`).toString();
  } catch {
    return template;
  }
}
__name(resolveAvatarUrl, "resolveAvatarUrl");
function renderTopicBadges(payload, sitePayload) {
  const category = resolveCategoryLabel(payload.category_id, sitePayload);
  const tags = payload.tags?.map((tag) => tag.trim()).filter(Boolean) || [];
  if (!category && !tags.length) return "";
  const items = [];
  if (category) {
    const categoryInfo = getSiteCategories(sitePayload).find((item) => item.id === payload.category_id);
    const background = normalizeColor(categoryInfo?.color, "#f97316");
    const foreground = normalizeColor(categoryInfo?.text_color, "#ffffff");
    items.push(`<span class="badge badge-category" style="--badge-bg:${background};--badge-fg:${foreground}">${escapeHtml(category)}</span>`);
  }
  items.push(...tags.map((tag) => `<span class="badge badge-tag">#${escapeHtml(tag)}</span>`));
  return `<div class="badge-row">${items.join("")}</div>`;
}
__name(renderTopicBadges, "renderTopicBadges");
function renderStatCard(label, value) {
  return `<div class="stat"><div class="stat-label">${escapeHtml(label)}</div><div class="stat-value">${escapeHtml(value)}</div></div>`;
}
__name(renderStatCard, "renderStatCard");
function renderCommentStat(label, value) {
  return `<span class="comment-stat"><span class="comment-stat-label">${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></span>`;
}
__name(renderCommentStat, "renderCommentStat");
function renderTopicAuthorHeader(post, baseOrigin) {
  const avatar = resolveAvatarUrl(post, baseOrigin);
  const displayNameText = getDisplayName(post);
  const displayName = escapeHtml(displayNameText);
  const username = post.username?.trim() && post.username?.trim() !== displayNameText ? `<span class="topic-author-username">@${escapeHtml(post.username.trim())}</span>` : "";
  const createdAt = formatDateTime(post.created_at);
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
            <span class="comment-pill">楼主</span>
            <span class="comment-pill">发表于 ${escapeHtml(createdAt)}</span>
          </div>
        </div>
      </div>
    </section>`;
}
__name(renderTopicAuthorHeader, "renderTopicAuthorHeader");
function renderCommentSection(post, baseOrigin) {
  if (!post || !post.post_number || post.post_number <= 1) return "";
  const avatar = resolveAvatarUrl(post, baseOrigin);
  const displayNameText = getDisplayName(post);
  const displayName = escapeHtml(displayNameText);
  const username = post.username?.trim() && post.username?.trim() !== displayNameText ? `<span class="comment-username">@${escapeHtml(post.username.trim())}</span>` : "";
  const createdAt = formatDateTime(post.created_at);
  const likeCount = formatNumber(getPostLikeCount(post));
  const replyCount = formatNumber(post.reply_count ?? 0);
  const replyTo = post.reply_to_post_number ? `<span class="comment-pill">回复 #${post.reply_to_post_number}</span>` : "";
  const cooked = post.cooked || "<p>该楼层暂无可展示内容。</p>";
  return `
    <section class="comment-section">
      <div class="section-heading">
        <span class="section-kicker">关联楼层</span>
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
                <span class="comment-pill">发表于 ${escapeHtml(createdAt)}</span>
                ${replyTo}
              </div>
            </div>
          </div>
          <div class="comment-stats">
            ${renderCommentStat("回复", replyCount)}
            ${renderCommentStat("点赞", likeCount)}
          </div>
        </header>
        <div class="post comment-body" data-snapshot-post-body="comment">${cooked}</div>
      </article>
    </section>`;
}
__name(renderCommentSection, "renderCommentSection");
function renderTopicHtml(payload, opPost, requestedPost, baseOrigin, sitePayload) {
  const title = escapeHtml(payload.title || "Discourse Topic");
  const cooked = opPost.cooked || "<p>未获取到楼主正文。</p>";
  const viewCount = payload.views ?? 0;
  const likeCount = getPostLikeCount(opPost, payload.like_count ?? 0);
  const createdAt = formatDateTime(opPost.created_at);
  const badges = renderTopicBadges(payload, sitePayload);
  const topicAuthorHeader = renderTopicAuthorHeader(opPost, baseOrigin);
  const commentSection = renderCommentSection(requestedPost, baseOrigin);
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
      <div class="hero-divider">首楼正文</div>
      <section class="post-shell">
        <article class="post" data-snapshot-post-body="op">${cooked}</article>
      </section>
      <section class="summary">
        ${renderStatCard("浏览量", formatNumber(viewCount))}
        ${renderStatCard("发帖时间", createdAt)}
        ${renderStatCard("点赞量", formatNumber(likeCount))}
      </section>
      ${commentSection}
    </section>
  </main>
</body>
</html>`;
}
__name(renderTopicHtml, "renderTopicHtml");
async function extractTopicFromPage(page, url, requestedPostNumber, config) {
  await page.goto(url, {
    waitUntil: "load",
    timeout: config.navigationTimeout
  });
  await page.waitForTimeout(Math.min(Math.max(config.captureDelay, 2500), 5e3));
  const redirectedError = detectUnexpectedDiscourseRoute(page.url(), url);
  if (redirectedError) throw new Error(redirectedError);
  const snapshot = await page.evaluate(
    ({ requestedPostNumber: requestedPostNumber2, script }) => new Function("requestedPostNumber", script)(requestedPostNumber2),
    { requestedPostNumber, script: DISCOURSE_DOM_EXTRACT_SCRIPT }
  );
  if (snapshot.error) throw new Error(snapshot.error);
  return snapshot;
}
__name(extractTopicFromPage, "extractTopicFromPage");
function toTopicPost(post) {
  if (!post) return void 0;
  return {
    post_number: post.postNumber,
    cooked: post.cooked,
    like_count: post.likeCount,
    reply_count: post.replyCount,
    reply_to_post_number: post.replyToPostNumber,
    created_at: post.createdAt,
    username: post.username,
    name: post.name || null,
    avatar_template: post.avatarUrl
  };
}
__name(toTopicPost, "toTopicPost");
function buildRenderDataFromExtractedTopic(snapshot, requestedPost) {
  const categoryId = snapshot.category?.name ? 1 : void 0;
  const payload = {
    title: snapshot.title,
    views: snapshot.viewCount,
    like_count: snapshot.likeCount,
    tags: snapshot.tags,
    category_id: categoryId
  };
  const sitePayload = snapshot.category?.name ? {
    categories: [{
      id: 1,
      name: snapshot.category.name,
      color: snapshot.category.color,
      text_color: snapshot.category.textColor
    }]
  } : void 0;
  return {
    payload,
    sitePayload,
    opPost: toTopicPost(snapshot.opPost),
    requestedPost: toTopicPost(requestedPost)
  };
}
__name(buildRenderDataFromExtractedTopic, "buildRenderDataFromExtractedTopic");
function createBrowserLaunchOptions(config, useProxy = true) {
  const options = {
    executablePath: config.executablePath,
    headless: config.headless,
    args: ["--disable-dev-shm-usage", "--disable-gpu", "--no-first-run"]
  };
  if (useProxy && config.proxyServer) {
    options.proxy = { server: config.proxyServer, bypass: config.proxyBypass || void 0 };
  }
  if (config.dohEnabled) {
    if (config.dohTemplates) {
      options.args.push("--dns-over-https-mode=secure");
      options.args.push(`--dns-over-https-templates=${config.dohTemplates}`);
    } else {
      options.args.push("--dns-over-https-mode=automatic");
    }
  }
  return options;
}
__name(createBrowserLaunchOptions, "createBrowserLaunchOptions");
function createLinkshotMiddleware(config, renderer, logger) {
  return async (session, next) => {
    const result = await next();
    if (!config.enabled) return result;
    if (config.platforms.length && !config.platforms.includes(session.platform)) return result;
    const targetUrl = pickTargetUrl(session, config);
    if (!targetUrl) return result;
    const captureWithProxyFallback = /* @__PURE__ */ __name(async (authenticated) => {
      if (!config.proxyServer) return renderer.capture(targetUrl, { authenticated, useProxy: false });
      try {
        return await renderer.capture(targetUrl, { authenticated, useProxy: true });
      } catch (proxyError) {
        logger.warn(proxyError);
        await session.send(`${TEXT.proxyRetryMessage}${targetUrl}`);
        try {
          return await renderer.capture(targetUrl, { authenticated, useProxy: false });
        } catch (directError) {
          throw { proxyError, directError };
        }
      }
    }, "captureWithProxyFallback");
    logger.info(`${TEXT.detected}${targetUrl}（${session.platform}）`);
    try {
      let buffer;
      try {
        buffer = await captureWithProxyFallback(false);
      } catch (publicError) {
        logger.warn(publicError);
        if (!config.authCookieSource && !config.tCookie) {
          await session.send(`${formatCaptureFailureMessage(targetUrl, publicError)}
${TEXT.authMissingMessage}`);
          logger.warn(`${TEXT.failure}${targetUrl}`);
          return result;
        }
        await session.send(`${TEXT.publicRetryMessage}${targetUrl}`);
        try {
          buffer = await captureWithProxyFallback(true);
        } catch (authError) {
          logger.warn(authError);
          logger.warn(`${TEXT.failure}${targetUrl}`);
          await session.send(formatCaptureFailureMessage(targetUrl, publicError, authError));
          return result;
        }
      }
      await sendSnapshot(session, buffer);
      logger.info(`${TEXT.success}${targetUrl}`);
    } catch (error) {
      logger.warn(error);
      logger.warn(`${TEXT.failure}${targetUrl}`);
      if (config.sendFailureMessage) {
        await session.send(`${TEXT.failureMessage}${targetUrl}`);
      }
    }
    return result;
  };
}
__name(createLinkshotMiddleware, "createLinkshotMiddleware");
async function loadChromium() {
  const module2 = await import("playwright-core");
  return module2.chromium;
}
__name(loadChromium, "loadChromium");
var PlaywrightDiscourseRenderer = class {
  constructor(config) {
    this.config = config;
  }
  static {
    __name(this, "PlaywrightDiscourseRenderer");
  }
  proxyBrowserTask;
  directBrowserTask;
  async getBrowser(useProxy) {
    if (useProxy && this.config.proxyServer) {
      this.proxyBrowserTask ||= this.launch(true);
      return this.proxyBrowserTask;
    }
    this.directBrowserTask ||= this.launch(false);
    return this.directBrowserTask;
  }
  async launch(useProxy) {
    const chromium = await loadChromium();
    return chromium.launch(createBrowserLaunchOptions(this.config, useProxy));
  }
  async withPage(browser, targetUrl, authenticated, callback) {
    const context = await browser.newContext({
      viewport: { width: this.config.viewportWidth, height: this.config.viewportHeight },
      userAgent: this.config.userAgent,
      locale: "zh-CN"
    });
    try {
      if (authenticated && (this.config.authCookieSource || this.config.tCookie)) {
        const cookieOrigins = getCookieOrigins(this.config, targetUrl);
        const cookies = createDiscourseCookiesForOrigins(this.config.authCookieSource || this.config.tCookie, cookieOrigins);
        if (cookies.length) await context.addCookies(cookies);
      }
      const page = await context.newPage();
      return await callback(page);
    } finally {
      await context.close();
    }
  }
  async capture(url, options = {}) {
    const authenticated = options.authenticated ?? true;
    const useProxy = options.useProxy ?? !!this.config.proxyServer;
    const browser = await this.getBrowser(useProxy);
    const requestedPostNumber = extractRequestedPostNumber(url);
    const opSourceUrl = createTopicPostUrl(url, this.config, 1);
    const opSnapshot = await this.withPage(browser, opSourceUrl, authenticated, (page) => extractTopicFromPage(page, opSourceUrl, 1, this.config));
    if (!opSnapshot.opPost) throw new Error("未从 Discourse 页面中获取到楼主首帖。");
    let requestedPost;
    if (requestedPostNumber > 1) {
      const replySourceUrl = createTopicPostUrl(url, this.config, requestedPostNumber);
      const replySnapshot = await this.withPage(browser, replySourceUrl, authenticated, (page) => extractTopicFromPage(page, replySourceUrl, requestedPostNumber, this.config));
      requestedPost = replySnapshot.requestedPost;
    }
    const baseOrigin = this.config.frontProxyEnabled && this.config.frontProxyOrigin ? this.config.frontProxyOrigin : this.config.forumOrigin;
    const { payload, sitePayload, opPost, requestedPost: requestedTopicPost } = buildRenderDataFromExtractedTopic(opSnapshot, requestedPost);
    if (!opPost) throw new Error("未从 Discourse 页面中获取到楼主首帖。");
    const html = renderTopicHtml(payload, opPost, requestedTopicPost, baseOrigin, sitePayload);
    return this.withPage(browser, baseOrigin, authenticated, async (page) => {
      await page.setContent(html, { waitUntil: "load", timeout: this.config.navigationTimeout });
      await page.evaluate((script) => new Function(script)(), SNAPSHOT_POST_PROCESS_SCRIPT);
      if (this.config.captureDelay > 0) await page.waitForTimeout(this.config.captureDelay);
      await page.evaluate((script) => new Function(script)(), DISCOURSE_WAIT_IMAGES_SCRIPT);
      const buffer = await page.screenshot({
        type: "png",
        fullPage: true,
        timeout: this.config.navigationTimeout
      });
      return Buffer.from(buffer);
    });
  }
  async dispose() {
    const browsers = await Promise.all([
      this.proxyBrowserTask?.catch(() => null),
      this.directBrowserTask?.catch(() => null)
    ]);
    this.proxyBrowserTask = void 0;
    this.directBrowserTask = void 0;
    await Promise.all(browsers.filter(Boolean).map((browser) => browser.close()));
  }
};
function isConfigReady(config) {
  return !!(config.enabled && config.forumOrigin && config.executablePath && (!config.frontProxyEnabled || config.frontProxyOrigin));
}
__name(isConfigReady, "isConfigReady");
function apply(ctx, config) {
  const resolved = resolveConfig(config);
  const logger = ctx.logger(name);
  if (!isConfigReady(resolved)) {
    logger.warn(TEXT.configIncomplete);
    return;
  }
  if (resolved.platforms.length) {
    logger.info(`${TEXT.listenPlatforms}${resolved.platforms.join(", ")}`);
  } else {
    logger.info(`${TEXT.listenAll}${resolved.forumOrigin}`);
  }
  const renderer = new PlaywrightDiscourseRenderer(resolved);
  ctx.middleware(createLinkshotMiddleware(resolved, renderer, logger));
  ctx.on("dispose", () => renderer.dispose());
}
__name(apply, "apply");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Config,
  DISCOURSE_CANVAS_HOOK_SCRIPT,
  PlaywrightDiscourseRenderer,
  apply,
  createBrowserLaunchOptions,
  createDiscourseCookies,
  createDiscourseCookiesForOrigins,
  createLinkshotMiddleware,
  createTopicJsonUrl,
  createTopicPageJsonUrl,
  createTopicPostUrl,
  detectUnexpectedDiscourseRoute,
  extractDiscourseCookiePairs,
  extractRequestedPostNumber,
  extractTCookie,
  extractUrls,
  getCookieOrigin,
  getCookieOrigins,
  getPostLikeCount,
  matchesAllowedHost,
  matchesForumOrigin,
  name,
  normalizeHost,
  normalizeOrigin,
  normalizeTopicUrl,
  pickTargetUrl,
  resolveCategoryLabel,
  resolveConfig,
  rewriteUrlWithFrontProxy,
  sendSnapshot,
  trimUrlCandidate
});
//# sourceMappingURL=index.js.map
