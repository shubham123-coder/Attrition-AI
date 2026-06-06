// import Layout from "./components/layout";
// import Dashboard from "./pages/dashboard";
// import Predict from "./pages/predict";
// import History from "./pages/history";
// import Reports from "./pages/chat";
// import Results from "./pages/results";
// import Chat from "./pages/chat";
// import Highrisk from "./pages/highrisk";
// import { BrowserRouter,Routes,Route } from "react-router-dom";
// function App(){
//     return (
//         <>
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Layout/>}>
//                     <Route index element={<Dashboard/>} />
//                     <Route path="dashboard" element={<Dashboard/>} />
//                     <Route path="predict" element={<Predict/>} />
//                     <Route path="history" element={<History/>}/>
//                     <Route path="reports" element={<Reports/>}/>
//                     <Route path="results" element={<Results/>}/>
//                     <Route path="chat" element={<Chat/>}/>
//                     <Route path="/highrisk" element={<Highrisk/>}/>
//                 </Route>
//             </Routes>
//         </BrowserRouter>
//         </>
//     )
// }
// export default App;

import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./components/animatedroutes";

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;