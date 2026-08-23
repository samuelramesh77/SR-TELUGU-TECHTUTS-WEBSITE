document.addEventListener("DOMContentLoaded", function () {
    console.log("SR TELUGU TECHTUTS Website Loaded Successfully!");
});

const menuToggle = document.getElementById("menuToggle");

const mainNav = document.getElementById("mainNav");


menuToggle.addEventListener("click", function () {

    mainNav.classList.toggle("active");

});



const animatedItems = document.querySelectorAll(
    ".card, .youtube-card, .gallery-item"
);




const animationObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });



    },
    {
        threshold: 0.15
    }
);


animatedItems.forEach(function (item) {

    animationObserver.observe(item);

});