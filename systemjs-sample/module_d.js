var d_msg = "Hello from module D!";

function hello() {
  let p = document.createElement("p");
  p.innerText = d_msg;
  document.getElementById("result").append(p);
}

/**
 * The last expression will be exported as "default".
 * 
 * setters: [
 * ...
 *  function (m) {
 *    moduleD = m.default; // -> { "hello": hello }
 *  }
 * ...
 * ]
 */

var _export = { "hello": hello };
