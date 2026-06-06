import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = "http://localhost:5000";

const categoricalFields = {
  BusinessTravel: ["Travel_Rarely", "Travel_Frequently", "Non-Travel"],
  Department: ["Sales", "Research & Development", "Human Resources"],
  EducationField: ["Life Sciences", "Other", "Medical", "Marketing", "Technical Degree", "Human Resources"],
  Gender: ["Female", "Male"],
  JobRole: [
    "Sales Executive",
    "Research Scientist",
    "Laboratory Technician",
    "Manufacturing Director",
    "Healthcare Representative",
    "Manager",
    "Sales Representative",
    "Research Director",
    "Human Resources",
  ],
  MaritalStatus: ["Single", "Married", "Divorced"],
  OverTime: ["No", "Yes"],
};

const ordinalFields = {
  Education: [
    { value: 1, label: "1 - Below College" },
    { value: 2, label: "2 - College" },
    { value: 3, label: "3 - Bachelor" },
    { value: 4, label: "4 - Master" },
    { value: 5, label: "5 - Doctor" },
  ],
  EnvironmentSatisfaction: [
    { value: 1, label: "1 - Low" },
    { value: 2, label: "2 - Medium" },
    { value: 3, label: "3 - High" },
    { value: 4, label: "4 - Very High" },
  ],
  JobInvolvement: [
    { value: 1, label: "1 - Low" },
    { value: 2, label: "2 - Medium" },
    { value: 3, label: "3 - High" },
    { value: 4, label: "4 - Very High" },
  ],
  JobSatisfaction: [
    { value: 1, label: "1 - Low" },
    { value: 2, label: "2 - Medium" },
    { value: 3, label: "3 - High" },
    { value: 4, label: "4 - Very High" },
  ],
  RelationshipSatisfaction: [
    { value: 1, label: "1 - Low" },
    { value: 2, label: "2 - Medium" },
    { value: 3, label: "3 - High" },
    { value: 4, label: "4 - Very High" },
  ],
  WorkLifeBalance: [
    { value: 1, label: "1 - Bad" },
    { value: 2, label: "2 - Good" },
    { value: 3, label: "3 - Better" },
    { value: 4, label: "4 - Best" },
  ],
  StockOptionLevel: [
    { value: 0, label: "0 - None" },
    { value: 1, label: "1 - Low" },
    { value: 2, label: "2 - Medium" },
    { value: 3, label: "3 - High" },
  ],
  PerformanceRating: [
    { value: 1, label: "1 - Low" },
    { value: 2, label: "2 - Good" },
    { value: 3, label: "3 - Excellent" },
    { value: 4, label: "4 - Outstanding" },
  ],
  JobLevel: [
    { value: 1, label: "1 - Entry" },
    { value: 2, label: "2 - Mid" },
    { value: 3, label: "3 - Senior" },
    { value: 4, label: "4 - Lead" },
    { value: 5, label: "5 - Executive" },
  ],
};

const numericFields = [
  "Age",
  "DailyRate",
  "DistanceFromHome",
  "HourlyRate",
  "MonthlyIncome",
  "MonthlyRate",
  "NumCompaniesWorked",
  "PercentSalaryHike",
  "TotalWorkingYears",
  "TrainingTimesLastYear",
  "YearsAtCompany",
  "YearsInCurrentRole",
  "YearsSinceLastPromotion",
  "YearsWithCurrManager",
];

const initialForm = {
  Age: 30,
  BusinessTravel: "Travel_Rarely",
  DailyRate: 800,
  Department: "Research & Development",
  DistanceFromHome: 5,
  Education: 3,
  EducationField: "Life Sciences",
  EnvironmentSatisfaction: 3,
  Gender: "Male",
  HourlyRate: 65,
  JobInvolvement: 3,
  JobLevel: 2,
  JobRole: "Sales Executive",
  JobSatisfaction: 3,
  MaritalStatus: "Single",
  MonthlyIncome: 5000,
  MonthlyRate: 15000,
  NumCompaniesWorked: 1,
  OverTime: "No",
  PercentSalaryHike: 15,
  PerformanceRating: 3,
  RelationshipSatisfaction: 3,
  StockOptionLevel: 1,
  TotalWorkingYears: 5,
  TrainingTimesLastYear: 2,
  WorkLifeBalance: 3,
  YearsAtCompany: 3,
  YearsInCurrentRole: 2,
  YearsSinceLastPromotion: 1,
  YearsWithCurrManager: 2,
};

