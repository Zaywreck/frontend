import React from 'react';
import styles from '@/styles/componentStyles/about/End.module.css';

function End() {
    const mail = "mert.gulle@turktelekom.com";
    const github = "https://github.com/Zaywreck";

    return (
        <div className={styles.endContainer}>
            <div className={styles.endTextContainer}>
                <p className={styles.endText}>
                    The system is still in development and more features will be added in the future.
                </p>
                <p className={styles.endText}>
                    If you have any questions or suggestions please contact me at <a href={`mailto:${mail}`} className={styles.link}>{mail}</a>
                </p>
            </div>
            <div className={styles.endTextContainer}>
                <p className={styles.endText}>
                    This project is developed by Mert Gülle as a part of his Start Genç Yetenek internship at Türk Telekom.
                    Time spent on base of this project is 1 month, from 22.07.2024 to 22.08.2024.
                </p>
                <p className={styles.endText}>
                    The project is developed using Next.js and React for the frontend.
                    For the backend, Python FastAPI is used, and finally, MySQL is used for the database.
                </p>
                <p className={styles.endText}>
                    For the source code of the project, you can visit the <a href={github} className={styles.link} target="_blank" rel="noopener noreferrer">GitHub</a> page.
                </p>
            </div>
        </div>
    );
}

export default End;
