'use client'
// src/app/page.js
import styles from "./page.module.css";
import WarehouseOverview from "@/components/warehouseViewComps/WarehouseOverview";

export default function Page() {
  return (
      <main className={styles.main}>
        <WarehouseOverview />
      </main>
  );
}
