import { BrowserRouter, Route, Routes } from 'react-router-dom';

// styles
import './App.css';

// components
import Filters from './components/Filters';
import Navbar from './components/Navbar';
import Accomodation from './pages/accomodation/Accomodation';
import Home from './pages/home/Home';
import BookingConfirmation from './pages/booking-confirmation/BookingConfirmation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Filters />
        <Routes>
          <Route 
            path="/" 
            element={<Home />} 
          />
          <Route 
            path="/accomodations/:id" 
            element={<Accomodation />} 
          />
          <Route 
            path="/booking-confirmation" 
            element={<BookingConfirmation />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;