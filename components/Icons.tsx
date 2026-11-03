const base = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
};

export const EditIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
);

export const DeleteIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
    </svg>
);

export const PlusIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
        <path d="M12 5v14M5 12h14" />
    </svg>
);

export const NextIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

export const PrevIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
        <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
);
