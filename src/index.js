import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css";
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

Date.prototype.ddmmyyyy = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
          (dd>9 ? '' : '0') + dd,
          ".", 
          (mm>9 ? '' : '0') + mm,
          ".",
          this.getFullYear()
         ].join('');
};





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  
);