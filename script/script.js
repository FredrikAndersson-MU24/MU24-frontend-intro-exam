const inputText = document.querySelector(".input-text"); // QuerySelector for the input text field
const inputButton = document.querySelector(".input-button"); // QuerySelector for the Add task-button
const taskList = document.querySelector(".tasklist"); // QuerySelector for the list of tasks
const box = document.querySelector(".todo");
const valueTodo = "todo"; // Variable to set the default value of new tasks

////////////////////////////////////////////////////////////
//         When loading the page, get items from          //
//                LocalStorage to array                   //
////////////////////////////////////////////////////////////
let jsonFromLocalStorage = localStorage.getItem("tasks"); // assign localstorage items to variable
let arrayOfTasks = JSON.parse(jsonFromLocalStorage); // parse the json to array

////////////////////////////////////////////////////////////
//      For each item in the array, create a list item    //
////////////////////////////////////////////////////////////
if (arrayOfTasks != null) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    // console.log(arrayOfTasks[i]);
    addListItem(arrayOfTasks[i].id, arrayOfTasks[i].value);
  }
}

////////////////////////////////////////////////////////////
//            Function to create new list items           //
////////////////////////////////////////////////////////////
function addListItem(id, value) {
  const li = document.createElement("li"); // variable for creation of an li-element inside the ul
  const p = document.createElement("p"); // variable for creation of a p-element inside the li
  const div = document.createElement("div"); // variable for creation of a p-element inside the li
  li.setAttribute("class", "list-item-added"); // set list-item and list-item-added classes to the li-element
  li.setAttribute("onclick", "clickLi(this)"); // set list-item and list-item-added classes to the li-element
  li.setAttribute("value", value); // set list-item and list-item-added classes to the li-element
  div.setAttribute("class", value); // set list-item and list-item-added classes to the li-element
  li.append(div, p); // to the new list item, add checkbox and p
  p.innerText = id; // the value of the input text field is assigned to the inner text of the new p-element
  taskList.prepend(li); // add the new list item to the top of the ul
}

////////////////////////////////////////////////////////////
//             Function to add value from input           //
//           text field to array and localstorage         //
////////////////////////////////////////////////////////////
function addToArrayAndStorage() {
  addListItem(inputText.value, valueTodo);
  if (arrayOfTasks == null) {
    arrayOfTasks = [{ id: inputText.value, value: valueTodo }];
  } else {
    arrayOfTasks.push({ id: inputText.value, value: valueTodo });
  }

  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  inputText.value = "";
}
////////////////////////////////////////////////////////////
//      Sequence to run when attempting to add task       //
////////////////////////////////////////////////////////////
function addTask() {
  if (inputText.value != "") {
    addToArrayAndStorage();
    inputText.value = ""; // clear the input field
  } else {
    // console.log("input empty!");
    inputEmptyWarning();
  }
}
////////////////////////////////////////////////////////////
//                    Call addTask                        //
//               when button is pressed                   //
////////////////////////////////////////////////////////////
inputButton.addEventListener("click", () => {
  if (checkIfDouble(inputText.value) == false) {
    addTask();
  }
});

////////////////////////////////////////////////////////////
//                    Call addTask                        //
//             when enter key is pressed                  //
////////////////////////////////////////////////////////////
inputText.addEventListener("keydown", (keypress) => {
  if (keypress.key === "Enter") {
    if (checkIfDouble(inputText.value) == false) {
      addTask();
    }
  }
});

////////////////////////////////////////////////////////////
//        Function to flash the input field red if        //
//          it is empty when trying to add task.          //
////////////////////////////////////////////////////////////
function inputEmptyWarning() {
  inputText.classList.add("input-empty-warning"); // add input-empty-warning class
  setTimeout(() => {
    inputText.classList.remove("input-empty-warning"); // remove input-empty-warning class after 1000ms
  }, 1000);
}

////////////////////////////////////////////////////////////
//                     Clear list when                    //
//                    button is pressed                   //
////////////////////////////////////////////////////////////
function clearWarning() {
  if (confirm("Do you want to clear the list?")) {
    arrayOfTasks = [];
    taskList.innerHTML = "";
    window.localStorage.clear();
  }
}

////////////////////////////////////////////////////////////
//     Toggle task status as done/todo when clicked       //
////////////////////////////////////////////////////////////
function clickLi(element) {
  let value = element.getAttribute("value"); // Get the attribute "value" from the li element
  if (value == "todo") {
    toggleValue("done", element);
    element.firstChild.classList.replace("todo", "done");
  } else {
    toggleValue("todo", element);
    element.firstChild.classList.replace("done", "todo");
  }
}

////////////////////////////////////////////////////////////
//        Change value in array and local storage         //
////////////////////////////////////////////////////////////
function toggleValue(setValue, item) {
  if (arrayOfTasks != null) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id == item.innerText) {
        arrayOfTasks[i].value = setValue;
        item.setAttribute("value", setValue); // ...else set to "todo"
        localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
      }
    }
  }
}

////////////////////////////////////////////////////////////
//            Check if the task already exists            //
//                    Not case sensitive                  //
////////////////////////////////////////////////////////////
function checkIfDouble(item) {
  if (arrayOfTasks != null) {
    let tempArray = arrayOfTasks.map((task) => ({
      id: task.id.toLowerCase(),
      value: task.value,
    }));
    let tempItem = item.toLowerCase();
    console.log(tempArray);
    if (tempArray != null) {
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i].id == tempItem) {
          inputEmptyWarning();
          return true;
        }
      }
    }
  }
  return false;
}
