export default function delay(t:number) {
    return new Promise(resolve => setTimeout(resolve, t));
}