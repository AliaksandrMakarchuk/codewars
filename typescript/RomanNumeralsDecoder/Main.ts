export function solution(roman: string): number {
    // complete the solution by transforming the
    // string roman numeral into an integer
    return 0;
}

export class PowerRepresentation {
    private _power: number;
    private _value: number;

    public get Power(): number {
        return this._power;
    }

    public get Value(): number {
        return this._value;
    }

    constructor(value: number, power: number) {
        this._value = value;
        this._power = power;
    }
}

export class SymbolValueRepresentation {
    private _symbol: string;
    private _value: number;

    public get Symbol(): string {
        return this._symbol;
    }

    public get Value(): number {
        return this._value;
    }

    constructor(symbol: string, value: number) {
        this._symbol = symbol;
        this._value = value;
    }
}

export class RomanNumeralsDecoderHelper {
    private static _romanSymbolToNumberMap: Array<SymbolValueRepresentation> = [
        new SymbolValueRepresentation("I", 1),
        new SymbolValueRepresentation("V", 5),
        new SymbolValueRepresentation("X", 10),
        new SymbolValueRepresentation("L", 50),
        new SymbolValueRepresentation("C", 100),
        new SymbolValueRepresentation("D", 500),
        new SymbolValueRepresentation("M", 1000)
    ];

    public static getCorrespondingValueBySymbol(symbol: string): number {
        let symbolValueRepresentation: SymbolValueRepresentation | undefined = this._romanSymbolToNumberMap.find(x => x.Symbol == symbol);

        if (symbolValueRepresentation == undefined) {
            throw new Error(`Could not found value for symbol "${symbol}"`);
        }

        return symbolValueRepresentation.Value;
    }
}