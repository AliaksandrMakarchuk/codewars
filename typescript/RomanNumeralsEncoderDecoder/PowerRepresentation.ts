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
        return `[${this._value}, ${this._power}]`;
    }
}
