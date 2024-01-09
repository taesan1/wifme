// Discord.js 서버 측 코드
const axios = require('axios');

exports.handler = async (event) => {
    try {
        const requestData = JSON.parse(event.body);
        const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1194177230381781074/7S9yjrJNbfx7i00jvXq3hdL-VpENTrfwrmpz06IEdpQ3taMQEWLDhPNrTMH9eCP9Lyg7';

        // 클라이언트에서 전송한 메시지를 Discord로 전송
        const response = await axios.post(DISCORD_WEBHOOK_URL, { content: requestData.message });

        if (response.status === 200) {
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
            body: JSON.stringify({ success: false, message: 'Internal server error' }),
        };
    }
};
