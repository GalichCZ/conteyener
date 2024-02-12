const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const routers = require('./router/index')
const ItemSchema = require('./models/item-model')
const ProductSchema = require('./models/product-model')
const redisClient = require('./providers/redis')

dotenv.config()

const url = process.env.DB_URL
const PORT = 4444

const app = express()
app.use(express.json())
app.use(cors())
routers.forEach((router) => {
  app.use('/', router)
})

app.get('/api', (req, res) => {
  res.send('HELLO')
})

const start = async () => {
  try {
    mongoose.set('strictQuery', false)

    await app.listen(PORT, () => {
      console.log('Server started on ' + PORT)
    })

    await redisClient.connect().then(() => {
      console.log(`🟥 REDIS CONNECTED`)
    })
    await mongoose
      .connect(url)
      .then(() => console.log('DB IS OK'))
      .catch((e) => console.log(e))

    mongoose.connection.once('open', () => {
      ItemSchema.createIndexes((err) => {
        if (err) {
          console.error(err)
        } else {
          console.log('Indexes created successfully')
        }
        mongoose.connection.close()
      })
    })

    mongoose.connection.once('open', () => {
      ProductSchema.createIndexes((err) => {
        if (err) {
          console.error(err)
        } else {
          console.log('Indexes created successfully')
        }
        mongoose.connection.close()
      })
    })
  } catch (error) {
    console.log(error)
  }
}

start()
