import React from 'react';
import Image from 'next/image';
import styles from '@/styles/componentStyles/about/HowTo.module.css';

function HowTo() {
    return (
        <div className={styles.howToContainer}>
            <h2 className={styles.howToTitle}>How to Use the Inventory Management System</h2>
            <div className={styles.howToTextContainer}>
                <p className={styles.howToText}>
                    In this section, you will learn how to use the Inventory Management System.
                </p>
                <p className={styles.howToText}>
                    First you will need to create an account. You can do this by clicking on the "Sign Up" button in the top right corner of the page.
                </p>
                <Image
                    className={styles.howToImage}
                    src="/assets/register.png"
                    layout="responsive"
                    width={1200}
                    height={800}
                    alt="Register"
                />
                <p className={styles.howToText}>
                    Once you have created an account, you can log in by clicking on the "Log In" button in the top right corner of the page.
                </p>
                <p className={styles.howToText}>
                    Once you are logged in, you will be able to view all the items in your inventory based on their warehouse location in the Home page.
                </p>
            </div>
            <div className={styles.howToTextContainer}>
                <p className={styles.howToText}>
                    From now on you can view all the items in your inventory based on their warehouse location in the Home page.
                </p>
                <Image
                    className={styles.howToImage}
                    src="/assets/home.png"
                    layout='responsive'
                    width={1200}
                    height={800}
                    alt="Home"
                />
                <p className={styles.howToText}>
                    You can pick a warehouse from the dropdown menu to view all the items in that warehouse.
                </p>
            </div>
            <div className={styles.howToTextContainer}>
                <p className={styles.howToText}>
                    First thing to do is uploading a data of that period. You can do this by clicking on the "Upload Data" button in the top right corner and under the services.
                </p>
                <Image
                    className={styles.howToImage}
                    src="/assets/upload.png"
                    layout='responsive'
                    width={1200}
                    height={800}
                    alt="Upload"
                />
                <p className={styles.howToText}>
                    You can upload excel files with the data of the items in your inventory. The system will automatically add the data to the database.
                </p>
                <p className={styles.howToText}>
                    more formats will be added in the future.
                </p>
                <p className={styles.howToText}>
                    The uploaded data will be automatically connected to relevant tables specially with the warehouses in the database. and you can view them in the Home page.
                </p>
            </div>
            <div className={styles.howToTextContainer}>
                <p className={styles.howToText}>
                    Based on your role you can use the admin page to add, edit, or delete items from your inventory.
                </p>
                <Image
                    className={styles.howToImage}
                    src="/assets/dashboard.png"
                    layout='responsive'
                    width={1200}
                    height={800}
                    alt="Dashboard"
                />
                <p className={styles.howToText}>
                    from the dasboard you can choose tables to view and do create,edit and delete operations on them.
                </p>
                <Image
                    className={styles.howToImage}
                    src="/assets/inventoryAdmin.png"
                    layout='responsive'
                    width={1200}
                    height={800}
                    alt="Inventory"
                />
                <p className={styles.howToText}>
                    In this page you can search for items by every column in the table. If the data is large you can use the pagination to navigate through the data.
                </p>
            </div>
        </div>
    );
}

export default HowTo;
