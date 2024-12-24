import k from '../kaplayCtx';

export function makeSonic(pos) {
    const sonic = k.add([
        k.sprite("Sonic", { anim: "run" }),
        k.scale(4),
        k.area(),
        k.body({ jumpForce: 1700 }),
        k.anchor("center"),
        k.pos(pos),
        {
            isFlipped: false,
            setControls() {
                k.onButtonPress("jump", () => {
                    if (this.isGrounded()) {
                        this.play("jump");
                        this.jump();
                        k.play("jump", { volume: 0.5 });
                    }
                });

                k.onButtonDown("left", () => {
                    if (this.pos.x > 0) {
                        if (!this.isFlipped) {
                            this.flipX = true;
                            this.isFlipped = true;
                        }
                        this.move(-200, 0);
                    }
                });

                k.onButtonDown("right", () => {
                    if (this.pos.x < k.width()) {
                        if (this.isFlipped) {
                            this.flipX = false;
                            this.isFlipped = false;
                        }
                        this.move(200, 0);
                    }
                });

                k.onButtonRelease("left", () => {
                    if (this.isFlipped) {
                        this.flipX = false;
                        this.isFlipped = false;
                    }
                });

                k.onButtonRelease("right", () => {
                    if (this.isGrounded()) {
                        this.play("run");
                    }
                });
            },
            setEvents() {
                this.onGround(() => {
                    this.play("run");
                    this.flipX = false;
                    this.isFlipped = false;
                });
            },
        },
    ]);
    return sonic;
}