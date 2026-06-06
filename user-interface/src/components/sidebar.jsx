import { NavLink } from "react-router-dom";
import { LayoutDashboard, Sparkles, History, MessageSquare } from 'lucide-react';
import { useEffect, useState } from "react";
import { Brain } from "lucide-react";
function Sidebar(){
    const [isOnline, setIsOnline] = useState(false);

    const API_BASE_URL = "http://localhost:5000"; 

    useEffect(() => {

        const checkBackendStatus = () => {
            fetch(`${API_BASE_URL}/employee-count`)
                .then((res) => {
                    if (res.ok) {
                        setIsOnline(true);
                    } else {
                        setIsOnline(false);
                    }
                })
                .catch((error) => {
                    console.log("Backend offline:", error);
                    setIsOnline(false); 
                });
        };

    
        checkBackendStatus();


        const interval = setInterval(checkBackendStatus, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <style>{`
                @keyframes pulseGlow {
                    0%, 100% { transform: scale(1); opacity: 0.35; filter: blur(3px); }
                    50% { transform: scale(1.5); opacity: 0.75; filter: blur(5px); }
                }
                .animate-pulse-glow {
                    animation: pulseGlow 2.5s ease-in-out infinite;
                }
            `}</style>

            <div className="bg-[#0a0a0a] w-56 border-r-[2px] border-[#1f1f1f] border-solid border-0 flex flex-col justify-between h-screen">
                
           
                <div>
                  
                    <div className="border-b-[2px] border-[#1f1f1f] border-solid border-0 h-[80px]">
                        <div className="flex flex-col m-0 p-0">
                            <div className="flex flex-row gap-0 m-0 p-0">
                            <Brain color="white" className="m-0 p-0 relative left-[30px] top-[25px]"/>
                            <h3 className="text-[#f5f5f5] text-lg m-0 p-0 relative left-[50px] bottom-[-20px]">AttritionAI</h3>
                            </div>
                            <h6 className="text-[#a1a1aa] m-0 p-0 relative left-[75px] top-[15px]">Risk Intelligence</h6>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-[30px] border-[#1f1f1f] border-solid border-0 h-[450px]">
                        <h5 className="text-[#a1a1aa] m-0 p-0 relative left-[20px] top-[10px]">Main Menu</h5>
                        <div className="flex flex-col space-y-[20px] m-0 p-0 relative w-56 left-[35px] top-[30px]">
                            
                            <NavLink 
                                className={({isActive})=>`
                                    font-bold text-lg text-[#a1a1aa] no-underline font-['Space_Grotesk'] 
                                    m-0 p-0 h-[40px] w-[170px] flex flex-col gap-0
                                    ${isActive ? "bg-[#2a2a2a] text-white border-l-[2px] border-solid border-white border-0 rounded-[6px]" : "text-[#a1a1aa]"}`
                                } to="/dashboard">
                                <div className="flex flex-row m-0 p-0 gap-0">
                                    <LayoutDashboard className="w-5 h-5 m-0 p-0 relative left-[5px] top-[7px] "/>
                                    <h3 className="m-0 p-0 relative bottom-[-3px] left-[13px]">Dashboard</h3>
                                </div>
                            </NavLink>

                            <NavLink 
                                className={({isActive})=>`
                                    font-bold text-lg text-[#a1a1aa] no-underline font-['Space_Grotesk'] 
                                    m-0 p-0 h-[40px] w-[170px] 
                                    ${isActive ? "bg-[#2a2a2a] text-white border-l-[2px] border-solid border-white border-0 rounded-[6px]" : "text-[#a1a1aa]"}`
                                } to="/predict">
                                <div className="flex flex-row m-0 p-0 gap-0">
                                    <Sparkles className="w-5 h-5 m-0 p-0 relative left-[5px] top-[7px] "/>
                                    <h3 className="m-0 p-0 relative bottom-[-3px] left-[13px]">Predict</h3>
                                </div>
                            </NavLink>

                            <NavLink 
                                className={({isActive})=>`
                                    font-bold text-lg text-[#a1a1aa] no-underline font-['Space_Grotesk'] 
                                    m-0 p-0 h-[40px] w-[170px] 
                                    ${isActive ? "bg-[#2a2a2a] text-white border-l-[2px] border-solid border-white border-0 rounded-[6px]" : "text-[#a1a1aa]"}`
                                } to="/history">
                                <div className="flex flex-row m-0 p-0 gap-0">
                                    <History className="w-5 h-5 m-0 p-0 relative left-[5px] top-[7px] "/>
                                    <h3 className="m-0 p-0 relative bottom-[-3px] left-[13px]">History</h3>
                                </div>
                            </NavLink>

                            <NavLink 
                                className={({isActive})=>`
                                    font-bold text-lg text-[#a1a1aa] no-underline font-['Space_Grotesk'] 
                                    m-0 p-0 h-[40px] w-[170px] 
                                    ${isActive ? "bg-[#2a2a2a] text-white border-l-[2px] border-solid border-white border-0 rounded-[6px]" : "text-[#a1a1aa]"}`
                                } to="/chat">
                                <div className="flex flex-row m-0 p-0 gap-0">
                                    <MessageSquare className="w-5 h-5 m-0 p-0 relative left-[5px] top-[7px] "/>
                                    <h3 className="m-0 p-0 relative bottom-[-3px] left-[13px]">ChatAI</h3>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col m-0 p-5 gap-3 border-t-[2px] border-[#1f1f1f] border-solid border-0 mb-4">
                    <h5 className="text-[#a1a1aa] m-0 p-0 text-xs font-semibold uppercase tracking-wider">
                        Model Status
                    </h5>


                    <div className="flex items-center justify-between bg-[#111111] border border-solid border-[#1f1f1f] p-3 rounded-[10px]">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">Scikit-Learn Engine</span>
                            <span className="text-[11px] text-[#71717a] mt-0.5">
                                {isOnline ? "Predictor Ready" : "Disconnected"}
                            </span>
                        </div>

   
                        <div className="relative flex items-center justify-center w-3 h-3">
                            {isOnline ? (
                                <>
                            
                                    <div className="absolute w-full h-full rounded-full bg-emerald-500 animate-pulse-glow" />
                                    
                                    <div className="relative w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                                </>
                            ) : (
                                <>
                                  
                                    <div className="relative w-2 h-2 rounded-full bg-[#3f3f46]" />
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Sidebar;