async function fetchLatestShirleyAwards() {
    try {
        const decapi = await fetch('https://decapi.me/youtube/latest_pl_video?id=PL_0qstDTXacam6lDHyxyGa3YuHtneu84p');
        const data = await decapi.text();

        const videoID = data.trim().split('https://youtu.be/')[1];
        document.getElementById('shirleyawards-embed').src = `https://www.youtube.com/embed/${videoID}`
    } catch {
        document.getElementById('shirleyawards-embed').src = `https://www.youtube.com/embed/PMsFHp-Lr6k`
    }
} fetchLatestShirleyAwards();