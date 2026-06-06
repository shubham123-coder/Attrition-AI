import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:5000";

export default function Highrisk(){

    const [highriskcount, setHighriskcount] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch(`${API_BASE_URL}/high-risk`)

            .then((res) => res.json())

            .then((data) => {

                console.log(data);

                setHighriskcount(data);

                setLoading(false);

            })

            .catch((error) => {

                console.log(error);

                setLoading(false);

            });

    }, []);

    return (

        <>

        <div className="bg-black text-white min-h-screen p-5 flex flex-col gap-5">

            <div>

                {loading ? (

                    <div className="animate-pulse relative left-[400px] top-[200px]">

                        <div className="h-[100px] w-[240px] bg-[#1f1f1f] rounded mb-2 border-0 border-solid border-gray-600 border-[2px]"></div>

                        <div className="h-[100px] w-[320px] bg-[#1f1f1f] rounded border-0 border-solid border-gray-600 border-[2px]">

                        </div>

                    </div>

                ) : (

                    highriskcount.map((item) => (

                        <div
                            key={item.id}
                            className="border-0 border-solid border-[2px] border-gray-700 p-4 mb-4 rounded-[10px]"
                        >

                            <h2>

                                Employee ID: {item.id}

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
                                    new Date(
                                        item.created_at + "Z"
                                    ).toLocaleString(
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