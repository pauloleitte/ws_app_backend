import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, Request } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('patients')
@UseGuards(JwtAuthGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  @Post()
  create(@Request() req: any, @Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto, req);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.patientsService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findById(id);
  }

  @Patch(':id')
  @HttpCode(204)
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.findByIdAndUpdate(id, updatePatientDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.patientsService.findByIdAndRemove(id);
  }
}
