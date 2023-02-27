import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Store } from '../../Store';
import './CartPage.css';

export default function CartPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <div>
      <Helmet>
        <title>Cart-EcomBidding</title>
      </Helmet>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            {cartItems.length === 0 ? (
              <div className="p-4 border rounded-md bg-gray-100 text-gray-700">
                Cart is empty.{' '}
                <Link to="/" className="text-blue-500 font-bold">
                  Go Shopping
                </Link>
              </div>
            ) : (
              <div className="bg-white border-b border-gray-200 shadow sm:rounded-lg">
                <div className="overflow-x-auto max-w-screen-md">
                  <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-gray-50">
                      <tr className="hidden md:table-row">
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td className="whitespace-nowrap px-6 py-4 md:px-2 md:py-3">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={item.image}
                                  alt={item.title}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 whitespace-normal">
                                  {item.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 md:px-2 md:py-3">
                            <div className="flex items-center">
                              <button
                                className={`mr-2 rounded-lg bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200 ${
                                  item.quantity === 1
                                    ? 'pointer-events-none opacity-50'
                                    : ''
                                }`}
                                disabled={item.quantity === 1}
                              >
                                -
                              </button>
                              <span className="text-sm font-medium text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                className={`mr-2 rounded-lg bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200 ${
                                  item.quantity === 1
                                    ? 'pointer-events-none opacity-50'
                                    : ''
                                }`}
                                disabled={item.quantity === item.stock}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {item.price.toLocaleString('en-IN')}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {(item.quantity * item.price).toLocaleString(
                              'en-IN'
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                            <button className="text-red-500 hover:text-red-700">
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <div className="md:col-span-4">
            <div className="bg-white shadow-lg sm:rounded-lg md:-mt-3">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="mb-4 text-lg font-medium text-gray-900">
                  Order Summary
                </h2>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Items:</span>
                  <span className="text-gray-900 font-medium">
                    {cartItems.map((item) => item.quantity)}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-500">Total:</span>
                  <span className="text-gray-900 font-medium">
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toLocaleString('en-IN')}
                  </span>
                </div>
                <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
