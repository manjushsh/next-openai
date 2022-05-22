import React, { useEffect, useState } from "react";
import { ChatFeed, Message } from "react-chat-ui";
import NavigationService from "../../operations/common/navigation";
import styles from '../../styles/NextChat.module.css';

const ID_WISE_USER = ['Human', 'AI'];

const Chat = ({ OPEN_AI_ORG, OPENAI_API_KEY, model }: API_AUTH) => {
    const [miscState, updateMiscState] = useState({}) as any;
    useEffect(() => {
        if (!OPENAI_API_KEY) {
            alert(`Couldn't get valid API keys. Please enter credentials again!`)
            NavigationService.navigateToRoot();
        }
    })

    const chatStyles = {
        chatBubble: {
            text: {
                fontSize: 20
            },
            chatbubble: {
                borderRadius: 35,
                padding: 20
            }
        }
    };

    const getAIAnswer = async ({ statement = '', currentMessages }: any) => {
        const headers = { "Content-Type": "application/json" };
        const body = JSON.stringify({
            configuration: { OPEN_AI_ORG, OPENAI_API_KEY },
            statement,
            model,
        });
        const requestData = {
            method: 'POST',
            headers,
            body,
        };
        await fetch(NavigationService.getApiEndPointURL({ endPoint: 'chat' }), requestData)
            .then(response => response.json())
            .then((result: any) => {
                const data = result?.data?.choices || null;
                if (data && data.length > 0) {
                    const aiResponse = new Message({ id: 1, message: data[0].text, });
                    currentMessages.push(aiResponse);
                    updateMiscState({ ...miscState, isTyping: false, newMessage: '', messages: currentMessages });
                }
            })
            .catch(error => console.log('error', error));
    }

    const onType = (e: React.ChangeEvent<HTMLInputElement>) => updateMiscState({ ...miscState, newMessage: e.target.value });

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter')
            sendMessage({ text: miscState?.newMessage });
    }

    const updateScroll = () => {
        const element = document.getElementById("chat-panel")!;
        window.scrollTo(0, element?.scrollHeight);
    }

    const sendMessage = async ({ text = '' }) => {
        if (text.length <= 0) {
            updateMiscState({ ...miscState, newMessage: '', isTyping: false });
        }
        else {
            const currentMessages = miscState?.messages || [];
            currentMessages.push(new Message({ id: 0, message: text, }));
            updateMiscState({ ...miscState, messages: currentMessages, newMessage: '', isTyping: true, aiResponse: null });
            updateScroll();
            let context = '';
            if (currentMessages && currentMessages.length > 0) {
                context = Object.keys(currentMessages).map(message => `${ID_WISE_USER[currentMessages[message].id]}: ${currentMessages[message].message}`).join('\n') || '';
                await getAIAnswer({ statement: context, currentMessages });
                updateScroll();
            };
        };

    };

    return (
        <>
            <div className={styles.chat_feed}>
                <ChatFeed
                    messages={miscState?.messages || []} // Array: list of message objects
                    isTyping={miscState?.isTyping || false} // Boolean: is the recipient typing
                    hasInputField={false} // Boolean: use our input, or use your own
                    showSenderName // show the name of the user who sent the message
                    bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                    bubbleStyles={chatStyles.chatBubble} // JSON: Custom bubble styles
                />
            </div>
            <div className={styles.msg_send}>
                <div className="msg-txt">
                    <input
                        type={'text'}
                        onChange={onType}
                        value={miscState?.newMessage || ''}
                        onKeyDown={handleKeyDown}
                        placeholder={'Ask something'} />
                </div>
                <div className="msg-btn" style={{ marginLeft: 'auto', margin: 0, display: 'none' }}>
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

interface API_AUTH {
    OPEN_AI_ORG?: string;
    OPENAI_API_KEY?: string;
    model?: string;
}
