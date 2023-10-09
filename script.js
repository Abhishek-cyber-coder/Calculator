const selectCalcBody = document.getElementById("calcBody");
const selectInputScreen = document.querySelector(".inputScreen");

let operator = ["+", "x", "/"];
let equation;
let ans;

let firstLetter = false;
let checkAns = false;
let reset = false;
let del = false;

//Used Event Delegation here
selectCalcBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("main-btn")) {
    let value = e.target.innerHTML;

    //This is adding operator to the final ans
    if (
      !del &&
      !reset &&
      checkAns &&
      (operator.includes(value) || value === "-")
    ) {
      equation = ans;
      checkAns = !checkAns;
      selectInputScreen.innerHTML += " " + value + " ";
      equation += value;
      // console.log("Value coming from checkAns if", equation);

      ans = undefined;
      // console.log("Value coming from checkAns if", ans);
    }
    // This is handling only first letter
    else if (!firstLetter && (!isNaN(value) || value === "-")) {
      // If the first letter is 0 it adds new string so that the value that is entered is not appended to 0.
      // We can use placeholder as 0 but here I have not taken input element in html, that's why I have only this way.
      if (selectInputScreen.innerHTML === "0") {
        selectInputScreen.innerHTML = value;
        equation = value;
      } else {
        selectInputScreen.innerHTML += value;
        equation += value;
      }
      firstLetter = true;
    } else if (
      firstLetter &&
      value !== "DEL" &&
      value !== "RESET" &&
      value !== "="
    ) {
      let text = selectInputScreen.innerText;
      if (text.slice(text.length - 1) !== value && !isNaN(value)) {
        selectInputScreen.innerHTML += value;
        equation += value;
      } else if (
        isNaN(value) &&
        !operator.includes(text.slice(text.length - 1)) &&
        text.slice(text.length - 1) !== "-"
      ) {
        if (value === ".") {
          selectInputScreen.innerHTML += value;
          equation += value;
        } else {
          selectInputScreen.innerHTML += " " + value + " ";
          equation += value;
        }
      } else if (!isNaN(value)) {
        selectInputScreen.innerHTML += value;
        equation += value;
      } else if (
        operator.includes(text.slice(text.length - 1)) &&
        value === "-"
      ) {
        selectInputScreen.innerHTML += " " + value + " ";
        equation += value;
      }
    } else if (firstLetter && value === "DEL") {
      if (selectInputScreen.innerText.length === 1) {
        selectInputScreen.innerHTML = "0";
        equation = "0";
        firstLetter = !firstLetter;
      } else {
        let strVal = selectInputScreen.innerText;
        selectInputScreen.innerHTML = strVal.slice(0, strVal.length - 1);
        equation = strVal.slice(0, strVal.length - 1);
      }
      del = true;
      // console.log("Delete true/false", del);
    } else if (firstLetter && value === "RESET") {
      selectInputScreen.innerHTML = "0";
      equation = "0";
      firstLetter = false;
      reset = false;
      checkAns = false;
      del = false;
    } else if (firstLetter && value === "=") {
      let newEquation = equation.replace("x", "*");
      // console.log("New Equation", newEquation);
      ans = eval(newEquation);
      checkAns = true;
      ans = ans % 1 === 0 ? ans : ans.toFixed(3);
      // console.log("Answer", ans);
      selectInputScreen.innerHTML = ans;
    }
  }
});
