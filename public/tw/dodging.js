
var sitter = "";
var bbb = window.location.href;
var villageid = (bbb.split("village=")[1]).split("&")[0];
if (/t=/g.test(bbb)) {
    sitter = "t=" + (bbb.split("t=")[1]).split("&")[0];
}

function checksrallypoint() {
    var aaa = window.location.href;
    var targetUrl = "screen=place";
    var isTargetPage = aaa.includes(targetUrl);
    if (isTargetPage) {
        async function fnFillRallyPoint() {
            var sitter = "";
            var link = window.location.href;
            var villageid = (link.split("village=")[1]).split("&")[0];
            if (/t=/g.test(link)) {
                sitter = "t=" + (link.split("t=")[1]).split("&")[0]
            };

            var htmlCode = await $.get(document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid +"&screen=place&mode=neighbor");

// 필요한 요소들을 찾아서 값을 얻는 방법
            var f = $(htmlCode).find("#content_value")
                .find("table")
                .find("tr:nth-child(2)")
                .find("td:nth-child(1)");

            if (f.length > 0) {
                var crd = f[0].innerText;
                var coord3 = crd.match(/\(([^)]+)\)/)[1]; // 괄호 안의 내용 추출
                localStorage.setItem("nearcoord_"+window.game_data.village.id, coord3)
                console.log(coord3);
            }


            var coordSplit = coord3.split("|");
            document.forms[0].x.value = coordSplit[0];
            document.forms[0].y.value = coordSplit[1];
        }
        fnFillRallyPoint();
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
        if (light > 6 || catapult > 10 || archer > 10 || heavy > 6 || spy > 10 || spear > 10 || sword > 10 || axe > 10 || snob > 0|| ram > 10) {
            var random = Math.floor(Math.random() * 5) + 2;
            if (spy > 2) {
                spy = spy - 3;
            } else {
                spy = 0;
            };
            if (ram>5){ ram=ram-random;} else {ram=0;};
            if (catapult>5){ catapult=catapult-random;} else {catapult=0;};
            if (spear > 2) {
                spear = spear - 2;
            } else {
                spear = 0;
            }
            if (sword > 5) {
                sword = sword - random;;
            } else {
                sword = 0;
            }
            if (archer > 5) {
                archer = archer -random;;
            }else{
                archer = 0;
            }
            document.forms[0].light.value =light;
            document.forms[0].catapult.value =catapult;
            document.forms[0].archer.value =archer;
            document.forms[0].marcher.value =marcher;
            document.forms[0].heavy.value =heavy;
            document.forms[0].spy.value =spy;
            document.forms[0].spear.value =spear;
            document.forms[0].sword.value =sword;
            document.forms[0].axe.value =axe;
            document.forms[0].ram.value =ram;
            document.forms[0].snob.value =snob;
            document.forms[0].knight.value =knight;
        }else{ UI.InfoMessage('no need dodge', 2000);console.log("dodge xx");}

    }
    else {
        alert("Please move to rallypoint");
        var bbb = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=place";
        window.location.href = bbb;
    }}
// Call
checksrallypoint();


