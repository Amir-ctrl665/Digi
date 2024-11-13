import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import {notfound,errorHandler} from './middleware/errormiddleware.js'
import productsRoutes from './routes/productRoutes.js'
import userRoutes from './routes/usersRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/UpdateRoutes.js'
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;
dotenv.config();
connectDB();
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}))

// Cookie parser middleware
app.use(cookieParser())

app.get('/',(req,res) => {
    res.send('API is running ...')
});
app.use('/api/products',productsRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);

const _dirname = path.resolve(); //Set _dirname to Current directory
app.use('/uploads',express.static(path.join(_dirname,'/uploads')));

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static(path.join(_dirname, '/frontend/build')));

    // any route that is not api will redirected to index.html
    app.get('*', (req,res) =>
        res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html'))
    )
}else {
    app.get('/', (req,res) => {
        res.send('API is running ....')
    })
}
app.use(notfound);
app.use(errorHandler);

app.listen(port,() => console.log(`Server is running On port ${port}`));