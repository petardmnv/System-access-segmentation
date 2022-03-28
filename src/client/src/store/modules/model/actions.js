import axios from 'axios';

export default {
    async getModels(context) {
        try {
            const response = await axios.get(`http://localhost:8081/model`);

            // reposnose is ok 
            context.commit("setModels", {
                models: response.data.models
            });
        } catch (error) {
            throw new Error(error.response.data.message || "An error occured while sending the request!");
        }
    },
    async getModel(context, payload) {
        const id = payload.id;
        try {
            const response = await axios.get(`http://localhost:8081/model/${id}`);

            // reposnose is ok 
            context.commit("setCurrentModel", {
                model: response.data.model
            });
        } catch (error) {
            throw new Error(error.response.data.message || "An error occured while sending the request!");
        }
    }
};