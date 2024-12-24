import { makeSonic } from "../entities/sonic";
import k from "../kaplayCtx";

export default function game() {
    k.setGravity(3100);

    const bgPieceWidth = 1920;
    const platformWidth = 1280;
    let gameSpeed = 300;

    const bgPieces = createBackgroundPieces();
    const platforms = createPlatforms();

    const sonic = makeSonic(k.vec2(200, 745));
    sonic.setControls();
    sonic.setEvents();

    k.loop(1, () => {
        gameSpeed += 50;
    });

    k.add([
        k.rect(1920, 300),
        k.opacity(0),
        k.area(),
        k.pos(0, 832),
        k.body({ isStatic: true }),
    ]);

    k.onUpdate(() => {
        updateBackground(bgPieces, bgPieceWidth, sonic);
        updatePlatforms(platforms, platformWidth, gameSpeed);
    });

    function createBackgroundPieces() {
        return [
            k.add([
                k.sprite("chemical-bg"),
                k.pos(0, 0),
                k.scale(2),
                k.opacity(0.8),
            ]),
            k.add([
                k.sprite("chemical-bg"),
                k.pos(bgPieceWidth * 2, 0),
                k.scale(2),
                k.opacity(0.8),
            ]),
        ];
    }

    function createPlatforms() {
        return [
            k.add([
                k.sprite("platforms"),
                k.pos(0, 450),
                k.scale(4),
            ]),
            k.add([
                k.sprite("platforms"),
                k.pos(platformWidth * 4, 450),
                k.scale(4),
            ]),
        ];
    }

    function updateBackground(bgPieces, bgPieceWidth, sonic) {
        if (bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
            bgPieces.push(bgPieces.shift());
        }

        bgPieces[0].move(-100, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

        bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 10 - 50);
        bgPieces[1].moveTo(bgPieces[1].pos.x, -sonic.pos.y / 10 - 50);
    }

    function updatePlatforms(platforms, platformWidth, gameSpeed) {
        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
            platforms.push(platforms.shift());
        }

        platforms[0].move(-gameSpeed, 0);
        platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
    }
}