import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { APP_ROUTES } from "./routes";

const MainLayout = () => (
  <div className="main-layout">
    <div className="main-layout__header">Main Layout</div>
    <Outlet />
  </div>
);

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {APP_ROUTES.map(({ path, element }, key) => (
              <Route key={key} path={path} element={element} />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
