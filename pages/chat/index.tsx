import { useState } from "react";
import { ChatFeed, Message } from "react-chat-ui";
import oneTimeChat from "../api/chat";
import { API_AUTH } from "./index-d";

const ID_WISE_USER = ['Human', 'AI'];

const Chat = ({ OPEN_AI_ORG, OPENAI_API_KEY }: API_AUTH) => {
    const [miscState, updateMiscState] = useState({}) as any;

    const styles = {
        chatBubble: {
            text: {
                fontSize: 30
            },
            chatbubble: {
                borderRadius: 70,
                padding: 40
            }
        }
    };

    const getAIAnswer = async ({ statement = '' }) => {
        const headers = { "Content-Type": "application/json" };
        const body = JSON.stringify({
            configuration: { OPEN_AI_ORG, OPENAI_API_KEY },
            statement,
        });
        const requestData = {
            method: 'POST',
            headers,
            body,
        };
        const finalURL = `http://${process?.env?.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000'}/api/chat`;
        fetch(finalURL, requestData)
            .then(response => response.json())
            .then(result => {
                if (result?.data && result?.data.length > 0) {
                    console.warn('Data: ', result?.data);

                    // updateLogin({ ...state, isLoggedIn: true });
                }
            })
            .catch(error => console.log('error', error));
    }

    const onType = (e: React.ChangeEvent<HTMLInputElement>) => updateMiscState({ ...miscState, newMessage: e.target.value });
    const sendMessage = async ({ text = '' }) => {
        if (text.length <= 0) {
            updateMiscState({ ...miscState, newMessage: '', isTyping: false });
        }
        else {
            const currentMessages = miscState?.messages || [];
            currentMessages.push(new Message({ id: 0, message: text, }));
            updateMiscState({ ...miscState, messages: currentMessages, newMessage: '', isTyping: true });
            const { messages } = miscState;
            let context = '';
            if (messages && messages.length > 0) {
                context = Object.keys(messages).map(message => `${ID_WISE_USER[messages[message].id]}: ${messages[message].message}`).join('\n') || '';
            }
            const response = await getAIAnswer({ statement: context });
            console.warn("response ", response);
        }
    }

    console.warn('statetetete', OPENAI_API_KEY, OPEN_AI_ORG);

    return (
        <>
            <ChatFeed
                messages={miscState?.messages || []} // Array: list of message objects
                isTyping={miscState?.isTyping || false} // Boolean: is the recipient typing
                hasInputField={false} // Boolean: use our input, or use your own
                showSenderName // show the name of the user who sent the message
                bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                bubbleStyles={styles.chatBubble} // JSON: Custom bubble styles
            />
            <div className='msg-send' style={{
                display: 'flex',
                justifyContent: 'center',
                alignSelf: 'center'
            }}>
                <div className="msg-txt">
                    <input type={'text'} onChange={onType} value={miscState?.newMessage || ''} placeholder={'Ask something'} />
                </div>
                <div className="msg-btn" style={{ marginLeft: 'auto', margin: 0 }}>
                    <input
                        type="button"
                        className="fadeIn fourth"
                        value={'Send'}
                        onClick={() => sendMessage({ text: miscState?.newMessage })}
                        disabled={!(miscState?.newMessage)}
                    />
                </div>
            </div>
        </>
    );
}

export default Chat;
