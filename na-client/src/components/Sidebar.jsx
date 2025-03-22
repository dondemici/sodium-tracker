import { Link } from "react-router-dom";
import LogoutButton from "../page/LogoutButton"; // Ensure LogoutButton is correctly imported

//Tailwind
//const Sidebar = () => {
//    return (
//      <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 p-5">
//        <h2 className="text-lg font-bold mb-5">Menu</h2>
//        <nav>
//          <ul className="space-y-3">
//            <li><Link to="/profile" className="block p-2 hover:bg-gray-700">Profile</Link></li>
//            <li><Link to="/ingredients" className="block p-2 hover:bg-gray-700">Ingredient Page</Link></li>
//            <li className="mt-5"><LogoutButton /></li>
//          </ul>
//        </nav>
//      </div>
//    );
//  };

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Menu</h2>
      <nav>
        <ul style={styles.list}>
          <li><Link to="/profile" style={styles.link}>Profile</Link></li>
          <li><Link to="/ingredients" style={styles.link}>Ingredient Page</Link></li>
          <li><LogoutButton /></li> {/* Logout button inside sidebar */}
        </ul>
      </nav>
    </div>
  );
};

// Inline styles for basic styling (you can replace with Tailwind or CSS)
const styles = {
  sidebar: {
    width: "200px",
    height: "100vh",
    background: "#282c34",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    color: "white",
  },
  title: { marginBottom: "20px" },
  list: { listStyle: "none", padding: 0 },
  link: { color: "white", textDecoration: "none", display: "block", marginBottom: "10px" },
};

export default Sidebar;
