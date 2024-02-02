import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';
import ProductsList from './pages/products/ProductsList';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
            <Route path='/activate/:uid/:token' element={<Activate />} />
            <Route path="/:slug/*" element={<ProductsList />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
