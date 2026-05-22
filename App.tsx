/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef, useState } from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreen from './src/navigation/AppStackScreen';
import store from './src/state/store';
import { Provider } from 'react-redux';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  AppState,
  Vibration,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIncomingCallQueue,
  removeIncomingCall,
  updateCallStatus,
} from './src/actions/callActions';
import ShopVideoUploadBanner from './src/components/ShopVideoUploadBanner';
import { COLORS } from './src/constant';
import { navigationRef } from './src/navigation/navigationRef';
import { CALL_STATUS, LOGIN_MODES } from './src/utils/appConstants';
// import {withIAPContext} from 'react-native-iap';

type IncomingCallData = {
  callId: string;
  departmentCallerId: string;
  shopperName?: string;
  callStartTime?: string;
};

const mapQueueCallToIncomingCall = (call: any): IncomingCallData | null => {
  if (!call?.callId || !call?.departmentCallerId) {
    return null;
  }

  return {
    callId: call.callId,
    departmentCallerId: call.departmentCallerId,
    shopperName: call.shopperName,
    callStartTime: call.callStartTime,
  };
};

const GlobalIncomingCallPopup = () => {
  const dispatch = useDispatch<any>();
  const auth = useSelector((state: any) => state.app.auth);
  const callQueue = useSelector((state: any) => state.call.callQueue || []);
  const [incomingCallData, setIncomingCallData] =
    useState<IncomingCallData | null>(null);
  const lastHandledCallIdRef = useRef<string | null>(null);
  const suppressedCallIdsRef = useRef<Record<string, boolean>>({});

  // useEffect(() => {
  //   const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
  //     if (!auth?.isLoggedIn || remoteMessage?.data?.type !== 'ringing') {
  //       return;
  //     }
  //     await dispatch(
  //       getIncomingCallQueue({ showLoader: false, showErrorPopup: false }),
  //     );
  //     const latestQueue = (store.getState() as any)?.call?.callQueue || [];
  //     const resolvedPayload = resolveIncomingCallData(
  //       remoteMessage?.data,
  //       latestQueue,
  //     );

  //     if (resolvedPayload?.callId && resolvedPayload?.departmentCallerId) {
  //       if (suppressedCallIdsRef.current[resolvedPayload.callId]) {
  //         return;
  //       }
  //       lastHandledCallIdRef.current = resolvedPayload.callId;
  //       setIncomingCallData(resolvedPayload);
  //     }
  //   });

  //   return () => {
  //     unsubscribeOnMessage();
  //   };
  // }, [auth?.isLoggedIn, dispatch]);

  /**
   * Fallback polling only while app is foreground (active). Prefer FCM `onMessage`
   * + silent push to trigger refresh — this interval is a safety net, not the primary signal.
   * Tune POLL_INTERVAL_MS vs server load (e.g. 15–30s).
   */
  const POLL_INTERVAL_MS = 15000;

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const fetchQueue = () => {
      dispatch(
        getIncomingCallQueue({ showLoader: false, showErrorPopup: false }),
      );
    };

    const startPolling = () => {
      if (intervalId != null) {
        return;
      }
      fetchQueue();
      intervalId = setInterval(fetchQueue, POLL_INTERVAL_MS);
    };

    const stopPolling = () => {
      if (intervalId != null) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const onAppStateChange = (nextState: string) => {
      if (nextState === 'active') {
        startPolling();
      } else {
        stopPolling();
      }
    };

    const subscription = AppState.addEventListener('change', onAppStateChange);

    if (AppState.currentState === 'active') {
      startPolling();
    }

    return () => {
      stopPolling();
      subscription.remove();
    };
  }, [auth?.isLoggedIn, dispatch]);

  useEffect(() => {
    if (!auth?.isLoggedIn || incomingCallData || !callQueue?.length) {
      return;
    }

    const nextCall = mapQueueCallToIncomingCall(callQueue[0]);
    if (!nextCall?.callId) {
      return;
    }

    if (suppressedCallIdsRef.current[nextCall.callId]) {
      return;
    }

    if (lastHandledCallIdRef.current === nextCall.callId) {
      return;
    }

    lastHandledCallIdRef.current = nextCall.callId;
    setIncomingCallData(nextCall);
  }, [auth?.isLoggedIn, callQueue, incomingCallData]);

  useEffect(() => {
    if (!incomingCallData) {
      Vibration.cancel();
      return;
    }

    Vibration.vibrate([500, 1000, 500, 1000], true);

    return () => {
      Vibration.cancel();
    };
  }, [incomingCallData]);

  const clearIncomingCallPopup = () => {
    Vibration.cancel();
    setIncomingCallData(null);
  };

  const dismissIncomingCallPopup = async () => {
    if (!incomingCallData?.callId) {
      clearIncomingCallPopup();
      return;
    }

    const dismissedCallId = incomingCallData.callId;
    suppressedCallIdsRef.current[dismissedCallId] = true;
    dispatch(removeIncomingCall(dismissedCallId));
    clearIncomingCallPopup();

    try {
      await dispatch(
        updateCallStatus(dismissedCallId, CALL_STATUS.COMPLETED, undefined, {
          showLoader: false,
          showErrorPopup: true,
        }),
      );
      await dispatch(
        getIncomingCallQueue({ showLoader: false, showErrorPopup: false }),
      );
    } catch {
      delete suppressedCallIdsRef.current[dismissedCallId];
    }
  };

  const onJoinIncomingCall = () => {
    if (!incomingCallData || !navigationRef.isReady()) {
      return;
    }

    const callParams = {
      callId: incomingCallData.callId,
      shopperName: incomingCallData.shopperName,
      departmentCallerId: incomingCallData.departmentCallerId,
    };

    suppressedCallIdsRef.current[incomingCallData.callId] = true;
    dispatch(removeIncomingCall(incomingCallData.callId));
    clearIncomingCallPopup();

    if (auth?.loginMode === LOGIN_MODES.CONCEIRGE) {
      (navigationRef as any).navigate('ConceirgeShopperPrivateStackScreen', {
        screen: 'IncomingCall',
        params: {
          screen: 'CallPage',
          params: callParams,
        },
      });
      return;
    }

    if (auth?.loginMode === LOGIN_MODES.DEVICE) {
      (navigationRef as any).navigate('IncomingCallStackScreen', {
        screen: 'CallPage',
        params: callParams,
      });
      return;
    }

    (navigationRef as any).navigate('PrivateStackScreen', {
      screen: 'IncomingCall',
      params: {
        screen: 'CallPage',
        params: callParams,
      },
    });
  };

  return (
    <Modal
      visible={!!incomingCallData}
      transparent
      animationType="fade"
      onRequestClose={dismissIncomingCallPopup}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* <Image style={styles.avatar} source={images.user1} /> */}
          <Text style={styles.title}>Incoming Call</Text>
          <Text style={styles.nameText}>
            {incomingCallData?.shopperName || 'Shopper'}
          </Text>
          {incomingCallData?.callStartTime ? (
            <Text style={styles.timeText}>
              Call Started at {incomingCallData.callStartTime}
            </Text>
          ) : null}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.dismissButton]}
              onPress={dismissIncomingCallPopup}
            >
              <Text style={styles.dismissButtonText}>Dismiss</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.joinButton]}
              onPress={onJoinIncomingCall}
            >
              <Text style={styles.joinButtonText}>Join Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <SafeAreaProvider>
          <AppStackScreen />
          <GlobalIncomingCallPopup />
          <ShopVideoUploadBanner />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primaryTextColor,
    marginBottom: 6,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primaryTextColor,
    textAlign: 'center',
  },
  timeText: {
    fontSize: 13,
    color: COLORS.primaryTextColor,
    opacity: 0.7,
    marginTop: 8,
    textAlign: 'center',
  },
  actionRow: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismissButton: {
    backgroundColor: '#F5F5F5',
  },
  joinButton: {
    backgroundColor: COLORS.primaryTextColor,
  },
  dismissButtonText: {
    color: COLORS.primaryTextColor,
    fontWeight: '600',
  },
  joinButtonText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});

export default App;
