export type MicrosoftClientType = 'electron' | 'nwjs' | 'terminal' | 'tauri';

export interface MinecraftSkin {
	id?: string;
	state?: string;
	url: string;
	variant?: string;
	alias?: string;
	base64?: string;
}

export interface MinecraftProfile {
	id: string;
	name: string;
	skins: MinecraftSkin[];
	capes: MinecraftSkin[];
}

export interface AuthError {
	error: string;
	errorType?: string;
	[key: string]: any;
}

export interface AuthResponse {
	access_token: string;
	client_token: string;
	uuid: string;
	name: string;
	email?: string;
	refresh_token: string;
	user_properties: string;
	meta: {
		type: string;
		access_token_expires_in: number;
		demo: boolean;
	};
	xboxAccount: {
		xuid: string;
		gamertag: string;
		ageGroup: string;
	};
	profile: MinecraftProfile;
}

export type MicrosoftAuthResponse = AuthResponse;
