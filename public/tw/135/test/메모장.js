document.querySelector("#serverTime")


var rutine1; // 변수를 배열로 선언할 필요가 없습니다.
var dip = localStorage["dodge" + window.game_data.village.id];
var world = window.game_data.world;
var lt2 = null; // 초기에는 null로 설정
var cancle = null;
var t = new RegExp(dip, "g");
console.log("t " + t);
var t1 = /Support/g;
var t2 = /cancel/g;
var t3 = /Dodged/g;
var table = document.getElementsByClassName("vis");
var iii = table[12].rows.length;
var ii = table[11].rows.length;

if (lt2 === null && cancle === null) {
    // 최초 실행 시 lt2와 cancle을 계산
    for (i = 0; i < iii; i++) {
        var row1 = table[12].rows[i];
        if (t3.test(row1.cells[0].innerHTML)) {
            var landTime = row1.cells[2].innerHTML.trim();
            landTime = landTime.split("<")[0];
            landTime = landTime.substring(0, landTime.length - 1);
            var landTime = row1.cells[2].innerHTML;
            landTime = landTime.split(":");
            var hr = landTime[0].split(">")
            var hr1 = parseInt(hr[1]) * 60;
            var min = parseInt(landTime[1]);
            var ss = parseInt(landTime[2]);
            var lt1 = min + hr1 + ss;
            lt2 = Math.floor(lt1 / 2) + 3;
            console.log("닷지 설정시간"+lt1 + " 닷지 취소시간 " + lt2);

            var st = document.querySelector("#serverTime").textContent;
            console.log(st);
            st = st.split("<")[0];
            st = st.substring(0, st.length - 1);
            st = st.split(":");
            var hr3 = parseInt(st[0].split(":"));
            console.log("hr3 " + hr3);
            var hr4 = hr3 * 3600;
            console.log("hr4 " + hr4);
            var min3 = parseInt(st[1].split(":"))
            var min4 = min3 * 60;
            console.log(min4);
            var ss1 = parseInt(st[2].split(":"));
            console.log("시간은 "+hr4+" 분은 "+min4+" 초는 " + ss1);

            lt4 = min4 + hr4 + ss1;
            console.log("현재 시간1 " + lt4);
            cancle = lt2 + lt4;
            var cac1=setInterval(cac, 500);
        }
    }
}
function cac(){
    if(lt2 !== null && cancle !== null){
        // 서포트를 가는 우리 병력을 lt2시간을 받아서 1보다 작은 숫자가 되면 취소를 누른 작업
        for (i = 0; i < ii; i++) {
            var row = table[11].rows[i];
            var cc = row.cells[2].innerHTML;
            if (t2.test(row.cells[2].innerHTML) && t.test(row.cells[0].innerHTML)) {
                var bb = row.cells[2].innerHTML.split("?")[1];
                bb = bb.split("\"")[0];
                var n1 = "https://" + world + ".tribalwars.net/game.php?" + bb;
                console.log(n1);
                n1 = n1.replace(/amp;/g, "");
                var st = document.querySelector("#serverTime").textContent;
                console.log(st);
                st = st.split("<")[0];
                st = st.substring(0, st.length - 1);
                st = st.split(":");
                var hr3 = parseInt(st[0].split(":"));
                console.log("hr3 " + hr3);
                var hr4 = hr3 * 3600;
                console.log("hr4 " + hr4);
                var min3 = parseInt(st[1].split(":"))
                var min4 = min3 * 60;
                console.log(min4);
                var ss1 = parseInt(st[2].split(":"));
                console.log("ss1 " + ss1);

                lt4 = min4 + hr4 + ss1;
                var ca2 = parseInt(cancle - lt4);
                console.log("현재시간 2 " + lt4+" 몇초 남았어 "+ca2)
                if (lt4 >= cancle) { console.log("지금이다");
                    clearInterval(cac); // clearInterval을 호출하여 간격 실행을 중지합니다.
                    setTimeout(function () {
                        localStorage.setItem("mode", "방어");
                        window.location.href = n1;
                    }, (Math.random() * 999));
                } else {console.log("아직아니야");
                    document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="RED" >' + ca2 + ' 초 뒤에 취소 됩니다 <FONT SIZE=-2</FONT>';
                }

                // 이 부분에서 추가 작업을 수행하거나 다른 동작을 수행할 수 있습니다.
            }
        }
    }
}
}  document.querySelector("#serverTime")



