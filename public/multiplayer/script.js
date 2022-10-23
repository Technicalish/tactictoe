eruda.init();
var socket = io("/");
socket.emit("iwannaplay", "");
socket.on("wishgranted", (roomId, toss) => {
socket.emit("joinroom", roomId);
alert(toss);
})
var rps = document.querySelector("#rps");
var blanks = document.querySelectorAll("#rps > div");
function resized() {
var size = (Math.min(document.body.clientHeight, document.body.clientWidth) * 0.8);
rps.style.height = rps.style.width = size + "px";
rps.style.padding = rps.style.gap = (size * 0.035) + "px";
}
resized();
window.addEventListener("resize", resized);
function addImage(box, xOo) {
var img = new Image();
img.src = `/${xOo}.svg`;
box.append(img);
}
function ticTacToe(current, boxes) {
socket.send([current, boxes]);
xOo = "x";
var x = document.querySelectorAll(".x");
var winner;
var winningCombinations = [
  [".one", ".two", ".three"],
  [".four", ".five", ".six"],
  [".seven", ".eight", ".nine"],
  [".one", ".four", ".seven"],
  [".two", ".five", ".eight"],
  [".three", ".six", ".nine"],
  [".one", ".five", ".nine"],
  [".three", ".five", ".seven"]
];
  winningCombinations.forEach(boxes => {
  var first = document.querySelector(boxes[0]);
  var second = document.querySelector(boxes[1]);
  var third = document.querySelector(boxes[2]);
    if (first.classList.contains("x") && second.classList.contains("x") && third.classList.contains("x")) {
    winner = "x";
    blanks.forEach(box => {
      box.removeEventListener("click", boxClicked);
    });
    alert("X won😍 and O lost😭");
    //location.reload();
    } else if (first.classList.contains("o") && second.classList.contains("o") && third.classList.contains("o")) {
    winner = "o";
    blanks.forEach(box => {
    box.removeEventListener("click", boxClicked);
    });
    alert("O won😍 and X lost😭");
    //location.reload();
    }
  });
  if (x.length === 5 && !winner) {
  winner = "none";
  alert("It's a Draw");
  //location.reload();
  }
}
function boxClicked() {
  if (!this.classList[1] && xOo === "x") {
  addImage(this, xOo);
  this.classList.add(xOo);
  xOo = "o";
  ticTacToe(this.classList, [...rps.children].map(box => box.classList[1] || ""));
  }
}
blanks.forEach(box => {
box.style.fontSize = box.clientWidth * 0.7 + "px";
box.addEventListener("click", boxClicked);
});
