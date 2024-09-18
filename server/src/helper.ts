import { ZodError } from "zod";
import ejs from 'ejs';
import path from "path";
import {fileURLToPath} from 'url';
import moment from "moment";

export const formatError = (error: ZodError): any => {
    let errors: any = {};
    error.errors?.map((issue) => {
      errors[issue.path?.[0]] = issue.message;
    });
  
    return errors;
  };
  

export const renderEmailEJS = async (fileName:string, payload:any):Promise<string> => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const html:string = await ejs.renderFile(__dirname + `/views/emails/${fileName}.ejs`, payload);

    return html;
}

export const checkDateHourDiff = (date:Date | string):number => {
  const now = moment();
  const tokenSendAt = moment(date)
  const difference = moment.duration(now.diff(tokenSendAt))

  return difference.asHours();
}