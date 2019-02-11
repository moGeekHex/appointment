import firebase from 'firebase';
import { 
    ORGANIZE_ATTEMPTING,
    ORGANIZE_SUCCESS,
    ORGANIZE_FAILD
} from './types';

export const saveMeeting = (meeting) => {
    return async (dispatch) => {
        dispatch({ type : ORGANIZE_ATTEMPTING })
        try {
            await firebase.database().ref('meeting').push(meeting);
            dispatch({ type : ORGANIZE_SUCCESS });
        } catch (e)
        {
            dispatch({ type : ORGANIZE_FAILD });
        }
    };
};