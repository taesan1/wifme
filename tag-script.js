//------------------------------
//Tribal Wars script: Sent / Return calculator
//Made by Erlend/Linoko
//Last updated: 31. March 2019
//------------------------------

var sentReturnTimesStorage = []; //Storage of [sentTimes, returnTimes] - date objects to optimize runtime, rather than repeated reading from DOM and running formatArrivals()

//------------------------------
//Run program at correct screen
//------------------------------

if($("#incomings_table")[0] == undefined){
    var r = confirm("This script must be run from the incomings overview, where you check the attacks to be requested for support! Open this window?");
    if (r === true) window.open("/game.php?/&screen=overview_villages&mode=incomings","_self");
}
else{
    if($("a[style='cursor:pointer']", $("#incomings_table"))[0] == undefined) main(); //Run script
    else console.log("Script already running!"); //Print message to console if script already running to avoid errors
}
//----------------------------------
//Define functions to use in program
//----------------------------------

function main(){//Main function to call necessary functions to display sent and return times in table
    var incRows = $("tr[class*='nowrap']", $("#incomings_table")), //Each tr element that contains an attack
        distances = getDistances(incRows), //Distance per row, return type is array containing distances
        arrivalTexts = [], //Arrival text per row
        units = []; //Unit array containing unit type per row
    
    for(var i = 0, thisUnit; i < incRows.length; i++){ //Push data from each row into variables defined above.
        //distances.push(Number(incRows[i].children[incRows[i].children.length-3].innerText));
        arrivalTexts.push(incRows[i].children[incRows[i].children.length-2].innerText);
        try{ //If image is no undefined, get unit name from image src
            thisUnit = $("img[src*='unit']", incRows[i])[0].src.split("/");
            units.push(thisUnit[thisUnit.length-1].split(".")[0]);
        }
        catch(ReferenceError){units.push("unknown");} //If image is undefined, set unit to "unknown"
    }

    var arrivalTimes = formatArrivals(arrivalTexts), //Get arrival time objects from table, stored in array each element corresponding to each row respectively
        travelTimesMs = getTravelTimes(units, distances), //Get travel times for each unit and distance per row
        sentReturnTimes = getSentReturnTimes(arrivalTimes, travelTimesMs), //Get array conatining: [sent time, return time]
        sentReturnText = formatSentReturnTimes(sentReturnTimes);
    sentReturnTimesStorage = sentReturnTimes;
    displayResults(sentReturnText);
}

function displayResults(srTimes){
    var incTable = $("tr", $("#incomings_table"));
    //Fix table header and footer
    incTable[0].innerHTML += "<th><a style='cursor:pointer' onclick='sortTable(\"0\")'>Sent</a></th><th style='cursor:pointer' onclick='sortTable(\"1\")'><a>Return</a></th>";
    $("th[colspan]", incTable).attr("colspan", incTable[0].children.length-1);

    for(var i = 0; i < srTimes.length; i++){
        //var test = $("span:contains(':')", $("#incomings_table")[0].children[1].children[i+1]).clone(true);
        incTable[i+1].innerHTML += "<td>" + srTimes[i][0] +"</td><td>"+ srTimes[i][1] +"</td>";
        //$("span:contains(':')", $("#incomings_table")[0].children[1].children[i+1]).replaceWith(test);
        //$("span:contains(':')", $("#incomings_table")[0].children[1].children[i+1]).trigger("timer_end");
    }
}

function getDistances(incRows){
    var distances = [];
    for(var i = 0; i < incRows.length; i++){
        var targetCoords = [],
            originCoords = [];
        //Use regex to find coords. Pattern example to look for: ") K55" at end of <td> text, then coordinates are always given by "(xxx|yyy" before that. 
        targetCoords.push(incRows[i].children[1].innerText.split(/\)\s\w\d{2}$/)[0].substr(-7,3)); //Find x-coordinate (xxx|yyy) of target
        targetCoords.push(incRows[i].children[1].innerText.split(/\)\s\w\d{2}$/)[0].substr(-3,3)); //Find y-coordinate (xxx|yyy) of target
        originCoords.push(incRows[i].children[2].innerText.split(/\)\s\w\d{2}$/)[0].substr(-7,3)); //Find x-coordinate (xxx|yyy) of origin
        originCoords.push(incRows[i].children[2].innerText.split(/\)\s\w\d{2}$/)[0].substr(-3,3)); //Find y-coordinate (xxx|yyy) of origin

        distances.push( Math.abs(Math.sqrt(Math.pow((targetCoords[0]-originCoords[0]),2)+Math.pow((targetCoords[1]-originCoords[1]),2))) );
    }
    return distances;
}

