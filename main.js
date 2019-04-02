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
let tabelEasy = [true, true, false, true, false, false, false, false];
let tabelMedium = [true, true, true, true, true, true, false, false];
let tabelHard = [true, true, true, true, true, true, false, true];
let tabelInvincible = [true, true, true, true, true, true, true, true];
let level = "Easy"


// Implementation


// difficult level of the game

function choiceLevel() {
  const spanElement = [...document.querySelectorAll(".level span")]
  spanElement.forEach(span => {
    span.addEventListener("click", (e) => {
      const changeColorSpan = () => spanElement.forEach(span => span.setAttribute("style", "color: black"))
      span.setAttribute("style", "color: black")
      if (e.target.textContent === "Easy") {
        changeColorSpan()
        e.target.setAttribute("style", "color:green; text-decoration-line:underline")
      } else if (e.target.textContent === "Medium") {
        changeColorSpan()
        e.target.setAttribute("style", "color:blue; text-decoration-line:underline")
      } else if (e.target.textContent === "Hard") {
        changeColorSpan()
        e.target.setAttribute("style", "color:red; text-decoration-line:underline")
      } else if (e.target.textContent === "Invincible") {
        changeColorSpan()
        e.target.setAttribute("style", "color:purple; text-decoration-line:underline")
      }
      return level = e.target.textContent
    }
    )
  })
}

const difficultLevel = () => {
  let tabelBoolean;
  if (level === "Easy") {
    let index = Math.floor(Math.random() * (tabelEasy.length - 0) + 0);
    tabelBoolean = tabelEasy
    tabelEasy.splice(index, 1)
  } else if (level === "Medium") {
    let index = Math.floor(Math.random() * (tabelMedium.length - 0) + 0);
    tabelBoolean = tabelMedium
    tabelMedium.splice(index, 1)

  } else if (level === "Hard") {
    let index = Math.floor(Math.random() * (tabelHard.length - 0) + 0);
    tabelBoolean = tabelHard
    tabelHard.splice(index, 1)
  }
  else if (level === "Invincible") {
    let index = Math.floor(Math.random() * (tabelInvincible.length - 0) + 0);
    tabelBoolean = tabelInvincible
    tabelInvincible.splice(index, 1)
  }
  let index = Math.floor(Math.random() * (tabelBoolean.length - 0) + 0);
  console.log(tabelBoolean)
  return tabelBoolean[index]
}

// function responsible for blocking , winning and checking an empty square 
const aiBlock = (key, squareKey) => {
  if (key === 1) {
    let index = tabelDiv.indexOf(
      document.querySelector(`[data-key="${squareKey}"]`)
    );
    tabelDiv.splice(index, 1);
    imgCircle.push(squareKey);
    return squareKey;
  } else if (typeof squareKey === "string" && key === 0) {
    if (document.querySelector(`[data-key="${squareKey}"] img `).getAttribute("data-score") === "0") {
      return true;
    } else {
      return false;
    }
  } else if (squareKey === "w") {
    return imgCircle.includes(key);
  } else {
    return imgCross.includes(key);
  }
};

