import { MEETING_FETCHED , SINGLE_DONE , SINGLE_FETCHING } from '../actions/types';

const INITIAL_STATE = { fetching : false , result : [] , loading : false , meeting : null };

export default (state = INITIAL_STATE , action ) => {
    switch(action.type)
    {
        case MEETING_FETCHED:
            return { fetching : false , result : action.payload };
        case SINGLE_FETCHING : 
            return { ...state , loading : true };
        case SINGLE_DONE : 
            return { ...state , loading : false , meeting : action.payload }
        default : return state;
    }
};