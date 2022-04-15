import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Chat from './chat';

const NextChat: NextPage = () => {
    const { query }: any = useRouter();

    return (
        <div>
            <main>
                <Chat OPENAI_API_KEY={query?.OPENAI_API_KEY} OPEN_AI_ORG={query?.OPEN_AI_ORG} />
            </main>
        </div>
    )
}

export default NextChat;
