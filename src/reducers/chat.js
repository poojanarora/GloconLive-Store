import {chatActionTypes} from '../actionTypes/actionTypes';
import {initialState} from '../state/initialState';

const chat = (state = initialState.chat, action) => {
  switch (action.type) {
    case chatActionTypes.INIT_ZIM_INSTANCE:
      return {
        ...state,
        zim: action.payload,
      };
    case chatActionTypes.CLEAR_CHAT: {
      const {conversationID} = action.payload;
      const newChatMap = {...state.chatMap};
      if (newChatMap[conversationID]) {
        newChatMap[conversationID].length = 0;
      }
      return {
        ...state,
        chatMap: {...newChatMap},
      };
    }
    case chatActionTypes.SET_CHAT: {
      const {messages, id} = action.payload;
      const newChatMap = {...state.chatMap};
      if (!newChatMap[id]) {
        newChatMap[id] = [];
      }
      if (messages.length) {
        newChatMap[id].push(...messages);
      } else {
        newChatMap[id].length = 0;
      }
      return {
        ...state,
        chatMap: {...newChatMap},
      };
    }
    case chatActionTypes.SET_ZIM_LOGIN:
      return {
        ...state,
        isZimLoggedIn: action.payload,
      };
    case chatActionTypes.SET_ZIM_USER_MAP: {
      const {userList} = action.payload;
      const newUserMap = {...state.userMap};
      userList.forEach(item => {
        newUserMap[item.baseInfo.userID] = {
          ...item.baseInfo,
          memberAvatarUrl: item.userAvatarUrl,
        };
      });
      return {
        ...state,
        userMap: newUserMap,
      };
    }
    case chatActionTypes.SET_ZIM_USER: {
      const {user} = action.payload;
      return {
        ...state,
        user,
      };
    }
    default:
      return state;
  }
};
export default chat;
