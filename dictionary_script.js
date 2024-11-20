// =============================  STRUCTURE OF CODES  ============================

// (1) declare global Variables
// (2) selectOptions.addclick{(e)}
// (3) checkBox.addClick{}
// (4) searchBtn.addClick{if(p){.style}else{.style}}
// (5) asyncfunctionsearching(p){try{Vapi_dataVresultVhtml,.innerHTML,.textContent,Vli,.innerHTML,VsynWords,.textContent,for(cond){.textContent++}vpartOfSpeech2,.innerHTML,VplayBtn,.addclick{VspeechWord,call}}catch(p)}
// (6) formEl.addSubmit(e){e.,.value,empty}
// (7) functionspeechText(p){vspeechText,.text,.voice,.speak}

// ==========================  ORIGINAL CODES  ===============================

const bodyEl = document.querySelector("body");
const checkBox = document.querySelector(".switch input");
const selectOptions = document.querySelector(".content select");

const searchBtn = document.querySelector(".search");
const formEl = document.querySelector("form");
const inputEl = document.querySelector("form input");

const dicContent = document.querySelector(".dictionary-content");
const partsOfSpeech = document.querySelector(".part-of-speech");

const ulEl = document.querySelector(".meanings");
const synEl = document.querySelector(".syn");
const verbEl = document.querySelector(".verb");

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

searchBtn.addEventListener("click", () => {// to use search
  // console.log("working");

  if (inputEl.value != "") {
    // console.log("working")
    searching(inputEl.value);
    inputEl.style.border = "";
    inputEl.value = "";
  } else {
    inputEl.style.border = "1px solid red";
  }
});

async function searching(data) {
  try {
    const api_data = await fetch(API_URL + data);
    const result = await api_data.json();
    const html = `
                <div class="sections">
                    <h2>${result[0].word}</h2>
                    <p>${result[0].phonetic}</p>
                </div>
                <i class="ri-play-circle-fill" class="playBtn"></i>
            </div>`;
    dicContent.innerHTML = html;
    partsOfSpeech.textContent = result[0].meanings[0].partOfSpeech;

    const li = `<li>${result[0].meanings[0].definitions[0].definition}
                </li>
                <li>${result[0].meanings[0].definitions[1].definition}
                </li>
                <li>${result[0].meanings[0].definitions[2].definition}
                </li>
    `;
    ulEl.innerHTML = li;
    const synWords = result[0].meanings[0].synonyms;
    synEl.textContent = "";
    for (let i = 0; i < synWords.length; i++) {
      synEl.textContent += synWords[i] + " ";
    }
    let partOfSpeech2 = `<div class="verb-content">
                          <h3>${result[0].meanings[1].partOfSpeech}</h3>
                          <p>Meaning</p>
                          <ul class="meanings">
                          <li>${result[0].meanings[1].definitions[0].definition}</li>
                          </ul>
                          </div>`;
    verbEl.innerHTML = partOfSpeech2;
    const playBtn = document.querySelector(".playBtn");
    playBtn.addEventListener("click", () => {
      const speechWord = result[0].word;
      speechText(speechWord);
    });
    console.log(result);
    
  } catch (error) {
    console.log(error);
  }
}
formEl.addEventListener("submit", (e) => {// to use Enter to sub,it
  e.preventDefault(); //to load right and well
  searching(inputEl.value);
  inputEl.value = "";
});
checkBox.addEventListener("click", () => {// to toggle between light and dark
  bodyEl.classList.toggle("dark");
});

selectOptions.addEventListener("click", (e) => {// all body fonts should be the ones that is selected
  let fonts = e.target.value;
  bodyEl.style.fontFamily = fonts;
});

function speechText(textSpeech) {
  let speechText = new SpeechSynthesisUtterance();
  speechText.text = textSpeech;
  speechText.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(speechText);
}

