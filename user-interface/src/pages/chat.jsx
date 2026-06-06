import { useState } from "react";
import { useEffect } from "react";
const API_BASE_URL = "http://localhost:5000";

export default function Chat(){

    const [question, setQuestion] = useState("");

    const [response, setResponse] = useState("");

    const [animatedText, setAnimatedText] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

    if (!response) return;

    setAnimatedText("");

    let index = 0;

    const interval = setInterval(() => {

        if (index < response.length) {

            setAnimatedText((prev) => prev + response.charAt(index));

            index++;

        } else {

            clearInterval(interval);

        }

    }, 15);

    return () => clearInterval(interval);

}, [response]);
       const keydown = (event) => {

    if(event.key === "Enter"){

        askAI();

    }

};
    const askAI = async () => {

        if(!question) return;

        setLoading(true);

        try{

            const res = await fetch(`${API_BASE_URL}/chat`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    question: question
                })
            });

            const data = await res.json();

            setResponse(data.response);
            setLoading(false);

        }catch(error){

            console.log(error);

            setResponse("Something went wrong.");

        }finally{
            setLoading(false);
        }
    };

    return(

        <div className="bg-black min-h-screen text-white p-10">

            <h1 className="text-3xl font-bold mb-5">

                HR AI Assistant

            </h1>

            <div className="flex gap-3">

                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={keydown}
                    placeholder="Ask something about employee attrition..."
                    className="bg-[#111111] border border-[#1f1f1f] rounded-[12px] px-4 py-3 w-[500px] outline-none text-white"
                />

                <button
                    onClick={askAI}
                    className="bg-white text-black px-5 py-3 rounded-[12px] font-semibold hover:bg-[#22c55e] transition duration-300"
                >

                    {loading ? "Thinking..." : "Ask AI"}

                </button>

            </div>

            <div className="mt-10 bg-[#0a0a0a] border border-[#1f1f1f] rounded-[20px] p-6 min-h-[200px] border-0 border-[1px] border-white border-solid">

                <h2 className="text-xl font-bold mb-4">

                    AI Response

                </h2>

                <p className="text-[#d4d4d8] leading-8 whitespace-pre-wrap">
                    {loading ?(
                        <div className="animate-pulse">

                            <div className="h-6 border-0 border-solid border-gray-600 border-[2px] w-24 bg-[#1f1f1f] rounded mb-2"></div>

                            <div className="h-10 border-0 border-solid border-gray-600 border-[2px] w-32 bg-[#1f1f1f] rounded"></div>

                        </div>
                    ):(
                        animatedText
                    )}
                </p>

            </div>

        </div>
    );
}