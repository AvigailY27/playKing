// מערך תמונות הקלפים
let arrImages = [
  "falafel",
  "Fries",
  "Pickle",
  "Pita with hole",
  "Pita",
  "salad",
  "Tehina",
];
//מערך קלפים לשחקן נוכחי
let arrPlayer = Array.from(document.querySelectorAll(".addimg"));
//הגדרת- שליחה לפונקציה בעת לחיצה
let x = document.getElementById("add");
x.addEventListener("click", AddCard);
let f = document.getElementById("next");
f.addEventListener("click", next);
let p = document.getElementById("count");
let problam = false; //משתנה לבדיקה שחקן 2-מחשב אם ניפסל
let flagClear = true;
//יעדכן שהשחקן הראשון הוא שחקן1
document.getElementById("tur").innerText = localStorage.name;
let playerN = localStorage.name;
let randomHref;
//p -מספר הקלפים שהוציא השחקן עד עכשיו
p = -1;
//הוספת קלף
//הגרלת קלף ממערך התמונות ובדיקה אם נפסל כרגע
function AddCard() {
  var audio_drip = new Audio("../sounds/poit-94911.mp3");
  audio_drip.play();
  problam = false;
  if (p < 0) p++;
  if (p == 6) endKing();
  document.getElementById("count").innerText = p + 1;
  let r = parseInt(Math.random() * arrImages.length);
  randomHref = "../img/" + arrImages[r] + ".jpg";
  console.log(randomHref);
  arrPlayer[p].src = randomHref;
  //setTimeout(endTurn(),1500);
  endTurn(p, randomHref);
  if (!problam) p++;
}
//בדיקה בין הוספת קלף חדש
function endTurn(num, r) {
  arrPlayer[num].src = r;
  // משתנים לבדיקה אם נפסל
  let flageCard = true;
  let flageCnt = true;
  let flagHole = true;
  let flagPita = true;
  if (randomHref == "../img/Pita.jpg") flagPita = false;
  if (player1.length >= 6 || player2.length >= 6) flageCnt = false;
  if (randomHref == "../img/Pita with hole.jpg") {
    flagHole = false;
  }
  for (let i = 0; i < arrPlayer.length; i++) {
    if (arrPlayer[i].src == arrPlayer[p].src && p != i) {
      flageCard = false;
      break;
    }
  }
  // אם נפסל : נזרוק את הקלפים בהתאם ונחליף שחקן ונאפס את הכמות
  if (!flageCard || !flageCnt || !flagHole) {
    arrPlayer[num].src = r;
    problam = true;
    if (!flageCard) {
      alert("נפסלת יש יותר מקלף אחד זהה, התור עובר לשחקן הבא");

      if (!flagPita) {
        alert("ניצלת יש לך פיתה");
        flagPita = true;
        saveData();
      }
    }
    if (!flagHole) {
      alert("יש לך פיתה עם חור");
      if (playerN == localStorage.name) {
        player1 = [];
      } else {
        player2 = [];
      }
      //רעש נופל של החור
      var audio_drip = new Audio("../sounds/fail.mp3");
      audio_drip.play();
    }
    flagClear = false;
    // clear(arrPlayer);
    //החלף תור
    replace();
  }
  //אם לא ניפסל:אם הכמות קטנה מ-6 קלף נמשיך כבחירתו
  //אם הוציא 6 ולא נפסל:אז ניצח נותנים לו מלך הפלאפל וצליל סיום :
  else {
    endKing();
  }
}

function changeTurn() {
  //החלפת  שחקן תור
  if (playerN == localStorage.name) {
    playerN = "player2";
    document.querySelector("body").style.backgroundColor = `rgb(183, 201, 211)`;
    // check();
  } else {
    playerN = localStorage.name;
    document.querySelector("body").style.backgroundColor = `rgb(101, 248, 253)`;
  }
  var audio_drip = new Audio("../sounds/whoosh.mp3");
  audio_drip.play();
}

function even(x) {
  return x.src != "";
}

//מערכים עבור הקלפים של 2 המשתמשים
var player1 = [];
var player2 = [];

// ולסיום תקין לשמירת הקלפים לשחקן הנוכחי
function saveData() {
  //לשמור לשחקן את הקלפים שלו
  if (playerN == localStorage.name) {
    for (let i = player1.length; i < p; i++) {
      player1.push(arrPlayer[i].src);
    }
  }
  if (playerN == "player2") {
    for (let i = player2.length; i < p; i++) {
      player2.push(arrPlayer[i].src);
    }
  }
}

//arrPlayer ריקון המערך
function clear(arr) {
  for (let i = 0; i < arr.length; i++) arr[i].src = " "; //ריק
}

function next() {
  saveData();
  clear(arrPlayer);
  replace();
}

function replace() {
  if (!flagClear)
    setTimeout(clear(arrPlayer), 30000);
  if (playerN == "player2" && player1.length >= 0) {
    for (let i = 0; i < player1.length; i++) {
      arrPlayer[i].src = player1[i];
    }
    changeTurn();
    p = player1.length;
    document.getElementById("count").innerText = p;
    document.getElementById("tur").innerText = playerN;
  } else {
    if (playerN == localStorage.name && player2.length >= 0) {
      for (let i = 0; i < player2.length; i++) {
        arrPlayer[i].src = player2[i];
      }
      changeTurn();
      p = player2.length;
      document.getElementById("count").innerText = p;
      document.getElementById("tur").innerText = playerN;
    } else {
      clear(arrPlayer);
      changeTurn();
      p = -1;
      document.getElementById("count").innerText = p + 1;
      document.getElementById("tur").innerText = playerN;
    }
  }

  endKing();
}
//פונקציה שבודקת אם השחקן הוא 2 זה המחשב ומגריל כמות קלפים להוצאה
function check() {
  let cntadd;
  if (playerN == "player2") {
    x.style.display = "none";
    cntadd = Math.random() * 6;
    for (let i = 0; i <= cntadd; i++) {
      AddCard();
      if (problam) {
        break;
        replace();
      }
    }
  }
}

let message = document.getElementById("message");
function endKing() {
  if (player1.length >= 6 || player2.length >= 6 || p == 6)
     {
    //אם זה סיום תור ונשמר גודל המערך -בדק וניצח אז 
    if (player1.length >= 6 || player2.length >= 6)
      changeTurn();
    alert("ניצחת" + " " + playerN);

    var audio_drip = new Audio("../sounds/Applause.mp3");
    audio_drip.play();
    //אם בלחיצה להמשיך עוד קלפים במשחק
    x.style.display = `none`;
    f.style.display = "none";
    clear(arrPlayer);
    //מנצח
    //פונקציה שמסיימת את המשחק
    message.style.display = "block";
    document.getElementById("tur").style.display = "none";
    document.getElementById("count").style.display = "none";
    //שיר סיכום
    var audio_summery = new Audio("../sounds/poit-94911.mp3");
    audio_summery.play();
  }
}
