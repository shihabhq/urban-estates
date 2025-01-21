import { useContext } from "react";
import AuthContext from "../../contexts/AuthContexts";
import Loading from "../../shared/Loading";


const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto">
      <div className="my-24 border border-gray-200 p-8 xl:px-32 rounded-md md:w-[80%] mx-auto">
        <h1 className="text-2xl sm:text-4xl text-center font-bold mb-4">
          Your informations
        </h1>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="mb-2 text-xl font-semibold">Image:</h1>
            <img src={user?.photoURL} className="max-w-xl w-[90%]" alt="" />
          </div>
          <div>
            <h1 className="text-2xl font-medium"> {user?.displayName}</h1>
            <h1 className="mobile:text-xl font-semibold">Email: {user?.email}</h1>
            {user?.role !== "user" && (
              <h1 className="text-xl font-semibold">Role: {user?.role}</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
