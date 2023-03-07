const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//Get all contacts
//@routes GET /api/contacts
//access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    console.log(contacts)
    res.status(200).json(contacts);
});

//Get a contact
//@routes GET /api/contacts/:id
//access public
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
//access public
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name, email, phone
    });
    res.status(201).json(contact)
});

//Update a contact
//@routes PUT /api/contacts/:id
//access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, req.body, {new: true}
    );
    res.status(200).json(updatedContact);
});

//Delete a contact
//@routes POST /api/contacts/:id
//access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    await Contact.deleteOne();
    res.status(200).json("Deleted");
});

module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};