function formatArrivals(arrivalTexts){ //Returns a date object for arrival times -> Array where each element corresponds to rowNr
    var d = new Date(Timing.getCurrentServerTime()),
        arrivalD, //Array of arrival date objects
        arrivals = [];
    //First get arrival dates.
    for(var i = 0; i < arrivalTexts.length; i++){
        var timeText = arrivalTexts[i].match(/\d{2}\:\d{2}:\d{2}\:\d{3}/)[0], //Look for and get "dd:dd:dd:ddd" from arrival time
            dateText = arrivalTexts[i].split(/\s\d{2}\:\d{2}:\d{2}\:\d{3}/)[0]; //Look for " dd:dd:dd:ddd" and get what is written before that (today/tomorrow/on dd.dd. at)
        if(lang["aea2b0aa9ae1534226518faaefffdaad"].includes(dateText)) arrivalD = d; //If today, set date to today
        else if(lang["57d28d1b211fddbb7a499ead5bf23079"].includes(dateText)) arrivalD = new Date(d.getTime() + 24*60*60*1000); //Else if tomorrow, add one day to today
        else{// If some day later, get appropriate date
            var arrivalY = d.getFullYear(), //Arrival year, set to this year as default
                arrivalM = Number(dateText.match(/\d\d\.\d\d/)[0].split(".")[1]), //Arrival month
                arrivalD = Number(dateText.match(/\d\d\.\d\d/)[0].split(".")[0]); //Arrival day
            if(arrivalM < d.getMonth()) arrivalY++; //If arrival month is smaller than current month, attack hits next year -> increment year
            var newD = new Date(arrivalY, arrivalM-1, arrivalD);
            arrivalD = new Date(newD.getTime());
        }
        arrivals.push(new Date(arrivalD.getFullYear(), arrivalD.getMonth(), arrivalD.getDate(), timeText.split(":")[0], timeText.split(":")[1], timeText.split(":")[2], timeText.split(":")[3]));
    }
    return arrivals;
}

function getTravelTimes(units, distances){ //Get travel times per incoming row given distance and unit
    var speedConstant = getSpeedConstant(), //Get speed constant (world speed * unit speed) for world
        travelTimesMs = [];
    for(var i = 0; i < units.length; i++) travelTimesMs.push(calcTime(units[i], distances[i], speedConstant));
    return travelTimesMs;
}

function calcTime(unit, distance, speedConstant){ //Calculate travel time for given unit, distance and speedConstant
    var unitSpeeds = {"spear" : 18, "sword" : 22, "axe" : 18, "archer" : 18,
        "spy" : 9, "light" : 10, "marcher" : 10, "heavy" : 11,
        "ram" : 30, "catapult" : 30, "knight" : 10,"snob": 35};
    //Return durations for a given unit, distance and speed constant (world speed * unit speed), 0 if unit is unknown or not tagged
    return unit != "unknown" ? Math.round( ( (unitSpeeds[unit] / speedConstant) * distance) * 60 ) * 1000 : 0;
}

function getSentReturnTimes(arrivalT, travelT){ //Get sent and return times based on arrival time object and travel time in milliseconds
    var sentReturnTimes = []; //[sentTime, returnTime]
    for(var i = 0; i < arrivalT.length; i++){
        var sentReturnT = [new Date(arrivalT[i].getTime() - travelT[i]), new Date(arrivalT[i].getTime() + travelT[i])];
        sentReturnT[1].setMilliseconds(0); //Set return milliseconds to zero
        if (travelT != 0) sentReturnTimes.push(sentReturnT);
        else sentReturnTimes.push([new Date(0), new Date(0)]); //Set times to zero date if unknown unit
    }
    return sentReturnTimes;
}

