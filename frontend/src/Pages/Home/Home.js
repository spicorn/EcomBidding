import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import './Home.css';
import Product from '../../Components/Product/Product';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Home() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []); // [] cause we use useEffect only once

  return (
    <div className="home__component">
      <div className="text-center pb-4 pt-8">
        <h2 className="text-gray-600 inline-block border-b-2 w-4/12 border-solid border-lightgray text-4xl px-2 mx-auto">
          Listed Products
        </h2>
      </div>

      <div className="products flex flex-wrap justify-center">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <div key={product.id}>
              <Product product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
