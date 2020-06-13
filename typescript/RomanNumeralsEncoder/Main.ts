export function solution(number: number): string {
    // convert the number to a roman numeral
    return new RomanNumeralsEncoder().encode(number);
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

    public toString(): string {
        return `[${this._value}, ${this._power}]`
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

export class RomanNumeralsEncoder {
    public encode(value: number): string {
        let powerRepresentationMap: Array<PowerRepresentation> = RomanNumeralsEncoderHelper.getPowerRepresentationMap(value);

        let result: string = '';

        powerRepresentationMap.map(x => {
            if (RomanNumeralsEncoderHelper.isValidValue(x.Value)) {
                result += RomanNumeralsEncoderHelper.getCorrectSymbol(x.Value * x.Power);
            } else {
                let validPowerRepresentationMap = RomanNumeralsEncoderHelper.getValidPowerRepresentationMap(x);
                validPowerRepresentationMap.map(y => result += RomanNumeralsEncoderHelper.getCorrectSymbol(y.Value * y.Power));
            }
        });

        return result;
    }
}

export class RomanNumeralsEncoderHelper {
    private static _romanSymbolToNumberMap: Array<SymbolValueRepresentation> = [
        new SymbolValueRepresentation("I", 1),
        new SymbolValueRepresentation("V", 5),
        new SymbolValueRepresentation("X", 10),
        new SymbolValueRepresentation("L", 50),
        new SymbolValueRepresentation("C", 100),
        new SymbolValueRepresentation("D", 500),
        new SymbolValueRepresentation("M", 1000)
    ];

    public static getPowerRepresentationMap(value: number): Array<PowerRepresentation> {
        if (value < 0) {
            throw new Error(`The value should be positive: ${value}`);
        }

        let splitValue: Array<PowerRepresentation> = new Array<PowerRepresentation>();
        let length: number = value.toString().length;

        for (var i = length; i > 0; i--) {
            let currentPower: number = Math.pow(10, i - 1);
            let result: number = Math.floor(value / currentPower);
            if (result > 0) {
                splitValue.push(new PowerRepresentation(result, currentPower));
                value -= result * currentPower;
            }
        }

        return splitValue;
    }

    public static getCorrectSymbol(value: number): string {
        let representation: SymbolValueRepresentation | undefined = this._romanSymbolToNumberMap.find((v, i, m) => v.Value == value);

        if(representation == undefined) {
            throw new Error(`There is no representation for "${value}"`);
        }

        return representation.Symbol;
    }

    public static isValidValue(value: number): boolean {
        return value == 1 || value % 5 == 0;
    }

    public static getValidPowerRepresentationMap(powerRepresentation: PowerRepresentation): Array<PowerRepresentation> {
        let powerRepresentationMap: Array<PowerRepresentation> = new Array<PowerRepresentation>();

        switch (powerRepresentation.Value) {
            case 2:
                [1, 1].map(x => powerRepresentationMap.push(new PowerRepresentation(x, powerRepresentation.Power)));
                break;
            case 3:
                [1, 1, 1].map(x => powerRepresentationMap.push(new PowerRepresentation(x, powerRepresentation.Power)));
                break;
            case 4:
                [1, 5].map(x => powerRepresentationMap.push(new PowerRepresentation(x, powerRepresentation.Power)));
                break;
            case 6:
                [5, 1].map(x => powerRepresentationMap.push(new PowerRepresentation(x, powerRepresentation.Power)));
                break;
            case 7:
                [5, 1, 1].map(x => powerRepresentationMap.push(new PowerRepresentation(x, powerRepresentation.Power)));
                break;
            case 8:
                [5, 1, 1, 1].map(x => powerRepresentationMap.push(new PowerRepresentation(x, powerRepresentation.Power)));
                break;
            case 9:
                powerRepresentationMap.push(new PowerRepresentation(1, powerRepresentation.Power));
                powerRepresentationMap.push(new PowerRepresentation(1, powerRepresentation.Power * 10));
                break;
        }

        return powerRepresentationMap;
    }
}