import Homepage from './container/Homepage';
import LearnSets from './container/LearnPage/LearnSets';
import LearnSetCards from './container/LearnPage/Cards';
import Test from './container/TestPage/Test';
import TestCards from './container/TestPage/Cards'
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
        <Route path='/learnSets/:name' element={<LearnSetCards />} />
        <Route path='/test' element={<Test />} />
        <Route path='/test/:name' element={<TestCards />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
