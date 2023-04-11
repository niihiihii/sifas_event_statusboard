/* block 'double tap zoomin' */
let lastTouchEnd = 0; 

document.documentElement.addEventListener('touchend', function (event) {
     let now = (new Date()).getTime();
     if (now - lastTouchEnd <= 300) {
          event.preventDefault(); 
        } lastTouchEnd = now; 
    }, false);
/* block 'double tap zoomin' */

const ur_cards = document.querySelectorAll(".ur-card");
const sr_cards = document.querySelectorAll(".sr-card");

const ur_count = [];

for (let i = 0; i < ur_cards.length; i++) {
    ur_count.push(0);
}

const sr_count = [];

for (let i = 0; i < sr_cards.length; i++) {
    sr_count.push(0);
}

function displayCard(cards, count, num) {
    const limitbreaklink = "https://raw.githubusercontent.com/niihiihii/sifas_event_statusboard/main/limitbreak/";
    if (count[num] % 7 === 0) {
        cards[num].children[4].children[0].src = limitbreaklink + "overlay.png";
        cards[num].children[2].classList.add("invisible");
        cards[num].children[3].classList.add("invisible");
        cards[num].classList.remove("maxlimit");
    } else if (count[num] % 7 === 1) {
        cards[num].children[4].children[0].src = limitbreaklink + "limitbreak0.png";
        cards[num].children[2].classList.add("invisible");
        cards[num].children[3].classList.add("invisible");
        cards[num].classList.remove("maxlimit");
    } else if (count[num] % 7 === 2) {
        cards[num].children[4].children[0].src = limitbreaklink + "limitbreak1.png";
        cards[num].children[2].classList.add("invisible");
        cards[num].children[3].classList.add("invisible");
        cards[num].classList.remove("maxlimit");
    } else if (count[num] % 7 === 3) {
        cards[num].children[4].children[0].src = limitbreaklink + "limitbreak2.png";
        cards[num].children[2].classList.add("invisible");
        cards[num].children[3].classList.add("invisible");
        cards[num].classList.remove("maxlimit");
    } else if (count[num] % 7 === 4) {
        cards[num].children[4].children[0].src = limitbreaklink + "limitbreak3.png";
        cards[num].children[2].classList.add("invisible");
        cards[num].children[3].classList.add("invisible");
        cards[num].classList.remove("maxlimit");
    } else if (count[num] % 7 === 5) {
        cards[num].children[4].children[0].src = limitbreaklink + "limitbreak4.png";
        cards[num].children[2].classList.add("invisible");
        cards[num].children[3].classList.add("invisible");
        cards[num].classList.remove("maxlimit");
    } else {
        cards[num].children[4].children[0].src = limitbreaklink + "limitbreak5.png";
        cards[num].children[2].classList.remove("invisible");
        cards[num].children[3].classList.remove("invisible");
        cards[num].classList.add("maxlimit");
    }
    checkMaxLimit();
}

function checkMaxLimit() {
    const maxLimit = document.querySelectorAll(".maxlimit");
    if (ur_cards[0].children[4].classList.contains("maxLimitIsInvisible")) {
        for (let i = 0; i < maxLimit.length; i++) {
            maxLimit[i].classList.add("displayNone");
        }
    } else {
        for (let i = 0; i < maxLimit.length; i++) {
            maxLimit[i].classList.remove("displayNone");
        }
    }
}
function changeCard(cards, count, num) {
    count[num]++;
    displayCard(cards, count, num);
}

for (let i = 0; i < ur_count.length; i++) {
    ur_cards[i].addEventListener("click", () => changeCard(ur_cards, ur_count ,i));
}
for (let i = 0; i < sr_count.length; i++) {
    sr_cards[i].addEventListener("click", () => changeCard(sr_cards, sr_count, i));
}


/* Save Image Button */
function downImg(){
    const checkerboard = document.querySelector(".checkerboard");
	html2canvas(checkerboard,{ backgroundColor: "#180134", scale: 1408/checkerboard.offsetWidth, logging: true, letterRendering: 1, allowTaint: false,  useCORS: true }).then(function(canvas){
		const myImage = canvas.toDataURL();
		downloadURL(myImage, "image.png") 
	});
}

function downloadURL(url, name){
	const link = document.createElement("a")
	link.download = name;
	link.href = url;
	document.body.appendChild(link);
	link.click();
}

const downImgButton = document.querySelector(".downImgButton");
downImgButton.addEventListener("click", downImg);
/* Save Image Button */


/* Input Data Button */
const inputDataButton = document.querySelector(".inputDataButton");
const inputDataModal = document.querySelector(".inputDataModal");

inputDataButton.addEventListener("click", () => {
    inputDataModal.showModal();
});
/* Input Data Button */


/* (fes/party/normal)_count_input maxlength<=(fes/party/normal)_cards.length */
function DataHandleOnInput(el, cards) {
    if(el.value.length > cards.length) {
        el.value = el.value.substr(0, cards.length);
    }
}

