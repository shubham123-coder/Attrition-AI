import { useState } from "react";
import { useEffect } from "react";
const API_BASE_URL = "http://localhost:5000";
function History(){
    const [predictions, setPredictions] = useState([]);
    useEffect(() => {
    
            fetch(`${API_BASE_URL}/predictions`)
                .then((res) => res.json())
                .then((data) => {
    
                    console.log(data);
    
                    setPredictions(data);
    
                })
                .catch((error) => {
                    console.log(error);
                });
    
        }, []);
    return (
            <>
            <div className="bg-black text-white min-h-screen p-5 flex flex-col gap-5 ">
                <div>
                {predictions.length === 0 ? (

                <div className="animate-pulse relative left-[400px] top-[200px]">

                            <div className="h-[100px] w-[240px] bg-[#1f1f1f] rounded mb-2 border-0 border-solid border-gray-600 border-[2px]"></div>

                            <div className="h-[100px] w-[320px] bg-[#1f1f1f] rounded border-0 border-solid border-gray-600 border-[2px]"></div>

                        </div>

            ) : (

                predictions.map((item) => (

                    <div
                        key={item.id}
                        className="border-solid border-gray-700 p-4 mb-4 rounded-[10px]"
                    >
                        <h2>
                            Employee ID:{item.id}
                        </h2>
                        <h2 className="text-xl">
                            {item.prediction}
                        </h2>
                        <h2 className="text-xl">
                            {item.attrition_probability}
                        </h2>

                        <p>
                            Department: {item.Department}
                        </p>

                        <p>
                            Income: {item.MonthlyIncome}
                        </p>
                        <p>
                        {
                        new Date(item.created_at + "Z").toLocaleString(
                        "en-IN",
                        {
                            timeZone: "Asia/Kolkata"
                        }
                        )
                        }
                        </p>

                    </div>

                ))

            )}  
            </div>
            </div>
            </>
    );
}
export default History;