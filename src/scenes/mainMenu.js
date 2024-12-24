import { makeSonic } from "../entities/sonic";
import k from "../kaplayCtx";

export default function mainMenu() {
    if (!k.getData("bestScore")) {
        k.setData("bestScore", 0);
    }

    k.onButtonPress("jump", () => {
        k.go("game");
    });

    const bgPieceWidth = 1920;
    const platformWidth = 1280;

    const bgPieces = createBackgroundPieces();
    const platforms = createPlatforms();

    k.add([
        k.text("Sonic Runner", { font: "mania", size: 100 }),
        k.pos(k.center().x, 200),
        k.anchor("center"),
    ]);

    k.add([
        k.text("Press Space/Click/Touch to Play", { font: "mania", size: 50 }),
        k.pos(k.center().x, k.center().y - 200),
        k.anchor("center"),
    ]);

    const sonic = makeSonic(k.vec2(200, 745));
    sonic.setControls();

    k.onUpdate(() => {
        updateBackground(bgPieces, bgPieceWidth);
        updatePlatforms(platforms, platformWidth);
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

    function updateBackground(bgPieces, bgPieceWidth) {
        if (bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
            bgPieces.push(bgPieces.shift());
        }

        bgPieces[0].move(-100, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);
    }

    function updatePlatforms(platforms, platformWidth) {
        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
            platforms.push(platforms.shift());
        }

        platforms[0].move(-4000, 0);
        platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
    }
}