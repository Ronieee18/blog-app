import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';
import Logo from '../Logo';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    // {
    //   name: 'Login',
    //   slug: '/login',
    //   active: !authStatus,
    // },
    // {
    //   name: 'Sign up',
    //   slug: '/signup',
    //   active: !authStatus,
    // },

    {
      name: 'allposts',
      slug: '/all-posts',
      active: true,
    },
    {
      name: 'addpost',
      slug: '/add-post',
      active: true,
    },
  ];

  return (
    <header className='p-2 pt-[22px] max-[600px]:w-[550px] mb-0 block w-full py-3 bg-black'>
      <nav className='flex z-10'>
        <div className='mr-3'>
          <Link to='/' className='flex'>
            <Logo width='70px' />
            <h1 className='m-1.5 ml-4 font-mono text-xl text-white'>Blogger</h1>
          </Link>
        </div>

        {/* Hamburger menu button */}
        <button
          className='lg:hidden ml-auto mr-3 text-white relative'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>

        {/* Navigation links */}
        <div className='relative'>
        <ul className={`lg:flex ${menuOpen ? 'flex max-lg:flex-col max-lg:absolute right-0 top-8 text-xl gap-5 max-lg:p-3  ' : 'hidden'}`}>
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setMenuOpen(false); // Close menu on navigation
                    }}
                    className='inline-block text-white px-7 py-2 duration-200 active:underline active:decoration-white hover:bg-white hover:text-black rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}

          {/* {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )} */}
        </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
