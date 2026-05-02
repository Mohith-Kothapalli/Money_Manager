import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const Transactions = ({ transactions, onMore, type, title }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-4"> {/* FIXED: was "flex-items-center", missing "mb-4" */}
                <h5 className="text-lg font-semibold">{title}</h5>
                <button
                    onClick={onMore}
                    className="flex items-center gap-1 text-sm text-purple-700 hover:text-purple-900"
                >
                    More <ArrowRight size={15} />
                </button>
            </div>
            <div className="mt-4 space-y-2"> {/* FIXED: added "space-y-2" for spacing between cards */}
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    );
};

export default Transactions;