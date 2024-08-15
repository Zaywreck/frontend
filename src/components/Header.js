'use client'
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/componentStyles/Header.module.css';
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
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <Image src="/assets/logo.png" alt="logo" className={styles.logo} width={50} height={50} />
      </div>
      <div className={styles.titleArea}>
        <h1 className={styles.title}>Inventory Management System</h1>
      </div>
      <div className={styles.linkArea}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <div className={styles.dropdown}>
            <button className={`${styles.link} ${styles.dropdownToggle}`} onClick={toggleDropdown}>
              Services
            </button>
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link href="/admin" className={styles.dropdownItem} onClick={handleClick}>Admin Panel</Link>
                <Link href="/services/upload" className={styles.dropdownItem} onClick={handleClick}>Upload Data</Link>
              </div>
            )}
          </div>
          {user ? (
            <button className={styles.link} onClick={handleLogout}>Sign Out</button>
          ) : (
            <Link href="/auth" className={styles.link}>Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
