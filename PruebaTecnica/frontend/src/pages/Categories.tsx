import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchCategories } from '../store/slices/categoriesSlice';
import CategoryCard from '../components/CategoryCard';

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const { items: categories, status } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Categorías</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explora nuestras categorías y encuentra los productos que buscas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories; 