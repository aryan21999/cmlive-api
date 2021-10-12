const db = require('helpers/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = {
    inboxStrange,
    inboxFollow,
    converstions,
    userMessage,
    deleteMessage
};

async function inboxStrange(params) {

    // $sqlmessage_distinct = "SELECT DISTINCT   FROM message WHERE user_from='$user_id' or user_to='$user_id'";
    
    // const sqlmessage_distinct = await db.Message.findOne({
    //     where: { user_from: params.user_id },
    //     distinct: true,
    //     attributes: ['user_from', 'user_to'],
    // });

    // let other_user_id = '';

    // if(sqlmessage_distinct.user_from == params.user_id) {
    //     other_user_id = sqlmessage_distinct.user_to;
    // } else { 
    //     other_user_id = sqlmessage_distinct.user_from;
    // }

    const messages = await db.Message.findAll({
        where: {
            // user_from: params.user_id,
            // [Op.and]: [ { user_from: params.user_id } ],
            // [Op.not]: [ { deleted_by: params.user_id } ],
            // [Op.or]: [{ user_to: params.user_id }],
        },

        attributes: ['message_id', 'user_from', 'user_to', 'conversation_id', 'message', 'added_time', 'type', 'file_type', 'seen', 'agora_peer_id', 'agora_id', 'gift_image', 'coins', 'diamonds']
    });

    return messages;
}

async function inboxFollow(params) {
    const messages = await db.Message.findAll({
        where: { 
            [Op.and]: [ { user_from: params.user_id } ],
            [Op.not]: [ { deleted_by: params.user_id } ],
            [Op.or]: [{ user_to: params.user_id }]
        },
        attributes: ['message_id', 'user_from', 'user_to', 'conversation_id', 'message', 'added_time', 'type', 'file_type', 'seen', 'agora_peer_id', 'agora_id', 'gift_image', 'coins', 'diamonds']
    });

    return messages;
}

async function converstions(params) {
    const messages = await db.Message.findAll({
        where: { 
            [Op.and]: [ { user_from: params.user_id } ],
            [Op.not]: [ { deleted_by: params.user_id } ],
            [Op.or]: [{ user_to: params.user_id }]
        },
        order: [
            ['message_id', 'DESC']
        ],
        offset: (0),
        limit: 1,
        attributes: ['message_id', 'user_from', 'user_to', 'conversation_id', 'message', 'added_time', 'type', 'file_type', 'seen', 'agora_peer_id', 'agora_id', 'gift_image', 'coins', 'diamonds']
    });

    return messages;
}

async function userMessage(params) {
    let conversation_id = '';

    if(params.user_from < params.user_to) {
        conversation_id = params.user_from + ',' + params.user_to;
    } else {
        conversation_id = params.user_to + ',' + params.user_from;
    }

    const message_list = await db.Message.findAll({
        where: {
            [Op.and]: [ { conversation_id } ],
            [Op.not]: [ { deleted_by: params.user_from } ],
         },
        attributes: ['message_id', 'user_from', 'user_to', 'conversation_id', 'message', 'added_time', 'type', 'file_type', 'seen', 'agora_peer_id', 'gift_image', 'coins', 'diamonds']
    });

    return {
        message_list,
        status: true
    }
}

async function deleteMessage(params) {
    const message = await db.Message.findOne({ where: { message_id: params.message_id }, attributes: ['message_id' , 'deleted_by' ]});

    if(!message)
        throw 'Message not found.';

    Object.assign(message, {
        deleted_by: params.user_id
    });
    await message.save();

    return { status: true, message: 'Message has been deleted successfully !!' };
}

