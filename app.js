import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { collection, addDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// import { async } from "q";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
// import {getFirestore} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"




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
// export const auth = getAuth(app);
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
    str += `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${element[0]}</td>
          <td>${element[1]}</td>
          <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
         
        </tr>
      `;
  });
  tableBody.innerHTML = str;
}
let add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);

update();

function deleted(itemIndex) {
  console.log("Delete", itemIndex);
  let itemJsonArrayStr = localStorage.getItem('itemsJson');
  let itemJsonArray = JSON.parse(itemJsonArrayStr);
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
  update();
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




// // JavaScript
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// import { collection, addDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyC2EgeScovr8gEXah9ES7Yxij5MySYLWzg",
//   authDomain: "email-login-544c6.firebaseapp.com",
//   projectId: "email-login-544c6",
//   storageBucket: "email-login-544c6.appspot.com",
//   messagingSenderId: "120073716628",
//   appId: "1:120073716628:web:acefb9b63f07584ad7c581",
//   measurementId: "G-SVP6CFCJYB"
//   // Your Firebase configuration
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// async function addTask() {
//   console.log("Adding Task...");
//   let tit = document.getElementById('title').value;
//   let desc = document.getElementById('description').value;

//   // Input validation: Check if the title is not empty before adding
//   if (tit.trim() === "") {
//     alert("Please enter a task title.");
//     return;
//   }

//   try {
//     const docRef = await addDoc(collection(db, "Todos"), {
//       value: tit,
//       description: desc,
//       currentDate: new Date().toISOString(),
//     });
//     console.log("Document written with ID: ", docRef.id);
//     // location.reload();
//   } catch (err) {
//     console.error("Error adding document: ", err);
//   }

//   update();
// }


// function update() {
//   let itemJsonArray;
//   if (localStorage.getItem('itemsJson') == null) {
//     itemJsonArray = [];
//   } else {
//     let itemJsonArrayStr = localStorage.getItem('itemsJson');
//     itemJsonArray = JSON.parse(itemJsonArrayStr);
//   }
//   let tableBody = document.getElementById("tableBody");
//   console.log(tableBody);
//   let str = "";
//   itemJsonArray.forEach((element, index) => {
//     str += `
//       <tr>
//         <th scope="row">${index + 1}</th>
//         <td>${element[0]}</td>
//         <td>${element[1]}</td>
//         <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
//       </tr>
//     `;
//   });
//   tableBody.innerHTML = str;
// }

// function deleted(itemIndex) {
//   console.log("Delete", itemIndex);
//   let itemJsonArrayStr = localStorage.getItem('itemsJson');
//   let itemJsonArray = JSON.parse(itemJsonArrayStr);
//   itemJsonArray.splice(itemIndex, 1);
//   localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
//   update();
// }

// function clearStorage() {
//   if (confirm("Do you really want to clear?")) {
//     console.log('Clearing the storage')
//     localStorage.clear();
//     update();
//   }
// }

// let add = document.getElementById("add");
// add.addEventListener("click", addTask);

// update();
// // addTask()