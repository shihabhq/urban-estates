import React from "react";

const UserBtns = () => {
  return (
    <div className="flex gap-2">
      <button className="text-sm font-bold px-3 py-2 border rounded-md text-white bg-btncol hover:text-btncol hover:bg-inherit transition-all duration-150 border-btncol">
        Make Admin
      </button>
      <button className="text-sm font-bold px-3 py-2 border rounded-md text-white bg-btnsuccess hover:text-btnsuccess hover:bg-inherit transition-all duration-150 border-btnsuccess">
        Make Agent
      </button>
    </div>
  );
};
const AgentBtn = () => {
  return (
    <div>
      <button className="text-sm font-bold px-3 py-2 border rounded-md text-white bg-btncol hover:text-btncol hover:bg-inherit transition-all duration-150 border-btncol">
        Make Admin
      </button>
      <button className="text-sm font-bold px-3 py-2 border rounded-md text-white bg-btnsuccess hover:text-btnsuccess hover:bg-inherit transition-all duration-150 border-btnsuccess">
        Mark as Fraud
      </button>
    </div>
  );
};
const AdminBtn = () => {
  return (
    <>
      <button>Make User</button>
    </>
  );
};

const UserRow = ({ user }) => {
  return (
    <tr>
      <th>{user?.name}</th>
      <td>{user?.email}</td>
      <td>{user?.role}</td>
      <td>
        {user?.role === "user" ? (
          <UserBtns />
        ) : user?.role === "agent" ? (
          <AgentBtn />
        ) : (
          <AdminBtn />
        )}
      </td>
    </tr>
  );
};

export default UserRow;
