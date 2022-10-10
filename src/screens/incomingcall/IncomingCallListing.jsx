import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import styles from './incomingCallListingStyles';
import { images } from '../../constant';

const IncomingCallListing = ({ navigation }) => {

    const incoming_calls = [
        {'id': 1, 'name': 'Sohel Patel', 'call_started_at': '10:00 am'},
        {'id': 2, 'name': 'Ahefaz Shaikh', 'call_started_at': '10:00 am' },
        {'id': 3, 'name': 'Rakesh Sarkar', 'call_started_at': '10:00 am'},
        {'id': 4, 'name': 'Haider Khan', 'call_started_at': '10:00 am'},
        {'id': 5, 'name': 'Sailesh Singh', 'call_started_at': '10:00 am'},
    ];

    const renderItem = ({ item }) => {
        return(
            <Item item={item} />
        );
    };

    const Item = ({ item }) => {
        return(
            <View style={styles.listItemWrapper}>
                <View style={styles.listItemLeftSectionWrapper}>
                    <Text style={styles.listItemTitle}>{item.name}</Text>
                    <Text style={styles.listItemSubTitle}>Call Started at {item.call_started_at}</Text>
                </View>
                <View style={styles.listItemRightectionWrapper}>
                    <TouchableOpacity style={styles.listItemActionButton}>
                        <Image style={styles.listItemActionButtonImage} source={images.forward_arrow} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderIncomingCallListing = () => {
        return(
            <FlatList
                data={incoming_calls}
                //onRefresh={() => fetchRecipients()}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                //refreshing={isRecipientListingLoading}
                // ItemSeparatorComponent={(props) => {
                //     return (
                //         <View style={{ marginHorizontal: wp('1%'), height: hp('0.10%'), backgroundColor: COLORS.imageBorderSecondary}} />
                //     );
                // }}
                //ListEmptyComponent={<FlatlistNoRecordFound />}
            />
        )
    };

    return(
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.listSectionWrapper}>
                {renderIncomingCallListing()}
            </View>
        </SafeAreaView>
    )
}



export default IncomingCallListing;