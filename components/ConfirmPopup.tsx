const ConfirmPopup = (props: { title: string; onClose: () => void; onConfirm: () => void }) => {
    const { onClose, onConfirm, title } = props;
    return (
        <div
            className="modal-overlay fixed inset-0 z-200 flex flex-col items-center justify-center bg-gray-900/60"
            onClick={onClose}
        >
            <div
                className="modal min-w-100 overflow-hidden rounded bg-white p-8 shadow"
                onClick={event => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >
                <div className="modal-header mb-4 flex items-center justify-center">
                    <h2 className="text-2xl font-bold">{title}</h2>
                </div>
                <div className="modal-body flex gap-4 py-4">
                    <button
                        onClick={onConfirm}
                        className="mx-auto mt-8 cursor-pointer rounded bg-teal-700 px-6 py-3 text-lg font-semibold text-white hover:bg-teal-900"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onClose}
                        className="mx-auto mt-8 cursor-pointer rounded border border-teal-700 bg-white px-6 py-3 text-lg font-semibold text-teal-700 hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ConfirmPopup;
