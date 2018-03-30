/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _model = __webpack_require__(1);

var _model2 = _interopRequireDefault(_model);

var _controller = __webpack_require__(3);

var _controller2 = _interopRequireDefault(_controller);

var _view = __webpack_require__(4);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var model = new _model2.default();
var controller = new _controller2.default(model);
var view = new _view2.default(model, controller);

controller.initialize(model, view);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var data = __webpack_require__(2);

var Model = function Model() {
    _classCallCheck(this, Model);

    this.correctly = data.correctly, this.incorrectly = data.incorrectly;
};

;

exports.default = Model;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"correctly":"Your is winner!","incorrectly":"Try again!"}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);
    }

    _createClass(Controller, [{
        key: "initialize",
        value: function initialize(model, view) {
            this.model = model;
            this.view = view;

            this.arr = [];
            this.intervalHandlerDigital = 0;
            this.intervalHandlerResult = 0;
            this.intervalHandlerWarning = 0;
        }
    }, {
        key: "start",
        value: function start(_ref) {
            var variant = _ref.variant;


            if (!isNaN(variant)) {
                this.view.fstop.className = this.view.ClasNameEnabled;
                this.view.fstop.disabled = false;
                this.view.fstart.className = this.view.ClasNameDisabled;
                this.view.fstart.disabled = true;
                this.view.fresult.classList.remove(this.view.ClasListWarning);
            } else {
                this.view.fresult.classList.remove(this.view.ClasListSuccess);
                this.view.fresult.classList.add(this.view.ClasListWarning);
                alert("Enter code lottery!");
                return false;
            };

            for (var i = 0, x = this.view.ulId.childNodes; i < x.length; i++) {
                if (x[i].nodeType !== 1) {
                    continue;
                }
                this.arr.push(x[i]);
            };

            this.animeDigital();
        }
    }, {
        key: "stop",
        value: function stop() {
            this.view.fstop.disabled = true;
            this.view.fstart.disabled = true;
            this.view.fstop.className = this.view.ClasNameDisabled;
            this.view.fresult.disabled = true;
            this.view.freset.disabled = false;
            this.view.freset.className = this.view.ClasNameEnabled;
            clearInterval(this.intervalHandlerDigital);

            for (var i = 0; i < this.arr.length; i++) {
                var flag = -1;
                while (flag < 0) {
                    flag = Math.floor(Math.random() * 9) + 1;
                }
                this.arr[i].innerText = flag;
            };
            this.result();
        }
    }, {
        key: "result",
        value: function result() {
            var _this = this;

            var mvariant = +this.view.fresult.value;
            var sumOfSquares = 0;
            this.arr.forEach(function (x) {
                sumOfSquares += x.innerText;
            });

            var pcresult = parseInt(sumOfSquares, 10);
            var result = pcresult == mvariant ? this.model.correctly : this.model.incorrectly;
            var flag = 0;

            this.intervalHandlerResult = setInterval(function () {
                flag++;
                _this.view.elResult.innerHTML = result;
                _this.view.elResult.style.display = _this.view.styleSettings.display;
                _this.view.elResult.style.height = flag + _this.view.styleSettings.measure;
                _this.view.elResult.style.paddingTop = flag / 2 + _this.view.styleSettings.measure;

                if (flag == 50) clearInterval(_this.intervalHandlerResult);
            }, 10);

            this.view.pcResultEl.appendChild(this.view.pcli).innerText += pcresult;

            var csumA = String(mvariant);
            var csumB = String(pcresult);
            var storA = [];
            var storB = [];

            for (var i = 0; i < 5; i++) {
                storA.push(csumA[i]);
                storB.push(csumB[i]);
            };

            for (var _i = 0; _i < 5; _i++) {
                var res = storA[_i].indexOf(storB[_i]) > -1;
                var userResults = document.createTextNode(storA[_i]);
                this.view.elementB.appendChild(userResults);
                if (res == true) {
                    this.view.elementB.style.color = this.view.correctlyColor;
                }
                this.view.userResultEl.appendChild(this.view.userli).appendChild(this.view.elementB);
            };

            for (var _i2 = 0; _i2 < 5; _i2++) {
                this.arr.pop();
            };
        }
    }, {
        key: "animeDigital",
        value: function animeDigital() {
            var _this2 = this;

            var b = 0;
            this.intervalHandlerDigital = setInterval(function () {
                b++;
                if (b != 9) {
                    for (var i = 0; i < _this2.arr.length; i++) {
                        _this2.arr[i].innerText = b;
                    }
                } else {
                    for (var _i3 = 0; _i3 < _this2.arr.length; _i3++) {
                        _this2.arr[_i3].innerText = 0;
                    }
                    b = 0;
                }
            }, 50);
        }
    }, {
        key: "Maxlength",
        value: function Maxlength(_ref2) {
            var target = _ref2.target;

            if (target.hasAttribute("maxlength")) {
                target.value = target.value.slice(0, target.getAttribute("maxlength"));
            };
        }
    }, {
        key: "validate",
        value: function validate(elem, pattern) {
            var _this3 = this;

            //тут тоже все что можно запехнуть в css
            var res = elem.value.search(pattern);

            var fspan = this.view.fspan;
            if (res == -1) {
                var flag = 0;
                elem.classList.remove("success");
                elem.classList.add("warning");
                this.view.fstart.disabled = true;
                this.view.fstart.className = "disabled";
                if (fspan.style.height != "50px") {
                    this.intervalHandlerWarning = setInterval(function () {
                        flag++;
                        fspan.style.display = "block";
                        fspan.style.height = flag + "px";
                        fspan.style.paddingTop = flag / 2 + "px";
                        if (flag == 50) clearInterval(_this3.intervalHandlerWarning);
                    }, 10);
                }
            } else {
                var _flag = 50;
                elem.classList.remove("warning");
                elem.classList.add("success");
                this.view.fstart.disabled = false;
                this.view.fstart.className = "my-btn start";

                this.intervalHandlerWarning = setInterval(function () {
                    _flag--;
                    fspan.style.height = _flag + "px";
                    fspan.style.paddingTop = _flag / 2 + "px";
                    if (_flag == 0) {
                        fspan.style.display = "none";
                        clearInterval(_this3.intervalHandlerWarning);
                    }
                }, 10);
            };
        }
    }, {
        key: "reset",
        value: function reset() {
            var _this4 = this;

            for (var i = 0; i < this.arr.length; i++) {
                this.arr[i].innerText = 0;
            }
            this.view.fstart.className = "my-btn start";
            this.view.fstart.disabled = false;
            this.view.fresult.disabled = false;

            if (this.view.elResult.style.height == "50px") {
                var flag = 50;
                this.intervalHandlerResult = setInterval(function () {
                    flag--;
                    _this4.view.elResult.style.height = flag + "px";
                    _this4.view.elResult.style.paddingTop = flag / 2 + "px";
                    if (flag == 0) {
                        _this4.view.elResult.style.display = "none";
                        clearInterval(_this4.intervalHandlerResult);
                    }
                }, 10);
            };
        }
    }, {
        key: "patterns",
        value: function patterns(_ref3) {
            var target = _ref3.target;

            var pattern = /^[1-9]{5}/;
            this.validate(target, pattern);
        }
    }, {
        key: "memoize",
        value: function memoize(fn) {
            var store = {};

            return function (arg) {
                if (store[arg]) {
                    return store[arg];
                } else {
                    store[arg] = fn(arg);
                    return store[arg];
                };
            };
        }
    }]);

    return Controller;
}();

