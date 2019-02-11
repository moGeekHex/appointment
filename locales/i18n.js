import I18n from 'ex-react-native-i18n';

import arabic from './arabic.json';
import english from './english.json';

I18n.fallbacks = true
I18n.translations = {
    en: english,
    ar: arabic
};

I18n.locale = 'en';

export default I18n;