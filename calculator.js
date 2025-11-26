let calculation = localStorage.getItem('calculation') || '';
updateDisplay();

const OPERATORS = ['+', '-', '*', '/'];
const isOperator = ch => OPERATORS.includes(ch);

function appendNumber(number) {
  if (calculation === '0') {
    calculation = String(number);
  } else {
    calculation += String(number);
  }
  saveAndShow();
}

function appendOperator(operator) {
  if (!isOperator(operator)) return;

  if (calculation.length === 0) {
    if (operator === '-') {
      calculation = '-';
      saveAndShow();
    }
    return;
  }

  const last = calculation.at(-1);
  if (isOperator(last)) {
    calculation = calculation.slice(0, -1) + operator;
  } else {
    calculation += operator;
  }

  saveAndShow();
}

function appendDot() {
  if (calculation.length === 0) {
    calculation = '0.';
    return saveAndShow();
  }

  const last = calculation.at(-1);
  const lastOpIndex = Math.max(
    calculation.lastIndexOf('+'),
    calculation.lastIndexOf('-'),
    calculation.lastIndexOf('*'),
    calculation.lastIndexOf('/')
  );

  const currentNumber = calculation.slice(lastOpIndex + 1);
  if (currentNumber.includes('.')) return;

  if (isOperator(last)) {
    calculation += '0.';
  } else {
    calculation += '.';
  }

  saveAndShow();
}

function calculate() {
  if (!calculation) return;

  // Видаляємо зайві символи з кінця
  while (calculation && (isOperator(calculation.at(-1)) || calculation.at(-1) === '.')) {
    calculation = calculation.slice(0, -1);
  }

  if (!calculation) return updateDisplay();

  try {
    calculation = String(eval(calculation));
    saveAndShow();
  } catch {
    alert("Invalid expression");
    calculation = "";
    saveAndShow();
  }
}

function clearCalc() {
  calculation = "";
  saveAndShow();
}

function saveAndShow() {
  localStorage.setItem('calculation', calculation);
  updateDisplay();

  const disp = document.querySelector('.js-display-element');
  disp.classList.add('active');
  setTimeout(() => disp.classList.remove('active'), 150);
}

function updateDisplay() {
  const displayEl = document.querySelector('.js-display-element');
  displayEl.textContent = calculation;

  if (calculation.length > 12) {
    displayEl.style.fontSize = '1.5rem';
  } else if (calculation.length > 8) {
    displayEl.style.fontSize = '2rem';
  } else {
    displayEl.style.fontSize = '2.5rem';
  }
}
