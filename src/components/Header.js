'use client'
// src/components/Header.js
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/componentStyles/Header.css';
import React, { useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';  // Ensure correct path to AuthContext
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClick = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="header">
      <div className="logoArea">
        <Image src="/assets/logo.png" alt="logo" className="logo" width={50} height={50} />
      </div>
      <div className="titleArea">
        <h1>Inventory Management System</h1>
      </div>
      <div className="linkArea">
        <nav className="nav">
          <Link href="/" className="link">Home</Link>
          <Link href="/about" className="link">About</Link>
          <div className="dropdown">
            <button className="link dropdown-toggle" onClick={toggleDropdown}>
              Services
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link href="/admin" className="dropdown-item" onClick={handleClick}>Admin Panel</Link>
                <Link href="/services/upload" className="dropdown-item" onClick={handleClick}>Upload Data</Link>
              </div>
            )}
          </div>
          {user ? (
            <button className="link" onClick={handleLogout}>Sign Out</button>
          ) : (
            <Link href="/auth" className="link">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
