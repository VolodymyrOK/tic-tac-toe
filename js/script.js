const content = document.querySelector(".content");
let player = "X";
const hystoryX = [];
const hystoryO = [];
const combination = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function createMarkup() {
  let markup = "";
  for (let i = 1; i <= 9; i += 1) {
    markup += `<div class="item" data-id='${i}'></div>`;
  }
  content.innerHTML = markup;
  // content.insertAdjacentHTML("beforeend", markup);
}
createMarkup();

content.addEventListener("click", handlerClick);

function handlerClick(evt) {
  if (evt.target === evt.currentTarget || evt.target.textContent) return;
  const id = Number(evt.target.dataset.id);
  let isWinner = false;
  if (player === "X") {
    hystoryX.push(id);

    isWinner = hystoryX.length >= 3 ? checkWinner(hystoryX) : false;
  } else {
    hystoryO.push(id);

    isWinner = hystoryO.length >= 3 ? checkWinner(hystoryO) : false;
  }
  if (isWinner) {
    const instance = basicLightbox.create(`
    <div class='box'>
        <h1>Player - ${player} is winner</h1>
    </div>	
`);
    instance.show();
    resetGame();
    return;
  }
  evt.target.textContent = player;
  player = player === "X" ? "O" : "X";
}

function checkWinner(arr) {
  return combination.some((item) => item.every((id) => arr.includes(id)));
}

function resetGame() {
  createMarkup();
  player = "X";
  hystoryX.splice(0);
  hystoryO.splice(0);
}
