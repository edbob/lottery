class Controller {
    initialize(model, view) {
        this.model = model;
        this.view = view;

        this.arr = [];
        this.intervalHandlerDigital = 0;
        this.intervalHandlerResult = 0;
        this.intervalHandlerWarning = 0

    };

    start({ variant }) {

        if (!isNaN(variant)) {
            this.view.fstop.className = this.view.ClasNameEnabled;
            this.view.fstop.disabled = false;
            this.view.fstart.className =  this.view.ClasNameDisabled;
            this.view.fstart.disabled = true;
            this.view.fresult.classList.remove(this.view.ClasListWarning);
        } else {
            this.view.fresult.classList.remove(this.view.ClasListSuccess);
            this.view.fresult.classList.add(this.view.ClasListWarning);
            alert("Enter code lottery!");
            return false;
        };

        for (let i = 0, x = this.view.ulId.childNodes; i < x.length; i++) {
            if (x[i].nodeType !== 1) {
                continue;
            }
            this.arr.push(x[i]);
        };

        this.animeDigital();
    };

    stop() {
        this.view.fstop.disabled = true;
        this.view.fstart.disabled = true;
        this.view.fstop.className = this.view.ClasNameDisabled;
        this.view.fresult.disabled = true;
        this.view.freset.disabled = false;
        this.view.freset.className = this.view.ClasNameEnabled;
        clearInterval(this.intervalHandlerDigital);

        for (let i = 0; i < this.arr.length; i++) {
            let flag = -1;
            while (flag < 0) {
                flag = Math.floor(Math.random() * 9) + 1;
            }
            this.arr[i].innerText = flag;
        };
        this.result();
    };

    result() {
        let mvariant = + this.view.fresult.value;
        let sumOfSquares = 0;
        this.arr.forEach((x) => {
            sumOfSquares += x.innerText;
        });

        let pcresult = parseInt(sumOfSquares, 10);
        let message = (pcresult == mvariant) ? "Your is winner!" : "Try again!";
        let flag = 0;

        this.intervalHandlerResult = setInterval(() => {
            flag++
            this.view.elResult.innerHTML = message;
            this.view.elResult.style.display = "block";
            this.view.elResult.style.height = flag + "px";
            this.view.elResult.style.paddingTop = flag / 2 + "px";

            if (flag == 50) clearInterval(this.intervalHandlerResult);
        }, 10)

        let mli = document.createElement("li");
        let pcli = document.createElement("li");
        this.view.pres.appendChild(pcli).innerText += pcresult

        let csumA = String(mvariant);
        let csumB = String(pcresult);
        let storA = [];
        let storB = [];

        for (let i = 0; i < 5; i++) {
            storA.push(csumA[i]);
            storB.push(csumB[i]);
        };

        for (let i = 0; i < 5; i++) {
            let res = storA[i].indexOf(storB[i]) > -1;
            let elem = document.createElement("b"),
                text = document.createTextNode(storA[i]);
            elem.appendChild(text);
            if (res == true) {
                elem.style.color = "#2ab676";
            }
            this.view.mres.appendChild(mli).appendChild(elem);
        };

        for (let i = 0; i < 5; i++) {
            this.arr.pop();
        };
    };

    animeDigital() {
        let b = 0;
        this.intervalHandlerDigital = setInterval(() => {
            b++;
            if (b != 9) {
                for (let i = 0; i < this.arr.length; i++) {
                    this.arr[i].innerText = b;
                }
            } else {
                for (let i = 0; i < this.arr.length; i++) {
                    this.arr[i].innerText = 0;
                }
                b = 0;
            }
        }, 50);
    };

    Maxlength({ target }) {
        if (target.hasAttribute("maxlength")) {
            target.value = target.value.slice(0, target.getAttribute("maxlength"))
        };
    };

    //необходимо добавить stop! и порефакторить код!!!

    validate(elem, pattern) {
        //тут тоже все что можно запехнуть в css
        let res = elem.value.search(pattern);

        let fspan = this.view.fspan;
        if (res == -1) {
            let flag = 0;
            elem.classList.remove("success");
            elem.classList.add("warning");
            this.view.fstart.disabled = true;
            this.view.fstart.className = "disabled";
            if (fspan.style.height != "50px") {
                this.intervalHandlerWarning = setInterval(() => {
                    flag++
                    fspan.style.display = "block";
                    fspan.style.height = flag + "px";
                    fspan.style.paddingTop = flag / 2 + "px";
                    if (flag == 50) clearInterval(this.intervalHandlerWarning);
                }, 10);
            }

        } else {
            let flag = 50;
            elem.classList.remove("warning");
            elem.classList.add("success");
            this.view.fstart.disabled = false;
            this.view.fstart.className = "my-btn start";

            this.intervalHandlerWarning = setInterval(() => {
                flag--
                fspan.style.height = flag + "px";
                fspan.style.paddingTop = flag / 2 + "px";
                if (flag == 0) {
                    fspan.style.display = "none";
                    clearInterval(this.intervalHandlerWarning);
                }
            }, 10);

        };
    };

    reset() {
        for (let i = 0; i < this.arr.length; i++) {
            this.arr[i].innerText = 0;
        }
        this.view.fstart.className = "my-btn start";
        this.view.fstart.disabled = false;
        this.view.fresult.disabled = false;

        if (this.view.mspan.style.height == "50px") {
            let flag = 50;
            this.intervalHandlerResult = setInterval(() => {
                flag--
                this.view.mspan.style.height = flag + "px";
                this.view.mspan.style.paddingTop = flag / 2 + "px";
                if (flag == 0) {
                    this.view.mspan.style.display = "none";
                    clearInterval(this.intervalHandlerResult);
                }
            }, 10);
        };
    };

    patterns({ target }) {
        let pattern = /^[1-9]{5}/;
        this.validate(target, pattern);
    };

    memoize(fn) {
        let store = {};

        return function (arg) {
            if (store[arg]) {
                return store[arg];
            } else {
                store[arg] = fn(arg);
                return store[arg];
            };
        };
    };

};

export default Controller;//1:40