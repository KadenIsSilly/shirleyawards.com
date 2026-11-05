let score = localStorage.getItem('score') || 0;

document.getElementById('profile-picture').onclick = addScore;

function addScore() {
    score++;
    localStorage.setItem('score', score);

    const scoreText = document.createElement('span');
    scoreText.className = 'click-score';
    scoreText.textContent = score;

    const img = document.getElementById('profile-picture').getBoundingClientRect();
    scoreText.style.position = 'fixed';
    scoreText.style.left = (img.left + Math.random() * img.width) + 'px';
    scoreText.style.top = img.bottom + 'px';
    document.getElementById('pfp-container').appendChild(scoreText);

    setTimeout(() => scoreText.remove(), 1000);
}