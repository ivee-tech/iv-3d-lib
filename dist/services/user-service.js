"use strict";
exports.PUBLIC_USER = 'public@ivee.tech';
exports.PUBLIC_DIR = 'public';
var UserService = (function () {
    function UserService() {
        this._userName = '';
        this._isAuthenticated = false;
        this._token = '';
        this._friendlyName = '';
        this._userKey = '';
        this.checkAuth();
    }
    UserService.prototype.setLogin = function (userName, token) {
        if (token) {
            this._userName = userName;
            localStorage.setItem('iv-3d-editor.UserLoggedIn', '1');
            localStorage.setItem('iv-3d-editor.UserName', userName);
            localStorage.setItem('iv-3d-editor.access_token', token);
        }
        this.checkAuth();
    };
    UserService.prototype.setFriendlyName = function (friendlyName) {
        this._friendlyName = friendlyName;
        localStorage.setItem('iv-3d-editor.FriendlyName', friendlyName);
    };
    UserService.prototype.setUserKey = function (userKey) {
        this._userKey = userKey;
        localStorage.setItem('iv-3d-editor.UserKey', userKey);
    };
    UserService.prototype.resetLogin = function () {
        this._userName = '';
        localStorage.removeItem('iv-3d-editor.UserLoggedIn');
        localStorage.removeItem('iv-3d-editor.UserName');
        localStorage.removeItem('iv-3d-editor.access_token');
        localStorage.removeItem('iv-3d-editor.FriendlyName');
        localStorage.removeItem('iv-3d-editor.UserKey');
        this.checkAuth();
    };
    Object.defineProperty(UserService.prototype, "userName", {
        get: function () {
            return this._userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "token", {
        get: function () {
            return this._token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "isAuthenticated", {
        get: function () {
            return this._isAuthenticated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "friendlyName", {
        get: function () {
            return this._friendlyName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "userKey", {
        get: function () {
            return this._userKey;
        },
        enumerable: true,
        configurable: true
    });
    UserService.prototype.checkAuth = function () {
        var item = localStorage.getItem('iv-3d-editor.UserLoggedIn');
        this._userName = localStorage.getItem('iv-3d-editor.UserName');
        this._friendlyName = localStorage.getItem('iv-3d-editor.FriendlyName');
        this._userKey = localStorage.getItem('iv-3d-editor.UserKey');
        if (!this._userName) {
            this._userName = exports.PUBLIC_USER;
        }
        this._isAuthenticated = item === '1' && this._userName !== exports.PUBLIC_USER;
        if (this._isAuthenticated) {
            this._token = localStorage.getItem('iv-3d-editor.access_token');
        }
    };
    UserService.prototype.isValidEmail = function (email) {
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
    };
    return UserService;
}());
exports.UserService = UserService;
