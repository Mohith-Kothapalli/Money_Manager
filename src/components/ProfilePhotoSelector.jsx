import { Trash, Upload, User } from "lucide-react";
import { useRef ,useState} from "react";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(image);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
        }
    }

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImage(null);
        setPreview(null);
        // inputRef.current.value = null;
    }

    const onChooseFile=(e)=>{
        e.preventDefault();
        inputRef.current.click();
    }

    return (
        <div className="flex justify-center mb-6">
            <input type="file" accept="image/*" ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            {!image ?(
                <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                    <User className="text-purple-500" size={35}/>

                    <button type="button" onClick={onChooseFile} className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1">
                        <Upload size={15} className="text-purple-500"/>
                    </button>
                </div>
            ):(
                <div className="relative">
                    <img src={preview} alt="profile photo" className="w-20 h-20 object-cover rounded-full" />
                    <button type="button" onClick={handleRemoveImage} className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1">
                        <Trash size={15}/>
                    </button>
                </div>

            )}
        </div>
    )
}

export default ProfilePhotoSelector;