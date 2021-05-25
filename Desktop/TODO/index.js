const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach(todo => {
        add(todo);
    })
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    add();
});

function add(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }
    // if (todoText.length > 0)も可
    if (todoText) {
        // liタグ作成
        const li = document.createElement("li");
        li.innerText = todoText;
        li.classList.add("list-group-item");

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }
        // 右クリックで削除
        li.addEventListener("contextmenu", function(event) {
            event.preventDefault();
            li.remove();
            saveData();
        });
        // 左クリックで取り消し線
        li.addEventListener("click", function () {
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });
        //　ul内に追加
        ul.appendChild(li);
        input.value = "";
        saveData();
    }
}

//ローカルストレージに保存する
function saveData() {
    let todos = [];
    const lists = document.querySelectorAll("li");
    lists.forEach(list => {
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        };
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}