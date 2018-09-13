class Controller {
    initialize(model, view) {
        this.model = model;
        this.view = view;

        this.arr = [];
        this.intervalHandlerDigital = 0;
        this.intervalHandlerResult = 0;
    };

    start({ variant }) {

        if (!isNaN(variant)) {
            this.view.fstop.className = this.view.ClasNameTurnsOn;
            this.view.fstop.disabled = false;
            this.view.fstart.className = this.view.ClasNameTurnsOff;
            this.view.fstart.disabled = true;
            this.view.freset.disabled = true;
            this.view.freset.className  = this.view.ClasNameTurnsOff;
            this.view.fresult.classList.remove("warning");
        } else {
            this.view.fresult.classList.remove("success");
            this.view.fresult.classList.add("warning");
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
        this.view.fstop.className = this.view.ClasNameTurnsOff;
        this.view.fresult.disabled = true;
        this.view.freset.disabled = false;
        this.view.freset.className = this.view.ClasNameTurnsOn;
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
        let userVariantSumm = this.view.fresult.value;
        let sumOfSquares = 0;

        this.arr.forEach((x) => {
            sumOfSquares += x.innerText;
        });

        let pcVariantSumm = parseInt(sumOfSquares, 10);
        let result = (pcVariantSumm === userVariantSumm) ? this.model.correctly : this.model.incorrectly;
        let flag = 0;

        let intervalHandlerResult = setInterval(() => {
            flag++
            this.view.elResult.innerHTML = result;
            this.view.elResult.style.display = "display";
            this.view.elResult.style.height = flag + "px";
            this.view.elResult.style.paddingTop = flag / 2 + "px";

            if (flag == 50) clearInterval(intervalHandlerResult);
        }, 10);
        this.pcli = document.createElement("li");
        this.view.pcResultElement.appendChild(this.pcli).innerText += pcVariantSumm;
        this.sortResult(userVariantSumm, pcVariantSumm);
    };

    sortResult(userVariantSumm, pcVariantSumm) {
        let userSum = String(userVariantSumm);
        let pcSum = String(pcVariantSumm);
        let userStored = [];
        let pcStored = [];

        for (let i = 0; i < 5; i++) {
            userStored.push(userSum[i]);
            pcStored.push(pcSum[i]);
        };
        let userli = document.createElement("li");
        let elementB = document.createElement("b");

        for (let i = 0; i < 5; i++) {
            let res = userStored[i].indexOf(pcStored[i]) > -1;
            let userResults = document.createTextNode(userStored[i]);
            if (res == true) {
                this.view.userResultElement.appendChild(userli).appendChild(elementB).appendChild(userResults);
                elementB.style.color = "#2ab676";
            }else{
                this.view.userResultElement.appendChild(userli).appendChild(userResults);
            }
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

    //number of input values
    Maxlength({ target }) {
        if (target.hasAttribute("maxlength")) {
            target.value = target.value.slice(0, target.getAttribute("maxlength"))
        };
    };

    //drop-down hint menu
    dropHints(element, pattern) {
        let res = element.value.search(pattern);
        //let fspan = this.view.getID("helpers");
        let flag = 0;
        if (res == -1) {
            element.classList.remove("success");
            element.classList.add("warning");
            this.view.fstart.disabled = true;
            this.view.fstart.className = this.view.ClasNameTurnsOff;
            if (this.view.fspan.style.height !== "50px") {
                let intervalHandlerWarning = setInterval(() => {
                    this.view.fspan.style.display = "block";
                    flag++;
                    this.view.fspan.style.height = flag + "px";
                    this.view.fspan.style.paddingTop = flag / 2 + "px";
                    if (flag == 50) clearInterval(intervalHandlerWarning);
                }, 10);
            }
        } else {
            element.classList.remove("warning");
            element.classList.add("success");
            this.view.fstart.disabled = false;
            this.view.fstart.className = this.view.ClasNameTurnsOn;
            let elementSum = parseInt(element.value);
            if (elementSum != 0) {
                let intervalHandlerWarning = setInterval(() => {
                    let sumFlag = parseInt(this.view.fspan.style.height);
                    sumFlag--
                    this.view.fspan.style.height = sumFlag + "px";
                    this.view.fspan.style.paddingTop = sumFlag / 2 + "px";
                    if (sumFlag == 0) {
                        this.view.fspan.style.display = "none";
                        clearInterval(intervalHandlerWarning);
                    }
                }, 10);
            }
        };
    };

    reset() {
        for (let i = 0; i < this.arr.length; i++) {
            this.arr[i].innerText = 0;
        }
        this.view.fstart.className += this.view.ClasNameTurnsOn;
        this.view.fstart.disabled = false;
        this.view.fresult.disabled = false;

        if (this.view.elResult.style.height == "50px") {
            let flag = 50;
            this.intervalHandlerResult = setInterval(() => {
                flag--
                this.view.elResult.style.height = flag + "px";
                this.view.elResult.style.paddingTop = flag / 2 + "px";
                if (flag == 0) {
                    this.view.elResult.style.display = "none";
                    clearInterval(this.intervalHandlerResult);
                }
            }, 10);
        };
    };

    patterns({ target }) {
        let pattern = /^[1-9]{5}/;
        this.dropHints(target, pattern);
    };

};

export default Controller;