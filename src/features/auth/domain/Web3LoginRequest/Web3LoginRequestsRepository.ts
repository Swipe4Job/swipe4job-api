import { Web3LoginRequestCriteria } from './Web3LoginRequestCriteria';
import { Web3LoginRequest } from './Web3LoginRequest';

export abstract class Web3LoginRequestsRepository {
  abstract find(
    criteria: Web3LoginRequestCriteria,
  ): Promise<Web3LoginRequest[]>;
  abstract search(
    criteria: Web3LoginRequestCriteria,
  ): Promise<Web3LoginRequest[] | undefined>;
  abstract save(request: Web3LoginRequest): Promise<void>;
  abstract delete(criteria: Web3LoginRequestCriteria): Promise<void>;
}
