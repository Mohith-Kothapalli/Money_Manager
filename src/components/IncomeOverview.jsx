import { useEffect, useState } from "react";
import prepareIncomeLineChartData from "../utils/prepareIncomeLineChartData";
import CustomLineChart from "./CustomLineChart";

const IncomeOverview = ({ transactions }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 mt-2">
            
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-semibold">Income Overview</h5>
                    <p className="text-sm text-gray-500 mt-1">
                        Track your earnings over time and analyze your income trends
                    </p>
                </div>
            </div>

            <div className="mt-6">
                {chartData.length > 0 && (
                    <CustomLineChart data={chartData} />
                )}
            </div>

        </div>
    );
};

export default IncomeOverview;