import { useState } from "react";


const CustomFileUpload = () => {
  const [fileName, setFileName] = useState('Choose an image...');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('Choose an image...');
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="file"
        name="image"
        accept="image/*"
        id="fileInput"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
      <label
        htmlFor="fileInput"
        className="block w-full p-2 border-2 border-dashed border-gray-300 rounded cursor-pointer text-center text-gray-500"
      >
        {fileName}
      </label>
    </div>
  );
};

export default CustomFileUpload;
