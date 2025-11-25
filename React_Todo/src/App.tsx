import React, { useEffect, useReducer, useRef, useState } from "react";


type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

type State = {
  todos: Todo[];
  filter: "all" | "active" | "completed";
};

type Action =
  | { type: "add"; payload: { text: string } }
  | { type: "toggle"; payload: { id: string } }
  | { type: "delete"; payload: { id: string } }
  | { type: "edit"; payload: { id: string; text: string } }
  | { type: "clearCompleted" }
  | { type: "setFilter"; payload: { filter: State["filter"] } }
  | { type: "setTodos"; payload: { todos: Todo[] } };


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const newTodo: Todo = {
        id: String(Date.now()) + Math.random().toString(36).slice(2, 9),
        text: action.payload.text.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      return { ...state, todos: [newTodo, ...state.todos] };
    }
    case "toggle": {
      const todos = state.todos.map((t) =>
        t.id === action.payload.id ? { ...t, completed: !t.completed } : t
      );
      return { ...state, todos };
    }
    case "delete": {
      const todos = state.todos.filter((t) => t.id !== action.payload.id);
      return { ...state, todos };
    }
    case "edit": {
      const todos = state.todos.map((t) =>
        t.id === action.payload.id ? { ...t, text: action.payload.text } : t
      );
      return { ...state, todos };
    }
    case "clearCompleted": {
      const todos = state.todos.filter((t) => !t.completed);
      return { ...state, todos };
    }
    case "setFilter": {
      return { ...state, filter: action.payload.filter };
    }
    case "setTodos": {
      return { ...state, todos: action.payload.todos };
    }
    default:
      return state;
  }
}


const LS_KEY = "todos_v1";
function loadTodosFromLocalStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Todo[];
    // Basic validation
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveTodosToLocalStorage(todos: Todo[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  } catch {
    // ignore write errors
  }
}



function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <li className="flex items-center justify-between gap-3 p-3 bg-white/80 rounded shadow-sm">
      <div className="flex items-center gap-3">
        <input
          aria-label={`Toggle ${todo.text}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-4 h-4 rounded"
        />
        {!editing ? (
          <button
            className={`text-left wrap-break-words ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
            onDoubleClick={() => setEditing(true)}
            title="Double-click to edit"
          >
            {todo.text}
          </button>
        ) : (
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const trimmed = text.trim();
                if (trimmed) onEdit(todo.id, trimmed);
                setEditing(false);
              } else if (e.key === "Escape") {
                setText(todo.text);
                setEditing(false);
              }
            }}
            onBlur={() => {
              const trimmed = text.trim();
              if (trimmed) onEdit(todo.id, trimmed);
              setEditing(false);
            }}
            className="px-2 py-1 rounded border border-gray-200"
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">
          {new Date(todo.createdAt).toLocaleString()}
        </span>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-sm px-2 py-1 rounded hover:bg-red-50"
          aria-label={`Delete ${todo.text}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}


export default function TodoApp(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    todos: [],
    filter: "all",
  });

  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Load once on mount
  useEffect(() => {
    const fromLS = loadTodosFromLocalStorage();
    dispatch({ type: "setTodos", payload: { todos: fromLS } });
  }, []);

  // Persist when todos change
  useEffect(() => {
    saveTodosToLocalStorage(state.todos);
  }, [state.todos]);

  function handleAdd() {
    const trimmed = input.trim();
    if (!trimmed) return;
    dispatch({ type: "add", payload: { text: trimmed } });
    setInput("");
    inputRef.current?.focus();
  }

  const visibleTodos = state.todos.filter((t) => {
    if (state.filter === "all") return true;
    if (state.filter === "active") return !t.completed;
    return t.completed;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">ToDo — React + TS + Tailwind</h1>
          <p className="text-sm text-slate-500 mt-1">Build habits. Learn TypeScript by coding.</p>
        </header>

        <section className="bg-slate-50 p-4 rounded-lg shadow">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
              }}
              placeholder="Add a new task and press Enter"
              className="flex-1 px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded bg-slate-800 text-white hover:bg-slate-700"
            >
              Add
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                className={`px-2 py-1 rounded ${
                  state.filter === "all" ? "bg-slate-800 text-white" : "bg-white"
                }`}
                onClick={() => dispatch({ type: "setFilter", payload: { filter: "all" } })}
              >
                All
              </button>
              <button
                className={`px-2 py-1 rounded ${
                  state.filter === "active" ? "bg-slate-800 text-white" : "bg-white"
                }`}
                onClick={() => dispatch({ type: "setFilter", payload: { filter: "active" } })}
              >
                Active
              </button>
              <button
                className={`px-2 py-1 rounded ${
                  state.filter === "completed" ? "bg-slate-800 text-white" : "bg-white"
                }`}
                onClick={() =>
                  dispatch({ type: "setFilter", payload: { filter: "completed" } })
                }
              >
                Completed
              </button>
            </div>

            <div className="text-sm text-gray-500">
              {state.todos.filter((t) => !t.completed).length} items left
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {visibleTodos.length === 0 ? (
              <li className="text-center text-gray-400 py-6">No tasks here — add one! </li>
            ) : (
              visibleTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={(id) => dispatch({ type: "toggle", payload: { id } })}
                  onDelete={(id) => dispatch({ type: "delete", payload: { id } })}
                  onEdit={(id, text) => dispatch({ type: "edit", payload: { id, text } })}
                />
              ))
            )}
          </ul>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => dispatch({ type: "clearCompleted" })}
              className="text-sm text-red-600 hover:underline"
            >
              Clear completed
            </button>

            <div className="text-sm text-gray-500">Total: {state.todos.length}</div>
          </div>
        </section>

        <footer className="mt-4 text-xs text-gray-400 text-center">
          Tip: double-click a task to edit it. Esc to cancel edit.
        </footer>
      </div>
    </div>
  );
}
