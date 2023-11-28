javascript:
    if(!document.getElementById("checkbox_wood").checked){document.querySelector("#checkbox_wood").click();}
if(!document.getElementById("checkbox_stone").checked){document.querySelector("#checkbox_stone").click();}
if(!document.getElementById("checkbox_iron").checked){document.querySelector("#checkbox_iron").click();}
var  ti=ti*3600,m,wr,cr,ir,row,mer;
var table = document.getElementById("village_list");
for(var j=1;j<(document.forms[0].elements.length/4)-1;j++){
    row = table.rows[j];
    var t=row.cells[1].innerHTML;
    t=(parseInt(t.split(":")[0])*3600)+(parseInt(t.split(":")[1])*60)+parseInt(t.split(":")[2]);
    if(t<ti){
        var wr=parseInt(document.querySelector("#village_list > tbody > tr:nth-child("+j+") > td.wood > span > span").innerText.replace('.', ''));
        var cr=parseInt(document.querySelector("#village_list > tbody > tr:nth-child("+j+") > td.stone > span > span").innerText.replace('.', ''));
        var ir=parseInt(document.querySelector("#village_list > tbody > tr:nth-child("+j+") > td.iron > span > span").innerText.replace('.', ''));
//console.log(wr+" "+parseInt(337*m)+" "+cr+" "+parseInt(361*m)+" "+ir+" "+parseInt(301*m));

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
