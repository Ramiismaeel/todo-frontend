import { StatusLabels, Status, type Todo, prevStatus, nextStatus } from "../types/todo";
import TodoColumn from "../components/TodoColumn";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import TodoFormModal, { type TodoFormValues } from "../components/TodoFormModal";
import ConfirmPopup from "../components/ConfirmPopup";
import { PlusIcon } from "../components/Icons";

const cols = [
    {
        title: StatusLabels.OPEN,
        status: Status.OPEN,
    },
    {
        title: StatusLabels.IN_PROGRESS,
        status: Status.IN_PROGRESS,
    },
    {
        title: StatusLabels.DONE,
        status: Status.DONE,
    },
];

const Home = () => {
    const [todos, setTodos] = useState<Todo[] | null>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modal, setModal] = useState<{ mode: "create" } | { mode: "edit"; todo: Todo } | null>(
        null,
    );
    const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

    async function createNewTodo({ description }: Pick<TodoFormValues, "description">) {
        await axios.post("/api/todo", { description });
        refresh();
    }

    const [reload, setReload] = useState(0);
    const refresh = () => setReload(r => r + 1);

    useEffect(() => {
        const controller = new AbortController();
        const getAllTodos = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios({
                    method: "GET",
                    url: "/api/todo",
                    signal: controller.signal,
                });
                if (response.status !== 200) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                setTodos(response.data);
            } catch (e: unknown) {
                if (axios.isCancel(e)) return;
                console.error(e);
                setTodos(null);
                setError("Could not load characters. Please try again.");
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        void getAllTodos();
        return () => controller.abort();
    }, [reload]);

    async function deleteTodo(id: string) {
        const response = await axios.delete(`/api/todo/${id}`);
        if (response.status === 200) {
            setTodoToDelete(null);
            refresh();
        }
    }
    async function editTodo(id: string, values: TodoFormValues) {
        await axios.put(`/api/todo/${id}`, values);
        refresh();
    }

    async function moveNext(todo: Todo) {
        const next = nextStatus[todo.status];
        if (!next) return;

        await axios.put(`/api/todo/${todo.id}`, { description: todo.description, status: next });
        refresh();
    }

    async function movePrev(todo: Todo) {
        const next = prevStatus[todo.status];
        if (!next) return;

        await axios.put(`/api/todo/${todo.id}`, { description: todo.description, status: next });
        refresh();
    }

    const groupedColumns = useMemo(() => {
        const group: Record<Status, Todo[]> = {
            OPEN: [],
            IN_PROGRESS: [],
            DONE: [],
        };
        if (todos) {
            for (const t of todos) {
                group[t.status].push(t);
            }
        }

        return group;
    }, [todos]);

    if (loading) {
        return <Loading loading />;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <>
            <div className="w-full">
                <h1 className="py-6 text-center text-4xl font-bold">Todo app</h1>
                <button
                    className="my-4 flex cursor-pointer items-center gap-1 rounded border bg-gray-200 p-2 font-semibold text-teal-700 hover:bg-gray-300 hover:text-teal-900"
                    onClick={() => setModal({ mode: "create" })}
                >
                    Create new todo <PlusIcon size={24} />
                </button>
                <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-3 md:gap-6 lg:gap-8 xl:gap-10">
                    {cols.map(col => (
                        <TodoColumn
                            key={col.status}
                            todos={groupedColumns[col.status]}
                            title={col.title}
                            status={col.status}
                            onEdit={e => setModal({ mode: "edit", todo: e })}
                            onDelete={todo => setTodoToDelete(todo)}
                            onPrev={movePrev}
                            onNext={moveNext}
                        />
                    ))}
                </div>
            </div>
            {modal?.mode === "create" && (
                <TodoFormModal
                    key="create"
                    mode="create"
                    onSubmit={createNewTodo}
                    onClose={() => setModal(null)}
                    title="Create new Todo"
                />
            )}
            {modal?.mode === "edit" && (
                <TodoFormModal
                    key={modal?.todo.id}
                    mode="edit"
                    todo={modal.todo}
                    onSubmit={values => editTodo(modal.todo.id, values)}
                    onClose={() => setModal(null)}
                    title="Edit Todo"
                />
            )}
            {todoToDelete && (
                <ConfirmPopup
                    onClose={() => setTodoToDelete(null)}
                    onConfirm={() => deleteTodo(todoToDelete)}
                    title="Delete Todo"
                />
            )}
        </>
    );
};
export default Home;
