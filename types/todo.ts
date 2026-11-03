export const Status = {
    OPEN: "OPEN",
    IN_PROGRESS: "IN_PROGRESS",
    DONE: "DONE",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export const StatusLabels: Record<Status, string> = {
    [Status.OPEN]: "Open",
    [Status.IN_PROGRESS]: "In Progress",
    [Status.DONE]: "Done",
};
export type StatusLabel = (typeof StatusLabels)[Status];

export type Todo = {
    id: string;
    description: string;
    status: Status;
};

export const nextStatus: Record<Status, Status | null> = {
    [Status.OPEN]: Status.IN_PROGRESS,
    [Status.IN_PROGRESS]: Status.DONE,
    [Status.DONE]: null,
};

export const prevStatus: Record<Status, Status | null> = {
    [Status.OPEN]: null,
    [Status.IN_PROGRESS]: Status.OPEN,
    [Status.DONE]: Status.IN_PROGRESS,
};
