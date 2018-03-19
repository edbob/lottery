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


if (window.addEventListener) window.addEventListener("load", init, false);else if (window.attachEvent) window.attachEvent("onload", init);

function init() {
    var arr = [];
    var f = document.contForm;
    var eStart = f.fstart;
    var eStop = f.fstop;
    var eMaxleng = f.fresult;
    var eReset = f.freset;
    var eNoscroll = f.fresult;
    f.fstop.disabled = true;
    f.fstop.className = "disabled";
    f.fresult.onchange = onaction;

    if (eStart.addEventListener) eStart.addEventListener("click", lotStart, false);
    if (eStart.attachEvent) eStart.attachEvent("onclick", lotStart);

    if (eStop.addEventListener) eStop.addEventListener("click", lotStop, false);
    if (eStop.attachEvent) eStop.attachEvent("onclick", lotStop);

    if (eMaxleng.addEventListener) eMaxleng.addEventListener("input", lotMaxlength, false);
    if (eMaxleng.attachEvent) eMaxleng.attachEvent("input", lotMaxlength);

    if (eReset.addEventListener) eReset.addEventListener("click", lotReset, false);
    if (eReset.attachEvent) eReset.attachEvent("onclick", lotReset);

    function lotStart() {
        var variant = parseInt(f.fresult.value);
        if (isNaN(variant) == true) {
            f.fresult.classList.remove("success");
            f.fresult.classList.add("warning");
            alert("Enter code lottery!");
            return false;
        } else {
            f.fstop.className = "my-btn start";
            f.fstart.className = "disabled";
            f.fresult.classList.remove("warning");
            f.fstart.disabled = true;
            f.fstop.disabled = false;
            f.freset.disabled = true;
            f.freset.className = "disabled";
        }
        var ul = getId("set-lot");
        for (var i = 0, x = ul.childNodes; i < x.length; i++) {
            if (x[i].nodeType !== 1) {
                continue;
            }
            arr.push(x[i]);
        }
        animeDigital();
    };

    var intervalHandlerDigital = void 0;

    function animeDigital() {
        var b = 0;
        intervalHandlerDigital = setInterval(function () {
            b++;
            if (b != 9) {
                for (var i = 0; i < arr.length; i++) {
                    arr[i].innerText = b;
                }
            } else {
                for (var _i = 0; _i < arr.length; _i++) {
                    arr[_i].innerText = 0;
                }
                b = 0;
            }
        }, 50);
    };

    function lotStop() {
        f.fstop.disabled = true;
        f.fstart.disabled = true;
        f.fstop.className = "disabled";
        f.fresult.disabled = true;
        f.freset.disabled = false;
        f.freset.className = "my-btn start";
        clearInterval(intervalHandlerDigital);

        for (var b = 0; b < arr.length; b++) {
            var flag = -1;
            while (flag < 0) {
                flag = Math.floor(Math.random() * 9) + 1;
            }
            arr[b].innerText = flag;
        }
        result();
    };

    var intervalHandlerResult = void 0;
    var mspan = getId("mresult");

    function result() {
        var mvariant = +f.fresult.value;
        var sumOfSquares = 0;
        arr.forEach(function (x) {
            sumOfSquares += x.innerText;
        });

        var pcresult = parseInt(sumOfSquares, 10);
        var message = pcresult == mvariant ? "Your is winner!" : "Try again!";
        var flag = 0;
        intervalHandlerResult = setInterval(function () {
            flag++;
            mspan.innerHTML = message;
            mspan.style.display = "block";
            mspan.style.height = flag + "px";
            mspan.style.paddingTop = flag / 2 + "px";
            if (flag == 50) clearInterval(intervalHandlerResult);
        }, 10);

        var mres = getId("my-result");
        var pres = getId("pc-result");
        var mli = document.createElement("li");
        var pcli = document.createElement("li");
        pres.appendChild(pcli).innerText += pcresult;

        var csumA = String(mvariant);
        var csumB = String(pcresult);
        var valueA = [];
        var valueB = [];

        for (var i = 0; i < 5; i++) {
            valueA.push(csumA[i]);
            valueB.push(csumB[i]);
        }

        for (var d = 0; d < 5; d++) {
            var res = valueA[d].indexOf(valueB[d]) > -1;
            var elem = document.createElement("b"),
                text = document.createTextNode(valueA[d]);
            elem.appendChild(text);
            if (res == true) {
                elem.style.color = "#2ab676";
            }
            mres.appendChild(mli).appendChild(elem);
        }

        for (var b = 0; b < 5; b++) {
            arr.pop();
        }
    };

    function lotMaxlength() {
        var tar = event.target;
        if (tar.hasAttribute("maxlength")) {
            tar.value = tar.value.slice(0, tar.getAttribute("maxlength"));
        }
    };

    function lotReset() {
        for (var i = 0; i < arr.length; i++) {
            arr[i].innerText = 0;
        }
        f.fstart.className = "my-btn start";
        f.fstart.disabled = false;
        f.fresult.disabled = false;

        if (mspan.style.height == "50px") {
            var flag = 50;
            intervalHandlerResult = setInterval(function () {
                flag--;
                mspan.style.height = flag + "px";
                mspan.style.paddingTop = flag / 2 + "px";
                if (flag == 0) {
                    mspan.style.display = "none";
                    clearInterval(intervalHandlerResult);
                }
            }, 10);
        }
    };

    function validate(elem, pattern) {
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
    };

    function onaction() {
        var pattern = /^[1-9]{5}/;
        validate(this, pattern);
    };
};

function getId(id) {
    return document.getElementById(id);
};

/***/ })
/******/ ]);