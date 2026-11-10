import { ref, type Ref } from "vue";
import type { LauncherContext } from "./types/layout";

export type TauriWindowOwner = LauncherContext | { isMaximized?: Ref<boolean> };

export class TauriUtils {
    public isMaximized: Ref<boolean>;
    private readonly launcher?: TauriWindowOwner;

    constructor(launcher?: TauriWindowOwner) {
        this.launcher = launcher;
        this.isMaximized = launcher?.isMaximized || ref(false);
    }

    /**
     * Check if current environment is Tauri (desktop application) or not (web).
     * @returns true if running in Tauri, false otherwise.
     */
    isTauri(): boolean {
        return typeof window !== "undefined" && Boolean((window as any).__TAURI_INTERNALS__);
    }

    /**
     * Get Tauri internal window object if available, otherwise return null.
     * @returns Promise resolving to the Tauri window object or null.
     */
    async getAppWindow() {
        if (!this.isTauri()) return null;
        try {
            const { getCurrentWindow } = await import("@tauri-apps/api/window");
            return getCurrentWindow();
        } catch (e) {
            console.warn("Failed to import @tauri-apps/api/window:", e);
            return null;
        }
    }

    /**
     * Minimize the application window if running in Tauri.
     */
    async minimizeWindow(): Promise<void> {
        if (this.isTauri()) {
            try {
                const win = await this.getAppWindow();
                if (win) await win.minimize();
            } catch (e) {
                console.warn("Minimize error:", e);
            }
        }
    }

    /**
     * Toggle the maximized state of the application window if running in Tauri.
     */
    async toggleMaximizeWindow(): Promise<void> {
        if (this.isTauri()) {
            try {
                const win = await this.getAppWindow();
                if (win) {
                    await win.toggleMaximize();
                    const max = await win.isMaximized();
                    this.isMaximized.value = max;
                    return;
                }
            } catch (e) {
                console.warn("Maximize error:", e);
            }
        }
        this.isMaximized.value = !this.isMaximized.value;
    }

    /**
     * Close the application window if running in Tauri.
     */
    async closeWindow(): Promise<void> {
        if (this.isTauri()) {
            try {
                const win = await this.getAppWindow();
                if (win) await win.close();
            } catch (e) {
                console.warn("Close error:", e);
            }
        }
    }

    /**
     * Check if the application window is currently maximized if running in Tauri.
     */
    async checkMaximized(): Promise<boolean> {
        if (this.isTauri()) {
            try {
                const win = await this.getAppWindow();
                if (win) {
                    const maximized = await win.isMaximized();
                    this.isMaximized.value = maximized;
                    return maximized;
                }
            } catch (e) {
                console.warn("Check maximized error:", e);
            }
        }
        return this.isMaximized.value;
    }

    /**
     * Start dragging the application window.
     * @returns Promise resolving when the drag operation is started.
     */
    async startDragging(): Promise<void> {
        if (this.isTauri()) {
            try {
                const win = await this.getAppWindow();
                if (win) await win.startDragging();
            } catch (e) {
                console.warn("Start dragging error:", e);
            }
        }
    }

    /**
     * Set the title of the application window.
     * @param title The new title for the window.
     * @returns Promise resolving when the title is updated.
     */
    async setWindowTitle(title: string): Promise<void> {
        if (this.isTauri()) {
            try {
                const win = await this.getAppWindow();
                if (win) await win.setTitle(title);
            } catch (e) {
                console.warn("Set title error:", e);
            }
        }
    }
}

export default TauriUtils;
