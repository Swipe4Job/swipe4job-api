import { CompanyCriteria } from './CompanyCriteria';
import { Company } from '../Company';

export abstract class CompanyRepository {
  /**
   * Find takes a criteria and search for companies that match that criteria.
   * In case that a company is not found then throws an error.
   * @throws CompanyNotFound
   * @param criteria
   */
  abstract find(criteria: CompanyCriteria): Promise<Array<Company>>;

  /**
   * Takes a criteria and returns matching companies. If no companies found then return undefined
   * @param criteria
   */
  abstract search(
    criteria: CompanyCriteria,
  ): Promise<Array<Company> | undefined>;

  /**
   * Takes a company. Checks if that company exists and if exists, update it.
   * If not exists create a new one.
   * @param company
   */
  abstract save(company: Company): Promise<void>;

  /**
   * Takes a criteria and remove companies that match that criteria
   * @param criteria
   */
  abstract delete(criteria: CompanyCriteria): Promise<void>;
}
