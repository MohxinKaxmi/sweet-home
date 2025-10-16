import React from 'react';
import { app } from '../firebase';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();  // ✅ This was missing
  const navigate = useNavigate();  // Optional: redirect after login

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));  // ✅ Proper Redux dispatch

      navigate('/Home');  // optional redirect after successful login
    } catch (error) {
      console.log('Could not sign in with Google', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="mt-4 w-full flex items-center justify-center gap-3 bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition duration-300"
    >
      <FcGoogle className="bg-white rounded-full p-[2px] text-2xl" />
      Continue with Google
    </button>
  );
}
