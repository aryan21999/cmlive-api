const { endUrl, secret } = require('config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('helpers/db');
const constants = require('helpers/constants');
const { fcm } = require('config');
const fcmNode = require('fcm-node');
const fcmService = new fcmNode(fcm.key);
const Sequelize = require('sequelize');

module.exports = {
    authenticate,
    googleAuthenticate,
    codeAuthenticate,
    create,
    update,
    updateUserLiveStatus,
    getById,
    checkPhone,
    randomUsers
};

async function authenticate(params) {
    const user = await db.User.findOne({ 
        where: { phone_number: params.phone_number },
        attributes: [ 'user_id', 'name', 'profile_userid', 'agency_id', 'email', 'phone_number', 'dob', 'gender', 'status', 'channel_name', 'profile_image', 'password']
    });

    if (!user || !(await bcrypt.compare(params.password, user.password)))
        throw 'Phone Number or password is incorrect';

    if(await db.BlockedDevice.count({ where: { advertising_id: params.advertising_id } }) === 0)
        throw 'This device is blocked !!';
    
    if(user.status === 1) {
        Object.assign(user, {
            device_token: params.device_token,
            advertising_id: params.advertising_id
        });
        await user.save();

        await db.UserLog.create({
            user_id: user.user_id,
            device_name: params.device_name,
            log_time: params.log_time,
            location: params.location
        });

        // authentication successful
        const token = jwt.sign({ sub: user.user_id }, secret, { expiresIn: '7d' });

        return { 
            message: 'Login successfull !!',
            status: true,
            block_status: 0,
            user_detail: { ...omitPassword(user.get()), 
                profile_userid: `CM${user.profile_userid}`,
                user_id: user.id,
                profile_image_url: user.profile_image ? `${endUrl}image_gallery/user/${user.profile_image}` : `${endUrl}image_gallery/user/blank.png`, 
                token 
            }
        };

    }

    return {
        message: 'Your account is blocked',
        status: true,
        block_status: 1,
        user_detail: { ...omitPassword(user.get()), 
            profile_userid: `CM${user.profile_userid}`,
            user_id: user.id,
            profile_image_url: user.profile_image ? `${endUrl}image_gallery/user/${user.profile_image}` : `${endUrl}image_gallery/user/blank.png`
        }
    };
}

async function googleAuthenticate(params) {
    if(await db.BlockedDevice.count({ where: { advertising_id: params.advertising_id } }) === 0)
        throw 'This device is blocked !!';
    
    let user = await db.User.findOne({
            where: { email: params.email },
            attributes: [ 'user_id', 'name', 'profile_userid', 'agency_id', 'email', 'phone_number', 'dob', 'gender', 'status', 'channel_name', 'profile_image', 'password']
        });
    
    if(!user) {
        const maxUIdData = await db.User.findOne({
            attributes: [[db.User.sequelize.fn('max', db.User.sequelize.col('profile_userid')), 'profile_userid']]
        });
    
        params = {
            ...params,
            ...constants.USER_PARAMS,
            password: '',
            phone_number: '',
            dob: '',
            gender: '',
            profile_userid: maxUIdData && maxUIdData.profile_userid ? maxUIdData.profile_userid : constants.USER_PARAMS.profile_userid
        }
    
        // save user
        user = await db.User.create(params);

        await db.Transaction.create({
            ...constants.TRANSACTION_PARAMS,
            user_id: user.user_id, 
            transaction_date: new Date()
        });
    }

    if(user.status === 1) {
        Object.assign(user, {
            device_token: params.device_token,
            advertising_id: params.advertising_id
        });
        await user.save();

        await db.UserLog.create({
            user_id: user.user_id,
            device_name: params.device_name,
            log_time: params.log_time,
            location: params.location
        });

        // authentication successful
        const token = jwt.sign({ sub: user.user_id }, secret, { expiresIn: '7d' });

        return { 
            message: 'Login successfull !!',
            status: true,
            block_status: 0,
            user_detail: { ...omitPassword(user.get()), 
                profile_userid: `CM${user.profile_userid}`,
                user_id: user.id,
                profile_image_url: user.profile_image ? `${endUrl}image_gallery/user/${user.profile_image}` : `${endUrl}image_gallery/user/blank.png`, 
                token 
            }
        };

    }

    return {
        message: 'Your account is blocked',
        status: true,
        block_status:   1,
        user_detail: { ...omitPassword(user.get()), 
            profile_userid: `CM${user.profile_userid}`,
            user_id: user.id,
            profile_image_url: user.profile_image ? `${endUrl}image_gallery/user/${user.profile_image}` : `${endUrl}image_gallery/user/blank.png`
        }
    };
    
}

async function codeAuthenticate(params) {
    if(await db.BlockedDevice.count({ where: { advertising_id: params.advertising_id } }) === 0)
        throw 'This device is blocked !!';

    const user = await db.User.findOne({ 
        where: { phone_number: params.phone_number },
        attributes: [ 'user_id', 'name', 'profile_userid', 'agency_id', 'email', 'phone_number', 'dob', 'gender', 'status', 'channel_name', 'profile_image', 'password']
    });

    if (!user)
        throw 'Incorrect email or password !!';

    if(user.status === 1) {
        Object.assign(user, {
            device_token: params.device_token,
            advertising_id: params.advertising_id
        });
        await user.save();

        await db.UserLog.create({
            user_id: user.user_id,
            device_name: params.device_name,
            log_time: params.log_time,
            location: params.location
        });

        // authentication successful
        const token = jwt.sign({ sub: user.user_id }, secret, { expiresIn: '7d' });

        return { 
            message: 'Login successfull !!',
            status: true,
            block_status: 0,
            user_detail: { ...omitPassword(user.get()), 
                profile_userid: `CM${user.profile_userid}`,
                user_id: user.id,
                profile_image_url: user.profile_image ? `${endUrl}image_gallery/user/${user.profile_image}` : `${endUrl}image_gallery/user/blank.png`, 
                token 
            }
        };

    }

    return {
        message: 'Your account is blocked',
        status: true,
        block_status:   1,
        user_detail: { ...omitPassword(user.get()), 
            profile_userid: `CM${user.profile_userid}`,
            user_id: user.id,
            profile_image_url: user.profile_image ? `${endUrl}image_gallery/user/${user.profile_image}` : `${endUrl}image_gallery/user/blank.png`
        }
    };
    
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { phone_number: params.phone_number } })) {
        throw 'Phone Number "' + params.phone_number + '" is already taken';
    }

    if(await db.BlockedDevice.count({ where: { advertising_id: params.advertising_id } }) === 0)
        throw 'This device is blocked !!';

    const maxUIdData = await db.User.findOne({
        attributes: [[db.User.sequelize.fn('max', db.User.sequelize.col('profile_userid')), 'profile_userid']]
    });

    params = {
        ...params,
        ...constants.USER_PARAMS,
        profile_userid: maxUIdData && maxUIdData.profile_userid ? maxUIdData.profile_userid : constants.USER_PARAMS.profile_userid
    }

    // hash password
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    // save user
    const user = await db.User.create(params);
    
    // authentication successful
    const token = jwt.sign({ sub: user.user_id }, secret, { expiresIn: '7d' });

    return {
        user_detail: { ...omitPassword(user.get()), token, profile_image_url: `${endUrl}image_gallery/user/blank.png` },
        message: 'User has been registered successfully !!',
        status: true
    };

}

