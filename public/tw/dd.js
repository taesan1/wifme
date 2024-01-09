
function a(){
    fetch('https://wifm.site/.netlify/functions/discord', {
        method: 'POST',
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            // 서버에서의 응답에 따른 작업을 수행합니다.
            console.log(data); // 응답 데이터를 콘솔에 출력하거나 다른 작업을 수행할 수 있습니다.
        })
        .catch(error => {
            // 네트워크 오류 등의 에러 처리
            console.error('There has been a problem with your fetch operation:', error);
        });};

a();
//디스코드 알림 을 위해 실행하는 파일