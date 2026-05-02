import { useState } from "react";
import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const Filter =()=>{
  useUser();
  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    // Implementation for search functionality
    // console.log(type,startDate,endDate,sortField,sortOrder,keyword);
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPYL_FILTERS,{
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder
      });
      console.log("Transactions",response.data);
      setTransactions(response.data);
    } catch (error) {
      console.log("Failes to fetch error",error);
      toast.error(error.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Filters">
        <div className="my-5 mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Filter Transactions</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 mt-2 mb-4">
            <div className="mb-4 flex justify-between items-center">
              <h5 className="text-lg font-semibold">Select the Filters</h5>
            </div>
            <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
                <select  value={type} id="type" className="w-full border rounded px-3 py-2" onChange={(e)=>setType(e.target.value)}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date</label>
                <input value={startDate} type="date" id="startDate" className="w-full border rounded px-3 py-2" onChange={(e)=>setStartDate(e.target.value)} />
              </div>
               <div>
                <label htmlFor="endDate" className="block text-sm font-medium mb-1">End Date</label>
                <input value={endDate} type="date" id="endDate" className="w-full border rounded px-3 py-2" onChange={(e)=>setEndDate(e.target.value)} />
              </div>
              <div>
                <label htmlFor="sortField" className="block text-sm font-medium mb-1">Sort Field</label>
                <select value={sortField} id="sortField" className="w-full border rounded px-3 py-2" onChange={(e)=>setSortField(e.target.value)}>
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="category">Category</option>
                </select>
              </div>
              <div>
                 <label htmlFor="sortorder" className="block text-sm font-medium mb-1">Sort Order</label>
                 <select value={sortOrder} id="sortorder" className="w-full border rounded px-3 py-2" onChange={(e)=>setSortOrder(e.target.value)}>
                   <option value="asc">Ascending</option>
                   <option value="desc">Descending</option>
                 </select>
              </div>
              <div className="sm:col-span-1 md:col-span-1 flex items-end">
                <div className="w-full">
                  <label htmlFor="keyword" className="block text-sm font-medium mb-1">Search</label>
                  <input value={keyword} type="text" id="keyword" placeholder="Search..." className="w-full border rounded px-3 py-2" onChange={(e)=>setKeyword(e.target.value)} />
                </div>
                <button onClick={handleSearch} className="ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-900 text-white rounded flex items-center justify-center cursor-pointer">
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 ">
            <div className="mb-4 flex justify-between items-center">
            <h5 className="text-2xl font-semibold">Transactions</h5>
          </div>
            {transactions.length===0 && !loading ? (<p className="text-center text-gray-500">No transactions found. Please apply filters and search.</p>) : ""}

            {loading ?(
              <p className="text-gray-500">Loading transactions...</p>
            ):("")}
            {transactions.map((transaction) => (
  <TransactionInfoCard
    key={transaction.id}
    title={transaction.name}
    icon={transaction.icon}
    date={moment(transaction.date).format("Do MMM YYYY")}
    amount={transaction.amount}
    type={type}
    hideDeleteBtn
  />
))}
          </div>
        </div>
    </Dashboard>
  )
}   

export default Filter;  