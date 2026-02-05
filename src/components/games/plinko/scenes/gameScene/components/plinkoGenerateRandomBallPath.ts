
export function plinkoGenerateRandomBallPath(size: number): number[] {
    return Array.from({ length: size }, () => Math.random() < 0.5 ? 0 : 1);
}
export function plinkoGenerateRandomBallPathFixed(rows: number): number[] {
    const slots = rows + 1
    // იწყება 0-დან რომელიც არის მარცხენა უკიდურესი მხარე და ადის row მდე
    const destination = Math.floor(Math.random() * slots)

    const rights = destination
    const lefts = rows - destination
    const path = [
        ...Array(rights).fill(1),
        ...Array(lefts).fill(0)
    ]

    for (let i = path.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[path[i], path[j]] = [path[j], path[i]]
    }

    return path
}
