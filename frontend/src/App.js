import './App.css';
import Homepage from './container/Homepage';
import CardPage from './container/CardPage';
import Test from './container/Test';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LearnSet from './container/LearnSet';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/cards' element={<CardPage />} />
        <Route path='/learnSet/:name' element={<LearnSet />} />
        <Route path='/test' element={<Test />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
