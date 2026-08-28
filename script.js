// ======================================================
// SR TELUGU TECHTUTS - MAIN JAVASCRIPT
// ======================================================


// ======================================================
// WEBSITE LOADED
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "SR TELUGU TECHTUTS Website Loaded Successfully!"
    );

});


// ======================================================
// MOBILE MENU
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    if (!menuToggle || !mainNav) {
        return;
    }

    menuToggle.addEventListener("click", function () {

        mainNav.classList.toggle("active");

    });

});


// ======================================================
// ANIMATION OBSERVER
// ======================================================

let animationObserver = null;

if ("IntersectionObserver" in window) {

    animationObserver =
        new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        }, {
            threshold: 0.15
        });

}


// ======================================================
// EXISTING ANIMATED ITEMS
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    if (!animationObserver) {
        return;
    }

    const animatedItems =
        document.querySelectorAll(
            ".card, .youtube-card, .gallery-item, .video-card"
        );

    animatedItems.forEach(function (item) {

        animationObserver.observe(item);

    });

});


// ======================================================
// BACK TO TOP
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    const backToTop =
        document.getElementById("backToTop");

    if (!backToTop) {
        return;
    }

    backToTop.style.display = "none";

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


// ======================================================
// WEBSITE SEARCH
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("websiteSearch");

    const searchMessage =
        document.getElementById("searchMessage");

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("input", function () {

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();

        const searchableItems =
            document.querySelectorAll(
                ".song-card, .video-card, .youtube-card, .gallery-item"
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

        if (!searchMessage) {
            return;
        }

        if (
            searchText !== "" &&
            foundItems === 0
        ) {

            searchMessage.textContent =
                "ఏ ఫలితాలు కనిపించలేదు.";

        } else if (
            searchText !== ""
        ) {

            searchMessage.textContent =
                foundItems +
                " ఫలితాలు కనిపించాయి.";

        } else {

            searchMessage.textContent = "";

        }

    });

});


// ======================================================
// LOAD YOUTUBE VIDEOS FROM videos.json
// NO YOUTUBE API
// NO API KEY
// ======================================================

async function loadYouTubeVideos() {

    const youtubeContainer =
        document.getElementById("youtubeVideos");

    if (!youtubeContainer) {

        console.log(
            "YouTube videos container not found."
        );

        return;

    }

    try {

        const response =
            await fetch(
                "videos.json?cache=" + Date.now()
            );

        if (!response.ok) {

            throw new Error(
                "videos.json HTTP Error: " +
                response.status
            );

        }

        const data =
            await response.json();

        youtubeContainer.innerHTML = "";

        if (
            !data.videos ||
            !Array.isArray(data.videos) ||
            data.videos.length === 0
        ) {

            youtubeContainer.innerHTML = `
                <div class="youtube-error">
                    <p>
                        ప్రస్తుతం YouTube వీడియోలు
                        అందుబాటులో లేవు.
                    </p>
                </div>
            `;

            return;

        }


        // ==================================================
        // CREATE VIDEO CARDS
        // ==================================================

        data.videos.forEach(function (video) {

            if (!video) {
                return;
            }

            const videoId =
                video.id || "";

            const videoURL =
                video.url ||
                "https://www.youtube.com/watch?v=" +
                videoId;

            const thumbnail =
                video.thumbnail ||
                "https://i.ytimg.com/vi/" +
                videoId +
                "/hqdefault.jpg";

            const title =
                String(
                    video.title ||
                    "YouTube Video"
                );


            // ==================================================
            // SAFE TITLE
            // ==================================================

            const safeTitle =
                title
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");


            // ==================================================
            // DATE
            // ==================================================

            let publishedDate = "";

            if (video.published) {

                const date =
                    new Date(video.published);

                if (!isNaN(date.getTime())) {

                    publishedDate =
                        date.toLocaleDateString(
                            "te-IN",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            }
                        );

                }

            }


            // ==================================================
            // VIDEO CARD
            // ==================================================

            const videoCard =
                document.createElement("div");

            videoCard.className =
                "video-card";


            videoCard.innerHTML = `

                <div class="video-thumbnail">

                    <img
                        src="${thumbnail}"
                        alt="${safeTitle}"
                        loading="lazy"
                    >

                    <a
                        href="${videoURL}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="video-play"
                        aria-label="Watch ${safeTitle}"
                    >
                        ▶
                    </a>

                </div>


                <div class="video-info">

                    <span>
                        🔴 SR TELUGU TECHTUTS
                    </span>

                    <h3>
                        ${safeTitle}
                    </h3>

                    ${
                        publishedDate
                        ? `
                            <p class="video-date">
                                📅 ${publishedDate}
                            </p>
                          `
                        : ""
                    }

                    <a
                        href="${videoURL}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="watch-btn"
                    >
                        ▶ Watch Video
                    </a>

                </div>

            `;


            youtubeContainer.appendChild(
                videoCard
            );

        });


        // ==================================================
        // ANIMATION
        // ==================================================

        if (animationObserver) {

            const newVideoCards =
                youtubeContainer.querySelectorAll(
                    ".video-card"
                );

            newVideoCards.forEach(function (card) {

                animationObserver.observe(card);

            });

        }


        console.log(
            "YouTube videos loaded successfully:",
            data.videos.length
        );

    }

    catch (error) {

        console.error(
            "YouTube videos loading error:",
            error
        );

        youtubeContainer.innerHTML = `

            <div class="youtube-error">

                <p>
                    ⚠️ YouTube వీడియోలు ప్రస్తుతం
                    లోడ్ కాలేదు.
                </p>

                <p>
                    దయచేసి కొంతసేపటి తర్వాత
                    మళ్లీ ప్రయత్నించండి.
                </p>

            </div>

        `;

    }

}


// ======================================================
// START
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadYouTubeVideos();

    }
);
