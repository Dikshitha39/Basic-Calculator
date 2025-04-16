let display = document.getElementById("display");
let currentInput = "";
let resultDisplayed = false;

function updateDisplay(value) {
  display.textContent = value || "0";
}

function clearDisplay() {
  currentInput = "";
  updateDisplay("0");
}

function appendNumber(number) {
  if (resultDisplayed) {
    currentInput = "";
    resultDisplayed = false;
  }
  currentInput += number;
  updateDisplay(currentInput);
}

function appendOperator(operator) {
  if (currentInput === "" && operator !== "-") return;
  if (/[+\-*/%]$/.test(currentInput)) {
    currentInput = currentInput.slice(0, -1);
  }
  currentInput += operator;
  updateDisplay(currentInput);
  resultDisplayed = false;
}

function appendDecimal() {
  const parts = currentInput.split(/[+\-*/%]/);
  const last = parts[parts.length - 1];
  if (!last.includes(".")) {
    currentInput += ".";
    updateDisplay(currentInput);
  }
}

function calculate() {
  try {
    if (currentInput === "") return;
    const safeInput = currentInput.replace(/%/g, "/100");
    const result = eval(safeInput);
    updateDisplay(result);
    currentInput = result.toString();
    resultDisplayed = true;
  } catch (error) {
    updateDisplay("Error");
    currentInput = "";
  }
}

function calculateSqrt() {
  try {
    if (currentInput === "") return;
    const value = eval(currentInput);
    if (value < 0) throw "Invalid Input";
    const result = Math.sqrt(value);
    updateDisplay(result);
    currentInput = result.toString();
    resultDisplayed = true;
  } catch (e) {
    updateDisplay("Error");
    currentInput = "";
  }
}

document.addEventListener("keydown", e => {
  const key = e.key;
  if ((/[0-9]/).test(key)) appendNumber(key);
  else if (key === ".") appendDecimal();
  else if (["+", "-", "*", "/", "%"].includes(key)) appendOperator(key);
  else if (key === "Enter" || key === "=") calculate();
  else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
  } else if (key === "Escape") clearDisplay();
});