var dip = localStorage["dodge" + window.game_data.village.id];
var world = window.game_data.world;
var lt2 = null; // 초기에는 null로 설정
var cancle = null;
var t = new RegExp(dip, "g");
console.log("t " + t);
var t1 = /Support/g;
var t2 = /cancel/g;
var t3 = /Dodged/g;
var table = document.getElementsByClassName("vis");
var iii = table[12].rows.length;
var ii = table[11].rows.length;
var ccc1=setInterval(ccc,1000);
if (lt2 === null && cancle === null) {
    // 최초 실행 시 lt2와 cancle을 계산
    for (i = 0; i < iii; i++) {
        var row1 = table[12].rows[i];
        if (t3.test(row1.cells[0].innerHTML)) {
            var a = Math.floor(Date.now() / 1000);console.log(a);
     var landTime = row1.cells[2].innerHTML.trim();
            landTime = landTime.split("<")[0];
            landTime = landTime.substring(0, landTime.length - 1);
            var landTime = row1.cells[2].innerHTML;
            landTime = landTime.split(":");
            var hr = landTime[0].split(">")
            var hr1 = parseInt(hr[1]) * 3600;
            var min = parseInt(landTime[1])*60;
            var ss = parseInt(landTime[2]);
            var lt1 = min + hr1 + ss;
            lt2 = Math.floor(lt1 / 2) + 3;
            console.log("시간은 "+hr1+" 분은 "+min+" 초는 " + ss);
            console.log("닷지 설정시간"+lt1 + " 닷지 취소시간 " + lt2);
            cancle = lt2 + a;console.log("취소 설정시간"+cancle);

            ccc1=setInterval(ccc,500);
        };
    }}
function ccc(){
for (i = 0; i < ii; i++) {
    var row = table[11].rows[i];
    var cc = row.cells[2].innerHTML;
    if (t2.test(row.cells[2].innerHTML) && t.test(row.cells[0].innerHTML)) {
        var bb = row.cells[2].innerHTML.split("?")[1];
        bb = bb.split("\"")[0];
        var n1 = "https://" + world + ".tribalwars.net/game.php?" + bb;
        console.log(n1);
        n1 = n1.replace(/amp;/g, "");

        a = Math.floor(Date.now() / 1000);console.log(a);

        var ca2 = parseInt(cancle - a);
            console.log("현재시간 2 " + a + " 몇초 남았어 " + ca2);
            document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="RED" >' + ca2 + ' 초 뒤에 취소 됩니다 <FONT SIZE=-2</FONT>';
            if (a >= cancle) {
                console.log("지금이다");
                clearInterval(ccc); // clearInterval을 호출하여 간격 실행을 중지합니다.
                setTimeout(function () {
                    localStorage.setItem("mode", "방어");
                    window.location.href = n1;
                    localStorage["dodge" + window.game_data.village.id] = "close";
                }, (Math.random() * 999));
            } else {
                console.log("아직아니야");
                document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="RED" >' + ca2 + ' 초 뒤에 취소 됩니다 <FONT SIZE=-2</FONT>';
            }
        }
    }}

a = Math.floor(Date.now() / 1000);console.log(a); var timestamp = a; // 예시로 주신 값

// 타임스탬프를 Date 객체로 변환
var date = new Date(timestamp * 1000);

// Date 객체에서 시간, 분, 초 추출
var hours = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();

// 시, 분, 초를 형식에 맞게 표시
var timeString = (
    (hours < 10 ? "0" : "") + hours + ":" +
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds
);

console.log(timeString);

var lt5 = addSecondsToTime(st , cancle);
console.log("결과 시간: " + cancle);


timestamp= cancle
var date = new Date(timestamp * 1000);
var hours = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();
var timeString = (
    (hours < 10 ? "0" : "") + hours + ":" +
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds
);console.log(timeString);