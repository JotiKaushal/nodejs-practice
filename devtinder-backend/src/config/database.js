const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect('mongodb+srv://kaushaljyoti266:AtharvRana@mynodecluster.8y5h5.mongodb.net/devTinder')
}
module.exports =connectDB;
