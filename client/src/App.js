import SignIn from "./Pages/SignIn/SignIn";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import OccuranceHistory from "./Pages/OccuranceHistory/OccuranceHistory";
import ReportOccurance from "./Pages/ReportOccurance/ReportOccurance";
import SignUp from "./Pages/SignUp/SignUp";
import ReportedOccurance from "./Pages/ReportedOccurance/ReportedOccurance";
import Auth from "./Auth/Auth";
import authSlice from "./features/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(authSlice.actions.retriveLocalStorage());
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route element={<Auth />}>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<ReportedOccurance />} />
          <Route path="report-occurance" index element={<ReportOccurance />} />
          <Route path="occurance-history" element={<OccuranceHistory />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
