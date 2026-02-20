import type {PlinkoGameSoundsType} from "../PlinkoGameScene.ts";

interface Props {
  turnOn: boolean;
  sounds: PlinkoGameSoundsType;
}

export function plinkoToggleMusic({turnOn, sounds}: Props) {
  if (sounds?.background) {
    if (turnOn) {
      sounds.background.setMute(true)
    } else {
      sounds.background.setMute(false)
    }
  }
}
