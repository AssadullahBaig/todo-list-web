import Header from "../Header";
import Sidebar from "../Sidebar";

function MainLayout({
  children,
  onToggleForm,
  isFormVisible,
  listFilter,
  onListFilterChange,
  customLists,
  onAddCustomList,
  onDeleteCustomList,
  taskCountsByList,
  totalTasks,
  activeView,
  onViewChange,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f8fafc]">
      <div className="flex">
        {/* Full-Height SideNavBar */}
        <Sidebar
          onToggleForm={onToggleForm}
          isFormVisible={isFormVisible}
          listFilter={listFilter}
          onListFilterChange={onListFilterChange}
          customLists={customLists}
          onAddCustomList={onAddCustomList}
          onDeleteCustomList={onDeleteCustomList}
          taskCountsByList={taskCountsByList}
          totalTasks={totalTasks}
          activeView={activeView}
          onViewChange={onViewChange}
        />

        {/* Main Content Column */}
        <div className="flex min-h-screen flex-1 flex-col md:ml-[260px]">
          {/* Top Header - Sits directly above main content */}
          <Header
            activeView={activeView}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            listFilter={listFilter}
          />

          <main className="flex-1 bg-[#09090b]">
            <div className="mx-auto w-full max-w-[960px] px-6 py-10 lg:px-8">
              {children}
            </div>
          </main>

          {/* Stitch Footer */}
          <footer className="border-t border-[#27272a] bg-[#09090b] py-6 px-8 text-xs text-zinc-500">
            <div className="mx-auto flex max-w-[960px] flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white">TaskFlow</span>
                <span>© 2024 TaskFlow SaaS.</span>
              </div>
              <div className="flex items-center gap-6 text-zinc-400">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
