import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const { user, onlineUsers } = useSelector(
    (state) => state.socket.onlineUsers
  );
  console.log("Data", user);
  console.log(onlineUsers);
  useEffect(() => {
    
  }, []);
  return (
    <>
      <div className="text-2xl">Admin Page</div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>active</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((userDetails, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{userDetails.userName}</td>
                <td>{userDetails.userEmail}</td>
                <td>
                  {onlineUsers.some((item) => item == userDetails._id)
                    ? "online"
                    : "offline"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AdminPage;
