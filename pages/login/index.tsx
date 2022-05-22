import { useState } from "react";
import Link from "next/link";
import Select from "react-select";
import { DEFAULT_ENGINE } from "../../operations/common/constants";
import NavigationService from "../../operations/common/navigation";

const LogIn = ({ state, updateLogin, navigateToChat, engine, updateEngine }: any) => {

    const onOrganizationIdChange = (e: React.ChangeEvent<HTMLInputElement>) => updateLogin({ ...state, OPEN_AI_ORG: e.target.value });
    const openAIAPIKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => updateLogin({ ...state, OPENAI_API_KEY: e.target.value });

    const onLogIn = ({ OPEN_AI_ORG, OPENAI_API_KEY }: LoginState) => {
        const headers = { "Content-Type": "application/json" };
        const body = JSON.stringify({ OPEN_AI_ORG, OPENAI_API_KEY });
        const requestData = {
            method: 'POST',
            headers,
            body,
        };
        fetch(NavigationService.getApiEndPointURL({ endPoint: 'list-engines' }), requestData)
            .then(response => response.json())
            .then(result => {
                if (result?.data && result?.data.length > 0) {
                    updateLogin({ ...state, isLoggedIn: true, engines: generateEngineOptions({ engines: result?.data }) });
                }
            })
            .catch(error => {
                alert(`Couldn't log you in! Please try again later.`);
                console.log('error', error)
            });
    }

    const isLoginDisabled = !state?.OPENAI_API_KEY;

    const isValidEngine = (engine: Engine) => String(engine?.id).startsWith('text') && engine?.id.split('-').length <= 3;

    const generateEngineOptions = ({ engines = state.engines }) => {
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
    }

    const onUserLogin = () => {
        if (!(state?.isLoggedIn))
            onLogIn({ ...state });
        else if (state?.isLoggedIn && !state?.canContinue)
            updateLogin({ ...state, canContinue: true });
        else
            navigateToChat({ isLoggedIn: state?.isLoggedIn, canContinue: state?.canContinue, engine: engine?.id });
    }

    return (
        <>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <h2 className="active"> Sign In </h2>

                    <form>
                        <input type="text" id="login" className="fadeIn second" name="login" placeholder="Enter organization ID (OPTIONAL)" onChange={onOrganizationIdChange} />
                        <input type="text" id="password" className="fadeIn third" name="key" placeholder="Enter open AI API key" onChange={openAIAPIKeyChange} />
                        <input
                            type="button"
                            className="fadeIn fourth"
                            value={state?.isLoggedIn ? 'Continue' : 'Log In'}
                            onClick={!isLoginDisabled ? () => onUserLogin() : () => { }}
                        />
                    </form>
                    {
                        state?.isLoggedIn ? (<><SelectEngine list={state.engines} engine={engine} updateEngine={updateEngine} /></>) : ''
                    }
                    <Link href={'test-page/page1'}><a>Go to Posts</a></Link><br /><br />
                </div>
            </div>
        </>
    );
}

export default LogIn;

// Other components
const SelectEngine = ({ list, engine, updateEngine }: EngineSelectionProps) => {

    const [selectedEngine]: any = list?.filter((l: any) => l.id === DEFAULT_ENGINE);
    if (!engine && selectedEngine) {
        updateEngine(selectedEngine);
    }

    const handleChangeEngine = (option: any) => {
        updateEngine(option);
    };

    return <div className={'engine-selection-container'}>
        <Select options={list} value={engine || selectedEngine} onChange={handleChangeEngine} />
    </div>
}

const CheckMark = ({ fill = "#198754", dimension = "32" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill={fill} width={dimension} height={dimension} viewBox={`0 0 ${dimension} ${dimension}`}>
            <path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z" />
        </svg>
    )
}

interface LoginState {
    OPEN_AI_ORG?: string;
    OPENAI_API_KEY?: string;
    isLoggedIn?: boolean;
    canContinue?: boolean;
};

type selectedEngine = { label: string, value: number | string };
type Engine = { id: string };
interface EngineSelectionProps {
    list?: selectedEngine[] | any;
    engine?: selectedEngine;
    updateEngine?: any;
};