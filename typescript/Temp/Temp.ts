export class Temporary {
    public static pringMessage(message: string): void {
        console.log(`Message: ${message}`);
    }
}

console.log(Temporary.pringMessage('hello'));