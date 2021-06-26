const app = require('./app')
import * as dotenv from 'dotenv'

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10) || 7000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})