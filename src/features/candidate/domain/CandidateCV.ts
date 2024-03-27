import { Study } from './Studies';
import { LanguageSkill } from './LanguageSkill';
import { JobExperience } from './JobExperience';
import { SoftSkills } from '../../offer/domain/SoftSkills';
import { Serializer } from '../../../shared/domain/Serializer';
import { CandidateCVId } from './CandidateCVId';
import { UserId } from '../../users/domain/UserID/UserId';

export class CandidateCV implements Serializer {
  constructor(params: {
    id: CandidateCVId;
    candidateId: UserId;
    description: string;
    studies: Array<Study>;
    softSkills: Set<SoftSkills>;
    name: string;
    lastname: string;
    location: string;
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

  private _description: string;

  get description(): string {
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

  private _name: string;

  get name(): string {
    return this._name;
  }

  private _lastname: string;

  get lastname(): string {
    return this._lastname;
  }

  private _location: string;

  get location(): string {
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

  withDescription(value: string) {
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

  withName(value: string) {
    this._name = value;
    return this;
  }

  withLastname(value: string) {
    this._lastname = value;
    return this;
  }

  withLocation(value: string) {
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

  serialize() {
    return {
      languages: this.languages.map((l) => l.value),
      jobExperiences: this.jobExperiences.map((j) => j.value),
      name: this.name,
      lastname: this.lastname,
      location: this.location,
      studies: this.studies.map((s) => s.value),
      description: this.description,
      softSkills: Array.from(this.softSkills).map((s) => s.value),
    };
  }
}
