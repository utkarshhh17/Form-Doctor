import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";


import HomePage from "./components/Home Page/Home";
import LoginPage from "./components/Login Page/Login";
// import SignupPage from "./Pages/SignupPage";


function App() {
  
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<HomePage />} >
        </Route>
        <Route path="/login" element={<LoginPage />} >
        </Route>

     
      </Routes>
  </AnimatePresence>
  );
}

export default App;