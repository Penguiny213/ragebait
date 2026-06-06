const meBtn = document.getElementById("meBtn");
const crushBtn = document.getElementById("crushBtn");
const container = document.querySelector(".container");
const message = document.getElementById("message");

// random position generator
function randomPos(el) {
  const maxX = container.clientWidth - el.offsetWidth;
  const maxY = container.clientHeight - el.offsetHeight;

  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY
  };
}

// move any button
function moveAway(el) {
  const pos = randomPos(el);

  el.style.position = "absolute";
  el.style.left = pos.x + "px";
  el.style.top = pos.y + "px";
}

// make BOTH buttons dodge constantly
function enableDodge(el) {
  // desktop hover
  el.addEventListener("mouseenter", () => moveAway(el));

  // mobile touch
  el.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveAway(el);
  });

  // also move slightly every time user tries clicking
  el.addEventListener("click", () => moveAway(el));
}

// activate both
enableDodge(meBtn);
enableDodge(crushBtn);

// optional: gentle auto-move so they feel alive
setInterval(() => {
  moveAway(meBtn);
  moveAway(crushBtn);
}, 2000);

// crush click still works (if they somehow catch it 😭)
crushBtn.addEventListener("click", () => {
  message.style.display = "block";
  meBtn.style.display = "none";
  crushBtn.style.display = "none";

  container.classList.add("shake");
});