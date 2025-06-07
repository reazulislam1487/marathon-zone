import { Link } from "react-router";

const Sidebar = () => (
  <aside className="w-60 bg-green-100 p-6 space-y-4 shadow-inner">
    <nav className="space-y-2">
      <Link to="/dashboard" className="block hover:text-green-600 font-medium">
        ➕ Add Marathon
      </Link>
      <Link
        to="/dashboard/my-marathons"
        className="block hover:text-green-600 font-medium"
      >
        📋 My Marathon List
      </Link>
      <Link
        to="/dashboard/my-applies"
        className="block hover:text-green-600 font-medium"
      >
        📝 My Apply List
      </Link>
    </nav>
  </aside>
);
export default Sidebar;
