export const standardlizeDay = (day) => {
    try{

        return new Date(day).toISOString();
    }
    catch(e)
    {
        throw e
    }
};
