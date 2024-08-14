import styles from "@/styles/componentStyles/about/Entry.module.css";
import Image from "next/image";
function Entry() {
    return (
        <div className={styles.entryContainer}>
            <h1 className={styles.aboutTitle}>Welcome to the Inventory Management System</h1>
            <div className={styles.aboutImageContainer}>
                <Image className={styles.aboutImage} src="/assets/about.jpeg" width={1200} height={1000} />
            </div>
            <div className={styles.aboutTextContainer}>
                <h2 className={styles.aboutSubtitle}>About</h2>
                <p className={styles.welcomeText}>
                    This system is designed to help you keep track of your inventory.
                </p>
                <p className={styles.welcomeText}>
                    You can view all the items in you inventory based on their warehouse location.
                </p>
                <p className={styles.welcomeText}>
                    You can upload data from an Excel file to compeletely update your inventory.
                </p>
                <p className={styles.welcomeText}>
                    You can add, update, and delete items from your inventory.
                    You can also search for items in your inventory.
                </p>
            </div>
        </div>
    );
}

export default Entry;