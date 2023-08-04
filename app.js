import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { collection, addDoc, getFirestore, updateDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyC2EgeScovr8gEXah9ES7Yxij5MySYLWzg",
  authDomain: "email-login-544c6.firebaseapp.com",
  projectId: "email-login-544c6",
  storageBucket: "email-login-544c6.appspot.com",
  messagingSenderId: "120073716628",
  appId: "1:120073716628:web:acefb9b63f07584ad7c581",
  measurementId: "G-SVP6CFCJYB"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function getAndUpdate() {
  console.log("Updating List...");
  let tit = document.getElementById('title').value;
  let desc = document.getElementById('description').value;

  let itemJsonArray;
  try {
    const docRef = await addDoc(collection(db, "Todos"), {
      value: tit,
      description: desc,
      currentDate: new Date().toISOString(),
    });
    console.log("Document written with ID: ", docRef.id);
    location.reload()
  } catch (err) {
    console.log(err);
  }

  if (localStorage.getItem('itemsJson') == null) {
    itemJsonArray = [];
    itemJsonArray.push([tit, desc]);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));

  } else {
    let itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([tit, desc]);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
  }
  update();
}

function update() {

  let itemJsonArray;
  if (localStorage.getItem('itemsJson') == null) {
    itemJsonArray = [];
  } else {
    let itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }
  let tableBody = document.getElementById("tableBody");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str +=
      `<tr>
         <th scope="row">${index + 1}</th>
          <td>${element[0]}</td>
          <td>${element[1]}</td>
          <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
          <td><button class="btn btn-sm btn-primary" onclick="editTask(${index})">Update Task</button></td>
        </tr>`
      ;
  });
  tableBody.innerHTML = str;
}

function editTask(index) {
  var tableBodyRows = document.querySelectorAll("#tableBody tr");
  if (index < 0 || index >= tableBodyRows.length) {
    console.error("Invalid index:", index);
    return;
  }

  var listItem = tableBodyRows[index];
  var taskTitle = listItem.children[1];
  var taskDescription = listItem.children[2];
  var newText = prompt("Edit title:", taskTitle.textContent);

  if (newText !== null && newText.trim() !== "") {
    taskTitle.textContent = newText;
    taskDescription.textContent = prompt("Edit description:", taskDescription.textContent);
    updateTaskInLocalStorage(index, newText, taskDescription.textContent); // Update in local storage
    updateTaskInFirestore(index, newText, taskDescription.textContent); // Update in Firebase Firestore

  }
}
window.editTask = editTask;

let add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);

update();


function deleted(itemIndex) {
  // Ask for confirmation before deleting the item
  if (confirm("Are you sure you want to delete this item?")) {
    console.log("Delete", itemIndex);

    let itemJsonArrayStr = localStorage.getItem('itemsJson');
    let itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));

    update();
  }
}

function clearStorage() {
  if (confirm("Do you really want to clear?")) {
    console.log('Clearing the storage')
    localStorage.clear();
    update();
  }
}

window.clearStorage = clearStorage
window.deleted = deleted




function updateTaskInLocalStorage(index, newTitle, newDescription) {
  let itemJsonArray;
  if (localStorage.getItem('itemsJson') == null) {
    itemJsonArray = [];
  } else {
    let itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }

  // Update the item in the local storage array
  itemJsonArray[index] = [newTitle, newDescription];
  localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));

  // Update the table on the webpage
  update();
}

async function updateTaskInFirestore(index, newTitle, newDescription) {
  try {
    const querySnapshot = await getDocs(collection(db, "Todos"));
    const docId = querySnapshot.docs[index].id;
    const docRef = doc(db, "Todos", docId);
    await updateDoc(docRef, {
      value: newTitle,
      description: newDescription,
    });
    console.log("Document updated with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}


async function deleteTaskFromFirestore(index) {
  try {
    const querySnapshot = await getDocs(collection(db, "Todos"));
    const docId = querySnapshot.docs[index].id;
    const docRef = doc(db, "Todos", docId);
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}
