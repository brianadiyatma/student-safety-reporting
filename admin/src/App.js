import SignIn from "./Pages/SignIn/SignIn";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

import SignUp from "./Pages/SignUp/SignUp";
import ReportedOccurance from "./Pages/ReportedOccurance/ReportedOccurance";
import Auth from "./Auth/Auth";
import authSlice from "./features/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import UserManagement from "./Pages/UserManagement/UserManagement";
import AdminManagement from "./Pages/AdminManagement/AdminManagement";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("admin")) {
      dispatch(authSlice.actions.retriveLocalStorage());
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/admin/sign-in" element={<SignIn />} />
      <Route path="/admin/sign-up" element={<SignUp />} />
      <Route element={<Auth />}>
        <Route path="/admin" element={<Navbar />}>
          <Route path="" element={<ReportedOccurance />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="admin-management" element={<AdminManagement />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
