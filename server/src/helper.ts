import { ZodError } from "zod";
import ejs from 'ejs';
import path from "path";
import {fileURLToPath} from 'url';

export const formatError = (error: ZodError): any => {
    let errors:any = {};
    error.errors?.map((issues) =>{
        errors[issues.path?.[0]] = issues.message;
    });

    return errors;

};

export const renderEmailEJS = async (fileName:string, payload:any):Promise<string> => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const html:string = await ejs.renderFile(__dirname + `/views/emails/${fileName}.ejs`, payload);

    return html;
}