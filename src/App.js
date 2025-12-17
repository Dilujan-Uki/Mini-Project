import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Work/Home';
import TripsPage from './components/Work/TripPage';
import TripDetails from './components/Work/TripDetails';
import Header from './components/Work/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trip/:id" element={<TripDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;