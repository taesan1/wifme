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
var mdd = prompt("1= 중지/실행 \n2= 모드 \n3= 페이크그룹 설정 \n4= 설정  \n5= 방어(닷징,스나이핑) \n6= OP \n7= 자동 파밍 \n8= 자동 코찍 \n9= 인커밍리네임 \n10= 대기상태 ", md);
localStorage.setItem("mdt", mdd);

if (mdd == 1) {if(stop==0){localStorage.setItem("stop","1"); UI.ErrorMessage('중지 ',1000);}
else{localStorage.setItem("stop","0"); UI.SuccessMessage('시작 ',1000);};
}else if (mdd == 2) {
    //모드
    var mddd = localStorage.mdddt;
    if (mddd == "null") {
        mddd = 0
    };
    var mdddd = prompt("1= 페이크 \n2= 팽 \n3= 뉴크 \n4= OP \n5= 방어(닷징,스나이핑)\n6= 대기", mddd);
    localStorage.setItem("mdddt", mdddd);
    if (mode != 0) {
        mode = 0
    };
    if (mdddd == 1) {

        var group = localStorage.group;
        g1 = prompt("페이크 그룹= ", group);
        localStorage.setItem("group", g1);
        localStorage.setItem("mode", "페이크")
    }else if(mdddd==2){ var group = localStorage.group;
        g1 = prompt("팽 그룹= ", group);
        localStorage.setItem("group", g1);
        localStorage.setItem("mode", "팽") }
    else if(mdddd==3){ var group = localStorage.group;
        g1 = prompt("뉴크 그룹= ", group);
        localStorage.setItem("group", g1);
        localStorage.setItem("mode", "뉴크") }
    else if(mdddd==4){//op로직
    }
    else if(mdddd==5){
        // 방어 로직
        localStorage.setItem("mode", "방어");
        var dodn = localStorage["dod"];
        dodn = prompt("닷지 시간을 입력해 주세요(2~8분 추천)", dodn);
        localStorage["dodn"] = dodn;
        /*
        var sni = localStorage["sni"];
        sni = prompt("몇번 째 노블에 스나이핑하시겠습니까?(2번째 추천)", sni);
        localStorage["sni"] = sni;
        var sni1 = localStorage["sni1"];
        sni = prompt("공격 유닛도 사용하시겠습니까? yes/no ", sni1);
        localStorage["sni1"] = sni1

         */
        var monitor_incoming = localStorage["monitor_incoming"];
        if (!monitor_incoming) {
            monitor_incoming = 45;
        }
        monitor_incoming = prompt("모니터링 새로고침 (5~55초 추천)", monitor_incoming);
        localStorage["monitor_incoming"] = monitor_incoming; }else if(mdddd==6){
        localStorage.setItem("mode", "대기") }


} else if (mdd == 3) {
    //페이크 그룹 설정
    $.getScript("https://wifm.site/tw/setcoord.js");
}else if (mdd == 4) {  var main = localStorage.main;
    main = prompt("main빌라의 id를 입력해주세요 ", main);
    localStorage.setItem("main", main);
    var email = localStorage.email;
    email = prompt("email ", email);
    localStorage.setItem("email", email);
    //자동 코찍
    var coin1 = localStorage.coin1;
    coin1 = prompt("자동 코찍을 하시겠습니까? 실행= 1 중지=0", coin1);
    localStorage.setItem("coin1", coin1);
    if (coin1 == 1) {
        var coin_call = localStorage.coin_call;
        coin_call = prompt("자원을 당기시겠습니까? yes/no", coin_call);
        localStorage.setItem("coin_call", coin_call)
        var coin_group = localStorage.coin_group;
        coin_group = prompt("코찍할 groupid를 입력하세요(전체는 0) ", coin_group);
        localStorage.setItem("coin_group", coin_group);
    }
}else if (mdd == 5) {
    // 방어 로직
    localStorage.setItem("mode", "방어");
    var dodn = localStorage["dod"];
    dodn = prompt("닷지 시간을 입력해 주세요(2~8분 추천)", dodn);
    localStorage["dodn"] = dodn;
    /*
            var sni = localStorage["sni"];
            sni = prompt("몇번 째 노블에 스나이핑하시겠습니까?(2번째 추천)", sni);
            localStorage["sni"] = sni;
            var sni1 = localStorage["sni1"];
            sni = prompt("공격 유닛도 사용하시겠습니까? yes/no ", sni1);
            localStorage["sni1"] = sni1

     */
    var monitor_incoming = localStorage["monitor_incoming"];
    if (!monitor_incoming) {
        monitor_incoming = 45;
    }
    monitor_incoming = prompt("모니터링 새로고침 (5~55초 추천)", monitor_incoming);
    localStorage["monitor_incoming"] = monitor_incoming;
} else if (mdd == 6) {
    // OP 로직
    localStorage.setItem("mode", "OP");
} else if (mdd == 7) {
    //자동파밍
    var fm1 = localStorage.fm1;
    fm1 = prompt("자동 파밍을 하시겠습니까? 실행= 1 중지=0", fm1);
    localStorage.setItem("fm1", fm1);
    if (fm1 == 1) {};
} else if (mdd == 8) {
    //자동 코찍
    var coin1 = localStorage.coin1;
    coin1 = prompt("자동 코찍을 하시겠습니까? 실행= 1 중지=0", coin1);
    localStorage.setItem("coin1", coin1);
    if (coin1 == 1) {
        var coin_call = localStorage.coin_call;
        coin_call = prompt("자원을 당기시겠습니까? yes/no", coin_call);
        localStorage.setItem("coin_call", coin_call)
        var coin_group = localStorage.coin_group;
        coin_group = prompt("코찍할 groupid를 입력하세요(전체는 0) ", coin_group);
        localStorage.setItem("coin_group", coin_group);
    }
} else if (mdd == 9) {
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
}
else if (mdd == 10) {
    var now = localStorage.now;
    console.log(now);
    localStorage.now = "대기";
}