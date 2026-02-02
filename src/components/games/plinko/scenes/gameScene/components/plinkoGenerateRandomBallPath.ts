
export default function plinkoGenerateRandomBallPath(size: number): number[] {
    return Array.from({ length: size }, () => Math.random() < 0.5 ? 0 : 1);
}
