
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


//이름, 플레이어id, 부족id, 빌라id, 빌라좌표, 현재 그룹, 월드, 유닛, 스크린
var message="안녕하세요",messagetime;
var name=game_data.player.name;var pid=game_data.player.id; var tid=game_data.player.ally; var vid=game_data.village.id; var vcoord=game_data.village.coord;
var gid=game_data.group_id; var world=game_data.world;localStorage.setItem("world",world);var screen=game_data.screen; var unit=game_data.unit; var sitter=game_data.player.sitter;
console.log(message+ ' ' +name+ '님 현재 빌리지는 '+ vcoord+ ' 입니다. 현재 스크린 위치는 '+screen+' 입니다.')

//페이지,메시지,인커밍
var stop=localStorage.stop; if(!stop){stop="0";localStorage.stop=0};
var page,page1,page2,page3,page4;var tim="";
var incoming_open=Date.parse(Date())-localStorage.incoming_date;
var incoming_open_count=0;
var ia=localStorage["ia_"+pid];
if(!ia){ia=0;localStorage.setItem("ia_"+pid,0);}
//딜레이
var delay=localStorage["delay"];
if (!delay){delay=0};
var del=Math.floor((Math.random() * delay));
//모드와 상태
var mode=localStorage["mode"]; if(!mode){mode="X";localStorage.mode="X";};
var now=localStorage.now; if(!now){now="대기";localStorage.now="대기";};
if(!now=="대기"){UI.InfoMessage('현재 '+now+'중     모드는 '+mode,2000,'error');}
//코인
var coin = localStorage.coin;
if(!coin){coin="0";localStorage.coin="0"};
var coin_call=localStorage.coin_call;
var coin_group=localStorage.coin_group;
var coin1 = localStorage.coin1
if(!coin1){coin1="0";localStorage.coin1="0"}
//메인빌리지와 이메일,
var main=localStorage.main;
var email=localStorage.email;
if(!main||!email||!coin_call||!coin_group){
    var main=localStorage.main;main=prompt("Main빌리지의 id를 입력해 주세요 ",main);localStorage.setItem("main",main);
    var email=localStorage.email;email=prompt("email을 입력해 주세요. ",email);localStorage.setItem("email",email);
    var coin_call=localStorage.coin_call;coin_call=prompt("자원을 가져오시겠습니까? yes/no",coin_call);localStorage.setItem("coin_call",coin_call);
    var coin_group=localStorage.coin_group;coin_group=prompt("코찍을 할 그룹id를 입력해주세요, 전체는 0 ",coin_group);localStorage.setItem("coin_group",coin_group);
}
//랠리포인트
var autovilla=localStorage["auto" + window.game_data.village.id];
if(!autovilla){autovilla="0";localStorage["auto" + window.game_data.village.id]="0"}
var autovillasss=localStorage["autosss" + window.game_data.village.id];
var autovillammm=localStorage["autommm" + window.game_data.village.id];
var autotime = localStorage["autotime" + window.game_data.village.id];
var autodelay = localStorage["autodelay" + window.game_data.village.id];
//닷지 스나이프 설정
var dip=""; var sip="";
var dodgeid=""; var snipeid="";
var group=localStorage.group; var pla;

//시터
var cw=window.location.href;
var sitter1= game_data.player.sitter;
var siiter ="";
var villageid =game_data.village.id;

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
}
function alert(){
    var audio = new Audio('https://wifm.site/al.wav');audio.loop = true;audio.play();setTimeout(function(){audio.pause(tim)},3000);};

//다음 빌리지 함수
function next(){document.querySelector("#village_switch_right").click();};

//인커밍 확인

