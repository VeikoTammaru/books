import { Route, Routes } from 'react-router-dom';
import './App.css';
import TopNavBar from './Components/TopNavBar';
import EditLahetus from './Pages/EditLahetus';
import EditLahetusLine from './Pages/EditLahetusLine';
import HomePage from './Pages/HomePage';
import Lahetused from './Pages/Lahetused';
function App() {
  return (
  <>
    <TopNavBar />
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/Lahetused' element={<Lahetused/>} />
      <Route path='/Lahetused/:LahetusSerNr' element={<EditLahetus/>} />
      <Route path='/Lahetused/:LahetusSerNr/:lineNr' element={<EditLahetusLine/>} />
    </Routes>
  </>
  );
}

export default App;
