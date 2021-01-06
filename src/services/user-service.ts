export const PUBLIC_USER: string = 'demo';
export const PUBLIC_DIR: string = 'public';

export class UserService {
    private _userName: string = '';
    private _isAuthenticated: boolean = false;
    private _token: string = '';
    private _friendlyName: string = '';
    private _userKey: string = '';

    constructor() {
        this.checkAuth();
    }

    setLogin(userName: string, token: string) {
        if (token) {
            this._userName = userName;
            localStorage.setItem('iv-3d-editor.UserLoggedIn', '1');
            localStorage.setItem('iv-3d-editor.UserName', userName);
            localStorage.setItem('iv-3d-editor.access_token', token);
        }
        this.checkAuth();
    }

    setFriendlyName(friendlyName: string) {
        this._friendlyName = friendlyName;
        localStorage.setItem('iv-3d-editor.FriendlyName', friendlyName);
    }

    setUserKey(userKey: string) {
        this._userKey = userKey;
        localStorage.setItem('iv-3d-editor.UserKey', userKey);
    }

    resetLogin() {
        this._userName = '';
        localStorage.removeItem('iv-3d-editor.UserLoggedIn');
        localStorage.removeItem('iv-3d-editor.UserName');
        localStorage.removeItem('iv-3d-editor.access_token');
        localStorage.removeItem('iv-3d-editor.FriendlyName');
        localStorage.removeItem('iv-3d-editor.UserKey');
        this.checkAuth();
    }

    get userName(): string {
        return this._userName;
    }

    get token(): string {
        return this._token;
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    get friendlyName(): string {
        return this._friendlyName;
    }

    get userKey(): string {
        return this._userKey;
    }

    private checkAuth() {
        let item = localStorage.getItem('iv-3d-editor.UserLoggedIn');
        this._userName = localStorage.getItem('iv-3d-editor.UserName');
        this._friendlyName = localStorage.getItem('iv-3d-editor.FriendlyName');
        this._userKey = localStorage.getItem('iv-3d-editor.UserKey');
        if (!this._userName) {
            this._userName = PUBLIC_USER;
        }
        this._isAuthenticated = item === '1' && this._userName !== PUBLIC_USER;
        if (this._isAuthenticated) {
            this._token = localStorage.getItem('iv-3d-editor.access_token');
        }
    }

    isValidEmail(email: string): boolean {

        var qtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';

        var dtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';

        var atom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c' + '\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';

        var quoted_pair = '\\x5c[\\x00-\\x7f]';

        var domain_literal = "\\x5b(" + dtext + "|" + quoted_pair + ")*\\x5d";

        var quoted_string = "\\x22(" + qtext + "|" + quoted_pair + ")*\\x22";

        var domain_ref = atom;

        var sub_domain = "(" + domain_ref + "|" + domain_literal + ")";

        var word = "(" + atom + "|" + quoted_string + ")";

        var domain = sub_domain + "(\\x2e" + sub_domain + ")*";

        var local_part = word + "(\\x2e" + word + ")*";

        var addr_spec = local_part + "\\x40" + domain;

        var pattern = "^" + addr_spec + "$";

        var re = new RegExp(pattern);

        return re.test(email);
    }
}
