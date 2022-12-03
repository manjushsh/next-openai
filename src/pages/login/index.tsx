import Link from "next/link";
import { useContext } from "react";
import Select from "react-select";
import { GlobalStateContext } from "../../context/common-state";
import { DEFAULT_ENGINE } from "../../operations/common/constants";
import NavigationService from "../../operations/common/navigation";

const LogIn = ({ navigateToChat, engine, updateEngine }: any) => {
  const { state, setState } = useContext(GlobalStateContext);
  const onOrganizationIdChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState({ OPEN_AI_ORG: e.target.value }, "OPENAI_CREDENTIALS");
  const openAIAPIKeyChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState({ OPENAI_API_KEY: e.target.value }, "OPENAI_CREDENTIALS");

  const onLogIn = () => {
    const { OPEN_AI_ORG, OPENAI_API_KEY } = state?.OPENAI_CREDENTIALS;
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ OPEN_AI_ORG, OPENAI_API_KEY });
    const requestData = {
      method: "POST",
      headers,
      body,
    };
    fetch(
      NavigationService.getApiEndPointURL({ endPoint: "list-engines" }),
      requestData
    )
      .then((response) => response.json())
      .then((result) => {
        if (result?.data && result?.data.length > 0) {
          setState(
            {
              OPENAI_API_KEY,
              OPEN_AI_ORG,
            },
            "OPENAI_CREDENTIALS"
          );
          setState(
            {
              isLoggedIn: true,
              engines: generateEngineOptions({ engines: result?.data }),
            },
            "common"
          );
        }
      })
      .catch((error) => {
        alert(`Couldn't log you in! Please try again later.`);
        console.log("error", error);
      });
  };

  const isLoginDisabled = !state?.OPENAI_CREDENTIALS?.OPENAI_API_KEY;

  const isValidEngine = (engine: Engine) =>
    String(engine?.id).startsWith("text") && engine?.id.split("-").length <= 3;

  const generateEngineOptions = ({
    engines = state?.common?.engines || [],
  }) => {
    const options: any = [];
    if (engines) {
      engines.forEach((engine: any) => {
        if (isValidEngine(engine)) {
          options.push({
            label: engine.id,
            value: engine.id,
            ...engine,
          });
        }
      });
    }
    return options;
  };

  const onUserLogin = () => {
    if (!state?.common?.isLoggedIn) onLogIn();
    else if (state?.common?.isLoggedIn && !state?.common?.canContinue)
      setState({ canContinue: true }, "common");
    else navigateToChat({ engine: engine?.id });
  };

  return (
    <>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active"> Sign In </h2>

          <form>
            <input
              type="text"
              id="login"
              className="fadeIn second"
              name="login"
              placeholder="Enter organization ID (OPTIONAL)"
              onChange={onOrganizationIdChange}
            />
            <input
              type="text"
              id="password"
              className="fadeIn third"
              name="key"
              placeholder="Enter open AI API key"
              onChange={openAIAPIKeyChange}
            />
            <input
              type="button"
              className="fadeIn fourth"
              value={state?.common?.isLoggedIn ? "Continue" : "Log In"}
              onClick={!isLoginDisabled ? () => onUserLogin() : () => {}}
            />
          </form>
          {state?.common?.isLoggedIn ? (
            <>
              <SelectEngine
                list={state?.common?.engines}
                engine={engine}
                updateEngine={updateEngine}
              />
            </>
          ) : (
            ""
          )}
          <Link href={"test-page/page1"}>Go to Posts</Link>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default LogIn;

// Other components
const SelectEngine = ({ list, engine, updateEngine }: EngineSelectionProps) => {
  const [selectedEngine]: any = list?.filter(
    (l: any) => l.id === DEFAULT_ENGINE
  );
  if (!engine && selectedEngine) {
    updateEngine(selectedEngine);
  }

  const handleChangeEngine = (option: any) => {
    updateEngine(option);
  };

  return (
    <div className={"engine-selection-container"}>
      <Select
        options={list}
        value={engine || selectedEngine}
        onChange={handleChangeEngine}
      />
    </div>
  );
};

interface LoginState {
  OPEN_AI_ORG?: string;
  OPENAI_API_KEY?: string;
  isLoggedIn?: boolean;
  canContinue?: boolean;
}

type selectedEngine = { label: string; value: number | string };
type Engine = { id: string };
interface EngineSelectionProps {
  list?: selectedEngine[] | any;
  engine?: selectedEngine;
  updateEngine?: any;
}
