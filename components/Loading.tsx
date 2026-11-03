type LoadingProps = {
    loading: boolean;
};

const Loading = ({ loading }: LoadingProps) => {
    if (!loading) return null;

    return (
        <div role="status" aria-label="Loading" className="flex items-center justify-center p-4">
            <div className="h-32 w-32 animate-spin rounded-full border-8 border-blue-200 border-t-blue-600" />
        </div>
    );
};

export default Loading;
