const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
const headerLogo = document.getElementById("nav-logo")
const aboutUsSection = document.getElementById("about-us")
const minBgScrollPx = -600
const maxBgScrollPx = 0
const bgScrollMaxOutPos = 580
const mobileWidth = 914;


window.addEventListener("scroll", () => {requestAnimationFrame(updateAboutUsBG())})

window.addEventListener("resize", checkMobileWidth)

window.addEventListener("hashchange", () => { // Lege hash moet niet naar boven scrollen.
    if (window.location.hash == "") {
        var currentScrollY = window.scrollY;
        window.scrollTo({top: currentScrollY, behavior: "smooth"});
    }
})

mobileNavOverlay.addEventListener("click", (e) => {
    window.location.hash = "";
    mobileNavOverlay.style.display = "none";
})

headerLogo.addEventListener("click", () => {
    window.scrollTo({top:0})
})

function checkMobileWidth() {
    if (window.innerWidth < mobileWidth) {
        aboutUsSection.style.backgroundPosition = 260 + "vw"
        return;
    }

    updateAboutUsBG()
}

function toggleMobileNav() {
    var currentScrollY = window.scrollY;
    mobileNavOverlay.style.display = "block";

    if (window.location.hash == "#nav-list"){
        window.location.hash = "";
        return;
    }

    window.location.hash = "#nav-list";
}

function updateAboutUsBG() {
    if (window.innerWidth < mobileWidth) {
        return
    }

    var normalizedScrollAmount = normalize(scrollY, 0, bgScrollMaxOutPos)
    normalizedScrollAmount = Math.min(1, normalizedScrollAmount)
    var newScrollAmount = exponentialInterpolation(
        normalizedScrollAmount, 
        maxBgScrollPx, 
        minBgScrollPx
    )

    aboutUsSection.style.backgroundPosition = (
        `${newScrollAmount}px`
    );
}

function normalize(value, min, max) {
    return (value - min) / (max - min)
}

function exponentialInterpolation(normalizedValue, min, max) {
    return min + (max - min) * (normalizedValue * normalizedValue * normalizedValue)
}
