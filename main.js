
if (window.addEventListener)
    window.addEventListener("load", init, false);
else if (window.attachEvent)
    window.attachEvent("onload", init);

function init() {
    let f = document.contForm;
    let sStart = f.fstart;
    let eStop = f.fstop;

    if (sStart.addEventListener) sStart.addEventListener("click", lotStart, false);
    if (sStart.attachEvent) sStart.attachEvent("onclick", lotStart);

    if (eStop.addEventListener) eStop.addEventListener("click", lotStop, false);
    if (eStop.attachEvent) eStop.attachEvent("onclick", lotStop);
}

let arr = new Array();

function lotStart() {
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
}

function getId(id) {
    return document.getElementById(id);
}