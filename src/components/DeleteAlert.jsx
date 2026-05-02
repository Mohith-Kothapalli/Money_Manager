import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert=({content,onDelete})=>{
    const [loading,setLoading]=useState(false);
    const handleDelete=async()=>{
        try{
            await onDelete();
        }finally{
            setLoading(false);
        }
    }

    return(
        <div>
            <p className="text-sm">{content}</p>
            <div className="flex-justify-end mt-6">
                <button
                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                     onClick={handleDelete}
                     disabled={loading}
                     type="button">
                    {loading ?(
                        <>
                            <LoaderCircle className="h-4 w-4 animate-spin"/>
                            Deleting...
                        </>
                    ):(
                        <>
                            Delete
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert;