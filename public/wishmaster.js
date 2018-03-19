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

var _controller = __webpack_require__(2);

var _controller2 = _interopRequireDefault(_controller);

var _view = __webpack_require__(3);

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

var Model = function Model() {
    //...code

    _classCallCheck(this, Model);
};

;

exports.default = Model;

/***/ }),
/* 2 */
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
        }
    }, {
        key: "start",

        //надо поместить весь преобразующийся код в css чтобы было красиво!
        value: function start(_ref) {
            var variant = _ref.variant;

            this.fresult = this.view.fresult;
            console.log(this.fresult);
            if (!isNaN(variant)) {
                this.view.fstop.className = "my-btn start";
                this.view.fstart.className = "disabled";
                this.view.fresult.classList.remove("warning");
                this.view.fstart.disabled = true;
                this.view.fstop.disabled = false;
                this.view.freset.disabled = true;
                this.view.freset.className = "disabled";
            } else {
                this.view.fresult.classList.remove("success");
                this.view.fresult.classList.add("warning");
                alert("Enter code lottery!");
                return false;
            };

            for (var i = 0, x = this.view.ul.childNodes; i < x.length; i++) {
                if (x[i].nodeType !== 1) {
                    continue;
                }
                this.arr.push(x[i]);
            };

            this.animeDigital();
        }
    }, {
        key: "animeDigital",
        value: function animeDigital() {
            var _this = this;

            var b = 0;
            this.intervalHandlerDigital = setInterval(function () {
                b++;
                if (b != 9) {
                    for (var i = 0; i < _this.arr.length; i++) {
                        _this.arr[i].innerText = b;
                    }
                } else {
                    for (var _i = 0; _i < _this.arr.length; _i++) {
                        _this.arr[_i].innerText = 0;
                    }
                    b = 0;
                }
            }, 50);
        }
    }, {
        key: "validate",


        //необходимо добавить stop! и порефакторить код!!!

        value: function validate(elem, pattern) {
            //тут тоже все что можно запехнуть в css
            var res = elem.value.search(pattern);
            var intervalHandlerWarning = void 0;
            var fspan = getId("helpers");
            if (res == -1) {
                var flag = 0;
                elem.classList.remove("success");
                elem.classList.add("warning");
                f.fstart.disabled = true;
                f.fstart.className = "disabled";
                if (fspan.style.height != "50px") {
                    intervalHandlerWarning = setInterval(function () {
                        flag++;
                        fspan.style.display = "block";
                        fspan.style.height = flag + "px";
                        fspan.style.paddingTop = flag / 2 + "px";
                        if (flag == 50) clearInterval(intervalHandlerWarning);
                    }, 10);
                }
            } else {
                var _flag = 50;
                elem.classList.remove("warning");
                elem.classList.add("success");
                f.fstart.disabled = false;
                f.fstart.className = "my-btn start";

                intervalHandlerWarning = setInterval(function () {
                    _flag--;
                    fspan.style.height = _flag + "px";
                    fspan.style.paddingTop = _flag / 2 + "px";
                    if (_flag == 0) {
                        fspan.style.display = "none";
                        clearInterval(intervalHandlerWarning);
                    }
                }, 10);
            }
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

exports.default = Controller;

/***/ }),
/* 3 */
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

            this.fstop.disabled = true;
            this.fstop.className = "disabled";
            //this.fresult.onchange = this.onAction;

            if (this.fstart.addEventListener) this.fstart.addEventListener("click", this.clickStart.bind(this), false);
            if (this.fstart.attachEvent) this.fstart.attachEvent("onclick", this.clickStart);

            if (this.fstop.addEventListener) this.fstop.addEventListener("click", this.lotStop.bind(this), false);
            if (this.fstop.attachEvent) this.fstop.attachEvent("onclick", this.lotStop);

            if (this.fresult.addEventListener) this.fresult.addEventListener("input", this.lotMaxlength.bind(this), false);
            if (this.fresult.attachEvent) this.fresult.attachEvent("input", this.lotMaxlength);

            if (this.freset.addEventListener) this.freset.addEventListener("click", this.lotReset.bind(this), false);
            if (this.freset.attachEvent) this.freset.attachEvent("onclick", this.lotReset);

            this.getID = this.controller.memoize(this.getElement);
            this.ul = this.getID("#set-lot");
        }
    }, {
        key: "clickStart",
        value: function clickStart(event) {
            var data = {
                variant: parseInt(this.fresult.value)
            };

            this.controller.start(data);
        }
    }, {
        key: "lotStop",
        value: function lotStop() {}
    }, {
        key: "getElement",
        value: function getElement(selector) {
            return document.querySelector(selector);
        }
    }, {
        key: "lotMaxlength",
        value: function lotMaxlength() {}
    }, {
        key: "onAction",
        value: function onAction() {
            var pattern = /^[1-9]{5}/;

            this.controller.validate(this, pattern);
        }
    }, {
        key: "lotReset",
        value: function lotReset() {}
    }]);

    return View;
}();

;

exports.default = View;

/***/ })
/******/ ]);