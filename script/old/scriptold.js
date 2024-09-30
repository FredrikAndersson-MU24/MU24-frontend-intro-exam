////////////////////////////////////////////////////////////
//              Function to call addTask                  //
//               when button is pressed                   //
////////////////////////////////////////////////////////////
const inputButton = document.querySelector(".input-button");
inputButton.addEventListener("click", () => {
  addTask();
});

////////////////////////////////////////////////////////////
//              Function to call addTask                  //
//             when enter key is pressed                  //
////////////////////////////////////////////////////////////
const inputText = document.querySelector(".input-text");
inputText.addEventListener("keyup", (keypress) => {
  if (keypress.key === "Enter") {
    addTask();
  }
});

////////////////////////////////////////////////////////////
//         Function to create a new list item             //
//         from input field if it is not empty            //
////////////////////////////////////////////////////////////
function createNewListItem() {
  const inputText = document.querySelector(".input-text").value;
  const taskListEntry = document.querySelector(".taskList");
  let li = document.createElement("li"); // create a li-element inside the ul
  let checkbox = document.createElement("input"); // create an input-element inside the li
  let p = document.createElement("p"); // create a p-element inside the li
  checkbox.setAttribute("type", "checkbox"); // set the type of the input element to checkbox
  li.setAttribute("class", "list-item list-item-added"); // set list-item and list-item-added classes to the li-element
  li.prepend(checkbox, p);
  p.innerText = inputText; // assign the value of the input text field to the
  taskListEntry.prepend(li);
  console.log(li.childNodes);
}
////////////////////////////////////////////////////////////
//        Function to flash the input field red if        //
//          it is empty when trying to add task.          //
//    It adds and then removes the input-empty-warning    //
//                class to the input field.               //
////////////////////////////////////////////////////////////
function inputEmptyWarning() {
  const inputText = document.querySelector(".input-text");
  inputText.classList.add("input-empty-warning"); // add input-empty-warning class
  setTimeout(() => {
    inputText.classList.remove("input-empty-warning"); // remove input-empty-warning class after 1000ms
  }, 1000);
}

////////////////////////////////////////////////////////////
// Create a new list item if the input field IS NOT empty //
//     Trigger a warning if the input field IS empty.     //
////////////////////////////////////////////////////////////
function addTask() {
  const inputText = document.querySelector(".input-text").value;
  if (inputText != "") {
    createNewListItem(); // call the function to create a new list item
    document.querySelector(".input-text").value = ""; // clear the input field
  } else {
    console.log("input empty!");
    inputEmptyWarning();
  }
}
