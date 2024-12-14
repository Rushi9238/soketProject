import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { io } from "socket.io-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRouteCheck from "./Try/components/ProtectedRouteCheck";
import AdminPage from "./Try/Page/AdminPage";
import UserPage from "./Try/Page/UserPage";
import SignIn from "./Try/Page/SignIn";
import SignUp from "./Try/Page/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { initializeSocket } from "./store/slices/sokets/soketThunks";

function App() {
  const dispatch = useDispatch();
  const { users, onlineUsers } = useSelector(
    (state) => state.socket.onlineUsers
  );
  useEffect(() => {
    console.log("hello")
    dispatch(initializeSocket());
    console.log("hello2")
  }, [dispatch,onlineUsers]);
  return (
    <>
      {/* <div>
    
     </div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRouteCheck />}>
            <Route path="/admin-page" element={<AdminPage />} />
            <Route path="/user-page" element={<UserPage />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
