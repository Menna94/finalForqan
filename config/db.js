const mongoose = require('mongoose');

exports.DBConnection = async() =>{
    try{
        const conn = await mongoose.connect('mongodb+srv://forqan:forqan123@cluster0.ewaim.mongodb.net/forqan?retryWrites=true&w=majority',{
            useUnifiedTopology: true,
            useNewUrlParser:true,
        })

        console.log(`~ Database Connected SUCCESSFULLY! ~`);
        console.log(conn.connection.host);
    }
    catch(err){
        console.log(`~ ERROR In Connecting to Database! ~`);
        console.log(err);
    }
}