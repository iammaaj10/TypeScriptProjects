const input = document.getElementById("todo") as HTMLInputElement;
const submit = document.getElementById("btn") as HTMLInputElement;
const display = document.getElementById("todo-list") as HTMLInputElement;
const rem = document.getElementById('r') as HTMLInputElement

submit.addEventListener("click", () => {
  const accept = input.value.trim();
  if (accept === " ") return;

  const listItem = document.createElement("li");
  listItem.textContent = accept;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.onclick = () => display.removeChild(listItem);

  listItem.appendChild(deleteBtn);
  display.appendChild(listItem);

  input.value = "";
});
