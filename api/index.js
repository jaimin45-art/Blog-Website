import express from 'express'
import { connectToDatabase } from "./Database/db.js";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import mongoose from 'mongoose'
import AuthRoute from './routes/auth.js'
import UserRoute from './routes/User.route.js'
import CategoryRoute from './routes/Category.route.js'
import BlogRoute from './routes/Blog.route.js'
import CommentRouote from './routes/Comment.route.js'
import BlogLikeRoute from './routes/Bloglike.route.js'
import adminRoutes from "./routes/admin.js";

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
   origin: "http://localhost:5173",
    credentials: true
}))


// route setup  

app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use("/api/admin", adminRoutes);
app.use('/api/category', CategoryRoute)
app.use('/api/blog', BlogRoute)
app.use('/api/comment', CommentRouote)
app.use('/api/blog-like', BlogLikeRoute)

connectToDatabase();

// mongoose.connect(process.env.MONGODB_CONN, { dbName: 'yt-mern-blog' })
//     .then(() => console.log('Database connected.'))
//     .catch(err => console.log('Database connection failed.', err))

app.listen(PORT, () => {
    console.log('Server running on port:', PORT)
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error.'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})