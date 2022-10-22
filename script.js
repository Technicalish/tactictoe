var rps = document.querySelector("#rps");
var blanks = document.querySelectorAll("#rps > div");
rps.style.top = (document.body.clientHeight - rps.clientHeight) / 2 + "px";
rps.style.left = (document.body.clientWidth - rps.clientWidth) / 2 + "px";
var xOo = "x";
function addImage(box, xOo) {
var img = new Image();
img.src = `/${xOo}.svg`;
box.append(img);
}
function ticTacToe() {
var x = document.querySelectorAll(".x");
  if (x.length === 1) {
  var five = document.querySelector(".five");
    if (x[0] !== five) {
    addImage(five, xOo);
    five.classList.add(xOo);
    } else {
    var corners = [".one", ".three", ".seven", ".nine"];
    function randomCorner() {
    return document.querySelector(corners[Math.floor(Math.random() * corners.length)]);
    }
    var selectedCorner = randomCorner();
    addImage(selectedCorner, xOo);
    selectedCorner.classList.add(xOo);
    }
  } else if (x.length < 5) {
  var metrics = [
    ".one", ".two", ".three", ".four", ".five", ".six", ".seven", ".eight", ".nine"
  ];
  var middle = {
    "1": [".two", ".five", ".eight"],
    "3": [".four", ".five", ".six"],
    "2": [".five"],
    "4": [".five"]
  }
  var row = [
    [".one", ".two"], [".two", ".three"], [".four", ".five"], [".five", ".six"],[".seven", ".eight"], [".eight", ".nine"]
  ];
  var column = [
    [".one", ".four"], [".four", ".seven"], [".two", ".five"], [".five", ".eight"], [".three", ".six"], [".six", ".nine"]
  ];
  var forwardSlash = [
    [".three", ".five"], [".five", ".seven"]
  ];
  var backwardSlash = [
    [".one", ".five"], [".five", ".nine"]
  ];
//Magic
    if (xOo === "o") {
      [row, column, forwardSlash, backwardSlash].forEach(pattern => {
        var occupiedPatternsNumber = pattern.map(boxes => {
        var first = document.querySelector(boxes[0]);
        var second = document.querySelector(boxes[1]);
          if (first.classList.contains("o") && second.classList.contains("o")) {
          var abs = Math.abs(metrics.indexOf(boxes[0]) - metrics.indexOf(boxes[1]));
            if (middle[abs.toString()].includes(boxes[1])) {
            return metrics.indexOf(boxes[1]) + abs;
            } else {
            var number = metrics.indexOf(boxes[0]) - abs;
            return number.toString();
            }
          }
        });
        occupiedPatternsNumber = occupiedPatternsNumber.filter(n => n);
        occupiedPatternsString = occupiedPatternsNumber.map(n => metrics[n]);
        occupiedPatternsString.forEach(string => {
        var box = document.querySelector(string);
          if (!box.classList[1] && xOo === "o") {
          addImage(box, xOo);
          box.classList.add(xOo);
          xOo = "x";
          }
        });
      });
    }
    if (xOo === "o") {
    var fillUps = [
      [".one", ".three"], [".three", ".nine"], [".seven", ".nine"], [".one", ".seven"], [".one", ".nine"], [".three", ".seven"]
    ];
    var occupiedFillUpsNumber = fillUps.map(boxes => {
      var first = document.querySelector(boxes[0]);
      var second = document.querySelector(boxes[1]);
        if (first.classList.contains("o") && second.classList.contains("o")) {
        var abs = Math.abs(metrics.indexOf(boxes[0]) - metrics.indexOf(boxes[1]));
        return (metrics.indexOf(boxes[1]) - (abs/2));
        }
      });
    occupiedFillUpsNumber = occupiedFillUpsNumber.filter(n => n);
    var occupiedFillUpsString = occupiedFillUpsNumber.map(x => metrics[x]);
      occupiedFillUpsString.forEach((string) => {
      var box = document.querySelector(string);
        if (!box.classList[1] && xOo === "o") {
        addImage(box, xOo);
        box.classList.add(xOo);
        xOo = "x";
        }
      });
    }
    if (xOo === "o") {
    var arrows = [
      [".one", ".five"], [".three", ".five"], [".seven", ".five"], [".nine", ".five"]
    ];
    var occupiedArrowsString = arrows.map(boxes => {
      var first = document.querySelector(boxes[0]);
      var second = document.querySelector(boxes[1]);
        if (first.classList.contains("o") && second.classList.contains("o")) {
          if (boxes.includes(".one")) {
          return ".nine"
          }
          if (boxes.includes(".three")) {
          return ".seven"
          }
          if (boxes.includes(".seven")) {
          return ".three"
          }
          if (boxes.includes(".nine")) {
          return ".one"
          }
        }
      });
    occupiedArrowsString = occupiedArrowsString.filter(string => string);
      occupiedArrowsString.forEach((string) => {
      var box = document.querySelector(string);
        if (!box.classList[1] && xOo === "o") {
        addImage(box, xOo);
        box.classList.add(xOo);
        xOo = "x";
        }
      });
    }
//Magic
    [row, column, forwardSlash, backwardSlash].forEach(pattern => {
      var occupiedPatternsNumber = pattern.map(boxes => {
      var first = document.querySelector(boxes[0]);
      var second = document.querySelector(boxes[1]);
        if (first.classList.contains("x") && second.classList.contains("x")) {
        var abs = Math.abs(metrics.indexOf(boxes[0]) - metrics.indexOf(boxes[1]));
          if (middle[abs.toString()].includes(boxes[1])) {
          return metrics.indexOf(boxes[1]) + abs;
          } else {
          var number = metrics.indexOf(boxes[0]) - abs;
          return number.toString();
          }
        }
      });
      occupiedPatternsNumber = occupiedPatternsNumber.filter(n => n);
      occupiedPatternsString = occupiedPatternsNumber.map(n => metrics[n]);
      occupiedPatternsString.forEach(string => {
      var box = document.querySelector(string);
        if (!box.classList[1] && xOo === "o") {
        addImage(box, xOo);
        box.classList.add(xOo);
        xOo = "x";
        }
      });
    });
    if (xOo === "o") {
    var fillUps = [
      [".one", ".three"], [".three", ".nine"], [".seven", ".nine"], [".one", ".seven"], [".one", ".nine"], [".three", ".seven"]
    ];
    var occupiedFillUpsNumber = fillUps.map(boxes => {
      var first = document.querySelector(boxes[0]);
      var second = document.querySelector(boxes[1]);
        if (first.classList.contains("x") && second.classList.contains("x")) {
        var abs = Math.abs(metrics.indexOf(boxes[0]) - metrics.indexOf(boxes[1]));
        return (metrics.indexOf(boxes[1]) - (abs/2));
        }
      });
    occupiedFillUpsNumber = occupiedFillUpsNumber.filter(n => n);
    var occupiedFillUpsString = occupiedFillUpsNumber.map(x => metrics[x]);
      occupiedFillUpsString.forEach((string) => {
      var box = document.querySelector(string);
        if (!box.classList[1] && xOo === "o") {
        addImage(box, xOo);
        box.classList.add(xOo);
        xOo = "x";
        }
      });
    }
    if (xOo === "o") {
    var adjacentSides = [
      [".two", ".four"], [".two", ".six"], [".eight", ".four"], [".eight", ".six"]
    ];
    var occupiedAdjacentSidesNumber = adjacentSides.map(boxes => {
      var first = document.querySelector(boxes[0]);
      var second = document.querySelector(boxes[1]);
        if (first.classList.contains("x") && second.classList.contains("x")) {
          if (boxes.includes(".six")) {
          return metrics.indexOf(boxes[0]) + 1;
          } else {
          return metrics.indexOf(boxes[0]) - 1;
          }
        }
      });
    occupiedAdjacentSidesNumber = occupiedAdjacentSidesNumber.filter(n => n + 1);
    var occupiedAdjacentSidesString = occupiedAdjacentSidesNumber.map(x => metrics[x]);
      occupiedAdjacentSidesString.forEach((string) => {
      var box = document.querySelector(string);
        if (!box.classList[1] && xOo === "o") {
        addImage(box, xOo);
        box.classList.add(xOo);
        xOo = "x";
        }
      });
    }
    if (xOo === "o") {
    var oppositeCorners = [
      [".one", ".nine"], [".three", ".seven"]
    ];
    var occupiedOppositeCornersNumber = oppositeCorners.map(boxes => {
      var first = document.querySelector(boxes[0]);
      var second = document.querySelector(boxes[1]);
        if (first.classList.contains("x") && second.classList.contains("x")) {
        var sides = [
          ".two", ".four", ".six", ".eight"
        ];
        function random() {
        return sides[Math.floor(Math.random() * sides.length)];
        }
        var box = document.querySelector(random());
          while (box.classList[1]) {
          box = document.querySelector(random());
          }
        addImage(box, xOo);
        box.classList.add(xOo);
        xOo = "x";
        }
      });
    }
    if (xOo === "o") {
    var arrows = [
      [".one", ".five"], [".three", ".five"], [".seven", ".five"], [".nine", ".five"]
    ];
    var occupiedArrowsString = arrows.map(boxes => {
      var first = document.querySelector(boxes[0]);
      var second = document.querySelector(boxes[1]);
        if (first.classList.contains("x") && second.classList.contains("x")) {
          if (boxes.includes(".one") || boxes.includes(".nine")) {
          return [".three", ".seven"][Math.floor(Math.random() * 2)];
          } else {
          return [".one", ".nine"][Math.floor(Math.random() * 2)];
          }
        }
      });
    occupiedArrowsString = occupiedArrowsString.filter(string => string);
      occupiedArrowsString.forEach((string) => {
      var box = document.querySelector(string);
        if (!box.classList[1] && xOo === "o") {
        addImage(box, xOo);
        box.classList.add(xOo);
        xOo = "x";
        }
      });
    }
    if (xOo === "o") {
    var oppositeSides = [
      [".two", ".eight"], [".four", ".six"]
    ];
    var occupiedOppositeSidesNumber = oppositeSides.map(boxes => {
      var first = document.querySelector(boxes[0]);
      var second = document.querySelector(boxes[1]);
        if (first.classList.contains("x") && second.classList.contains("x")) {
        var corners = [
          ".one", ".three", ".seven", ".nine"
        ];
        function random() {
        return corners[Math.floor(Math.random() * corners.length)];
        }
        var box = document.querySelector(random());
          while (box.classList[1]) {
          box = document.querySelector(random());
          }
        addImage(box, xOo);
        box.classList.add(xOo);
        xOo = "x";
        }
      });
    }
    if (xOo === "o" && x.length === 2) {
    var splitz = [
      [".two", ".seven"], [".two", ".nine"],
      [".eight", ".one"], [".eight", ".three"],
      [".four", ".three"], [".four", ".nine"],
      [".six", ".one"], [".six", ".seven"]
    ];
    var occupiedSplitzNumber = splitz.filter(boxes => {
      var first = document.querySelector(boxes[0]);
      var second = document.querySelector(boxes[1]);
        if (first.classList.contains("x") && second.classList.contains("x")) {
        var XYAxes = [
          [".four", ".five", ".six"],
          [".two", ".five", ".eight"]
        ];
        var unoccupied = XYAxes.filter(boxes => {
          return boxes.every(box => {
            box = document.querySelector(box);
            return !box.classList.contains("x") || box.classList.contains("o") || !box.classList[1];
            });
          }).flat(Infinity);
        function random() {
        return unoccupied[Math.floor(Math.random() * unoccupied.length)];
        }
        var box = document.querySelector(random());
          while (box.classList[1]) {
          box = document.querySelector(random());
          }
        addImage(box, xOo);
        box.classList.add(xOo);
        xOo = "x";
        }
      })
    }
    if (xOo === "o") {
    function random() {
    return metrics[Math.floor(Math.random() * metrics.length)];
    }
    var box = document.querySelector(random());
      while (box.classList[1]) {
      box = document.querySelector(random());
      }
    addImage(box, xOo);
    box.classList.add(xOo);
    xOo = "x";
    }
  }
xOo = "x";
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
  ticTacToe();
  }
}
blanks.forEach(box => {
box.style.fontSize = box.clientWidth * 0.7 + "px";
box.addEventListener("click", boxClicked);
});
