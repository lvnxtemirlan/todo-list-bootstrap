// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const header = document.querySelector(".username");
const todoListHistory = document.querySelector(".todoListHistory");



// onkeyup event
if (window.location.href.search("index") > 0) {
  inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; //getting user entered value
    if (userEnteredValue.trim() != 0) { //if the user value isn't only spaces
      addBtn.classList.add("active"); //active the add button
    } else {
      addBtn.classList.remove("active"); //unactive the add button
    }
  }

  const setUserName = () => {
    let person = prompt("What is your name?", "Harry Potter");
    let text;
    if (person == null || person == "") {
      text = "User cancelled the prompt.";
    } else {
      let str = person.toLowerCase();
      let text2 = str.charAt(0).toUpperCase() + str.slice(1);
      text = "Hello " + text2;

    }
    localStorage.setItem("User", text)
  };
  let user_status = localStorage.getItem("User");

  if (user_status == null || user_status == "") {
    setUserName();
    location.reload();

  } else {
    header.innerHTML = localStorage.getItem("User");
  }

  showTasks();

  addBtn.onclick = () => { //when user click on plus icon button
    var audio = new Audio("./Mmmmh.mp3");
    audio.play();

    let userEnteredValue = inputBox.value; //getting input field value
    let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorageData == null) { //if localstorage has no data
      listArray = []; //create a blank array
    } else {
      listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
    }
    listArray.push(userEnteredValue); //pushing or adding new value in array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
    showTasks(); //calling showTask function
    addBtn.classList.remove("active"); //unactive the add button once the task added
  }


  // delete all tasks function
  deleteAllBtn.onclick = () => {

    let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorageData == null) { //if localstorage has no data
      listArray = []; //create a blank array
    } else {
      listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
      listArray = []; //create a blank array
    }
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage

    showTasks(); //call the showTasks function
    // var audio = new Audio("./airball.mp3");
    // audio.play();
  }
}



//calling showTask function
if (window.location.href.search("history") > 0) {
  showTasksHistory();
};




function showTasks() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if (listArray.length > 0) { //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  } else {
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

function showTasksHistory() {
  let getLocalStorageData = localStorage.getItem("History Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon"></i></span></li>`;
  });
  todoListHistory.innerHTML = newLiTag; //adding new li tag inside ul tag
  // inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  let getHistoryLocalStorageData = localStorage.getItem("History Todo");

  if (getHistoryLocalStorageData == null) {
    histArray = [];
  } else {
    histArray = JSON.parse(getHistoryLocalStorageData);
  }

  histArray.push(listArray.splice(index, 1)[0]);
  localStorage.setItem("History Todo", JSON.stringify(histArray));
  console.log(localStorage.getItem("History Todo"));
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

