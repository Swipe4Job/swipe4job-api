import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CriteriaCodec } from '../../../../shared/infrastructure/services/criteria-codec/CriteriaCodec';
import { HttpResponse } from '../../../../shared/infrastructure/HttpResponse';
import { UserId } from '../../../users/domain/UserID/UserId';
import { CandidateRegister } from '../../application/candidate-register';
import { CandidateList } from '../../application/candidate-list';
import { CandidateUpdate } from '../../application/candidate-update';
import { CandidateDelete } from '../../application/candidate-delete';
import { CandidateListResponseDTO } from './DTOS/CandidateListResponseDTO';
import { CandidateRegisterDTO } from './DTOS/CandidateRegisterDTO';
import { CandidateCV } from '../../domain/CandidateCV';
import { CandidateCVId } from '../../domain/CandidateCVId';
import { CandidateDescription } from '../../domain/CandidateDescription';
import { Study } from '../../domain/Studies';
import { SoftSkills } from '../../../offer/domain/SoftSkills';
import { CandidateName } from '../../domain/CandidateName';
import { CandidateLastName } from '../../domain/CandidateLastName';
import { CandidateLocation } from '../../domain/CandidateLocation';
import { LanguageSkill } from '../../domain/LanguageSkill';
import { JobExperience } from '../../domain/JobExperience';
import { CandidateCVCriteria } from '../../domain/CandidateCVCriteria';

@ApiTags('candidate')
@Controller('candidate')
export class CompanyController {
  constructor(
    private candidateRegister: CandidateRegister,
    private criteriaCodec: CriteriaCodec,
    private listCandidates: CandidateList,
    private candidateUpdate: CandidateUpdate,
    private candidateDelete: CandidateDelete,
  ) {}

  //read
  @Get()
  async getCandidates(@Query('criteria') encodedCriteria: string) {
    const candidateCriteria = encodedCriteria
      ? CandidateCVCriteria.fromCriteria(
          this.criteriaCodec.decode(encodedCriteria),
        )
      : CandidateCVCriteria.NONE();
    const candidates = await this.listCandidates.run(candidateCriteria);
    return HttpResponse.success('Candidate fetched successfully').withData(
      candidates.map((candidate) => new CandidateListResponseDTO(candidate)),
    );
  }
  //create --> en general todo canviar register per create
  @Post('')
  async registerCandidate(@Body() body: CandidateRegisterDTO) {
    await this.candidateRegister.run(body);
    return HttpResponse.success('Candidate created successfully');
  }

  @Put(':id')
  async updateCandidate(
    @Body() body: CandidateRegisterDTO,
    @Param('id') id: string,
  ) {
    const candidate = new CandidateCV({
      id: new CandidateCVId(id),
      candidateId: new UserId(body.candidateId),
      description: new CandidateDescription(body.description),
      studies: new Array<Study>(), //todo no se com cony cridar tot el tema de arrays aqui ni del set pero aixi no peta xd
      softSkills: new Set<SoftSkills>(),
      name: new CandidateName(body.name),
      lastname: new CandidateLastName(body.lastname),
      location: new CandidateLocation(body.location),
      languages: new Array<LanguageSkill>(),
      jobExperiences: new Array<JobExperience>(),
    });
    await this.candidateUpdate.run(candidate);
  }

  @Delete()
  async deleteCandidate(@Query('criteria') encodedCriteria: string) {
    const candidateCriteria = encodedCriteria
      ? CandidateCVCriteria.fromCriteria(
          this.criteriaCodec.decode(encodedCriteria),
        )
      : CandidateCVCriteria.NONE();
    await this.candidateDelete.run(candidateCriteria);
  }
}
