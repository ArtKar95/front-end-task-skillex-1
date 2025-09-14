import { Outlet } from "react-router-dom";
import "./mainLayout.scss";

const MainLayout = () => (
  <div className="main-layout">
    <header className="main-layout__header">
        {/* //!Title can be rout-base */}
        <h1>Products Catalog</h1>
    </header>

    <main className="main-layout__content">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
