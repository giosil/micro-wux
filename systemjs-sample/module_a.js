System.register([], function(_export, _context) {
  return {
    execute: function() {
      _export({
        "hello": () => { 
          let p = document.createElement("p");
          p.innerText = "Hello from module A!";
          document.getElementById("result").append(p);
        }
      });
    }
  }
});