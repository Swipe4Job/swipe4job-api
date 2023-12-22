import { CityCriteria } from './CityCriteria';
import { City } from './City';

export abstract class CitiesRepository {
  /**
   * Search for cities and if not cities are found throws {@link CityNotFound} error
   * @param criteria
   */
  abstract find(criteria: CityCriteria): Promise<City[]>;

  /**
   * Search for cities and if no cities are found returns undefined
   * @param criteria
   */
  abstract search(criteria: CityCriteria): Promise<City[] | undefined>;

  /**
   * Save provided city. If no city exists creates a new one. If it already exists
   * update it.
   * @param city
   */
  abstract save(city: City): Promise<void>;

  /**
   * Remove cities with provided criteria
   * @param city
   */
  abstract delete(city: City): Promise<void>;
}
