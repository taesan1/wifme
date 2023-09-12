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
    var audio = new Audio('https://wifm.site/tw/al.wav');audio.loop = true;audio.play();setTimeout(function(){audio.pause(tim)},3000);};

//다음 빌리지 함수
function next(){document.querySelector("#village_switch_right").click();};
//incoming
page=new RegExp("screen=overview_villages&mode=incomings&subtype=attacks&group=0");
page1=new RegExp("mode=incomings&action=process&type=unignored&subtype=attacks");
page2=new RegExp("screen=overview_villages&mode=incomings&type=unignored&subtype=attacks");
if(document.URL.match(page)||document.URL.match(page1)||document.URL.match(page2)){
    console.log("checking");
    $.getScript("https://wifm.site/tw/135/test/ckinc.js");}

bot();

//파밍
if(document.URL.match("&screen=am_farm")&&stop==0){$.getScript("https://wifm.site/tw/enhancer/enhancerAltb4.js");}


//rally confirmed 화면
page=new RegExp("&screen=place&try=confirm");
if(document.URL.match(page)){
    bot();
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
            도착시간 기준:
        </td>
        <td id="showArrTime">
        </td>
    </tr>`;

        var sendAttackHtml =
            `<tr>
        <td>
            출발시간 기준:
        </td>
        <td id="showSendTime">
        </td>
    </tr>`;

        var buttons =
            `<a id="arrTime" class="btn" style="cursor:pointer;">도착시간</a>
    <a id="sendTime" class="btn" style="cursor:pointer;">출발시간</a>`;

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
                if (arrivalTime.slice(-8) >= input) {
                    setTimeout(function () { document.getElementById("troop_confirm_submit").click(); }, delay);
                    clearInterval(arrInterval);
                }
            }, 5);
        }

        function setSendTime() {
            var serverTime;
            attInterval = setInterval(function () {
                serverTime = document.getElementById("serverTime").textContent;
                if (serverTime >= input) {
                    setTimeout(function () { document.getElementById("troop_confirm_submit").click(); }, delay);
                    clearInterval(attInterval);
                }
            }, 5);
        }

        document.getElementById("arrTime").onclick = function () {
            clearInterval(attInterval);
            var time = document.getElementsByClassName("relative_time")[0].textContent.slice(-8);
            var tts=localStorage.tts;var tto=localStorage.tto;
            input = prompt("Please enter desired arrival time", tts);localStorage.tts=input;
            inputMs = parseInt(prompt("Please enter approximate milliseconds", tto));localStorage.tto=inputMs;
            delay = parseInt(delayTime) + parseInt(inputMs);
            document.getElementById("showArrTime").innerHTML = input + ":" + inputMs.toString().padStart(3, "0");
            document.getElementById("showSendTime").innerHTML = "";
            setArrivalTime();
        };

        document.getElementById("sendTime").onclick = function () {
            clearInterval(arrInterval);
            var time = document.getElementById("serverTime").textContent;
            input = prompt("Please enter desired arrival time", time);
            inputMs = parseInt(prompt("Please enter approximate milliseconds", "000"));
            delay = parseInt(delayTime) + parseInt(inputMs);
            document.getElementById("showSendTime").innerHTML = input + ":" + inputMs.toString().padStart(3, "0");
            document.getElementById("showArrTime").innerHTML = "";
            setSendTime();
        };

        document.getElementById("delayButton").onclick = function () {
            delayTime = parseInt($("#delayInput").val());
            localStorage.delayTime = JSON.stringify(delayTime);
            delay = parseInt(delayTime) + parseInt(inputMs); // setTimeout time
            if (delay < 0) {
                delay = 0;
            }}

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
    };
};

//place
if (document.URL.match(/screen=place/i)&&stop==0) {
    var pcount = 0;
    place();
    dip = localStorage["dodge" + window.game_data.village.id];
    sip = localStorage["snipe" + window.game_data.village.id];
    if ((!dip || dip == undefined)){
        var pla = setInterval(place, 5000);
    }
    function place() {
        console.log("command " + pcount + "dip=" + dip + "sip=" + sip);
        pcount++;
        bot();
        now = localStorage.now;
        document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1>  현재 모드는 ' + mode + ' 현재 상태는 ' + now + '</FONT> '

        if (mode == "방어"&&stop==0) {
            clearInterval(pla);
            $.getScript("https://wifm.site/tw/135/wifm/casdodge.js");
        };
        if (!document.hidden && now == "대기" && document.URL.match(/screen=place/i) && !document.URL.match(/try=confirm/i) && !document.URL.match(/mode=units/i)) {

            if (document.getElementsByTagName("h2")[0].innerHTML == "Rally point (not constructed)") {
                console.log("no rally");
            }
            if (mode == "페이크") {
                clearInterval(pla); console.log("페이크 실행");
                $.getScript("https://wifm.site/tw/135/wifm/load.js");
            };
        }}};


