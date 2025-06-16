import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: number;
  name: string;
  description?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  description = '',
}) => {
  return (
    <Link
      to={`/categories/${id}`}
      className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
    >
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 group-hover:opacity-70 transition-opacity"></div>
      <div className="absolute inset-0 flex items-end p-6">
        <div className="text-white">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
            {name}
          </h3>
          <p className="text-gray-200">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard; 