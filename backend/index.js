const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());

// ROUTE DEFINITIONS
const girlRoutes = require('./src/routes/GirlRoute');
const userRoutes = require('./src/routes/UserRoute')

// ROUTE USAGE
app.use("/api/posts", girlRoutes)
app.use("/api/user", userRoutes)

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  app.get('/', async (req, res) => {
    res.send('MAIN GET REQ TO HOMEPAGE RECEIVED')
  })

}

main().then(() => console.log("MONGODB CONNECTED")).catch(err => console.log(err));


app.listen(port, () => {
  console.log(`FUNKGIRL APP LISTENING TO PORT: ${port}`)
})
