import { Service } from "typedi";
import View from "./model/view.model";

@Service()

export class ViewService {
  async updateView(book:any){
    await View.updateOne({book:book},{$inc:{count:1}});
  }
}