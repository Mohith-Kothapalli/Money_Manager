import { useEffect, useState } from "react";
import prepareIncomeLineChartData from "../utils/prepareIncomeLineChartData";
import CustomLineChart from "./CustomLineChart";

const ExpenseOverview = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(prepareIncomeLineChartData(transactions));
  }, [transactions]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border mt-2">
      <h5 className="text-lg font-semibold">Expense Overview</h5>
      <p className="text-sm text-gray-500">Track your spending trends</p>

      <div className="mt-6">
        <CustomLineChart data={chartData}/>
      </div>
    </div>
  );
};

export default ExpenseOverview;