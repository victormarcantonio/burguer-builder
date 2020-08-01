import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurguerSuccess = (id, orderData) => {
   return {
      type: actionTypes.PURCHASE_BURGUER_SUCCESS,
      orderId: id,
      orderData: orderData
   };
};

export const purchaseBurguerFail = (error) => {
   return {
       type: actionTypes.PURCHASE_BURGUER_FAIL,
       error: error
   };
}

export const purchaseBurguerStart = () => {
    return {
       type: actionTypes.PURCHASE_BURGUER_START
    };
};

export const purchaseBurguer = (orderData) => {
   return dispatch => {
    dispatch(purchaseBurguerStart());
    axios.post('/orders.json', orderData)
    .then(response => {
       dispatch(purchaseBurguerSuccess(response.data.name, orderData));
    })
    .catch(error => {
        dispatch(purchaseBurguerFail(error));
    });
   };
};

export const purchaseInit = () => {
   return {
      type: actionTypes.PURCHASE_INIT
   }
};

export const fetchOrderSuccess = (orders) => {
   return {
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      orders: orders
   };
};

export const fetchOrdersFail = (error) => {
   return {
      type: actionTypes.FETCH_ORDERS_FAIL,
      error: error
   };
};

export const fetchOrdersStart = () => {
   return {
       type: actionTypes.FETCH_ORDERS_START
   };
};

export const fetchOrders = () => {
   return dispatch => {
      dispatch(fetchOrdersStart());
      axios.get('/orders.json')
      .then(res => {
          const fetchedOrders = [];
          for(let key in res.data) {
             fetchedOrders.push({...res.data[key],
             id: key
            });
          }
          dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch(error => {
          dispatch(fetchOrdersFail(error));
      });
   }
};