import express from 'express';
import { getByCampusAndLanguage, addContent, editContent, contentLogin } from './../controllers/contentController';

export const contentRouter = express.Router();

contentRouter.route('/')
    .get(getByCampusAndLanguage)
    .post(addContent)
    .put(editContent);

contentRouter.route('/login/')
    .post(contentLogin);