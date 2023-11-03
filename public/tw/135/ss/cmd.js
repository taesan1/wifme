javascript:
    var group = localStorage.group;
if (group == "null") {
    group = 1;
}

var now = localStorage.now;
var mode = localStorage.mode;
var md = localStorage.mdt;
if (md == "null") {
    md = 0;
}
var stop=localStorage.stop;
if(!stop){stop="0";localStorage.stop="0"};
var coin1 = localStorage.coin1;
if (!coin1) {
    coin1 = "0";
    localStorage.coin1 = "0";
}
var mdd = prompt("1= 중지/실행 \n2= 모드(페이크/방어) \n3= 페이크 좌표 설정 \n4= 동줍 설정 \n5= 인커밍일괄리네임 \n6= 백타임리네임 \n7= 밖에나간서폿확인창으로 이동 \n8= 그룹체크픽커 \n9= 랠리포인트 초기화", md);
localStorage.setItem("mdt", mdd);

if (mdd == 1) {if(stop==0){localStorage.setItem("stop","1"); UI.ErrorMessage('중지 ',1000);}
else{localStorage.setItem("stop","0"); UI.SuccessMessage('시작 ',1000);};
}else if (mdd == 2) {
    //모드
    var mddd = localStorage.mdddt;
    if (mddd == "null") {
        mddd = 0
    };
    var mdddd = prompt("1= 페이크 \n2= 방어(닷지) \n3= 모드/상태 초기화", mddd);
    localStorage.setItem("mdddt", mdddd);
    if (mode != 0) {
        mode = 0
    };
    if (mdddd == 1) {

        var group = localStorage.group;
        g1 = prompt("페이크를 보낼 그룹의 넘버를 입력하세요 = ", group);
        localStorage.setItem("group", g1);
        localStorage.setItem("mode", "페이크");
        UI.SuccessMessage('페이크 모드 ',1000);
    } else if(mdddd==2){
        // 방어 로직
        localStorage.setItem("mode", "방어");
        var dodn = localStorage["dod"];
        dodn = prompt("닷지 시간을 입력해 주세요(2~8분 추천)", dodn);
        localStorage["dodn"] = dodn;
        var monitor_incoming = localStorage["monitor_incoming"];
        if (!monitor_incoming) {
            monitor_incoming = 45;
        }
        monitor_incoming = prompt("모니터링 새로고침 (5~55초 추천)", monitor_incoming);
        localStorage["monitor_incoming"] = monitor_incoming;
    UI.SuccessMessage('방어 모드 ',1000);
    }else if(mdddd==3){
        localStorage.setItem("now", "대기");localStorage.setItem("mode", "대기");UI.SuccessMessage('모드와 상태가 초기화 되었습니다. ',1000)
} }else if (mdd == 3) {
    //페이크 그룹 설정
    $.getScript("https://wifm.site/tw/setcoord.js");
}else if (mdd == 4) {
    var fg = localStorage.fg;
    g1 = prompt("동줍에 사용할 그룹의 id를 입력해주세요 URL에 group= 다음 숫자입니다", fg);
    localStorage.setItem("fg", g1);UI.SuccessMessage('동줍 그룹이 설정되었습니다 ',1000);;
    g2 = prompt("동줍세팅을 초기화하시겠습니까? yes/no ", g2);
    if(g2==="yes"){delete localStorage.jStorage;}else{console.log("대기");}
}else if (mdd == 5) {
    var old = localStorage.old;
    old = prompt("어떤 리네임으로 하시겠습니까?", old);
    localStorage.setItem("old", old);
    var sitter = "";
    var man = document.getElementsByClassName("overview_filters_manage");
    var link = window.location.href;
    var villageid = (link.split("village=")[1]).split("&")[0];
    if (/t=/g.test(link)) {
        sitter = "t=" + (link.split("t=")[1]).split("&")[0];
    }
    var b = 0;
    var sd = [];
    var count = 0;
    var cc = 999;
    var label = "dodged ";
    var table = document.getElementById("incomings_table");

    function processRow(i) {
        if (i < cc) {
            var row = table.rows[i];
            var end = /selectAll/g.test(row.cells[0].innerHTML);
            if (!end) {
                var old1=$(row).find('input[type=text]').val(); console.log(old1)
                var old = localStorage.old;
                if(old!==old1){
                    $(row).find('.rename-icon').click();

                    $(row).find('input[type=text]').val(old);
                    $(row).find('input[type=button]').click();}
            }
            i++;
            setTimeout(function () {
                processRow(i);
            }, 250); // 250ms 간격으로 실행 (4번/초)
        }
    }

    if (table) {
        processRow(1); // 첫 번째 행부터 시작
    }
}else if (mdd == 6){$.getScript("https://wifm.site/tw/backtime.js");
}else if (mdd == 7){  var sitter = "";
    var link = window.location.href;
    var villageid = game_data.village.id;
    if (/t=/g.test(link)) {
        sitter = "t=" + (link.split("t=")[1]).split("&")[0];
    }
    link = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=overview_villages&type=away_detail&filter_villages=1&mode=units&group=0";
    if (link !== window.location.href) {
        window.open(link, "open");
    } else {$.getScript("https://wifm.site/tw/135/ss/sup.js")}
}else if (mdd == 8){$.getScript("https://wifm.site/tw/picker.js")}
else if (mdd == 9){
    delete localStorage["autosss" + window.game_data.village.id];
    delete localStorage["autommm" + window.game_data.village.id];
    delete localStorage["autotime" + window.game_data.village.id];
    delete localStorage["autodelay" + window.game_data.village.id];
    delete localStorage["auto" + window.game_data.village.id];
    delete localStorage["dodge" + window.game_data.village.id];
    delete localStorage["dodger" + window.game_data.village.id];
    delete localStorage["dodget" + window.game_data.village.id];
    delete localStorage["nearcoord_"+window.game_data.village.id];
    delete localStorage["ddd" + window.game_data.village.id];};
