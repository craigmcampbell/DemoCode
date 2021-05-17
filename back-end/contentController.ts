import { Request, Response } from 'express';
import { buildSuccessResponse, buildErrorResponse, buildErrorResponseFromExternal } from '../helpers/jsonApiResponseHelper';
import { content } from '../models/content';
import { getContentForCampusByLanguage } from '../services/contentService';
import { ObjectID } from "mongodb";

import Debug from 'debug';
import * as sentry from '@sentry/node';

const debug = Debug('app:contentController');

export const addContent = async (req:Request, res:Response) => {

    try {
        const addedContent = await content.create(req.body);
        const successResponse = buildSuccessResponse(addedContent);

        res.json(successResponse);
    }
    catch(error) {
        debug(error);
        const errorResponse = buildErrorResponse('400', 'Add Content', error, '/content', req.body);
        res.json(errorResponse);
    }
}

export const editContent = async (req:Request, res:Response) => {

    try {
        const updatedContent = await content.findOneAndUpdate({ _id: new ObjectID(req.body._id) }, req.body);
        const successResponse = buildSuccessResponse(updatedContent);
        res.json(successResponse);
    }
    catch(error) {
        sentry.captureException(error);
        debug(error);
        const errorResponse = buildErrorResponse('400', 'Add Content', error, '/content', req.body);
        res.json(errorResponse);
    }
}

export const getByCampusAndLanguage = async (req:Request, res:Response) => {

    try {
        const campusId = req.query.campusId === undefined ? 0 : parseInt(req.query.campusId.toString());
        const languageId = req.query.languageId === undefined ? 0 : parseInt(req.query.languageId.toString());

        const content = await getContentForCampusByLanguage(campusId, languageId);

        res.json(buildSuccessResponse(content));
    }
    catch(error) {
        const errorResponse = buildErrorResponse('400', 'Add Content', error, '/content', req.body);
        res.json(errorResponse);
    }
}

export const contentLogin = async (req: Request, res: Response) => {
    if (req.body.password == "Admin4OIT%") {
        res.json(buildSuccessResponse(null));
    } else {
        res.json(buildErrorResponse('403', 'Login', 'Login Failed', '/content/login', req.body));
    }
}
