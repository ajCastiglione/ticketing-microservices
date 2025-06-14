export default {
  webpack: config => {
    return {
      ...config,
      watchOptions: {
        ...config.watchOptions,
        poll: 300, // Check for changes every 300ms - helps with hot reload in Docker envs
      },
    };
  },
  allowedDevOrigins: ["ticketing.dev"],
};
