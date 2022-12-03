import { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import LogIn from "./login";
import styles from "../styles/Home.module.css";
import NavigationService from "../operations/common/navigation";
import { DEFAULT_ENGINE, INFO_URL } from "../operations/common/constants";
import { GlobalStateContext } from "../context/common-state";

const Home: NextPage = () => {
  useEffect(() => {
    getDetails();
  }, []);

  const { state } = useContext(GlobalStateContext);

  const navigateToChat = ({ engine = DEFAULT_ENGINE }) => {
    const isLoggedIn = state?.common?.isLoggedIn || false;
    const canContinue = state?.common?.canContinue || false;
    if (isLoggedIn && canContinue) {
      router.push(
        {
          pathname: "/nxt-chat",
          query: { engine },
        },
        "/nxt-chat"
      );
    }
  };

  const isLoggedIn = state?.common?.isLoggedIn || false;
  const canContinue = state?.common?.canContinue || false;
  const [engineSelected, updateEngine] = useState(null) as any;
  const updateEngineSelection = (option: any) => updateEngine(option);
  const router = useRouter();
  navigateToChat({ engine: engineSelected?.id || null });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {!(isLoggedIn && canContinue) ? (
          <LogIn
            engine={engineSelected}
            updateEngine={updateEngineSelection}
            navigateToChat={navigateToChat}
          />
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default Home;

const getDetails = async () => {
  await fetch(INFO_URL)
    .then((response) => response.json())
    .then((result) => {
      fetch(NavigationService.getApiEndPointURL({ endPoint: "userinfo" }), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      })
        .then((response) => response.json())
        .then((data) => console.debug("Success!", data))
        .catch((error) => console.error("Error:", error));
    })
    .catch((error) => console.log("error", error));
};

interface LoginState {
  OPEN_AI_ORG?: string;
  OPENAI_API_KEY?: string;
  isLoggedIn?: true | false;
  engines?: [];
  canContinue?: boolean;
}