page=new RegExp("village="+main+"&screen=overview")
if(document.URL.match(page)&&!document.URL.match(/_/)) {
    var la=setInterval(landat,5000);
    function landat(){
        bot();
        now= localStorage.now;
        var n=Math.floor(Math.random() * 30)+30,acount=0;
        var ir = game_data.village.iron
        var st = game_data.village.stone
        var wo = game_data.village.wood
        var incoming = parseInt(document.getElementById('incomings_amount').innerText);console.log("incoming은"+incoming);
        var coin = localStorage.coin
        var coin1 = localStorage.coin1
        //코인 확인
        if (wo >= 140000 && st >= 150000 && ir >= 125000 &&coin1 ==1) {
            localStorage.setItem("coin","1");
        }
        if (wo < 140000 && st < 150000 && ir < 125000 &&coin1 ==1){
            localStorage.setItem("coin","0");;
        }
        if (coin1 ==0){localStorage.setItem("coin","0");}
        //인커밍 공격확인
        ia=parseInt(localStorage["ia_"+pid]);
        if(!ia){ia=0;localStorage.setItem("ia_"+pid,0);}
        var incoming_open = Date.parse(Date()) - localStorage.incoming_date;
        if (incoming > ia && now == "대기" &&coin == 0&& incoming_open > 90000 && incoming_open_count == 0) {
            incoming_open_count++;
            UI.InfoMessage('태그가 시작됩니다',15000);
            setTimeout(function(){incoming=parseInt(document.getElementById('incomings_amount').innerText);
                localStorage.setItem("now","태그");
                var sitter="";var man=document.getElementsByClassName("overview_filters_manage");
                var link=window.location.href;
                var villageid=game_data.village.id
                if(/t=/g.test(link)){sitter="t="+(link.split("t=")[1]).split("&")[0]};
                link = document.URL.split('?')[0]+"?"+sitter+"&village="+villageid+"&screen=overview_villages&mode=incomings&subtype=attacks&group=0&page=0";
                window.open(link,"incoming");},Math.floor(Math.random() * 3000)+4200);
        };
        if(incoming<ia){localStorage.setItem("ia_"+pid ,incoming);
            var main_message=' 현재 모드는 '+mode+'       현재 상태는 '+localStorage.now+'<br> incoming '+ia+"/"+incoming;
            UI.InfoMessage(main_message,3000); };
        if(incoming=ia){
            var main_message=' 현재 모드는 '+mode+'       현재 상태는 '+localStorage.now+'<br> incoming '+ia+"/"+incoming;
            UI.InfoMessage(main_message,3000); };
        if (coin == 1 && now != "코찍" && coin1 == 1){
            UI.InfoMessage('코찍이 시작됩니다'+n,5000)
            localStorage.setItem("now","코찍");}
        if (coin == 1&& now === "코찍"&& coin1 == 1){
            clearInterval(la);
            UI.InfoMessage('코찍이 시작됩니다',2000)
            setTimeout(function(){localStorage.setItem("now","코찍");
                window.location.href = "https://"+world+".tribalwars.net/game.php?village="+main+"&screen=snob";},Math.floor(Math.random() * 1000)+5100);
        }
        if (coin == 0&&now === "코찍"){localStorage.setItem("now","대기");}
    }}
