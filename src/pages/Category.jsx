import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import Model from "../components/Model";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import AddCategoryForm from "../components/AddCategoryForm";


const Category=()=>{
  useUser();
  const [loading,setLoading]=useState(false);
  const [categoryData,setCategoryData]=useState([]);
  const [openAddCategoryModel,setOpenAddCategoryModel]=useState(false);
  const [openEditCategoryModel,setOpenEditCategoryModel]=useState(false);
  const [selectedCategory,setSelectedCategory]=useState(null);

  const fetchCategoryDetails=async()=>{
    if(loading) return;
    setLoading(true);
    try{
        const response=await axiosConfig.get(API_ENDPOINTS.GET_API_CATEGORIES);
        if(response.status===200){
          console.log('Categories',response.data);
          setCategoryData(response.data);
        }
    }catch(err){
        console.log('Error fetching categories',err);
        toast.error(err.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchCategoryDetails();
  },[]);

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;

    if (!name.trim()) {
        toast.error("Category name is required");
        return;
    }

    const isDuplicate = categoryData.some(cat => cat.name.toLowerCase() === name.trim().toLowerCase());
    if (isDuplicate) {
        toast.error("Category name already exists");
        return;
    }

    try {
        const response = await axiosConfig.post(
            API_ENDPOINTS.ADD_CATEGORIES,
            { name, type, icon }
        );

        if (response.status === 201 ) {
            toast.success("Category added successfully");

            // ✅ Update UI instantly (no need to wait for refetch)
            setCategoryData(prev => [...prev, response.data]);

            setOpenAddCategoryModel(false);
        }
    } catch (err) {
        console.error("Error adding category", err);
        toast.error(err.response?.data?.message || "Error adding category");
    }
};

  const handleEditCategory=(categoryToEdit)=>{
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModel(true);
  }

  const handleUpdateCategory=async (updatedCategory)=>{
      const { id, name, type, icon } = updatedCategory;
      if (!name.trim()) {
          toast.error("Category name is required");
          return;
      }
      if(!id){
        toast.error("Invalid category ID");
        return;
      }

      try {
        await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), { name, type, icon });
        setOpenAddCategoryModel(false);
        setSelectedCategory(null);
        toast.success("Category updated successfully");
        fetchCategoryDetails();

      } catch (error) {
        console.error("Error updating category",error.response?.data?.message||error.message);
        toast.error(error.response?.data?.message || "Error updating category");
      }
  }

  return (
    <Dashboard activeMenu="Category">
        <div className="my-5 mx-auto">
          {/* add button to category */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">All Categories</h2>
            <button 
                onClick={()=>setOpenAddCategoryModel(true)}
                className="add-btn flex items-center gap-1" > 
                <Plus  size={15}/>
                Add Category
            </button>
          </div>
          {/* Category List */}
          <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />

          {/* Adding Category Model */}
          <Model
            isOpen={openAddCategoryModel}
            onClose={()=>setOpenAddCategoryModel(false)}
            title="Add Category"
          >
              <AddCategoryForm onAddCategory={handleAddCategory}/>
          </Model>

          {/* Updating cateosy model */}
          <Model
            isOpen={openEditCategoryModel}
            onClose={()=>{
                      setOpenEditCategoryModel(false);
                      setSelectedCategory(null);
                    }}
                    title="Update Category"
          >
              <AddCategoryForm
                initialCategoryData={selectedCategory}
                onAddCategory={handleUpdateCategory}
                isEditing={true}
                
              />

          </Model>


        </div>
    </Dashboard>
  )
}

export default Category;