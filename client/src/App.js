import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import About from './pages/About'
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/'></Route>
          <Route path='/about'><About /></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
