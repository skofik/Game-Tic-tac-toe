let tabelDiv = [...document.querySelectorAll(".div")];
const buttonStart = document.querySelector(".startGame button");
const imgCircle = [];
const imgCross = [];
let numberWins = 0;
let numberLoses = 0;
let numberDraws = 0;
let circleScore;
let crossScore;
let flag = false;

// Implementation

// Choice Computer
const computerChoice = function() {
  if (flag === true) {
    let key;
    let showIndex = Math.floor(Math.random() * (tabelDiv.length - 0) + 0);
    tabelDiv.splice(showIndex, 1).forEach(div => (key = div.dataset.key));
    let img = document.querySelector(`[data-key="${key}"] img`);
    img.setAttribute("src", "img/circle.jpg");
    img.setAttribute("class", "imgCircle");
    img.setAttribute("data-score", "2");
    imgCircle.push(key);
    check(imgCircle);
    addScore();
    flag = false;
  }
};

// Choice player

const choiceSquare = function(event) {
  let key = event.target.dataset.key;
  let img = document.querySelector(`[data-key="${key}"] img`);
  let clikDiv = document.querySelector(`[data-key="${key}"]`);
  if (img.getAttribute("data-score") == 0) {
    flag = true;
    imgCross.push(key);
    let index = tabelDiv.indexOf(clikDiv);
    tabelDiv.splice(index, 1);
    img.setAttribute("src", "img/cross.jpg");
    img.setAttribute("class", "imgCross");
    img.setAttribute("data-score", "1");
    setTimeout(computerChoice, 500);
    check(imgCross);
  } else {
    alert("Please choose an empty square");
  }
};

//  game conditions

function check(img) {
  let number;
  number =
    (img.includes("0") && img.includes("1") && img.includes("2")) ||
    (img.includes("0") && img.includes("3") && img.includes("6")) ||
    (img.includes("0") && img.includes("4") && img.includes("8")) ||
    (img.includes("1") && img.includes("4") && img.includes("7")) ||
    (img.includes("2") && img.includes("5") && img.includes("8")) ||
    (img.includes("2") && img.includes("4") && img.includes("6")) ||
    (img.includes("3") && img.includes("4") && img.includes("5")) ||
    (img.includes("6") && img.includes("7") && img.includes("8"));
  if (img == imgCross) {
    crossScore = number;
  } else {
    circleScore = number;
  }
}

//cleaning the board

function clear() {
  const message = document.querySelector(".message");
  let newImg = [...document.querySelectorAll("img")];
  newImg.forEach(img => {
    img.removeAttribute("src", "img/cross.jpg");
    img.removeAttribute("class", "imgCross");
    img.removeAttribute("src", "img/circle.jpg");
    img.removeAttribute("class", "imgCircle");
    img.setAttribute("data-score", "0");
  });
  const newTabel = [...document.querySelectorAll(".div")];
  tabelDiv = newTabel;
  imgCross.splice(0, imgCross.length);
  imgCircle.splice(0, imgCircle.length);
  flag = false;
  crossScore = false;
  circleScore = false;
  message.style.display = "none";
}

// Add score to page
const addScore = function() {
  const message = document.querySelector(".message");

  if (crossScore === true) {
    numberWins++;
    document.querySelector("p span.wins").textContent = ` ${numberWins}`;
    document.querySelector("p span.wins").style.color = "green";
    message.textContent = "Congratulations you won ";
    message.style.display = "block";
    message.style.color = "green";
    setTimeout(clear, 3000);
  } else if (circleScore === true) {
    numberLoses++;
    document.querySelector("p span.losses").textContent = ` ${numberLoses}`;
    document.querySelector("p span.losses").style.color = "red";
    message.textContent = "sorry, you lost";
    message.style.display = "block";
    message.style.color = "red";
    setTimeout(clear, 3000);
  } else if (tabelDiv.length <= 1) {
    numberDraws++;
    document.querySelector("p span.draws").textContent = ` ${numberDraws}`;
    document.querySelector("p span.draws").style.color = "blue";
    message.textContent = "Congratulations you drew";
    message.style.display = "block";
    message.style.color = "blue";
    setTimeout(clear, 3000);
  }
};

// Choice square

const startGame = function() {
  tabelDiv.forEach(div => {
    div.addEventListener("click", choiceSquare);
  });
};

// Start game

function showBoard() {
  document.querySelector(".startGame").style.display = "none";
  document.querySelector(".startGame").style.transform = "translateX(200%)";
  document.querySelector(".allDiv").style.opacity = "1";
  document.querySelector(".scores").style.opacity = "1";
  startGame();
}

buttonStart.addEventListener("click", showBoard);
