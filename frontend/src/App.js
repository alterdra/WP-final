import Homepage from './container/Homepage';
import LearnSets from './container/LearnPage/LearnSets';
import Cards from './container/LearnPage/Cards';
import Test from './container/TestPage/Test';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/learnSets' element={<LearnSets />} />
        <Route path='/cards/:name' element={<Cards />} />
        <Route path='/test' element={<Test />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
