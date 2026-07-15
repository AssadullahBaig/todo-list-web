import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

function MainLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <main>
        <Header />
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
