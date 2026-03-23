# koishi-plugin-discourse-linkshot

Render Discourse topic links into chat-friendly snapshots for Koishi.

## Features

- Detect topic links under your configured Discourse host automatically
- Render the first post by default, and append the requested reply when the URL contains a floor number
- Retry with authenticated cookies when a restricted topic cannot be accessed publicly
- Accept either a raw `_t` value or a full browser Cookie header
- Expand `details` / `spoiler` content before screenshotting
- Append visible text-to-link references for regular Markdown links
- Support browser proxy and DoH
- Optional browser reuse, or close the browser right after each render

## Installation

```bash
npm i koishi-plugin-discourse-linkshot
```

You also need a local Chromium/Chrome/Edge executable and should set its full path in the plugin config.

## Example Config

```yaml
plugins:
  discourse-linkshot:
    enabled: true
    forumOrigin: https://forum.example.com
    tCookie: _forum_session=...; _t=...; cf_clearance=...
    executablePath: C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe
    proxyServer: http://127.0.0.1:7890
    proxyBypass: localhost,127.0.0.1
    dohEnabled: false
    dohTemplates: ''
    browserTimeout: 30000
    closeBrowserAfterCapture: false
```

## Main Options

- `forumOrigin`: target Discourse origin
- `allowedHosts`: extra hosts that can trigger snapshots
- `allowSubdomains`: whether subdomains are allowed
- `tCookie`: can be either a plain `_t` token or a full Cookie header copied from your browser
- `executablePath`: browser executable path
- `proxyServer`: browser proxy address
- `proxyBypass`: proxy bypass rules
- `dohEnabled`: enable secure DNS
- `dohTemplates`: custom DoH templates
- `browserTimeout`: browser launch/connect timeout, use `0` to disable timeout detection
- `closeBrowserAfterCapture`: close browser immediately after each render, suitable for low-frequency rendering
- `captureDelay`: extra wait time before screenshot
- `navigationTimeout`: timeout for page loading and screenshotting

## Cookie Tip

For restricted topics, copy the full `Cookie` request header from your browser devtools network panel and paste it into `tCookie`.

## Notes

This package is mainly intended for personal/self-hosted Koishi bots.
