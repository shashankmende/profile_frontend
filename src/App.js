
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Profile/>}/>                           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
