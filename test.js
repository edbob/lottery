//выучить патерн модуль и сингтон потом фабрикиу...

App = {};
App.define = function(namespace) {
  var parts = namespace.split("."),
    parent = App,
    i;
  if (parts[0] == "App") {
    parts = parts.slice(1);
  }
  for (i = 0; i < parts.length; i++) {
    if (typeof parent[parts[i]] == "undefined") {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
  return parent;
};

App.define("util.calc");
App.util.calc = (function() {
  var x, y;
  return {
    add: function() {
      return x + y;
    },
    setX: function(val) {
      x = val;
    },
    setY: function(val) {
      y = val;
    }
  }
})();

(function() {
  var calc = App.util.calc;
  calc.setX(2);
  calc.setY(3);
  document.write(calc.add());
})();