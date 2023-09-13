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
        localStorage.setItem("nearcoord_"+window.game_data.village.id, coord3);
        localStorage.setItem("dodge"+window.game_data.village.id, coord3);
        console.log(coord3);
    }


    var coordSplit = coord3.split("|");
    document.forms[0].x.value = coordSplit[0];
    document.forms[0].y.value = coordSplit[1];
}
fnFillRallyPoint();
var coord3=localStorage["nearcoord_"+window.game_data.village.id];
var sent="0"
var now=localStorage.now
var dtime=localStorage["dodge"+window.game_data.village.id];
var dmax=localStorage["dodger"+window.game_data.village.id];
var ddp = localStorage["dodge1" + window.game_data.village.id];if(!ddp){ddp="0";localStorage["dodge1" + window.game_data.village.id]="0";};
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
if (light > 10 || catapult > 10 || archer>10|| heavy > 5 || spy>10 || spear>10 || sword>10 || axe > 10 || snob > 0 ||knight>0){


    document.forms[0].light.value = Math.floor(document.querySelector("#unit_input_light").getAttribute("data-all-count") * 0.9999);
    document.forms[0].catapult.value = Math.floor(document.querySelector("#unit_input_catapult").getAttribute("data-all-count")* 0.99);
    document.forms[0].heavy.value = Math.floor(document.querySelector("#unit_input_heavy").getAttribute("data-all-count") * 0.9999);
    document.forms[0].spy.value = Math.floor(document.querySelector("#unit_input_spy").getAttribute("data-all-count") * 0.9999);
    document.forms[0].spear.value = Math.floor(document.querySelector("#unit_input_spear").getAttribute("data-all-count") * 0.9999);
    document.forms[0].sword.value = Math.floor(document.querySelector("#unit_input_sword").getAttribute("data-all-count") * 0.9999);
    document.forms[0].axe.value = Math.floor(document.querySelector("#unit_input_axe").getAttribute("data-all-count") * 0.9999);
    document.forms[0].ram.value = Math.floor(document.querySelector("#unit_input_ram").getAttribute("data-all-count") * 0.99);
    document.forms[0].knight.value = Math.floor(document.querySelector("#unit_input_knight").getAttribute("data-all-count"));
    document.forms[0].snob.value = Math.floor(document.querySelector("#unit_input_snob").getAttribute("data-all-count"));
    document.forms[0].archer.value = Math.floor(document.querySelector("#unit_input_archer").getAttribute("data-all-count") * 0.9999);
    document.forms[0].marcher.value = Math.floor(document.querySelector("#unit_input_marcher").getAttribute("data-all-count") * 0.9999);


    document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="RED">Dodge time='+dtime+'<br> Dodge! </FONT><br>';
//var audio = new Audio('https://logboss.net/tw/111/dodge.wav');audio.loop = true;audio.play();setTimeout(function(){audio.pause()},650);

    if(document.forms[0].x.value!=""){if(ddp="0"&&sent==1){
        localStorage["dodge"+window.game_data.village.id]= coord3
        setTimeout(function(){document.forms[0].support.click();},1000);}}else{document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="RED"> 새로고침 합니다  Mode='+mode+' now='+now+' RELOADING</FONT> ';setTimeout(function(){location.reload();;},Math.floor(Math.random() * 900)+1200);}
    if(document.forms[0].x.value!=""&&ddp="1"){delete localStorage["dodge1"+window.game_data.village.id];self.close();}
}else{delete localStorage["dodge"+window.game_data.village.id];self.close();};
