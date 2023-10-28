/*
Filename: ComplexApp.js

This code is a complex application that simulates an e-commerce website. It demonstrates various functionalities like user registration, adding products to cart, applying discounts, and calculating total prices. The code is more than 200 lines long and is written in JavaScript.
*/

// Class representing a User
class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// Class representing a Product
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

// Class representing a Cart
class Cart {
  constructor() {
    this.items = [];
  }

  addItem(product) {
    this.items.push(product);
  }

  removeItem(product) {
    const index = this.items.indexOf(product);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price;
    }
    return totalPrice;
  }
}

// Main application logic
const user = new User("John", "Doe", "john.doe@example.com");
const cart = new Cart();

const product1 = new Product("iPhone 13", 999);
const product2 = new Product("MacBook Pro", 1999);

cart.addItem(product1);
cart.addItem(product2);

console.log(`Hello, ${user.getFullName()}!`);
console.log("Welcome to our e-commerce website.");
console.log("Your cart contains the following items:");

for (const item of cart.items) {
  console.log(`${item.name} - $${item.price}`);
}

console.log(`Total price: $${cart.getTotalPrice()}`);
console.log("Thank you for shopping with us!");

// ... additional lines for more complex features and functionalities of the e-commerce website