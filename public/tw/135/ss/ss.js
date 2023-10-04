//버튼 생성
var button = document.createElement("button");
var com=localStorage.cmd+"/cmd.js";
button.style.width = "10px";
button.style.height = "10px";
button.style.padding = "0";
button.style.border = "none";
button.style.background = "transparent";
button.style.cursor = "pointer";
button.innerHTML = ".";
button.addEventListener("click", function() {
    $.getScript(com);
});
var targetElement = document.querySelector("#header_info > tbody > tr > td:nth-child(3)");
targetElement.appendChild(button);

//플레이어 정보
//이름, 플레이어id, 부족id, 빌라id, 빌라좌표, 현재 그룹, 월드, 유닛, 스크린
var message="안녕하세요",messagetime;
var name=game_data.player.name;var pid=game_data.player.id; var tid=game_data.player.ally; var vid=game_data.village.id; var vcoord=game_data.village.coord;
var gid=game_data.group_id; var world=game_data.world;localStorage.setItem("world",world);var screen=game_data.screen; var unit=game_data.unit; var sitter=game_data.player.sitter;
console.log(message+ ' ' +name+ '님 현재 빌리지는 '+ vcoord+ ' 입니다. 현재 스크린 위치는 '+screen+' 입니다.');

//페이지,메시지,인커밍
var stop=localStorage.stop; if(!stop){stop="0";localStorage.stop=0};
var page,page1,page2,page3,page4;var tim="";
var dd = Date.parse(Date());
localStorage.incoming_date = dd;
var incoming_open=Date.parse(Date())-localStorage.incoming_date; console.log("incoming오픈"+incoming_open+localStorage.incoming_date);
var inc=game_data.player.incomings;
var ia=localStorage["ia_"+pid];
if(!ia){ia=inc;localStorage.setItem("ia_"+pid,inc);}console.log("incoming은 "+inc+"  ia는 "+ia);

//딜레이
var delay=localStorage["delay"];
if (!delay){delay=0};
var del=Math.floor((Math.random() * delay));

//모드와 상태
var mode=localStorage["mode"]; if(!mode){mode="X";localStorage.mode="X";};
var now=localStorage.now; if(!now){now="대기";localStorage.now="대기";};
if(!now=="대기"){UI.InfoMessage('현재 '+now+'중     모드는 '+mode,2000,'error');}

//랠리포인트
var autovilla=localStorage["auto" + window.game_data.village.id];
if(!autovilla){autovilla="0";localStorage["auto" + window.game_data.village.id]="0"}
var autovillasss=localStorage["autosss" + window.game_data.village.id];
var autovillammm=localStorage["autommm" + window.game_data.village.id];
var autotime = localStorage["autotime" + window.game_data.village.id];
var autodelay = localStorage["autodelay" + window.game_data.village.id];

// 닷지 방어모드 설정
var dip=""; var dodgeid="";
var pla;

//시터
var cw=window.location.href;
var siiter ="";


function bot() {
    if (document.getElementById('bot_check') || document.getElementById('label')||document.getElementById("#botprotection_quest") ) {
        // 봇 체크 또는 라벨이 있는 경우
        localStorage.setItem("now", "bot");
        message = "BOT Alert";alert();clearInterval();
        if(document.getElementById("#botprotection_quest")) {document.getElementById("#botprotection_quest").click()};
        var botCheckLink = document.querySelector("#bot_check > a");
        if (botCheckLink && botCheckLink.innerText.includes("Begin bot protection check")) {
            // "Begin bot protection check"를 찾았을 때
            botCheckLink.click();
        }
    }
};
//봇 stop
if(now=="bot"){setInterval(function(){
    if(document.getElementById('bot_check') == null&&!document.getElementById('label')){localStorage.now="대기";}},2000);
};

function alert(){
    var audio = new Audio('https://wifm.site/tw/al.wav');audio.loop = true;audio.play();setTimeout(function(){audio.pause(tim)},1000);};

