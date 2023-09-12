function openPopup() {
    var groupNumber = prompt("페이크 좌표들을 묶을 그룹의 제목를 입력하세요(숫자만 가능) :");
    var coords = prompt("좌표들을 입력하세요 (여러 개의 좌표는 공백으로 구분):");

    // 좌표를 배열로 변환합니다
    var coordsArray = coords.split(' ');

    // 전체 코드 갯수
    var totalCoords = coordsArray.length;

    // 데이터 형식에 맞게 조합하여 저장합니다
    var dataToStore = `total:${totalCoords}\n${coordsArray.map((coord, index) => `${index+1}:${coord}`).join('\n')}`;

    // 로컬 스토리지에 데이터 저장
    localStorage.setItem("fake_" + groupNumber, dataToStore);

    // 저장된 좌표 확인
    var storedData = localStorage.getItem("fake_" + groupNumber);
    console.log(`그룹 ${groupNumber}의 좌표:\n${storedData}`);
    UI.SuccessMessage('좌표가 저장되었습니다',1000);
}

// 함수 호출
openPopup();


