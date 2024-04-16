const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./database/connect.js');
const port = 5001;
const app = express();
app.use(express.static(__dirname + "/public"));

//Hoi
const accountRouter = require('./routes/accountRoute.js');
const userRouter = require('./routes/userRoute.js');
//Quang
const requireRouter = require('./routes/requirementRoute.js');
const contractRouter = require('./routes/contractRoute.js');


//Nghia
const categoryRouter = require('./routes/PCategoryRoute.js');
const productRouter = require('./routes/productRoute.js');
//Vinh
const cartRouter = require('./routes/cartRoute.js');
//Nhat
const feedbackRouter = require('./routes/feedbackRoute.js');
//Hung
const transactionRouter = require('./routes/transactionRoute.js');
const manageConstructionRouter = require('./routes/manageConstructionRoute.js');

app.use(bodyParser.json());
app.use('/account',accountRouter);
app.use('/user',userRouter);
app.use('/require',requireRouter)
app.use('/contract',contractRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/feedback', feedbackRouter);
app.use('/transaction', transactionRouter);
app.use('/manageConstruction', manageConstructionRouter);
app.use('/cart',cartRouter);

app.post('/', (req, res) => {
    res.status(200).json("Hello");
})

app.listen(port, async (req, res) => {
    connect();
    console.log(`Listening on port : ${port}`);
});
