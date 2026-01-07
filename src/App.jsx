import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">
            Indigo Flights
          </h1>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Threetigers.com. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
