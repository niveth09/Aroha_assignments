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
let tick_icon = document.getElementById("tick");
let cancel_icon = document.getElementById("cancel");
let modal = document.getElementById("modal");
let tickColor = "#32de84";
let cancelColor = "#F70000";
let defaultColorOfHeading = "#f39c12";
let tableName;

let target_grid = [];
let error_grid = [];
let notFormattedValidData = [];
let validLengthOfBankId = 5;

let focus = () => {
  document.getElementById("bank_id").focus();
};

let checkMinimumBankIdLength = (value) => {
  let bankId = document.getElementById("bank_id");
  firstInputElement.appendChild(firstErrorStatement);

  if (value.length === 0) {
    firstErrorStatement.innerHTML = "Bank id is mandatory";
    // bankId.style.borderColor = "1px solid black";
    bankId.style.borderColor = "2px solid #d63131";
    console.log(bankId.borderColor);
  } else if (
    value.length < validLengthOfBankId ||
    value.length > validLengthOfBankId
  )
    firstErrorStatement.innerHTML = "Bank id should have 5 characters";
  else if (value.length === validLengthOfBankId)
    firstInputElement.removeChild(firstErrorStatement);
};

let checkMinimumAccountIdLength = (value) => {
  secondInputElement.appendChild(secondErrorStatement);
  if (value.length === 0)
    secondErrorStatement.innerHTML = "Account id is mandatory";
  else secondInputElement.removeChild(secondErrorStatement);
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
      if (
        notFormattedValidData[i][0] === currentRow[0] ||
        notFormattedValidData[i][1] === currentRow[1]
      )
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
  validHeading.style.color = tickColor;
  tick_icon.style.fill = tickColor;
  // targetTable.style.borderColor = "5px solid #32de84";
  AfterAddingData(tick_icon, validHeading, defaultColorOfHeading);
  clearDataInInputs();
}

let clearDataInInputs = () => {
  document.getElementById("bank_id").value = "";
  document.getElementById("account_id").value = "";
  firstErrorStatement.remove();
  secondErrorStatement.remove();
  // firstInputElement.removeChild(firstErrorStatement);
  // secondInputElement.removeChild(secondErrorStatement);
  // firstErrorStatement.innerHTML = null;
  // secondErrorStatement.innerHTML = null;
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
  inValidHeading.style.color = cancelColor;
  cancel_icon.style.fill = cancelColor;
  AfterAddingData(cancel_icon, inValidHeading, defaultColorOfHeading);
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

function AfterAddingData(icon, heading, color) {
  setTimeout(() => {
    setColor(icon, heading, color);
  }, 1000);
}

function setColor(icon, heading, color) {
  heading.style.color = color;
  icon.style.fill = "black";
  // targetTable.borderColor = "1px solid #dddddd";
}

let deleteAll = (tableName) => {
  if (tableName === "valid") {
    target_grid = [];
    notFormattedValidData = [];
    removeRows(targetTable);
  } else {
    error_grid = [];
    removeRows(errorTable);
  }
  closeModal();
};

let removeRows = (table) => {
  while (table.children.length > 1) {
    table.removeChild(table.lastChild);
  }
};

let showModal = (table) => {
  tableName = table;
  table = table[0].toUpperCase() + table.slice(1);
  if (modal.style.display === "") modal.style.display = "none";
  if (modal.style.display === "none") {
    let grid;
    modal.style.display = "block";
    let modalText = document.getElementById("modal_text");
    let modalContent = document.getElementById("modal_content");
    console.log(table);
    let buttonGroup = createButtonGroup();
    let isButtonGroupExists =
      modalContent.lastElementChild.className === "button_group";

    if (tableName === "valid") grid = target_grid;
    else grid = error_grid;
    if (grid.length === 0) {
      modalText.innerHTML = `${table} table is empty`;
      if (isButtonGroupExists) {
        modalContent.removeChild(modalContent.lastElementChild);
      }
    } else {
      modalText.innerHTML = `Do you want to delete all the ${table} data?`;
      if (!isButtonGroupExists) {
        modalContent.appendChild(buttonGroup);
      }
    }
  }
};

let createButtonGroup = () => {
  let buttonGroup = document.createElement("div");
  buttonGroup.className = "button_group";
  let okButton = document.createElement("button");
  let cancelButton = document.createElement("button");
  okButton.innerHTML = "Yes";
  cancelButton.innerHTML = "Cancel";
  okButton.id = "ok_button";
  cancelButton.id = "cancel_button";
  buttonGroup.appendChild(cancelButton);
  buttonGroup.appendChild(okButton);

  okButton.onclick = () => {
    if (tableName === "valid") deleteAll("valid");
    else deleteAll("invalid");
  };

  cancelButton.onclick = () => {
    closeModal();
  };

  return buttonGroup;
};

let closeModal = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};
