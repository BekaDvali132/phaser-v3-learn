interface Props {
    scene: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
    cageBalls: Phaser.Physics.Matter.Image[];
    cageCenterX: number;
    cageCenterY: number;
    cageRadius: number;
}

export default function plinkoUpdateCageBalls({ scene, cageBalls, cageCenterX, cageCenterY, cageRadius }: Props): void {
    cageBalls.forEach(ball => {
        const body = ball.body as MatterJS.BodyType;
        if (!body) return;

        const maxSpeed = 6;
        const dx = body.position.x - cageCenterX;
        const dy = body.position.y - cageCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
        if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            scene.matter.body.setVelocity(body, {
                x: body.velocity.x * scale,
                y: body.velocity.y * scale
            });
        }

        // If ball escapes cage, teleport it back
        if (dist > cageRadius - 10) {
            const pushBack = (cageRadius - 20) / dist;
            scene.matter.body.setPosition(body, {
                x: cageCenterX + dx * pushBack,
                y: cageCenterY + dy * pushBack
            });
            scene.matter.body.setVelocity(body, {
                x: -body.velocity.x * 0.5,
                y: -body.velocity.y * 0.5
            });
        }

        scene.matter.body.applyForce(body, body.position, {
            x: (Math.random() - 0.4) * 0.0001,
            y: -0.0003
        });

        // Chaotic tangential force - random direction each frame
        const force = 0.0002 + Math.random() * 0.0002;
        const randomDir = Math.random() < 0.5 ? 1 : -1;
        scene.matter.body.applyForce(body, body.position, {
            x: -dy / dist * force * randomDir,
            y: dx / dist * force * randomDir
        });

        if (Math.random() < 0.15) {
            const angle = Math.random() * Math.PI * 2;
            const impulse = 0.003 + Math.random() * 0.004;
            scene.matter.body.applyForce(body, body.position, {
                x: Math.cos(angle) * impulse,
                y: Math.sin(angle) * impulse
            });
        }

        if (Math.random() < 0.02) {
            const kickAngle = Math.random() * Math.PI * 2;
            const kickSpeed = 4 + Math.random() * 3;
            scene.matter.body.setVelocity(body, {
                x: Math.cos(kickAngle) * kickSpeed,
                y: Math.sin(kickAngle) * kickSpeed
            });
        }

        if (speed < 1.5) {
            const kickAngle = Math.random() * Math.PI * 2;
            const kickSpeed = 3 + Math.random() * 3;
            scene.matter.body.setVelocity(body, {
                x: Math.cos(kickAngle) * kickSpeed,
                y: Math.sin(kickAngle) * kickSpeed
            });
        }
    });
}