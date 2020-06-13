import { PowerRepresentation } from "./PowerRepresentation";
import { SymbolValueRepresentation } from "./SymbolValueRepresentation";

export class RomanNumeralsEncoderDecoder {
    public static toRoman(value: number): string {
        let powerRepresentationMap: Array<PowerRepresentation> = RomanNumeralsEncoderDecoderHelper.getPowerRepresentationMap(value);

        let result: string = '';

        powerRepresentationMap.map(x => {
            if (RomanNumeralsEncoderDecoderHelper.isValidValue(x.Value)) {
                result += RomanNumeralsEncoderDecoderHelper.getCorrectSymbol(x.Value * x.Power);
            } else {
                let validPowerRepresentationMap = RomanNumeralsEncoderDecoderHelper.getValidPowerRepresentationMap(x);
                validPowerRepresentationMap.map(y => result += RomanNumeralsEncoderDecoderHelper.getCorrectSymbol(y.Value * y.Power));
            }
        });

        return result;
    }

    public static fromRoman(value: string): number {
        if (value.length < 1) {
            throw new Error("Value should be meaningful");
        }

        let previous: number = 0;
        let current: number = 0;
        let result: number = 0;

        for (let i = 0; i < value.length; i++) {
            current = RomanNumeralsEncoderDecoderHelper.getCorrespondingValueBySymbol(value[i]);
            if (i > 0 && current > previous) {
                result -= previous;
                result += current - previous;
            } else {
                result += current;
            }

            previous = current;
        }

        return result;
    }
}

export class RomanNumeralsEncoderDecoderHelper {
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

        if (representation == undefined) {
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

    public static getCorrespondingValueBySymbol(symbol: string): number {
        let symbolValueRepresentation: SymbolValueRepresentation | undefined = this._romanSymbolToNumberMap.find(x => x.Symbol == symbol);

        if (symbolValueRepresentation == undefined) {
            throw new Error(`Could not found value for symbol "${symbol}"`);
        }

        return symbolValueRepresentation.Value;
    }
}