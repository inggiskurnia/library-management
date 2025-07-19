const {Member} = require('../models');
const {createBook} = require("./bookService");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{9,15}$/;

const createMember = async (data) => {
    const {email, name, phone, address} = data;

    if (!name || !email || !phone || !address) {
        throw new Error('All fields (name, email, phone, address) are required.');
    }

    if (!emailRegex.test(email)) {
        throw new Error('Email format is invalid.');
    }

    const existing = await Member.findOne({ where: { email } });
    if (existing) {
        throw new Error('Email already exists.');
    }

    if (!phoneRegex.test(phone)) {
        throw new Error('Phone format is invalid.');
    }

    return await Member.create({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
    });
}

module.exports ={
    createMember,
}