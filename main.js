const canvas = document.querySelector('.canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frames = 179;

const currentFrame = (index) => `./ball/${(index + 1).toString()}.jpg`;
const images = [];
let ball = { frame: 0 };

for (let i = 0; i < frames; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// console.log(images);

gsap.to(ball, {
    frame: frames - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: true,
        pin: 'canvas',
        end: "500%",
    },
    onUpdate: render,
}
);

gsap.fromTo(
    ".text",
    { opacity: 0 },
    {
        opacity: 1, scrollTrigger: {
            scrub: true,
            start: "50%",
            end: "60%",
        },
        onComplete: () => {
            gsap.to(".text",
                { opacity: 0 }
            );
        }
    }
);


images[0].onload = render



function render() {

    context.canvas.width = images[0].width;
    context.canvas.height = images[0].height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[ball.frame], 0, 0);
}