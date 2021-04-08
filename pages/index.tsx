import Head from "next/head";
import BaseLink from "../components/BaseLink";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <BaseLink href="/claim">CLAIM LINK</BaseLink>
        </div>
    );
}
