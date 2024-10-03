const inputText = document.querySelector(".input-text"); // QuerySelector for the input text field
const searchButton = document.querySelector(".search-button"); // QuerySelector for the Add task-button
const searchText = document.querySelector(".search-text"); // QuerySelector for the input text field
const inputButton = document.querySelector(".input-button"); // QuerySelector for the Add task-button
const taskList = document.querySelector(".tasklist"); // QuerySelector for the list of tasks
const box = document.querySelector(".todo"); // QuerySelector for the "checkbox""
const valueTodo = "todo"; // Variable to set the default value of new tasks

////////////////////////////////////////////////////////////
//         When loading the page, get items from          //
//                LocalStorage to array                   //
////////////////////////////////////////////////////////////
let jsonFromLocalStorage = localStorage.getItem("tasks"); // assign localstorage items to variable
let arrayOfTasks = JSON.parse(jsonFromLocalStorage); // parse the json to array
//      For each item in the array, create a list item    //
if (arrayOfTasks != null) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    // console.log(arrayOfTasks[i]);
    addListItem(arrayOfTasks[i].id, arrayOfTasks[i].value);
  }
}

////////////////////////////////////////////////////////////
//                    Call addTask                        //
//            when input button is pressed                //
////////////////////////////////////////////////////////////
inputButton.addEventListener("click", () => {
  if (checkIfNotDouble(inputText.value)) {
    addTask();
  }
});

////////////////////////////////////////////////////////////
//                    Call addTask                        //
//             when enter key is pressed                  //
////////////////////////////////////////////////////////////
inputText.addEventListener("keydown", (keypress) => {
  if (keypress.key === "Enter") {
    if (checkIfNotDouble(inputText.value)) {
      addTask();
    }
  }
});

////////////////////////////////////////////////////////////
//      Sequence to run when attempting to add task       //
////////////////////////////////////////////////////////////
function addTask() {
  if (inputText.value != "") {
    addToArrayAndStorage();
    inputText.value = ""; // clear the input field
  } else {
    // console.log("input empty!");
    inputText.classList.add("input-empty-warning"); // add input-empty-warning class
    setTimeout(() => {
      inputText.classList.remove("input-empty-warning"); // remove input-empty-warning class after x ms
    }, 400);
  }
}

////////////////////////////////////////////////////////////
//             Function to add value from input           //
//           text field to array and localstorage         //
////////////////////////////////////////////////////////////
function addToArrayAndStorage() {
  addListItem(inputText.value, valueTodo);
  if (arrayOfTasks === null) {
    arrayOfTasks = [{ id: inputText.value, value: valueTodo }];
  } else {
    arrayOfTasks.push({ id: inputText.value, value: valueTodo });
  }
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  inputText.value = "";
}

////////////////////////////////////////////////////////////
//            Function to create new list items           //
////////////////////////////////////////////////////////////
function addListItem(id, value) {
  const li = document.createElement("li"); // variable for creation of an li-element inside the ul
  const div = document.createElement("div"); // variable for creation of a div-element inside the li
  const p = document.createElement("p"); // variable for creation of a p-element inside the li
  li.setAttribute("class", "list-item-added"); // set list-item and list-item-added classes to the li-element
  li.setAttribute("onclick", "clickLi(this)"); // set the onclick attribute of the li-element to call clickLi() function
  li.setAttribute("value", value); // Set the value of the li to the correct value (from LS or var valueTodo if new task)
  div.setAttribute("class", value); // Set the value of the "checkbox"" to the correct value (from LS or var valueTodo if new task)
  li.append(div, p); // add "checkbox"-div and p to the new list item
  p.innerText = id; // the inner text of the new p-element set to the correct value (from LS or var inputText.value if new task)
  taskList.prepend(li); // add the new list item to the top of the ul
}

////////////////////////////////////////////////////////////
//                    Clear list when                     //
//                clear button is pressed                 //
//                  Called by onClick()                   //
////////////////////////////////////////////////////////////
function clearWarning() {
  if (
    confirm("Do you want to clear the list? This will remove all list entries!")
  ) {
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
  if (value === "todo") {
    toggleValue("done", element);
    element.firstChild.classList.replace("todo", "done");
  } else {
    toggleValue("todo", element);
    element.firstChild.classList.replace("done", "todo");
  }
}

////////////////////////////////////////////////////////////
//        Change value in array and local storage         //
//              if status of task is changed              //
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
function checkIfNotDouble(item) {
  if (arrayOfTasks != null) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id.toLowerCase() === item.toLowerCase()) {
        inputText.classList.add("input-double-warning"); // add input-empty-warning class
        setTimeout(() => {
          inputText.classList.remove("input-double-warning"); // remove input-empty-warning class after x ms
        }, 400);

        return false;
      }
    }
  }
  return true;
}
////////////////////////////////////////////////////////////
//            Sort the tasks in ascending order           //
////////////////////////////////////////////////////////////
function sortDesc() {
  if (arrayOfTasks != null) {
    let tempArray2 = arrayOfTasks.map((task) => ({
      id: task.id,
      value: task.value,
    }));
    tempArray2.sort((a, b) => a.id.localeCompare(b.id));
    taskList.innerHTML = "";
    for (let i = 0; i < tempArray2.length; i++) {
      // console.log(arrayOfTasks[i]);
      addListItem(tempArray2[i].id, tempArray2[i].value);
    }
  }
}
////////////////////////////////////////////////////////////
//            Sort the tasks in descending order          //
////////////////////////////////////////////////////////////
function sortAsc() {
  if (arrayOfTasks != null) {
    let tempArray2 = arrayOfTasks.map((task) => ({
      id: task.id,
      value: task.value,
    }));
    tempArray2.sort((a, b) => b.id.localeCompare(a.id));
    taskList.innerHTML = "";
    for (let i = 0; i < tempArray2.length; i++) {
      // console.log(arrayOfTasks[i]);
      addListItem(tempArray2[i].id, tempArray2[i].value);
    }
  }
}
//////////////////////////////////////////////////////////////
//      Sort the tasks in the original order of entry       //
//////////////////////////////////////////////////////////////
function unsort() {
  if (arrayOfTasks != null) {
    taskList.innerHTML = "";
    for (let i = 0; i < arrayOfTasks.length; i++) {
      // console.log(arrayOfTasks[i]);
      addListItem(arrayOfTasks[i].id, arrayOfTasks[i].value);
    }
  }
}

////////////////////////////////////////////////////////////
//                          Search                        //
//                      Case sensitive                    //
//                      Complete match                    //
////////////////////////////////////////////////////////////
function search(item) {
  if (arrayOfTasks != null) {
    let tempItem = item;
    let tempArray = [];
    if (arrayOfTasks != null) {
      for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id === tempItem) {
          tempArray.push({
            id: arrayOfTasks[i].id,
            value: arrayOfTasks[i].value,
          });
        }
      }
    }
    taskList.innerHTML = "";
    for (let i = 0; i < tempArray.length; i++) {
      // console.log(arrayOfTasks[i]);
      addListItem(tempArray[i].id, tempArray[i].value);
      searchText.value = "";
    }
  }
}
