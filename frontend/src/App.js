import './App.css';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
        <Header />
        <ToastContainer theme='dark'/>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes here */}
        </Routes>
        <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;