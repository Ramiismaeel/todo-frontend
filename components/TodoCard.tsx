import { Status, type Todo } from "../types/todo";
import { EditIcon, DeleteIcon, NextIcon, PrevIcon } from "./Icons";

const TodoCard = (props: {
    todo: Todo;
    onEdit: (todo: Todo) => void;
    onDelete: (id: string) => void;
    onNext: (todo: Todo) => void;
    onPrev: (todo: Todo) => void;
}) => {
    const { id, description, status } = props.todo;
    const { onEdit, onDelete, onNext, onPrev } = props;

    const statusClass = (state: Status): string => {
        switch (state) {
            case Status.DONE:
                return "bg-green-600";
            case Status.IN_PROGRESS:
                return "bg-blue-600";
            case Status.OPEN:
                return "bg-amber-600";
            default:
                return "bg-amber-600";
        }
    };
    const hasNext = status !== Status.DONE;
    const hasPrev = status !== Status.OPEN;
    return (
        <div className="w-full items-center rounded border bg-white p-3 text-lg text-black shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <span className="relative mt-1 flex size-2">
                        <span
                            className={
                                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 " +
                                statusClass(status)
                            }
                        ></span>
                        <span
                            className={
                                "relative inline-flex size-2 rounded-full " + statusClass(status)
                            }
                        ></span>
                    </span>
                    <p className="ml-2 font-medium">{description}</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => onEdit(props.todo)}
                        title="Edit"
                        className="cursor-pointer hover:text-teal-700"
                    >
                        <EditIcon />
                    </button>
                    <button
                        title="Delete"
                        onClick={() => onDelete(id)}
                        className="cursor-pointer hover:text-teal-700"
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>
            <div className={"mt-4 flex w-full " + (!hasPrev ? " justify-end" : "justify-between")}>
                {hasPrev && (
                    <button
                        onClick={() => onPrev(props.todo)}
                        name="Edit"
                        className="flex cursor-pointer items-center hover:text-teal-700"
                    >
                        <PrevIcon size={24} />
                        Back
                    </button>
                )}
                {hasNext && (
                    <button
                        name="Delete"
                        onClick={() => onNext(props.todo)}
                        className="flex cursor-pointer items-center hover:text-teal-700"
                    >
                        Next
                        <NextIcon size={24} />
                    </button>
                )}
            </div>
        </div>
    );
};
export default TodoCard;
