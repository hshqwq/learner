import LinkButton from '@/components/page/home/link-button/link-button';
import styles from '@/styles/Home.module.scss';

import Head from "next/head";



export default function Home() {
    return <>
        <Head>
            <title>Learner</title>
        </Head>
        <div className={styles.main}>
            <div>
                <LinkButton name="化学" href='/chemistry'></LinkButton>
            </div>
        </div>
    </>
}