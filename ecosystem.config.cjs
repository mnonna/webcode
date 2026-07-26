module.exports = {
  apps: [
    {
      name: "webcode",
      cwd: __dirname,
      script: "npm",
      args: "run start",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
