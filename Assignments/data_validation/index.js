let firstInputElement = document.getElementById("first_input");
let secondInputElement = document.getElementById("second_input");
let firstErrorStatement = document.createElement("span");
firstErrorStatement.id = "first_error";
let secondErrorStatement = document.createElement("span");
secondErrorStatement.id = "second_error";
let targetTable = document.getElementById("target_table");
let errorTable = document.getElementById("error_table");
let validHeading = document.getElementById("valid");
let inValidHeading = document.getElementById("invalid");

let target_grid = [];
let error_grid = [];
let notFormattedValidData = [];
let validLengthOfBankId = 5;

let focus = () => {
  document.getElementById("bank_id").focus();
};

let checkMinimumBankIdLength = (value) => {
  firstErrorStatement.innerHTML = "";
  firstInputElement.appendChild(firstErrorStatement);

  if (value.length === 0)
    firstErrorStatement.innerHTML = "Bank id is mandatory";
  else if (
    value.length < validLengthOfBankId ||
    value.length > validLengthOfBankId
  )
    firstErrorStatement.innerHTML = "Bank id should have 5 characters";
  else if (value.length === validLengthOfBankId)
    firstInputElement.removeChild(firstErrorStatement);
};

let checkMinimumAccountIdLength = (value) => {
  secondErrorStatement.innerHTML = "";
  secondInputElement.appendChild(secondErrorStatement);
  if (value.length === 0)
    secondErrorStatement.innerHTML = "Account id is mandatory";
  else if (value.length === validLengthOfBankId)
    secondInputElement.removeChild(secondErrorStatement);
};

let validation = () => {
  let bankId = document.getElementById("bank_id").value;
  let accountId = document.getElementById("account_id").value;
  allValidations(bankId, accountId);
};

let allValidations = (bankId, accountId) => {
  if (bankId !== "" && accountId !== "")
    if (bankId.length === validLengthOfBankId)
      if (checkAllAreNumbers(bankId.slice(1)))
        if (checkFirstChar(accountId))
          if (checkAccountIdLength(accountId))
            if (checkAllAreNumbers(accountId.slice(1)))
              if (checkDuplicate(notFormattedValidData, [bankId, accountId]))
                addDataInTarget(bankId, accountId);
              else addDataInError(bankId, accountId, "D");
            else addDataInError(bankId, accountId, "IA");
          else addDataInError(bankId, accountId, "L");
        else addDataInError(bankId, accountId, "I");
      else addDataInError(bankId, accountId, "IBN");
    else addDataInError(bankId, accountId, "IB");
  else alert("Both inputs are mandatory");
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

let checkDuplicate = (notFormattedValidData, currentRow) => {
  for (i = 0; i < notFormattedValidData.length; i++)
    for (j = 0; j < notFormattedValidData.length; j++)
      if (notFormattedValidData[i][j] === currentRow[0])
        if (notFormattedValidData[i][j][0] === currentRow[1][0])
          if (notFormattedValidData[i][1].slice(1) === currentRow[1].slice(1))
            return false;
  return true;
};

function addDataInTarget(bankId, accountId) {
  let accountTypeCode = accountId[0].toUpperCase();
  let accountNumber = accountId.slice(1);
  notFormattedValidData.push([bankId, accountId]);
  target_grid.push([bankId, accountTypeExpend(accountTypeCode), accountNumber]);
  let htmlRows = createHTMLElements(target_grid);
  targetTable.appendChild(htmlRows);
  validHeading.style.color = "#32de84";
  AfterAddingData(validHeading, "#f39c12");
  clearDataInInputs();
}

let clearDataInInputs = () => {
  document.getElementById("bank_id").value = "";
  document.getElementById("account_id").value = "";
  firstErrorStatement.innerHTML = "";
  secondErrorStatement.innerHTML = "";
  focus();
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
function addDataInError(bankId, accountId, errorCode) {
  error_grid.push([bankId, accountId, errorReasons(errorCode)]);
  let htmlRows = createHTMLElements(error_grid);
  errorTable.appendChild(htmlRows);
  inValidHeading.style.color = "#FE0000";
  AfterAddingData(inValidHeading, "#f39c12");
  clearDataInInputs();
}

let errorReasons = (reason_code) => {
  return reason_code === "IB"
    ? "Invalid Bank ID Length"
    : reason_code === "IBN"
    ? "Invalid Bank Number"
    : reason_code === "I"
    ? "Invalid Account Type"
    : reason_code === "IA"
    ? "Invalid Account Number"
    : reason_code === "L"
    ? "Invalid Account Number Length"
    : "Duplicate Account Number";
};

function AfterAddingData(heading, color) {
  setTimeout(() => {
    setColor(heading, color);
  }, 1000);
}

function setColor(heading, color) {
  heading.style.color = color;
}