async function update(where, params) {

    const user = await db.User.findOne({ where, attributes: [ 'user_id', 'password']});

    if(!user)
        throw 'Unable to process request.';

    if (params.newpassword) {
        params.password = await bcrypt.hash(params.newpassword, 10);
    }

    Object.assign(user, params);
    await user.save();

    return { status: true, message: 'Profile has been updated successfully.' };
}

async function updateUserLiveStatus(params) {

    // const user = await db.User.findOne({ where: { user_id: params.user_id } });
    const user = await getUser(params.user_id);

    if(!user)
        throw 'This user doesn\'t  exist !!';
        
    const newParms = {
        live_status: params.live_status,
        live_image: params.live_image,
        channel_name: params.channel_name,
        live_title: params.live_title,
        live_category: params.live_category,
        live_location: params.live_location,
        live_mode: params.live_mode,
        live_time: params.live_time,
        pk_diamonds: params.pk_diamonds,
        live_hosts: params.live_hosts,
        live_uid: params.live_uid,
        total_diamonds: params.total_diamonds,
        match_mode: params.match_mode,
        pk_battle_status: 0
    };
        
    Object.assign(user, newParms);
    await user.save();

    const multiBeam = await db.MultiBeam.findOne({ where: { channel_name: params.channel_name } });
    if(multiBeam)
        await multiBeam.destroy();

    const broadcastJoin = await db.BroadcastJoin.findOne({ where: { channel_name: params.channel_name } });
    if(broadcastJoin)
        await broadcastJoin.destroy();

    const supporter = await db.Supporter.findOne({ where: { user_to: params.user_id } });
    if(supporter)
        await supporter.destroy();

    const followers = await db.Follower.findAll({
        order: [
            ['id', 'ASC']
        ],
        attributes: ['id', 'follow_by']
    });

    const followersFollowBy = followers.map(m=> m.follow_by);

    const users = await db.User.findAll({ where: { user_id: followersFollowBy }, attributes: ['device_token']  });

    const usersToken = users.map(m=> m.device_token);

    const message = {
        data: {
            title: 'started a live Video',
            body: 'Watch it before it ends!',
            android_channel_id: 'broadcast_notification'
        },
        registration_ids: usersToken
    }
    
    fcmService.send(message, function(err, response) {
        if (err) {
            console.log("Something has gone wrong!", err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });

    return { status: true, message: 'Live status has been updated successfully !!' };
}

async function getById(id) {
    return {
        userdetail: await getUser(id),
        status: true
    };
}

async function checkPhone(params) {
    const user = await db.User.findOne({ 
        where: { phone_number: params.phone_number },
        attributes: [ 'user_id', 'name', 'profile_userid', 'agency_id', 'email', 'phone_number', 'dob', 'gender', 'status', 'channel_name', 'profile_image']
    });

    if(user)
        return {
            message: 'Phone number already exists',
            status: false,
            user_detail: { 
                ...omitPassword(user.get()),
                profile_userid: `CM${user.profile_userid}`,
                user_id: user.id,
                profile_image_url: user.profile_image ? `${endUrl}image_gallery/user/${user.profile_image}` : `${endUrl}image_gallery/user/blank.png`
            }
        };

    return {
        message: 'Phone number is available for registration',
        status: true
    };
}

async function randomUsers() {
    const users = await db.User.findAll({
        order: Sequelize.literal('rand()'), 
        limit: 5,
        attributes: [ 'user_id', 'name', 'profile_userid', 'agency_id', 'email', 'phone_number', 'dob', 'gender', 'status', 'channel_name', 'profile_image']
    });

    return {
        status: true,
        userlist: users.map(user => {
            const newuser = user;
            newuser.profile_userid = `CM${user.profile_userid}`;
            newuser.profile_image = user.profile_image ? `${endUrl}image_gallery/user/${user.profile_image}` : `${endUrl}image_gallery/user/blank.png`;
            return newuser;
        })
    };
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';

    user.dataValues.live_image_url =  user.dataValues.live_image ? `${endUrl}image_gallery/user/${user.dataValues.live_image}` : `${endUrl}image_gallery/user/blank.png`;
    user.dataValues.profile_image_url =  user.dataValues.profile_image ? `${endUrl}image_gallery/user/${user.dataValues.profile_image}` : `${endUrl}image_gallery/user/blank.png`;

    return user;
}

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
