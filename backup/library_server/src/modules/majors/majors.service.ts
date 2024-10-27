import { Service } from "typedi";
import Majors from "./model/majors.model";

@Service()
export class MajorsService {
  async getListMajors() {
    return await Majors.find();
  }
  
}
