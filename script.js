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






// =====================================
// YOUTUBE DATA API v3
// SR TELUGU TECHTUTS
// =====================================

const YOUTUBE_API_KEY = "AIzaSyB7dTjw5uHlJdTcgGWY7u7Avkf6xbVzpEE";
const CHANNEL_ID = "UC1mpDsJIOLiw1e6wP-56Sgw";
const MAX_RESULTS = 12;


// =====================================
// LOAD LATEST YOUTUBE VIDEOS
// =====================================

async function loadYouTubeVideos() {

    const youtubeContainer =
        document.getElementById("youtubeVideos");

    if (!youtubeContainer) {
        console.log("YouTube videos container not found!");
        return;
    }

    try {

        const apiURL =
            `https://www.googleapis.com/youtube/v3/search` +
            `?key=${YOUTUBE_API_KEY}` +
            `&channelId=${CHANNEL_ID}` +
            `&part=snippet,id` +
            `&order=date` +
            `&maxResults=${MAX_RESULTS}` +
            `&type=video`;

        const response = await fetch(apiURL);

        const data = await response.json();

        

        if (!response.ok) {

            throw new Error(
                data?.error?.message ||
                "YouTube API Error: " + response.status
            );
        }

        youtubeContainer.innerHTML = "";

        if (!data.items || data.items.length === 0) {

            youtubeContainer.innerHTML =
                "<p>ప్రస్తుతం వీడియోలు అందుబాటులో లేవు.</p>";

            return;
        }


        // =====================================
        // CREATE VIDEO CARDS
        // =====================================

        data.items.forEach(function (video) {

            const videoId = video.id.videoId;

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
                document.createElement("div");

            videoCard.className = "video-card";


            videoCard.innerHTML = `

                <div class="video-thumbnail">

                    <img
                        src="${thumbnail}"
                        alt="${title.replace(/"/g, "&quot;")}"
                        loading="lazy"
                    >

                    <a
                        href="https://youtu.be/${videoId}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="video-play">

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
                        class="watch-btn">

                        ▶ Watch Video

                    </a>

                </div>

            `;


            youtubeContainer.appendChild(videoCard);

        });


console.log(
    "✅ YouTube videos loaded successfully:",
    data.items.length
);


    } catch (error) {

        console.error(
            "YouTube API Error:",
            error
        );

        youtubeContainer.innerHTML = `

            <p>
                YouTube వీడియోలు లోడ్ చేయడంలో సమస్య వచ్చింది.
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





const chapterCounts = {

    // =========================
    // OLD TESTAMENT
    // =========================

    genesis: 50,
    exodus: 40,
    leviticus: 27,
    numbers: 36,
    deuteronomy: 34,
    joshua: 24,
    judges: 21,
    ruth: 4,

    "1samuel": 31,
    "2samuel": 24,

    "1kings": 22,
    "2kings": 25,

    "1chronicles": 29,
    "2chronicles": 36,

    ezra: 10,
    nehemiah: 13,
    esther: 10,
    job: 42,
    psalms: 150,
    proverbs: 31,
    ecclesiastes: 12,
    songofsolomon: 8,

    isaiah: 66,
    jeremiah: 52,
    lamentations: 5,
    ezekiel: 48,
    daniel: 12,

    hosea: 14,
    joel: 3,
    amos: 9,
    obadiah: 1,
    jonah: 4,
    micah: 7,
    nahum: 3,
    habakkuk: 3,
    zephaniah: 3,
    haggai: 2,
    zechariah: 14,
    malachi: 4,


    // =========================
    // NEW TESTAMENT
    // =========================

    matthew: 28,
    mark: 16,
    luke: 24,
    john: 21,
    acts: 28,

    romans: 16,

    "1corinthians": 16,
    "2corinthians": 13,

    galatians: 6,
    ephesians: 6,
    philippians: 4,
    colossians: 4,

    "1thessalonians": 5,
    "2thessalonians": 3,

    "1timothy": 6,
    "2timothy": 4,

    titus: 3,
    philemon: 1,
    hebrews: 13,
    james: 5,

    "1peter": 5,
    "2peter": 3,

    "1john": 5,
    "2john": 1,
    "3john": 1,

    jude: 1,
    revelation: 22

};







