import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UnexpectedError } from '../../../../shared/domain/ApplicationError/UnexpectedError';

export const InjectAuthToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const handler = ctx.getHandler();
    if (!request.authTokenPayload) {
      throw new UnexpectedError(
        `Auth token guard not applied to this route '${handler}'`,
      );
    }

    return request.authTokenPayload;
  },
);
