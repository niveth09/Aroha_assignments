let firstInputElement = document.getElementById("first_input");
let secondInputElement = document.getElementById("second_input");
let firstErrorStatement = document.createElement("p");
let secondErrorStatement = document.createElement("p");

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
      if (checkFirstChar(accountId)) {
        if (checkAccountIdLength(accountId)) {
          if (checkAllAreNumbers(accountId.slice(1))) {
            console.log(true);
            addDataInTarget(bankId, accountId);
          } else {
            console.log(false);
            addDataInError(bankId, accountId, "IA");
          }
        } else addDataInError(bankId, accountId, "L");
      } else {
        addDataInError(bankId, accountId, "I");
      }
    } else {
      console.error("Length of bank id should be equal to 5");
    }
  } else {
    alert("Both inputs are mandatory");
  }
};

let checkAllAreNumbers = (accountNumber) => {
  for (i = 0; i <= accountNumber.length; i++) {
    if (accountNumber.charCodeAt(i) < 48 || accountNumber.charCodeAt(i) > 57)
      return false;
  }
  return true;
};
let checkFirstChar = (accountId) => {
  let firstChar = accountId[0].toUpperCase();
  return firstChar === "S" || firstChar === "F" || firstChar === "C"
    ? true
    : false;
};

let checkAccountIdLength = (accountId) => {
  let accountIdLength = accountId.slice(1).length;
  return accountIdLength >= 7 && accountIdLength <= 11 ? true : false;
};

let reasons = (reason_code) => {
  return reason_code === "I"
    ? "Invalid Account Type"
    : reason_code === "IA"
    ? "Invalid Account Number"
    : "Invalid Length";
};

let accountTypeExpend = (accountTypeCode) => {
  return accountTypeCode === "S"
    ? "Savings"
    : accountTypeCode === "F"
    ? "Finance"
    : "Credit";
};

let addDataInTarget = (bankId, accountId) => {
  let firstChar = accountId[0].toUpperCase();
  let accountTypeName = accountTypeExpend(firstChar);
  let accountNumber = accountId.slice(1);
  target_grid.push([bankId, accountTypeName, accountNumber]);
  let targetTable = document.getElementById("target_table");
  let htmlRows = createHTMLElements(target_grid);
  targetTable.appendChild(htmlRows);
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

let addDataInError = (bankId, accountId, errorCode) => {
  error_grid.push([bankId, accountId, reasons(errorCode)]);
  let errorTable = document.getElementById("error_table");
  let htmlRows = createHTMLElements(error_grid);
  errorTable.appendChild(htmlRows);
};

let checkMinimumBankIdLength = (value) => {
  if (
    value.length < validLengthOfBankId ||
    value.length > validLengthOfBankId
  ) {
    let bankId = document.getElementById("bank_id");
    bankId.borderColor = "red";
    firstErrorStatement.innerHTML = "Bank id should have 5 characters";
    firstInputElement.appendChild(firstErrorStatement);
  } else if (value.length === validLengthOfBankId) {
    firstInputElement.removeChild(firstErrorStatement);
  }
};

let checkMinimumAccountIdLength = (value) => {
  if (value.length === 0) {
    secondErrorStatement.innerHTML =
      "Account id should have minimum 2 characters";
    secondInputElement.appendChild(secondErrorStatement);
  } else if (value.length === validLengthOfBankId) {
    secondInputElement.removeChild(secondErrorStatement);
  }
};

let focus = () => {
  document.getElementById("bank_id").focus();
};
