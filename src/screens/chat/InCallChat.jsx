import React, {useEffect, useLayoutEffect} from 'react';
import {connect} from 'react-redux';
import {Chat} from '@flyerhq/react-native-chat-ui';
import {queryHistoryMessage, sendChatMessage} from '../../actions/chatActions';

const InCallChatComponent = ({
  route,
  getZimMessages,
  onSendChatMessage,
  chatMap,
  navigation,
}) => {
  const {params} = route;
  const {userID, profileId, userName} = params;
  // const [messages, setMessages] = useState([chatMap[id] || []]);
  const user = {id: profileId.toString()};
  const conId = userID.toString() + profileId.toString();
  const messages = chatMap[conId] || [];

  // const addMessage = message => {
  //   setMessages([message, ...messages]);
  // };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: userName,
    });
  }, []);

  useEffect(() => {
    getZimMessages(conId);
  }, []);

  // const uuidv4 = () => {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  //     const r = Math.floor(Math.random() * 16);
  //     const v = c === 'x' ? r : (r % 4) + 8;
  //     return v.toString(16);
  //   });
  // };

  const handleSendPress = message => {
    // const textMessage = {
    //   author: user,
    //   createdAt: Date.now(),
    //   id: uuidv4(),
    //   text: message.text,
    //   type: 'text',
    // };
    // addMessage(textMessage);
    onSendChatMessage(conId, message.text);
  };

  return <Chat messages={messages} onSendPress={handleSendPress} user={user} />;
};

const mapStateToProps = state => {
  return {
    chatMap: state.chat.chatMap,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getZimMessages: conId => dispatch(queryHistoryMessage(conId)),
    onSendChatMessage: (conId, message) =>
      dispatch(sendChatMessage(conId, message)),
  };
};

const InCallChat = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InCallChatComponent);

export default InCallChat;
