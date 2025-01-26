import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";

import { Link, useLocation, useNavigate } from "react-router";
import Input from "../../../shared/Input";
import { toast } from "react-toastify";
import AuthContext from "../../../contexts/AuthContexts";
import Heading from "../../../shared/Heading";
import useAxiosNormal from "../../../hooks/useAxiosNormal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading, loginUser, googleLogin, user } = useContext(AuthContext);
  const location = useLocation();
  const { axiosPublic } = useAxiosNormal();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await loginUser(email, password);
      toast.success("User LoggedIn successfully");
      navigate("/");
    } catch (err) {
      toast.error("Error Occured: " + err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const currentUser = await googleLogin();
      const user = currentUser.user;
      const authInfo = {
        name: user.displayName,
        email: user?.email,
        role: "user",
      };

      await axiosPublic.post("/users", authInfo);
      navigate("/");

      toast.success("User added successfully");
    } catch (e) {
      toast.error("Error during Google login.");
    } finally {
      setLoading(false);
    }
  };
  if (user) {
    return (
      <div className="my-52">
        <Heading largeHead={"You are already logged in"} />;
      </div>
    );
  }

  return (
    <div className=" h-[90vh] flex flex-col relative bg-cover justify-center py-12 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage:
            "url('https://protywpv2.live.vithemes.com/wp-content/uploads/2024/11/ssc.webp')",
        }}>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </div>
      <div className="w-[90%] mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-btncol text-center text-3xl font-extrabold">
              Login to your account
            </h2>
          </div>
          <form className=" mt-8 space-y-6" onSubmit={handleSubmit}>
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Enter your password"}
            />

            <div>
              <button
                type="Submit"
                className="px-6 py-2 border border-btncol font-medium text-white bg-btncol text-lg hover:bg-inherit font-poppins rounded-sm hover:text-btncol transition-all text-center duration-200 w-full flex items-center justify-center">
                Login <IoIosLogIn size={20} />
              </button>
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
                onClick={handleGoogleLogin}
                className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium bg-white border-btncol transition-all text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-btncol hover:text-white focus:ring-btncol">
                <FaGoogle className="mr-2 h-5 w-5" />
                Sign in with Google
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Not a member?{" "}
            <Link
              to="/register"
              className="font-medium text-btncol hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
