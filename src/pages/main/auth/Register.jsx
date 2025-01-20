import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";

import { Link, Navigate, useNavigate } from "react-router";
import Input from "../../../shared/Input";
import { toast } from "react-toastify";
import AuthContext from "../../../contexts/AuthContexts";
import Heading from "../../../shared/Heading";
import axios from "axios";
import Loading from "../../../shared/Loading";
import useAxiosNormal from "../../../hooks/useAxiosNormal";

const Register = () => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const { user, loading, createUser, setLoading, googleLogin, updateUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { axiosPublic } = useAxiosNormal();

  // regex

  const uppercaseRegex = /[A-Z]/;
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !photo || !email || !password) {
      setError("Please fill up all the fields and upload image");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");

      return;
    }
    if (!uppercaseRegex.test(password)) {
      setError("Password must contain one uppercase letter");

      return;
    }
    if (!specialCharacterRegex.test(password)) {
      setError("Password must contain at least one special character");

      return;
    }
    setError("");
    try {
      const photoURL = await uploadImage(photo);
      if (!photoURL) {
        throw new Error("Problem occured while uploading image");
      }
      await createUser(email, password);

      await updateUser({ displayName: name, photoURL: photoURL });
      const userInfo = {
        name: name,
        email: email,
        role: "user",
      };
      await axiosPublic.post("/users", userInfo);

      toast.success("successfully created user");
    } catch (error) {
      console.log(error);
      toast.error("Unexpected error occured While creating user");
    } finally {
      setLoading(false);
    }
  };

  //upload image to cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    try {
      const res = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        formData
      );
      const imageURL = res.data.secure_url;
      console.log(imageURL);
      return imageURL;
    } catch (error) {
      throw new Error("Image upload failed", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      const render = new FileReader();
      render.onload = () => {
        setPhotoPreview(render.result);
      };
      render.readAsDataURL(file);
    } else {
      toast("Please give a valid Image");
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  const handleGoogleRegistration = async () => {
    try {
      const currentUser = await googleLogin();
      const user = currentUser.user;
      const authInfo = {
        name: user.displayName,
        email: user?.email,
        role: "user",
      };

      await axiosPublic.post("/users", authInfo);

      toast.success("User added successfully");
    } catch (error) {
      toast.error("Error during Google login.");
    } finally {
      setError("");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-cover justify-center pt-12 pb-24 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage:
            "url('https://turismo.antequera.es/wp-content/uploads/2023/04/pexels-robin-stickel-70497.jpg)",
        }}>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </div>
      <div className=" w-[90%] mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-btncol text-center text-3xl font-extrabold">
              New User Register
            </h2>
          </div>
          <form className=" mt-8 space-y-6" onSubmit={handleSubmit}>
            <Input
              label={"username"}
              title={"Enter your name"}
              type={"text"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={"Enter your name"}
            />
            <Input
              label={"email"}
              title={"Email Address"}
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Enter your email"}
            />

            <Input
              label={"password"}
              title={"Password"}
              type={"password"}
              value={password}
              placeholder={"Enter your password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex flex-col items-center justify-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer px-4 py-2 bg-btncol text-white rounded-md hover:bg-inherit hover:text-btncol border border-btncol transition-all duration-200">
                Upload Photo
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  handleFileChange(e);
                }}
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Selected"
                  className="mt-4 w-32 h-32 rounded-full object-cover border-2 border-btncol"
                />
              )}
            </div>

            <div>
              <button
                type="Submit"
                className="block px-6 py-2 border border-btncol font-medium text-white bg-btncol text-lg hover:bg-inherit font-poppins rounded-sm hover:text-btncol transition-all text-center duration-200 w-full">
                Register
              </button>
              <p className="text-sm text-red-500 ">{error && error}</p>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleRegistration}
                className="w-full flex justify-center py-2 px-4 border border-btncol rounded-md shadow-sm text-sm font-medium bg-white transition-all hover:bg-btncol hover:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-btncol">
                <FaGoogle className="mr-2 h-5 w-5" />
                Register with Google
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-medium text-btncol hover:underline">
              login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

// googleLogin()
// .then(() => {
//   toast.success("Account added Successfully");
//   navigate("/");
// })
// .catch((err) => {
//   toast.error("Unexpected Error Occured" + err, {
//     position: "top-center",
//   });
// })
// .finally(() => {
//   setLoading(false);
//   setError("");
// });
