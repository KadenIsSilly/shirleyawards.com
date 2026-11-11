(() => {
    const date = new Date("2026-11-12T17:00:00Z").getTime();

    const text = document.getElementById("vote-text");
    const categories = document.getElementById("categories-link");

    const update = () => {
        const distance = date - new Date().getTime();

        if (distance < 0) {
            const link = document.createElement("a");
            link.id = "vote-link";
            link.href = "/nominate";
            link.target = "_blank";
            link.rel = "noopener";
            link.textContent = "NOMINATE";
            text.replaceWith(link);

            categories.style.display = "block";

            clearInterval(interval);
        }
    }

    const interval = setInterval(update, 1000);
    update();
})();