import React , { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { facebookLogin } from '../actions';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';

class AuthScreen extends Component {

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.token)
        {
            this.props.navigation.navigate('App');
        }
    }

    loginWithFacebook = () => 
    {
        this.props.facebookLogin();
    }

    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.logoText}>Appointment</Text>
            <Text style={styles.logoSubText}>Organize your meeting today..!</Text>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={this.loginWithFacebook.bind(this)}
                    raised
                    icon={{name:'facebook' , type : 'font-awesome'}}
                    title='Continue With Facebook'
                    buttonStyle={styles.buttonStyle}
                    loading={this.props.loading}
                />
            </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoText : {
        fontSize : 40,
        color : Colors.redSahade1,
        fontFamily : 'MontserratBold',
        marginBottom : 20
    },
    logoSubText : {
        color : Colors.grey,
        fontSize : 15
    },
    buttonContainer : {
        marginTop : 30
    },
    buttonStyle : {
        backgroundColor : Colors.facebook,
        borderRadius : 5
    }
    
});
  
const mapStateToProps = ({ auth }) => {
    return {
        loading : auth.loading ,
        token : auth.token

    };
};

export default connect(mapStateToProps ,{ facebookLogin })(AuthScreen);