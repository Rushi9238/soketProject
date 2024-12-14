import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn, userSignOut, userSignOut2 } from "../../store/slices/sokets/soketThunks";
import { useNavigate } from "react-router-dom";
const UserPage = () => {
  const token = localStorage.getItem("user_logined");
  const { users, onlineUsers } = useSelector(
    (state) => state.socket.onlineUsers
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("Data", users);
  // console.log(onlineUsers);
  useEffect(() => {
    if (token) {
      dispatch(userSignIn(token));
    } else {
      dispatch(userSignOut2());
      navigate("/sign-in");
    }
  }, []);
  return (
    <>
      <div className="flex items-center justify-between m-6">
        {" "}
        <div className="text-2xl ">UserPage</div>
        <div>Email: {localStorage.getItem("email")}</div>
        <button className="bg-red-400 py-1 px-4 rounded text-white font-bold" onClick={()=>{
          dispatch(userSignOut2());
          navigate("/sign-in");
        }}>
          Log out
        </button>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>active</th>
          </tr>
        </thead>
        <tbody className="text-center border">
          {/* .filter((item1)=>item1.userEmail!=localStorage.getItem("email")) */}
          {users?.map((userDetails, index) => {
            return (
              <tr key={index} className="border">
                <td>{index + 1}</td>
                <td>{userDetails.userName}</td>
                <td>{userDetails.userEmail}</td>
                <td>
                  {onlineUsers.some((item) => item == userDetails._id) ? (
                    <span className="text-white bg-green-400 px-3 rounded">
                      Online
                    </span>
                  ) : (
                    <span className="text-white bg-red-400 px-3 rounded">
                      Offline
                    </span>
                  )}
                </td>
                <td>
                  <button className="bg-blue-500 text-white px-4 py-1 my-1 rounded">
                    Send Message
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-5">
        <div className="text-2xl">Chat Room</div>

        <div className="border-2 h-80 m-4">
          <div>
            <input className="border-2" type="text" placeholder="Type a message..." />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
