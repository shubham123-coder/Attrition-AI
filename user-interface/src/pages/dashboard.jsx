import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area,Legend
} from "recharts";
import {
  Users, AlertTriangle, TrendingUp, Brain, Activity,
  Home, FileText, Clock, ChevronRight, Shield,
  CheckCircle, Zap,
  Sparkles,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000";

export default function Dashboard() {

    const [predictions, setPredictions] = useState([]);
    const [count,setCount] = useState(0);
    const [highrisk,setHighrisk] = useState(0);
    const [attritionrate,setAttritionrate] = useState(0);
    const [avgburnout,setAvgburnout] = useState(0);
    const [riskdistribution,setRiskdistribution] = useState([]);
    const [departmentData,setDepartmentData] = useState([]);
    const [loading,setLoading] = useState(true);

    const data = riskdistribution
    ? [
        {
            name: "Low Risk",
            value: riskdistribution.low_risk
        },
        {
            name: "Medium Risk",
            value: riskdistribution.medium_risk
        },
        {
            name: "High Risk",
            value: riskdistribution.high_risk
        }
      ]
    : [];

    const navigate = useNavigate();

    const predict = ()=>{
        navigate("/predict");
    };

    useEffect(() => {

        fetch(`${API_BASE_URL}/employee-count`)
            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                setCount(data.count);
                setLoading(false);

            })
            .catch((error) => {
                console.log(error);
            });

    }, []);
    useEffect(() => {

        fetch(`${API_BASE_URL}/high-risk-count`)
            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                setHighrisk(data.count);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);
    useEffect(() => {

        fetch(`${API_BASE_URL}/attrition-rate`)
            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                setAttritionrate(data.attrition_rate);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    useEffect(() => {

        fetch(`${API_BASE_URL}/average-burnout`)
            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                setAvgburnout(data.average_burnout);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    useEffect(() => {

        fetch(`${API_BASE_URL}/predictions`)
            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                setPredictions(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    useEffect(() => {

        fetch(`${API_BASE_URL}/risk-distribution`)
            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                setRiskdistribution(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);
useEffect(() => {

    fetch(`${API_BASE_URL}/department-attrition`)
        .then((res) => res.json())
        .then((data) => {

            setDepartmentData(data);
            setLoading(false);
        });

}, []);
    return (

        <div className="bg-black text-white min-h-screen p-5 flex flex-col gap-5 ">
            <div className="bg-black rounded-[10px] m-0 p-0 h-[100px] overflow-hidden">
                <h1 className="relative left-[25px] mb-0 text-3xl mb-5">
                Analytics Overview
                </h1>
                <p className="mt-0 text-sm relative left-[24px] bottom-[20px] text-[#a1a1aa]">
                    Balanced Logistics Regresson Model
                </p>
                
                <button onClick={predict} className="border-white text-sm font-medium border-solid rounded-[10px] relative left-[900px] bottom-[75px] h-[40px] w-[150px] bg-black text-white hover:bg-white hover:text-black transition duration-300 ease-in-out">
                    <p className="relative bottom-[8px] text-sm font-medium">Run Prediction</p>
                </button>
            </div>
            <Sparkles className="m-0 p-0 relative left-[860px] bottom-[78px]"/>
            <div className="bg-black m-0 p-0 h-[300px] flex flex-row gap-5">
                <div className="border-[2px] border-[#1f1f1f] border-solid border-0 m-5 p-10 text-white rounded-[10px] bg-[#0a0a0a] w-[160px] h-[160px] hover:border-white transition duration-300">
                    <Users size={40} />
                    <h3 className="text-[#a1a1aa]">Total Count</h3>
                    {
                        loading ?
                        (<div className="animate-pulse">

                            <div className="h-6 border-0 border-solid border-gray-600 border-[2px] w-24 bg-[#1f1f1f] rounded mb-2"></div>

                            <div className="h-10 border-0 border-solid border-gray-600 border-[2px] w-32 bg-[#1f1f1f] rounded"></div>

                        </div>)
                        :(
                            <h1>{count}</h1>
                        )
                    }
                </div>
                <NavLink to="/highrisk" className="no-underline m-5 p-10 text-white bg-[#0a0a0a] w-[160px] h-[160px] border-[2px] border-[#1f1f1f] border-solid border-0 rounded-[10px] hover:border-white transition duration-300">
                    <AlertTriangle className="bg-red-800 rounded-[10px] color-red-500" size={40}/>
                <h3 className="text-[#a1a1aa]">High Risk</h3>
                {
                        loading ?
                        (<div className="animate-pulse">

                            <div className="h-6 w-24 bg-[#1f1f1f] rounded mb-2 border-0 border-solid border-gray-600 border-[2px]"></div>

                            <div className="h-10 w-32 bg-[#1f1f1f] rounded border-0 border-solid border-gray-600 border-[2px]"></div>

                        </div>)
                        :(
                             <h1>{highrisk}</h1>
                        )
                    }
                </NavLink>
                <div className="m-5 p-10 text-white bg-[#0a0a0a] w-[160px] h-[160px] border-[2px] border-[#1f1f1f] border-solid border-0 rounded-[10px] hover:border-white transition duration-300">
                    <TrendingUp size={40}/>
                    <h3 className="text-[#a1a1aa]">Attrition Rate</h3>
                    {
                        loading ?
                        (<div className="animate-pulse">

                            <div className="h-6 border-0 border-solid border-gray-600 border-[2px] w-24 bg-[#1f1f1f] rounded mb-2"></div>

                            <div className="h-10 border-0 border-solid border-gray-600 border-[2px] w-32 bg-[#1f1f1f] rounded"></div>

                        </div>)
                        :(
                             <h1>{attritionrate}%</h1>
                        )
                    }
                </div>
                <div className="m-5 p-10 text-white bg-[#0a0a0a] w-[160px] h-[160px] border-[2px] border-[#1f1f1f] border-solid border-0 rounded-[10px] hover:border-white transition duration-300">
                    <Activity className="" size={40}/>
                    <h3 className="text-[#a1a1aa]">Average Burnout</h3>
                    
                    {
                        loading ?
                        (<div className="animate-pulse">

                            <div className="h-6 border-0 border-solid border-gray-600 border-[2px] w-24 bg-[#1f1f1f] rounded mb-2"></div>

                            <div className="h-10 border-0 border-solid border-gray-600 border-[2px] w-32 bg-[#1f1f1f] rounded"></div>

                        </div>)
                        :(
                             <h1>{avgburnout}</h1>
                        )
                    }
                </div>
            </div>

            <div className="bg-black m-0 p-0 h-[500px] flex flex-row">
                <div className="m-5 p-6 rounded-2xl bg-[#0a0a0a] w-[555px] h-[420px] flex flex-col border-[2px] border-[#1f1f1f] border-solid border-0 hover:border-white transition duration-300">

    <div className="mb-4">

        <h3 className="text-white text-xl font-semibold">
            Risk Distribution
        </h3>

        <p className="text-gray-400 text-sm">
            Employee attrition risk overview
        </p>

    </div>

    <div className="flex-1 flex items-center justify-center">
                    
        <ResponsiveContainer width="100%" height="100%">

            <PieChart>

                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={4}
                    stroke="none"
                >

                    <Cell fill="#22c55e" />
                    <Cell fill="#eab308" />
                    <Cell fill="#ef4444" />

                </Pie>

                <Tooltip />

            </PieChart>

        </ResponsiveContainer>

    </div>

    <div className="flex justify-center gap-6 mt-4">

        <div className="flex items-center gap-2">

            <div className="w-3 h-3 rounded-full bg-green-500"></div>

            <div>

                <p className="text-xs text-gray-400">
                    Low
                </p>

                <p className="text-sm text-white font-medium">
                    {riskdistribution.low_risk}%
                </p>

            </div>

        </div>

        <div className="flex items-center gap-2">

            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>

            <div>

                <p className="text-xs text-gray-400">
                    Medium
                </p>

                <p className="text-sm text-white font-medium">
                    {riskdistribution.medium_risk}%
                </p>

            </div>

        </div>

        <div className="flex items-center gap-2">

            <div className="w-3 h-3 rounded-full bg-red-500"></div>

            <div>

                <p className="text-xs text-gray-400">
                    High
                </p>

                <p className="text-sm text-white font-medium">
                    {riskdistribution.high_risk}%
                </p>

            </div>

        </div>

    </div>

</div>
                <div className="border-[2px] border-[#1f1f1f] border-solid border-0 m-5 p-6 rounded-2xl bg-[#0a0a0a] w-full h-[420px] hover:border-white transition duration-300">

    <div className="mb-5">

        <h3 className="text-white text-xl font-semibold">

            Department Attrition Rate

        </h3>

        <p className="text-gray-400 text-sm">

            Attrition percentage by department

        </p>

    </div>

    <ResponsiveContainer width="100%" height="50%">

    <BarChart
        data={departmentData}
        layout="vertical"
        barCategoryGap={18}
        margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10
        }}
    >

        <XAxis
            type="number"
            stroke="#666"
            tick={{ fill: "#999", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
        />

        <YAxis
            type="category"
            dataKey="department"
            width={140}
            stroke="#666"
            tick={{ fill: "#ddd", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
        />

        <Tooltip
            contentStyle={{
                backgroundColor: "white",
                border: "1px solid #222",
                borderRadius: "10px",
                color: "black"
                
            }}
        />

        <Bar
            dataKey="attrition_rate"
            radius={[6, 6, 6, 6]}
            barSize={18}
        >

            {departmentData.map((entry, index) => (

                <Cell
                    key={index}
                    fill={
                        entry.attrition_rate > 50
                            ? "#ef4444"
                            : entry.attrition_rate > 30
                            ? "#eab308"
                            : "#22c55e"
                    }
                />

            ))}

        </Bar>

    </BarChart>

</ResponsiveContainer>
</div>
</div>
</div>
    );
}