export interface GitReleaseAsset {
    name: string;
    download_url: string;
    size: number;
    content_type?: string | null;
}

export interface UpdateCheckResult {
    has_update: boolean;
    current_version: string;
    latest_version: string;
    release_name?: string | null;
    release_notes?: string | null;
    published_at?: string | null;
    asset?: GitReleaseAsset | null;
    all_assets: GitReleaseAsset[];
    html_url?: string | null;
}

export interface UpdateProgressPayload {
    stage: string;
    percent: number;
    downloaded_bytes: number;
    total_bytes: number;
    message: string;
}
