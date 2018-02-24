class Utility {
    static loadImage(url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => {
                resolve(image);
            }, false);
            image.src = url;
        });
    }

    static loadAudio(url) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            resolve(audio);
            audio.src = url;
        });
    }

    static loadData(url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.overrideMimeType("application/json");
            request.open('GET', url, true);
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == "200") {
                    resolve(JSON.parse(request.responseText));
                }
            };
            request.send(null); 
        });
    }

    static wait(duration) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, duration * 1000);
        });
    }

    static line(context, x, y, x2, y2) {
        context.beginPath();
        context.moveTo(x,y);
        context.lineTo(x2,y2);
        context.stroke();
    }

    static clamp(x, a, b) {
        return Math.min(Math.max(x, a), b)
    }

    static random(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static randomFloat(max) {
        return Math.random() * max;
    }

    static randomFloatRange(lower, upper) {
        return lower + Utility.randomFloat(upper - lower);
    }

    static randomSign() {
        return Math.random() > 0.5 ? 1 : -1;
    }
}

module.exports = Utility;
