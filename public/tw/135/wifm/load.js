javascript:
    function NextVillage(){document.querySelector("#village_switch_right").click();
    };

load();


var load1=setInterval(load,5000);
function load(){console.log("load");
    if(localStorage.now=="대기"){
        var spear = parseInt(document.forms[0].spear.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var axe = parseInt(document.forms[0].axe.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var light = parseInt(document.forms[0].light.nextSibling.nextSibling.innerHTML.match(/\d+/));
        //var marcher = parseInt(document.forms[0].marcher.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var spy = parseInt(document.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var rams = parseInt(document.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var cats = parseInt(document.forms[0].catapult.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var hc = parseInt(document.forms[0].heavy.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var snob = parseInt(document.forms[0].snob.nextSibling.nextSibling.innerHTML.match(/\d+/));

        if(axe==0&&rams==0&&cats==0&&spear==0){NextVillage();}else
        {var group=localStorage.group;var nuke=localStorage.nuke;
            if (localStorage["fake"+window.game_data.village.id]==1){delete localStorage["fake"+window.game_data.village.id];NextVillage();}else{
                if(nuke>0&&snob==0&&light>=2000&&axe>=4000){$.getScript("https://logboss.net/tw/111/autonukerotate.php?s="+nuke);}
//if(nuke>0&&cats>=40){$.getScript("https://logboss.net/tw/111/autocatrotate.php?s="+nuke);}
                else{$.getScript("https://wifm.site/tw/135/wifm/fake.js?group=" +group);}
            }}}}



