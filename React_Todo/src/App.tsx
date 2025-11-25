import { useState } from "react";

type Todo = {
  id: number;
  text: string;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  function addTodo() {
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
    };

    setTodos([...todos, newTodo]);
    setInput("");
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Simple Todo</h1>
        <p className="text-sm text-slate-500 mb-4">Add tasks, remove when done — clean & simple.</p>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Type a new task and press Enter"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
          >
            Add
          </button>
        </div>

        <div className="mt-5">
          <ul className="space-y-3">
            {todos.length === 0 ? (
              <li className="text-center text-gray-400 py-8">No tasks — add your first one!</li>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between gap-4 p-3 bg-white rounded-lg shadow-sm border"
                >
                  <span className="break-words text-slate-700">{todo.text}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-sm px-3 py-1 rounded-full bg-rose-100 text-rose-700 hover:bg-rose-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <div>{todos.length} total</div>
          <div className="italic">Tip: press Enter to add</div>
        </div>
      </div>
    </div>
  );
}
