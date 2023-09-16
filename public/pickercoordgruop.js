//crete popup
function popup1() {
    var popup = `
    <div id="coordinateGroupPopup">
      <h2>Set Coordinate Group</h2>
      <p>Count:<span id="coordinateCount">0</span></p>
      <textarea id="coordinates" placeholder="Enter your village coordinates here"></textarea>
      <button id="picker">picker</button>
      <span class="buttons-right">
        <button id="record">record</button>
      </span>
    </div>
    <style>
      #coordinateGroupPopup {
        position: fixed;
        top: 40vw;
        right: 40vw;
        z-index: 150;
        width: 400px;
        padding: 10px;
        background: #868686 scroll right top repeat;
        border-width: 7px;
        border: 1px solid #000000;
      }
      #coordinateGroupPopup textarea {
        width: 100%;
        height: 100px;
        resize: none;
        box-sizing: border-box;
        margin-bottom: 5px;
      }
      #coordinateCount {
        font-weight: 600;
      }
      .buttons-right {
        float: right;
      }
    </style>
  `;
    var pup = jQuery(popup);
    jQuery('body').append(pup);
    jQuery('#coordinateGroupPopup').draggable();


// Add input event for the coordinates textarea
    jQuery('#coordinates').on('input', function() {
        const coords = extractCoordinates(jQuery(this).val());
        jQuery('#coordinateCount').text(coords.length);
        jQuery(this).val(coords.join('\n'));
    });

// Extract coordinates from a string
    function extractCoordinates(str) {
        const coordPattern = /(\d{1,3}\|\d{1,3})/g;
        return str.match(coordPattern) || [];
    }

//coord picker and checkbox
    jQuery('#picker').on('click', function() {
        var coords = extractCoordinates(jQuery('#coordinates').val());
        var failedCoords = [];
        let processedCount = 0;

        function processNextCoord() {
            if (processedCount < coords.length) {
                const coord = coords[processedCount];
                const coordElem = jQuery(`#group_assign_table > tbody > tr:has(span.quickedit-label:contains("${coord}"))`);

                if (coordElem.length) {
                    coordElem.find('td:nth-child(1) > input[type=checkbox]').prop('checked', true);
                    UI.InfoMessage(`Selected coordinate: ${coord}`, 5000);
                } else {
                    failedCoords.push(coord);
                    UI.ErrorMessage(`Failed to find coordinate: ${coord}`, 5000);
                }

                processedCount++;
                const progress = `${processedCount}/${coords.length}`;
                UI.InfoMessage(`Progress: ${progress}`, 3000);

                // 다음 작업을 일정 시간 후에 실행
                setTimeout(processNextCoord, 250); // 0.25초마다 작업 실행
            } else {
                // Show successful and failed coordinates with notification window after all operations are completed
                var successMessage = `Successful coordinates: ${coords.length - failedCoords.length}\n`;
                var failedMessage = `Failed coordinates: ${failedCoords.length}\n`;

                if (failedCoords.length > 0) {
                    failedMessage += failedCoords.join(', ');
                }

                alert(successMessage + failedMessage);


                localStorage.setItem('pickercoord', JSON.stringify(coords));
            }
        }

        // 첫 번째 작업 시작
        processNextCoord();
    });

    jQuery('#record').on('click', function() {
        var savedCoords = localStorage.getItem('pickercoord');
        if (savedCoords) {
            var coords = JSON.parse(savedCoords);
            var textarea = jQuery('#coordinates');
            textarea.val(coords.join('\n'));
            jQuery('#coordinateCount').text(coords.length);
        }
    });
}
// check page
var sitter = "";
var bbb = window.location.href;
var villageid = (bbb.split("village=")[1]).split("&")[0];
if (/t=/g.test(bbb)) {
    sitter = "t=" + (bbb.split("t=")[1]).split("&")[0];
}

function checkOverviewVillages() {
    var aaa = window.location.href;
    var targetUrl = "screen=overview_villages&mode=groups&type=static";
    var isTargetPage = aaa.includes(targetUrl);

    if (isTargetPage) {
        // Call the popup1 function
        popup1();
    } else {
        alert("Please move to the Manual Groups overview screen");
        var bbb = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=overview_villages&mode=groups&type=static";
        window.location.href = bbb;
    }
}

// Call the checkOverviewVillages function
checkOverviewVillages();

