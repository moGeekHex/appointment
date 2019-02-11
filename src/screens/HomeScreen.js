import React , { Component } from 'react';
import { StyleSheet , View , ScrollView , Dimensions , Alert } from 'react-native';
import { MapView , Notifications } from 'expo';
import { connect } from 'react-redux';
import { ListItem  } from 'react-native-elements';
import { Spinner } from '../components';
import { fetchMeetings } from '../actions';
import Colors from '../constants/Colors';
import { registerForPushNotificationsAsync } from '../services';

const { width , height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LAT_DELTA = .02;
const LONG_DELTA = LAT_DELTA * ASPECT_RATIO;

class HomeScreen extends Component {

	componentDidMount()
	{
		this.props.fetchMeetings();

		const { profile } = this.props;
		registerForPushNotificationsAsync(profile.uid);

		Notifications.addListener(this.handleNotification);
	}

	handleNotification = (notification) => {
		if(notification && notification.origin !== 'received')
		{
			const data = notification.data;
			const meetingId = data.meetingId;

			if(meetingId)
			{
				this.props.navigation.navigate('Details',{ meetingId });
			}
		}
	};
	

	showMeetingMarker = (meeting) => {
		this.map.animateToRegion(
			{
				latitude : meeting.location.latitude,
				longitude : meeting.location.longitude,
				longitudeDelta : LONG_DELTA,
                latitudeDelta : LAT_DELTA
			}, 350
		);
	}

    render() {
		if(this.props.fetching) return <Spinner/>;

		firstMeeting = this.props.result[0];
		const initialRegion = {
			latitude : firstMeeting.location.latitude,
			longitude: firstMeeting.location.longitude,
			latitudeDelta : 0.048,
			longitudeDelta : 0.048
		};

		return (
          <View style={styles.container}>

            	<MapView 
			  		ref={(map) => {this.map = map;}}
				  	style={styles.container}
					initialRegion={initialRegion}
				>
					{this.props.result.map((meeting , index) => {
						return (
							<MapView.Marker
								key={index}
								coordinate={meeting.location}
								onPress={() => this.props.navigation.navigate('Detail',{ meetingId : meeting.id })}
							/>
						)
					})}
			  	</MapView>
				<View style={styles.cardWarp}>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{this.props.result.map((meeting , index ) => {
							return(
								<View key={index} style={styles.card}>
									<ListItem
										roundAvatar
										avatar={{uri : meeting.profile.photoURL}}
										title={meeting.title}
										subtitle={meeting.location.address}
										onPress={ () => this.showMeetingMarker(meeting)}
									/>
								</View>
							);
						})}
					</ScrollView>
				</View>
          </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
		flex : 1
	},
	cardWarp : {
		position : 'absolute',
		top : 20,
		zIndex : 50
	},
	card : {
		marginHorizontal : 5,
		backgroundColor :  Colors.white,
		height : 50,
		width : 200
	}
  });
  
const mapStateToProps = ({meetings , auth}) =>
{
    return {
      fetching : meetings.fetching,
	  result : meetings.result,
	  profile : auth.profile
    }
};

export default connect(mapStateToProps , { fetchMeetings })(HomeScreen);