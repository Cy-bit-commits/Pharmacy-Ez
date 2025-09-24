import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './RegisterLogin.module.css'; // Import the CSS module

export default function register() {
  return (
    <div className={styles.loginPage}>
      {/* Logo at the top left corner, links to home */}
      <div style={{ position: 'absolute', top: 32, left: 32 }}>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', boxShadow: '0 2px 8px #e3e8ee', cursor: 'pointer' }} />Pharmac EZ
        </Link>
      </div>
      <div className={styles.form}>
        {/* Logo at the top of the form */}
        
        <h1 className={styles.title}>Register</h1>
        {/* Input fields for username, email, password */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="username">Username</label>
          <input className={styles.input} type="text" id="username" placeholder="Enter your username" />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input className={styles.input} type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="password">Password</label>
          <input className={styles.input} type="password" id="password" placeholder="Enter your password" />
        </div>
        {/* Button to submit the form */}
        <button className={styles.button}><Link href ="/login">Sign Up!</Link></button>
        {/* Extra links */}
        <div className={styles.extraLinks}>
          <a href="#"></a>
           <Link href="/login">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}