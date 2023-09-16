var scriptData = {
    prefix: 'incomingsOverview',
    name: 'Incomings Overview',
    version: 'v2.5.0',
    author: 'RedAlert',
    authorUrl: 'https://twscripts.dev/',
    helpLink:
        'https://forum.tribalwars.net/index.php?threads/incomings-overview.286459/',
};
// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;
if (typeof NOBLE_GAP === 'undefined') NOBLE_GAP = 100;
if (typeof FORMAT === 'undefined') FORMAT = ' %unit% | %sent%';
if (typeof CHECK_ALL_PAGES === 'undefined') CHECK_ALL_PAGES = false;

// Local Storage
var LS_PREFIX = `${scriptData.prefix}`;
var TIME_INTERVAL = 60 * 60 * 1000 * 24 * 1; /* fetch data every 1 day */
var LAST_UPDATED_TIME = localStorage.getItem(`${LS_PREFIX}_last_updated`) ?? 0;

var unitInfo;

var units = {
    spear: 'spear',
    sword: 'sword',
    axe: 'axe',
    archer: 'archer',
    spy: 'spy',
    light: 'lcav',
    marcher: 'marcher',
    heavy: 'hcav',
    ram: 'ram',
    cat: 'cat',
    snob: 'noble',
};

var coordsRegex = /\d{1,3}\|\d{1,3}/g;
// Init Debug
initDebug();

// Init Count API
countAPI();

/* Fetch unit info only when needed */
if (LAST_UPDATED_TIME !== null) {
    if (Date.parse(new Date()) >= LAST_UPDATED_TIME + TIME_INTERVAL) {
        fetchUnitInfo();
    } else {
        unitInfo = JSON.parse(localStorage.getItem(`${LS_PREFIX}_unit_info`));
    }
} else {
    fetchUnitInfo();
}
function back(){
    UI.InfoMessage('백타임 리네임이 시작됩니다', 1000);
    let tableLength = document.querySelector('#incomings_table > tbody')
        .rows.length;
    let updatesCounter = 0;
    let incomingsWithBacktime = jQuery(
        '#incomings_form tr .quickedit-label:contains("B:")'
    );
    let totalIncomings = jQuery('#incomings_form tr .quickedit-label');
    let missingBackTimes = 0;

    if (DEBUG) {
        console.debug(
            `${scriptInfo()} incomingsWithBacktime`,
            incomingsWithBacktime
        );
        console.debug(`${scriptInfo()} totalIncomings`, totalIncomings);
    }

    if (incomingsWithBacktime.length === totalIncomings.length) {
        UI.SuccessMessage('All incomings have backtime already added!');
    } else {
        for (let i = 2; i < tableLength; i++) {
            let attackName = document
                .querySelector(
                    '#incomings_table > tbody > tr:nth-child(' +
                    i +
                    ') > td:nth-child(1) > span > span > a:nth-child(1) > span.quickedit-label'
                )
                .innerHTML.replace(/(\r\n|\n|\r)/gm, '')
                .replace(/ /g, '')
                .toLowerCase();
            let commandName = jQuery(
                '#incomings_table > tbody > tr:nth-child(' +
                i +
                ') > td:nth-child(1)'
            )
                .text()
                .trim();

            let destination = jQuery(
                '#incomings_table > tbody > tr:nth-child(' +
                i +
                ') > td:nth-child(2) > a'
            )
                .text()
                .slice(0, -5)
                .slice(-7);
            let origin = jQuery(
                '#incomings_table > tbody > tr:nth-child(' +
                i +
                ') > td:nth-child(3) > a'
            )
                .text()
                .slice(0, -5)
                .slice(-7);
            let incTime = jQuery(
                '#incomings_table > tbody > tr:nth-child(' +
                i +
                ') > td:nth-child(6)'
            ).text();

            let x1 = destination.substr(0, 3);
            let y1 = destination.slice(-3);
            let x2 = origin.substr(0, 3);
            let y2 = origin.slice(-3);

            let x = Math.abs(x1 - x2);
            let y = Math.abs(y1 - y2);
            x = x * x;
            y = y * y;
            let distance = Math.sqrt(x + y);

            let unitSpeed;
            if (
                attackName.includes(units.axe) ||
                attackName.includes(units.spear) ||
                attackName.includes(units.archer)
            ) {
                unitSpeed = unitInfo.config['axe'].speed;
            } else if (attackName.includes(units.sword)) {
                unitSpeed = unitInfo.config['sword'].speed;
            } else if (attackName.includes(units.spy)) {
                unitSpeed = unitInfo.config['spy'].speed;
            } else if (
                attackName.includes(units.light) ||
                attackName.includes(units.marcher)
            ) {
                unitSpeed = unitInfo.config['light'].speed;
            } else if (attackName.includes(units.heavy)) {
                unitSpeed = unitInfo.config['heavy'].speed;
            } else if (
                attackName.includes(units.ram) ||
                attackName.includes(units.cat)
            ) {
                unitSpeed = unitInfo.config['ram'].speed;
            } else if (attackName.includes(units.snob)) {
                unitSpeed = unitInfo.config['snob'].speed;
            }

            let time = unitSpeed * distance;
            time = convertToTime(time);
            let subIncTime = incTime.match(/(\d{2}:){2}\d\d/g)[0];
            let backtime = calculateTimeDifference(
                subIncTime,
                time,
                incTime
            );

            let formattedBacktimeTime = formatBackTimeTime(backtime);

            /* Only rename incoming if backtime has not been added yet and incoming has been tagged */
            if (unitSpeed) {
                if (!commandName.includes('B:')) {
                    setTimeout(() => {
                        let newCommandName = `${commandName} Back:${formattedBacktimeTime}`;
                        jQuery(
                            '#incomings_table > tbody > tr:nth-child(' +
                            i +
                            ') .rename-icon'
                        ).click();
                        jQuery(
                            '#incomings_table > tbody > tr:nth-child(' +
                            i +
                            ') .quickedit-edit input[type="text"]'
                        ).val(newCommandName);
                        jQuery(
                            '#incomings_table > tbody > tr:nth-child(' +
                            i +
                            ') .quickedit-edit input[type=button]'
                        ).click();
                        updatesCounter++;
                    }, i * 160);
                }
            } else {
                missingBackTimes++;
            }
        }

        if (updatesCounter > 0) {
            UI.SuccessMessage('Backtime was added on incoming label!');
        }

        if (missingBackTimes > 0) {
            UI.ErrorMessage('Tag incomings before adding backtimes!');
        }
    }
};
// Helper: Format as number
function formatAsNumber(number) {
    return parseInt(number).toLocaleString('de');
}

