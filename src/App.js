import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder'
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

import Layout from './hoc/Layout/Layout'


function App() {
  
  return (
    <div className="App">
       <Layout>
         <Switch>
         <Route path="/checkout" component={Checkout}/>
         <Route path="/orders" component={Orders}/>
         <Route path="/" exact component={BurguerBuilder}/>
         </Switch>
       </Layout>
    </div>
  );
}

export default App;
