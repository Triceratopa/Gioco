document.getElementById("middleBtn").addEventListener("click", () => {
  const overlay = document.getElementById("overlay");
  overlay.style.opacity = 1;

  setTimeout(() => {
    window.location.href = "map.html";
  }, 1000);
});
