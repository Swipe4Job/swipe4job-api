import { UserAuthToken } from './users/UserAuthToken';
import { UserAuthTokenCriteria } from './UserAuthTokenCriteria';

export abstract class UserAuthTokensRepository {
  /**
   * Search for UserAuthTokens and if no tokens are found throws an error
   * @param criteria
   */
  abstract find(criteria: UserAuthTokenCriteria): Promise<UserAuthToken[]>;

  /**
   * Search for UserAuthTokens and if no tokens are found throws an error
   * @param criteria
   */
  abstract search(
    criteria: UserAuthTokenCriteria,
  ): Promise<UserAuthToken[] | undefined>;

  /**
   * Create new token if it doesn't exist. Updates provided token if it exists
   * @param userAuthToken
   */
  abstract save(userAuthToken: UserAuthToken): Promise<void>;

  /**
   * Remove tokens with provided criteria
   * @param criteria
   */
  abstract delete(criteria: UserAuthTokenCriteria): Promise<void>;
}
