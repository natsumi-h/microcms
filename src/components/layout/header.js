import React from "react";
import Link from "next/link";
import styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <ul className={styles.ul}>
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
      </ul>
    </header>
  );
}

export default Header;
