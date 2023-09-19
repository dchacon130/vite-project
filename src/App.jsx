import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FizzBuzz from './components/FizzBuzz';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact Component={FizzBuzz}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