//아카데미
var pull=localStorage.pull;
if(!pull){pull="0";localStorage.pull=0;};
var coin1 = localStorage.coin1
page=new RegExp("village="+main+"&screen=snob");
page1=new RegExp("screen=snob&village="+main);
if((document.URL.match(page)||document.URL.match(page1))&&now=="코찍"&&coin1 ==1){

    coin_call=localStorage.coin_call;
    console.log("snob")
    bot();
    function coinnn(){
        if(localStorage.coin == 1) {
            setTimeout(function () {
                localStorage.setItem("coin", 2);
                document.querySelector("#coin_mint_fill_max").click();
                setTimeout(function () {
                    document.querySelector("input.btn.btn-default").click();
                }, (Math.random() * 800) + 820);
            }, (Math.random() * 800) + 820);
        }

        if (localStorage.coin == 2) {
            async function getTime() {
                // villageid와 world 변수 설정
                var villageid = game_data.village.id;
                var world = game_data.world;
                // 서버에서 데이터를 받아옴
                var htmlCode = await $.get("/game.php?" + villageid + "&screen=overview");
                // 건물 건설 종료 시간과 현재 시간을 가져와서 시간 계산
                var endTime = parseInt($(htmlCode).find('.visual-label-storage').find('.building-extra span').attr('data-endtime'));
                var currentTime = Math.floor(Date.now() / 1000);
                var secondsLeft = endTime - currentTime;
                console.log("async " + secondsLeft);
                // 시간이 100초 이상일 경우 coin 값을 0으로 설정
                if (secondsLeft > 60 && secondsLeft < 18000) {
                    localStorage.setItem("coin", "0");
                }
                if (secondsLeft >= 18000) {
                    // 시간이 18000이상 미만일 경우 coin 값을 3으로 설정
                    localStorage.setItem("coin", "3");
                }
                if (secondsLeft < 60) {
                    UI.InfoMessage('잠시 대기 ' + secondsLeft + '초', secondsLeft * 1000);
                    localStorage.setItem("coin", "2");
                    if (secondsLeft < 1 || isNaN(secondsLeft)) {
                        setTimeout(function () {

                            document.querySelector("#coin_mint_fill_max").click();
                            setTimeout(function () {
                                document.querySelector("input.btn.btn-default").click();
                                localStorage.setItem("coin", 2);
                            }, (Math.random() * 200) + 320);
                        }, (Math.random() * 300) + secondsLeft * 500);
                    }

                    ;
                    secondsLeft--;
                }
            }getTime();}

        if (localStorage.coin == 0) {
            UI.InfoMessage('오버뷰 화면으로 이동합니다. ', 2000);
            setTimeout(function () {
                window.location.href = "https://" + world + ".tribalwars.net/game.php?village=" + main + "&screen=overview";
            }, Math.floor(Math.random() * 3000) + 2000);
        }
        ;

        if(coin_call=="yes"&&localStorage.coin == 3){
            UI.InfoMessage('자원을 당깁니다. ',2000)
            setTimeout(function(){
                window.location.href = "https://"+world+".tribalwars.net/game.php?village="+main+"&screen=market&order=distance&dir=ASC&target_id=0&mode=call&group="+coin_group;
                localStorage.setItem("pull", "1");
            },Math.floor(Math.random() * 3000)+2000)}
        else {if(coin_call=="no"&&localStorage.coin == 3){
            localStorage.setItem("coin", "0");}};
    };
    var coinn = setInterval(function () {
        coinnn();
        if (localStorage.coin == 2) {
            // coin이 2일 때 1초마다 실행
            clearInterval(coinn); // 이전 setInterval 중지
            coinn = setInterval(coinnn, 1000);
        } else {
            // coin이 2가 아닐 때 5초마다 실행
            clearInterval(coinn); // 이전 setInterval 중지
            coinn = setInterval(coinnn, 5000);
        }
    }, 5000);}

bot();

//당김
page=new RegExp(main+"&screen=market&order=distance&dir=ASC&target_id=0&mode=call&group="+coin_group);
page2=new RegExp(main+"&screen=market&order=distance&dir=ASC&target_id=0&mode=call&group=0");
var coin1 = localStorage.coin1
if(document.URL.match(page)||document.URL.match(page2)&&now=="코찍"&&coin1==1){bot();
    if(localStorage.coin==3&&coin1 ==1){
        var ti=10,m,wr,cr,ir,row,mer;
        var bpull=localStorage.bpull;if(bpull=="null"){bpull=ti;};
        localStorage.setItem("bpull",ti);
        if(!document.getElementById("checkbox_wood").checked){document.querySelector("#checkbox_wood").click();}
        if(!document.getElementById("checkbox_stone").checked){document.querySelector("#checkbox_stone").click();}
        if(!document.getElementById("checkbox_iron").checked){document.querySelector("#checkbox_iron").click();}
        ti=ti*3600;
        var table = document.getElementById("village_list");
        for(var j=1;j<(document.forms[0].elements.length/4)-1;j++){
            row = table.rows[j];
            var t=row.cells[1].innerHTML;
            t=(parseInt(t.split(":")[0])*3600)+(parseInt(t.split(":")[1])*60)+parseInt(t.split(":")[2]);
            if(t<ti){
                var wr=parseInt(document.querySelector("#village_list > tbody > tr:nth-child("+j+") > td.wood > span > span").innerText.replace('.', ''));
                var cr=parseInt(document.querySelector("#village_list > tbody > tr:nth-child("+j+") > td.stone > span > span").innerText.replace('.', ''));
                var ir=parseInt(document.querySelector("#village_list > tbody > tr:nth-child("+j+") > td.iron > span > span").innerText.replace('.', ''));
                if(wr<=cr&&wr<=ir){ m=parseInt(wr/337);}else
                {if(cr<=wr&&cr<=ir){ m=parseInt(cr/361);}else
                { m=parseInt(ir/301);}};

                var mer=parseInt(document.querySelector("#village_list > tbody > tr:nth-child("+j+") > td.traders").innerText.split("/")[0]);
                if(m>mer){m=mer;console.log("low "+m);};
                if(wr<parseInt(337*m)||cr<parseInt(361*m)||ir<parseInt(301*m)){
                    console.log(wr+" "+parseInt(337*m)+" "+cr+" "+parseInt(361*m)+" "+ir+" "+parseInt(301*m)+" "+m);}else
                {
                    document.forms[0].elements[5+j*4].click();
                    document.forms[0].elements[2+j*4].value=parseInt(337*m);
                    document.forms[0].elements[3+j*4].value=parseInt(361*m);
                    document.forms[0].elements[4+j*4].value=parseInt(301*m);}
            }}
        if((document.forms[0].elements.length/4)-2){setTimeout(function(){
            if(document.querySelector("#content_value > table:nth-child(3) > tbody > tr > td:nth-child(2) > form:nth-child(9) > input:nth-child(3)")){document.querySelector("#content_value > table:nth-child(3) > tbody > tr > td:nth-child(2) > form:nth-child(9) > input:nth-child(3)").click();}else{document.querySelector("#content_value > table:nth-child(3) > tbody > tr > td:nth-child(2) > form:nth-child(8) > input:nth-child(3)").click();}},(Math.random()*300) +1100);}
        var world=game_data.wolrd;
//setTimeout(function(){document.querySelector("#content_value > table:nth-child(3) > tbody > tr > td:nth-child(2) > form:nth-child(8) > input:nth-child(3)").click();},(Math.random()*1200) +2200);
        setTimeout(function(){localStorage.now="대기";window.location.href = "https://"+world+".tribalwars.net/game.php?village="+main+"&screen=overview";
            localStorage.setItem("coin", "0");localStorage.setItem("pull", "0");},Math.floor(Math.random() * 3000)+12100);
    }}

