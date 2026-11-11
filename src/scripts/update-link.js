(() => {
    const date = new Date("2026-11-12T17:00:00Z").getTime();

    const title = document.getElementById("vote-text");

    const update = () => {
        const distance = date - new Date().getTime();

        if (distance < 0) {
            const link = document.createElement("a");
            link.id = "vote-link";
            link.href = "/nominate";
            link.target = "_blank";
            link.rel = "noopener";
            link.textContent = "NOMINATE";

            title.replaceWith(link);
            clearInterval(interval);
        }
    }

    const interval = setInterval(update, 1000);
    update();
})();