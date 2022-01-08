const Doner = require("../Models/doner.model");


//@desc     Create A Doner
//@route    POST /api/v1/doners
//@access   private @admin
exports.addDoner = async(req,res,next)=>{
    try{
        const {
            donerName,
            moneyGiven,
            givenFor,
            // date,
        } = req.body;

        const newDoner = new Doner({
            donerName,
            moneyGiven,
            givenFor,
            // date,  
        })
        await newDoner.save();
        if(!newDoner){
            res.status(400).send({
                success: false,
                message: 'Something Went Wrong While Creating The Doner!',
                data: null,
            })
        }
        res.status(201).send({
            success: true,
            message: 'Doner Created Successfully',
            data: newDoner,
        })
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: 'Error In The Server While Creating The Doner!',
            data: err.message,
        })
    }
}


//@desc     Fetch All Doners
//@route    GET /api/v1/doners
//@access   private @admin
exports.getDoners = async(req,res,next)=>{
    try{
        const doners = await Doner.find();

        if(!doners){
            res.status(404).send({
                success: false,
                message: 'No Doners Are Found!',
                data: null,
            })
        }
        res.status(200).send({
            success: true,
            message: 'Doners Are Fetched Successfully!',
            count: doners.length,
            data: doners,
        })
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: 'Error In The Server While Fetching Doners!',
            data: err.message,
        })
    }
}


//@desc     Fetch Single Doner
//@route    GET /api/v1/doner/:id
//@access   private @admin
exports.getSingleDoner = async(req,res,next)=>{
    try{
        const id = req.params.id;

        const doner = await Doner.findById(id);

        if(!doner){
            res.status(404).send({
                success: false,
                message: 'Requested Doner Is Not Found!',
                data: null,
            })
        }
        res.status(200).send({
            success: true,
            message: 'Requested Doner is Fetched Successfully',
            data: doner,
        })
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: 'Error In The Server While Fetching The Doner!',
            data: err.message,
        })
    }
}


//@desc     Update A Doner
//@route    PUT /api/v1/doner/:id
//@access   private @admin
exports.updateDoner = async(req,res,next)=>{
    try{
        const id= req.params.id;
        const doner = await Doner.findById(id);

        if(!doner){
            res.status(404).send({
                success: false,
                message: 'There Is No Doner With The Provided ID!',
                data: null,
            }) 
        } else {
            const updatedDoner = await Doner.findByIdAndUpdate(
                id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            )

            if(!updatedDoner){
                res.status(400).send({
                    success: false,
                    message: 'Something Went Wrong While Updating The Doner!',
                    data: null,
                }) 
            }
            res.status(200).send({
                success: true,
                message: 'Doner Updated Successfully',
                data: updatedDoner,
            }) 
        }
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: 'Server Error While Updating A Doner!',
            data: err.message,
        }) 
    }
}


//@desc     Delete A Doner
//@route    DELETE /api/v1/doner/:id
//@access   private @admin
exports.deleteDoner = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const doner = await Doner.findById(id);

        if(!doner){
            res.status(404).send({
                success: false,
                message: 'There Is No Doner With The Provided ID!',
                data: null,
            }) 
        } else {
            const delDoner = await Doner.findByIdAndRemove(id);
            if(!delDoner){
                res.status(400).send({
                    success: false,
                    message: 'Something Went Wrong While Deleting The Doner!',
                    data: null,
                })  
            }
            const doners = await Doner.find();
            res.status(200).send({
                success: true,
                message: 'Doner Deleted Successfully',
                count: doners.length,
                data: doners
            }) 
        }
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: 'There Is Server Error While Deleting The Doner!',
            data: err.message
        }) 
    }
}