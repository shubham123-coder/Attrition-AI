import { useNavigate, useLocation } from "react-router-dom";
import {
    RadialBarChart,
    RadialBar,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    PolarAngleAxis
} from "recharts";

function Results(){

    const navigate = useNavigate();

    const location = useLocation();

    const prediction = location.state;

    const new_pred = () => {
        navigate("/predict");
    }

    const dashboard = () => {
        navigate("/dashboard");
    }

    if(!prediction){

        return(

            <div className="bg-black min-h-screen flex items-center justify-center text-white text-2xl">

                No prediction data found.

            </div>
        );
    }

    // Determines the color based on the risk percentage
const getRiskColor = (score) => {
    if (score < 30) return "#22c55e"; 
    if (score < 50) return "#eab308"; 
    if (score < 75) return "#f97316"; 
    return "#ef4444";                 
};
const dynamicColor = getRiskColor(prediction.burnout_score);

    const gaugeData = [
        {
            name: "Risk Score",
            value: prediction.burnout_score
        }
    ];

    const factorData = [
        {
            factor: prediction.top_risk_factor,
            value: prediction.burnout_score
        }
    ];

    return(

       <>

        <div className="bg-black text-white min-h-screen p-5 flex flex-col gap-5">


            <div>

                <h1 className="text-white text-2xl mb-0 p-0 relative left-[20px]">

                    Prediction Results

                </h1>

                <p className="mt-0 p-0 text-sm text-[#a1a1aa] relative left-[20px]">

                    AI-generated attrition & burnout risk analysis

                </p>

                <div className="flex flex-row gap-[10px]">

                    <button
                    className="h-[40px] w-[120px] border-white text-sm font-medium border-solid border-[1px] rounded-[10px] bg-black text-white hover:bg-white hover:text-black transition duration-300 ease-in-out relative left-[800px] bottom-[60px]"
                    onClick={new_pred}
                    >

                        New Prediction

                    </button>

                    <button
                    className="border-white text-sm font-medium border-solid rounded-[10px] bg-black text-white hover:bg-white hover:text-black transition duration-300 ease-in-out border-[1px] h-[40px] w-[120px] relative left-[800px] bottom-[60px]"
                    onClick={dashboard}
                    >

                        Dashboard

                    </button>

                </div>

            </div>


            <div className="bg-black flex flex-row gap-4">


                <div className="border-0 border-solid border-[#1f1f1f] border-[2px] p-6 rounded-[20px] bg-[#0a0a0a] w-[320px] h-[400px] hover:border-white transition duration-300">

                    <p className="text-[#a1a1aa] text-md font-bold text-center">

                        Attrition Risk Score

                    </p>

                    <div className="w-full h-[250px]">

                        <ResponsiveContainer width="100%" height="100%" border>

                            <RadialBarChart
                                innerRadius="70%"
                                outerRadius="100%"
                                barSize={18}
                                data={gaugeData}
                                startAngle={180}
                                endAngle={0}
                                
                            >
                                <PolarAngleAxis
                                type="number"
                                domain={[0, 100]}
                                angleAxisId={0}
                                tick={false}/>

                                <RadialBar
                                    background={{ fill: '#ffffff' }}
                                    clockWise
                                    dataKey="value"
                                    cornerRadius={20}
                                    fill={dynamicColor}
                                />

                                <text
                                    x="50%"
                                    y="55%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="fill-white text-4xl font-bold"
                                >

                                    {prediction.burnout_score.toFixed(0)}%

                                </text>

                            </RadialBarChart>

                        </ResponsiveContainer>

                    </div>

                    <div className="text-center relative bottom-[10px]">

                        <h2 className="text-xl font-bold">

                            {prediction.prediction}

                        </h2>

                    </div>

                </div>


                <div className="border-0 border-solid border-[2px] border-[#1f1f1f] p-6 rounded-[20px] bg-[#0a0a0a] w-[600px] h-[400px] hover:border-white transition duration-300">

                    <p className="text-[#a1a1aa] text-md font-bold text-center mb-5">

                        Top Contributing Risk Factor

                    </p>

                    <div className="w-full h-[220px]">

                        <ResponsiveContainer width="100%" height="100%">

                            <BarChart
                                data={factorData}
                                layout="horizontal"
                            >

                                <XAxis
                                    type="number"
                                    color="blue"
                                    hide
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="value"
                                    radius={[10,10,10,10]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                    <div className="text-center">

                        <h2 className="relative bottom-[120px] text-3xl font-bold">

                            {prediction.top_risk_factor}

                        </h2>

                    </div>

                </div>

            </div>


            <div className="border-0 border-solid border-[2px] border-[#1f1f1f] p-8 rounded-[20px] bg-[#0a0a0a] w-[970px] min-h-[350px] hover:border-white transition duration-300">

                <div className="flex flex-row justify-between items-center mb-8">

                    <h3 className="text-md text-[#a1a1aa] font-bold">

                        Recommended HR Actions

                    </h3>

                    <h3 className="text-white font-bold">

                        AI GENERATED

                    </h3>

                </div>

                <div className="flex flex-col gap-4">

                    {prediction.recommended_hr_action.map((action, index) => (

                        <div
                        key={index}
                        className="bg-[#111111] border-0 border-solid border-[#1f1f1f] border-[1px] rounded-[14px] p-5 hover:border-white transition duration-300"
                        >

                            <p className="text-white text-md font-medium">

                                {action}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>

       </>
    );
}

export default Results;