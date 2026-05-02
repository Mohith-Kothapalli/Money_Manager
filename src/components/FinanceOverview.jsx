import { addThousandSeparator } from "../utils/util";
import CustomPieChart from "./CustomPieChart";

const FinanaceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const COLORS = ['#1d4ed8', '#16a34a', '#dc2626'];

    const balanceData =[
        {name:'Total Balance', amount: totalBalance},
        {name:'Total Income', amount: totalIncome},
        {name:'Total Expense', amount: totalExpense}
    ];


    return(
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Finance Overview</h5>
            </div>

            <CustomPieChart 
                data={balanceData}
                label="Total Balance"
                totalAmount={`${addThousandSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor
            />

        </div>
    )
}

export default FinanaceOverview;