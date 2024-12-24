import k from './kaplayCtx';
import game from './scenes/game';
import mainMenu from './scenes/mainMenu';

k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
k.loadSprite("platforms", "graphics/platforms.png");
k.loadSprite("Sonic", "graphics/sonic.png", {
    sliceX: 8,
    sliceY: 2,
    anims: {
        run: { from: 0, to: 7, loop: true, speed: 30 },
        jump: { from: 8, to: 15, loop: true, speed: 100 },
    },
    flipX: true,
    flipY: true,
});
k.loadSprite("ring", "graphics/ring.png", {
    sliceX: 16,
    sliceY: 1,
    anims: {
        spin: { from: 0, to: 15, loop: true, speed: 30 },
    }
});
k.loadSprite("motobug", "graphics/motobug.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
        run: { from: 0, to: 4, loop: true, speed: 8 },
    }
});

k.loadFont("mania", "fonts/mania.ttf");
k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("city", "sounds/city.mp3");
k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyperRing", "sounds/HyperRing.wav");

k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("gameover", () => {});

k.go("main-menu");