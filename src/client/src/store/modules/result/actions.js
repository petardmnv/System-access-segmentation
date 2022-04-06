const { axiosInstance } = require('../../../service/setAxios.js');
const FormData = require('form-data');

export default {
    async getResults(context) {
        try {
            const response = await axiosInstance.get(`http://localhost:8081/result`);
            // reposnose is ok 
            context.commit("setResults", {
                results: response.data.results
            });
        } catch (error) {
            throw new Error(error.response.data.message || "An error occured while sending the request!");
        }
    },
    async getResult(context, payload) {
        try {
            const response = await axiosInstance.get(`http://localhost:8081/result`);
            // reposnose is ok 
            let result = response.data.results.filter(res => res._id === payload.id)[0];
            // If there is no result found then throw error
            if (!result) {
                throw new Error(`No result with provided id - ${payload.id}`);
            }else {
                return result;
            }
        } catch (error) {
            if (error.message) {
                throw new Error(error.message);
            }
            throw new Error(error.response.data.message || "An error occured while sending the request!");
        }
    },
    async sendPipelineData(context, payload) {
        try {
            const form_data  = new FormData();
            form_data.append("file", payload.file);
            form_data.append("job", payload.job);
            form_data.append("department", payload.department);
            const response = await axiosInstance.post(`http://localhost:8081/pipeline`, form_data);

            context.commit("setPrivileges", {
                privileges: response.data.privileges
            });
        } catch (error) {
            throw new Error(error.response.data.message || "An error occured while sending the request!");
        }
    },
    async addNewResult(context, payload) {
        try {
            await axiosInstance.post('http://localhost:8081/result', {
                role: payload.result.role,
                privileges: payload.result.privileges
            });
        } catch (error) {
            throw new Error(error.response.data.message || "Error while sending resuest.");
        } 
    }
};