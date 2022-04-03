import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Chat from './chat';

const NextChat: NextPage = () => {

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Chat />
            </main>
        </div>
    )
}

export default NextChat;
