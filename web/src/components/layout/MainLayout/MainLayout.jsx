import Header from "../Header";
import Sidebar from "../Sidebar";

function MainLayout({ children, onToggleForm, isFormVisible }) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar onToggleForm={onToggleForm} isFormVisible={isFormVisible} />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
