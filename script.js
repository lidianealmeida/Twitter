let tweetButton = document.getElementsByClassName("tweet-button")[0];
let tweetInput = document.getElementsByClassName("tweet-input")[0];
let tweetForm = document.getElementsByClassName("tweet-form")[0];
let charCounter = document.getElementsByClassName("character-counter")[0];

// Habilitar e desabilitar botão
tweetInput.addEventListener("keydown", enableButton);
tweetInput.addEventListener("keyup", enableButton);

function enableButton() {
  tweetButton.disabled = false;
  tweetButton.style.cursor = "pointer";
  tweetButton.style.opacity = "1";
  tweetInput.addEventListener("keydown", startCounting);
  tweetInput.addEventListener("keyup", startCounting);
}

function disableButton () {
  tweetButton.style.opacity = "0.3";
  tweetButton.style.cursor = "not-allowed";
  tweetButton.disabled = true;  
}

// Contar caracteres
function startCounting() {
  let charAllowed = 140;
  let typedChar = tweetInput.value.length;
  let remainingChar = charAllowed - typedChar;
  charCounter.textContent = remainingChar;
  if (typedChar >= 120 && typedChar < 130) { 
    charCounter.style.color = "blue";
  } else if (typedChar >= 130 && typedChar <= 140) {
    charCounter.style.color = "red";
  } else if (typedChar > 140 || typedChar === 0 || !tweetInput.value.trim()) { 
    charCounter.style.color = "lightgrey";
    disableButton();
  } else {
    charCounter.style.color = "black";  
  }
}

// Redimensionar área de texto
tweetInput.addEventListener("keyup", resize);

function resize() {
  if (tweetInput.scrollHeight > tweetInput.offsetHeight) {
    tweetInput.rows += 1;
  }
  if (tweetInput.rows > 10) {
    tweetInput.style.overflow = "auto";
  }
}

// Gerar data e hora
function showTime() {
  let mydate = new Date();
  let hours = mydate.getHours(); 
  let minutes = mydate.getMinutes();
  let formatMinutes = (minutes < 10 ) ? "0" + minutes : minutes;
  let tweetTime = (hours >= 12) ? hours + ":" + formatMinutes + " PM" : hours + ":" + formatMinutes + " AM";
  return tweetTime;
}

// Publicar tweet no feed
tweetButton.addEventListener("click", submitTweet);

function submitTweet(event) {
  let tweetBox = document.createElement("div");
  let displayTime = document.createElement("span");
  let publishedTweet = document.createElement("p");
  let insertFeed = document.getElementsByClassName("feed")[0];
  displayTime.textContent = "@Lidiane" + " . " + showTime();
  publishedTweet.textContent = tweetInput.value;
  tweetBox.classList.add("tweet-box");
  displayTime.classList.add("display-time-name");
  publishedTweet.classList.add("published-tweet");
  tweetBox.appendChild(displayTime);
  tweetBox.appendChild(publishedTweet);
  insertFeed.appendChild(tweetBox);

  charCounter.textContent = 140;
  tweetForm.reset();
  event.preventDefault();
  disableButton();
}