import React, { useEffect, useState } from "react";
import { ChatFeed, Message } from "react-chat-ui";
import NavigationService from "../../operations/common/navigation";

const ID_WISE_USER = ['Human', 'AI'];

const Chat = ({ OPEN_AI_ORG, OPENAI_API_KEY }: API_AUTH) => {
    const [miscState, updateMiscState] = useState({}) as any;
    useEffect(() => {
        if (!(OPEN_AI_ORG && OPENAI_API_KEY)) {
            alert(`Couldn't get valid API keys. Please enter credentials again!`)
            NavigationService.navigateToRoot();
        }
    })

    const styles = {
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

    const getAIAnswer = async ({ statement = '' }: any) => {
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
        await fetch(finalURL, requestData)
            .then(response => response.json())
            .then((result: any) => {
                const data = result?.data?.choices || null;
                if (data && data.length > 0) {
                    const aiResponse = new Message({ id: 1, message: data[0].text, });
                    const { messages } = miscState;
                    messages.push(aiResponse);
                    updateMiscState({ ...miscState, isTyping: false, newMessage: '', messages });
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
            const { messages } = miscState;
            let context = '';
            if (messages && messages.length > 0) {
                context = Object.keys(messages).map(message => `${ID_WISE_USER[messages[message].id]}: ${messages[message].message}`).join('\n') || '';
                await getAIAnswer({ statement: context });
                updateScroll();
            }
        }
    }

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
            <div className='msg-send'>
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
}
