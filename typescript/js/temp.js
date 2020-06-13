function a(require,module,exports){
"use strict";
var Temporary = /** @class */ (function () {
    function Temporary() {
    }
    Temporary.pringMessage = function (message) {
        console.log("Message: " + message);
    };
    return Temporary;
}());
exports.Temporary = Temporary;
console.log(Temporary.pringMessage('hello'));

}