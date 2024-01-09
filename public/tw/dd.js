var messageToSend = sessionStorage.getItem('messageToSend');

fetch('https://your-server-url.com/send-message', {
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
