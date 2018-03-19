class Controller {
    initialize(model, view) {
        this.model = model;
        this.view = view;

        this.arr = [];
        this.intervalHandlerDigital = 0;
    };
//надо поместить весь преобразующийся код в css чтобы было красиво!
    start({ variant }) {
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

        for (let i = 0, x = this.view.ul.childNodes; i < x.length; i++) {
            if (x[i].nodeType !== 1) {
                continue;
            }
            this.arr.push(x[i]);
        };

        this.animeDigital();
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

    //необходимо добавить stop! и порефакторить код!!!

    validate(elem, pattern) {
        //тут тоже все что можно запехнуть в css
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

export default Controller;