module.exports = {
  apps: [
    // {
    //   name: "nextjs-app",
    //   script: "../../fe/node_modules/next/dist/bin/next", // Path to Next.js start script
    //   args: "start",
    //   instances: 1,
    //   exec_mode: "fork",
    //   watch: false, // Next.js doesn't need watching as it has its own file watching mechanism
    //   env: {
    //     NODE_ENV: "development",
    //     PORT: 3004, // Port for the Next.js app
    //   },
    //   env_production: {
    //     NODE_ENV: "production",
    //     PORT: 8080, // Production port for Next.js
    //   },
    // },
    {
      name: "api-gateway",
      script: "../api-gateway/index.js", // Path to your entry file for the api-gateway service
      instances: 1,
      exec_mode: "fork",
      watch: true, // Enable watching for file changes
      env: {
        NODE_ENV: "development",
        PORT: 3000, // Port for API gateway
      },
      env_production: {
        NODE_ENV: "production",
        GATEWAY_SERVER_PORT: 8090,
        PUBLIC_SERVICE_URL: "http://localhost:5005/publicPostRoutes",
        AUTH_SERVICE_URL: "http://localhost:5006/auth",
        CHAT_SERVICE_URL: "http://localhost:5007/chat",
      },
    },
    {
      name: "auth-microservice",
      script: "../auth-microservice/index.js", // Path to your entry file for the auth service
      instances: 1,
      exec_mode: "fork",
      watch: true,
      env: {
        NODE_ENV: "development",
        PORT: 3001, // Port for Auth microservice
      },
      env_production: {
        // NODE_ENV: "production",
        NODE_ENV: "PROD",
        CURRENT_HOST: "http://localhost:5000",
        SERVER_PORT: 5006,
        JWT_SECRET: "your_jwt_secret",
        ADMIN_EMAIL: "admin@gmail.com",

        DB_USERNAME: "postgres",
        DB_PASSWORD: "admin",
        DB_HOST: "localhost",
        DB_PORT: 5432,
        DB_NAME: "auth",
        DB_URL: "postgres://postgres:admin@localhost:5432/auth",
      },
    },
    {
      name: "chat-microservice",
      script: "../chat-microservice/index.js", // Path to your entry file for the chat service
      instances: 1,
      exec_mode: "fork",

      watch: true,
      env: {
        NODE_ENV: "development",
        PORT: 3002, // Port for Chat microservice
      },
      env_production: {
        // NODE_ENV: "production",
        NODE_ENV: "DEV",
        CURRENT_HOST: "http://localhost:5000",
        SERVER_PORT: 5007,
        JWT_SECRET: "your_jwt_secret",
        API_GATEWAY_ENDPOINT: "http://localhost:8090",

        DB_USERNAME: "postgres",
        DB_PASSWORD: "admin",
        DB_HOST: "localhost",
        DB_PORT: 5432,
        DB_NAME: "chat_app",
        DB_URL: "postgres://postgres:admin@localhost:5432/chat_app",
      },
    },
    {
      name: "publicPost-microservice",
      script: "../publicPost-microservice/index.js", // Path to your entry file for the public post service
      instances: 1,
      exec_mode: "fork",
      watch: true,
      env: {
        NODE_ENV: "development",
        PORT: 3003, // Port for Public Post microservice
      },
      env_production: {
        // NODE_ENV: "production",
        NODE_ENV: "DEV",
        CURRENT_HOST: "http://localhost:5000",
        SERVER_PORT: 5005,
        JWT_SECRET: "your_jwt_secret",

        DB_USERNAME: "postgres",
        DB_PASSWORD: "admin",
        DB_HOST: "localhost",
        DB_PORT: 5432,
        DB_NAME: "public_posts",
        DB_URL: "postgres://postgres:admin@localhost:5432/public_posts",
      },
    },
  ],
  deploy: {
    production: {
      path: "../../fe",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
