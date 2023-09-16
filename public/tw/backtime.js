function back(){
    let tableLength = document.querySelector('#incomings_table > tbody')
        .rows.length;
    let updatesCounter = 0;
    let incomingsWithBacktime = jQuery(
        '#incomings_form tr .quickedit-label:contains("B:")'
    );
    let totalIncomings = jQuery('#incomings_form tr .quickedit-label');
    let missingBackTimes = 0;
    
    if (incomingsWithBacktime.length === totalIncomings.length) {
        UI.SuccessMessage(tt('All incomings have backtime already added!'));
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
                        let newCommandName = `${commandName} B:${formattedBacktimeTime}`;
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
            UI.SuccessMessage(tt('Backtime was added on incoming label!'));
        }

        if (missingBackTimes > 0) {
            UI.ErrorMessage(tt('Tag incomings before adding backtimes!'));
        }
    }
};
back();