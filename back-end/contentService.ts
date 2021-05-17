import Debug from 'debug';
import { content } from '../models/content';

const debug = Debug('app:contentService');

export const getContentForCampusByLanguage = async (campusId: number, languageId: number) => {
    return await content.findByCampusAndLanguage(campusId, languageId);    
}
