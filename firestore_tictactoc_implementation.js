const DOMSelectors = {
  newGameButton: document.querySelector(".new-game-btn"),
  squareOne: document.getElementById("1"),
  squareTwo: document.getElementById("2"),
  squareThree: document.getElementById("3"),
  squareFour: document.getElementById("4"),
  squareFive: document.getElementById("5"),
  squareSix: document.getElementById("6"),
  squareSeven: document.getElementById("7"),
  squareEight: document.getElementById("8"),
  squareNine: document.getElementById("9"),
};

const database = firebase.firestore();

async function fetch() {
  const board = database.collection("boards").doc("board1");
  const loadedboard = await board.get();
  data = loadedboard.data();
  console.log(data);
  //   console.log(data["cell02"]);
  cells = Object.keys(data).map(function (key) {
    return data[key];
  });
  console.log(cells);
  cells.forEach(function (cell, index) {
    document.getElementById(`${index + 1}`).innerText = cell;
  });
}

fetch();

function main() {
  player = "X";
  DOMSelectors.newGameButton.addEventListener("click", function () {
    database.collection("boards").doc("board1").update({
      cell01: "",
      cell02: "",
      cell03: "",
      cell04: "",
      cell05: "",
      cell06: "",
      cell07: "",
      cell08: "",
      cell09: "",
    });
    player = "X";
    document.querySelectorAll(".game-square").forEach(function (square) {
      square.innerText = "";
    });
  });
  document.querySelectorAll(".game-square").forEach(function (square) {
    square.addEventListener("click", function () {
      console.log(`${square.id} was pressed`);
      squareClick(square);
    });
  });
}

function squareClick(square) {
  console.log(player);
  if (square.innextText === undefined || square.innextText === "") {
    square.innerText = player;
    updatedb(square);
    newPlayer(player);
  }
}

function newPlayer(currentPlayer) {
  if (currentPlayer === "X") {
    player = "O";
  } else if (currentPlayer === "O") {
    player = "X";
  }
}

async function updatedb(square) {
  target = {};
  target[`cell0${square.id}`] = player;
  const res = await database.collection("boards").doc("board1").update(target);
}

main();
