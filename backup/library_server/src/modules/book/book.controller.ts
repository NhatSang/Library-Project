import { Inject, Service } from "typedi";
import { BookService } from "./book.service";

@Service()
export class BookController {
  constructor(@Inject() private bookservice: BookService) {}
}
