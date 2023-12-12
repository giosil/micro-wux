System.register(['./module_a.js', './module_b.js', 'module_c', './module_d.js'], function(_export, _context) {
  var moduleA, moduleB, moduleC, moduleD;
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
      },
      function (m) {
        moduleD = m.default;
      }
    ],
    execute: function () {
      console.log(_context);
      moduleA.hello();
      moduleB.hello();
      moduleC.hello();
      moduleD.hello();
    }
  };
});