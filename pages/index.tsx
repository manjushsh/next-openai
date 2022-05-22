import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import LogIn from './login';
import styles from '../styles/Home.module.css';
import NavigationService from '../operations/common/navigation';
import { DEFAULT_ENGINE, INFO_URL } from '../operations/common/constants';


const Home: NextPage = () => {
  const [miscState, updateMiscState] = useState<LoginState>({});
  useEffect(() => {
    // getDetails();
  });

  const getCredentials = ({
    OPEN_AI_ORG,
    OPENAI_API_KEY,
    isLoggedIn = miscState?.isLoggedIn,
    canContinue = miscState?.canContinue,
    engines = [],
  }: LoginState) => {
    updateMiscState({ ...miscState, OPEN_AI_ORG, OPENAI_API_KEY, isLoggedIn, canContinue, engines });
  };

  const navigateToChat = ({ isLoggedIn = false, canContinue = false, engine = DEFAULT_ENGINE }) => {
    if (isLoggedIn && canContinue) {
      router.push({
        pathname: '/nxt-chat',
        query: { ...miscState, engine },
      }, '/nxt-chat');
    }
  }

  const { isLoggedIn, canContinue } = miscState;
  const [engineSelected, updateEngine] = useState(null) as any;
  const updateEngineSelection = (option: any) => updateEngine(option);
  const router = useRouter();
  navigateToChat({ isLoggedIn, canContinue, engine: engineSelected?.id });


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {!(isLoggedIn && canContinue) ? <LogIn
          state={miscState}
          engine={engineSelected}
          updateEngine={updateEngineSelection}
          updateLogin={getCredentials}
          navigateToChat={navigateToChat} /> : ''}
      </main>
    </div>
  )
}

export default Home;

const getDetails = async () => {
  await fetch(INFO_URL)
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
        .then(data => console.debug('Success!', data))
        .catch((error) => console.error('Error:', error));
    })
    .catch(error => console.log('error', error));
};

interface LoginState {
  OPEN_AI_ORG?: string;
  OPENAI_API_KEY?: string;
  isLoggedIn?: true | false;
  engines?: [];
  canContinue?: boolean;
};
