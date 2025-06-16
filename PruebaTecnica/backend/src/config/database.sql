-- Crear la base de datos
CREATE DATABASE ecommerce_db;
GO

USE ecommerce_db;
GO

-- Crear tabla de Categorías
CREATE TABLE Categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(500)
);
GO

-- Crear tabla de Productos
CREATE TABLE Products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(500),
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    categoryId INT NOT NULL,
    imageUrl NVARCHAR(500),
    FOREIGN KEY (categoryId) REFERENCES Categories(id)
);
GO

-- Crear tabla de Usuarios
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(100) NOT NULL,
    role NVARCHAR(20) DEFAULT 'user'
);
GO

-- Crear tabla de Carrito
CREATE TABLE CartItems (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (productId) REFERENCES Products(id)
);
GO

-- Crear índices
CREATE INDEX IX_Products_CategoryId ON Products(categoryId);
CREATE INDEX IX_CartItems_UserId ON CartItems(userId);
CREATE INDEX IX_CartItems_ProductId ON CartItems(productId);
GO 