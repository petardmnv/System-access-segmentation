const { axiosInstance } = require('../../../service/setAxios.js');

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
    async sendPipelineData(context, payload) {
        try {
            const response = await axiosInstance.post(`http://localhost:8081/pipeline`, {
                department: payload.department,
                job: payload.job,
                file: payload.file
            });
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