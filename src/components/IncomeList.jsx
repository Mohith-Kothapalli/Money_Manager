import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";



const IncomeList=({ transactions ,onDelete, onDownload, onEmail})=>{
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income Sources</h5>
                <div className="flex items-center justify-end gap-2">
                    <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition" onClick={onEmail} >
                        <Mail size={15} className="text-base" /> Email
                    </button>
                    <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition" onClick={onDownload} >
                        <Download size={15} className="text-base" /> Download
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* display the income */}
                {transactions?.map((income) => (
                    <TransactionInfoCard
                        key={income.id}
                        icon={income.icon}
                        title={income.name}
                        date={moment(income.date).format("Do MMM YYYY")}
                        amount={income.amount}
                        type="income"
                        onDelete={()=>onDelete(income.id)}
                        onDownload={onDownload}
                        onEmail={onEmail}
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList;