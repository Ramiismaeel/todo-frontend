import { Status, type Todo } from "../types/todo";

export const todos: Todo[] = [
    {
        id: "1",
        description: "Todo 1",
        status: Status.OPEN,
    },
    {
        id: "2",
        description: "Description of Todo 2",
        status: Status.OPEN,
    },
    {
        id: "3",
        description: "Description of Todo 3",
        status: Status.OPEN,
    },
    {
        id: "4",
        description: "Description of Todo 4",
        status: Status.IN_PROGRESS,
    },
    {
        id: "5",
        description: "Description of Todo 5",
        status: Status.IN_PROGRESS,
    },
    {
        id: "6",
        description: "Description of Todo 6",
        status: Status.IN_PROGRESS,
    },
    {
        id: "7",
        description: "Description of Todo 7",
        status: Status.DONE,
    },
    {
        id: "8",
        description: "Description of Todo 8",
        status: Status.DONE,
    },
];
