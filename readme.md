# koishi-plugin-discourse-linkshot

用于 Koishi 的 Discourse 论坛链接截图插件。

当聊天中出现指定论坛的帖子链接时，插件会自动识别并发送截图。

## 功能

- 自动识别指定 Discourse 论坛链接
- 默认截图首楼内容
- 链接带楼层号时，可附加对应回复
- 支持权限帖 Cookie 抓取
- 支持展开 `details`、`spoiler` 等隐藏内容
- 支持代理与 DoH
- 支持浏览器复用或每次渲染后关闭浏览器

## 安装

```bash
npm i koishi-plugin-discourse-linkshot
```

## 依赖

需要本地可执行浏览器，并在配置中填写完整路径，例如：

```text
C:\Program Files\Google\Chrome\Application\chrome.exe
```

## 示例配置

```yaml
plugins:
  discourse-linkshot:
    enabled: true
    forumOrigin: https://forum.example.com
    tCookie: _forum_session=...; _t=...
    executablePath: C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe
    proxyServer: http://127.0.0.1:7890
    dohEnabled: false
    dohTemplates: ''
    pageWaitUntil: domcontentloaded
    browserTimeout: 30000
    closeBrowserAfterCapture: false
```

## 常用配置

- `forumOrigin`：要监听的论坛地址
- `tCookie`：权限帖使用的 Cookie，可填 `_t` 或完整 Cookie
- `executablePath`：浏览器路径
- `proxyServer`：代理地址
- `dohEnabled`：是否启用 DoH
- `dohTemplates`：自定义 DoH 地址
- `pageWaitUntil`：页面等待方式，推荐 `domcontentloaded`
- `browserTimeout`：浏览器启动超时，`0` 表示不检测
- `closeBrowserAfterCapture`：截图后立即关闭浏览器

## 说明

如果要抓取权限帖，建议直接从浏览器开发者工具里复制完整 Cookie，粘贴到 `tCookie`。

本插件更适合自用或私有部署场景。