// Helper: Get parameter by name
function getParameterByName(name, url = window.location.href) {
    return new URL(url).searchParams.get(name);
}

// Helper: Count API
function countAPI() {
    const { author, prefix } = scriptData;
    jQuery.getJSON(
        `https://api.countapi.xyz/hit/${author}/${prefix}`,
        function ({ value }) {
            console.debug(
                `${scriptInfo()} This script has been run ${formatAsNumber(
                    parseInt(value)
                )} times.`
            );
        }
    );
}
/* Helper: Fetch World Unit Info */
function fetchUnitInfo() {
    jQuery
        .ajax({
            url: '/interface.php?func=get_unit_info',
        })
        .done(function (response) {
            unitInfo = xml2json($(response));
            localStorage.setItem(
                `${LS_PREFIX}_unit_info`,
                JSON.stringify(unitInfo)
            );
            localStorage.setItem(
                `${LS_PREFIX}_last_updated`,
                Date.parse(new Date())
            );
        });
}

/* Helper: XML to JSON converter */
var xml2json = function ($xml) {
    var data = {};
    $.each($xml.children(), function (i) {
        var $this = $(this);
        if ($this.children().length > 0) {
            data[$this.prop('tagName')] = xml2json($this);
        } else {
            data[$this.prop('tagName')] = $.trim($this.text());
        }
    });
    return data;
};
/* Convert minutes to HH:MM:SS */
function convertToTime(duration) {
    let seconds = (duration - parseInt(duration)) * 60;
    seconds = Math.round(seconds);
    duration = parseInt(duration);
    let minutes = duration % 60;
    duration = duration - minutes;
    let hours = duration / 60;
    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);
    seconds = ('0' + seconds).slice(-2);
    return hours + ':' + minutes + ':' + seconds;
}
// Helper: Add two times
function calculateTimeDifference(time1, time2, incTime) {
    let time1Split = time1.split(':');
    let time2Split = time2.split(':');
    let s1 = parseInt(time1Split[2]);
    let m1 = parseInt(time1Split[1]);
    let h1 = parseInt(time1Split[0]);
    let s2 = parseInt(time2Split[2]);
    let m2 = parseInt(time2Split[1]);
    let h2 = parseInt(time2Split[0]);
    let s = s1 + s2;
    let m = m1 + m2;
    let h = h1 + h2;

    while (s >= 60) {
        s = s - 60;
        m = m + 1;
    }

    while (m >= 60) {
        m = m - 60;
        h = h + 1;
    }

    let days = 0;
    while (h >= 24) {
        h = h - 24;
        days++;
    }

    if (incTime.includes('tomorrow at')) {
        days = days + 1;
    }

    let hr = h;
    let min = m;
    let sec = s;
    let day;

    if (days === 0) {
        day = '0D ';
    } else if (days === 1) {
        day = '1D ';
    } else {
        day = days + 'D ';
    }

    hr = ('0' + hr).slice(-2);
    min = ('0' + min).slice(-2);
    sec = ('0' + sec).slice(-2);

    return day + hr + ':' + min + ':' + sec;
}

