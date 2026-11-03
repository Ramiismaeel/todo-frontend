import { Routes, Route } from "react-router";
import { routes } from "./../routes/routers.tsx";

function App() {
    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center p-6">
            <Routes>
                {routes.map(({ path, component }) => (
                    <Route key={path} path={path} element={component} />
                ))}
            </Routes>
        </div>
    );
}

export default App;
