import React , { Component } from 'react';
import  { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './src/routes';
import { store , persistedStore } from './src/store';
import I18n from './locales/i18n';

class App extends Component {
  constructor(props)
  {
    super(props);  
    console.disableYellowBox = true;
  }

  componentWillMount()
  {
    const langState = store.getState().language;
    I18n.locale = langState.locale;  
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <Routes screenProps={{ I18n }}/>
        </PersistGate> 
      </Provider>
    );
  }
}

export default App;