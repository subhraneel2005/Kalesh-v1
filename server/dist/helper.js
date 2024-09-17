export const formatError = (error) => {
    let errors = {};
    error.errors?.map((issues) => {
        errors[issues.path?.[0]] = issues.message;
    });
    return errors;
};
