// 현재 페이지 URL에 '&screen=overview_villages' 문자열이 없는 경우:
if (window.location.href.indexOf('&screen=overview_villages') < 0) {
    // 새로운 위치로 이동합니다. 즉, 현재 게임 데이터의 순수한 베이스 링크에 '&screen=overview_villages'를 추가하여 이동합니다.
    window.location.assign(game_data.link_base_pure + "&screen=overview_villages");
}
// '&screen=overview_villages' 문자열이 있는 경우:
else {
    var fake9 = localStorage.getItem("fake9");

    if (!fake9) {
        var coords = prompt("Please separate the coordinates with a space ex:111|222 111|333 111|444");
        localStorage.setItem("fake9", coords);
        console.log(coords);
    // 페이지에서 'screen=overview'를 포함하는 모든 링크를 찾습니다.
    var villageOverviews = $("a[href$='screen=overview']");
    var villageIds = [];
    var targetUrls = [];

    // 각 링크에서 'village' 매개변수 값을 추출하여 villageIds 배열에 저장합니다.
    for (var i = 1; i < villageOverviews.length; i++) {
        thisURL = villageOverviews[i].href;
        villageIds.push(thisURL.match('[\?&]village=([^&#]*)')[1]);
    }

    // villageIds 배열에서 각각의 village ID를 사용하여 새로운 대상 URL을 만들고, 'screen=place'를 추가합니다.
    for (var j = 0; j < villageIds.length; j++) {
        targetUrls.push(`${window.location.origin}/game.php?village=${villageIds[j]}&screen=place`);
    }

    // setTimeout을 사용하여 각 대상 URL을 새 창에서 여는데, 이때 각 창을 열 때마다 200ms 간격으로 열립니다.
    targetUrls.forEach((url, i) => {
        setTimeout(() => window.open(url), i * 200);
    });
}


    https://en135.tribalwars.net/game.php?village=13881&screen=place&x=524&y=439&y=439&heavy=1

        &x=524&y=439&y=439&heavy=233&target=1477


    https://en135.tribalwars.net/game.php?village=13881&screen=place&x=524&y=439&y=439&heavy=1