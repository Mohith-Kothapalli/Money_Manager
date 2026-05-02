import { Trash2, TrendingUp, UtensilsCrossed } from "lucide-react";
import { addThousandSeparator } from "../utils/util";

const TransactionInfoCard = ({icon, title, date, amount, type, hideDeleteBtn, onDelete}) => {

    // ✅ Normalize type
    const normalizedType = type?.toLowerCase();

    const getAmountStyles = () =>
        normalizedType === "income"
            ? "text-green-800 bg-green-50"
            : "text-red-800 bg-red-50";

    return (
        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 w-full">

            {/* ICON */}
            <div className="h-12 w-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {icon ? (
                    <img src={icon} alt={title} className="w-6 h-6"/>
                ) : (
                    <UtensilsCrossed className="text-purple-800"/>
                )}
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex items-center justify-between">
                
                {/* LEFT TEXT */}
                <div>
                    <p className="text-sm text-gray-700 font-medium">{title}</p>
                    <p className="text-xs text-gray-400 mt-1">{date}</p> 
                </div>   

                {/* RIGHT */}
                <div className="flex items-center gap-2">

                    {/* DELETE BUTTON */}
                    {!hideDeleteBtn && (
                        <button 
                            onClick={onDelete}
                            className="text-gray-400 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Trash2 size={18}/>
                        </button>
                    )}

                    {/* AMOUNT */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                        <h6>
                            {normalizedType === "income" ? "+" : "-"}
                            ₹{addThousandSeparator(amount)}
                        </h6>

                        {/* ICON */}
                        <TrendingUp size={15}/>
                    </div>

                </div>
            </div>    

        </div>
    );
};

export default TransactionInfoCard;