//다음 빌리지 함수
function next(){document.querySelector("#village_switch_right").click();};
//incoming
page=new RegExp("screen=overview_villages&mode=incomings&subtype=attacks&group=0");
page1=new RegExp("mode=incomings&action=process&type=unignored&subtype=attacks");
page2=new RegExp("screen=overview_villages&mode=incomings&type=unignored&subtype=attacks");
if(document.URL.match(page)||document.URL.match(page1)||document.URL.match(page2)){
    console.log("checking");
    $.getScript("https://wifm.site/tw/135/ss/ckinc.js");}

bot();

//파밍
if(document.URL.match("&screen=am_farm")&&stop==0){$.getScript("https://wifm.site/tw/enhancer/enhancerAltb4.js");}


//rally confirmed 화면
page=new RegExp("&screen=place&try=confirm");
if(document.URL.match(page)){
    bot();
    var autovilla=localStorage["auto" + window.game_data.village.id];
    if(!autovilla){autovilla="0";localStorage["auto" + window.game_data.village.id]="0"}
    var autovillasss=localStorage["autosss" + window.game_data.village.id];
    var autovillammm=localStorage["autommm" + window.game_data.village.id];
    var autotime = localStorage["autotime" + window.game_data.village.id];
    var autodelay = localStorage["autodelay" + window.game_data.village.id];
    var inputMs;
    var input;
    var delay;
    var arrInterval;
    var attInterval;
    var delayTime = parseInt(localStorage.delayTime);
    if (isNaN(delayTime)) {
        delayTime = 0;
        localStorage.delayTime = JSON.stringify(delayTime);
    }

    var offsetHtml =
        `<tr>
        <td>
            <style>
            .tooltip .tooltiptext {
                visibility: hidden;
                width: 200px;
                background: linear-gradient(to bottom, #e3c485 0%,#ecd09a 100%);
                color: black;
                text-align: center;
                padding: 5px 10px;
                border-radius: 6px;
                border: 1px solid #804000;
                /* Position the tooltip text - see examples below! */
                position: absolute;
                z-index: 1;
            }

            .tooltip:hover .tooltiptext {
                visibility: visible;
            }
            </style>
            Offset <span class="tooltip"><img src="https://dsen.innogamescdn.com/asset/2661920a/graphic/questionmark.png" style="max-width:13px"/><span class="tooltiptext">Adjusts milliseconds. If you set 500ms and it arrives with 520ms, put "-20" into the offset. Play around with this offset until the time is right.</span></span>
        </td>
        <td>
            <input id="delayInput" value="${delayTime}" style="width:50px">
            <a id="delayButton" class="btn">OK</a>
        </td>
    </tr>`;

    var setArrivalHtml =
        `<tr>
        <td>
            Set arrival:
        </td>
        <td id="showArrTime">
        </td>
    </tr>`;

    var sendAttackHtml =
        `<tr>
        <td>
            Send at:
        </td>
        <td id="showSendTime">
        </td>
    </tr>`;

    var buttons =
        `<a id="arrTime" class="btn" style="cursor:pointer;">Set arrival time</a>
    <a id="sendTime" class="btn" style="cursor:pointer;">Set send time</a>`;

    document.getElementById("troop_confirm_submit").insertAdjacentHTML("afterend", buttons);


    var parentTable = document.getElementById("date_arrival").parentNode.parentNode;
    parentTable.insertAdjacentHTML("beforeend", offsetHtml + setArrivalHtml + sendAttackHtml);

    if (!sessionStorage.setArrivalData) {
        sessionStorage.setArrivalData = "true";
    }

    function setArrivalTime() {
        var arrivalTime;
        arrInterval = setInterval(function () {
            arrivalTime = document.getElementsByClassName("relative_time")[0].textContent;
            if (arrivalTime.slice(-8) >= autovillammm) {
                setTimeout(function () {
                    document.getElementById("troop_confirm_submit").click();
                }, autodelay);
                clearInterval(arrInterval);
            }
        }, 1);
    };
    function setSendTime() {
        var serverTime;
        attInterval = setInterval(function() {
            serverTime = document.getElementById("serverTime").textContent;
            if (serverTime >= input) {
                setTimeout(function() {
                    document.getElementById("troop_confirm_submit").click();
                },  autodelay);
                clearInterval(attInterval);
            }
        }, 5);
    }
    function ab() {
        var autovillammm = localStorage["autommm" + window.game_data.village.id];
        var arrivalTime;
        arrInterval = setInterval(function() {
            arrivalTime = document.getElementsByClassName("relative_time")[0].textContent;
            if (arrivalTime.slice(-8) >= autovillammm) {
                setTimeout(function() {
                    document.getElementById("troop_confirm_submit").click();
                }, delay);
                clearInterval(arrInterval);
            }
        }, 1);
        localStorage.setItem("auto" + window.game_data.village.id,"1") }
    document.getElementById("arrTime").onclick = function () {
        clearInterval(attInterval)
        var element = document.querySelector("#command-data-form > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > span > a:nth-child(1)");
        var extractedText = element.textContent;
        var match = extractedText.match(/\((\d+\|\d+)\)/);
        var coord = match[1];
        localStorage["auto" + window.game_data.village.id] = coord;
        console.log(coord); // 결과: "248|489"

        var autotime = localStorage["autotime" + window.game_data.village.id];
        var inputFullTime = prompt("출발 시간과 밀리초를 입력하세요 (예: 13:32:16:722)", autotime);
        localStorage.setItem("autotime" + window.game_data.village.id, inputFullTime);

        var inputParts = inputFullTime.split(":");
        var inputTime = inputParts.slice(0, -1).join(":"); // 시간 부분 (13:32:16)
        var inputMs = parseInt(inputParts[inputParts.length - 1]); // 밀리초 부분 (722)

        localStorage["autommm" + window.game_data.village.id] = inputTime;
        localStorage["autosss" + window.game_data.village.id] = inputMs;

        localStorage["autodelay" + window.game_data.village.id] = parseInt(delayTime) + parseInt(inputMs);
        document.getElementById("showArrTime").innerHTML = inputTime + ":" + inputMs.toString().padStart(3, "0");
        document.getElementById("showSendTime").innerHTML = "";

        var arr;
        var interval = 1000; // 초기 간격은 1초로 설정

        arr = setTimeout(function run() {
            delay = parseInt(delayTime) + parseInt(inputMs);
            var time = document.getElementsByClassName("relative_time")[0].textContent.slice(-8);
            localStorage["autommm" + window.game_data.village.id] = inputTime;
            // autovillammm 시간에서 10초를 뺀 값을 생성
            var autovillammmTime = inputTime.split(":");
            var hours = parseInt(autovillammmTime[0]);
            var minutes = parseInt(autovillammmTime[1]);
            var seconds = parseInt(autovillammmTime[2]);
            // 여기 seconds 뒤에 -5 로 되어있는거 변경하심 돼요
            var totalSeconds = hours * 3600 + minutes * 60 + seconds - 5;

            if (totalSeconds < 0) {
                totalSeconds += 86400; // 하루는 24시간 * 60분 * 60초
            }

            hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            minutes = Math.floor(totalSeconds / 60);
            seconds = totalSeconds % 60;

            var autovillammmAdjusted = [
                hours.toString().padStart(2, "0"),
                minutes.toString().padStart(2, "0"),
                seconds.toString().padStart(2, "0")
            ].join(":");

            // arrivalTime의 마지막 8자리와 autovillammmAdjusted를 비교
            if (time.slice(-8) === autovillammmAdjusted) {
                location.reload();
            } else if (time.slice(-8) > autovillammmAdjusted) {
                console.log("작아요");
                ab();
                interval = 10000; // 실행 간격을 5ms로 설정


            }

            // 다음 실행 간격에 따라 재귀 호출
            arr = setTimeout(run, interval);
        }, interval);
    };

    document.getElementById("delayButton").onclick = function () {
        delayTime = parseInt($("#delayInput").val());
        localStorage.delayTime = JSON.stringify(delayTime);
        delay = parseInt(delayTime) + parseInt(inputMs); // setTimeout time
        if (delay < 0) {
            delay = 0;
        }
    }

    document.getElementById("sendTime").onclick = function() {
        clearInterval(arrInterval);
        var time = document.getElementById("serverTime").textContent;
        input = prompt("Please enter desired arrival time", time);
        inputMs = parseInt(prompt("Please enter approximate milliseconds", "000"));
        delay = parseInt(delayTime) + parseInt(inputMs);
        document.getElementById("showSendTime").innerHTML = input + ":" + inputMs.toString().padStart(3, "0");
        document.getElementById("showArrTime").innerHTML ="";
        setSendTime();
    };


    if(autovilla.length > 6){
        clearInterval(attInterval);
        document.getElementById("showArrTime").innerHTML =autotime;
        document.getElementById("showSendTime").innerHTML = "";
        setArrivalTime();
        localStorage.setItem("auto" + window.game_data.village.id,"1")};

    //해당 모드일 시에 sumit버튼
    var group = localStorage.group;
    if (mode == "페이크"&&stop==0) {
        document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1"> 페이크 그룹= ' + group + '</FONT><br>';
        console.log("페이크 클릭");
        setTimeout(function () {
            document.forms[0].troop_confirm_submit.click();
        }, del)
    };
    var dodgevilla = localStorage["dodge" + window.game_data.village.id];

    if (mode == "방어"&&stop==0) {
        if (dodgevilla.length > 6) {
            setTimeout(function () {
                document.forms[0].troop_confirm_submit.click();
            }, (1 + Math.random() * 3) * 1000);
        }
    }

    ;
}
if (document.URL.match(/screen=place/i)&&autovilla==1) {
    delete localStorage["autosss" + window.game_data.village.id];
    delete localStorage["autommm" + window.game_data.village.id];
    delete localStorage["autotime" + window.game_data.village.id];
    delete localStorage["autodelay" + window.game_data.village.id];
    delete localStorage["auto" + window.game_data.village.id];
//window.close();
};
//place
if (document.URL.match(/screen=place/i)&&stop==0) {
    var pcount = 0;
    place();
    dip = localStorage["dodge" + window.game_data.village.id];
    if ((!dip || dip == undefined)) {
        var pla = setInterval(place, 5000);
    }
    function place() {
        console.log("command " + pcount + "dip=" + dip);
        pcount++;
        bot();
        now = localStorage.now;
        document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1>  현재 모드는 ' + mode + ' 현재 상태는 ' + now + '</FONT> '

        if (document.URL.match(/screen=place/i) && now == "10") {
            console.log("10");
            window.top.UI.InfoMessage('상태 초기화 중', 3000);
            setTimeout(function() {
                localStorage.setItem("now", "대기");
            }, 1200);
        }
        if (mode == "방어"&&stop==0) {
            clearInterval(pla);
            $.getScript("https://wifm.site/tw/135/ss/casdodge.js");
        };
        if (now == "대기" && document.URL.match(/screen=place/i) && !document.URL.match(/try=confirm/i) && !document.URL.match(/mode=units/i)) {

            if (document.getElementsByTagName("h2")[0].innerHTML == "Rally point (not constructed)") {
                console.log("no rally");
            }
            if (mode == "페이크") {
                clearInterval(pla); console.log("페이크 실행");
                $.getScript("https://wifm.site/tw/135/ss/load.js");
            };
        }}};


