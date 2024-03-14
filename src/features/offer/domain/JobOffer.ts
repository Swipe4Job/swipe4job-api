import { JobType } from './JobType';
import { ContractType } from './ContractType';
import { WorkingDay } from './WorkingDay';
import { SalaryRange } from './SalaryRange';
import { JobOfferId } from './JobOfferId';
import { UserId } from '../../users/domain/UserID/UserId';

export class JobOffer {
  private _id: JobOfferId;

  get id(): string {
    return this._id.value;
  }
  withId(id: string) {
    this._id = new JobOfferId(id);
    return this;
  }

  private _recuireterId: UserId;
  get recruiterId(): string {
    return this._recuireterId.value;
  }

  withRecruiterId(id: UserId): JobOffer {
    this._recuireterId = id;
    return this;
  }

  constructor(params: {
    title: string;
    recruiterId: string;
    companyName: string;
    description: string;
    responsibilities: string;
    requirements: string;
    jobType: string;
    contractType: string;
    workingDay: string;
    skills: string[];
    salaryRange: string;
    workingHours: string;
    departmentOrganisation: string;
    publicationDate: Date;
  }) {
    this._id = JobOfferId.random();
    this._recuireterId = new UserId(params.recruiterId);
    this._title = params.title;
    this._companyName = params.companyName;
    this._contractType = ContractType.from(params.contractType);
    this._description = params.description;
    this._responsibilities = params.responsibilities;
    this._requirements = params.requirements;
    this._jobType = JobType.from(params.jobType);
    this._workingDay = WorkingDay.from(params.workingHours);
    this._skills = params.skills;
    this._workingHours = params.workingHours;
    this._departmentOrganisation = params.departmentOrganisation;
    this._publicationDate = params.publicationDate;
    this._salaryRange = SalaryRange.from(params.salaryRange);
  }

  private _title: string;

  get title(): string {
    return this._title;
  }

  private _companyName: string;

  get companyName(): string {
    return this._companyName;
  }

  private _description: string;

  get description(): string {
    return this._description;
  }

  private _responsibilities: string;

  get responsibilities(): string {
    return this._responsibilities;
  }

  private _requirements: string;

  get requirements(): string {
    return this._requirements;
  }

  private _jobType: JobType;

  get jobType(): string {
    return this._jobType.value;
  }

  private _contractType: ContractType;

  get contractType(): string {
    return this._contractType.value;
  }

  private _workingDay: WorkingDay;

  get workingDay(): string {
    return this._workingDay.value;
  }

  private _skills: string[];

  get skills(): string[] {
    return this._skills;
  }

  private _salaryRange: SalaryRange;

  get salaryRange(): string {
    return this._salaryRange.value;
  }

  private _workingHours: string;

  get workingHours(): string {
    return this._workingHours;
  }

  private _departmentOrganisation: string;

  get departmentOrganisation(): string {
    return this._departmentOrganisation;
  }

  private _publicationDate: Date;

  get publicationDate(): Date {
    return this._publicationDate;
  }

  withTitle(value: string) {
    this._title = value;
    return this;
  }

  withCompanyName(value: string) {
    this._companyName = value;
    return this;
  }

  withDescription(value: string) {
    this._description = value;
    return this;
  }

  withResponsibilities(value: string) {
    this._responsibilities = value;
    return this;
  }

  withRequirements(value: string) {
    this._requirements = value;
    return this;
  }

  withJobType(value: JobType) {
    this._jobType = value;
    return this;
  }

  withContractType(value: ContractType) {
    this._contractType = value;
    return this;
  }

  withWorkingDay(value: WorkingDay) {
    this._workingDay = value;
    return this;
  }

  withSkills(value: string[]) {
    this._skills = value;
    return this;
  }

  withSalaryRange(value: SalaryRange) {
    this._salaryRange = value;
    return this;
  }

  withWorkingHours(value: string) {
    this._workingHours = value;
    return this;
  }

  withDepartmentOrganisation(value: string) {
    this._departmentOrganisation = value;
    return this;
  }

  withPublicationDate(value: Date) {
    this._publicationDate = value;
    return this;
  }

  public serialize() {
    return {
      id: this.id,
      title: this.title,
      companyName: this.companyName,
      description: this.description,
      responsabilities: this.responsibilities,
      requirements: this.requirements,
      jobType: this.jobType,
      contractType: this.contractType,
      workingDay: this.workingDay,
      skills: JSON.stringify(this.skills),
      salaryRange: this.salaryRange,
      workingHours: this.workingHours,
      departmentOrganization: this.departmentOrganisation,
      publicationDate: this.publicationDate,
      recruiterId: this.recruiterId,
    };
  }
}
