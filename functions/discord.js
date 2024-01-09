const fetch = require('node-fetch');

exports.handler = async (event) => {
    const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1194177230381781074/7S9yjrJNbfx7i00jvXq3hdL-VpENTrfwrmpz06IEdpQ3taMQEWLDhPNrTMH9eCP9Lyg7'; // 디스코드 웹훅 URL

    try {
        const { message } = JSON.parse(event.body);

        // 디스코드 웹훅에 POST 요청을 보냅니다.
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
        });

        // 응답 확인
        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        } else {
            return {
                statusCode: response.status,
                body: JSON.stringify({ success: false, message: 'Failed to send notification' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: `Internal server error: ${error}` }),
        };
    }
};
