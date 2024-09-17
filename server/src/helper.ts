import { ZodError } from "zod";

export const formatError = (error: ZodError): any => {
    let errors:any = {};
    error.errors?.map((issues) =>{
        errors[issues.path?.[0]] = issues.message;
    });

    return errors;

};