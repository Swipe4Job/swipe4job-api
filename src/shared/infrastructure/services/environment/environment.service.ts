import { Injectable } from '@nestjs/common';
import schema from './schema.json';
import { MissingEnvironmentVariable } from '../../../domain/MissingEnvironmentVariable';
import { InvalidEnvironmentVariable } from '../../../domain/InvalidEnvironmentVariable';

export interface EnvironmentVariables {
  DATABASE_URL: string,
  PORT: number,
}

@Injectable()
export class EnvironmentService {
  private _loaded: boolean = false;
  private _environmentVariables: EnvironmentVariables = {
    DATABASE_URL: '',
    PORT: 3000
  };

  public get ENV(): EnvironmentVariables {
    if (!this._loaded) {
      for (const [varName, schemaValue] of Object.entries(schema)) {
        const providedValue = process.env[varName];
        if (schemaValue.required && !providedValue) {
          throw new MissingEnvironmentVariable(`Missing environment variable ${varName}`);
        }

        if (!providedValue) {
          continue;
        }

        switch (schemaValue.type) {
          case 'string':
            (this._environmentVariables as any)[varName] = providedValue;
            break;
          case 'integer':
            const number = parseInt(providedValue);
            if (isNaN(number)) {
              throw new InvalidEnvironmentVariable(`Invalid environment variable ${varName}`);
            }
            (this._environmentVariables as any)[varName] = (providedValue);
            break;
          // TODO add more cases
        }
      }
    }

    return this._environmentVariables!;
  }
}
