const server = require('./config/loader');
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Running on ${PORT}`));