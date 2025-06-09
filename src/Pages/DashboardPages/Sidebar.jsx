import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", icon: "➕", label: "Add Marathon" },
    { path: "/dashboard/my-marathons", icon: "📋", label: "My Marathon List" },
    { path: "/dashboard/my-applies", icon: "📝", label: "My Apply List" },
  ];

  return (
    <>
      {/* Fixed Hamburger (Mobile Only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-1/2 left-2 z-[60] p-2 rounded-full bg-white shadow-lg text-green-700"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 md:pt-8 md:h-screen overflow-y-auto bg-gradient-to-b from-green-100 to-green-50">
          {/* Sidebar title */}
          <h2 className="text-2xl font-bold text-green-800 mb-6 hidden md:block">
            Marathon Panel
          </h2>

          {/* Navigation */}
          <nav className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)} // close sidebar on mobile
                className="flex items-center gap-3 p-3 rounded-lg bg-white shadow hover:bg-green-100 hover:scale-[1.02] transform transition duration-150"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-green-800">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Background overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
