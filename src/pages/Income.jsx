import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import { Plus } from "lucide-react";
import Model from "../components/Model";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";


const Income=()=>{
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data:null
  });

  //fetch income details fromthe api
  const fetchIncomeDetails = async()=>{
    if(loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if(response.status === 200){
        // console.log("Income list",response.data);
        setIncomeData(response.data);
      }
    }catch (error) {
      console.error("Error fetching income details:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch income details");
    } finally {
      setLoading(false);
    }
  }

  //fetch categories for income
  const fetchIncomeCategories = async()=>{
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
      if(response.status === 200){
        // console.log("income categories",response.data);
        setCategories(response.data);
      }
      
    } catch (error) {
      console.log("Failed to fetch income categories",error);
      toast.error(error?.response?.data?.message || "Failed to fetch income categories");
    }
  }

  //save income details
  const handleAddIncome = async(income)=>{
    const {name, amount, date, icon, categoryId} = income;

    if(!name.trim()){
      toast.error("Please enter a valid income source name");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Please enter a valid amount");
      return;
    }

    if(!date){
      toast.error("Please select a valid date");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if(date>today){
      toast.error("Date cannot be in the future");
      return;
    }

    if(!categoryId){
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOMES, {
        name,
        amount:Number(amount),
        date,
        icon,
        categoryId
      });
      if(response.status === 201){
        setOpenAddIncomeModel(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
        fetchIncomeCategories();
      }    
    } catch (error) {
        console.log("Error adding income",error);
        toast.error(error?.response?.data?.message || "Failed to add income");
    }
  }

  const deleteIncome=async(id)=>{
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log("Error deleting income",error);
      toast.error(error?.response?.data?.message || "Failed to delete income");
    }
  }

  // const handleDownloadDetails=()=>{
  //   console.log("Download deyails")
  // }

  // const handleEmailDetails=()=>{
  //   console.log("Email details")
  // }

  useEffect(()=>{
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    // console.log("income data",incomeData),
    <Dashboard activeMenu="Income">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div>
              {/* overview for income */}
              <button 
                    onClick={() => setOpenAddIncomeModel(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    <Plus size={15}/> Add Income
              </button> 
              <IncomeOverview transactions={incomeData}/>
            </div>
      
            <IncomeList
                  transactions={incomeData}
                  onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})}
                  // onDownload={handleDownloadDetails}
                  // onEmail={handleEmailDetails}
            />

            <Model
              title="Add Income"
              isOpen={openAddIncomeModel}
              onClose={()=>setOpenAddIncomeModel(false)}
            
            >
                <AddIncomeForm onAddIncome={(income)=>handleAddIncome(income)} categories={categories} />
            </Model>
            {/* {delete income model} */}

            <Model
              isOpen={openDeleteAlert.show}
              onClose={()=>setOpenDeleteAlert({show:false,data:null})}
              title="Delete Income"
            >
              <DeleteAlert
                content="Are you sure you want to delete this income? "
                onDelete={()=>deleteIncome(openDeleteAlert.data)}
              />
            </Model>

          </div>
        </div>
    </Dashboard>
  )
}

export default Income;