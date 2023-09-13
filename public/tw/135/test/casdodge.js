var dip = localStorage["dodge" + window.game_data.village.id];
console.log("dip는 " + dip +" village id 는 " +window.game_data.village.id );
var ddp = localStorage["dodge1" + window.game_data.village.id];if(!ddp){ddp="0";localStorage["dodge1" + window.game_data.village.id]="0";};
if ((dip !== undefined || dip)&& document.URL.match(/screen=place/i)) {
    if (dip.length > 6) {error()
        var t = new RegExp(dip, "g");
        console.log(t);
        var t1 = /Support/g;
        var t2 = /cancel/g;
        var t3 = /Small attack/g;
        var t4 = /Medium attack/g;
        var t5 = /Large attack/g;
        var t6 = /Dodged/g;
        var table = document.getElementsByClassName("vis");
        var ii = table[11].rows.length;
        var iii = table[12].rows.length;
        var world = window.game_data.world;
        var count="0";var label = "Dodged"
        var dod=localStorage.dodn;
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
                localStorage["dodge1" + window.game_data.village.id] = "1";
                var closetime = ((dodn - 1) * 60000) + (Math.random() * 5999);
                var ct; // 전역 변수로 설정하여 clearInterval에 접근할 수 있도록 합니다.

                function canceldodge() {
                    document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="RED" > 닷지 설정시간: ' + dodn + '분 </FONT>' + parseInt(closetime / 1000) + ' 초 뒤에 취소 됩니다 <FONT SIZE=-2</FONT>';
                    if (closetime < 1) {
                        clearInterval(ct); // clearInterval을 호출하여 간격 실행을 중지합니다.
                        setTimeout(function() {
                            localStorage.setItem("mode", "방어"); localStorage["dodge" + window.game_data.village.id] = "close";
                            window.location.href = n1;localStorage["dodge1" + window.game_data.village.id] = "1";
                        }, (Math.random() * 999));
                    } else {
                        closetime = closetime - 500;
                    }
                }

                ct = setInterval(canceldodge, 500);
            };

        };

    localStorage.setItem("now", "대기");

    }
    error()

    if (dip.length < 5) {error()
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
        if(ddp=="0"){var ip = localStorage["dodge" + window.game_data.village.id];
        $.getScript("https://wifm.site/tw/135/wifm/cbsdodge.js?xx=" + game_data["village"]["x"] + "&yy=" + game_data["village"]["y"] + "&tmin=" + ip + "&slow=" + ip1);}

        var table = document.getElementsByClassName("vis");
        var iii = table[12].rows.length;
        var count="0";var label = "Dodged"
        var dod=localStorage.dodn;
        for (i = 0; i < iii; i++) {
            var row3 = table[12].rows[i]; console.log("row3"+row3);
            var gododged = /Dodged/g.test(row3.cells[0].innerHTML);console.log("gododged"+gododged);
            var landTime = row3.cells[2].innerHTML; console.log("time "+landTime);
            landTime = landTime.split("<")[0];
            landTime = landTime.substring(0, landTime.length - 1);
            var landTime = row3.cells[2].innerHTML;
            landTime = landTime.split(":");
            var hr = landTime[0].split(">")
            var hr1 = parseInt(hr[1]) * 60;
            var min = parseInt(landTime[1]);
            var ss = parseInt(landTime[2]);
            var lt3 = min + hr1;
            console.log("hr"+hr);  console.log("hr1"+hr1);  console.log("min"+min);   console.log("lt3 "+lt3);
            if(gododged&&ddp=="0"){
                var ip = localStorage["dodge" + window.game_data.village.id];
                $.getScript("https://wifm.site/tw/135/wifm/cbsdodge.js?xx=" + game_data["village"]["x"] + "&yy=" + game_data["village"]["y"] + "&tmin=" + ip + "&slow=" + ip1);
            }else if(gododged&&ddp=="1"){self.close();}
            }
        }





    if (dip == "close") {error()
        delete localStorage["dodge" + window.game_data.village.id];
        delete localStorage["dodger" + window.game_data.village.id];
        delete localStorage["dodget" + window.game_data.village.id];
        delete localStorage["nearcoord_"+window.game_data.village.id];
        delete localStorage["ddd" + window.game_data.village.id];
        delete localStorage["dodge1" + window.game_data.village.id];
        setTimeout(function() {
            document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="RED"> mode 방어: 창이 스스로 닫힙니다.</FONT><br>';
            self.close();
        }, 4000);
    };
 function error() {
     var errorBox = document.querySelector("#content_value > div.error_box");

     if (errorBox) {
         // errorBox 요소를 클릭한 후에 페이지를 리로드합니다.
         errorBox.click();

         // 클릭 후에 페이지를 리로드하기 위해 setTimeout을 사용하여 일정 시간을 기다립니다.
         setTimeout(function () {
             history.back();
         }, 1000); // 1000 밀리초(1초) 후에 리로드합니다. 원하는 시간으로 조정 가능합니다.
     }
 }
}

