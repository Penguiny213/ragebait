const meBtn = document.getElementById("meBtn");
const crushBtn = document.getElementById("crushBtn");
const container = document.querySelector(".container");
const message = document.getElementById("message");

const SAFE_DISTANCE = 180;

/* positions */
let me = { x: 80, y: 80, tx: 80, ty: 80 };
let crush = { x: 300, y: 150, tx: 300, ty: 150 };

/* clamp helper */
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

/* distance check */
function getDistance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/* push them apart if too close */
function resolveOverlap() {
  const a = { x: me.x, y: me.y };
  const b = { x: crush.x, y: crush.y };

  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < SAFE_DISTANCE && dist > 0) {
    const overlap = SAFE_DISTANCE - dist;

    const nx = dx / dist;
    const ny = dy / dist;

    me.tx += nx * overlap * 0.6;
    me.ty += ny * overlap * 0.6;

    crush.tx -= nx * overlap * 0.6;
    crush.ty -= ny * overlap * 0.6;
  }
}

/* smooth animation loop */
function animate() {
  const ease = 0.10;

  const maxX = container.clientWidth - meBtn.offsetWidth;
  const maxY = container.clientHeight - meBtn.offsetHeight;

  resolveOverlap();

  me.x += (me.tx - me.x) * ease;
  me.y += (me.ty - me.y) * ease;

  crush.x += (crush.tx - crush.x) * ease;
  crush.y += (crush.ty - crush.y) * ease;

  me.x = clamp(me.x, 0, maxX);
  me.y = clamp(me.y, 0, maxY);

  crush.x = clamp(crush.x, 0, maxX);
  crush.y = clamp(crush.y, 0, maxY);

  meBtn.style.left = me.x + "px";
  meBtn.style.top = me.y + "px";

  crushBtn.style.left = crush.x + "px";
  crushBtn.style.top = crush.y + "px";

  requestAnimationFrame(animate);
}

animate();

/* 🎯 dodge triggers */
function moveAway(button) {
  const maxX = container.clientWidth - button.offsetWidth;
  const maxY = container.clientHeight - button.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  if (button === meBtn) {
    me.tx = x;
    me.ty = y;
  } else {
    crush.tx = x;
    crush.ty = y;
  }
}

/* interactions */
meBtn.addEventListener("mouseenter", () => moveAway(meBtn));
meBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveAway(meBtn);
});
meBtn.addEventListener("click", () => moveAway(meBtn));

crushBtn.addEventListener("mouseenter", () => moveAway(crushBtn));
crushBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveAway(crushBtn);
});
crushBtn.addEventListener("click", () => moveAway(crushBtn));

/* win */
crushBtn.addEventListener("click", () => {
  message.style.display = "block";
  meBtn.style.display = "none";
  crushBtn.style.display = "none";
});
