import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Employee_A from './components/Employee_A'
import Employee_B  from './components/Employee_B'
import PC from './components/ParentComponent'
import UseState from './components/UseStateFunction'
import UseE from './components/UseEffect' 
import FDC from './components/FetchData_class'
import FDF from './components/FetchData_function'
import RoutesDemo from './components/RouterDemo'
// ReactDOM.render(
//   <React.StrictMode>
//     <Employee_A/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// ReactDOM.render(
//   <React.StrictMode>
//     <Employee_B/>
//   </React.StrictMode>,
//   document.getElementById('rootB')
// );
// ReactDOM.render(
//   <React.StrictMode>
//     <App/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(
  <React.StrictMode>
    {/* <PC/> */}
{/* <UseState></UseState>  */}
{/* <UseE></UseE> */}
{/* <FDC></FDC> */}
{/* <FDF></FDF> */}
<App></App>
 </React.StrictMode>,
  document.getElementById('rootB')
);
//ReactDOM.unmountComponentAtNode(document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
