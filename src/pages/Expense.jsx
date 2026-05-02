import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import Model from "../components/Model";

import ExpenseOverview from "../components/ExpenseOverview";
import ExpenseList from "../components/ExpenseList";
import AddExpenseForm from "../components/AddExpenseForm";

const Expense = () => {
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

  const fetchExpenses = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      console.log("Expense API data:", response.data);
      if (response.status === 200) setExpenseData(response.data||response.data.data);
    } catch (error) {
      console.log("FULL ERROR:", error);
  console.log("ERROR RESPONSE:", error?.response);
  console.log("ERROR DATA:", error?.response?.data);

  toast.error(error?.response?.data?.message || "Failed to fetch expenses");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
      if (res.status === 200) setCategories(res.data);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;

    if (!name || !name.trim()) return toast.error("Enter valid name");

    try {
      const res = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSES, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId
      });

      if (res.status === 201) {
        toast.success("Expense added");
        setOpenAddExpenseModel(false);
        fetchExpenses();
      }
    } catch {
      toast.error("Failed to add expense");
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">

        {/* TOP */}
        <div className="mb-4">
          <button
            onClick={() => setOpenAddExpenseModel(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-200 text-green-800 rounded-md hover:bg-green-300"
          >
            <Plus size={15}/> Add Expense
          </button>
        </div>

        {/* OVERVIEW */}
        <ExpenseOverview transactions={expenseData} />

        {/* LIST */}
        <ExpenseList transactions={expenseData} />

        {/* MODAL */}
        <Model
          title="Add Expense"
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
            categories={categories}
          />
        </Model>

      </div>
    </Dashboard>
  );
};

export default Expense;