const Util = {
    preloadImages(imageURLs, images, callback) {
        let loadedCount = 0;
        if (!imageURLs instanceof Array) imageURLs = imageURLs(); 
        let toBeLoaded = imageURLs.length;
        imageURLs.forEach(url => {
            preloadImage(url, images, function(){
                loadedCount++;
                if (loadedCount === toBeLoaded){
                    callback();
                }
            });
        });
    
        function preloadImage(src, images, callback){
            const img = new Image();
            img.onload = callback;
            img.src = `../assets/images/${src}.png`;
            images.push(img);
        };
    },

    reset(array){
        array.splice(0, array.length)
    }
};

module.exports = Util;