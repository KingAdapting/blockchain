import { ObjectConverterInterface } from '../infrastructure/ObjectConverterInterface';
import { injectable } from "inversify";

@injectable()
export class JsonToObjectConverter implements ObjectConverterInterface
{
    public convert<T>(data: string): T
    {
        try {
            return JSON.parse(data)
        } catch (e) {
            return null;
        }
    }
}