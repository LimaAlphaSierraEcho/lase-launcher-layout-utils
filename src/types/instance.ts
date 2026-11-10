export interface InstanceVersion {
  id: string;
  instanceId: string;
  versionNumber: string;
  fromVersionNumber: string | null;
  changelog: string;
  totalFiles: number;
  totalSize: number;
  patchesCount: number;
  createdAt: string;
}

export interface LauncherConfig {
  id?: string;
  key: string;
  name: string;
  description?: string;
  datasrc: string;
  imgurl: string;
  icoUrl?: string;
  mcVer?: string;
  mcValue?: string;
  launchDir: string;
  mainColor?: string;
  secondaryColor?: string;
  discordUrl?: string;
  websiteUrl?: string;
  instancesCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Instance {
  id: string;
  key?: string;
  name: string;
  slug: string;
  description: string | null;
  currentVersion: string;
  createdAt: string;
  updatedAt: string;
  versions: InstanceVersion[];
  datasrc?: string;
  imgurl?: string;
  icoUrl?: string;
  mainColor?: string;
  secondaryColor?: string;
  mcVer?: string;
  mcValue?: string;
  launchDir?: string;
  lockedFolders?: string[];
}

export type PatchType = "created" | "modified" | "deleted" | string;

export interface PatchItem {
  id: string;
  versionNumber: string;
  filePath: string;
  patchType: PatchType;
  patchSize: number;
  oldSize: number;
  newSize: number;
  oldHash: string | null;
  newHash: string;
  downloadUrl: string;
}

export interface UpdateComparison {
  patchDownloadSize: number;
  fullInstallSize: number;
  savingsBytes: number;
  savingsPercentage: number;
  patchesCount: number;
  fullFilesCount: number;
}

export interface UpdateStrategyResponse {
  instanceId: string;
  instanceName: string;
  fromVersion: string;
  toVersion: string;
  strategy: "patch" | "full" | string;
  isPatchRecommended: boolean;
  comparison: UpdateComparison;
  patches: PatchItem[];
  lockedFolders?: string[];
  message: string;
}

export interface SecureFileEntry {
  path: string;
  hash: string;
  size?: number;
}

export interface SecurityCheckResult {
  ok: boolean;
  deleted_unauthorized: string[];
  deleted_corrupted: string[];
  missing_files: string[];
  scanned_count: number;
}

export interface LocalInstanceRecord {
  instanceId: string;
  installedVersion: string | null;
  installedAt?: string;
  lastUpdated?: string;
  lockedFolders?: string[];
  secureFiles?: SecureFileEntry[];
}
