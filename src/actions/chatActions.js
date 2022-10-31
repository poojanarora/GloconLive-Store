import ZIM from 'zego-zim-react-native';
import {chatActionTypes} from '../actionTypes/actionTypes';
import {appConfig} from '../config/config';

ZIM.create(appConfig);
const zimInstance = ZIM.getInstance();

export const initializeZim = () => (dispatch) => {
  dispatch(initEvent(zimInstance));
};

const queryUsersInfo =
  (ids, isSelf = false) =>
  (dispatch) => {
    zimInstance.queryUsersInfo(ids, {isQueryFromServer: true}).then(({userList}) => {
      if (isSelf) {
        dispatch({
          type: chatActionTypes.SET_ZIM_USER,
          payload: {user: userList[0]},
        });
      } else {
        dispatch({
          type: chatActionTypes.SET_ZIM_USER_MAP,
          payload: {userList},
        });
      }
    });
  };

const errorHandle = error => {
  console.log('errorHandle', error);
  return Promise.reject();
};

export const zimLogin = loginForm => async dispatch => {
  return zimInstance.login(loginForm, '04AAAAAGNgMgcAEG51Zmh1cGZkcHgydTA5Z3gAoHxbp6cNlrQEemrLKeyh1zhGKzsjBx4FiZ6cVwveXe9vM0Ym6tLWMI6kLdTkJJs4X3RNMcTHMGYTIdzkfdzmKgw1i/9x6DTnj1Cmcigfyq327LPmboZ5YN+RZls6PikSf04CqNyT+z39u/0lNgGlT2fmIV7BXFchQenFEz+elFruwMnQbbBwUwpiDT90t/SD86KZrv6bFD9dyCgXkKYDP3w=')
    .then(res => {
      queryUsersInfo([loginForm.userID], true);
      dispatch({
        type: chatActionTypes.SET_ZIM_LOGIN,
        payload: true,
      });
      return res;
    })
    .catch(errorHandle);
};

export const logoutZimChat = () => {
  zimInstance.logout();
};

const initEvent = zim => (dispatch) => {
  zim.on('error', function (zim, errorInfo) {
    console.log('error', errorInfo.code, errorInfo.message);
  });

  // Set up and listen for the callback for connection status changes.
  zim.on(
    'connectionStateChanged',
    function (zim, {state, event, extendedData}) {
      console.log('connectionStateChanged', state, event, extendedData);
    },
  );

  // Set up and listen for the callback for receiving one-to-one messages.
  zim.on(
    'receivePeerMessage',
    function (zim, {messageList, fromConversationID}) {
      console.log('receivePeerMessage', messageList, fromConversationID);
    },
  );

  // Set up and listen for the callback for token expires.
  zim.on('tokenWillExpire', function (zim: ZIM, {second}) {
    console.log('tokenWillExpire', second);
    // You can call the renewToken method to renew the token.
    // To generate a new Token, refer to the Prerequisites.
    zim
      .renewToken(token)
      .then(function ({token}) {
        // Renewed successfully.
      })
      .catch(function (err) {
        // Renew failed.
      });
  });
};

const transformMessages = messages => {
  // localMessageID: string;
  // messageID: string;
  // senderUserID: string;
  // timestamp: number;
  // conversationID: string;
  // conversationType: ZIMConversationType;
  // direction: ZIMMessageDirection;
  // sentStatus: ZIMMessageSentStatus;
  // orderKey: number;
  // conversationSeq: number;
  // isUserInserted: boolean;
  const messageList = [];
  messages.forEach(msg => {
    const {senderUserID, messageID, message, timestamp} = msg;
    const textMessage = {
      author: {id: senderUserID},
      createdAt: timestamp,
      id: messageID,
      text: message,
      type: 'text',
    };
    messageList.push(textMessage);
  });
  return messageList;
};

const setMessage = (id, messages) => dispatch => {
  messages = messages.sort((a, b) => b.orderKey - a.orderKey);
  dispatch({
    type: chatActionTypes.SET_CHAT,
    payload: {id, messages: transformMessages(messages)},
  });
};

export const queryHistoryMessage = conID => async (dispatch) => {
  return zimInstance
    .queryHistoryMessage(conID, 0, {count: 1000, reverse: true})
    .then(res => {
      console.warn('queryHistoryMessage', res);
      dispatch({
        type: chatActionTypes.CLEAR_CHAT,
        payload: {conversationID: conID},
      });
      dispatch(setMessage(conID, res.messageList));
      return res;
    })
    .catch(errorHandle);
};

export const sendChatMessage = (conID, message) => async (dispatch) => {
  return zimInstance
    .sendMessage(
      {message, type: 1},
      conID,
      0,
      {priority: 2},
      {
        onMessageAttached: msg => {
          console.log('onAttached', JSON.stringify(msg));
        },
      },
    )
    .then(res => {
      dispatch(setMessage(conID, [res.message]));
      return res;
    })
    .catch(errorHandle);
};
