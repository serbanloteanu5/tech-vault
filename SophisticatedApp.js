// Code filename: SophisticatedApp.js
// This code demonstrates a sophisticated web application that allows users to post and view articles on a blog-like platform.

// User Class Definition
class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
    this.articles = [];
  }

  createArticle(title, content) {
    const article = new Article(title, content, this);
    this.articles.push(article);
  }

  viewArticles() {
    console.log(`Articles by ${this.username}:`);
    for (const article of this.articles) {
      console.log(`- ${article.title}`);
    }
  }
}

// Article Class Definition
class Article {
  constructor(title, content, author) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.likes = 0;
    this.comments = [];
  }

  like() {
    this.likes++;
  }

  addComment(comment) {
    this.comments.push(comment);
  }
}

// Create Users
const user1 = new User("JohnDoe", "john.doe@example.com");
const user2 = new User("JaneSmith", "jane.smith@example.com");

// Create Articles
user1.createArticle("JavaScript Basics", "In this article, we will cover the basics of JavaScript.");
user1.createArticle("Advanced JS Techniques", "Learn advanced JavaScript techniques with this comprehensive guide.");
user2.createArticle("Web Development Trends", "Stay updated on the latest web development trends in this article.");

// Like Articles
user1.articles[0].like();
user1.articles[1].like();
user2.articles[0].like();

// Add Comments
user2.articles[0].addComment("Great article!");

// View Articles
user1.viewArticles();
user2.viewArticles();
```

This code represents a more sophisticated web application with two classes: `User` and `Article`. Users can create articles, like articles, and add comments. The code includes methods for creating articles, liking articles, adding comments, and viewing articles. The application also demonstrates the usage of objects, arrays, and class inheritance.