import Model from '../src/model';
import Controller from '../src/controller';
import View from '../src/view';

const model = new Model();
const controller = new Controller(model);
const view = new View(model, controller);

controller.initialize(model, view);