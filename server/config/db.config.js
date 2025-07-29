const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/dataAssociation')
        console.log('MongoDB connected successfully');
    }
    catch(err){
        console.error('Error connecting to MongoDB:', err);    }
}
module.exports = connectDb;