import React, { Component } from 'react';
import { View , Text , StyleSheet , ScrollView } from 'react-native';
import { ListItem , Icon , Avatar } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { fetchSingleMeeting } from '../actions';
import Colors from '../constants/Colors';
import { Spinner } from '../components';

class MeetingDetails extends Component
{
    static navigationOptions = {
        headerTitle : 'Meeting Details'
    }

    componentWillMount()
    {
        const meetingId = this.props.navigation.getParam('meetingId');
        this.props.fetchSingleMeeting(meetingId);
    }

    render()
    {
        if(this.props.loading || !this.props.meeting)
        {
            return <Spinner/>
        }

        const selectedMeeting = this.props.meeting;
        const { profile , location } = selectedMeeting;
        const initialRegion = {
            latitude : location.latitude,
            longitude : location.longitude,
            latitudeDelta : 0.048,
            longitudeDelta : 0.048
        };


        return(
            <ScrollView style={styles.container}>
                
                <View style={styles.useWrap}>
                    <ListItem
                        roundAvatar
                        avatar={{ uri : profile.photoURL }}
                        title={profile.displayName}
                    />
                </View>

                <View>
                    <ListItem
                        title={location.address}
                        rightIcon={<Icon name='ios-pin' type='ionicon' size={25} color={Colors.grey}/>}
                        containerStyle={ styles.useWrap }
                    />
                </View>

                <View style={{ flex : 1 , height : 300 , marginHorizontal : 20 , marginTop : 30 }}>
                    <MapView
                        style={{ flex : 1 }}
                        initialRegion={initialRegion}
                        cacheEnabled
                        scrollEnabled = { false }
                    >
                        <MapView.Marker
                            coordinate = {initialRegion}
                        />
                    </MapView>
                </View>

            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    useWrap : {
        backgroundColor : Colors.white,
        marginHorizontal : 20,
        marginTop : 10
    }
});

const mapStateToProps = ({ meetings }) => {
    return {
        loading : meetings.loading,
        meeting : meetings.meeting
    };
};

export default connect( mapStateToProps , { fetchSingleMeeting } )(MeetingDetails);