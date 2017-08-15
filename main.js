'use strict';

if (window.addEventListener)
    window.addEventListener("load", init, false);
else if (window.attachEvent)
    window.attachEvent("onload", init);

function init() {
    let f = document.contForm;
    let eStart = f.fstart;
    let eStop = f.fstop;
    let eMaxleng = f.fresult;
    let eReset = f.freset;
    f.fstop.disabled = true;
    f.fstop.className = "disabled";

    if (eStart.addEventListener) eStart.addEventListener("click", lotStart, false);
    if (eStart.attachEvent) eStart.attachEvent("onclick", lotStart);

    if (eStop.addEventListener) eStop.addEventListener("click", lotStop, false);
    if (eStop.attachEvent) eStop.attachEvent("onclick", lotStop);

    if (eMaxleng.addEventListener) eMaxleng.addEventListener("input", lotMaxlength, false);
    if (eMaxleng.attachEvent) eMaxleng.attachEvent("input", lotMaxlength);

    if (eReset.addEventListener) eReset.addEventListener("click", lotReset, false);
    if (eReset.attachEvent) eReset.attachEvent("onclick", lotReset);

}

let arr = new Array();

function lotStart() {
    let f = document.contForm;
    let variant = parseInt(contForm.fresult.value);

    if (isNaN(variant) == true) {
        alert("Enter code lottery!");
        f.fresult.classList.add("warning");
        f.fstart.disabled = false;
        f.fstop.disabled = true;
        return false;
    } else {
        f.fstop.className = "btn start";
        f.fstart.className = "disabled";
        f.fresult.classList.remove("warning");
        f.fstart.disabled = true;
        f.fstop.disabled = false;
    }
    
    let ul = getId("set-lot");
    let allEl = ul.children;

    for (let i = 0; i < allEl.length; i++) {
        arr.push(allEl[i]);
    }
    anime();
}

let intervalHandler;

function anime() {
    let b = 0;
    intervalHandler = setInterval(function () {
        b++;
        if (b != 9) {
            arr[0].innerText = b;
            arr[1].innerText = b;
            arr[2].innerText = b;
            arr[3].innerText = b;
            arr[4].innerText = b;
        } else {
            arr[0].innerText = 0;
            arr[1].innerText = 0;
            arr[2].innerText = 0;
            arr[3].innerText = 0;
            arr[4].innerText = 0;
            b = 0;
        }
    }, 50);
}

function lotStop() {
    let f = document.contForm;
    f.fstop.disabled = true;
    f.fstart.disabled = true;
    f.fstop.className = "disabled";
    clearInterval(intervalHandler);
    let ul = getId("set-lot");
    let allEl = ul.children;

    for (let i = 0; i < allEl.length; i++) {
        arr.push(allEl[i]);
    }

    for (let b = 0; b < arr.length; b++) {
        let flag = -1;
        let c = 0;
        while (flag < 0) {
            flag = Math.floor(Math.random() * 9);
        }
        arr[b].innerText = flag;
    }
    result();
}

function result() {
    let variant = parseInt(contForm.fresult.value);
    let sumOfSquares;
    arr.forEach(function (x) {
        sumOfSquares += x.innerText;
    });

    let res = sumOfSquares.slice(9, -5);
    let message = (parseInt(res) == variant) ? "Your is winner!" : "Try again!";
    alert(message);
}

function lotMaxlength(e) {
    let tar = event.target;
    if (tar.hasAttribute("maxlength")) {
        tar.value = tar.value.slice(0, tar.getAttribute("maxlength"))
    }
}

function lotReset() {
    let f = document.contForm;
    for (let i = 0; i < arr.length; i++) {
        arr[i].innerText = 0;
    }
    f.fstop.className = "btn start";
    f.fstart.className = "btn start";
    f.fstart.disabled = false;
    f.fstop.disabled = false;
}

function getId(id) {
    return document.getElementById(id);
}