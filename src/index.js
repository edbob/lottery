import Model from './model';
import Controller from './controller';
import View from './view';

const model = new Model();
const controller = new Controller(model);
const view = new View(model, controller);

controller.initialize(model, view);