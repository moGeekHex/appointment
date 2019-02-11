import React, { Component } from 'react';
import { View , Text , StyleSheet , Alert } from 'react-native';
import { FormInput , FormLabel , Button , ListItem , Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import { saveMeeting } from '../actions' ;
import I18n from '../../locales/i18n';

class OrganizeMeetingScreen extends Component {
    state = {
        title : '',
        description : '',
        location : '',
        btnDisabled : true
    };

    onGoBack(location)
    {
        this.setState({ location : location , btnDisabled : false });
    }

    componentWillMount()
    {
        I18n.locale = this.props.locale
    }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.saved)
        {
            Alert.alert('Your appointment has been created');
            this.setState({title: '' , description:'',location:null});
        }
    }

    onSave = () => {
        const { title , description , location } = this.state;
        const { profile } = this.props;
        const meeting = { title , description , location , profile };
        this.props.saveMeeting(meeting);
    }

    render()
    {
        return(
            <View style={styles.container}>
                <FormLabel>{I18n.t('setting.title')}</FormLabel>
                <FormInput 
                    value={this.state.title}
                    onChangeText={(title) => this.setState({title : title}) }
                    />

                <FormLabel>Description</FormLabel>
                <FormInput 
                    value = {this.state.description}
                    multiline
                    onChangeText={(description) => this.setState({description : description})}        
                />

                <FormLabel>Location</FormLabel>
                <ListItem
                    title ={this.state.location ? this.state.location.address : 'Set Location'}
                    rightIcon={<Icon name='ios-pin' type='ionicon' size={25} color={Colors.black}/>}
                    containerStyle={{ marginTop : 20 , marginHorizontal : 5 }}
                    onPress={()=>this.props.navigation.navigate('Location',{onGoBack:this.onGoBack.bind(this)})}
                />

                <View style={styles.btnContainer}>
                    <Button 
                        title='Organize Meeting'
                        raised
                        buttonStyle={styles.buttonStyle}
                        disabled = {this.state.btnDisabled || this.props.saving}
                        onPress={this.onSave}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
    },
    btnContainer : {
        alignItems : 'center',
        marginTop : 20,
        flex : 1
    },
    buttonStyle : {
        backgroundColor : Colors.redSahade1,
        width : 300,
        borderRadius : 5
    }
});

const mapStateToProps = ( { organize , auth , language } ) => {
    return {
        saving : organize.saving,
        saved : organize.saved,
        profile : auth.profile,
        locale : language.locale
    };
};

export default connect(mapStateToProps,{ saveMeeting })(OrganizeMeetingScreen);