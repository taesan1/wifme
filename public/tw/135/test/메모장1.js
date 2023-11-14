function sup() {
    UI.InfoMessage('회군 체크중 ', 2000);

    var aaContents = []; // aa 요소의 HTML을 저장할 배열

    for (c = 2; c < 2000; c++) {
        var selector = "#units_table tbody tr:nth-child(" + c + ") td:nth-child(2)";
        var d = document.querySelector(selector);

        if (d) {
            var cellText = d.textContent;
            if (/^[12345]$/.test(cellText)) {
                UI.InfoMessage('회군 목록을 나열합니다. ', 3000);
                console.log("찾았다: " + cellText);
                var aa = document.querySelector("#units_table tbody tr:nth-child(" + c + ")");
                aaContents.push(aa.innerHTML);
            } else {
                UI.InfoMessage('5필드 내에 회군할 병력이 없습니다 ', 3000);
                console.log("없다 ");
            }
        }
    }

    // 팝업 생성
    var popup = document.createElement("div");
    popup.id = "popup";
    popup.style.position = "fixed";
    popup.style.top = "10vw";
    popup.style.right = "10vw";
    popup.style.zIndex = "150";
    popup.style.width = "50%"; // 너비를 화면 너비의 90%로 설정
    popup.style.height = "50%"; // 높이를 화면 높이의 90%로 설정
    popup.style.padding = "10px";
    popup.style.background = "#ffffff scroll right top repeat";
    popup.style.borderWidth = "7px";
    popup.style.border = "1px solid #000000";

    // 팝업 드래그 가능하게 설정
    jQuery(popup).draggable();

    // 팝업 추가
    document.body.appendChild(popup);

    function showPopup() {
        // 팝업 내용 업데이트
        var popupContent = document.getElementById("popup");
        var aaContentsHTML = aaContents.map(function(aaContent) {
            return `<tr class="popup-div">${aaContent}</tr>`;
        }).join(''); // 각 aaContent를 <tr>로 묶어서 합칩니다

        popupContent.innerHTML = `
            <div class="popup-title">
                <h2>1~5필드내에 지원나간 방병</h2>
                <hr>
            </div>
            <div class="popup-content" style="overflow: auto; height: 70%;">
                <div class="draggable-area">
                    <div class="draggable-content">
                        <table class="popup-table" style="margin: 0; padding: 0; width: 100%;">
                            <tr>
                                <th>Village </th>
                            <th>distance</th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_spear.png" class="" data-title="Spear fighter"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_sword.png" class="" data-title="Swordsman"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_axe.png" class="" data-title="Axeman"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_archer.png" class="" data-title="Archer"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_spy.png" class="" data-title="Scout"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_light.png" class="" data-title="Light cavalry"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_marcher.png" class="" data-title="Mounted archer"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_heavy.png" class="" data-title="Heavy cavalry"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_ram.png" class="" data-title="Ram"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_catapult.png" class="" data-title="Catapult"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_knight.png" class="" data-title="Paladin"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_snob.png" class="" data-title="Nobleman"></th>
                            <th>Action</th>
                            </tr>
                            ${aaContentsHTML}
                        </table>
                    </div>
                </div>
            </div>
        <div class="popup-button">
            <input name="all" class="btn" type="submit" style="margin-right: 10px;" value="ALL 체크">
            <input name="submit_units_back" class="btn" type="submit" value="회군">
        </div>
        `;
        var popupCheckboxes = popupContent.querySelectorAll(".village_checkbox");
        popupCheckboxes.forEach(function(popupCheckbox) {
            popupCheckbox.addEventListener("click", function() {
                var value = popupCheckbox.getAttribute("value");
                var realCheckboxes = document.querySelectorAll('input[type="checkbox"][value="' + value + '"]');
                realCheckboxes.forEach(function(realCheckbox) {
                    realCheckbox.checked = popupCheckbox.checked;
                });
            });
        });
        // "Withdraw" 버튼 클릭 시 이벤트 처리
        var popupWithdrawButton = popupContent.querySelector('input[name="submit_units_back"]');
        if (popupWithdrawButton) {
            popupWithdrawButton.addEventListener("click", function() {
                var realWithdrawButton = document.querySelector('input[name="submit_units_back"]');
                if (realWithdrawButton) {
                    realWithdrawButton.click();
                }
            });
        }
        // "all" 버튼 클릭 시 이벤트 처리
        var popupAllButton = popupContent.querySelector('input[name="all"]');
        if (popupAllButton) {
            popupAllButton.addEventListener("click", function() {
                popupCheckboxes.forEach(function(popupCheckbox) {
                    popupCheckbox.checked = true; // 모든 체크박스를 체크
                    var value = popupCheckbox.getAttribute("value");
                    var realCheckboxes = document.querySelectorAll('input[type="checkbox"][value="' + value + '"]');
                    realCheckboxes.forEach(function(realCheckbox) {
                        realCheckbox.checked = true; // 실제 체크박스도 체크
                    });
                });
            });
        }


        // 팝업 표시
        popup.style.display = "block";
    }

    showPopup();
}

sup();
