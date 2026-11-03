import { type SubmitEvent, useState } from "react";

import { StatusLabels, Status } from "../types/todo";
import Loading from "./Loading";

export type TodoFormValues = {
    description: string;
    status: Status;
};

type BaseProps = {
    onClose: () => void;
    title?: string;
};

type CreateProps = BaseProps & {
    mode: "create";
    onSubmit: (values: Pick<TodoFormValues, "description">) => void;
};

type EditProps = BaseProps & {
    mode: "edit";
    todo: TodoFormValues;
    onSubmit: (values: TodoFormValues) => void;
};

type ModalProps = CreateProps | EditProps;

const TodoFormModal = (props: ModalProps) => {
    const { onClose, mode, title } = props;
    const isEdit = props.mode === "edit";

    const [description, setDescription] = useState(isEdit ? props.todo.description : "");
    const [status, setStatus] = useState<Status>(isEdit ? props.todo.status : Status.OPEN);

    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setSubmitting(true);
        setSubmitError(null);
        setLoading(true);
        try {
            if (mode === "edit") {
                await props.onSubmit({ description, status });
            } else {
                await props.onSubmit({ description });
            }
            onClose();
        } catch (error: unknown) {
            console.error(error);
            setSubmitError(isEdit ? "Todo could not be saved." : "Todo could not be created.");
            setSubmitting(false);
        } finally {
            setLoading(false);
        }
    }
    function handleClose() {
        if (!submitting) onClose();
    }

    return (
        <div
            className="modal-overlay fixed inset-0 z-100 flex flex-col items-center justify-center bg-gray-900/60"
            onClick={onClose}
        >
            <div
                className="modal min-w-120 overflow-hidden rounded bg-white p-8 shadow"
                onClick={event => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >
                {loading ? (
                    <Loading loading />
                ) : (
                    <>
                        <div className="modal-header mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">{title}</h2>
                            <button
                                type="button"
                                onClick={handleClose}
                                aria-label="Close modal"
                                className="cursor-pointer rounded border-none bg-none text-2xl font-bold transition duration-200 hover:scale-[1.1]"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="description">
                                        Description:<span className="text-xl font-bold">*</span>
                                    </label>
                                    <input
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        required
                                        autoFocus
                                        type="text"
                                        id="description"
                                        name="description"
                                        className="w-full rounded border border-gray-400 p-3"
                                    />
                                </div>
                                {mode === "edit" && (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="status">
                                            Description:<span className="text-xl font-bold">*</span>
                                        </label>
                                        <select
                                            value={status}
                                            onChange={e => setStatus(e.target.value as Status)}
                                            required
                                            id="status"
                                            name="status"
                                            className="w-full rounded border border-gray-400 p-3"
                                        >
                                            {Object.values(Status).map(s => (
                                                <option key={s} value={s}>
                                                    {StatusLabels[s]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {submitError && (
                                    <p role="alert" className="rounded bg-red-50 p-3 text-red-700">
                                        {submitError}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="mx-auto mt-8 cursor-pointer rounded bg-teal-700 px-6 py-3 text-lg font-semibold text-white hover:bg-teal-900 disabled:cursor-wait disabled:opacity-60"
                                >
                                    {submitting ? "Saving..." : isEdit ? "Save" : "Create"}
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
export default TodoFormModal;
