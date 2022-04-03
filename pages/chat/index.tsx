import { useState } from "react";
import { ChatFeed, Message } from "react-chat-ui";

const Chat = () => {
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

    const onType = (e: React.ChangeEvent<HTMLInputElement>) => updateMiscState({ ...miscState, newMessage: e.target.value });
    const sendMessage = ({ text = '' }) => {
        if (text.length <= 0) {
            updateMiscState({ ...miscState, newMessage: '', isTyping: false });
        }
        else {
            const currentMessages = miscState?.messages || [];
            currentMessages.push(new Message({ id: 0, message: text, }));
            updateMiscState({ ...miscState, messages: currentMessages, newMessage: '' });
        }
    }
    console.warn("State", miscState);

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
