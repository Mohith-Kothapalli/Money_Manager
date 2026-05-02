import { useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense, categories }) => {

  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: ""
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const categoryOptions = categories.map(c => ({
    value: c.id,
    label: c.name
  }));

  return (
    <div className="p-4">

      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(i)=>handleChange("icon", i)}
      />

      <Input
        value={expense.name}
        onChange={(e)=>handleChange("name", e.target.value)}
        placeholder="e.g Electricity, Wifi"
      />

      <Input
        value={expense.categoryId}
        onChange={(e)=>handleChange("categoryId", e.target.value)}
        isSelect
        options={categoryOptions}
      />

      <Input
        value={expense.amount}
        onChange={(e)=>handleChange("amount", e.target.value)}
        type="number"
        placeholder="150"
      />

      <Input
        value={expense.date}
        onChange={(e)=>handleChange("date", e.target.value)}
        type="date"
      />

      <div className="flex justify-end mt-4">
        <button
          onClick={()=>onAddExpense(expense)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;