let firstInputElement = document.getElementById("first_input");
let secondInputElement = document.getElementById("second_input");
let firstErrorStatement = document.createElement("span");
firstErrorStatement.id = "first_error";
let secondErrorStatement = document.createElement("span");
let targetTable = document.getElementById("target_table");
let errorTable = document.getElementById("error_table");

let target_grid = [];
let error_grid = [];
let validLengthOfBankId = 5;

let validation = () => {
  let bankId = document.getElementById("bank_id").value;
  let accountId = document.getElementById("account_id").value;
  accountIdValidation(bankId, accountId);
};

let accountIdValidation = (bankId, accountId) => {
  if (bankId !== "" && accountId !== "") {
    if (bankId.length === validLengthOfBankId) {
      if (checkAllAreNumbers(bankId.slice(1))) {
        if (checkFirstChar(accountId)) {
          if (checkAccountIdLength(accountId)) {
            if (checkAllAreNumbers(accountId.slice(1))) {
              addDataInTarget(bankId, accountId);
            } else {
              addDataInError(bankId, accountId, "IA");
            }
          } else addDataInError(bankId, accountId, "L");
        } else {
          addDataInError(bankId, accountId, "I");
        }
      } else {
        addDataInError(bankId, accountId, "IBN");
      }
    } else {
      addDataInError(bankId, accountId, "IB");
    }
  } else {
    alert("Both inputs are mandatory");
  }
};

let checkFirstChar = (accountId) => {
  let firstChar = accountId[0].toUpperCase();
  return firstChar === "S" || firstChar === "F" || firstChar === "C"
    ? true
    : false;
};

let checkAccountIdLength = (accountId) => {
  let accountNumberLength = accountId.slice(1).length;
  return accountNumberLength >= 7 && accountNumberLength <= 11 ? true : false;
};

let checkAllAreNumbers = (idNumber) => {
  for (i = 0; i <= idNumber.length; i++) {
    if (idNumber.charCodeAt(i) < 48 || idNumber.charCodeAt(i) > 57)
      return false;
  }
  return true;
};

let addDataInTarget = (bankId, accountId) => {
  let accountTypeCode = accountId[0].toUpperCase();
  let accountNumber = accountId.slice(1);
  target_grid.push([bankId, accountTypeExpend(accountTypeCode), accountNumber]);
  let htmlRows = createHTMLElements(target_grid);
  BeforeAddingData("green");
  targetTable.appendChild(htmlRows);
};

let accountTypeExpend = (accountTypeCode) => {
  return accountTypeCode === "S"
    ? "Savings"
    : accountTypeCode === "F"
    ? "Fixed"
    : "Credit";
};

let createHTMLElements = (grid) => {
  let htmlRowElement;
  for (let i = 0; i < grid.length; i++) {
    htmlRowElement = document.createElement("tr");
    for (let j = 0; j < grid[i].length; j++) {
      let htmlTdElement = document.createElement("td");
      htmlTdElement.innerHTML = grid[i][j];
      htmlRowElement.appendChild(htmlTdElement);
    }
  }
  return htmlRowElement;
};

let reasons = (reason_code) => {
  return reason_code === "IB"
    ? "Invalid Bank ID Length"
    : reason_code === "IBN"
    ? "Invalid Bank Number"
    : reason_code === "I"
    ? "Invalid Account Type"
    : reason_code === "IA"
    ? "Invalid Account Number"
    : "Invalid Account Number Length";
};

let addDataInError = (bankId, accountId, errorCode) => {
  error_grid.push([bankId, accountId, reasons(errorCode)]);
  let htmlRows = createHTMLElements(error_grid);
  errorTable.appendChild(htmlRows);
};

let BeforeAddingData = (color) => {
  setTimeout(() => {
    setColor(color);
  }, 1);
};

function setColor(color) {
  console.log("color changing");
  firstInputElement.style.borderColor = color;
}

let checkMinimumBankIdLength = (value) => {
  firstErrorStatement.innerHTML = "";
  firstInputElement.appendChild(firstErrorStatement);

  if (value.length === 0) {
    firstErrorStatement.innerHTML = "Bank id is mandatory";
  } else if (
    value.length < validLengthOfBankId ||
    value.length > validLengthOfBankId
  ) {
    // let bankId = document.getElementById("bank_id");
    // bankId.style.outline = "none";
    // bankId.style.borderColor = "#FA8072";
    firstErrorStatement.innerHTML = "Bank id should have 5 characters";
    // firstInputElement.appendChild(firstErrorStatement);
  } else if (value.length === validLengthOfBankId) {
    firstInputElement.removeChild(firstErrorStatement);
  }
};

let checkMinimumAccountIdLength = (value) => {
  secondErrorStatement.innerHTML = "";
  secondInputElement.appendChild(secondErrorStatement);
  if (value.length === 0) {
    secondErrorStatement.innerHTML = "Account id is mandatory";
    secondInputElement.appendChild(secondErrorStatement);
  }
  // else if (value.cha) { }
  else if (value.length === validLengthOfBankId) {
    secondInputElement.removeChild(secondErrorStatement);
  }
};

let focus = () => {
  document.getElementById("bank_id").focus();
};
