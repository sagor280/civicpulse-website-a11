// import React from 'react';
// import useAuth from '../../hooks/useAuth';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { useLocation, useNavigate } from 'react-router';

// const SocialPages = () => { const { signInGoogle, createUser } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const location = useLocation();
//     const navigate = useNavigate();


//     return (
//         <div>
            
//         </div>
//     );
// };

// export default SocialPages;

import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SocialPages = () => {
  const { signInWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

     
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      await axiosSecure.post("/users", userInfo);

      toast.success("Google login successful");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full border border-gray-300 py-3 rounded-xl 
      flex items-center justify-center gap-2 hover:bg-gray-50 shadow-sm transition"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  );
};

export default SocialPages;
