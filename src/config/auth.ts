export default {
   jwt: {
      secret: process.env.APP_SECRET || `${Date.now()}`,
      expiresIn: '24h',
   },
};
