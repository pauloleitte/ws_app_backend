import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './schemas/patient.schema';

@Injectable()
export class PatientsService {

  constructor(@InjectModel('Patient') private readonly patientModel: Model<Patient>,) { }

  async create(dto: CreatePatientDto, req: any) {
    const id = req.user.id;
    try {
      const exist = await this.findOneByCpf(dto.cpf);
      if (exist) {
        throw new BadRequestException("patient already registered");
      }
      const patient = new this.patientModel(dto);
      patient.user = id;
      return await patient.save();

    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findById(id) {
    const patient = await this.patientModel.findById(id);
    if (patient) {
      return patient;
    } else {
      throw new BadRequestException();
    }
  }

  async findByIdAndRemove(id) {
    try {
      const exist = await this.patientModel.findById(id);
      if (exist) {
        await this.patientModel.findByIdAndRemove(id).exec();
      }
      throw new BadRequestException("patient does existed");
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findByIdAndUpdate(id: string, dto: UpdatePatientDto) {
    try {
      const exist = await this.patientModel.findById(id);
      if (exist) {
        await this.patientModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
      }
      throw new BadRequestException("patient does existed");

    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(req: any) {
    const { cpf, name } = req.query;

    const id = req.user.id;

    var condition = name
      ? { name: { $regex: new RegExp(name), $options: "i" }, user: id }
      : null;

    if (cpf) {
      const patient = await this.findOneByCpf(cpf);
      if (patient) {
        return patient;
      }
      throw new BadRequestException("patient does existed");
    }

    if (condition) {
      const patients = await this.findAllByName(condition);
      if (patients) {
        return patients;
      }
      throw new BadRequestException("no patients found");
    }

    return await this.findAllByUserId(id);
  }

  async findOneByCpf(cpf) {
    return await this.patientModel.findOne({
      cpf: cpf,
    })
  }

  async findAllByName(condition) {
    return await this.patientModel.find(condition);
  }

  async findAllByUserId(id) {
    return await this.patientModel.find({ user: id });
  }

}
