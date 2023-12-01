const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },

  {
    name: "rock",
    beats: "scissors",
  },
];
//dom tree getters

const choiceButtons = document.querySelectorAll(".choice_btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results_result");
const resultWinner = document.querySelector(".results_winner");
const resultText = document.querySelector(".results_text");
const resultText1 = document.querySelector(".results_text1");
const buttonText = document.querySelector(".play_again");
const nextBtn = document.querySelector(".nextbtn");
const pcscore = document.querySelector(".score-number1");
const userscore = document.querySelector(".score-number2");
const ruleBtn = document.querySelector(".rulesbtn");
const rulesCard = document.querySelector(".rulescard");
const cross = document.querySelector(".cross");
const scoreContainer = document.querySelector(".container");
const congratsPage = document.querySelector(".congratspage");
const playagainBtn2 = document.querySelector(".playbtn2");
const gameContainer = document.querySelector(".game");
let i = 0; //user dummy varble
let j = 0; //pc dummy
//adding rules wrong functionalty
cross.addEventListener("click", () => {
  rulesCard.classList.add("hidden");
  cross.classList.add("hidden");
});
//rules button shower
ruleBtn.addEventListener("click", () => {
  rulesCard.classList.remove("hidden");
  cross.classList.remove("hidden");
});

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const pcchoice = pcChoose();
  displayResults([choice, pcchoice]);
  displayWinner([choice, pcchoice]);
}
function pcChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}
//showing results
function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
      <div class="choice  ${results[idx].name}">
      <img src="images/${results[idx].name}.png" alt=" ${results[idx].name}" />
      </div>`;
    }, idx * 500);
  });
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}
//showing winneer of round
function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const pcWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerHTML = " you win ";
      resultText1.innerHTML = " against pc";
      nextBtn.classList.remove("hidden");

      resultDivs[0].classList.add("green-background");
      keepuserScore(1);
    } else if (pcWins) {
      resultText.innerHTML = "you lost";
      resultText1.innerHTML = " against pc";

      resultDivs[1].classList.add("green-background"); //winner anime
      keeppcScore(1);
    } else {
      resultText.innerHTML = "tie up";
      buttonText.innerHTML = "replay";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show_winner");
  }, 1000); //1000 for delay
}
function isWinner(results) {
  return results[0].beats === results[1].name;
} //main logic

//maainatining scorree
function keepuserScore(point) {
  i += point;
  userscore.innerText = i;
}
function keeppcScore(point) {
  j += point;
  pcscore.innerText = j;
}
//buttontext for playagainbtn this is logic for playagain
buttonText.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
  nextBtn.classList.add("hidden");
  resultDivs[1].classList.remove("green-background");
  resultDivs[0].classList.remove("green-background");
  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });
  resultText.innerText = "";
  resultText1.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show_winner");
});
//when user clicks next hurrah page must be shown  below will be logic
nextBtn.addEventListener("click", () => {
  scoreContainer.classList.add("hidden");
  resultsDiv.classList.add("hidden");
  congratsPage.classList.remove("hidden");
});
//when user clicks play again btn on congrats oage the game page must be shown
playagainBtn2.addEventListener("click", () => {
  scoreContainer.classList.remove("hidden");
  gameContainer.classList.remove("hidden");
  congratsPage.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultsDiv.classList.add("hidden");
  resultWinner.classList.remove("hidden");
});
