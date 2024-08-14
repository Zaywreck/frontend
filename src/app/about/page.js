import End from "@/components/about/End";
import Entry from "@/components/about/Entry";
import HowTo from "@/components/about/HowTo";
import styles from "@/styles/about.module.css";

function Page() {
    return (
        <div className={styles.aboutContainer}>
            <Entry />
            <HowTo />
            <End />
        </div>
    );
}

export default Page;