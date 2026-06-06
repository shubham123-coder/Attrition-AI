from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class Prediction(Base):

    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    Age = Column(Integer)
    BusinessTravel = Column(String)
    DailyRate = Column(Integer)
    Department = Column(String)
    DistanceFromHome = Column(Integer)
    Education = Column(Integer)
    EducationField = Column(String)
    EnvironmentSatisfaction = Column(Integer)
    Gender = Column(String)
    HourlyRate = Column(Integer)
    JobInvolvement = Column(Integer)
    JobLevel = Column(Integer)
    JobRole = Column(String)
    JobSatisfaction = Column(String)
    MaritalStatus = Column(String)
    MonthlyIncome = Column(Integer)
    MonthlyRate = Column(Integer)
    NumCompaniesWorked = Column(Integer)
    OverTime = Column(String)
    PercentSalaryHike = Column(Integer)
    PerformanceRating = Column(Integer)
    RelationshipSatisfaction = Column(Integer)
    StockOptionLevel = Column(Integer)
    TotalWorkingYears = Column(Integer)
    TrainingTimesLastYear = Column(Integer)
    WorkLifeBalance = Column(Integer)
    YearsAtCompany = Column(Integer)
    YearsInCurrentRole = Column(Integer)
    YearsSinceLastPromotion = Column(Integer)
    YearsWithCurrManager = Column(Integer)

    attrition_probability = Column(Float)

    prediction = Column(String)

    top_risk_factor = Column(String)

    recommended_hr_action = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)