import MainLayout from "../../components/layout/MainLayout";

function TodoPage() {
  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-4x1 font-bold text-white">My Tasks</h1>
        <p className="mt-2 text-slate-400">
          Manage your daily work efficiently.
        </p>
      </div>
    </MainLayout>
  );
}

export default TodoPage;
