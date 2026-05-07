/* --- LOADING COUNTER --- */
document.addEventListener('DOMContentLoaded', () => {
    const countElement = document.getElementById('count');
    if (!countElement) return; // Prevent errors if on a page without a loader

    let count = 0;
    const target = 100;
    const duration = 1500; 
    const intervalTime = duration / target;

    const counter = setInterval(() => {
        count++;
        countElement.innerText = count + "%";

        if (count >= target) {
            clearInterval(counter);
            // OPTIONAL: Add a class to body to hide the overlay when done
            // document.body.classList.add('loaded');
        }
    }, intervalTime);
});

/* --- SIDEBAR BUTTONS --- */
const buttons = document.querySelectorAll('.elements button');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Clear active state from all
        buttons.forEach(b => b.classList.remove('active'));
        // Set active to clicked
        btn.classList.add('active');
    });
});





const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');


const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);


slides.appendChild(firstClone);
slides.insertBefore(lastClone, images[0]);


const allImages = document.querySelectorAll('.slides img');
let counter = 1; 
const size = 100;


slides.style.transform = `translateX(${-size * counter}%)`;

function moveSlide(direction) {
    if (counter <= 0 || counter >= allImages.length - 1) return;

    const currentImg = allImages[counter];
    currentImg.classList.remove('flicker-active');
    void currentImg.offsetWidth; 
    currentImg.classList.add('flicker-active');

    setTimeout(() => {
        counter += direction;

        slides.style.transition = "transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)";
        slides.style.transform = `translateX(${-size * counter}%)`;

        const nextImg = allImages[counter];
        nextImg.classList.remove('flicker-active');
        void nextImg.offsetWidth; 
        nextImg.classList.add('flicker-active');
    }, 170); 
}

slides.addEventListener('transitionend', () => {
    if (counter >= allImages.length - 1) {
        slides.style.transition = "none";
        counter = 1;
        slides.style.transform = `translateX(${-size * counter}%)`;
    }

    if (counter <= 0) {
        slides.style.transition = "none";
        counter = allImages.length - 2;
        slides.style.transform = `translateX(${-size * counter}%)`;
    }
});

document.getElementById('right').addEventListener('click', () => moveSlide(1));
document.getElementById('left').addEventListener('click', () => moveSlide(-1));

const sections = document.querySelectorAll("section");
const navButtons = document.querySelectorAll(".elements button");

const observerOptions = {
    root: null,
    threshold: 0.6, 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            
            navButtons.forEach((btn) => btn.classList.remove("active"));
            
           
            const activeBtn = document.querySelector(`.elements a[href="#${entry.target.id}"] button`);
            if (activeBtn) {
                activeBtn.classList.add("active");
            }
        }
    });
}, observerOptions);

sections.forEach((section) => observer.observe(section));


const videoPlayer = document.getElementById("main-trailer-video");
const thumbnails = document.querySelectorAll(".media-item");

thumbnails.forEach(item => {
    item.addEventListener("click", () => {
        const newVideo = item.dataset.video;

        if (!newVideo) return;

        // Change video source
        videoPlayer.src = newVideo;

        // Reload & play
        videoPlayer.load();
        videoPlayer.play();

        // Optional: active highlight
        thumbnails.forEach(t => t.classList.remove("active"));
        item.classList.add("active");
    });
});




const bgm = document.getElementById('bgm');


document.addEventListener('click', () => {
    if (bgm.paused) {
        bgm.play();
        bgm.volume = 0.5;
    }
}, { once: true });