//incoming
page=new RegExp("screen=overview_villages&mode=incomings&subtype=attacks&group=0");
page1=new RegExp("mode=incomings&action=process&type=unignored&subtype=attacks");
page2=new RegExp("screen=overview_villages&mode=incomings&type=unignored&subtype=attacks");
if(document.URL.match(page)||document.URL.match(page1)||document.URL.match(page2)){
    console.log("checking");
    $.getScript("https://wifm.site/tw/135/wifm/ckinc.js");}

bot();

//파밍
if(document.URL.match("&screen=am_farm")&&stop==0){$.getScript("https://wifm.site/tw/enhencer/enhancerAltb4.js");}

//랠리포인트
page = new RegExp("&screen=place&try=confirm");
if (document.URL.match(page)) {
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
            var totalSeconds = hours * 3600 + minutes * 60 + seconds - 10;

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
    }
    /*if ((snipevilla.length ==5)&&mode == "방어"&&stop==0){
        input = prompt("도착 시간을 입력하세요 ", tts);
        localStorage.tts = input;
        inputMs = parseInt(prompt("밀리초를 입력하세요 ", tto));
        localStorage.tto = inputMs;
        delay = parseInt(delayTime) + parseInt(inputMs);
        document.getElementById("showArrTime").innerHTML = input + ":" + inputMs.toString().padStart(3, "0");
        document.getElementById("showSendTime").innerHTML = "";
        setArrivalTime();
    };

     */
    var dodgevilla = localStorage["dodge" + window.game_data.village.id];

    if (mode == "방어"&&stop==0) {
        if (dodgevilla === undefined || dodgevilla.length > 6) {
            setTimeout(function () {
                document.forms[0].troop_confirm_submit.click();
            }, (1 + Math.random() * 3) * 1000);
        }
    }

    ;
    if (mode == "팽"&&stop==0) {
        document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1"> 팽 그룹= ' + group + '</FONT><br>';
        setTimeout(function () {
            document.forms[0].troop_confirm_submit.click();
        }, del)
    }
    if (mode == "뉴크"&&stop==0) {
        document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1"> 뉴크 그룹= ' + group + '</FONT><br>';
        setTimeout(function () {
            document.forms[0].troop_confirm_submit.click();
        }, del)
    }

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
    sip = localStorage["snipe" + window.game_data.village.id];
    if ((!dip || dip == undefined)||(!sip || sip == undefined)) {
        var pla = setInterval(place, 5000);
    }
    function place() {
        console.log("command " + pcount + "dip=" + dip + "sip=" + sip);
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


