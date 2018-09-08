const data = require("../db/db.json");

class Model {
    constructor() {
        this.correctly = data.correctly;
        this.incorrectly = data.incorrectly;
    };

    sumUser(sum){
        this.sumUser = this.sum;
        
    };
};

export default Model;