import {User} from "./User";
import {UserCriteria} from "./UserCriteria";

export interface UserRepository {
    /**
     * Find takes a criteria and search for users that match that criteria.
     * In case that a user is not found then throws an error.
     * @throws UserNotFound
     * @param criteria
     */
    find(criteria: UserCriteria): Promise<Array<User>>;

    /**
     * Takes a criteria and returns matching users. If no users found then return undefined
     * @param criteria
     */
    search(criteria: UserCriteria): Promise<Array<User> | undefined>;

    /**
     * Takes a user. Checks if that user exists and if exists, update it.
     * If not exists create a new one.
     * @param user
     */
    save(user: User): Promise<void>;

    /**
     * Takes a criteria and remove users that match that criteria
     * @param criteria
     */
    delete(criteria: UserCriteria): Promise<void>;
}