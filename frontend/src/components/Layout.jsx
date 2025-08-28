import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import client from "../api/client";

export default function Layout() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    client
      .get("/admin/pages")
      .then((res) => setPages(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar pages={pages} />

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
