import axios from 'axios'

//SET AN INTIAL STATE//
const initialState = {
    email: null,
    firstName: null,
    lastName: null
}

//CREATE AN ACTION TYPE NAMES REQUEST USER DATA//
const REQUEST_USER_DATA = 'REQUEST_USER_DATA';

//CREATE AN ACTION CREATOR with type and payload properties as usual // THAT MAKES AN AXIOS GET REQUEST FOR USER DATA AND STORES THAT DATA TO A NEW VARIABLE NAMED DATA.
export const requestUserData = () => {
    let data = axios.get('/auth/user-data')
        .then(res => res.data)
    return {
        type: REQUEST_USER_DATA,
        payload: data
    }
}

//CREATE AND EXPORT A REDUCER FUNCTION THAT TAKES IN STATE AND ACTION AS PARAMETERS. AND RETURN STATE//
export default function reducer(state = initialState, action) {
    switch (action.type) { //update reducer function to have a switch statement that returns an object based on the value of the action.type passed in.
        case REQUEST_USER_DATA + '_FULFILLED':
            const { email, firstName, lastName} = action.payload.user
            return { email, firstName, lastName};
        default:
            return state;
        }
  }

  //when FULFILLED return a new object with email firstname and lastname properites from the user object in the action payload. action.payload.user. You can destucute email and names off of the payload before being returned