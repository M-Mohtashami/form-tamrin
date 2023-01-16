"use strict";
// get dom objects
const form = document.querySelector("form");
const inputList = document.querySelectorAll("form > input");
const btnForm = document.querySelector("form > button");
const tableBody = document.querySelector("table > tbody");

// create Icons
const deleteIcon = '<ion-icon name="close-outline"></ion-icon> ';
const editIcon = '<ion-icon name="clipboard-outline"></ion-icon>';
// identification crator
let idCraetor = 1;
let targetId;

//add data to the table
btnForm.addEventListener("click", (event) => {
  event.preventDefault();
  if (btnForm.innerHTML === "ویرایش اطلاعات") {
    setChangedData(event, targetId);
    console.log("ویرایش اطلاعات");
  } else {
    insertData();
  }
});

function insertData() {
  let dataArray = Array.from(inputList);
  const tableRow = document.createElement("tr");

  const tdDelete = document.createElement("td");
  tdDelete.insertAdjacentHTML("afterbegin", deleteIcon);
  tdDelete.classList.toggle("delete");
  tdDelete.addEventListener("click", (e) => deleteRow(e.target.parentElement));
  tableRow.append(tdDelete);

  const tdEdit = document.createElement("td");
  tdEdit.insertAdjacentHTML("afterbegin", editIcon);
  tdEdit.classList.toggle("edit");
  tdEdit.addEventListener("click", (e) => getRowData(e.target.parentElement));
  tableRow.append(tdEdit);

  const tdID = document.createElement("td");
  tdID.append(idCraetor++);
  tableRow.append(tdID);

  dataArray.map((item) => {
    const tdata = document.createElement("td");
    tdata.append(item.value);
    tableRow.append(tdata);
  });
  //   if (idCraetor % 2 === 0) tableRow.style.backgroundColor = "lightgrey";
  tableBody.append(tableRow);
  inputList.forEach((item) => (item.value = ""));
}
function deleteRow(td) {
  const tableRow = td.parentElement;
  tableRow.style.backgroundColor = "hsla(0, 100%, 50%, 0.557)";
  setTimeout(() => tableRow.remove(), 200);
}

function getRowData(td) {
  const tdList = td.parentElement.children;
  const arr = Array.from(tdList);
  targetId = arr[2].innerHTML;
  // console.log(targetId);
  arr.map((item, index) => {
    if (index >= 3) {
      inputList[index - 3].value = item.innerHTML;
    }
  });
  const btnEdit = "ویرایش اطلاعات";
  btnForm.innerHTML = btnEdit;
}

function changeButton() {
  const btnEdit = "عضویت";
  btnForm.innerHTML = btnEdit;
  inputList.forEach((item) => (item.value = ""));
}

function setChangedData(e, id) {
  const trows = tableBody.children;
  // const tempArray = Array.from(trows);
  // console.log(trows.length);
  for (let i = 0; i < trows.length; i++) {
    let tr = trows[i];
    if (tr.childNodes[2].innerHTML === id) {
      let newInput = Array.from(document.querySelectorAll("form > input"));
      // console.log(newInput);
      newInput.map((item, index) => {
        tr.childNodes[index + 3].innerText = item.value;
        console.log(tr.childNodes[index + 3].innerText);
      });
      tr.style.backgroundColor = "rgba(160, 238, 124, 0.589)";
      setTimeout(() => (tr.style.backgroundColor = ""), 200);
    }
  }
  // console.log(trows, id);
  changeButton();
}
