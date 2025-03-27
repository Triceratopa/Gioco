document.addEventListener("touchmove", function (e) {
  // Prendi le coordinate del tocco
  let touchX = e.touches[0].clientX; // Posizione X del tocco
  let touchY = e.touches[0].clientY; // Posizione Y del tocco

  player.x = touchX - player.width / 2;
  player.y = touchY - player.height / 2;
});
function drawPlayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function movePlayer() {
  player.x = touchX - player.width / 2;
  player.y = touchY - player.height / 2;
}

canvas.addEventListener("touchstart", function (e) {
  touchX = e.touches[0].clientX;
  touchY = e.touches[0].clientY;
  movePlayer();
  drawPlayer();
});

canvas.addEventListener("touchmove", function (e) {
  e.preventDefault();
  touchX = e.touches[0].clientX;
  touchY = e.touches[0].clientY;
  movePlayer();
  drawPlayer();
});

canvas.addEventListener("touchend", function () {});

drawPlayer();
