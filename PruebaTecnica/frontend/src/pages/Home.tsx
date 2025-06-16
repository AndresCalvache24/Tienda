import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchProducts } from '../store/slices/productsSlice';
import { fetchCategories } from '../store/slices/categoriesSlice';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { items: products, status: productsStatus, error: productsError } = useSelector(
    (state: RootState) => state.products
  );
  const { items: categories, status: categoriesStatus, error: categoriesError } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (productsStatus === 'loading' || categoriesStatus === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (productsStatus === 'failed' || categoriesStatus === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="text-red-600 text-xl mb-4">
          {productsError || categoriesError || 'Error al cargar los datos'}
        </div>
        <button
          onClick={() => {
            dispatch(fetchProducts());
            dispatch(fetchCategories());
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Bienvenido a Nuestra Tienda</h1>
            <p className="text-xl md:text-2xl mb-8">Descubre los mejores productos al mejor precio</p>
            <Link
              to="/products"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              Ver Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Categorías Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
              <div className="absolute inset-0 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-200">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Sin imagen</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Suscríbete a Nuestro Boletín</h2>
          <p className="text-gray-600 mb-8">Recibe las últimas novedades y ofertas especiales</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home; 