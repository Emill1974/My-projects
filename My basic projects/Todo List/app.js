const form = document.getElementById("todoAddForm")
const addInput = document.getElementById("todoName")
const todoList = document.querySelector(".list-group")
const firstCardbody = document.querySelector(".card-body-1")
const secondCardbody = document.querySelector(".card-body-2")
const clearButton = document.getElementById("clearButton")
const inputSearch = document.getElementById("todoSearch")

let todos = [];

runEvents()

function runEvents() {
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", pageLoad)
    secondCardbody.addEventListener("click", removeTodo)
    clearButton.addEventListener("click", allTodosremove)
    inputSearch.addEventListener("keydown", filterTodo)
}

// -------

function pageLoad() {
    checkStorage()
    todos.forEach(function (todo) {
        addTodoUI(todo)
    })
}

// -------

function addTodo(e) {
    const inputText = addInput.value.trim()
    if (inputText === null || inputText === "") {
        ShowAlert("danger", "Please add todo!")
    } else {

        addTodoUI(inputText)
        // ADD localstorage func
        addLocalstorage(inputText)
        ShowAlert("success", "Todo added")

    }
    e.preventDefault()
}

// -------

function addTodoUI(newTodo) {
    //     <!--
    //     <li class="list-group-item d-flex justify-content-between">Todo 1
    //         <a href="#" class="delete-item">
    //             <i class="fa fa-remove"></i>
    //         </a>
    //     </li>
    // -->
    const li = document.createElement("li")
    li.className = "list-group-item d-flex justify-content-between"
    li.textContent = newTodo

    const a = document.createElement("a")
    a.href = "#"
    a.className = "delete-item"

    const i = document.createElement("i")
    i.className = "fa fa-remove"

    a.appendChild(i)
    li.appendChild(a)
    todoList.appendChild(li)
    addInput.value = ""
}


// -------

function addLocalstorage(newTodo) {
    checkStorage()
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

// -------

function checkStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
}

// -------

function ShowAlert(type, message) {
    const div = document.createElement("div")
    div.className = `alert alert-${type}`
    div.textContent = message
    firstCardbody.appendChild(div)
    setTimeout(function () {
        div.remove()
    }, 2000)
}

// -------

function removeTodo(e) {

    // Remove UI
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement.parentElement
        todo.remove()
        // Remove Local Storage
        removeLocal(todo.textContent)

        // Alert
        ShowAlert("success", "Todo removed")

    }
}

// -------

function removeLocal(removetodos) {
    checkStorage()
    todos.forEach(function (todoo, index) {
        if (removetodos === todoo) {
            todos.splice(index, 1)
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos))

}
// -------

function allTodosremove() {
    const Listitem = document.querySelectorAll(".list-group-item")
    if (Listitem.length !== 0) {
        // Remove UI
        Listitem.forEach(function (todo) {
            todo.remove()



        })
        //    Remove all Local Storage
        todos = []
        localStorage.setItem("todos", JSON.stringify(todos))
        ShowAlert("success", "Todos deleted!")
    } else {
        ShowAlert("danger", "Add todo for delete all!")
    }

}


// -------


function filterTodo(e) {
    const filterValue = e.target.value.toLowerCase().trim()
    const Listtodos = document.querySelectorAll(".list-group-item")
    Listtodos.forEach(function (todo) {
        if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
            todo.setAttribute("style", "display : block")
        } else {
            todo.setAttribute("style", "display : none !important")
        }

    }
    )
}