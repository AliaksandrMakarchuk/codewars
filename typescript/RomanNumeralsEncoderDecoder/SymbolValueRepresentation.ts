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
