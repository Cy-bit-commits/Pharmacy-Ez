import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './LoginPage.module.css'; // Import the CSS module

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      {/* Logo at the top left corner, links to home */}
      <div style={{ position: 'absolute', top: 32, left: 32 }}>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', boxShadow: '0 2px 8px #e3e8ee', cursor: 'pointer' }} />Pharmac EZ
        </Link>
      </div>
      <form className={styles.form}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className={styles.input} 
            placeholder="you@example.com"
            required 
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className={styles.input} 
            placeholder="password1234"
            required 
          />
        </div>

        <button type="submit" className={styles.button}>
         <Link href ="/">Login</Link>
        </button>

        <div className={styles.extraLinks}>
          <a href="#">Forgot Password?</a>
        </div>
        <div className={styles.extraLinks}>
          Don&apos;t have an account? <a href="/register">Sign up! </a>
        </div>
      </form>
    </div>
  );
}