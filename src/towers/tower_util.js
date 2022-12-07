const TowerUtil = {
    generateImages(tower, action, numImages = 10){
        const images = [];
        for (let i = 0; i < numImages; i++){
            images.push(`towers/${tower}/${action}/${i}`)
        }
        return images
    }
}

module.exports = TowerUtil;