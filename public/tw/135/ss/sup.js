
function sup(){
    UI.InfoMessage('회군 체크중 ',1000);
// 팝업 생성
var popup = document.createElement("div");
popup.id = "popup";
popup.style.position = "fixed";
popup.style.top = "10vw";
popup.style.right = "10vw";
popup.style.zIndex = "150";
popup.style.width = "60vw";
popup.style.height = "50vh";
popup.style.padding = "10px";
popup.style.background = "#ffffff scroll right top repeat";
popup.style.borderWidth = "7px";
popup.style.border = "1px solid #000000";
popup.style.display = "none"; // 초기에는 숨겨진 상태

// 팝업 드래그 가능하게 설정
jQuery(popup).draggable();

// 팝업 추가
document.body.appendChild(popup);

var c;
for (c = 2; c < 9999; c++) {
    var selector = "#units_table tbody tr:nth-child(" + c + ") td:nth-child(2)";
    var d = document.querySelector(selector);

    if (d) {
        var cellText = d.textContent;
        if (/^[12345]$/.test(cellText)) {
            UI.InfoMessage('회군 목록을 나열합니다. ',1000);
            console.log("찾았다: " + cellText);
            var aa = document.querySelector("#units_table tbody tr:nth-child(" + c + ")");
            showPopup(aa);
        } else {UI.InfoMessage('5필드 내에 회군할 병력이 없습니다 ',1000);
            console.log("없다 ");
        }
    }
}

function showPopup(aa) {
    // 팝업 내용 업데이트
    var popupContent = document.getElementById("popup");
    popupContent.innerHTML = `
        <div class="popup-title">
            <h2>1~5필드내에 지원나간 방병</h2>
            <hr>
        </div>
        <div class="popup-content">
            <div class="draggable-area">
                <div class="draggable-content">
                    <table class="popup-table">
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
                        ${aa.innerHTML}
                    </table>
                </div>
            </div>
        </div>
        <div class="popup-button">
            <input type="button" class="btn" value="회군">
        </div>
    `;

    // "aa"의 폰트 크기를 조절
    var aaContent = popupContent.querySelector(".draggable-content");
    aaContent.style.fontSize = "20px"; // 예시로 폰트 크기를 20px로 설정

    // 각각의 <td>를 테두리로 구분
    var tdElements = popupContent.querySelectorAll(".popup-table td");
    tdElements.forEach(function(td) {
        td.style.border = "1px solid #000"; // 테두리 스타일 적용
        td.style.padding = "5px"; // 각 셀의 내용과 테두리 사이의 간격 설정
    });

    // 팝업 버튼 클릭 시 이벤트 처리
    var buttonElement = popupContent.querySelector(".btn");
    buttonElement.addEventListener("click", function() {
        var btnToClick = document.querySelector("#overview_form > input.btn");
        if (btnToClick) {
            btnToClick.click();
        }
    });

    // 팝업 체크박스 클릭 시 이벤트 처리
    var popupCheckbox = popupContent.querySelector(".village_checkbox");
    if (popupCheckbox) {
        popupCheckbox.addEventListener("click", function() {
            var realCheckbox = document.querySelector(".village_checkbox");
            if (realCheckbox) {
                realCheckbox.checked = popupCheckbox.checked;
            }
        });
    }

    // 팝업 표시
    popup.style.display = "block";
}
};
sup();