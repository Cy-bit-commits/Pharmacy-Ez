import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './RegisterLogin.module.css'; // Import the CSS module

export default function register() {
  return (
    <div className={styles.loginPage}>
      {/* Logo at the top left corner, links to home */}
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-2 sm:px-0 max-h-800 max-w-600">
      {/* Logo at the top left corner, links to home */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-lg shadow-md" />
          <span className="font-bold text-lg text-green-700 hidden sm:inline">Pharmac EZ</span>
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
    </div>
  );
}