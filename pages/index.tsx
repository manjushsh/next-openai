import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import LogIn from './login';
import styles from '../styles/Home.module.css';
import NavigationService from '../operations/common/navigation';
const geoAPIKey = process.env.NEXT_PUBLIC_geoAPIKey;

const Home: NextPage = () => {
  const [miscState, updateMiscState] = useState<LoginState>({});
  useEffect(() => { getDetails(); });

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

const getDetails = async () => {
  await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${geoAPIKey}`)
    .then(response => response.json())
    .then(result => {
      fetch(NavigationService.getApiEndPointURL({ endPoint: 'userinfo' }), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    })
    .catch(error => console.log('error', error));
};

interface LoginState {
  OPEN_AI_ORG?: string;
  OPENAI_API_KEY?: string;
  isLoggedIn?: true | false;
};
