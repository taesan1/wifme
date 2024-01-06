if (!document.URL.match(/place/i)) {
    location = document.URL.split('screen')[0] + 'screen=place';
}

function NextVillage() {
    document.querySelector("#village_switch_right").click();
}


var count = '1';
var group = localStorage.group;
var deli = localStorage["delay"];
if (deli == undefined) {
    deli = 0;
}
var del = Math.floor(Math.random() * 4); // 0, 1, 2, 3 중 하나 반환
var goin = parseInt(del / 1000) + 1;
var now = localStorage.now;

function acount() {
    document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="BLUE">  Group=' + group + '   COUNT=' + count + '  delay=' + goin + '</FONT><br> ';
    goin = goin - 1;
    setTimeout(function () {
        acount();
    }, 1000);
}

acount();

function send() {
    setTimeout(function () {
        document.forms[0].attack.click();
    }, 800 + Math.floor(Math.random() * del));
}


var group = localStorage.group;
var coordData = localStorage.getItem("fake_" + group).split('\n'); // 로컬 스토리지에서 좌표 데이터를 가져옵니다.
var total = parseInt(coordData[0].split(":")[1]); // 좌표 데이터의 첫 줄에 있는 total 값을 추출합니다.
var coords = coordData.slice(1); // 좌표 데이터의 두 번째 줄부터 좌표 목록을 추출합니다.

var randomIndex = Math.floor(Math.random() * total) + 1; // 1부터 total까지의 무작위 인덱스를 선택합니다.
var selectedCoord = null;

for (var i = 0; i < coords.length; i++) {
    var coordInfo = coords[i].split(":");
    var index = parseInt(coordInfo[0]);
    var coord = coordInfo[1];

    if (index === randomIndex) {
        selectedCoord = coord;
        break;
    }
}
var coordSplit = selectedCoord.split('|');

// 선택된 좌표를 타겟으로 지정하는 함수 (fnFillRallyPoint) 내부에서 사용하도록 수정합니다.
function fnFillRallyPoint() {
    document.forms[0].x.value = coordSplit[0]; // X 좌표 입력 필드에 선택된 좌표의 X 값을 설정합니다.
    document.forms[0].y.value = coordSplit[1]; // Y 좌표 입력 필드에 선택된 좌표의 Y 값을 설정합니다.
}


if (!document.hidden) {
    setTimeout(function () {
        NextVillage();
    }, del + 35000);
} /*else {
    UI.InfoMessage('현재 대기 상태가 아닙니다', 2000, 'error');
    setInterval(function () {
        if (!document.hidden && localStorage.now == "대기") {
            NextVillage();
        }
    }, 10000);
}
*/
var sent = 0;
var del2 = Math.floor((Math.random() * 10));

var spear = parseInt(document.forms[0].spear.nextSibling.nextSibling.innerHTML.match(/\d+/));
var axe = parseInt(document.forms[0].axe.nextSibling.nextSibling.innerHTML.match(/\d+/));
var rams = parseInt(document.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/));
var cats = parseInt(document.forms[0].catapult.nextSibling.nextSibling.innerHTML.match(/\d+/));
var spy = parseInt(document.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/\d+/));

if (localStorage["fake" + window.game_data.village.id] == 1) {
    delete localStorage["fake" + window.game_data.village.id];
    NextVillage();
} else {
    if (del2 == 1 && spy > 100) {
        document.forms[0].spy.value = 1;
        sent = 1;
    }
    else {
        if (spy > 30) {
            document.forms[0].spy.value = 1;
            sent = 1;
        }
        if (cats !== 0) {
            document.forms[0].catapult.value = 1;
            sent = 1;
        } else {
            if (rams > 100) {
                document.forms[0].ram.value = 1;
                sent = 1;
            } else {
                if (spear !== 0) {
                    document.forms[0].spear.value = 1;
                    sent = 1;
                } else {
                    if (axe !== 0) {
                        document.forms[0].axe.value = 1;
                        sent = 1;
                    }
                }
            }
        }

    }
    if (sent === 0) {
        NextVillage(); console.log("다음빌리지")
    } else {
        fnFillRallyPoint();
        localStorage["fake" + window.game_data.village.id] = 1;
        if (!document.hidden && localStorage.now == "대기") {
            send(); console.log("클릭")
        } else {
            setInterval(function () {
                now = localStorage.now;
                if (!document.hidden && now == "대기") {
                    localStorage["mode"] = "페이크";
                    send();console.log("클릭")
                }
            }, Math.floor(Math.random() * 1000) + 1900);
        }
    }
}
