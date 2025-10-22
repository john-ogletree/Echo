const body = document.querySelector("body"),
  sidebar = document.querySelector(".sidebar"),
  toggle = document.querySelector(".toggle"),
  searchBtn = document.querySelector(".search-bar");



toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    toggle.classList.remove("bx-chevron-left");
    toggle.classList.add("bx-chevron-right");
  } else {
    toggle.classList.remove("bx-chevron-right");
    toggle.classList.add("bx-chevron-left");
  }
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});