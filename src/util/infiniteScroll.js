import image from "../assets/crypto-app-screen.jpg"

export function generateImages(amount, chunks){
    let images = [[]];
    const size = amount/chunks

    for (let i = 0; i < chunks; i++) {
        for( let j = 0; j < size; j++){
            const rand = Math.ceil(Math.random() * 64);
            const src = `/scroller/bird${rand}.jpg`;
            images[i].push({src: src})
        }
        images.push([])
    }

    return images;
}
