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

        if (this.fstart.addEventListener) this.fstart.addEventListener("click", this.start.bind(this), false);
        if (this.fstart.attachEvent) this.fstart.attachEvent("onclick", this.start);

        if (this.fstop.addEventListener) this.fstop.addEventListener("click", this.stop.bind(this), false);
        if (this.fstop.attachEvent) this.fstop.attachEvent("onclick", this.stop);

        if (this.fresult.addEventListener) this.fresult.addEventListener("input", this.validAction.bind(this), false);
        if (this.fresult.attachEvent) this.fresult.attachEvent("input", this.validAction);

        if (this.freset.addEventListener) this.freset.addEventListener("click", this.lotReset.bind(this), false);
        if (this.freset.attachEvent) this.freset.attachEvent("onclick", this.lotReset);

        this.getID = this.controller.memoize(this.getElement);
        this.ellot = this.getID("#set-lot");
        this.elResult = this.getID("#mresult");
        this.mres = this.getID("#my-result");
        this.pres = this.getID("#pc-result");
        this.fspan = this.getID("#helpers");
        this.mspan = this.getID("#mresult");
    };

   start(event) {
        let data = {
            variant: parseInt(this.fresult.value),
        };

        this.controller.start(data);
    };

    stop(event) {
        this.controller.stop();
    };

    getElement(selector) {
        return document.querySelector(selector);
    };

    validAction(event) {
        let data = {
            target: event.target,
        }   
        this.controller.Maxlength(data);
        this.controller.patterns(data);
    };

    lotReset() {
        this.controller.reset();
    };

};

export default View;