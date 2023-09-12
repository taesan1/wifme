if (localStorage.now == "태그") {
    setTimeout(function() {
        tagging();
    }, Math.floor(Math.random() * 2000) + 2000);
}


if (document.URL.match(/screen=overview_villages&mode=incomings&subtype=attacks&group=0&page=0/i)) {
    UI.InfoMessage('모니터링이 시작됩니다 ',3000);
    var stop=localStorage.stop; if(!stop){stop="0";localStorage.stop=0};
  //현재 날짜와 시간을 밀리초로 환산
    var dd = Date.parse(Date());
    localStorage.incoming_date = dd;
}