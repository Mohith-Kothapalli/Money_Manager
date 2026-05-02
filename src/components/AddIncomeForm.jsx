import { useEffect, useState } from "react";
import EmojiPickerPopUp from "./EmojiPickerPopup";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm =({onAddIncome,categories})=>{
    const [income, setIncome] = useState({
        name:"",
        amount:"",
        date:"",
        icon:"",
        categoryId:""
    });
    const [loading, setLoading] = useState(false);

    const categoryOptions = categories.map((category)=>({
        value:category.id,
        label:category.name
    }))

    const handleChange =(key, value)=>{
        setIncome({...income, [key]:value});
    }

    const handleAddIncome=async ()=>{
        setLoading(true);
        try{
            await onAddIncome(income);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(categories.length > 0 && !income.categoryId){
            setIncome((prev)=>({...prev, categoryId: categories[0].id}));
        }
    },[categories, income.categoryId])

    return(
        <div>
            <EmojiPickerPopUp
                icon={income.icon}
                onSelect={(selectedIcon)=>handleChange('icon',selectedIcon)}
            />

            <Input
                label="Income Source"
                value={income.name}
                onChange={(e)=>handleChange('name',e.target.value)}
                placeholder="e.g Salary, Freelancing"
                type="text"
            />

            <Input
                label="Category"
                value={income.categoryId}
                onChange={(e)=>handleChange('categoryId',e.target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                label="Amount"
                value={income.amount}
                onChange={(e)=>handleChange('amount',e.target.value)}
                placeholder="e.g 1000"
                type="number"
            />

            <Input
                label="Date"
                value={income.date}
                onChange={(e)=>handleChange('date',e.target.value)}
                placeholder="Select a date"
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleAddIncome}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    {loading ?(
                        <>
                            <LoaderCircle className="animate-spin w-4 h-4"/>
                            Adding..
                        </>
                    ):( 
                        <>
                            Add Income
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm;