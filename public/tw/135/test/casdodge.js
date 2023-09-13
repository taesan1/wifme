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
        var t = new RegExp(dip, "g");
        console.log(t);
        var t1 = /Support/g;
        var t2 = /cancel/g;
        var t3 = /Small attack/g;
        var t4 = /Medium attack/g;
        var t5 = /Large attack/g;
        var table = document.getElementsByClassName("vis");
        var ii = table[11].rows.length;
        for (i = 0; i < ii; i++) {
            var row = table[11].rows[i];
            var row1 = row.cells[0].innerHTML;

            if (t2.test(row.cells[2].innerHTML) && t.test(row.cells[0].innerHTML)) {
                var bb = row.cells[2].innerHTML.split("?")[1];
                bb = bb.split("\"")[0];
                var n1 = "https://" + world + ".tribalwars.net/game.php?" + bb;
                console.log(n1);
                n1 = n1.replace(/amp;/g, "");
                var dodn = localStorage["dodget" + window.game_data.village.id];
                if (dodn < 2) {
                    dodn = 2
                };
                if (dodn > 8) {
                    dodn = 8
                };
                if (dodn == undefined) {
                    dodn = localStorage["dodn"];
                    console.log("not finding cancel time");
                } else {
                    console.log("cancel time dynamic");
                }
                localStorage["dodge" + window.game_data.village.id] = "close";
                var closetime = ((dodn - 1) * 60000) + (Math.random() * 5999);
                var ct; // 전역 변수로 설정하여 clearInterval에 접근할 수 있도록 합니다.

                function canceldodge() {
                    document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="RED" > 닷지 설정시간: ' + dodn + '분 </FONT>' + parseInt(closetime / 1000) + ' 초 뒤에 취소 됩니다 <FONT SIZE=-2</FONT>';
                    if (closetime < 1) {
                        clearInterval(ct); // clearInterval을 호출하여 간격 실행을 중지합니다.
                        setTimeout(function() {
                            localStorage.setItem("mode", "방어");
                            window.location.href = n1;
                        }, (Math.random() * 999));
                    } else {
                        closetime = closetime - 500;
                    }
                }

                ct = setInterval(canceldodge, 500);
            }
        };
        localStorage.setItem("now", "대기");
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

