export interface ObjectConverterInterface {
    convert: <T>(data: string) => T;
}