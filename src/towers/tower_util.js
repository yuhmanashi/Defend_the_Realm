const TowerUtil = {
    generateImages(tower, action){
        const images = [];
        for (let i = 0; i < 10; i++){
            images.push(`towers/${tower}/${action}/${i}`)
        }
        return images
    }
}

module.exports = TowerUtil;