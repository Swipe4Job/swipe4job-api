import { Study } from './Studies';
import { LanguageSkill } from './LanguageSkill';
import { JobExperience } from './JobExperience';
import { SoftSkills } from '../../offer/domain/SoftSkills';
import { Serializer } from '../../../shared/domain/Serializer';
import { CandidateCVId } from './CandidateCVId';
import { UserId } from '../../users/domain/UserID/UserId';
import { CandidateDescription } from './CandidateDescription';
import { CandidateName } from './CandidateName';
import { CandidateLastName } from './CandidateLastName';
import { CandidateLocation } from './CandidateLocation';

export class CandidateCV implements Serializer {
  constructor(params: {
    id: CandidateCVId;
    candidateId: UserId;
    description: CandidateDescription;
    studies: Array<Study>;
    softSkills: Set<SoftSkills>;
    name: CandidateName;
    lastname: CandidateLastName;
    location: CandidateLocation;
    languages: Array<LanguageSkill>;
    jobExperiences: Array<JobExperience>;
  }) {
    this._id = params.id;
    this._candidateId = params.candidateId;
    this._description = params.description;
    this._studies = params.studies;
    this._softSkills = params.softSkills;
    this._name = params.name;
    this._lastname = params.lastname;
    this._location = params.location;
    this._languages = params.languages;
    this._jobExperiences = params.jobExperiences;
  }

  private _id: CandidateCVId;

  get id(): CandidateCVId {
    return this._id;
  }

  private _candidateId: UserId;

  get candidateId(): UserId {
    return this._candidateId;
  }

  private _description: CandidateDescription;

  get description(): CandidateDescription {
    return this._description;
  }

  private _studies: Array<Study>;

  get studies(): Array<Study> {
    return this._studies;
  }

  private _softSkills: Set<SoftSkills>;

  get softSkills(): Set<SoftSkills> {
    return this._softSkills;
  }

  private _name: CandidateName;

  get name(): CandidateName {
    return this._name;
  }

  private _lastname: CandidateLastName;

  get lastname(): CandidateLastName {
    return this._lastname;
  }

  private _location: CandidateLocation;

  get location(): CandidateLocation {
    return this._location;
  }

  private _languages: Array<LanguageSkill>;

  get languages(): Array<LanguageSkill> {
    return this._languages;
  }

  private _jobExperiences: Array<JobExperience>;

  get jobExperiences(): Array<JobExperience> {
    return this._jobExperiences;
  }

  withCandidateId(value: UserId) {
    this._candidateId = value;
    return this;
  }

  withId(value: CandidateCVId) {
    this._id = value;
    return this;
  }

  withDescription(value: CandidateDescription) {
    this._description = value;
    return this;
  }

  withStudies(value: Array<Study>) {
    this._studies = value;
    return this;
  }

  withSoftskills(value: Set<SoftSkills>) {
    this._softSkills = value;
    return this;
  }

  withName(value: CandidateName) {
    this._name = value;
    return this;
  }

  withLastname(value: CandidateLastName) {
    this._lastname = value;
    return this;
  }

  withLocation(value: CandidateLocation) {
    this._location = value;
    return this;
  }

  withLanguages(value: Array<LanguageSkill>) {
    this._languages = value;
    return this;
  }

  withJobExperiences(value: Array<JobExperience>) {
    this._jobExperiences = value;
    return this;
  }
  public static async create(params: {
    candidateId: string;
    description: string;
    studies: Array<string>;
    softSkills: Set<string>;
    name: string;
    lastname: string;
    location: string;
    languages: Array<string>;
    jobExperiences: Array<string>;
  }) {
    return new CandidateCV({
      id: CandidateCVId.random(),
      candidateId: new UserId(params.candidateId),
      description: new CandidateDescription(params.description),
      studies: new Array<Study>(),
      softSkills: new Set<SoftSkills>(),
      name: new CandidateName(params.name),
      lastname: new CandidateLastName(params.name),
      location: new CandidateLocation(params.location),
      languages: new Array<LanguageSkill>(),
      jobExperiences: new Array<JobExperience>(),
    });
  }

  serialize() {
    return {
      languages: this.languages.map((l) => l.serialize()),
      jobExperiences: this.jobExperiences.map((j) => j.serialize()),
      name: this.name.value,
      lastname: this.lastname.value,
      location: this.location.value,
      studies: this.studies.map((s) => s.serialize()),
      description: this.description.value,
      softSkills: Array.from(this.softSkills).map((s) => s.value),
    }; //aquest es el meu modificat per si no es pot tocar i es fa de una altre manera
  }
  // serialize() {
  //   return {
  //     languages: this.languages.map((l) => l.serialize()),
  //     jobExperiences: this.jobExperiences.map((j) => j.serialize()),
  //     name: this.name,
  //     lastname: this.lastname,
  //     location: this.location,
  //     studies: this.studies.map((s) => s.serialize()),
  //     description: this.description,
  //     softSkills: Array.from(this.softSkills).map((s) => s.value),
  //   };
  // }
}
