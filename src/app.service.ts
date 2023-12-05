import { Injectable } from '@nestjs/common';
import {
  CreatePublicationDTO,
  PublicationDTO,
} from './interfaces/publication.interface';
import { DummyService } from './dataAccess/dummyService';
@Injectable()
export class PublicationService {
  table = 'publication';
  constructor(private readonly dummyService: DummyService) {}
  async createPublication(
    data: CreatePublicationDTO,
  ): Promise<CreatePublicationDTO> {
    const dataCreated: CreatePublicationDTO = await this.dummyService.create(
      this.table,
      data,
    );
    const publicationCrated = Promise.resolve(dataCreated);
    return publicationCrated;
  }
  async getPublicationById(id: string): Promise<PublicationDTO> {
    return await this.dummyService.findOneById(this.table, id);
  }
  async deletePublication(id: string): Promise<boolean> {
    return await this.dummyService.deleteById(this.table, id);
  }
  async putPublication(
    id: string,
    dataToUpdate: PublicationDTO,
  ): Promise<PublicationDTO> {
    return await this.dummyService.update(this.table, id, dataToUpdate);
  }
  async listPublications() {
    return await this.dummyService.findAll(this.table);
  }
}
