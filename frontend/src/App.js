import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import ProductDetail from './components/product/ProductDetail';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header/>
          <ToastContainer theme="dark"/>
          <div className='container container-fluid'>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/product/:id' element={<ProductDetail/>} exact />
            </Routes>
          </div>
          <Footer/>
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
