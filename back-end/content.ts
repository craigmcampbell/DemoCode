import { typedModel } from 'ts-mongoose';
import { contentSchema } from './../schema/contentSchema';

export const content = typedModel('Content', contentSchema, undefined, undefined, {
    findByCampusAndLanguage: function(campusId: number, languageId: number) {
        return this.findOne({ campusId: campusId, languageId: languageId });
    },

    findByCampus: function(campusId: number) {
        return this.find({ campusId: campusId });
    }
});
