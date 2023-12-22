import { implementsSerializer, Serializer } from '../domain/Serializer';
import { ErrorCode } from '../domain/ApplicationError/ErrorCode';

export class HttpResponse implements Serializer {
  protected constructor(
    public readonly message: string,
    public readonly success: boolean,
  ) {}

  private _data?: any;

  public get data() {
    return this._data;
  }

  private _errorCode?: ErrorCode;

  public get errorCode() {
    return this._errorCode;
  }

  public static success(message: string): HttpResponse {
    return new HttpResponse(message, true);
  }

  public static failure(message: string, errorCode: ErrorCode): HttpResponse {
    return new HttpResponse(message, false);
  }

  withData(data: unknown): HttpResponse {
    if (implementsSerializer(data)) {
      this._data = data.serialize();
      return this;
    }
    this._data = data;
    return this;
  }

  serialize() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
      errorCode: this.errorCode,
    };
  }
}
