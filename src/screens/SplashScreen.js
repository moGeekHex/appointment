import React , { Component } from 'react';
import { StyleSheet, View , AsyncStorage } from 'react-native';
import { Font , Permissions } from 'expo';
import Logo from '../components/Logo';

const FONT_PATH = '../../assets/fonts/Montserrat-Bold.otf';
const APP_LOGO  = '../../assets/location.png';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded:false
        };
        this.fontLoaded();
    }

    async fontLoaded()
    {
        try {
            await Font.loadAsync({ MontserratBold : require(FONT_PATH) });
            this.setState({fontLoaded:true});
        
            const { status } = await Permissions.askAsync(Permissions.LOCATION); 
            if(status !== 'granted' )
            {
                console.log('Permission denied');
            }
        
        } catch (e) {
           console.log(e);
        }   
    }
    
    startApp = async () => {

        const token = await AsyncStorage.getItem('fb_token');
            if(token){
                this.props.navigation.navigate('App')
            }else{
                this.props.navigation.navigate('Auth')
        }

    }

    render() {
        if(!this.state.fontLoaded)
        {
            return <View/>
        }

        return (
            <View style={styles.container}>
                <Logo startApp={ this.startApp }/>
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
    fonstTest : {
        fontFamily : 'MontserratBold'
    },
    logoStyle : {
        width : 100,
        height : 100,
        margin : 20
    }
  });
  
  export default SplashScreen;