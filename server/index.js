require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

const {PORT} = process.env