import { gameEvents } from "./gameEvents.ts";

// Map to store pending ball test promises by ball ID
const pendingBallTests: Map<number, {
    expectedDestination: number;
    pathArray: number[];
    resolve: () => void;
}> = new Map();

// Calculate expected destination from path array
export function calculateDestinationFromPath(pathArray: number[], size: number): number {
    if (pathArray.length !== size) {
        throw new Error(`Path array length ${pathArray.length} does not match expected size ${size}`);
    }
    
    let finalPoint = 7;
    for (let i = 0; i < pathArray.length; i++) {
        const direction = (pathArray[i] === 1) ? 0 : -1;
        finalPoint = finalPoint + direction;
    }
    
    return finalPoint;
}

export function registerBallTest(ballId: number, pathArray: number[], size: number): Promise<void> {
    const expectedDestination = calculateDestinationFromPath(pathArray, size);
    
    return new Promise((resolve) => {
        pendingBallTests.set(ballId, {
            expectedDestination,
            pathArray,
            resolve
        });
    });
}

export function onBallArrival(ballId: number, actualSideIndex: number): void {
    const pendingTest = pendingBallTests.get(ballId);
    
    if (pendingTest) {
        const { expectedDestination, pathArray, resolve } = pendingTest;
        
        if(expectedDestination !== actualSideIndex){ 
        console.log(`შედეგი: ${actualSideIndex} | მიზანი: ${expectedDestination} | path: [${pathArray.join(',')}] ✗ FAILED}`);
        }
        pendingBallTests.delete(ballId);
        resolve();
    } else {
        console.log(`[Test] Ball ${ballId} arrived at ${actualSideIndex} (no test registered)`);
    }
}

gameEvents.on('ballArrivedAtMultiplier', (ballId: number, sideIndex: number) => {
    onBallArrival(ballId, sideIndex);
});