// Choice Computer
const computerChoice = function () {
  if (flag === true) {
    let key;
    if (imgCross.length === 5) {
      addScore()
    } else {
      // Intelligence AI

      // conditions winning 
      if (aiBlock(0, "0") && ((aiBlock("1", "w") && aiBlock("2", "w")) || (aiBlock("4", "w") && aiBlock("8", "w")) || (aiBlock("3", "w") && aiBlock("6", "w")))
      ) {
        key = aiBlock(1, "0");
      } else if (aiBlock(0, "1") && ((aiBlock("0", "w") && aiBlock("2", "w")) || (aiBlock("4", "w") && aiBlock("7", "w")))
      ) {
        key = aiBlock(1, "1");
      } else if (aiBlock(0, "2") && ((aiBlock("0", "w") && aiBlock("1", "w")) || (aiBlock("5", "w") && aiBlock("8", "w")) || (aiBlock("4", "w") && aiBlock("6", "w")))
      ) {
        key = aiBlock(1, "2");
      } else if (aiBlock(0, "3") && ((aiBlock("0", "w") && aiBlock("6", "w")) || (aiBlock("4", "w") && aiBlock("5", "w")))
      ) {
        key = aiBlock(1, "3");
      } else if (aiBlock(0, "5") && ((aiBlock("2", "w") && aiBlock("8", "w")) || (aiBlock("3", "w") && aiBlock("4", "w")))
      ) {
        key = aiBlock(1, "5");
      } else if (aiBlock(0, "6") && ((aiBlock("0", "w") && aiBlock("3", "w")) || (aiBlock("2", "w") && aiBlock("4", "w")) || (aiBlock("7", "w") && aiBlock("8", "w")))
      ) {
        key = aiBlock(1, "6");
      } else if (aiBlock(0, "7") && ((aiBlock("1", "w") && aiBlock("4", "w")) || (aiBlock("6", "w") && aiBlock("8", "w")))
      ) {
        key = aiBlock(1, "7");
      } else if (aiBlock(0, "8") && ((aiBlock("2", "w") && aiBlock("5", "w")) || (aiBlock("0", "w") && aiBlock("4", "w")) || (aiBlock("6", "w") && aiBlock("7", "w")))
      ) {
        key = aiBlock(1, "8");
      } else if (aiBlock(0, "4") && ((aiBlock("1", "w") && aiBlock("7", "w")) || (aiBlock("0", "w") && aiBlock("8", "w")) || (aiBlock("6", "w") && aiBlock("2", "w")) || (aiBlock("3", "w") && aiBlock("5", "w")))
      ) {
        key = aiBlock(1, "4");
      }

      // conditions blocking
      else if ((aiBlock(0, "0") && difficultLevel()) && (((aiBlock("1") && aiBlock("2")) || (aiBlock("4") && aiBlock("8")) || (aiBlock("3") && aiBlock("6"))) || (aiBlock("4")))
      ) {
        key = aiBlock(1, "0");
      } else if ((aiBlock(0, "1") && difficultLevel()) && (((aiBlock("0") && aiBlock("2")) || (aiBlock("4") && aiBlock("7"))) || ((aiBlock("0") && aiBlock("8")) || (aiBlock("2") && aiBlock("6"))))
      ) {
        key = aiBlock(1, "1");
      } else if ((aiBlock(0, "2") && difficultLevel()) && ((aiBlock("0") && aiBlock("1")) || (aiBlock("5") && aiBlock("8")) || (aiBlock("4") && aiBlock("6")))
      ) {
        key = aiBlock(1, "2");
      } else if ((aiBlock(0, "3") && difficultLevel()) && ((aiBlock("0") && aiBlock("6")) || (aiBlock("4") && aiBlock("5")))
      ) {
        key = aiBlock(1, "3");
      } else if ((aiBlock(0, "5") && difficultLevel()) && ((aiBlock("2") && aiBlock("8")) || (aiBlock("3") && aiBlock("4")))
      ) {
        key = aiBlock(1, "5");
      } else if ((aiBlock(0, "6") && difficultLevel()) && ((aiBlock("0") && aiBlock("3")) || (aiBlock("2") && aiBlock("4")) || (aiBlock("7") && aiBlock("8")))
      ) {
        key = aiBlock(1, "6");
      } else if ((aiBlock(0, "7") && difficultLevel()) && ((aiBlock("1") && aiBlock("4")) || (aiBlock("6") && aiBlock("8")) || (aiBlock("0") && aiBlock("8")))
      ) {
        key = aiBlock(1, "7");
      } else if ((aiBlock(0, "8") && difficultLevel()) && ((aiBlock("2") && aiBlock("5")) || (aiBlock("0") && aiBlock("4")) || (aiBlock("6") && aiBlock("7")))
      ) {
        key = aiBlock(1, "8");
      }
      else if (aiBlock(0, "4") && ((aiBlock("1") && aiBlock("7")) || (aiBlock("0") && aiBlock("8")) || (aiBlock("6") && aiBlock("2")) || (aiBlock("3") && aiBlock("5")) || (aiBlock("0") || aiBlock("1") || aiBlock("2") || aiBlock("6") || aiBlock("7") || aiBlock("8") || aiBlock("3") || aiBlock("5")))
      ) {
        key = aiBlock(1, "4");
      } else {
        let index = Math.floor(Math.random() * (tabelDiv.length - 0) + 0);
        let deleteDiv = tabelDiv.splice(index, 1);
        key = deleteDiv[0].dataset.key
        imgCircle.push(`${key}`);
      }

      let img = document.querySelector(`[data-key="${key}"] img`);
      img.setAttribute("src", "img/circle.jpg");
      img.setAttribute("class", "imgCircle");
      img.setAttribute("data-score", "2");
      check(imgCircle);
      addScore();
      flag = false;
    }
  }
};

// Choice player

const choiceSquare = function (event) {
  let key = event.target.dataset.key;
  let img = document.querySelector(`[data-key="${key}"] img`);
  let clikDiv = document.querySelector(`[data-key="${key}"]`);

  tabelEasy = [true, true, false, false, false, false, false, false];
  tabelMedium = [true, true, true, true, true, false, false, false];
  tabelHard = [true, true, true, true, true, true, false, true];
  tabelInvincible = [true, true, true, true, true, true, true, true];

  if ((img !== null && img.getAttribute("data-score")) === "0") {
    flag = true;
    imgCross.push(key);
    let index = tabelDiv.indexOf(clikDiv);
    tabelDiv.splice(index, 1);
    img.setAttribute("src", "img/cross.jpg");
    img.setAttribute("class", "imgCross");
    img.setAttribute("data-score", "1");
    check(imgCross);
    computerChoice();
  } else if (img === null) {
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
const addScore = function () {
  const message = document.querySelector(".message");

  if (crossScore === true) {
    numberWins++;
    document.querySelector("p span.wins").textContent = ` ${numberWins}`;
    document.querySelector("p span.wins").style.color = "green";
    message.innerHTML = `<span> "Congratulations you won " </span> `;
    message.style.display = "block";
    message.style.color = "green";
    setTimeout(clear, 3000);
  } else if (circleScore === true) {
    numberLoses++;
    document.querySelector("p span.losses").textContent = ` ${numberLoses}`;
    document.querySelector("p span.losses").style.color = "red";
    message.innerHTML = `<span>"sorry, you lost"</span>`;
    message.style.display = "block";
    message.style.color = "red";
    setTimeout(clear, 3000);
  } else if (imgCross.length === 5) {
    numberDraws++;
    document.querySelector("p span.draws").textContent = ` ${numberDraws}`;
    document.querySelector("p span.draws").style.color = "blue";
    message.innerHTML = `<span>"Congratulations you drew"</span>`;
    message.style.display = "block";
    message.style.color = "blue";
    setTimeout(clear, 3000);
  }
};

// Choice square

const startGame = function () {
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

choiceLevel()
buttonStart.addEventListener("click", showBoard);