const urDataInput = document.querySelector("#ur_data");
const srDataInput = document.querySelector("#sr_data");

urDataInput.addEventListener("keyup", () => {
    urDataInput.value = urDataInput.value.replace(/[^0-6]/g,'');
});
urDataInput.addEventListener("input", () => DataHandleOnInput(urDataInput, ur_cards));

srDataInput.addEventListener("keyup", () => {
    srDataInput.value = srDataInput.value.replace(/[^0-6]/g,'');
});
srDataInput.addEventListener("input", () => DataHandleOnInput(srDataInput, sr_cards));
/* (fes/party/normal)_count_input maxlength<=(fes/party/normal)_cards.length */


/* Apply Data Button */
function applyData() {
    const ur_count_input = document.getElementById("ur_data").value;
    const sr_count_input = document.getElementById("sr_data").value;
    const mapfn = (arg) => Number(arg)

    const ur_count_data = Array.from(ur_count_input, mapfn);
    const sr_count_data = Array.from(sr_count_input, mapfn);

    for (let i = 0; i < ur_count_data.length; i++) {
        ur_count[i] = ur_count_data[i];
    }
    
    for (let i = 0; i < sr_count_data.length; i++) {
        sr_count[i] = sr_count_data[i];
    }

    for (let i = 0; i < ur_count.length; i++) {
        displayCard(ur_cards, ur_count ,i);
    }
    for (let i = 0; i < sr_count.length; i++) {
        displayCard(sr_cards, sr_count ,i);
    }

    inputDataModal.close();
    
}

const applyDataButton = document.querySelector(".applyDataButton");
applyDataButton.addEventListener("click", applyData);
/* Apply Data Button */


/* Data Button */
function makeData() {
    for (let i = 0; i < ur_count.length; i++) {
        ur_count[i] = ur_count[i] % 7;
    }

    for (let i = 0; i < sr_count.length; i++) {
        sr_count[i] = sr_count[i] % 7;
    }
    let data = "ur_data = " + ur_count + "\n" + "sr_data = " + sr_count;
    data = data.replace(/,/g, "");
    return data;
}

const copyDataModal = document.querySelector(".copyDataModal");

    /* Print Data on Textarea */
function printData() {
    const data = makeData();
    const dataArea = document.querySelector(".dataArea");
    dataArea.value = data;
    copyDataModal.showModal();
}

const printDataButton = document.querySelector(".printDataButton");
printDataButton.addEventListener("click", printData);
    /* Print Data on Textarea */

function copyData() {
    const data = makeData();
    navigator.clipboard.writeText(data);
    alert("Data Copied"); 
}

const copyDataButton = document.querySelector(".copyDataButton");
copyDataButton.addEventListener("click", copyData);

const copyDataModalCloseButton = document.querySelector(".copyDataModalCloseButton");
copyDataModalCloseButton.addEventListener("click", () => {
    copyDataModal.close()
});
/* Data Button */

/* Idolized ON/OFF Switch */
function idolizedOnOff() {
    const unidolizedList = document.querySelectorAll(".unidolized");
    const idolizedList = document.querySelectorAll(".idolized");
    [].forEach.call(unidolizedList, function(unidolized) {
        unidolized.classList.toggle("displayNone");
    });
    [].forEach.call(idolizedList, function(idolized) {
        idolized.classList.toggle("displayNone");
    });
    if (unidolizedList[0].classList.contains("displayNone")) {
        idolizedSwitch.innerText = "Idolized\nON";
    } else {
        idolizedSwitch.innerText = "Idolized\nOFF"
    }  
}
const idolizedSwitch = document.querySelector(".idolizedSwitch");
idolizedSwitch.addEventListener("click", idolizedOnOff);
/* Idolized ON/OFF Switch */

/* Sort by Member ON/OFF Switch */
function sortByMemberOnOff() {
    const orderList = ["honoka",
                        "eli",
                        "kotori",
                        "umi",
                        "rin",
                        "maki",
                        "nozomi",
                        "hanayo",
                        "nico",
                        "chika",
                        "riko",
                        "kanan",
                        "dia",
                        "you",
                        "yoshiko",
                        "hanamaru",
                        "mari",
                        "ruby",
                        "ayumu",
                        "kasumi",
                        "shizuku",
                        "karin",
                        "ai",
                        "kanata",
                        "setsuna",
                        "emma",
                        "rina",
                        "shioriko",
                        "mia",
                        "lanzhu"];
    
    orderList.forEach(function(schoolidol) {
        let idol_cards = document.querySelectorAll("." + schoolidol);
        [].forEach.call(idol_cards, function(idol_card) {
            idol_card.classList.toggle(schoolidol + "__order");
        });
    });
    if (ur_cards[0].classList.contains("honoka__order")) {
        sortByMemberSwitch.innerText = "Sort by Member ON";
    } else {
        sortByMemberSwitch.innerText = "Sort by Member OFF";
    }
}

