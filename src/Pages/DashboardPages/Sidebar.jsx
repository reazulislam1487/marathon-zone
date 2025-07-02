import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { FiPlusCircle, FiList, FiEdit } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", icon: <FiPlusCircle size={20} />, label: "Add Marathon" },
    { path: "/dashboard/my-marathons", icon: <FiList size={20} />, label: "My Marathon List" },
    { path: "/dashboard/my-applies", icon: <FiEdit size={20} />, label: "My Apply List" },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-1/2 left-3 z-[60] p-2 rounded-full bg-white shadow-lg text-blue-600 border border-blue-300 hover:bg-blue-100 transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 md:pt-10 h-full overflow-y-auto bg-gradient-to-b from-blue-50 via-white to-blue-100 rounded-r-3xl">
          {/* Sidebar Title */}
          <h2 className="text-3xl font-bold text-blue-700 mb-8 tracking-wide hidden md:block">
            <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
              Marathon Panel
            </span>
          </h2>

          {/* Navigation */}
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 p-3 rounded-xl bg-white shadow-md hover:bg-blue-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                <span className="text-blue-600">{item.icon}</span>
                <span className="text-blue-700 font-semibold text-base">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
        />
      )}
    </>
  );
};

export default Sidebar;