;

exports.default = Controller; //1:40

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
    function View(model, controller) {
        _classCallCheck(this, View);

        this.model = model;
        this.controller = controller;

        this.onLoad();
    }

    _createClass(View, [{
        key: "onLoad",
        value: function onLoad() {
            if (window.addEventListener) {
                window.addEventListener("load", this.init.bind(this), false);
            } else if (window.attachEvent) {
                window.attachEvent("onload", this.init.bind(this));
            };
        }
    }, {
        key: "init",
        value: function init() {
            this.form = document.contForm;
            this.fstart = this.form.fstart;
            this.fstop = this.form.fstop;
            this.fresult = this.form.fresult;
            this.freset = this.form.freset;

            //default settings
            this.ClasNameEnabled = "my-btn start";
            this.ClasNameDisabled = "disabled";
            this.ClasListWarning = "warning";
            this.ClasListSuccess = "success";

            this.fstop.disabled = true;
            this.fstop.className = this.ClasNameDisabled;

            this.freset.disabled = true;
            this.freset.className = this.ClasNameDisabled;

            this.styleSettings = {
                measure: "px",
                display: "block"

            };

            //Event
            if (this.fstart.addEventListener) this.fstart.addEventListener("click", this.start.bind(this), false);
            if (this.fstart.attachEvent) this.fstart.attachEvent("onclick", this.start);

            if (this.fstop.addEventListener) this.fstop.addEventListener("click", this.stop.bind(this), false);
            if (this.fstop.attachEvent) this.fstop.attachEvent("onclick", this.stop);

            if (this.fresult.addEventListener) this.fresult.addEventListener("input", this.validAction.bind(this), false);
            if (this.fresult.attachEvent) this.fresult.attachEvent("input", this.validAction);

            if (this.freset.addEventListener) this.freset.addEventListener("click", this.lotReset.bind(this), false);
            if (this.freset.attachEvent) this.freset.attachEvent("onclick", this.lotReset);

            //Find id 
            this.getID = this.controller.memoize(this.getElement);
            this.ulId = this.getID("#set-lot");
            this.elResult = this.getID("#mresult");
            this.userResultEl = this.getID("#user-result");
            this.pcResultEl = this.getID("#pc-result");
            this.fspan = this.getID("#helpers");
            //create element
            this.userli = document.createElement("li");
            this.pcli = document.createElement("li");
            this.elementB = document.createElement("b");
            //color
            this.correctlyColor = "#2ab676";
        }
    }, {
        key: "start",
        value: function start(event) {
            var data = {
                variant: parseInt(this.fresult.value)
            };

            this.controller.start(data);
        }
    }, {
        key: "stop",
        value: function stop(event) {
            this.controller.stop();
        }
    }, {
        key: "getElement",
        value: function getElement(selector) {
            return document.querySelector(selector);
        }
    }, {
        key: "validAction",
        value: function validAction(event) {
            var data = {
                target: event.target
            };
            this.controller.Maxlength(data);
            this.controller.patterns(data);
        }
    }, {
        key: "lotReset",
        value: function lotReset() {
            this.controller.reset();
        }
    }]);

    return View;
}();

;

exports.default = View;

/***/ })
/******/ ]);