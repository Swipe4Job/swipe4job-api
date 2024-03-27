import { LanguageLevel } from './LanguageLevel';
import { InvalidArgument } from '../../../shared/domain/InvalidArgument';
import { Serializer } from '../../../shared/domain/Serializer';

export class LanguageSkill implements Serializer {
  private static languages = [
    'ARABIC',
    'BENGALI',
    'CHINESE',
    'CZECH',
    'DANISH',
    'DUTCH',
    'ENGLISH',
    'ESTONIAN',
    'FINNISH',
    'FRENCH',
    'GERMAN',
    'GREEK',
    'HEBREW',
    'HINDI',
    'HUNGARIAN',
    'INDONESIAN',
    'ITALIAN',
    'JAPANESE',
    'KOREAN',
    'LATVIAN',
    'LITHUANIAN',
    'MALAY',
    'NORWEGIAN',
    'POLISH',
    'PORTUGUESE',
    'ROMANIAN',
    'RUSSIAN',
    'SLOVAK',
    'SLOVENIAN',
    'SPANISH',
    'SWEDISH',
    'THAI',
    'TURKISH',
    'UKRAINIAN',
    'VIETNAMESE',
    'OTHER',
  ];

  constructor(params: {
    language: string;
    level: string;
    academicTitle?: string;
  }) {
    if (!LanguageSkill.languages.includes(params.language)) {
      throw new InvalidArgument('Language not allowed');
    }

    this._academicTitle = params.academicTitle;
    this._level = LanguageLevel.from(params.level);
    this._language = params.language;
  }

  private _language: string;

  get language(): string {
    return this._language;
  }

  private _level: LanguageLevel;

  get level(): LanguageLevel {
    return this._level;
  }

  private _academicTitle?: string;

  get academicTitle(): string | undefined {
    return this._academicTitle;
  }

  public static fromJSON(json: any): LanguageSkill {
    return new LanguageSkill({
      language: json.language,
      level: json.level,
      academicTitle: json.academicTitle,
    });
  }

  withLanguage(value: string) {
    if (!LanguageSkill.languages.includes(value)) {
      throw new InvalidArgument('Language not allowed');
    }
    this._language = value;
    return this;
  }

  withLevel(value: LanguageLevel) {
    this._level = value;
  }

  withAcademicTitle(value: string) {
    this._academicTitle = value;
  }

  serialize() {
    return {
      language: this.language,
      academicTitle: this.academicTitle,
      level: this.level.value,
    };
  }
}
