import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import EmployeeA from './components/EmployeeA'
import ReactDOM from 'react-dom'
function App() {
  return (
    <div className="App">
      {/* <Form></Form> */}
      
      <Form/>
    </div>
  );
}
// ReactDOM.render(<EmployeeA/>,document.getElementById('root'));
export default App;
