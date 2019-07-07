const server = require('./config/loader')
const Index = require('./src/api/modules/Index')

const PORT = process.env.PORT || 4000
server.use('/', Index)
server.listen(PORT, () => console.log(`Running on ${PORT}`))
