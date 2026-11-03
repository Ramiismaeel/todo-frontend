import { type Todo, Status, type StatusLabel } from "../types/todo";
import TodoCard from "./TodoCard";

type Props = {
    todos: Todo[];
    title: StatusLabel;
    status: Status;
    onEdit: (todo: Todo) => void;
    onDelete: (id: string) => void;
    onPrev: (todo: Todo) => void;
    onNext: (todo: Todo) => void;
};
const TodoColumn = (props: Props) => {
    const { todos, title, status, onDelete, onEdit, onNext, onPrev } = props;
    return (
        <div
            className={
                "flex w-full flex-col rounded-md border border-amber-700 px-8 pb-8 col-" + status
            }
        >
            <h2 className="py-8 text-center text-2xl font-bold">{title}</h2>
            <div className="flex w-full flex-col gap-4">
                {todos.map(todo => (
                    <TodoCard
                        key={todo.id}
                        todo={todo}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onNext={onNext}
                        onPrev={onPrev}
                    />
                ))}
            </div>
        </div>
    );
};
export default TodoColumn;
