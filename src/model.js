const data = require("../db/db.json");
class Model {
    constructor() {
        this.correctly = data.correctly,
        this.incorrectly = data.incorrectly
    };
};

export default Model;