import { Router } from "express";
import Container from "typedi";
import { GenreController } from "./genre.controller";

const genreRouter = Router();
const genreController = Container.get(GenreController);
genreRouter.get("/get-genres", genreController.getListGenres);

export default genreRouter;
