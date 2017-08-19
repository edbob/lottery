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

let arr = [];

function lotStart() {
    let f = document.contForm;
    let variant = parseInt(f.fresult.value);

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
    for (let i = 0, x = ul.childNodes; i < x.length; i++){
        if (x[i].nodeType !== 1) {
            continue;
        }
        arr.push(x[i]);
    }
    anime();
}

let intervalHandler;

function anime() {
    let b = 0;
    intervalHandler = setInterval(function () {
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
}

function lotStop() {
    let f = document.contForm;
    f.fstop.disabled = true;
    f.fstart.disabled = true;
    f.fstop.className = "disabled";
    clearInterval(intervalHandler);

    for (let b = 0; b < arr.length; b++) {
        let flag = -1;
        while (flag < 0) {
            flag = Math.floor(Math.random() * 9);
        }
        arr[b].innerText = flag;
    }
    result();
}

function result() {
    let mvariant =+ contForm.fresult.value;
    let sumOfSquares = 0;
    arr.forEach(function (x) {
        sumOfSquares += x.innerText;
    });

    let pcresult = parseInt(sumOfSquares, 10);
    let message = (pcresult == mvariant) ? "Your is winner!" : "Try again!";
    alert(message);

    let mres = getId("my-result");
    let pres = getId("pc-result");

    let mli = document.createElement("li");
    let pcli = document.createElement("li");

    mres.appendChild(mli).innerText += mvariant;
    pres.appendChild(pcli).innerText += pcresult
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
    for (let b = 0; b < 5; b++) {
        arr.pop();
    }

    f.fstart.className = "btn start";
    f.fstart.disabled = false;
}

function getId(id) {
    return document.getElementById(id);
}