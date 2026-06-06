import Layout from "./layout.jsx"
import Dashboard from "../pages/dashboard";
import Predict from "../pages/predict";
import History from "../pages/history";
import Reports from "../pages/chat"; 
import Results from "../pages/results";
import Chat from "../pages/chat";
import Highrisk from "../pages/highrisk";
import {  Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="predict" element={<Predict />} />
          <Route path="history" element={<History />} />
          <Route path="reports" element={<Reports />} />
          <Route path="results" element={<Results />} />
          <Route path="chat" element={<Chat />} />
          <Route path="highrisk" element={<Highrisk />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;