import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Input from "../../../shared/Input";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import ButtonCovered from "../../../shared/ButtonCovered";

const UpdateProperty = () => {
  const { id } = useParams();
  const { axiosSecure } = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["update-property"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/update/${id}`);
      return res.data;
    },
  });

  const navigate = useNavigate();
  const [propertyObj, setPropertyObj] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    setPropertyObj(data);
    setPreviewImage(data?.image);
  }, [data]);

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

  const handleUpdateProperty = async () => {
    const { title, location, price } = propertyObj;
    if (!title || !location || !price?.min || !price?.max) {
      return toast.error("Please fill all the fields");
    }
    if (Number(price?.min) > Number(price?.max)) {
      return toast.error("Minimum price should be less than maximum price");
    }
    if (Number(price?.min) < 0 || Number(price?.max) < 0) {
      return toast.error("Price should be greater than 0");
    }
    if (Number(price?.min) === 0 || Number(price?.max) === 0) {
      return toast.error("Price should be greater than 0");
    }
    if (Number(price?.min) === Number(price?.max)) {
      return toast.error("Price should not be equal");
    }
    try {
      let imageUrl = propertyObj?.image;

      if (photo) {
        imageUrl = await uploadImage(photo);
        if (!imageUrl) {
          return toast.error("Image upload failed");
        }
      }

      const updatedProperty = {
        ...propertyObj,
        price: {
          min: Number(propertyObj.price.min),
          max: Number(propertyObj.price.max),
        },
        image: imageUrl,
      };

      await axiosSecure.put("/properties/update", updatedProperty);
      toast.success("Property updated successfully");
      navigate("/dashboard/added-properties");
    } catch (e) {
    
      toast.error("Unexpected error occured while updating property");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="my-24 border max-w-2xl  border-gray-200 px-4 pt-10 pb-4 rounded-md md:w-[80%] mx-auto">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl sm:text-4xl text-center font-bold mb-4">
            Update Property
          </h1>
          <div className="w-full flex gap-4">
            <Input
              label={"title"}
              placeholder={"Property Title"}
              title={"Title"}
              type={"text"}
              value={propertyObj?.title}
              onChange={(e) =>
                setPropertyObj({ ...propertyObj, title: e.target.value })
              }
            />
            <Input
              label={"location"}
              placeholder={"Property Location"}
              title={"Location"}
              type={"text"}
              value={propertyObj?.location}
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

            <img
              src={previewImage}
              className=" min-w-32 min-h-32  object-cover border-2 border-btncol"
            />
          </div>
          <div>
            <textarea
              className="textarea border border-gray-300 w-full min-h-44 focus:outline-none focus:border-btncol"
              placeholder="Bio"
              value={propertyObj?.description}
              onChange={(e) =>
                setPropertyObj({ ...propertyObj, description: e.target.value })
              }></textarea>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Price Range:</h1>
            <div className="w-full flex gap-4 my-1">
              <Input
                label={"min"}
                value={propertyObj?.price.min}
                onChange={(e) =>
                  setPropertyObj({
                    ...propertyObj,
                    price: { ...propertyObj.price, min: e.target.value },
                  })
                }
                placeholder={"Min"}
                type={"number"}
              />
              <Input
                value={propertyObj?.price.max}
                onChange={(e) =>
                  setPropertyObj({
                    ...propertyObj,
                    price: {
                      ...propertyObj.price,
                      max: e.target.value,
                    },
                  })
                }
                label={"max"}
                placeholder={"Max"}
                type={"number"}
              />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Agent Info:</h1>
            <div className="grid gap-4 w-full grid-cols-2">
              <h1 className="text-xl">
                <span className="text-sm font-semibold">Name:</span> <br />{" "}
                {data?.agent.name}
              </h1>
              <h1 className="text-xl">
                <span className="text-sm font-semibold">Email:</span> <br />{" "}
                {data?.agent.email}
              </h1>
            </div>
          </div>
          <div onClick={handleUpdateProperty}>
            <ButtonCovered to={"#"}>Update</ButtonCovered>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProperty;
