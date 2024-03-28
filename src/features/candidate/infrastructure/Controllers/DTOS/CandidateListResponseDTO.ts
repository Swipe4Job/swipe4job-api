import { CandidateCV } from '../../../domain/CandidateCV';

export class CandidateListResponseDTO {
  description: string;
  studies: {
    school: string;
    endDate: string | undefined;
    name: string;
    startDate: string;
  }[];
  softSkills: string[];
  name: string;
  lastname: string;
  location: string;
  languages: {
    level: string;
    language: string;
    academicTitle: string | undefined;
  }[];
  jobExperiences: {
    endDate: string | undefined;
    description: string;
    company: string;
    position: string;
    startDate: string;
  }[];
  constructor(candidate: CandidateCV) {
    const {
      description,
      studies,
      softSkills,
      name,
      lastname,
      location,
      languages,
      jobExperiences,
    } = candidate.serialize();
    this.description = description;
    this.studies = studies;
    this.softSkills = softSkills;
    this.name = name;
    this.lastname = lastname;
    this.location = location;
    this.languages = languages;
    this.jobExperiences = jobExperiences;
  }
}
