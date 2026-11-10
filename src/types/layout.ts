import type { Component, Ref, ComputedRef } from "vue";
import type { Instance, LauncherConfig } from "./instance";
import type { LocalInstanceInfo } from "./minecraft";
import type { MinecraftProfile } from "./auth";
import type { UpdateCheckResult, UpdateProgressPayload } from "./update";

export interface LayoutInfos {
    // mandatory fields for a layout
    layoutName: string;
    mainComponent: Component;

    // optional fields for a layout
    layoutVersion?: string;
    layoutAuthor?: string;
}

export interface CachedLayoutRecord {
    url: string;
    scriptContent: string;
    cssContent?: string;
    etag?: string | null;
    lastModified?: string | null;
    cachedAt: number;
    version?: string;
}

export interface LayoutViews {
    TitleBar: Component;
    BottomBar: Component;
    InstanceView: Component;
    SettingsView: Component;
    AccountView: Component;
    UpdateModal: Component;
    KeyModal: Component;
}

export interface LauncherContext {
    // State of the launcher
    activeTab: Ref<"instances" | "settings" | "account">;
    isMaximized: Ref<boolean>;

    // Instances states
    instancesState: {
        instances: Ref<Instance[]>;
        selectedInstance: Ref<Instance | null>;
        launcherConfig: Ref<LauncherConfig | null>;
        localStatuses: Ref<Record<string, LocalInstanceInfo>>;
        loading: Ref<boolean>;
        error: Ref<string | null>;
        currentLauncherTitle: ComputedRef<string>;
        currentLauncherIcon: ComputedRef<string>;
        currentBgUrl: Ref<string>;
        isKeyLocked: Ref<boolean>;
        showKeyModal: Ref<boolean>;
        availableLaunchers: Ref<Record<string, any>>;
        inputLauncherKey: Ref<string>;
        keyError: Ref<string>;
        isSubmittingKey: Ref<boolean>;
        isLoadingAvailableLaunchers: Ref<boolean>;
        defaultLauncherName: string;
        resolvedLaunchDir: ComputedRef<string>;
        openKeyModal: () => void;
        selectKeyFromList: (key: string) => void;
        refreshLocalStatuses: () => Promise<void>;
    };

    // Authentication
    auth: {
        playerProfile: Ref<MinecraftProfile | null>;
        playerEmail: Ref<string | null>;
        isSilentLoggingIn: Ref<boolean>;
        authStep: Ref<"authenticating" | "success" | null>;
        startAuth: () => Promise<void>;
        logout: () => Promise<void>;
    };

    // Settings
    settings: {
        allocatedRam: Ref<number>;
        customJvmArgs: Ref<string>;
        maxRamAvailable: Ref<number>;
        ramPresets: Ref<number[]>;
    };

    // Updater
    updater: {
        currentAppVersion: Ref<string>;
        isCheckingAppUpdate: Ref<boolean>;
        isInstallingAppUpdate: Ref<boolean>;
        appUpdateResult: Ref<UpdateCheckResult | null>;
        appUpdateProgress: Ref<UpdateProgressPayload | null>;
        appUpdateError: Ref<string | null>;
        showUpdateModal: Ref<boolean>;
        handleCheckForUpdates: (silent?: boolean) => Promise<void>;
        handleApplyUpdate: () => Promise<void>;
    };

    // MC Engine
    minecraft: {
        installing: Ref<boolean>;
        isLaunching: Ref<boolean>;
        isGameRunning: Ref<boolean>;
        installProgress: Ref<number>;
        installLog: Ref<string>;
        assetCurrent: Ref<number>;
        assetTotal: Ref<number>;
        assetCurrentFile: Ref<string>;
        assetStage: Ref<string>;
        handleOpenFolder: (slug: string, launchDir?: string) => Promise<void>;
    };

    // Global actions
    onPrimaryAction: (inst: Instance) => Promise<void>;
    onConfirmKey: () => void;

    // Available views for the layout
    views: LayoutViews;

    // Layout information and management
    layoutInfo: {
        currentLayout: Ref<string>;
        isLocal: ComputedRef<boolean>;
        isFromCache: Ref<boolean>;
        isLoading: Ref<boolean>;
        error: Ref<string | null>;
        setLayout: (layoutUrlOrLocal: string) => Promise<void>;
        reloadLayout: () => Promise<void>;
        clearCache: () => Promise<void>;
    };
}