function formatSentReturnTimes(srTimes){ //Format sent and return times to "today at/tomorrow at/on %1 at %2"
    var srStrings = [];
    for(var i = 0; i < srTimes.length; i++){
        var sentTimeString = srTimes[i][0].toTimeString().match(/\d{2}\:\d{2}\:\d{2}/) + ":<span class='small grey'>" + formatNumber(srTimes[i][0].getMilliseconds(), "ms") + "</span>",
            returnTimeString = srTimes[i][1].toTimeString().match(/\d{2}\:\d{2}\:\d{2}/) + ":<span class='small grey'>" + formatNumber(srTimes[i][1].getMilliseconds(), "ms") + "</span>",
            sentString,
            returnString,
            d = new Date(Timing.getCurrentServerTime());
        if(srTimes[i][0].getDate()- d.getDate() == 0) sentString = lang["aea2b0aa9ae1534226518faaefffdaad"]; //lang[...] english: Today at %s
        else{
            sentString = lang["0cb274c906d622fa8ce524bcfbb7552d"].replace("%2", "%s"); //on %1 at %s
            sentString = sentString.replace("%1", formatNumber(srTimes[i][0].getDate(), "d") + "." + formatNumber(srTimes[i][0].getMonth()+1, "m") + ".") //on dd.mm. at %s
        }
        if(srTimes[i][1].getDate() - d.getDate() == 0) returnString = lang["aea2b0aa9ae1534226518faaefffdaad"]; //lang[...] english: Today at %s
        else if(srTimes[i][1].getDate() - d.getDate() == 1) returnString = lang["57d28d1b211fddbb7a499ead5bf23079"]; //lang[...] elglish: Tomorrow at %s
        else{
            returnString = lang["0cb274c906d622fa8ce524bcfbb7552d"].replace("%2", "%s"); //lang[...] english: on %1 at %s
            returnString = returnString.replace("%1", formatNumber(srTimes[i][1].getDate(), "d") + "." + formatNumber(srTimes[i][1].getMonth()+1, "m") + "."); //on dd.mm at %s
        }
        sentString = sentString.replace("%s",  sentTimeString); //%s is replaced with hh:mm:ss:uuu
        returnString = returnString.replace("%s", returnTimeString); //%s is replaced with hh:mm:ss:000
        srStrings.push([sentString, returnString]); //Append time strings for return
    }
    return srStrings;
}

function formatNumber(number, type){
    if(type == "ms"){ //Format milliseconds to always display 3 digits
        if(String(number).length == 1) return "00" + String(number); //returns 00x
        else if(String(number).length == 2) return "0" + String(number); //return 0xx
        else return String(number); //returns xxx
    }
    else if(type == "m" || type == "d"){ //format month/day to always display 2 digits
        if(String(number).length == 1) return "0" + String(number); //return 0x
        else return String(number); //return xx
    }
}

function sortTable(type){ //type = 0 is sort by sent, type = 1 is sort by return
    //Prepare tables for sorting
    var incRows = $("tr[class*='nowrap']", $("#incomings_table")),
        combinedSRR = []; //Link sentReturn-values with table html to sort
    //Make the combined table with {sent/return time, copy of row element(outerHTML), sentReturnTimeStorage}. Last is included to allow re-sorting of table
    for(var i = 0; i < incRows.length; i++) combinedSRR.push({"sr" : sentReturnTimesStorage[i][type], "row" : incRows[i].outerHTML, "log" : sentReturnTimesStorage[i]});

    //Sort by sent/return time using array sort function, the table elements and sentReturn log will be sorted accordingly as well
    combinedSRR.sort(function(a, b){return ((a.sr < b.sr) ? -1 : ((a.sr == b.sr) ? 0 : 1));});

    for (var i = 0, style = ["a","b"]; i < combinedSRR.length; i++) { //Display the sorted table
        if(combinedSRR[i].row.includes("row_"+style[(i+1)%2])) combinedSRR[i].row = combinedSRR[i].row.replace("row_"+style[(i+1)%2], "row_"+style[i%2]); //Ensure proper table formatting
        sentReturnTimesStorage[i] = combinedSRR[i].log; //Store the new sentReturnTimesStorage to allow re-sorting
        incRows[i].outerHTML = combinedSRR[i].row; //Replace outerHTML of table row at position [i] with sorted object
    }   
}

function getSpeedConstant() { //Get speed constant (world speed * unit speed) for world
    var stored = localStorage.incAnalyser; //Check if already stored for script
    if (stored !== undefined) {
        return Number(stored.split(":")[1]); //Return speed constant (x) from localstorage: "speedConstant:x" in localStorage.incAnalyser
    }
    else { //Get data from xml and save it in localStorage to avoid excessive XML requests to server
        var worldInfo = loadXMLDoc("/interface.php?func=get_config"), //Load world data
            worldSpeed = Number(worldInfo.getElementsByTagName("speed")[0].innerHTML),
            unitSpeed = Number(worldInfo.getElementsByTagName("unit_speed")[0].innerHTML);
        localStorage.setItem("incAnalyser", "speedConstant:"+String( worldSpeed * unitSpeed ));
        return worldSpeed * unitSpeed;
    }
}

 //Function for loading world info for world speed data, if unit speed and world speed is not yet stored. Will only be called once per world - result is stored in localStorage.
function loadXMLDoc(dname){
    if (window.XMLHttpRequest){
        xhttp=new XMLHttpRequest();
    }
    else{
        xhttp=new ActiveXObject("Microsoft.XMLDOM");
    }
    xhttp.open("GET",dname,false);
    xhttp.send();
    return xhttp.responseXML;
}