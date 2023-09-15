javascript:
    console.log(dip);

function bot() {
    if (document.getElementById('bot_check') != null) {
    }
}
var world = window.game_data.world;
//var ip=localStorage["dodge"+window.game_data.village.id];
var dip = localStorage["dodge" + window.game_data.village.id];
console.log("dip " + dip);
if (dip && document.URL.match(/screen=place/i)) {
    if (dip.length > 6) {
        var lt2 = null; // 초기에는 null로 설정
        var cancle = null;
        var t = new RegExp(dip, "g");
        console.log("t " + t);
        var t1 = /Support/g;
        var t2 = /cancel/g;
        var t3 = /Dodged/g;
        var table = document.getElementsByClassName("vis");
        var iii = table[12].rows.length;
        var ii = table[11].rows.length;var count= 0;
        var ccc1=setInterval(ccc,1000);
        if (lt2 === null && cancle === null) {
            // 최초 실행 시 lt2와 cancle을 계산
            for (i = 0; i < iii; i++) {
                var row1 = table[12].rows[i];
                if (t3.test(row1.cells[0].innerHTML)&&count < 1)) {
                    count++;
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
    }


    if (dip.length < 5) {
        var light = parseInt(document.forms[0].light.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var catapult = parseInt(document.forms[0].catapult.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var archer = parseInt(document.forms[0].archer.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var marcher = parseInt(document.forms[0].marcher.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var heavy = parseInt(document.forms[0].heavy.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var spy = parseInt(document.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var spear = parseInt(document.forms[0].spear.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var sword = parseInt(document.forms[0].sword.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var axe = parseInt(document.forms[0].axe.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var ram = parseInt(document.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var snob = parseInt(document.forms[0].snob.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var knight = parseInt(document.forms[0].knight.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var ip1 = 18;
        if (snob > 0) ip1 = 3500;
        if (ram > 0 || catapult > 10) ip1 = 3000;
        else if (sword > 0) ip1 = 2200;
        else if (spear > 0 || axe > 0|| archer>0) ip1 = 1800;
        else if (heavy > 0) ip1 = 1100;
        else if (light > 0|| marcher>0) ip1 = 1000;


        if (world == "en135") {
            var ip = localStorage["dodge" + window.game_data.village.id];
            bot();
            $.getScript("https://wifm.site/tw/135/test/cbsdodge.js?xx=" + game_data["village"]["x"] + "&yy=" + game_data["village"]["y"] + "&tmin=" + ip + "&slow=" + ip1);
        }

    };

    if (dip == "close") {
        delete localStorage["dodge" + window.game_data.village.id];
        delete localStorage["dodger" + window.game_data.village.id];
        delete localStorage["dodget" + window.game_data.village.id];
        delete localStorage["nearcoord_"+window.game_data.village.id];
        delete localStorage["ddd" + window.game_data.village.id];
        setTimeout(function() {
            document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="RED"> mode 방어: 창이 스스로 닫힙니다.</FONT><br>';
            self.close();
        }, 4000);
    };

}

