import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const RecentTransactions = ({ transactions, onMore }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Recent Transactions</h4>

                <button
                    onClick={onMore}
                    className="flex items-center gap-1 text-sm text-purple-700 hover:text-purple-900"
                >
                    More <ArrowRight size={15} />
                </button>
            </div>

            <div className="mt-4 space-y-2">
                {transactions?.slice(0, 5)?.map(item => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}   // ✅ FIXED (was item.title)
                        icon={item.icon}
                        amount={item.amount}
                        type={item.type?.toLowerCase()}  // ✅ FIX HERE
                        date={moment(item.date).format('Do MMM YYYY')}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;