const sortByMemberSwitch = document.querySelector(".sortByMemberSwitch");

sortByMemberSwitch.addEventListener("click", sortByMemberOnOff);
/* Sort by Member ON/OFF Switch */



/* Change Card Style Button */
function changeCardStyle() {
    const signature = document.querySelectorAll(".signature");
    const rainbow = document.querySelectorAll(".rainbow");
    const limitbreak = document.querySelectorAll(".limitbreak");
    const maxLimit = document.querySelectorAll(".maxlimit");

    changeCardStyleButton_click_count++;
    if (changeCardStyleButton_click_count % 5 === 0) {
        for (let i = 0; i < signature.length; i++) {
            signature[i].classList.remove("displayNone");
            rainbow[i].classList.add("displayNone");
            limitbreak[i].classList.remove("maxLimitIsInvisible");
        }
        for (let i = 0; i < maxLimit.length; i++) {
            maxLimit[i].classList.remove("displayNone");
        }
        changeCardStyleButton.innerText = "Signature";
    } else if (changeCardStyleButton_click_count % 5 === 1) {
        for (let i = 0; i < signature.length; i++) {
            signature[i].classList.add("displayNone");
            rainbow[i].classList.remove("displayNone");
            limitbreak[i].classList.remove("maxLimitIsInvisible");
        }
        for (let i = 0; i < maxLimit.length; i++) {
            maxLimit[i].classList.remove("displayNone");
        }
        changeCardStyleButton.innerText = "Rainbow";
    } else if (changeCardStyleButton_click_count % 5 === 2) {
        for (let i = 0; i < signature.length; i++) {
            signature[i].classList.remove("displayNone");
            rainbow[i].classList.remove("displayNone");
            limitbreak[i].classList.remove("maxLimitIsInvisible");
        }
        for (let i = 0; i < maxLimit.length; i++) {
            maxLimit[i].classList.remove("displayNone");
        }
        changeCardStyleButton.innerText = "Signature + Rainbow";
    } else if (changeCardStyleButton_click_count % 5 === 3) {
        for (let i = 0; i < signature.length; i++) {
            signature[i].classList.add("displayNone");
            rainbow[i].classList.add("displayNone");
            limitbreak[i].classList.remove("maxLimitIsInvisible");
        }
        for (let i = 0; i < maxLimit.length; i++) {
            maxLimit[i].classList.remove("displayNone");
        }
        changeCardStyleButton.innerText = "none";
    } else {
        for (let i = 0; i < signature.length; i++) {
            limitbreak[i].classList.add("maxLimitIsInvisible");
        }
        for (let i = 0; i < maxLimit.length; i++) {
            maxLimit[i].classList.add("displayNone");
        }
        changeCardStyleButton.innerText = "invisible";
    }
}

const changeCardStyleButton = document.querySelector(".changeCardStyleButton");
let changeCardStyleButton_click_count = 0;
changeCardStyleButton.addEventListener("click", changeCardStyle);
/* Change Card Style Button */

/* Display UR SR Button */
function displayURSR() {
    const section_ur = document.querySelectorAll(".section__ur");
    const section_sr = document.querySelectorAll(".section__sr");
    displayURSRButton_click_count++;
    if (displayURSRButton_click_count % 3 === 0) {
        for (let i = 0; i < section_ur.length; i++) {
            section_ur[i].classList.remove("displayNone");
        }
        for (let i = 0; i < section_sr.length; i++) {
            section_sr[i].classList.remove("displayNone");
        }
        displayURSRButton.innerText = "UR + SR";
    } else if (displayURSRButton_click_count % 3 === 1) {
        for (let i = 0; i < section_ur.length; i++) {
            section_ur[i].classList.remove("displayNone");
        }
        for (let i = 0; i < section_sr.length; i++) {
            section_sr[i].classList.add("displayNone");
        }
        displayURSRButton.innerText = "UR";
    } else {
        for (let i = 0; i < section_ur.length; i++) {
            section_ur[i].classList.add("displayNone");
        }
        for (let i = 0; i < section_sr.length; i++) {
            section_sr[i].classList.remove("displayNone");
        }
        displayURSRButton.innerText = "SR";
    }
}
const displayURSRButton = document.querySelector(".displayURSRButton");
let displayURSRButton_click_count = 0;
displayURSRButton.addEventListener("click", displayURSR)
/* Display UR SR Button */


/* Settings Button */
const settingsModal = document.querySelector(".settingsModal");
const settingsButton = document.querySelector(".settingsButton");
settingsButton.addEventListener("click", () => {
    settingsModal.showModal()
});

const settingsModalCloseButton = document.querySelector(".settingsModalCloseButton");
settingsModalCloseButton.addEventListener("click", () => {
    settingsModal.close()
});
/* Settings Button */