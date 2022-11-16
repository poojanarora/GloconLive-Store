import React, { useEffect }  from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './incomingCallListingStyles';
import {images} from '../../constant';
import { getIncomingCallQueue } from '../../actions/callActions';

const IncomingCalls = ({navigation, fetchIncomingCallQueue, callQueue}) => {

  useEffect(()=>{
    fetchIncomingCallQueue()
  }, [])

  const renderItem = ({item}) => {
    return <Item item={item} />;
  };

  const onJoinCall = item => {
    const {callId, departmentCallerId, shopperName} = item;
    navigation.navigate('CallPage', {
      callId,
      shopperName,
      departmentCallerId,
    });
  };

  const Item = ({item}) => {
    return (
      <View style={styles.listItemWrapper}>
        <View style={styles.listItemLeftSectionWrapper}>
          <Text style={styles.listItemTitle}>{item.shopperName}</Text>
          <Text style={styles.listItemSubTitle}>
            Call Started at {item.callStartTime}
          </Text>
        </View>
        <View style={styles.listItemRightectionWrapper}>
          <TouchableOpacity
            style={styles.listItemActionButton}
            onPress={() => onJoinCall(item)}>
            <Image
              style={styles.listItemActionButtonImage}
              source={images.forward_arrow}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderIncomingCallListing = () => {
    return (
      <FlatList
        data={callQueue}
        //onRefresh={() => fetchRecipients()}
        renderItem={renderItem}
        keyExtractor={item => item.callId}
        showsVerticalScrollIndicator={false}
        //refreshing={isRecipientListingLoading}
        // ItemSeparatorComponent={(props) => {
        //     return (
        //         <View style={{ marginHorizontal: wp('1%'), height: hp('0.10%'), backgroundColor: COLORS.imageBorderSecondary}} />
        //     );
        // }}
        //ListEmptyComponent={<FlatlistNoRecordFound />}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <View style={styles.listSectionWrapper}>
        {renderIncomingCallListing()}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    callQueue: state.call.callQueue,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchIncomingCallQueue: () => dispatch(getIncomingCallQueue())
  };
};

const IncomingCallListing = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncomingCalls);

export default IncomingCallListing;
