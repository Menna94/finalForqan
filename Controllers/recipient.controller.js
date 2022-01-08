const Recipient  = require('../Models/recipient.model');

//@desc     Fetch Recipients
//@route    GET /api/v1/recipients
//@access   private @admin
exports.getAllRecipients = async(req,res,next)=>{
    try{
        const recipients = await Recipient.find();
        if(!recipients){
            res.status(404).send({
                success: false,
                message: 'No Recipients Found!',
                data: null,
            })
        }
        res.status(200).send({
            success: true,
            message: 'All Recipients Fetched Successfully!',
            count: recipients.length,
            data: recipients,
        })
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: 'Error In Server When Fetching Recipients!',
            data: err,
        })
    }
}

//@desc     Fetch Single Recipient
//@route    GET /api/v1/recipients/:id
//@access   private @admin
exports.getSingleRecipient = async(req,res,next)=>{
    try{
        const recipient = await Recipient.findById({_id: req.params.id});
        if(!recipient){
            res.status(404).send({
                success: false,
                message: 'The Requested Recipient Was Not Found!',
                data: null,
            })
        }
        res.status(200).send({
            success: true,
            message: 'Recipient Fetched Successfully!',
            data: recipient,
        })
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: 'Error In Server When Fetching The Recipient!',
            data: err,
        })
    }
}


//@desc     Create Recipient
//@route    POST /api/v1/recipients
//@access   private @admin
exports.addRecipient = async(req,res,next)=>{
    try{
        // const street = req.body.address.street;
        // const city = req.body.address.city;
        // const state = req.body.address.state;
        // const country = req.body.address.country;
        const {
            recipientName,
            recipientNationalID,
            recipientPhone,
            recipientChildren,
            recipientMaritalStatus,
            moneyRevieved,
            address:{
                street,
                city,
                state,
                country,
            },
        } = req.body;

        const newRecipient = new Recipient({
            recipientName,
            recipientNationalID,
            recipientPhone,
            recipientChildren,
            recipientMaritalStatus,
            moneyRevieved,
            address:{
                street,
                city,
                state,
                country,
            },
        });

        await newRecipient.save();
        if(!newRecipient){
            res.status(400).send({
                success: false,
                message: 'Error In Creating New Recipient!',
                data: null,
            })
        }
        res.status(201).send({
            success: true,
            message: 'Recipients Created Successfully!',
            data: newRecipient,
        })
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: 'Error In Server When Creating New Recipient!',
            data: err.message,
        })
    }
}


//@desc     Update Recipient
//@route    PUT /api/v1/recipients/:id
//@access   private @admin
exports.updateRecipient = async(req,res,next)=>{
    try{
        const id = req.params.id

        const recipient = await Recipient.findById({_id : id});

        if(!recipient){
            res.status(404).send({
                success: false,
                message: 'There Is No Recipient With The Provided ID!',
                data: null,
            })
        }else{
            const updatedRecipient = await Recipient.findByIdAndUpdate( 
                id , 
                req.body, 
                {
                    new:true,
                    runValidators: true,
                }
            )

            if(!updatedRecipient){
                res.status(400).send({
                    success: false,
                    message: 'Error In Updating The Recipient!',
                    data: null,
                })
            }

            res.status(200).send({
                success: true,
                message: 'Recipients Updated Successfully!',
                data: updatedRecipient,
            })
        }
        
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: 'Error In Server When Updating The Recipient!',
            data: err,
        })
    }
}



//@desc     Delete A Recipient
//@route    DELETE /api/v1/recipients/:id
//@access   private @admin
exports.deleteRecipient = async(req,res,next)=>{
    try{
        const id = req.params.id

        const recipient = await Recipient.findById({_id : id});

        if(!recipient){
            res.status(404).send({
                success: false,
                message: 'There Is No Recipient With The Provided ID!',
                data: null,
            })
        }else{
            const delRecipient = await Recipient.findByIdAndRemove(id)

            if(!delRecipient){
                res.status(400).send({
                    success: false,
                    message: 'Error In Deleting The Recipient!',
                    data: null,
                })
            }

            const recipients = await Recipient.find();

            res.status(200).send({
                success: true,
                message: 'Recipient Deleted Successfully!',
                count: recipients.length,
                data: recipients
            })
        }
        
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: 'Error In Server When Deleting The Recipient!',
            data: err,
        })
    }
}