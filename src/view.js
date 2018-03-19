class View {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;

        this.onLoad();

    };

    onLoad() {
        if (window.addEventListener) {
            window.addEventListener("load", this.init.bind(this), false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", this.init.bind(this));
        };
    };

    init() {
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
    };

    clickStart(event) {
        let data = {
            variant: parseInt(this.fresult.value),
        };

        this.controller.start(data);
    };

    lotStop() {

    };

    getElement(selector) {
        return document.querySelector(selector);
    };

    lotMaxlength() {

    };

    onAction() {
        let pattern = /^[1-9]{5}/;

        this.controller.validate(this, pattern);
    };

    lotReset() {

    };

};

export default View;