import React from "react";

function AdminHeader() {
  return (
    <nav className="sticky z-40 top-0 flex items-center justify-between p-2 border-b-2">
      <div className="w-1/6"></div>
      <div className="w-5/6">
        <div className="flex align-items-center justify-between">
          <div></div>
          <div>
            <h1 className=" px-16">Admin User</h1>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;
