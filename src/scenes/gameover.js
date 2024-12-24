import k from "../kaplayCtx";

export default function gameover(citySfx) {
    citySfx.paused = true;

    const score = k.getData("current-score") || 0;
    let bestScore = k.getData("bestScore") || 0;

    if (score > bestScore) {
        bestScore = score;
        k.setData("bestScore", bestScore);
    }

    k.add([
        k.text(`GAME OVER`, { font: "mania", size: 100 }),
        k.pos(k.center().x, 200),
        k.anchor("center"),
    ]);

    k.add([
        k.text(`SCORE: ${score}`, { font: "mania", size: 72 }),
        k.pos(k.center().x, k.center().y - 100),
        k.anchor("center"),
    ]);

    k.add([
        k.text(`BEST SCORE: ${bestScore}`, { font: "mania", size: 72 }),
        k.pos(k.center().x, k.center().y),
        k.anchor("center"),
    ]);

    k.add([
        k.text(`Press Space/Click to Restart`, { font: "mania", size: 50 }),
        k.pos(k.center().x, k.center().y + 200),
        k.anchor("center"),
    ]);

    k.onButtonPress("jump", () => {
        k.go("game");
    });
}