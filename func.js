const toggleBtn = document.querySelector(".OpenNavBarBtn");
const mobileNav = document.querySelector(".MobileNav");
const navBtns = document.querySelectorAll(".NavBtn");
const heroPages = document.querySelectorAll(".Hero");
const sliderBtns = document.querySelectorAll(".DesktopSliderBtns, .MobileSliderBtns button");
const projects = document.querySelectorAll(".Projects-Container");
const contactForm = document.querySelector(".Contact-Form");

let currentIndex = 0;

/* MANAGES THE CURRENTLY ACTIVE SCREENS */
function pageDisplayManager(id) {
    heroPages.forEach(Hero => Hero.classList.remove("Active"));
    const target = document.getElementById(id);
    target.classList.add("Active");
}

/* MANAGES THE PROJECT DISPLAY SLIDER */
function projectDisplayManager() {
    projects.forEach(project => project.classList.remove("Active"));
    projects[currentIndex].classList.add("Active");
}

/* MANAGES THE 'OpenNavBarBtn' (☰) ON A MOBILE */
toggleBtn.addEventListener("click", (event) => {
    const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", !isOpen);
    toggleBtn.textContent = isOpen ? "☰" : "✕";
    mobileNav.classList.toggle("Open");
});

/* MANAGES THE NAVIGATION BUTTONS ON A DESKTOP */
navBtns.forEach(navBtn => navBtn.addEventListener(
    "click", (event) => {
        const targetID = event.target.dataset.target;
        pageDisplayManager(targetID);
        mobileNav.classList.remove("Open");
        toggleBtn.textContent = "☰";
        toggleBtn.setAttribute("aria-expanded", "false");
    }
));

/* MANAGES THE BI-DIRECTIONAL SLIDING OF PROJECTS */
sliderBtns.forEach(sliderBtn => sliderBtn.addEventListener(
    "click", (event) => {
        const dir = sliderBtn.dataset.direction;
        if (dir === "Prev") {
            currentIndex--;
        }
        if (dir === "Next") {
            currentIndex++;
        }

        if (currentIndex < 0) {
            currentIndex = projects.length - 1;
        }
        if (currentIndex >= projects.length) {
            currentIndex = 0;
        }

        projectDisplayManager();
    }
));

/* MAKES THE CONTACT FORM'S CONTENT TO BE SUBMITTED TO MY PERSONAL EMAIL */
contactForm.addEventListener("submit", event => {
    event.preventDefault();
    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };
    emailjs
        .send("service_i6pkazi", "template_ov7r1zp", params)
        .then(() => {
            alert("Successfully sent!");
            event.target.reset();
        })
        .catch(error => {
            console.error("EmailJS error:", error);
            alert("Failed to sent!");
        });
}
);