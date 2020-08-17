import React, { useState, useEffect, useCallback } from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';

import axios from '../../axios-orders';



import Aux from '../../hoc/Auxiliary';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';



const BurguerBuilder = props=> {

   const [purchasing, setPurchasing] = useState(false);

   const dispatch = useDispatch();

   const ings =  useSelector(state => {
       return state.burguerBuilder.ingredients;
   });

   const price = useSelector(state => state.burguerBuilder.totalPrice);
   const error = useSelector(state=> state.burguerBuilder.error);
   const isAuthenticated = useSelector(state => state.auth.token !==null)

   const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved= (ingName) => dispatch(actions.removeIngredient(ingName));
  const onInitIngredients= useCallback(() => dispatch(actions.initIngredients()),[dispatch]);
  const onInitPurchase= () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath= (path) => dispatch(actions.setAuthRedirectPath(path));


   useEffect(() => {
        onInitIngredients(); 
   },[onInitIngredients]);

 

   const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

   
    const purchaseHandler = () => {
        if(isAuthenticated){
           setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

   const  purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
            onInitPurchase();
            props.history.push('/checkout');
    }

        const disabledInfo = {
            ...ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burguer =error ? <p>Ingredients cant't be loaded</p> : <Spinner />

        if (ings) {
            burguer = (
                <Aux>
                    <Burguer ingredients={ings} />
                    <BuildControls
                        ingredientAdded={onIngredientAdded}
                        ingredientRemoved={onIngredientRemoved}
                        disabled={disabledInfo}
                        price={price}
                        ordered={purchaseHandler}
                        isAuth={isAuthenticated}
                        purchasable={updatePurchaseState(ings)} />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={ings}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            price={price} />
        }

          
     
        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burguer}
            </Aux>
        );
    };



export default withErrorHandler(BurguerBuilder, axios);