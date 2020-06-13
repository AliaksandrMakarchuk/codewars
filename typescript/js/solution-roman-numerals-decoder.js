(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solution = void 0;
var RomanNumeralsEncoderDecoder_1 = require("../RomanNumeralsEncoderDecoder/RomanNumeralsEncoderDecoder");
function solution(roman) {
    // complete the solution by transforming the
    // string roman numeral into an integer
    return RomanNumeralsEncoderDecoder_1.RomanNumeralsEncoderDecoder.fromRoman(roman);
}
exports.solution = solution;

},{"../RomanNumeralsEncoderDecoder/RomanNumeralsEncoderDecoder":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerRepresentation = void 0;
var PowerRepresentation = /** @class */ (function () {
    function PowerRepresentation(value, power) {
        this._value = value;
        this._power = power;
    }
    Object.defineProperty(PowerRepresentation.prototype, "Power", {
        get: function () {
            return this._power;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PowerRepresentation.prototype, "Value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    PowerRepresentation.prototype.toString = function () {
        return "[" + this._value + ", " + this._power + "]";
    };
    return PowerRepresentation;
}());
exports.PowerRepresentation = PowerRepresentation;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RomanNumeralsEncoderDecoderHelper = exports.RomanNumeralsEncoderDecoder = void 0;
var PowerRepresentation_1 = require("./PowerRepresentation");
var SymbolValueRepresentation_1 = require("./SymbolValueRepresentation");
var RomanNumeralsEncoderDecoder = /** @class */ (function () {
    function RomanNumeralsEncoderDecoder() {
    }
    RomanNumeralsEncoderDecoder.toRoman = function (value) {
        var powerRepresentationMap = RomanNumeralsEncoderDecoderHelper.getPowerRepresentationMap(value);
        var result = '';
        powerRepresentationMap.map(function (x) {
            if (RomanNumeralsEncoderDecoderHelper.isValidValue(x.Value)) {
                result += RomanNumeralsEncoderDecoderHelper.getCorrectSymbol(x.Value * x.Power);
            }
            else {
                var validPowerRepresentationMap = RomanNumeralsEncoderDecoderHelper.getValidPowerRepresentationMap(x);
                validPowerRepresentationMap.map(function (y) { return result += RomanNumeralsEncoderDecoderHelper.getCorrectSymbol(y.Value * y.Power); });
            }
        });
        return result;
    };
    RomanNumeralsEncoderDecoder.fromRoman = function (value) {
        if (value.length < 1) {
            throw new Error("Value should be meaningful");
        }
        var previous = 0;
        var current = 0;
        var result = 0;
        for (var i = 0; i < value.length; i++) {
            current = RomanNumeralsEncoderDecoderHelper.getCorrespondingValueBySymbol(value[i]);
            if (i > 0 && current > previous) {
                result -= previous;
                result += current - previous;
            }
            else {
                result += current;
            }
            previous = current;
        }
        return result;
    };
    return RomanNumeralsEncoderDecoder;
}());
exports.RomanNumeralsEncoderDecoder = RomanNumeralsEncoderDecoder;
var RomanNumeralsEncoderDecoderHelper = /** @class */ (function () {
    function RomanNumeralsEncoderDecoderHelper() {
    }
    RomanNumeralsEncoderDecoderHelper.getPowerRepresentationMap = function (value) {
        if (value < 0) {
            throw new Error("The value should be positive: " + value);
        }
        var splitValue = new Array();
        var length = value.toString().length;
        for (var i = length; i > 0; i--) {
            var currentPower = Math.pow(10, i - 1);
            var result = Math.floor(value / currentPower);
            if (result > 0) {
                splitValue.push(new PowerRepresentation_1.PowerRepresentation(result, currentPower));
                value -= result * currentPower;
            }
        }
        return splitValue;
    };
    RomanNumeralsEncoderDecoderHelper.getCorrectSymbol = function (value) {
        var representation = this._romanSymbolToNumberMap.find(function (v, i, m) { return v.Value == value; });
        if (representation == undefined) {
            throw new Error("There is no representation for \"" + value + "\"");
        }
        return representation.Symbol;
    };
    RomanNumeralsEncoderDecoderHelper.isValidValue = function (value) {
        return value == 1 || value % 5 == 0;
    };
    RomanNumeralsEncoderDecoderHelper.getValidPowerRepresentationMap = function (powerRepresentation) {
        var powerRepresentationMap = new Array();
        switch (powerRepresentation.Value) {
            case 2:
                [1, 1].map(function (x) { return powerRepresentationMap.push(new PowerRepresentation_1.PowerRepresentation(x, powerRepresentation.Power)); });
                break;
            case 3:
                [1, 1, 1].map(function (x) { return powerRepresentationMap.push(new PowerRepresentation_1.PowerRepresentation(x, powerRepresentation.Power)); });
                break;
            case 4:
                [1, 5].map(function (x) { return powerRepresentationMap.push(new PowerRepresentation_1.PowerRepresentation(x, powerRepresentation.Power)); });
                break;
            case 6:
                [5, 1].map(function (x) { return powerRepresentationMap.push(new PowerRepresentation_1.PowerRepresentation(x, powerRepresentation.Power)); });
                break;
            case 7:
                [5, 1, 1].map(function (x) { return powerRepresentationMap.push(new PowerRepresentation_1.PowerRepresentation(x, powerRepresentation.Power)); });
                break;
            case 8:
                [5, 1, 1, 1].map(function (x) { return powerRepresentationMap.push(new PowerRepresentation_1.PowerRepresentation(x, powerRepresentation.Power)); });
                break;
            case 9:
                powerRepresentationMap.push(new PowerRepresentation_1.PowerRepresentation(1, powerRepresentation.Power));
                powerRepresentationMap.push(new PowerRepresentation_1.PowerRepresentation(1, powerRepresentation.Power * 10));
                break;
        }
        return powerRepresentationMap;
    };
    RomanNumeralsEncoderDecoderHelper.getCorrespondingValueBySymbol = function (symbol) {
        var symbolValueRepresentation = this._romanSymbolToNumberMap.find(function (x) { return x.Symbol == symbol; });
        if (symbolValueRepresentation == undefined) {
            throw new Error("Could not found value for symbol \"" + symbol + "\"");
        }
        return symbolValueRepresentation.Value;
    };
    RomanNumeralsEncoderDecoderHelper._romanSymbolToNumberMap = [
        new SymbolValueRepresentation_1.SymbolValueRepresentation("I", 1),
        new SymbolValueRepresentation_1.SymbolValueRepresentation("V", 5),
        new SymbolValueRepresentation_1.SymbolValueRepresentation("X", 10),
        new SymbolValueRepresentation_1.SymbolValueRepresentation("L", 50),
        new SymbolValueRepresentation_1.SymbolValueRepresentation("C", 100),
        new SymbolValueRepresentation_1.SymbolValueRepresentation("D", 500),
        new SymbolValueRepresentation_1.SymbolValueRepresentation("M", 1000)
    ];
    return RomanNumeralsEncoderDecoderHelper;
}());
exports.RomanNumeralsEncoderDecoderHelper = RomanNumeralsEncoderDecoderHelper;

},{"./PowerRepresentation":2,"./SymbolValueRepresentation":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolValueRepresentation = void 0;
var SymbolValueRepresentation = /** @class */ (function () {
    function SymbolValueRepresentation(symbol, value) {
        this._symbol = symbol;
        this._value = value;
    }
    Object.defineProperty(SymbolValueRepresentation.prototype, "Symbol", {
        get: function () {
            return this._symbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SymbolValueRepresentation.prototype, "Value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    return SymbolValueRepresentation;
}());
exports.SymbolValueRepresentation = SymbolValueRepresentation;

},{}]},{},[1]);
