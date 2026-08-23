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







// =====================================
// BACK TO TOP BUTTON
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.getElementById("backToTop");

    if (!backToTop) {
        console.log("Back to Top button not found!");
        return;
    }

    window.addEventListener("scroll", function () {

        if (window.scrollY > 200) {

            backToTop.style.display = "flex";

        } else {

            backToTop.style.display = "none";

        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});







// =====================================
// WEBSITE SEARCH
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("websiteSearch");

    const searchMessage =
        document.getElementById("searchMessage");

    if (!searchInput) return;


    searchInput.addEventListener("input", function () {

        const searchText =
            searchInput.value.toLowerCase().trim();


        const searchableItems =
            document.querySelectorAll(
                ".song-card, .video-card, .gallery-item"
            );


        let foundItems = 0;


        searchableItems.forEach(function (item) {

            const text =
                item.textContent.toLowerCase();


            if (
                searchText === "" ||
                text.includes(searchText)
            ) {

                item.style.display = "";

                foundItems++;

            } else {

                item.style.display = "none";

            }

        });


        if (searchText !== "" && foundItems === 0) {

            searchMessage.textContent =
                "ఏ ఫలితాలు కనిపించలేదు.";

        } else if (searchText !== "") {

            searchMessage.textContent =
                foundItems + " ఫలితాలు కనిపించాయి.";

        } else {

            searchMessage.textContent = "";

        }

    });

});




