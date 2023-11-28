const asyncHandler=require('express-async-handler')

const Property = require('../models/Property')

// Helper function to check ownership
const checkOwnership = (property, userId) => {
    if (property.currentOwner.toString() !== userId) {
      throw new Error("You are not allowed to perform this action on other people's properties");
    }
  };

// get all properties
const getAll=asyncHandler(async(req,res)=>{
    try {
        const properties = await Property.find({})
        return res.status(200).json(properties)
    } catch (error) {
        console.error(error)
    }
})

//create a new property
const setProp = asyncHandler(async(req,res)=>{
    try{
        const newProperty = await Property.create({ ...req.body, currentOwner: req.user.id })
        return res.status(201).json(newProperty)
    }catch(error){
        return res.status(500).json(error)
    }
})

//get all properties of a particular user
const getAllMe = asyncHandler(async(req,res)=>{
  try{
    const properties = await Property.find({ currentOwner: req.user.id })
    return res.status(200).json(properties)
  }catch(error){
    return res.status(500).json(error)
  }
})

//update a property
const updateProp = asyncHandler(async(req,res)=>{
  try {
    const property = await Property.findById(req.params.id)
    checkOwnership(property,req.user.id)

    const updatedProperty = await Property.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    )
    return res.status(200).json(updatedProperty)
} catch (error) {
    return res.status(500).json(error)
}
})

//delete a property
const deleteProp = asyncHandler(async(req,res)=>{
  try {
    const property = await Property.findById(req.params.id)
    checkOwnership(property,req.user.id)
    await property.delete()
    return res.status(200).json({ msg: "Successfully deleted property" })
} catch (error) {
    return res.status(500).json(error)
}
})

module.exports={ getAll, setProp, getAllMe, updateProp, deleteProp}
