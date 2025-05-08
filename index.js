const db = require("./src/config/db");

const app = require("./app");

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to ShopVerse</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 2rem;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
          color: #333;
        }
        p {
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to ShopVerse</h1>
        <p>ShopVerse is your trusted e-commerce backend solution, powering modern online shopping experiences.</p>
        <p>Our API is secure, scalable, and built for performance. Use the documentation to explore available endpoints and start building your store today.</p>
        <p><strong>Status:</strong> API is running smoothly ✅</p>
      </div>
    </body>
    </html>
  `);
});


app.get("*", (req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>404 - Page Not Found</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          text-align: center;
          padding: 2rem;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
          font-size: 2rem;
          color: #cc0000;
        }
        p {
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>404 - Resources Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </body>
    </html>
  `);
});
