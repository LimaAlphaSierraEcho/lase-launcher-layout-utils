import { ref, type Ref } from "vue";
import type { LauncherContext } from "./types/layout";
import type { Instance } from "./types/instance";
import type { MinecraftProfile } from "./types/auth";
import type { LocalInstanceInfo } from "./types/minecraft";

export class LauncherUtils {
    private readonly _activeTab: Ref<"instances" | "settings" | "account">;
    private readonly _instancesState: LauncherContext["instancesState"] | undefined;
    private readonly _auth: LauncherContext["auth"] | undefined;
    private readonly _minecraft: LauncherContext["minecraft"] | undefined;
    private readonly _views: LauncherContext["views"] | undefined;

    private readonly launcher: LauncherContext;

    public readonly mcUtils: LauncherMCUtils;

    constructor(launcher: LauncherContext) {
        this.launcher = launcher;
        this._activeTab = launcher?.activeTab || ref<"instances" | "settings" | "account">("instances");
        this._instancesState = launcher?.instancesState;
        this._auth = launcher?.auth;
        this._minecraft = launcher?.minecraft;
        this._views = launcher?.views;

        this.mcUtils = new LauncherMCUtils(this);
    }

    get activeTab(): "instances" | "settings" | "account" {
        return this._activeTab.value;
    }

    set activeTab(value: "instances" | "settings" | "account") {
        this._activeTab.value = value;
    }

    get instancesState(): LauncherContext["instancesState"] | undefined {
        return this._instancesState;
    }

    get auth(): LauncherContext["auth"] | undefined {
        return this._auth;
    }

    get minecraft(): LauncherContext["minecraft"] | undefined {
        return this._minecraft;
    }

    get views(): LauncherContext["views"] | undefined {
        return this._views;
    }

    handleSelectInstance(inst: Instance | any): void {
        if (this.instancesState?.selectedInstance) {
            this.instancesState.selectedInstance.value = inst;
        }
        this.activeTab = "instances";
    }

    async handlePlayOnSelectedInstance(): Promise<void> {
        if (this.instancesState?.selectedInstance?.value && this.launcher?.onPrimaryAction) {
            return await this.launcher.onPrimaryAction(this.instancesState.selectedInstance.value);
        }
    }

    /**
     * Determine if the play button should be disabled.
     */
    get shouldPlayButtonBeDisabled(): boolean {
        return Boolean(
            this.minecraft?.installing?.value ||
            this.minecraft?.isLaunching?.value ||
            this.minecraft?.isGameRunning?.value ||
            this.instancesState?.loading?.value ||
            !this.instancesState?.selectedInstance?.value
        );
    }

    /**
     * Get the current logo for the launcher.
     */
    getCurrentLogo(): string | undefined {
        return this._instancesState?.currentLauncherIcon?.value;
    }

    /**
     * Get the current title for the launcher.
     */
    getCurrentTitle(): string | null {
        return this._instancesState?.currentLauncherTitle?.value ?? null;
    }

    /**
     * Get the list of instances from the launcher state.
     */
    getInstances(): Instance[] {
        return (this._instancesState?.instances || ref([])).value;
    }

    /**
     * Check if a given instance is the currently active instance.
     */
    isInstanceActive(inst: Instance): boolean {
        return this._instancesState?.selectedInstance?.value?.slug === inst.slug;
    }

    /**
     * Get the currently selected instance from the launcher state.
     */
    getSelectedInstance(): Instance | null {
        return this._instancesState?.selectedInstance?.value || null;
    }

    /**
     * Get the current player profile from the authentication state.
     */
    getCurrentPlayerProfile(): MinecraftProfile | null {
        return this._auth?.playerProfile?.value || null;
    }

    /**
     * Get the current status of the selected instance from the local statuses.
     */
    get currentInstanceStatus(): LocalInstanceInfo | null {
        const slug = this._instancesState?.selectedInstance?.value?.slug;
        if (!slug || !this._instancesState?.localStatuses?.value) return null;
        return this._instancesState.localStatuses.value[slug] || null;
    }
}

export class LauncherMCUtils {
    constructor(private readonly launcherUtils: LauncherUtils) {
        this.launcherUtils = launcherUtils;
    }

    /**
     * Check if Minecraft is currently being installed.
     * @returns true if Minecraft is installing, false otherwise.
     */
    isMCInstalling(): boolean {
        return Boolean(this.launcherUtils.minecraft?.installing?.value);
    }

    /**
     * Check if Minecraft is currently launching.
     * @returns true if Minecraft is launching, false otherwise.
     */
    isMCLaunching(): boolean {
        return Boolean(this.launcherUtils.minecraft?.isLaunching?.value);
    }

    /**
     * Get the current asset stage of the Minecraft installation process.
     *
     * @returns The current asset stage.
     */
    getAssetStage(): string {
        return this.launcherUtils.minecraft?.assetStage?.value || "Downloading...";
    }

    /**
     * Get the current installation progress of Minecraft.
     *
     * @returns The installation progress as a number between 0 and 1.
     */
    getInstallProgress(): number {
        return this.launcherUtils.minecraft?.installProgress?.value || 0;
    }

    /**
     * Get the current installation log of Minecraft.
     *
     * @returns The installation log as a string.
     */
    getInstallLog(): string {
        return this.launcherUtils.minecraft?.installLog?.value || "";
    }
}

export default LauncherUtils;
