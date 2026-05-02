import { useEffect, useState } from 'react';
import Input from './Input';
import EmojiPickerPopup from './EmojiPickerPopup';
import { LoaderCircle } from 'lucide-react';

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {

    const [category, setCategory] = useState({
        name: '',
        type: 'income',
        icon: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory(initialCategoryData);
        }else {
            setCategory({
                name: '',
                type: 'income',
                icon: ''
            });
        }
    }, [isEditing, initialCategoryData]);

    const categoryTypeOptions = [
        { value: 'income', label: 'Income' },
        { value: 'expense', label: 'Expense' }
    ];

    const handleChange = (key, value) => {
        setCategory((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit =async () => {
        setLoading(true);
        try{
            await onAddCategory(category);
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="p-4">

            {/* Emoji Picker */}
            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            {/* Category Name */}
            <Input
                label="Category Name"
                value={category.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., Salary, Food, Rent"
                type="text"
            />

            {/* Category Type */}
            <Input
                label="Category Type"
                value={category.type}
                onChange={(e) => handleChange("type", e.target.value)}
                isSelect={true}
                options={categoryTypeOptions}
            />

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="add-btn add-btn-fill"
                >
                   {loading ? (
                    <>
                        <LoaderCircle className='w-4 h-4 animate-spin'/>
                        {isEditing ? "Updating..." : "Adding..."}
                    </>
                   ) : (
                    <>
                        {isEditing ? "Update Category" : "Add Category"}
                    </>
                   )}
                </button>
            </div>

        </div>
    );
};

export default AddCategoryForm;