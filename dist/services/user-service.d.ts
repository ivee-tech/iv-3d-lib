export declare const PUBLIC_USER: string;
export declare const PUBLIC_DIR: string;
export declare class UserService {
    private _userName;
    private _isAuthenticated;
    private _token;
    private _friendlyName;
    private _userKey;
    constructor();
    setLogin(userName: string, token: string): void;
    setFriendlyName(friendlyName: string): void;
    setUserKey(userKey: string): void;
    resetLogin(): void;
    readonly userName: string;
    readonly token: string;
    readonly isAuthenticated: boolean;
    readonly friendlyName: string;
    readonly userKey: string;
    private checkAuth();
    isValidEmail(email: string): boolean;
}
