import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Pages/Header/Header';
import Footer from './Pages/Footer/Footer';
import ProductItems from './Pages/ProductItems/ProductItems';
import LoginPage from './Pages/SignIn/SignIn';
import CartPage from './Pages/CartPage/CartPage';
import OrderPage from './Pages/OrderPage/OrderPage';
import AddressPage from './Pages/AddressPage/AddressPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/products/:url"
          element={
            <>
              <Header />
              <ProductItems />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <CartPage />
            </>
          }
        />
        <Route path="/signin" element={<LoginPage />} />

        <Route
          path="/shipping"
          element={
            <>
              <Header />
              <AddressPage />
            </>
          }
        />
        <Route path="/shipping" element={<Header />} />

        <Route
          path="/orderhistory"
          element={
            <>
              <Header />
              <OrderPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
