/*
Filename: ComplexJSCode.js

This code is a complex and elaborate JavaScript program that simulates a virtual store inventory system. It includes features like adding products, updating quantities, searching for products, and generating reports. The program is designed to handle a large inventory database and provides a user-friendly interface for interaction.

Note: This is a simulated code and may not function with real data. It is provided for demonstration purposes only.

Author: Your Name
Date: Current Date
*/

// Constants
const MIN_QUANTITY = 0;

// Data Structures
let products = [];

// Product Class
class Product {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

// Function to add a product to inventory
function addProduct(id, name, price, quantity) {
  // Check if the product already exists
  if (products.findIndex(p => p.id === id) !== -1) {
    console.log("Product already exists!");
    return;
  }

  // Check for valid quantity
  if (quantity < MIN_QUANTITY) {
    console.log("Invalid quantity!");
    return;
  }

  // Create a new product instance
  const product = new Product(id, name, price, quantity);

  // Add the product to the inventory
  products.push(product);

  // Inform the user
  console.log(`Product '${name}' with id '${id}' added successfully.`);
}

// Function to update quantity of a product
function updateQuantity(id, quantity) {
  // Find the index of the product
  const index = products.findIndex(p => p.id === id);

  // Check if the product exists
  if (index === -1) {
    console.log("Product not found!");
    return;
  }

  // Check for valid quantity
  if (quantity < MIN_QUANTITY) {
    console.log("Invalid quantity!");
    return;
  }

  // Update the quantity
  products[index].quantity = quantity;

  // Inform the user
  console.log(`Quantity of product '${products[index].name}' with id '${id}' updated successfully.`);
}

// Function to search for a product by id or name
function searchProduct(searchTerm) {
  // Search for a product by id or name
  const foundProducts = products.filter(p => p.id === searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Check if any product is found
  if (foundProducts.length === 0) {
    console.log("No products found!");
    return;
  }

  // Display the found products
  console.log(`Found ${foundProducts.length} product(s):`);
  foundProducts.forEach(p => console.log(`ID: ${p.id}, Name: ${p.name}, Price: ${p.price}, Quantity: ${p.quantity}`));
}

// Function to generate an inventory report
function generateReport() {
  // Calculate the total value of the inventory
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  // Display the report
  console.log(`Inventory Report - Total Products: ${products.length}, Total Value: ${totalValue}`);
}

// Example usage
addProduct("p1", "Product 1", 10.99, 50);
addProduct("p2", "Product 2", 5.99, 100);
addProduct("p3", "Product 3", 15.99, 25);

updateQuantity("p2", 150);

searchProduct("product");
searchProduct("p2");

generateReport();

// ... Rest of the code with additional functions and capabilities

// Code ends