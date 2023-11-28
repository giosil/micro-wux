System.register(['./module_a.js', './module_b.js', 'module_c'], function(_export, _context) {
  var moduleA, moduleB, moduleC;
  return {
    setters: [
      function (m) {
        moduleA = m;
      },
      function (m) {
        moduleB = m;
      },
      function (m) {
        moduleC = m;
      }
    ],
    execute: function () {
      console.log(_context);
      moduleA.hello();
      moduleB.hello();
      moduleC.hello();
    }
  };
});