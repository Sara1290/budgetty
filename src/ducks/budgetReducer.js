import axios from 'axios'

const initialState = {
  purchases: [],
  budgetLimit: null,
  loading: false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA';
const ADD_PURCHASE = 'ADD_PURCHASE';
const REMOVE_PURCHASE = 'REMOVE_PURCHASE';

export const requestBudgetData = () => {
   let data = axios.get("/api/budget-data")
    .then(res => res.data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}
//ADD AN ACTION CREATOR FOR ADDING PURCHASE AND FOR REMOVE PURCHASE
export const addPurchase = (price, description, category) => {
    let data = axios.post('/api/budget-data/purchase', {
      description,
      price,
      category //WHY ARE THEY NOT IN THE SAME ORDER HERE IN THE REQ BODY AS THEY ARE IN THE PARAMETERS WHYYYYYYYYY//
    }).then(res => res.data);
    return {
      type: ADD_PURCHASE,
      payload: data
    }
  }
  
  export const removePurchase = (id) => {
    let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data);
    return {
      type: REMOVE_PURCHASE,
      payload: data
    }
  }

//UPDATE THE REDUCER FUNCTION TO HAVE A SWITCH STATEMENT THAT RETURNS AN OBJECT BASED ON THE VALUE OF ACTION.TYPE //PENDING = LOADING TRUE // FULFILLED LOADING FALSE & UPDATE THE REDUX STORE USING ACTION.PAYLOAD
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_BUDGET_DATA + "_PENDING":
            return { ...state, loading: true }
        case REQUEST_BUDGET_DATA + "_FULFILLED":
            return { ...state, ...action.payload, loading: false }
    // okay so the instructions said when pending loading=truen when fulfilled false THEY MEANT FOR ADDPURCHASE AND REMOVE PURCAHSE, A PENDING AND FULFILLED FOR EACH.        
        case ADD_PURCHASE + '_PENDING':
            return { ...state, loading: true }
        case ADD_PURCHASE + '_FULFILLED':
            return { ...state, purchases: action.payload, loading: false }
        case REMOVE_PURCHASE + '_PENDING':
            return { ...state, loading: true };
        case REMOVE_PURCHASE + '_FULFILLED':
            return { ...state, loading: false, purchases: action.payload }
        default:
            return state;
    }
}