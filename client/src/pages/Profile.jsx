import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../redux/user/userSlice'; // ✅ make sure path is correct

const ProfileForm = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);

  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [preview, setPreview] = useState(
    localStorage.getItem('profilePic') ||
      currentUser?.avatar ||
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('❌ Only image files are allowed!');
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreview(base64String);
        localStorage.setItem('profilePic', base64String);
        toast.success('✅ Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) setPreview(savedPic);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          email,
          password,
          avatar: preview,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
        toast.error(data.message || '❌ Failed to update');
        return;
      }

      dispatch(updateUserSuccess(data));
      toast.success('✅ Profile updated successfully!');
      setPassword('');
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error('❌ Server error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg mt-16 ring-1 ring-gray-200">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-900 tracking-tight">
        {username || 'Your Name'}
      </h1>

      <div className="flex justify-center mb-8">
        <img
          onClick={() => fileRef.current.click()}
          src={preview}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md object-cover cursor-pointer"
        />
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-3 rounded-lg shadow-md transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
