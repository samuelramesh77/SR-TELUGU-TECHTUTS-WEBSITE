// =====================================
// SR TELUGU TECHTUTS WEBSITE
// MAIN JAVASCRIPT
// =====================================


// =====================================
// WEBSITE LOADED
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "SR TELUGU TECHTUTS Website Loaded Successfully!"
    );

});



// =====================================
// MOBILE MENU
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (!menuToggle || !mainNav) {

        console.log(
            "Mobile menu elements not found."
        );

        return;

    }


    menuToggle.addEventListener("click", function () {

        mainNav.classList.toggle("active");

    });

});



// =====================================
// SCROLL ANIMATIONS
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const animatedItems =
        document.querySelectorAll(
            ".card, .youtube-card, .gallery-item"
        );


    if (!animatedItems.length) {
        return;
    }


    const animationObserver =
        new IntersectionObserver(

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

});



// =====================================
// BACK TO TOP BUTTON
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const backToTop =
        document.getElementById("backToTop");


    if (!backToTop) {

        console.log(
            "Back to Top button not found!"
        );

        return;

    }


    // Initial state

    backToTop.style.display = "none";


    window.addEventListener("scroll", function () {

        if (window.scrollY > 200) {

            backToTop.style.display = "flex";

        }

        else {

            backToTop.style.display = "none";

        }

    });


    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

});



// =====================================
// WEBSITE SEARCH
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("websiteSearch");


    const searchMessage =
        document.getElementById("searchMessage");


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function () {


            const searchText =
                searchInput.value
                .toLowerCase()
                .trim();


            const searchableItems =
                document.querySelectorAll(
                    ".song-card, .video-card, .gallery-item"
                );


            let foundItems = 0;


            searchableItems.forEach(
                function (item) {


                    const text =
                        item.textContent
                        .toLowerCase();


                    if (
                        searchText === "" ||
                        text.includes(searchText)
                    ) {

                        item.style.display = "";

                        foundItems++;

                    }

                    else {

                        item.style.display = "none";

                    }

                }
            );


            if (!searchMessage) {
                return;
            }


            if (
                searchText !== "" &&
                foundItems === 0
            ) {

                searchMessage.textContent =
                    "ఏ ఫలితాలు కనిపించలేదు.";

            }

            else if (
                searchText !== ""
            ) {

                searchMessage.textContent =
                    foundItems +
                    " ఫలితాలు కనిపించాయి.";

            }

            else {

                searchMessage.textContent = "";

            }

        }
    );

});



// =====================================
// YOUTUBE DATA API v3
// =====================================

const YOUTUBE_API_KEY =
    "YOUR_YOUTUBE_API_KEY";

const CHANNEL_ID =
    "UC1mpDsJIOLiw1e6wP-56Sgw";

const MAX_RESULTS = 12;



// =====================================
// LOAD YOUTUBE VIDEOS
// =====================================

async function loadYouTubeVideos() {


    const youtubeContainer =
        document.getElementById(
            "youtubeVideos"
        );


    // Bible page / other pagesలో
    // YouTube container లేకపోతే stop

    if (!youtubeContainer) {

        return;

    }


    try {


        const apiURL =

            "https://www.googleapis.com/youtube/v3/search" +

            "?key=" +
            encodeURIComponent(
                YOUTUBE_API_KEY
            ) +

            "&channelId=" +
            encodeURIComponent(
                CHANNEL_ID
            ) +

            "&part=snippet,id" +

            "&order=date" +

            "&maxResults=" +
            MAX_RESULTS +

            "&type=video";


        const response =
            await fetch(apiURL);


        const data =
            await response.json();



        // =====================================
        // API ERROR
        // =====================================

        if (!response.ok) {

            throw new Error(

                data?.error?.message ||

                "YouTube API Error: " +
                response.status

            );

        }



        youtubeContainer.innerHTML = "";



        // =====================================
        // NO VIDEOS
        // =====================================

        if (
            !data.items ||
            data.items.length === 0
        ) {

            youtubeContainer.innerHTML =

                "<p>" +
                "ప్రస్తుతం వీడియోలు అందుబాటులో లేవు." +
                "</p>";

            return;

        }



        // =====================================
        // CREATE VIDEO CARDS
        // =====================================

        data.items.forEach(
            function (video) {


                const videoId =
                    video.id.videoId;


                const title =
                    video.snippet.title;


                const thumbnail =

                    video.snippet.thumbnails.high?.url ||

                    video.snippet.thumbnails.medium?.url ||

                    video.snippet.thumbnails.default?.url;



                const publishedDate =

                    new Date(
                        video.snippet.publishedAt
                    ).toLocaleDateString(
                        "te-IN",
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        }
                    );



                const videoCard =
                    document.createElement(
                        "div"
                    );


                videoCard.className =
                    "video-card";



                // =====================================
                // VIDEO CARD HTML
                // =====================================

                videoCard.innerHTML = `

                    <div class="video-thumbnail">

                        <img
                            src="${thumbnail}"
                            alt="${title.replace(
                                /"/g,
                                "&quot;"
                            )}"
                            loading="lazy"
                        >


                        <a
                            href="https://youtu.be/${videoId}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="video-play"
                        >
                            ▶
                        </a>

                    </div>


                    <div class="video-info">

                        <span>
                            🔴 SR TELUGU TECHTUTS
                        </span>


                        <h3>
                            ${title}
                        </h3>


                        <p class="video-date">

                            📅 ${publishedDate}

                        </p>


                        <a
                            href="https://youtu.be/${videoId}"
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


            }
        );



        console.log(

            "✅ YouTube videos loaded successfully:",

            data.items.length

        );


    }


    catch (error) {


        console.error(
            "YouTube API Error:",
            error
        );


        youtubeContainer.innerHTML = `

            <p>
                YouTube వీడియోలు లోడ్ చేయడంలో
                సమస్య వచ్చింది.
            </p>

            <p style="color:red;">

                ${error.message}

            </p>

        `;

    }

}



// =====================================
// START YOUTUBE LOADING
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadYouTubeVideos();

    }
);
