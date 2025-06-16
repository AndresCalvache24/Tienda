import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user]);

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (user && quantity > 0) {
      dispatch(updateCartItem({ userId: user.id, productId, quantity }));
    }
  };

  const handleRemoveItem = (productId: number) => {
    if (user) {
      dispatch(removeFromCart({ userId: user.id, productId }));
    }
  };

  const handleClearCart = () => {
    if (user) {
      dispatch(clearCart(user.id));
    }
  };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + (item.product?.price || 0) * item.quantity,
      0
    );
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Inicia sesión para ver tu carrito</h2>
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <Link
          to="/products"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Carrito de Compras</h1>
        <button
          onClick={handleClearCart}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Vaciar Carrito
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-4 border-b last:border-b-0"
          >
            {item.product?.imageUrl && (
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <div className="ml-4 flex-grow">
              <h3 className="text-lg font-semibold">{item.product?.name}</h3>
              <p className="text-gray-600">${item.product?.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveItem(item.productId)}
                className="text-red-600 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold text-blue-600">
            ${calculateTotal().toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => {
            // Implementar la lógica de checkout
          }}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Proceder al Pago
        </button>
      </div>
    </div>
  );
};

export default Cart; 