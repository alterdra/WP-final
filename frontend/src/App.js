import Homepage from './container/Homepage';
import LearnSets from './container/LearnPage/LearnSets';
import LearnSetCards from './container/LearnPage/Cards';
import Test from './container/TestPage/Test';
import Choices from './container/TestPage/Choices';
import Cloze from './container/TestPage/Cloze';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import { styled } from '@mui/material/styles';
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/learnSets' element={<LearnSets />} />
        <Route path='/learnSets/:name' element={<LearnSetCards />} />
        <Route path='/test' element={<Test />} />
        <Route path='/test/choice/:name' element={<Choices />} />
        <Route path='/test/cloze/:name' element={<Cloze />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
