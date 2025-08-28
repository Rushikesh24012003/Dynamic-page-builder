import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Sidebar({ pages }) {
  const { logout, role } = useAuth();

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark vh-100"
      style={{ width: "250px" }}
    >
      <h2 className="fs-4 mb-4">Dynamic Pages</h2>

      <ul className="nav nav-pills flex-column mb-auto">
        {pages.map((p) => (
          <li className="nav-item" key={p.id}>
            <NavLink
              to={`/page/${p.table_name}`}
              className={({ isActive }) =>
                "nav-link " + (isActive ? "active bg-secondary" : "text-white")
              }
            >
              {p.page_name}
            </NavLink>
          </li>
        ))}

       {role === "Admin" && (
  <li className="nav-item">
    <Link to="/admin" className="nav-link text-white bg-primary">
        Admin Builder
    </Link>
  </li>
)}

      </ul>

      <div className="mt-auto">
        <button
          className="btn btn-danger w-100"
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