// Helper: Calculate backtime time
function formatBackTimeTime(backtime) {
    const [day, hoursAndMinutes] = backtime.split(' ');
    const [hours, minutes, seconds] = hoursAndMinutes.split(':');

    // server date time
    const serverTime = jQuery('#serverTime').text();
    const serverDate = jQuery('#serverDate').text();
    const [serverDay, serverMonth, serverYear] = serverDate.split('/');
    const serverTimeFormatted =
        serverYear + '-' + serverMonth + '-' + serverDay + ' ' + serverTime;
    const serverDateTimeUnix = new Date(serverTimeFormatted).getTime();

    let backtimeTime = new Date();

    if (parseInt(day) > 0) {
        backtimeTime = new Date(backtimeTime).setDate(
            new Date(serverDateTimeUnix).getDate() + parseInt(day)
        );
    }
    backtimeTime = new Date(backtimeTime).setHours(parseInt(hours));
    backtimeTime = new Date(backtimeTime).setMinutes(parseInt(minutes));
    backtimeTime = new Date(backtimeTime).setSeconds(parseInt(seconds));

    return formatDateTime(backtimeTime);
}
// Helper: Format date
function formatDateTime(date) {
    let currentDateTime = new Date(date);

    var currentYear = currentDateTime.getFullYear();
    var currentMonth = currentDateTime.getMonth();
    var currentDate = '' + currentDateTime.getDate();
    var currentHours = '' + currentDateTime.getHours();
    var currentMinutes = '' + currentDateTime.getMinutes();
    var currentSeconds = '' + currentDateTime.getSeconds();

    currentMonth = currentMonth + 1;
    currentMonth = '' + currentMonth;
    currentMonth = currentMonth.padStart(2, '0');

    currentDate = currentDate.padStart(2, 0);

    currentHours = currentHours.padStart(2, '0');
    currentMinutes = currentMinutes.padStart(2, '0');
    currentSeconds = currentSeconds.padStart(2, '0');

    let formatted_date =
        currentDate +
        '/' +
        currentMonth +
        '/' +
        currentYear +
        ' ' +
        currentHours +
        ':' +
        currentMinutes +
        ':' +
        currentSeconds;

    return formatted_date;
}
// Helper: Generates script info
function scriptInfo() {
    return `[${scriptData.name} ${scriptData.version}]`;
}

// Helper: Prints universal debug information
function initDebug() {
    console.debug(`${scriptInfo()} It works ��!`);
    console.debug(`${scriptInfo()} HELP:`, scriptData.helpLink);
    console.debug(`${scriptInfo()} NOBLE_GAP:`, NOBLE_GAP);
    console.debug(`${scriptInfo()} FORMAT:`, FORMAT);
    if (DEBUG) {
        console.debug(`${scriptInfo()} Market:`, game_data.market);
        console.debug(`${scriptInfo()} World:`, game_data.world);
        console.debug(`${scriptInfo()} Screen:`, game_data.screen);
        console.debug(`${scriptInfo()} Game Version:`, game_data.majorVersion);
        console.debug(`${scriptInfo()} Game Build:`, game_data.version);
        console.debug(`${scriptInfo()} Locale:`, game_data.locale);
        console.debug(
            `${scriptInfo()} Premium:`,
            game_data.features.Premium.active
        );
    }
}
back();