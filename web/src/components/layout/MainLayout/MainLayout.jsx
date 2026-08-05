import Header from "../Header";
import Sidebar from "../Sidebar";

function MainLayout({ children, onToggleForm, isFormVisible }) {
  return (
    <div className="flex min-h-screen bg-[#0B1120] text-white">
      {/* Sidebar */}
      <Sidebar onToggleForm={onToggleForm} isFormVisible={isFormVisible} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto bg-[#070B1A]">
          <div className="mx-auto w-full max-w-7xl px-10 py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
