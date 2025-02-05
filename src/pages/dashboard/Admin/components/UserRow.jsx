import React from "react";
import { FaTrash } from "react-icons/fa";

const UserBtns = ({ email, makeRoleChange }) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <button
        onClick={() => makeRoleChange(email, "admin")}
        className="text-sm font-bold px-3 py-2 border rounded-md text-white bg-btncol hover:text-btncol hover:bg-inherit transition-all duration-150 border-btncol"
      >
        Make Admin
      </button>
      <button
        className="text-sm font-bold px-3 py-2 border rounded-md text-white bg-btnsuccess hover:text-btnsuccess hover:bg-inherit transition-all duration-150 border-btnsuccess"
        onClick={() => makeRoleChange(email, "agent")}
      >
        Make Agent
      </button>
    </div>
  );
};
const AgentBtn = ({ makeRoleChange, email }) => {
  return (
    <>
      <div className="flex gap-2 items-center justify-center">
        <button
          className="text-sm font-bold px-3 py-2 border rounded-md text-white bg-btncol hover:text-btncol hover:bg-inherit transition-all duration-150 border-btncol"
          onClick={() => makeRoleChange(email, "admin")}
        >
          Make Admin
        </button>
        <button
          onClick={() => makeRoleChange(email, "user")}
          className="text-sm font-bold px-3 py-2 border rounded-md text-white bg-cyan-400 hover:text-cyan-400 hover:bg-inherit transition-all duration-150 border-cyan-400"
        >
          Make User
        </button>
      </div>
    </>
  );
};
const AdminBtn = ({ email, makeRoleChange }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => makeRoleChange(email, "user")}
        className="text-sm font-bold px-3 py-2 border rounded-md text-white bg-cyan-400 hover:text-cyan-400 hover:bg-inherit transition-all duration-150 border-cyan-400"
      >
        Make User
      </button>
    </div>
  );
};

const UserRow = ({ user, makeRoleChange, currentUser, deleteUser }) => {
  return (
    <tr>
      <th>{user?.name}</th>
      <td>{user?.email}</td>
      <td>{user?.role}</td>
      <td>
        {user?.role === "user" ? (
          <UserBtns makeRoleChange={makeRoleChange} email={user?.email} />
        ) : user?.role === "agent" ? (
          <AgentBtn makeRoleChange={makeRoleChange} email={user?.email} />
        ) : user?.email !== currentUser?.email ? (
          <AdminBtn makeRoleChange={makeRoleChange} email={user?.email} />
        ) : (
          <p className=" text-green-500 text-center text-sm font-semibold">
            You
          </p>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
