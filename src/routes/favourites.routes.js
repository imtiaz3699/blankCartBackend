import express from 'express';
import { addToFavourites,clearFavourites,getUserFavourites,removeFromFavourites } from '../controller/favourites.controller.js';

const router = express.Router();

router.post("/add-to-favourites",addToFavourites)
router.put("/remove-from-favourites",removeFromFavourites)
router.get("/get-favourites/:userId",getUserFavourites)
router.put("/clear-favaourites/:userId",clearFavourites)
export default router;


