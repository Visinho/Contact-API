const asynchandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//Get all contacts
//@routes GET /api/contacts
//access public
const getContacts = asynchandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//Get a contact
//@routes GET /api/contacts/:id
//access public
const getContact = asynchandler(async (req, res) => {
    res.status(200).json({message: `Get Contact for ${req.params.id}`})
});

//Create new contact
//@routes POST /api/contacts
//access public
const createContact = asynchandler(async (req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    res.status(201).json({message: "Create Contact"})
});

//Update a contact
//@routes PUT /api/contacts/:id
//access public
const updateContact = asynchandler(async (req, res) => {
    res.status(200).json({message: `Update Contact for ${req.params.id}`})
});

//Delete a contact
//@routes POST /api/contacts/:id
//access public
const deleteContact = asynchandler(async (req, res) => {
    res.status(200).json({message: `Delete Contact for ${req.params.id}`})
});

module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};