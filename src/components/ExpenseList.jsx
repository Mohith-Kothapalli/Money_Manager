import { Mail, Download } from "lucide-react";

const ExpenseList = ({ transactions }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm mt-4">
      <div className="flex justify-between mb-4">
        <h5>All Expenses</h5>

        <div className="flex gap-2">
          <button className="px-3 py-2 bg-gray-100 rounded-md flex items-center gap-1">
            <Mail size={14}/> Email
          </button>

          <button className="px-3 py-2 bg-gray-100 rounded-md flex items-center gap-1">
            <Download size={14}/> Download
          </button>
        </div>
      </div>

      {transactions.map((e) => (
        <div key={e.id} className="flex justify-between p-3 hover:bg-gray-50 rounded-md">
          <div>
            <p>{e.name}</p>
            <p className="text-xs text-gray-400">{e.date}</p>
          </div>

          <div className="text-red-600 font-semibold">
            - ₹{e.amount}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;