# main.py
import io
import joblib
import pandas as pd
from database import SessionLocal
from models import Prediction
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import SessionLocal
from models import Prediction
from database import engine
from models import Base
from sqlalchemy import func
import google.generativeai as genai
import os

from dotenv import load_dotenv
load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")
class ChatRequest(BaseModel):
    question: str
app = FastAPI()
Base.metadata.create_all(bind=engine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

artifact = joblib.load("/home/shubham/ourdata/allfiles/AI BURNOUT AND ATTRITION PREDICTOR UI/Model/attrition_pipeline.joblib")
pipeline = artifact["pipeline"]
threshold = artifact["threshold"]

class EmployeeInput(BaseModel):
    Age: int
    BusinessTravel: str
    DailyRate: int
    Department: str
    DistanceFromHome: int
    Education: int
    EducationField: str
    EnvironmentSatisfaction: int
    Gender: str
    HourlyRate: int
    JobInvolvement: int
    JobLevel: int
    JobRole: str
    JobSatisfaction: int
    MaritalStatus: str
    MonthlyIncome: int
    MonthlyRate: int
    NumCompaniesWorked: int
    OverTime: str
    PercentSalaryHike: int
    PerformanceRating: int
    RelationshipSatisfaction: int
    StockOptionLevel: int
    TotalWorkingYears: int
    TrainingTimesLastYear: int
    WorkLifeBalance: int
    YearsAtCompany: int
    YearsInCurrentRole: int
    YearsSinceLastPromotion: int
    YearsWithCurrManager: int

@app.get("/")
def root():
    return {"message": "Attrition AI API is running"}

@app.post("/predict")
def predict_employee(data: EmployeeInput):

    df = pd.DataFrame([data.model_dump()])

    proba = float(pipeline.predict_proba(df)[0, 1])

    burnout_score = round(proba * 100, 2)


    if proba < 0.4:

        pred = "Low Attrition Risk"

    elif proba < 0.7:

        pred = "Medium Attrition Risk"

    else:

        pred = "High Attrition Risk"


    if data.OverTime == "Yes":

        top_risk_factor = "OverTime"

    elif data.WorkLifeBalance <= 2:

        top_risk_factor = "Poor Work Life Balance"

    elif data.MonthlyIncome < 3000:

        top_risk_factor = "Low Compensation"

    elif data.JobSatisfaction <= 2:

        top_risk_factor = "Low Job Satisfaction"

    else:

        top_risk_factor = "Career Growth Concerns"


    hr_actions = []

    if top_risk_factor == "OverTime":

        hr_actions.append(
            "Reduce employee overtime workload"
        )

        hr_actions.append(
            "Monitor weekly working hours"
        )

        hr_actions.append(
            "Provide mental wellness support"
        )

        hr_actions.append(
            "Introduce flexible scheduling"
        )

    elif top_risk_factor == "Low Compensation":

        hr_actions.append(
            "Review salary structure"
        )

        hr_actions.append(
            "Provide performance incentives"
        )

        hr_actions.append(
            "Create promotion opportunities"
        )

        hr_actions.append(
            "Conduct compensation benchmarking"
        )

    elif top_risk_factor == "Poor Work Life Balance":

        hr_actions.append(
            "Enable remote work flexibility"
        )

        hr_actions.append(
            "Reduce workload pressure"
        )

        hr_actions.append(
            "Encourage paid leave utilization"
        )

        hr_actions.append(
            "Conduct employee wellness sessions"
        )

    elif top_risk_factor == "Low Job Satisfaction":

        hr_actions.append(
            "Conduct employee engagement interviews"
        )

        hr_actions.append(
            "Improve role alignment"
        )

        hr_actions.append(
            "Provide mentorship programs"
        )

        hr_actions.append(
            "Recognize employee achievements"
        )

    else:

        hr_actions.append(
            "Discuss long-term career planning"
        )

        hr_actions.append(
            "Provide leadership mentoring"
        )

        hr_actions.append(
            "Offer skill development programs"
        )

        hr_actions.append(
            "Review internal growth opportunities"
        )


    if proba >= 0.8:

        hr_actions.append(
            "Immediate HR intervention recommended"
        )

    if proba >= 0.9:

        hr_actions.append(
            "High priority retention case"
        )
    actions_text = " | ".join(hr_actions)

    db = SessionLocal()

    new_prediction = Prediction(

        Age=data.Age,
        BusinessTravel=data.BusinessTravel,
        DailyRate=data.DailyRate,
        Department=data.Department,
        DistanceFromHome=data.DistanceFromHome,
        Education=data.Education,
        EducationField=data.EducationField,
        EnvironmentSatisfaction=data.EnvironmentSatisfaction,
        Gender=data.Gender,
        HourlyRate=data.HourlyRate,
        JobInvolvement=data.JobInvolvement,
        JobLevel=data.JobLevel,
        JobRole=data.JobRole,
        JobSatisfaction=data.JobSatisfaction,
        MaritalStatus=data.MaritalStatus,
        MonthlyIncome=data.MonthlyIncome,
        MonthlyRate=data.MonthlyRate,
        NumCompaniesWorked=data.NumCompaniesWorked,
        OverTime=data.OverTime,
        PercentSalaryHike=data.PercentSalaryHike,
        PerformanceRating=data.PerformanceRating,
        RelationshipSatisfaction=data.RelationshipSatisfaction,
        StockOptionLevel=data.StockOptionLevel,
        TotalWorkingYears=data.TotalWorkingYears,
        TrainingTimesLastYear=data.TrainingTimesLastYear,
        WorkLifeBalance=data.WorkLifeBalance,
        YearsAtCompany=data.YearsAtCompany,
        YearsInCurrentRole=data.YearsInCurrentRole,
        YearsSinceLastPromotion=data.YearsSinceLastPromotion,
        YearsWithCurrManager=data.YearsWithCurrManager,

        attrition_probability=proba,

        prediction=pred,

        top_risk_factor=top_risk_factor,

        recommended_hr_action=actions_text
    )

    db.add(new_prediction)

    db.commit()

    db.refresh(new_prediction)

    db.close()

    return {

        "attrition_probability": proba,

        "burnout_score": burnout_score,

        "prediction": pred,

        "top_risk_factor": top_risk_factor,

        "recommended_hr_action": hr_actions

    }
@app.post("/predict-bulk")
async def predict_bulk(file: UploadFile = File(...)):

    try:

        content = await file.read()

        df = pd.read_csv(io.BytesIO(content))

        print(df.head())

        proba = pipeline.predict_proba(df)[:, 1]

        preds = []

        for p in proba:

            if p < 0.4:
                preds.append("Low Attrition Risk")

            elif p < 0.7:
                preds.append("Medium Attrition Risk")

            else:
                preds.append("High Attrition Risk")

        df["Attrition_Probability"] = proba

        df["Burnout_Score"] = proba * 100

        df["Prediction"] = preds

        db = SessionLocal()

        for _, row in df.iterrows():

            new_employee = Prediction(

                Age=int(row["Age"]),
                BusinessTravel=row["BusinessTravel"],
                DailyRate=int(row["DailyRate"]),
                Department=row["Department"],
                DistanceFromHome=int(row["DistanceFromHome"]),
                Education=int(row["Education"]),
                EducationField=row["EducationField"],
                EnvironmentSatisfaction=int(row["EnvironmentSatisfaction"]),
                Gender=row["Gender"],
                HourlyRate=int(row["HourlyRate"]),
                JobInvolvement=int(row["JobInvolvement"]),
                JobLevel=int(row["JobLevel"]),
                JobRole=row["JobRole"],
                JobSatisfaction=int(row["JobSatisfaction"]),
                MaritalStatus=row["MaritalStatus"],
                MonthlyIncome=int(row["MonthlyIncome"]),
                MonthlyRate=int(row["MonthlyRate"]),
                NumCompaniesWorked=int(row["NumCompaniesWorked"]),
                OverTime=row["OverTime"],
                PercentSalaryHike=int(row["PercentSalaryHike"]),
                PerformanceRating=int(row["PerformanceRating"]),
                RelationshipSatisfaction=int(row["RelationshipSatisfaction"]),
                StockOptionLevel=int(row["StockOptionLevel"]),
                TotalWorkingYears=int(row["TotalWorkingYears"]),
                TrainingTimesLastYear=int(row["TrainingTimesLastYear"]),
                WorkLifeBalance=int(row["WorkLifeBalance"]),
                YearsAtCompany=int(row["YearsAtCompany"]),
                YearsInCurrentRole=int(row["YearsInCurrentRole"]),
                YearsSinceLastPromotion=int(row["YearsSinceLastPromotion"]),
                YearsWithCurrManager=int(row["YearsWithCurrManager"]),

                attrition_probability=float(row["Attrition_Probability"]),

                prediction=row["Prediction"]
            )

            db.add(new_employee)

        db.commit()

        db.close()

        return {

            "summary": f"{len(df)} employees processed and stored.",

            "results": df.to_dict(orient="records")
        }

    except Exception as e:

        print(e)

        return {

            "error": str(e)
        }
@app.get("/predictions")
def get_predictions():

    db = SessionLocal()

    data = db.query(Prediction).all()

    results = []

    for item in data:

        results.append({

            "id": item.id,

            "Age": item.Age,

            "Department": item.Department,

            "MonthlyIncome": item.MonthlyIncome,

            "prediction": item.prediction,

            "attrition_probability": item.attrition_probability,

            "burnout_score": round(
                item.attrition_probability * 100,
                2
            ),

            "top_risk_factor": item.top_risk_factor,

            "recommended_hr_action":
                item.recommended_hr_action.split(" | ")
                if item.recommended_hr_action
                else [],

            "created_at": item.created_at

        })

    db.close()

    return results
@app.get("/high-risk")
def get_high_risk_predictions():

    db = SessionLocal()

    data = db.query(Prediction).filter(
        Prediction.prediction == "High Attrition Risk"
    ).all()

    results = []

    for item in data:

        results.append({

            "id": item.id,

            "Age": item.Age,

            "Department": item.Department,

            "MonthlyIncome": item.MonthlyIncome,

            "prediction": item.prediction,

            "attrition_probability": item.attrition_probability,

            "burnout_score": round(
                item.attrition_probability * 100,
                2
            ),

            "top_risk_factor": item.top_risk_factor,

            "recommended_hr_action":
                item.recommended_hr_action.split(" | ")
                if item.recommended_hr_action
                else [],

            "created_at": item.created_at

        })

    db.close()

    return results
@app.get("/employee-count")
def get_employee_count():

    db = SessionLocal()

    count = db.query(Prediction).count()
    db.close()
    return {
        "count": count
    }
@app.get("/high-risk-count")
def get_high_risk_count():

    db = SessionLocal()

    count = db.query(Prediction).filter(
        Prediction.prediction == "High Attrition Risk"
    ).count()
    db.close()
    return {
        "count": count
    }
@app.get("/attrition-rate")
def get_attrition_rate():

    db = SessionLocal()

    total_employees = db.query(Prediction).count()

    high_risk = db.query(Prediction).filter(
        Prediction.prediction == "High Attrition Risk"
    ).count()

    if total_employees == 0:
        rate = 0
    else:
        rate = (high_risk / total_employees) * 100
    db.close()
    return {
        "attrition_rate": round(rate, 2)
    }
@app.get("/average-burnout")
def get_average_burnout():

    db = SessionLocal()

    avg_burnout = db.query(
        func.avg(Prediction.attrition_probability * 100)
    ).scalar()

    if avg_burnout is None:
        avg_burnout = 0
    db.close()
    return {
        "average_burnout": round(avg_burnout, 2)
    }
@app.get("/risk-distribution")
def get_risk_distribution():

    db = SessionLocal()

    total = db.query(Prediction).count()

    low = db.query(Prediction).filter(
        Prediction.prediction == "Low Attrition Risk"
    ).count()

    medium = db.query(Prediction).filter(
        Prediction.prediction == "Medium Attrition Risk"
    ).count()

    high = db.query(Prediction).filter(
        Prediction.prediction == "High Attrition Risk"
    ).count()

    if total == 0:

        return {
            "low_risk": 0,
            "medium_risk": 0,
            "high_risk": 0
        }
    db.close()
    return {

        "low_risk": round((low / total) * 100, 2),

        "medium_risk": round((medium / total) * 100, 2),

        "high_risk": round((high / total) * 100, 2)
    }
@app.get("/department-attrition")
def department_attrition():

    db = SessionLocal()

    departments = db.query(Prediction.Department).distinct().all()

    results = []

    for dept_tuple in departments:

        dept = dept_tuple[0]

        total = db.query(Prediction).filter(
            Prediction.Department == dept
        ).count()

        high_risk = db.query(Prediction).filter(
            Prediction.Department == dept,
            Prediction.prediction == "High Attrition Risk"
        ).count()

        if total == 0:
            rate = 0
        else:
            rate = (high_risk / total) * 100

        results.append({
            "department": dept,
            "attrition_rate": round(rate, 2),
            "total_employees": total,
            "high_risk_employees": high_risk
        })
    db.close()
    return results

@app.post("/chat")
def chat_with_ai(data: ChatRequest):

    db = SessionLocal()

    employees = db.query(Prediction).all()

    employee_data = []

    total_employees = db.query(Prediction).count()

    high_risk = db.query(Prediction).filter(
        Prediction.prediction == "High Attrition Risk"
    ).count()

    avg_burnout = db.query(
        func.avg(Prediction.attrition_probability * 100)
    ).scalar()

    avg_burnout = avg_burnout or 0

    for emp in employees:

        employee_data.append({

            "Department": emp.Department,
            "prediction": emp.prediction,
            "attrition_probability": round(emp.attrition_probability * 100, 2),
            "MonthlyIncome": emp.MonthlyIncome,
            "WorkLifeBalance": emp.WorkLifeBalance,
            "JobSatisfaction": emp.JobSatisfaction,
            "OverTime": emp.OverTime

        })

    prompt = f"""
    You are an HR analytics AI assistant.

    Here is the employee attrition dataset:

    {employee_data}

    REAL DATABASE STATISTICS:

    Total Employees: {total_employees}

    High Risk Employees: {high_risk}

    Average Burnout Score: {round(avg_burnout, 2)}

    Sample Employee Data:
    {employee_data[:20]}

    User Question:
    {data.question}

    Rules:
    - Give short readable answers
    - Use statistics from dataset
    - Mention percentages if useful
    - Be professional
    - If high risk employees are many, mention urgent HR intervention
    Rules:
    - NEVER invent numbers
    - ONLY use provided statistics
    - Give concise professional insights

    """

    response = model.generate_content(prompt)

    db.close()

    return {
        "response": response.text
    }
    # uvicorn main:app --reload --port 5000 = to start the server