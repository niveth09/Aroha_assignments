let employeeDetails = [];
let countDiv = document.getElementById("count_of_employee");
countDiv.innerHTML = `Total count of employees: ${employeeDetails.length}`;
let duplicateError = document.getElementById("duplicate_error");
duplicateError.style.display = "none";

function getEmployeeDetails() {
  let inputs = getInputs();
  let eName = inputs[0].value;
  let eEmail = inputs[1].value;
  let eEducation = inputs[2].value;
  let eAddress = inputs[3].value;
  let eDob = inputs[4].value;
  if (checkDuplicate(eEmail)) {
    if (validation())
      employeeDetails.unshift({
        Name: eName,
        Email: eEmail,
        Education: eEducation,
        Address: eAddress,
        DOB: eDob,
      });
    addDetails();
  } else {
    duplicateError.style.display = "block";
  }
}

let checkEmployeeDetailsLength = () => {
  if (employeeDetails.length === 0) return false;
  return true;
};

let checkDuplicate = (emailId) => {
  for (i = 0; i < employeeDetails.length; i++)
    if (employeeDetails[i]["Email"] === emailId) return false;
  return true;
};

function addDetails() {
  let contentDiv = document.getElementById("content");
  if (checkEmployeeDetailsLength() !== 0) {
    let details = document.createElement("div");
    details.className = "detailsDiv";

    for (i = 0; i < employeeDetails.length; i++) {
      let employeeDiv = document.createElement("div");
      employeeDiv.className = "employee_div";
      // employeeDiv.style.display = "inline-block";
      for (key in employeeDetails[i]) {
        let employeeDetailsDiv = document.createElement("div");
        employeeDetailsDiv.id = "employee_details_div";
        employeeDetailsDiv.innerHTML =
          key + " : " + employeeDetails[i][key] + "<br>";

        employeeDiv.appendChild(employeeDetailsDiv);
      }
      details.appendChild(employeeDiv);
    }
    if (contentDiv.lastElementChild.className === "detailsDiv")
      contentDiv.removeChild(contentDiv.lastElementChild);
    countDiv.innerHTML = `Total count of employees: ${employeeDetails.length}`;
    contentDiv.appendChild(details);
  }
}

let validation = () => {
  let inputs = getInputs();
  let emailId = inputs[1].value;
  let dob = inputs[4].value;
  if (emailValidation(emailId)) if (dateValidation(dob)) return true;
  return false;
};

let emailValidation = (emailId) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      emailId
    )
  )
    return true;

  return false;
};

let dateValidation = (dob) => {
  // console.log(dob);
  if (dob) {
  }
  return true;
};

let getInputs = () => {
  return [
    document.getElementById("name"),
    document.getElementById("email"),
    document.getElementById("select_education"),
    document.getElementById("address"),
    document.getElementById("dob"),
  ];
};
