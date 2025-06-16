import React from 'react';
import { Link } from 'react-router-dom';

interface ProductTemplateProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  children,
  title,
  description,
  breadcrumbs = [],
}) => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="py-4">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  Inicio
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Link
                    to={crumb.href}
                    className={`ml-2 ${
                      index === breadcrumbs.length - 1
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {crumb.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Header */}
        <div className="py-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-xl text-gray-500">{description}</p>
          )}
        </div>

        {/* Content */}
        <div className="pb-16">{children}</div>
      </div>
    </div>
  );
};

export default ProductTemplate; 