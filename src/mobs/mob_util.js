const MobUtil = {
    generateImages(mob, type, action){
        const images = [];
        for (let i = 0; i < 10; i++){
            images.push(`mobs/${mob}${type}/${action}/${i}`)
        }
        return images
    }
}

module.exports = MobUtil;