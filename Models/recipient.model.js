const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    recipientName:{
        type: String,
        required: [true, "Please add a name"],
        trim: true,
        maxlength: [50, "Name Cannot be more than 50 charcahters"],
    },
    recipientNationalID:{
        type: Number,
        required: true,
        unique: true,
        minlength: [10000000000000, "Please Enter A Valid National ID"],
        maxlength: [99999999999999, "Please Enter A Valid National ID"]
    },
    recipientPhone:{
        type: Number,
        required: true,
        minlength: [10000000000, "Please Enter A Valid Phone Number"],
        maxlength: [99999999999, "Please Enter A Valid Phone Number"]
    },
    recipientChildren:{
        type: Number,
        required: true,
    },
    recipientMaritalStatus:{
        type: String,
        required: true,
        enum:[
            'Single',
            'Married',
            'Divorced',
            'Widow'
        ]
    },
    moneyRevieved:{
        type: Number,
        required: true,
    },
    address:{
        street:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        state:{
            type: String,
            required: true,
        },
        country:{
            type: String,
            required: true,
        },
    },
    
},{
    timestamps: true
});



const Recipient = mongoose.model('Recipient', recipientSchema);
module.exports = Recipient;