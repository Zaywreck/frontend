'use client'
// src/components/Header.js
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/componentStyles/Header.css';
import React, { useState } from 'react';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleClick = () => {
    setDropdownOpen(false);
  }

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
          <Link href="/" className="link">
            Home
          </Link>
          <Link href="/about" className="link">
            About
          </Link>
          <div className="dropdown">
            <button className="link dropdown-toggle" onClick={toggleDropdown}>
              Services
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link href="/admin" className="dropdown-item" onClick={handleClick}>
                  Admin Panel
                </Link>
                <Link href="/services/upload" className="dropdown-item" onClick={handleClick}>
                  Upload Data
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
