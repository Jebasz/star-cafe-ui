import React, { useEffect, useState } from "react";
import {
    getDailyReport,
    getMonthlyReport,
    getYearlyReport,
    getCustomReport
} from "../services/reportService";
import Header from "../layout/Header";
import {
    FaRupeeSign,
    FaFileInvoice,
    FaMoneyBillWave,
    FaGooglePay
} from "react-icons/fa";

import "../styles/admin/admin-dashboard.css";

function AdminDashboard() {

    const [report, setReport] = useState(null);
    const [reportType, setReportType] = useState("daily");

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const shopId = 1;

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setSelectedDate(today);
        loadDaily(today);
    }, []);

    const loadDaily = async (date) => {
        const response = await getDailyReport(shopId, date);
        setReport(response.data);
    };

    const handleGenerate = async () => {

        try {

            if (reportType === "daily") {
                const response = await getDailyReport(shopId, selectedDate);
                setReport(response.data);
            }

            if (reportType === "monthly") {
                const response = await getMonthlyReport(
                    shopId,
                    selectedYear,
                    selectedMonth
                );
                setReport(response.data);
            }

            if (reportType === "yearly") {
                const response = await getYearlyReport(
                    shopId,
                    selectedYear
                );
                setReport(response.data);
            }

            if (reportType === "custom") {
                const response = await getCustomReport(
                    shopId,
                    fromDate,
                    toDate
                );
                setReport(response.data);
            }

        } catch (error) {
            console.error("Report Error:", error.response?.data);
        }
    };

    return (
        <div className="admin-dashboard">

            <Header />

            <div className="container py-5">

                {/* FILTER SECTION */}
                <div className="mb-4 d-flex flex-wrap gap-3 align-items-end dashboard-filter">

                    <div>
                        <label>Report Type</label>
                        <select
                            className="form-select"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                        >
                            <option value="daily">Daily</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>

                    {reportType === "daily" && (
                        <div>
                            <label>Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                    )}

                    {reportType === "monthly" && (
                        <>
                            <div>
                                <label>Year</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Month</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {reportType === "yearly" && (
                        <div>
                            <label>Year</label>
                            <input
                                type="number"
                                className="form-control"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                            />
                        </div>
                    )}

                    {reportType === "custom" && (
                        <>
                            <div>
                                <label>From</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>To</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <button
                        className="btn btn-warning"
                        onClick={handleGenerate}
                    >
                        Generate
                    </button>

                </div>

                {/* CARDS */}

                {report && (
                    <div className="row g-4">

                        <div className="col-md-3">
                            <div className="dashboard-card">
                                <FaRupeeSign size={26} className="dashboard-icon" />
                                <h6 className="mt-3">Total Sales</h6>
                                <h3 className="fw-bold">₹{report.totalSales}</h3>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="dashboard-card">
                                <FaFileInvoice size={26} className="dashboard-icon" />
                                <h6 className="mt-3">Total Bills</h6>
                                <h3 className="fw-bold">{report.totalBills}</h3>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="dashboard-card">
                                <FaMoneyBillWave size={26} className="dashboard-icon" />
                                <h6 className="mt-3">Cash Sales</h6>
                                <h3 className="fw-bold">₹{report.cashSales}</h3>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="dashboard-card">
                                <FaGooglePay size={26} className="dashboard-icon" />
                                <h6 className="mt-3">UPI Sales</h6>
                                <h3 className="fw-bold">₹{report.upiSales}</h3>
                            </div>
                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}

export default AdminDashboard;