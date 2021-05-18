const mongoose = require('mongoose');
const { MONODE_ENV, MONGO_URI_LOCAL} = process.env;



mongoose.connect(process.env.MONGO_URI_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}`);
})
.catch((err) => console.error('Error connecting to mongo ', err));