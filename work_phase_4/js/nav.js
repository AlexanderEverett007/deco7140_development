// Toggle menu 展开导航
const toggleBtn = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

// Highlight active link 当前页面高亮
const currentPage = location.pathname.split("/").pop();
const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});
