const db = require('helpers/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = {
    checkLastHostRegistration
};

async function checkLastHostRegistration(params) {

    const user = await db.User.findOne({ where: { user_id : params.user_id }, attributes: ['agency_id'] });
    
    if(!user)
        throw 'User not found';

    if(user.agency_id != 0)
        throw 'Your previous request has been approved';
    
    const hostRegistrationApplication = await db.HostRegistrationApplication.findOne({ 
        where: { user_id : params.user_id }, attributes: ['status'],
        order: [
            ['application_id', 'DESC']
        ],
        offset: (0),
        limit: 1,
    });

    if(!hostRegistrationApplication) {
        return {
            message: 'You are open to send request',
            status: true
        }
    }
    
    switch(hostRegistrationApplication.status) {
        case 0:
           throw 'You have already sent a request'
          break;
        case 1:
            throw 'Your previous request has been approved'
          break;
        case 2:
            throw 'Your previous request has been rejected'
          break;
        default:
            return {
                message: 'You are open to send request',
                status: true
            }
      }
}
