var users_arr;
//פונקציה הבודקת אם המשתמש קיים
function connect() {
  var password = document.getElementById("password").value;
  var name = document.getElementById("name").value;
  let exists = false;
   users_arr = JSON.parse(localStorage.getItem("Users")) || [];
  let correctInputs = true; //בודק אם כל הנתונים נכונים

  //בודק את נכונות הקלט אם הזנת פחות מ-4 תווים/מספרים בסיסמה
  if (password.length < 4) {
    alert("הסיסמא חייבת לכלול 4 מספרים / תווים");
    correctInputs = false;
  }
  if (name.length < 2) {
    alert("השם חייב להיות תקין");
    correctInputs = false;
  }
  if (correctInputs) {
    // בודק אם משתמש קיים
    if (users_arr.length>0) {
      for (let i = 0; i < users_arr.length; i++) {
        if (
          users_arr[i][0].name == name &&
          users_arr[i][1].password == password
        ) {
          localStorage.name = name; //ושומר את השם הסיסמא
          localStorage.password = password;
          exists = true;
          break; 
        }
      }
    }
    else
    {
        exists=false;
        alert("אינך מופיע במערכת הירשם כאן");
        reashom();
    }
    if (exists) {
      localStorage.setItem("name", name);
      localStorage.setItem("password", password);
      alert(name+ "  התחברת בהצלחה");
      window.location.href = "home.html";
    } else {
      alert("  הקשת נתון שגוי או שאינך מופיע במערכת -הירשם כאן");
      reashom();
    }
  } 
}
function reashom() {
  let x = document.querySelector("#enterReashom");
  let r = document.querySelector("#reashom");
  x.style.display = `block`;
  r.style.display = `none`;
}
//פונקציה הרושמת את המשתמש
function addUser() {
  var passwordr = document.getElementById("passwordr").value;
  var namer = document.getElementById("namer").value;
  var telephonr = document.getElementById("telephonr").value;
  let flag = true;
  //בדיקת תקינות למספר טלפון שמכיל 10 מספרים
  if (telephonr.length != 10 && telephonr.length != 9) {
    alert("טלפון חייב להכיל 10 או 9 מספרים בלבד");
    flag = false;
  }
  //בדיקת תקינות הטלפון אם הקישו קלט שאינו מספר
  for (let i = 0; i < telephonr.length; i++) {
    if (telephonr[i] < 0 || telephonr[i] > 9) {
      flag = false;
    }
  }
  //בודק אם השם תקין
  if (namer.length < 2) {
    alert("השם חייב להיות תקין");
    flag = false;
  }
  //בדוק את נכונות הקלט אם הקשת פחות מ-4 תווים/מספרים בסיסמה
  if (passwordr.length < 4) {
    alert(" הסיסמא חייבת להכיל לפחות 4 תווים ומספרים");
    flag = false;
  }
  var users_arr = JSON.parse(localStorage.getItem("Users")) || [];
  // var users = JSON.parse(localStorage.getItem('Users')) || [];
  for (let i = 0; i < users_arr.length; i++) {
    if (users_arr[i][1].password == passwordr && flag == true) {
      //פ סיסמא אם המשתמש קיים ע
      alert(" סיסמא זו כבר קיימת  יש משתמש שבחר בה, הכנס סיסמא אחרת");
      flag = false;
    }
  }
  //בודק אם הקלטים נכונים והמשתמש אינו קיים
  let userData = [
    { name: namer},
    { password: passwordr},
    { telephone: telephonr},
  ];
  if (flag) {
    console.log(users_arr);
    users_arr.unshift(userData);
    //שומר את פרטי השחקן ב-localStorage
    localStorage.setItem("Users", JSON.stringify(users_arr));
    localStorage.setItem("name", namer);
    localStorage.setItem(
      "password",
      passwordr
    );
    localStorage.setItem(
      "telephone",
      telephonr
    );
    alert(namer + "  נרשמת בהצלחה");
    window.location.href = "home.html";
}
}
  /*else {
    if (flag) {
      console.log(users_arr);
      localStorage.setItem("Users", JSON.stringify(users_arr));
      users_arr.push(userData);
      alert(document.getElementById("namer").value + "  נרשמת בהצלחה");
      window.location.href = "home.html";
    }
  }
}*/

/*   if (users_arr) {
      for (let i = 0; i < users_arr.length; i++) {
        if (
          users_arr[0].name != namer &&
          users_arr[1].password != passwordr &&
          users_arr[2].telephone != telephonr
        ) {
          //הכנסת המשתמש למערכת
          users_arr = JSON.parse(localStorage.getItem("Users"));
          users_arr.push(userData);
          localStorage.setItem("Users", JSON.stringify(users_arr));
          alert(document.getElementById("namer").value + "  נרשמת בהצלחה");
          window.location.href = "home.html";
          break;
        } else {
          alert(namer + "כבר קיים במערכת ");
          break;
        }
      }
    } else {
      localStorage.setItem("Users", JSON.stringify(userData));
      users_arr.push(userData);
      alert(document.getElementById("namer").value + "  נרשמת בהצלחה");
      window.location.href = "home.html";
    }
  } else alert("הקש פרטים תקינים");
}
*/
//let num1=Math.random()*255;
//let num2=Math.random()*255;
//let num3=Math.random()*255;
//x.style.backgroundColor=`rgb(${num1},${num2},${num3})`;
