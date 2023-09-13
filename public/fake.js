// check page
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


        var fake9 = localStorage.getItem("fake9");

        if (!fake9) {
            var coords = prompt("Please separate the coordinates with a space ex:111|222 111|333 111|444");
            localStorage.setItem("fake9", coords);
            console.log(coords);
        } else {
            var button = document.createElement("button");
            button.innerText = "reset";
            button.style.padding = "5px";
            button.style.border = "1px solid #ccc";
            button.style.backgroundColor = "#f0f0f0";

            button.addEventListener("click", function() {
                localStorage.removeItem("fake9");
                console.log("fake9 has been reset.");
            });

            var targetElement = document.querySelector("#content_value > table:nth-child(1) > tbody > tr > td:nth-child(2)");
            targetElement.appendChild(button);

            var all1 = localStorage.getItem("fake9");
            var coord = all1.split(' ');
            var coordSplit = coord[Math.floor(Math.random() * coord.length)].split('|');
            document.forms[0].x.value = coordSplit[0];
            document.forms[0].y.value = coordSplit[1];
            var spear = parseInt(document.forms[0].spear.nextSibling.nextSibling.innerHTML.match(/\d+/));
            var axe = parseInt(document.forms[0].axe.nextSibling.nextSibling.innerHTML.match(/\d+/));
            var rams = parseInt(document.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/));
            var cats = parseInt(document.forms[0].catapult.nextSibling.nextSibling.innerHTML.match(/\d+/));
            var spy = parseInt(document.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/\d+/));
            if (spy !== 0) {
                document.forms[0].spy.value = 1;
            }
            if (rams !== 0) {
                document.forms[0].ram.value = 1;
            } else {
                if (cats !== 0) {
                    document.forms[0].catapult.value = 1;
                } else {
                    if (spear !== 0) {
                        document.forms[0].spear.value = 1;
                    } else {
                        if (axe !== 0) {
                            document.forms[0].axe.value = 1;
                        }
                    }
                }
            }

        }

    } else {
        alert("Please move to rallypoint");
        var bbb = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=place";
        window.location.href = bbb;
    }
}

// Call
checksrallypoint();