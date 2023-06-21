let addInput = document.getElementById("add-task");
let addbtn = document.querySelector(".add-btn");
let taskField = document.querySelector(".tasks-field");
let taskarry = [];
let thedate = new Date();
let theTaskDate = `${thedate.getFullYear()}/${thedate.getMonth() + 1}/${thedate.getDate()} || ${thedate.getHours()}:${thedate.getMinutes()}`;

let addDiv = (data, stuts ,tdate) => {
    let tdiv = document.createElement("div");
    let sdiv = document.createElement("div");
    let tP = document.createElement("p");
    let checkBox = document.createElement("input");
    let delBtn = document.createElement("i");
    let updateBtn = document.createElement("i");
    let taskDate =document.createElement("span");
    console.log(tdate)
    updateBtn.className = "update-btn fa-solid fa-pen-to-square";
    taskDate.className = "task-date";
    taskDate.innerText = `${tdate}`;
    delBtn.className = "fa-solid fa-trash";
    checkBox.setAttribute("type", "checkbox");
    checkBox.className = "checkbox";
    checkBox.checked = stuts;
    tdiv.className = "task-div";
    tdiv.setAttribute("title", `${data}`);
    tP.innerText = `${data}`;
    sdiv.className = "btns";

    sdiv.appendChild(delBtn);
    sdiv.appendChild(updateBtn);
    tdiv.appendChild(taskDate);
    tdiv.appendChild(tP);
    tdiv.appendChild(sdiv);
    tdiv.appendChild(checkBox);
    taskField.appendChild(tdiv);
    /////////////////////////////////
    //delete button function 
    /////////////////////////////////
    delBtn.addEventListener("click", () => {
        let gettasks = JSON.parse(localStorage.getItem("Tasks"));
        gettasks.forEach((e) => {
            if (e.task.taskName === delBtn.parentElement.parentElement.title) {
                console.log("yes");
                let taskindex = gettasks.indexOf(e);
                console.log(gettasks.indexOf(e));
                gettasks.splice(taskindex, 1);
                localStorage.setItem("Tasks", JSON.stringify(gettasks));
            }
        });
        delBtn.parentElement.parentElement.remove();
    });
    /////////////////////////////////
    //update function 
    /////////////////////////////////
    updateBtn.addEventListener("click", () => {
        let newtask = prompt("enter the new task : ");
        let gettasks = JSON.parse(localStorage.getItem("Tasks"));
        gettasks.forEach((e) => {
            if (e.task.taskName === updateBtn.parentElement.parentElement.title) {
                e.task.taskName = newtask;
                localStorage.setItem("Tasks", JSON.stringify(gettasks));
                window.location.reload();
            }
    })
});
    /////////////////////////////////
    //checkbox function 
    /////////////////////////////////
    checkBox.onchange = () => {
        if (checkBox.checked) {
            tdiv.classList.add("done");
            let gettasks = JSON.parse(localStorage.getItem("Tasks"));
            gettasks.forEach((e) => {
                if (e.task.taskName === tdiv.title) {
                    e.task.taskStatus = true;
                    localStorage.setItem("Tasks", JSON.stringify(gettasks));
                }
            });
        } else {
            tdiv.classList.remove("done");
            let gettasks = JSON.parse(localStorage.getItem("Tasks"));
            gettasks.forEach((e) => {
                if (e.task.taskName === tdiv.title) {
                    e.task.taskStatus = false;
                    localStorage.setItem("Tasks", JSON.stringify(gettasks));
                }
            });
        }
    };
};

/////////////////////////////////
//check the Tasks function 
/////////////////////////////////
function cheak() {
    if (localStorage.getItem("Tasks")) {
        let gettasks = JSON.parse(localStorage.getItem("Tasks"));
        gettasks.forEach((e) => {
            addDiv(e.task.taskName, e.task.taskStatus, e.task.taskDate);
        });
    }
}

let AddTask = () => {
    addDiv(addInput.value, false , theTaskDate);
    let checkBox = document.querySelector(".checkbox");
    if (localStorage.getItem("Tasks")) {
        let getData = JSON.parse(localStorage.getItem("Tasks"));
        let tasks = {
            task: {
                taskName: `${addInput.value}`,
                taskStatus: `${checkBox.checked}`,
                taskDate: theTaskDate
            },
        };
        getData.push(tasks);
        let returnData = JSON.stringify(getData);
        console.log(returnData);
        localStorage.setItem("Tasks", returnData);
    } else {
        let tasks = {
            task: {
                taskName: `${addInput.value}`,
                taskStatus: `${checkBox.checked}`,
                taskDate: theTaskDate
            },
        };
        taskarry.push(tasks);
        let addT = JSON.stringify(taskarry);
        localStorage.setItem("Tasks", addT);
        console.log(addT);
    }
};

addbtn.addEventListener("click", (e) => {
    e.preventDefault();
    AddTask();
    addInput.value = "";
});

cheak();
