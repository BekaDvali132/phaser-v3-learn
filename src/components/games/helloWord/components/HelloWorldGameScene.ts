import Phaser from "phaser";
import {PhaserLabsBaseURL} from "../../../../utils/environmentContasnts.ts";

export class HelloWorldGameScene extends Phaser.Scene {

    preload() {
        this.load.setBaseURL(PhaserLabsBaseURL);

        this.load.image('logo', new URL('/images/png/plinkoLemon.png', import.meta.url).href);
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    create() {
        this.add.image(400, 300, 'sky');

        const particles = this.add.particles(0, 0, 'red', {
            speed: 100,
            scale: {start: 0.1, end: 0},
            blendMode: 'ADD'
        });

        const logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(0.5, 0.3);
        logo.setCollideWorldBounds(true);

        particles.startFollow(logo)
    }

}

