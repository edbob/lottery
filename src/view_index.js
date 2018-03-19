'use strict';
if (window.addEventListener)
    window.addEventListener("load", init, false);
else if (window.attachEvent)
    window.attachEvent("onload", init);

function init() {
    let arr = [];
    let f = document.contForm;
    let eStart = f.fstart;
    let eStop = f.fstop;
    let eMaxleng = f.fresult;
    let eReset = f.freset;
    let eNoscroll = f.fresult;
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
        let variant = parseInt(f.fresult.value);
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
        let ul = getId("set-lot");
        for (let i = 0, x = ul.childNodes; i < x.length; i++) {
            if (x[i].nodeType !== 1) {
                continue;
            }
            arr.push(x[i]);
        }
        animeDigital();
    };

    let intervalHandlerDigital;

    function animeDigital() {
        let b = 0;
        intervalHandlerDigital = setInterval(() => {
            b++;
            if (b != 9) {
                for (let i = 0; i < arr.length; i++) {
                    arr[i].innerText = b;
                }
            } else {
                for (let i = 0; i < arr.length; i++) {
                    arr[i].innerText = 0;
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

        for (let b = 0; b < arr.length; b++) {
            let flag = -1;
            while (flag < 0) {
                flag = Math.floor(Math.random() * 9) + 1;
            }
            arr[b].innerText = flag;
        }
        result();
    };

    let intervalHandlerResult;
    let mspan = getId("mresult");

    function result() {
        let mvariant =+ f.fresult.value;
        let sumOfSquares = 0;
        arr.forEach((x) => {
            sumOfSquares += x.innerText;
        });

        let pcresult = parseInt(sumOfSquares, 10);
        let message = (pcresult == mvariant) ? "Your is winner!" : "Try again!";
        let flag = 0;
        intervalHandlerResult = setInterval(() => {
            flag++
            mspan.innerHTML = message;
            mspan.style.display = "block";
            mspan.style.height = flag + "px";
            mspan.style.paddingTop = flag / 2 + "px";
            if (flag == 50) clearInterval(intervalHandlerResult);
        }, 10)

        let mres = getId("my-result");
        let pres = getId("pc-result");
        let mli = document.createElement("li");
        let pcli = document.createElement("li");
        pres.appendChild(pcli).innerText += pcresult

        let csumA = String(mvariant);
        let csumB = String(pcresult);
        let valueA = [];
        let valueB = [];

        for (let i = 0; i < 5; i++) {
            valueA.push(csumA[i]); 
            valueB.push(csumB[i]);
        }

        for (let d = 0; d < 5; d++) {
            let res = valueA[d].indexOf(valueB[d]) > -1;
            let elem = document.createElement("b"),
                text = document.createTextNode(valueA[d]);
            elem.appendChild(text);
            if (res == true) {
                elem.style.color = "#2ab676";
            }
            mres.appendChild(mli).appendChild(elem);
        }

        for (let b = 0; b < 5; b++) {
            arr.pop();
        }
    };

    function lotMaxlength() {
        let tar = event.target;
        if (tar.hasAttribute("maxlength")) {
            tar.value = tar.value.slice(0, tar.getAttribute("maxlength"))
        }
    };

    function lotReset() {
        for (let i = 0; i < arr.length; i++) {
            arr[i].innerText = 0;
        }
        f.fstart.className = "my-btn start";
        f.fstart.disabled = false;
        f.fresult.disabled = false;

        if (mspan.style.height == "50px") {
            let flag = 50;
            intervalHandlerResult = setInterval(() => {
                flag--
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
        let res = elem.value.search(pattern);
        let intervalHandlerWarning;
        let fspan = getId("helpers");
        if (res == -1) {
            let flag = 0;
            elem.classList.remove("success");
            elem.classList.add("warning");
            f.fstart.disabled = true;
            f.fstart.className = "disabled";
            if (fspan.style.height != "50px") {
                intervalHandlerWarning = setInterval(() => {
                    flag++
                    fspan.style.display = "block";
                    fspan.style.height = flag + "px";
                    fspan.style.paddingTop = flag / 2 + "px";
                    if (flag == 50) clearInterval(intervalHandlerWarning);
                }, 10);
            }

        } else {
            let flag = 50;
            elem.classList.remove("warning");
            elem.classList.add("success");
            f.fstart.disabled = false;
            f.fstart.className = "my-btn start";

            intervalHandlerWarning = setInterval(() => {
                flag--
                fspan.style.height = flag + "px";
                fspan.style.paddingTop = flag / 2 + "px";
                if (flag == 0) {
                    fspan.style.display = "none";
                    clearInterval(intervalHandlerWarning);
                }
            }, 10);

        }
    };

    function onaction() {
        let pattern = /^[1-9]{5}/;
        validate(this, pattern);
    };
};

function getId(id) {
    return document.getElementById(id);
};
