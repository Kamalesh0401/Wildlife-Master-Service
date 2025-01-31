/jwt-auth-project
│── /config
│   ├── db.js                # Database connection file
│   ├── keys.js              # Secret keys and config
│── /middleware
│   ├── authMiddleware.js     # Middleware to verify JWT
│── /models
│   ├── User.js              # User schema/model
│── /routes
│   ├── authRoutes.js        # Authentication routes (login/register)
│   ├── protectedRoutes.js   # Example of a protected route
│── /controllers
│   ├── authController.js    # Controller for authentication logic
│── /utils
│   ├── generateToken.js     # Function to generate JWT token
│── /server.js               # Main entry file
│── /package.json            # Project dependencies
│── /.env                    # Environment variables (e.g., JWT_SECRET)
