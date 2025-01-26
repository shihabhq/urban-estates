import { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContexts";
import auth from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosNormal from "../hooks/useAxiosNormal";
import { toast } from "react-toastify";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const { axiosPublic } = useAxiosNormal();

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const updateUser = (updateData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateData);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        const userInfo = { email: currentUser.email };
        try {
          const roleRes = await axiosPublic.get("/users", { params: userInfo });
          const role = roleRes.data?.role;
          axiosPublic.post("/jwt", userInfo).then((res) => {
            console.log(res.data);
            if (res.data?.token) {
              localStorage.setItem("token", res.data.token);
            }
          });
          let updatedUser;
          if (role === "agent") {
            const res = await axiosPublic.get("/user-fraud", {
              params: userInfo,
            });
            const fraud = res.data?.fraud;
            updatedUser = {
              ...currentUser,
              role: role || "agent",
              fraud: fraud || false,
            };
          } else {
            updatedUser = { ...currentUser, role: role || "user" };
          }
          updatedUser = {
            ...updatedUser,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          };

          setUser(updatedUser);
        } catch (error) {
          toast.error("something went wrong");
        }

        setLoading(false);
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    loginUser,
    createUser,
    logOut,
    setLoading,
    googleLogin,
    setUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
