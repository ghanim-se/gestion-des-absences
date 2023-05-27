import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { studentsRouter } from './routes/students'
import { sectorsRouter } from './routes/sectors'
import { modulesRouter } from './routes/modules'
import { usersRouter } from './routes/users'
import { dashboardRouter } from './routes/dashboard'
import { manualRouter } from './routes/manual'
import { loginRouter } from './routes/loginAndLogout'
import { sessionRouter } from './routes/sessions'


dotenv.config()
const app = express()
const secretKey: any = process.env.SECRET_KEY

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(session({
    secret:  secretKey,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1hr 
    resave: false
}))

const staticPath = path.join(__dirname, '..', 'public')
app.set('view engine', 'ejs')
app.use(express.static(staticPath));


app.use('/', loginRouter)
app.use('/', studentsRouter)
app.use('/', sectorsRouter)
app.use('/', modulesRouter)
app.use('/', usersRouter)
app.use('/', dashboardRouter)
app.use('/', manualRouter)
app.use('/', sessionRouter)


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`app is runnig on port ${PORT}`))


