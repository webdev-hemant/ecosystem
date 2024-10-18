module.exports = {
  apps: [
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
        PORT: 8090,
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
        NODE_ENV: "production",
        PORT: 5006,
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
        NODE_ENV: "production",
        PORT: 5007,
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
        NODE_ENV: "production",
        PORT: 5005,
      },
    },
  ],
};
