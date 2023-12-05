/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, NotFoundException, Delete} from '@nestjs/common';
import { PublicationService } from './app.service';
import { CreatePublicationDTO, PublicationDTO } from './interfaces/publication.interface';
import { ApiResponsePost } from './interfaces/responsesApi.interface';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}
  @Get('/api/publication/:id')
  async getPublication(@Param('id') id : string): Promise<PublicationDTO> {
    return await this.publicationService.getPublicationById(id);
  }
  @Delete('/api/publication/:id')
  async deletePublication(@Param('id') id : string): Promise<boolean> {
    return await this.publicationService.deletePublication(id);
  }
  @Put('/api/publication/:id')
  async putPublication(@Body() data, @Param('id') id: string): Promise<PublicationDTO> {
    const dataFound = await this.getPublication(id)
    if (!dataFound) {
      throw new NotFoundException('Publicación no encontrada, no se puede actualizar');
    }
    return await this.publicationService.putPublication(id, data);
  }
  @Put('/api/publication')
  async putPublication2(@Body() data): Promise<PublicationDTO> {
    const dataFound = await this.getPublication(data.id)
    if (!dataFound) {
      throw new NotFoundException('Publicación no encontrada, no se puede actualizar');
    }
    return await this.publicationService.putPublication(data.id, data);
  }
  @Get('/api/publication')
  async listPublications(): Promise<PublicationDTO> {
    return await this.publicationService.listPublications();
  }
  @Post('/api/publication')
  async upsertPublication(
    @Body() data: PublicationDTO,
  ): Promise<ApiResponsePost> {
    if(data.id) {
      const dataFound = await this.getPublication(data.id)
      if (!dataFound) {
        throw new NotFoundException('Publicación no encontrada, no se puede actualizar');
      }
      const dataUpdate = await this.publicationService.putPublication(data.id, data);
      return {
        data: dataUpdate,
        status: 201,
      };
    } else {
      const dataToSave: any = {
        ...data,
        id: uuidv4(),
      };
      const dataRes: CreatePublicationDTO = await this.publicationService.createPublication(
        dataToSave
      );
      return {
        data: dataRes,
        status: 201,
      };
    }    
  }

}
