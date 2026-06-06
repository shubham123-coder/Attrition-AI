import { useLocation } from "react-router-dom";
function Topbar(){
    const location = useLocation();
    return (
        <>
        <div className="m-0 p-0 h-[60px] bg-[#0a0a0a] border-b-[2px] border-[#1f1f1f] border-solid border-0">

        <div className="flex space-x-[10px] relative top-[20px] left-[20px] m-0 p-0"><h5 className="m-0 p-0 text-white">Attrition AI</h5>
        <h5 className="m-0 p-0 text-white">{location.pathname}</h5>
        </div>

        </div>
        </>
    )
}
export default Topbar;