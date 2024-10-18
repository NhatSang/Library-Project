import { Service } from "typedi";
import Genres from "./model/genre.model";
import { GenreResponeDTO } from "./dto/genre.dto";

@Service()
export class GenreService {
  async getListGenres() {
    console.log(GenreResponeDTO.transformGenre(await Genres.find()));
    
    return GenreResponeDTO.transformGenre(await Genres.find());
  }
}
