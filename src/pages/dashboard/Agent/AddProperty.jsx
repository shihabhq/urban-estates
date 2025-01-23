import React, { useContext, useState } from "react";
import AuthContext from "../../../contexts/AuthContexts";
import Loading from "../../../shared/Loading";
import Input from "../../../shared/Input";
import ButtonCovered from "../../../shared/ButtonCovered";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const AddProperty = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const { axiosSecure } = useAxiosSecure();
  const navigate = useNavigate();
  const [propertyObj, setPropertyObj] = useState({
    title: "",
    location: "",
    min: "",
    max: "",
    description: "",
  });
  const [photo, setPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast("Please give a valid Image");
      setPhoto(null);
      setPreviewImage(null);
    }
  };
  const uploadImage = async (file) => {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        formdata
      );
      const imageURL = response.data.secure_url;
      return imageURL;
    } catch (e) {
      throw new Error("Image upload failed", e);
    }
  };
  const handleAddProperty = async () => {
    const { title, location, min, max, description } = propertyObj;
    if (!title || !location || !min || !max || !photo || !description) {
      return toast.error("Please fill all the fields");
    }
    if (Number(min) > Number(max)) {
      return toast.error("Minimum price should be less than maximum price");
    }
    if (Number(min) < 0 || Number(max) < 0) {
      return toast.error("Price should be greater than 0");
    }
    if (Number(min) === 0 || Number(max) === 0) {
      return toast.error("Price should be greater than 0");
    }
    if (Number(min) === Number(max)) {
      return toast.error("Price should not be equal");
    }

    try {
      setLoading(true);
      const photoURL = await uploadImage(photo);
      console.log(photoURL);
      const property = {
        title: title,
        location: location,
        price: {
          min: Number(min),
          max: Number(max),
        },
        photo: photoURL,
        agent: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
        description: description,
        status: "pending",
      };
      await axiosSecure.post("/add-property", property);
      toast.success("successfully Added Property");
      navigate("/dashboard/added-properties");
    } catch (error) {
      console.log(error);
      toast.error(
        "There was an error while adding property. Please try again later"
      );
    } finally {
      setLoading(false);
      setPropertyObj({
        title: "",
        location: "",
        min: "",
        max: "",
        description: "",
      });
    }
    setPhoto(null);
    setPreviewImage(null);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto">
      <div className="my-24 border max-w-2xl  border-gray-200 px-4 pt-10 pb-4 rounded-md md:w-[80%] mx-auto">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl sm:text-4xl text-center font-bold mb-4">
            Add Property
          </h1>
          <div className="w-full flex gap-4">
            <Input
              label={"title"}
              placeholder={"Property Title"}
              title={"Title"}
              type={"text"}
              value={propertyObj.title}
              onChange={(e) =>
                setPropertyObj({ ...propertyObj, title: e.target.value })
              }
            />
            <Input
              label={"location"}
              placeholder={"Property Location"}
              title={"Location"}
              type={"text"}
              value={propertyObj.location}
              onChange={(e) =>
                setPropertyObj({ ...propertyObj, location: e.target.value })
              }
            />
          </div>

          <div className=" max-w-fit mx-auto flex items-center justify-center gap-4 flex-col">
            <label
              className="font-arial font-semibold flex items-center justify-center gap-3 px-3 py-2 hover:bg-btncol hover:text-white text-btncol border border-btncol rounded-md text-lg transition-all duration-200 cursor-pointer"
              htmlFor="upload-property">
              Upload Property Photo
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="upload-property"
              onChange={handleImageChange}
            />
            {previewImage && (
              <img
                src={previewImage}
                className=" min-w-32 min-h-32  object-cover border-2 border-btncol"
              />
            )}
          </div>
          <div>
            <textarea
              className="textarea border border-gray-300 w-full min-h-44 focus:outline-none focus:border-btncol"
              placeholder="Bio"
              value={propertyObj.description}
              onChange={(e) =>
                setPropertyObj({ ...propertyObj, description: e.target.value })
              }></textarea>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Price Range:</h1>
            <div className="w-full flex gap-4 my-1">
              <Input
                label={"min"}
                value={propertyObj.min}
                onChange={(e) =>
                  setPropertyObj({ ...propertyObj, min: e.target.value })
                }
                placeholder={"Min"}
                type={"number"}
              />
              <Input
                value={propertyObj.max}
                onChange={(e) =>
                  setPropertyObj({ ...propertyObj, max: e.target.value })
                }
                label={"max"}
                placeholder={"Max"}
                type={"number"}
              />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Agent Info:</h1>
            <div className="grid gap-4 w-full lg:grid-cols-2">
              <h1 className="text-sm sm:text-xl">
                <span className="text-sm font-semibold">Name:</span> <br />{" "}
                {user?.displayName}
              </h1>
              <h1 className="text-base sm:text-xl">
                <span className="text-sm font-semibold">Email:</span> <br />{" "}
                {user?.email}
              </h1>
            </div>
          </div>
          <div onClick={handleAddProperty}>
            <ButtonCovered to={"#"}>Add Property</ButtonCovered>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
