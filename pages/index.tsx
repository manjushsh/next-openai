import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import LogIn from './login';
import LoginState from './login/index-d';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [miscState, updateMiscState] = useState<LoginState>({});

  const getCredentials = ({ OPEN_AI_ORG, OPENAI_API_KEY, isLoggedIn = miscState?.isLoggedIn }: LoginState) => {
    updateMiscState({ ...miscState, OPEN_AI_ORG, OPENAI_API_KEY, isLoggedIn });
  };

  const navigateToChat = ({ isLoggedIn = false }) => {
    if (isLoggedIn) {
      router.push({
        pathname: '/nxt-chat',
        query: { ...miscState },
      }, '/nxt-chat');
    }
  }

  const { isLoggedIn } = miscState;
  const router = useRouter();
  navigateToChat({ isLoggedIn });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {!isLoggedIn ? <LogIn state={miscState} updateLogin={getCredentials} /> : ''}
      </main>
    </div>
  )
}

export default Home;
