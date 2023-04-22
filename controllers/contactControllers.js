const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//Get all contacts
//@routes GET /api/contacts
//access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id});
    console.log(contacts)
    res.status(200).json(contacts);
});

//Get a contact
//@routes GET /api/contacts/:id
//access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//Create new contact
//@routes POST /api/contacts
//access private
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    });
    res.status(201).json(contact)
});

//Update a contact
//@routes PUT /api/contacts/:id
//access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User does not have permission to update this contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, req.body, {new: true}
    );
    res.status(200).json(updatedContact);
});

//Delete a contact
//@routes POST /api/contacts/:id
//access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User does not have permission to delete this contact")
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json("Deleted");
});

module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};