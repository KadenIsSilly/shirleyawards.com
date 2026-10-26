const date = new Date("2026-11-12T17:00:00Z").getTime();

const title = document.getElementById("title");
const announcement = document.getElementById("announcement");
const timer = document.getElementById("timer");
const dayCount = document.getElementById("days-count");
const hourCount = document.getElementById("hours-count");
const minuteCount = document.getElementById("minutes-count");
const secondCount = document.getElementById("seconds-count");

announcement.style.display = "none";
timer.style.display = "flex";

const update = () => {
    const distance = date - new Date().getTime();

    if (distance < 0) {
        title.innerHTML = "NOMINATIONS ARE OPEN";
        timer.style.display = "none";
    } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        dayCount.innerHTML = days;
        hourCount.innerHTML = hours;
        minuteCount.innerHTML = minutes;
        secondCount.innerHTML = seconds;
    }
}

const interval = setInterval(update, 1000);
update();