function FieldLabel({ label, hint }) {
  return (
    <div className="mb-1">
      <div className="relative  text-sm font-medium text-white">{label}</div>
      {hint ? <div className="text-xs text-white">{hint}</div> : null}
    </div>
  );
}

export default function Predict() {
  const [activeTab, setActiveTab] = useState("single");
  const [formData, setFormData] = useState(initialForm);
  const [singleResult, setSingleResult] = useState(null);
  const [bulkResult, setBulkResult] = useState(null);
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [loadingBulk, setLoadingBulk] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
  const savedSingleResult = localStorage.getItem("singleResult");

  if (savedSingleResult) {
    setSingleResult(JSON.parse(savedSingleResult));
  }

  const savedBulkResult = localStorage.getItem("bulkResult");

  if (savedBulkResult) {
    setBulkResult(JSON.parse(savedBulkResult));
  }
}, []);

  const numericFieldSet = useMemo(() => new Set(numericFields), []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSingle(true);
    setSingleResult(null);

    try {
      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Prediction failed");
      }

      setSingleResult(data);

      navigate("/results", {
      state: data
});
    } catch (error) {
      setSingleResult({
        error: error.message || "Prediction failed. Check backend connection.",
      });
    } finally {
      setLoadingSingle(false);
    }
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      setBulkResult({ error: "Please upload a CSV file first." });
      return;
    }

    setLoadingBulk(true);
    setBulkResult(null);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", csvFile);

      const res = await fetch(`${API_BASE_URL}/predict-bulk`, {
        method: "POST",
        body: formDataUpload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Bulk prediction failed");
      }

      setBulkResult(data);
    } catch (error) {
      setBulkResult({
        error: error.message || "Bulk prediction failed. Check backend connection.",
      });
    } finally {
      setLoadingBulk(false);
    }
  };

  const renderNumericInput = (field) => (
    <div key={field} className="flex flex-col">
      <FieldLabel label={field} hint="Enter a numeric value." />
      <input
        type="number"
        value={formData[field]}
        onChange={(e) => handleChange(field, Number(e.target.value))}
        className="text-white rounded-xl relative border border-white bg-black px-4 py-3 text-sm outline-none transition focus:border-slate-500"
      />
    </div>
  );

  const renderCategoricalSelect = (field, options) => (
    <div key={field} className="flex flex-col">
      <FieldLabel label={field} hint="Choose one option." />
      <select
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="relative  text-white rounded-xl border border-white bg-black px-4 py-3 text-sm outline-none transition focus:border-slate-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  const renderOrdinalSelect = (field, options) => (
    <div key={field} className="flex flex-col">
      <FieldLabel label={field} hint="Choose the rating level." />
      <select
        value={formData[field]}
        onChange={(e) => handleChange(field, Number(e.target.value))}
        className=" relative  text-white rounded-xl border border-white bg-black px-4 py-3 text-sm outline-none transition focus:border-slate-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-3xl bg-[#0a0a0a] p-6 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Attrition AI Prediction
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-white">
            Predict employee attrition risk for a single employee or upload a CSV file for bulk predictions.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("single")}
              className={`relative hover:bottom-[5px] border-white border-solid rounded-[10px] px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                activeTab === "single"
                  ? "bg-white text-black border-black"
                  : "bg-black text-white hover:bg-white hover:text-black"
              }`}
            >
              Single Employee
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bulk")}
              className={`border-white relative hover:bottom-[5px] border-solid rounded-[10px] px-4 py-2 text-sm font-medium transition ${
                activeTab === "bulk"
                  ? "bg-white text-black"
                  : "bg-black text-white hover:bg-white hover:text-black"
              }`}
            >
              Bulk CSV Upload
            </button>
          </div>
        </div>

        {activeTab === "single" && (
          <div className="rounded-3xl bg-[#0a0a0a] p-6 shadow-sm ring-1 ring-slate-200==">
            <form onSubmit={handleSingleSubmit}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {numericFields.map(renderNumericInput)}

                {Object.entries(categoricalFields).map(([field, options]) =>
                  renderCategoricalSelect(field, options)
                )}

                {Object.entries(ordinalFields).map(([field, options]) =>
                  renderOrdinalSelect(field, options)
                )}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                type="submit"
                disabled={loadingSingle}
                className="border-white border-solid rounded-[10px] bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingSingle ? "Predicting..." : "Predict Attrition Risk"}
              </button>
                <button
                  type="button"
                  onClick={() => setFormData(initialForm)}
                  className="border-solid border-white rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                >
                  Reset Form
                </button>
              </div>
            </form>
            {singleResult && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-[#0a0a0a] p-5">
                {singleResult.error ? (
                  <p className="text-lg font-medium text-red-600">{singleResult.error}</p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-[#0a0a0a] p-4 shadow-sm ring-1 ring-slate-200">
                      <div className="text-xs font-medium uppercase tracking-wide text-white">
                        Attrition Probability
                      </div>
                      <div className="mt-2 text-2xl font-bold text-white">
                        {(Number(singleResult.attrition_probability) * 100).toFixed(2)}%
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#0a0a0a] p-4 shadow-sm ring-1 ring-slate-200">
                      <div className="text-xs font-medium uppercase tracking-wide text-white">
                        Burnout Score
                      </div>
                      <div className="mt-2 text-2xl font-bold text-white">
                        {Number(singleResult.burnout_score).toFixed(2)} / 100
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#0a0a0a] p-4 shadow-sm ring-1 ring-slate-200">
                      <div className="text-xs font-medium uppercase tracking-wide text-white">
                        Prediction
                      </div>
                      <div className="mt-2 text-2xl font-bold text-white">
                        {singleResult.prediction || "N/A"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "bulk" && (
          <div className="rounded-3xl bg-black p-6 shadow-sm ring-1 ring-white">
            <form onSubmit={handleBulkSubmit} className="space-y-4">
              <div className="rounded-2xl border border-dashed border-white bg-[#0a0a0a] p-6">
                <FieldLabel
                  label="Upload CSV File"
                  hint="The CSV should contain the same feature columns used during training."
                />
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    setCsvFile(e.target.files?.[0] || null);
                    setBulkResult(null);
                  }}
                  className="block w-[100px] rounded-[10px] bg-[#0a0a0a] px-4 py-3 text-sm"
                />

                {csvFile && (
                  <p className="mt-3 text-sm text-white">
                    Selected file: <span className="font-medium">{csvFile.name}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loadingBulk}
                  className="border-solid border-white rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingBulk ? "Uploading..." : "Predict Bulk Employees"}
                </button>
              </div>
            </form>

            {bulkResult && (
              <div className="mt-6">
                {bulkResult.error ? (
                  <div className="rounded-2xl border border-red-200 bg-black p-4 text-sm font-medium text-red-600">
                    {bulkResult.error}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white bg-[#0a0a0a] p-4">
                      <div className="text-sm font-medium text-white">
                        Bulk prediction completed successfully.
                      </div>
                      {bulkResult.summary && (
                        <div className="mt-2 text-sm text-white">
                          {typeof bulkResult.summary === "string"
                            ? bulkResult.summary
                            : JSON.stringify(bulkResult.summary)}
                        </div>
                      )}
                    </div>

                    {Array.isArray(bulkResult.results) && bulkResult.results.length > 0 && (
                      <div className="overflow-hidden rounded-2xl border border-white">
                        <div className="max-h-[500px] overflow-auto">
                          <table className="min-w-full divide-y divide-slate-200 bg-black text-sm">
                            <thead className="sticky top-0 bg-black">
                              <tr>
                                {Object.keys(bulkResult.results[0]).map((key) => (
                                  <th
                                    key={key}
                                    className="whitespace-nowrap px-4 py-3 text-left font-semibold text-white"
                                  >
                                    {key}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {bulkResult.results.map((row, index) => (
                                <tr key={index} className="hover:bg-slate-50">
                                  {Object.values(row).map((value, i) => (
                                    <td key={i} className="whitespace-nowrap px-4 py-3 text-slate-700">
                                      {String(value)}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
