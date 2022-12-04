import logo from './logo.svg';
import './App.css';
import Homepage from './container/Homepage';
import Cards from './container/Cards';
import Test from './container/Test';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/test' element={<Test />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
