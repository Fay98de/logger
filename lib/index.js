(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Logger = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var _a;
    var STYLE = (_a = {
            SYMBOL: "\n    margin: 0 0 0 0;\n    padding: 1px 2px;\n    color: #fff;\n    background-color: #13c2c2;\n  ",
            NAMESPACE: "\n    margin: 0 0 0 0;\n    padding: 1px 3px 0;\n    font-size: 10px;\n    border-top: 1px solid #13c2c2;\n    border-right: 1px solid #13c2c2;\n    border-bottom: 1px solid #13c2c2;\n  "
        },
        _a["Info"] = "\n    margin: 0 0 0 0;\n    padding: 2px 2px 1px;\n    font-size: 10px;\n    color: #fff;\n    background-color: #1890ff;\n  ",
        _a["Success"] = "\n    margin: 0 0 0 0;\n    padding: 2px 2px 1px;\n    font-size: 10px;\n    color: #fff;\n    background-color: #52c41a;\n  ",
        _a["Warn"] = "\n    margin: 0 0 0 0;\n    padding: 2px 2px 1px;\n    font-size: 10px;\n    color: #fff;\n    background-color: #faad14;\n  ",
        _a["Error"] = "\n    margin: 0 0 0 0;\n    padding: 2px 2px 1px;\n    font-size: 10px;\n    color: #fff;\n    background-color: #ff4d4f;\n  ",
        _a);
    var SUBSTITUTION_REG = /%(\.\d+)?[idfsoO]/;
    var COLOR_REG = /\(([^()]+)\)$/;
    var randomDarkColor = function () {
        var h = Math.floor(Math.random() * 360);
        var s = Math.floor(Math.random() * 50) + 50;
        var l = Math.floor(Math.random() * 60);
        return "hsl(" + h + ", " + s + "%, " + l + "%)";
    };
    var makeStaticArgs = function (type, data) {
        if (data === void 0) { data = []; }
        var formatter = '';
        var styles = [];
        if (Logger.symbol) {
            formatter += "%c" + Logger.symbol;
            styles.push(STYLE.SYMBOL + " background-color: " + Logger.symbolColor + ";");
        }
        formatter += "%c" + type + "%c";
        styles.push(STYLE[type], '');
        while (SUBSTITUTION_REG.test(data[0])) {
            formatter += ' ' + data.shift();
        }
        return __spreadArrays([formatter], styles, data);
    };
    var makeInstanceArgs = function (instance, type, data) {
        if (data === void 0) { data = []; }
        var formatter = instance.formatter;
        var styles = instance.styles.slice();
        formatter += "%c" + type + "%c";
        styles.push(STYLE[type], '');
        while (SUBSTITUTION_REG.test(data[0])) {
            formatter += ' ' + data.shift();
        }
        return __spreadArrays([formatter], styles, data);
    };
    function info() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        console.log.apply(console, makeStaticArgs("Info", data));
    }
    function success() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        console.log.apply(console, makeStaticArgs("Success", data));
    }
    function warn() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        console.log.apply(console, makeStaticArgs("Warn", data));
    }
    function error() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        console.log.apply(console, makeStaticArgs("Error", data));
    }
    var Logger = (function () {
        function Logger(symbol, namespace) {
            var _this = this;
            if (symbol === void 0) { symbol = ''; }
            if (namespace === void 0) { namespace = ''; }
            this.symbol = '';
            this.namespace = '';
            this.symbolColor = '#13c2c2';
            this.namespaceColor = randomDarkColor();
            this.formatter = '';
            this.styles = [];
            this.info = function () {
                var data = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    data[_i] = arguments[_i];
                }
                console.log.apply(console, makeInstanceArgs(_this, "Info", data));
            };
            this.success = function () {
                var data = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    data[_i] = arguments[_i];
                }
                console.log.apply(console, makeInstanceArgs(_this, "Success", data));
            };
            this.warn = function () {
                var data = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    data[_i] = arguments[_i];
                }
                console.log.apply(console, makeInstanceArgs(_this, "Warn", data));
            };
            this.error = function () {
                var data = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    data[_i] = arguments[_i];
                }
                console.log.apply(console, makeInstanceArgs(_this, "Error", data));
            };
            var symbolColorMatch = symbol.match(COLOR_REG) || [];
            var namespaceColorMatch = namespace.match(COLOR_REG) || [];
            this.symbol = symbol.replace(COLOR_REG, '');
            this.symbolColor = symbolColorMatch[1] || this.symbolColor;
            this.namespace = namespace.replace(COLOR_REG, '');
            this.namespaceColor = namespaceColorMatch[1] || this.namespaceColor;
            if (this.symbol) {
                this.formatter += "%c" + this.symbol;
                this.styles.push(STYLE.SYMBOL + " background-color: " + this.symbolColor + ";");
            }
            if (this.namespace) {
                this.formatter += "%c" + this.namespace;
                this.styles.push(STYLE.NAMESPACE + " color: " + this.namespaceColor + "; border-color: " + this.symbolColor + ";");
            }
        }
        Logger.symbol = '';
        Logger.separator = '';
        Logger.symbolColor = '#13c2c2';
        Logger.info = info;
        Logger.success = success;
        Logger.warn = warn;
        Logger.error = error;
        return Logger;
    }());

    exports.default = Logger;
    exports.error = error;
    exports.info = info;
    exports.success = success;
    exports.warn = warn;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
