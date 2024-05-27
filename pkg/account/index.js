const mongoose = require('mongoose');

const Account = mongoose.model(
    'accounts',
    {
        email: String,
        password:String,
        firstName:String,
        lastName:String,
        birthDate:String,
        avatar:String
    },
    'accounts'
);

const create = async (acc) => {
    let a = new Account(acc);
    return await a.save()
};

const getById = async (id) => {
    return await Account.findOne({_id: id});
};

const getByEmail = async (email) => {
    return await Account.findOne({email})
};

const getAll = async () => {
    return await Account.find({});
}

const update = async (id, acc) => {
    return await Account.updateOne({_id: id}, acc);
}

const remove = async (id, acc) => {
    return await Account.remove({_id: id});
};

module.exports = {
    create,
    getById,
    getByEmail,
    getAll,
    update,
    remove
}