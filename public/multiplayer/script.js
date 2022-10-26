var xOo = "x";
var toss = "o";
var firstMove = true;
eruda.init();
var rps = document.querySelector("#rps");
var blanks = document.querySelectorAll("#rps > div");
function resized() {
var size = (Math.min(document.body.clientHeight, document.body.clientWidth) * 0.8);
rps.style.height = rps.style.width = size + "px";
rps.style.padding = rps.style.gap = (size * 0.035) + "px";
}
resized();
window.addEventListener("resize", resized);
function changexOo() {
  if (xOo === "x") {
  xOo = "o";
  } else if (xOo === "o") {
  xOo = "x";
  }
}
function addImage(box, xOo) {
var img = new Image();
img.src = `/${xOo}.svg`;
box.append(img);
}
function ticTacToe() {
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
var socket = io("/");
socket.on("userjoined", (id, random) => {
var phrase = "lost";
  if (random === "x") {
  phrase = "won";
  }
  if (id === socket.id && random === "x") {
  toss = "x";
  }
  if (id !== socket.id && random === "o") {
  toss = "x";
  }
console.log(xOo, toss, firstMove)
console.log(`I joined(${id}) and I ${phrase} the toss(${random}):::${socket.id}`)
})
socket.on("userleft", (id) => {
  blanks.forEach(box => {
  box.className = box.innerHTML = "";
  });
console.log(`I joined(${id})`);
})
socket.on("boxclicked", (number, Toss) => {
console.log(number, Toss);
firstMove = false;
changexOo();
var element = document.querySelector(`.${number}`);
addImage(element, Toss);
element.classList.add(Toss);
ticTacToe()
})
function boxClicked() {
  if (firstMove && xOo === toss) {
  addImage(this, toss);
  this.classList.add(toss);
  socket.emit("boxclicked", this.classList[0], this.classList[1]);
  changexOo();
  }
  if (!firstMove && !this.classList[1] && xOo === toss) {
  addImage(this, toss);
  this.classList.add(toss);
  socket.emit("boxclicked", this.classList[0], this.classList[1]);
  changexOo();
  }
ticTacToe();
}
blanks.forEach(box => {
box.style.fontSize = box.clientWidth * 0.7 + "px";
box.addEventListener("click", boxClicked);
});
