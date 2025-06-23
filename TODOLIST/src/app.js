"use strict";
const input = document.getElementById("todo");
const submit = document.getElementById("btn");
const display = document.getElementById("todo-list");
const rem = document.getElementById('r');
submit.addEventListener("click", () => {
    const accept = input.value.trim();
    if (accept === " ")
        return;
    const listItem = document.createElement("li");
    listItem.textContent = accept;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = () => display.removeChild(listItem);
    listItem.appendChild(deleteBtn);
    display.appendChild(listItem);
    input.value = "";
});
