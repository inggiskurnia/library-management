const {Member, Borrowing, Book} = require('../models');

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

const getMemberBorrowings = async (memberId, { status, page = '1', limit = '10' }) => {

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const offset = (page - 1) * limitNum;

    const whereClause = { member_id: memberId };
    if (status) {
        whereClause.status = status;
    }

    const {count, rows} = await Borrowing.findAndCountAll({
        where: whereClause,
        include: [{ model: Book }],
        limit,
        offset,
        order: [['borrow_date', 'DESC']],
    });

    return {
        totalItems: count,
        totalPages: Math.ceil(count / limitNum),
        currentPage: pageNum,
        items: rows,
    };
};

module.exports ={
    createMember,
    getMemberBorrowings,
}