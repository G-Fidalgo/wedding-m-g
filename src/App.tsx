import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeddingLandingPageComponent } from './pages/Home';
import { GiftsPage } from './pages/Gifts';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeddingLandingPageComponent />} />
        <Route path="/gifts" element={<GiftsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
