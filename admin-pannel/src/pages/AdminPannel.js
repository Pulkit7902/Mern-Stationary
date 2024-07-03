import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const AdminPannel = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    // if (user?.role !== 'ADMIN') {
    //   navigate('/');
    // }
  }, [user]);

  return (
    <div className='flex flex-col md:flex-row h-full min-h-[calc(100vh-120px)]'>
      <aside className='w-full md:w-1/4 lg:w-1/5 customShadow bg-purple-200'>
        <div className='flex flex-col items-center p-4'>
          <div className='relative flex justify-center text-4xl cursor-pointer mb-4'>
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className='w-20 h-20 rounded-full'
                alt={user?.name}
              />
            ) : (
              <FaUser />
            )}
          </div>
          <p className='text-lg capitalize font-semibold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>
        {/* Navigation */}
        <nav className='flex flex-col'>
          <Link
            to='/all-user'
            className='px-4 py-2 hover:bg-slate-100'
          >
            All Users
          </Link>
          <Link
            to='/product'
            className='px-4 py-2 hover:bg-slate-100'
          >
            Products
          </Link>
        </nav>
      </aside>
      <main className='w-full md:w-3/4 lg:w-4/5 p-4'>
        main
      </main>
    </div>
  );
};

export default AdminPannel;
