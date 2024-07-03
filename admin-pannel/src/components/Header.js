import React from 'react';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserDetail } from '../store/userSlice';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state?.user?.user);

  const handleLogout = async () => {
    const fetchdata = await fetch('http://localhost:8080/api/adminlogout', {
      method: SummaryApi.admindetail.method,
      credentials: 'include',
    });
    const data = await fetchdata.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetail(null));
      navigate('/');
    }
    if (data.error) {
      toast.error(data.error);
    }
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/">
            <Logo w={100} h={60} className="-mx-1" />
          </Link>
          <span className="ml-4 font-semibold text-xl tracking-tight">Admin Dashboard</span>
        </div>
        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/profile" className="hover:text-gray-400">Profile</Link>
          <Link to="/settings" className="hover:text-gray-400">Settings</Link>
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                type="button"
                className="px-3 py-1 rounded-full bg-purple-500 hover:bg-purple-700"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button
                  type="button"
                  className="px-3 py-1 rounded-full bg-purple-500 hover:bg-purple-700"
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;

