import { GameState, ButtonState, ButtonType, Colours, Gameplay } from './constants';

export default class Button {
	id: ButtonType;

	x: number;
	y: number;

	r: number;
	g: number;
	b: number;

	state: ButtonState = ButtonState.Idle;
	sound: HTMLAudioElement;

	baseRadius: number;
	currentRadius: number;

	constructor(id: ButtonType, colour: number[], x: number, y: number, sound: HTMLAudioElement) {
		this.id = id;
		this.r = colour[0];
		this.g = colour[1];
		this.b = colour[2];

		this.x = x;
		this.y = y;

		this.sound = sound;

		this.baseRadius = this.currentRadius = innerWidth < Gameplay.MOB_WIDTH ?
			Gameplay.BASE_RADIUS_MOB :
			Gameplay.BASE_RADIUS;
	}

	public resize(): void {
		switch (this.state) {
			case ButtonState.Growing:
				this.currentRadius += Gameplay.GROWTH_SPEED;
				if (this.currentRadius >= this.baseRadius + Gameplay.GROWTH_AMOUNT) {
					this.state = ButtonState.Shrinking
				}
				break;
			case ButtonState.Shrinking:
				this.currentRadius -= Gameplay.GROWTH_SPEED;
				if (this.currentRadius <= this.baseRadius) {
					this.state = ButtonState.Idle
				}
				break;
			default:
				break;
		}
	}

	public checkClick(x: number, y: number): boolean {
		let dist = Math.sqrt((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y));

		if (dist <= this.currentRadius && this.state === ButtonState.Idle) {
			return true;
		}

		return false;
	}

	public select() {
		this.state = ButtonState.Growing;
		this.sound.play();
	}
}