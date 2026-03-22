import { Context, Logger, Middleware, Schema, Session } from 'koishi';
export declare const name = "discourse-linkshot";
export interface Config {
    enabled?: boolean;
    platforms?: string[];
    forumOrigin?: string;
    allowedHosts?: string[];
    allowSubdomains?: boolean;
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
}
export interface ResolvedConfig {
    enabled: boolean;
    platforms: string[];
    forumOrigin: string;
    allowedHosts: string[];
    allowSubdomains: boolean;
    cookieHeader: string;
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
}
interface BrowserCookie {
    name: string;
    value: string;
    url: string;
}
export interface SnapshotRenderer {
    capture(url: string): Promise<Buffer>;
    dispose?(): Promise<void>;
}
export declare const Config: Schema<Config>;
export declare function normalizeOrigin(value?: string): string;
export declare function normalizeHost(value: string): string;
export declare function trimUrlCandidate(value: string): string;
export declare function extractUrls(content: string): string[];
export declare function parseCookieHeader(cookieHeader: string, forumOrigin: string): BrowserCookie[];
export declare function resolveConfig(config: Config): ResolvedConfig;
export declare function matchesAllowedHost(targetUrl: string, config: ResolvedConfig): boolean;
export declare function pickTargetUrl(session: Session, config: ResolvedConfig): string;
export declare function sendSnapshot(session: Session, buffer: Buffer): Promise<void>;
export declare function createLinkshotMiddleware(config: ResolvedConfig, renderer: SnapshotRenderer, logger: Pick<Logger, 'warn'>): Middleware;
export declare class PlaywrightDiscourseRenderer implements SnapshotRenderer {
    private readonly config;
    private browserTask?;
    constructor(config: ResolvedConfig);
    private getBrowser;
    private launch;
    capture(url: string): Promise<any>;
    dispose(): Promise<void>;
}
export declare function apply(ctx: Context, config: Config): void;
export {};
