// dd.js 클라이언트 측 코드
const playerName = window.game_data.player.name;
const messageToSend = playerName + "noble";

fetch('https://wifm.site/.netlify/functions/discord', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: messageToSend })
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Message sent:', data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
