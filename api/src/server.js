const app = require('./app');
const config = require('../config/config');

const PORT = config.server.port;


const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});
