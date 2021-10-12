const db = require('helpers/db');
const { endUrl } = require('config.js');

module.exports = {
    getAll,
    getById
};

async function getAll() {
    const promotions = await db.Promotion.findAll({
        order: [
            ['promotion_id', 'ASC']
        ],
        attributes: ['promotion_id', 'event_title', 'event_desc', 'start_date', 'end_date', 'banner_image', 'rule_image', 'reward_image']
    });

    return { 
        banner_list : promotions.map( m => {
            if(m.banner_image) m.banner_image = `${endUrl}image_gallery/promotion/${m.banner_image}`;
            if(m.rule_image) m.rule_image = `${endUrl}image_gallery/promotion/${m.rule_image}`;
            if(m.reward_image) m.reward_image = `${endUrl}image_gallery/promotion/${m.reward_image}`;
            return m;
        }),
        status: true
    }
}

async function getById(id) {
    const banner_detail = await getPromotion(id);
    return { banner_detail, status: true };
}

// helper functions

async function getPromotion(id) {
    const promotion = await db.Promotion.findByPk(id);
    if (!promotion) throw 'Promotion not found';
    return promotion;
}
