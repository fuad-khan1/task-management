const isAuthenticated = localStorage.getItem("authenticated") === "true";

if (!isAuthenticated) {
  window.location.href = "index.html";
}
document.getElementById("logoutLink").addEventListener("click", () => {
  localStorage.setItem("authenticated", "false");
});
