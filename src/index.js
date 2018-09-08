import Model from '../src/models/model';
import Controller from '../src/controllers/controller';
import View from '../src/views/view';

const model = new Model();
const controller = new Controller(model);
const view = new View(model, controller);

controller.initialize(model, view);