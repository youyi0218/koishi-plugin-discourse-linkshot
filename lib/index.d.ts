import { Context, Logger, Middleware, Schema, Session } from 'koishi';
export declare const name = "discourse-linkshot";
export interface Config {
    enabled?: boolean;
    platforms?: string[];
    forumOrigin?: string;
    frontProxyEnabled?: boolean;
    frontProxyOrigin?: string;
    allowedHosts?: string[];
    allowSubdomains?: boolean;
    tCookie?: string;
    cookieHeader?: string;
    executablePath?: string;
    userAgent?: string;
    navigationTimeout?: number;
    captureDelay?: number;
    viewportWidth?: number;
    viewportHeight?: number;
    headless?: boolean;
    sendFailureMessage?: boolean;
    proxyServer?: string;
    proxyBypass?: string;
    dohEnabled?: boolean;
    dohTemplates?: string;
    injectCanvasHook?: boolean;
}
export interface ResolvedConfig {
    enabled: boolean;
    platforms: string[];
    forumOrigin: string;
    frontProxyEnabled: boolean;
    frontProxyOrigin: string;
    allowedHosts: string[];
    allowSubdomains: boolean;
    tCookie: string;
    authCookieSource: string;
    executablePath: string;
    userAgent: string;
    navigationTimeout: number;
    captureDelay: number;
    viewportWidth: number;
    viewportHeight: number;
    headless: boolean;
    sendFailureMessage: boolean;
    proxyServer: string;
    proxyBypass: string;
    dohEnabled: boolean;
    dohTemplates: string;
    injectCanvasHook: boolean;
}
interface BrowserCookie {
    name: string;
    value: string;
    url: string;
}
interface BrowserLaunchOptions {
    executablePath: string;
    headless: boolean;
    args: string[];
    proxy?: {
        server: string;
        bypass?: string;
    };
}
interface TopicPost {
    id?: number;
    post_number?: number;
    cooked?: string;
    like_count?: number;
    reply_count?: number;
    reply_to_post_number?: number | null;
    updated_at?: string;
    created_at?: string;
    username?: string;
    name?: string | null;
    display_username?: string | null;
    avatar_template?: string;
    user_title?: string | null;
    actions_summary?: Array<{
        id?: number;
        count?: number;
    }>;
}
interface TopicCategory {
    id?: number;
    name?: string;
    color?: string;
    text_color?: string;
    slug?: string;
    parent_category_id?: number | null;
}
interface SitePayload {
    categories?: TopicCategory[];
    category_list?: {
        categories?: TopicCategory[];
    };
}
export interface CaptureOptions {
    authenticated?: boolean;
    useProxy?: boolean;
}
export interface SnapshotRenderer {
    capture(url: string, options?: CaptureOptions): Promise<Buffer>;
    dispose?(): Promise<void>;
}
export declare const Config: Schema<Config>;
export declare const DISCOURSE_CANVAS_HOOK_SCRIPT: string;
export declare function normalizeOrigin(value?: string): string;
export declare function normalizeHost(value: string): string;
export declare function trimUrlCandidate(value: string): string;
export declare function extractUrls(content: string): string[];
export declare function extractTCookie(value?: string): string;
export declare function extractDiscourseCookiePairs(value?: string): {
    name: string;
    value: string;
}[];
export declare function createDiscourseCookiesForOrigins(cookieSource: string, origins: string[]): BrowserCookie[];
export declare function createDiscourseCookies(cookieSource: string, forumOrigin: string): BrowserCookie[];
export declare function matchesAllowedHost(targetUrl: string, config: ResolvedConfig): boolean;
export declare function matchesForumOrigin(targetUrl: string, config: ResolvedConfig): boolean;
export declare function pickTargetUrl(session: Session, config: ResolvedConfig): string;
export declare function extractRequestedPostNumber(targetUrl: string): number;
export declare function normalizeTopicUrl(targetUrl: string, forumOrigin: string): string;
export declare function rewriteUrlWithFrontProxy(targetUrl: string, forumOrigin: string, frontProxyOrigin: string, enabled: boolean): string;
export declare function getCookieOrigin(config: ResolvedConfig): string;
export declare function getCookieOrigins(config: ResolvedConfig, targetUrl?: string): string[];
export declare function createTopicJsonUrl(targetUrl: string, config: ResolvedConfig): string;
export declare function createTopicPageJsonUrl(targetUrl: string, config: ResolvedConfig, page: number): string;
export declare function createTopicPostUrl(targetUrl: string, config: ResolvedConfig, postNumber?: number): string;
export declare function detectUnexpectedDiscourseRoute(currentUrl: string, expectedUrl?: string): string;
export declare function resolveConfig(config: Config): ResolvedConfig;
export declare function sendSnapshot(session: Session, buffer: Buffer): Promise<void>;
export declare function getPostLikeCount(post: TopicPost, fallback?: number): number;
export declare function resolveCategoryLabel(categoryId: number | undefined, payload?: SitePayload): string;
export declare function createBrowserLaunchOptions(config: ResolvedConfig, useProxy?: boolean): BrowserLaunchOptions;
export declare function createLinkshotMiddleware(config: ResolvedConfig, renderer: SnapshotRenderer, logger: Pick<Logger, 'info' | 'warn'>): Middleware;
export declare class PlaywrightDiscourseRenderer implements SnapshotRenderer {
    private readonly config;
    private proxyBrowserTask?;
    private directBrowserTask?;
    constructor(config: ResolvedConfig);
    private getBrowser;
    private launch;
    private withPage;
    capture(url: string, options?: CaptureOptions): Promise<Buffer<ArrayBuffer>>;
    dispose(): Promise<void>;
}
export declare function apply(ctx: Context, config: Config): void;
export {};
