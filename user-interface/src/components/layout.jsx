import Sidebar from "./sidebar";
import Topbar from "./topbar";
import {Outlet} from "react-router-dom";
import { motion } from "framer-motion";
function Layout(){

      const pageTransitionBlueprint = {
      initial: { 
        opacity: 0, 
        y: 10 // Starts slightly lower down the screen
      },
      animate: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.25, ease: "easeOut" } // Fades up smoothly
      },
      exit: { 
        opacity: 0, 
        y: -10, 
        transition: { duration: 0.18, ease: "easeIn" } // Glides up out of sight on leave
      },
    };
    return (
        <>
        <div className="flex h-screen w-full overflow-hidden bg-[#000000]">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
         <motion.div
          variants={pageTransitionBlueprint}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full"
        >
          <Outlet/>
          </motion.div>
        </main>
      </div>
    </div>
        </>

    );
}
export default Layout;