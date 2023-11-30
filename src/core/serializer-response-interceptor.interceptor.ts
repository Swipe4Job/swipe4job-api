import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { implementsSerializer } from '../shared/domain/Serializer';

/**
 * Intercepts responses that implements Serializer interface
 * and returns the value serialized
 */
@Injectable()
export class SerializerResponseInterceptorInterceptor
  implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        if (implementsSerializer(value)) {
          return value.serialize();
        }
        return value;
      }),
    );
  }
}
