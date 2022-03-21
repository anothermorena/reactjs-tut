//in here we are going to create one function for Create,Update and Deleting data in our API end point.
//the options object is what differentiates the type of request we are send .i.e. create,read,update,delete
const apiRequest = async(url = '', optionsObj = null, errMsg = null) => {
    //lets start the request with a try blovk as we would with any api request
    try {
        const response = await fetch(url, optionsObj);
        //if the response is not in the 200 range give an error back
        if(!response.ok) throw Error("Something went wrong,please re-load the app");
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
} 


export default apiRequest;