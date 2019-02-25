const server = require('./config/loader');
const PORT = process.env.PORT || 3000;

server.get('/', (req, res) => res.send('Running !!!'));

server.listen(PORT, () => console.log(`Running on ${PORT}`));