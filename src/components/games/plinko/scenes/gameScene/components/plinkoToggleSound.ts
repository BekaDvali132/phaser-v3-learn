import type {PlinkoGameSoundsType} from "../PlinkoGameScene.ts";

interface Props {
  turnOn: boolean;
  sounds: PlinkoGameSoundsType;
}

export function plinkoToggleSound({turnOn, sounds}: Props) {
  if (sounds?.success) {
    if (turnOn) {
      sounds.success.setMute(true)
    } else {
      sounds.success.setMute(false)
    }
  }
}
