import React, { Component } from 'react';
import { View , Text , StyleSheet } from 'react-native';
import { ListItem , List , Icon } from 'react-native-elements';
import language from '../../locales/languages.json';
import Colors from "../constants/Colors";
import I18n from '../../locales/i18n';
import { connect } from 'react-redux';
import { changeLocale } from '../actions';

class LanguageScreen extends Component {

    static navigationOptions = ({ screenProps }) => {
        const {I18n} = screenProps;
        const title = I18n.t('home.screen_title');
        return {
            title
        };
    }

    showRighIcon = (lang) => {
        if(lang.locale === this.props.locale)
        {
            return <Icon type='ionicon' name='ios-checkmark-circle' size={25} color={Colors.redSahade1}/>
        }
        return <Icon type='ionicon' name='ios-globe' size={25} color={Colors.grey}/>
    }

    onSelectLang = (lang) => {
       this.props.changeLocale(lang.locale);
    }

    render(){
        return(
            <View style={styles.container}>
                <List>
                    {
                        language.map((lang) => {
                            return (
                                <ListItem
                                    key={lang.id}
                                    title={lang.name}
                                    rightIcon={this.showRighIcon(lang)}
                                    onPress={() => this.onSelectLang(lang)}
                                />
                            );
                        })
                    }
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    }
});

const mapStateToProps = ({ language }) => {
    return {
        locale : language.locale
    }
}

export default connect(mapStateToProps , { changeLocale })(LanguageScreen);