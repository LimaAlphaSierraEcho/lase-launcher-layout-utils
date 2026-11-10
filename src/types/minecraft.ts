import type { SecureFileEntry } from "./instance";

export interface McProgressPayload {
  stage: string;
  title: string;
  current: number;
  total: number;
  percent: number;
  current_file: string;
  message: string;
}

export interface LocalInstanceInfo {
  slug: string;
  is_installed: boolean;
  installed_version: string | null;
  installed_at: string | null;
  install_path: string;
  files: string[];
  locked_folders?: string[];
  secure_files?: SecureFileEntry[];
}

export interface LaunchMinecraftParams {
  mcVer: string;
  mcValue: string;
  launchDir: string;
  authUsername?: string;
  authUuid?: string;
  authToken?: string;
  javaPath?: string;
  jvmArgs?: string[];
  lockedFolders?: string[];
  secureFiles?: SecureFileEntry[];
}

export interface SecurityViolationPayload {
  violation_type: string;
  file: string;
  message: string;
}

export interface UpdateWindowIconOptions {
  key?: string;
  icoUrl?: string;
  imgurl?: string;
}
