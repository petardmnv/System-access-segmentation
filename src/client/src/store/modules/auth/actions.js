import axios from 'axios';
export default {
    async register(context, payload) {
        let response;
        try {
            response = await axios.post('http://localhost:8081/register', {
                username: payload.username,
                email: payload.email,
                password: payload.password
            });
            // reposnose is ok 
            context.commit("setUser", {
                userId: response.data._id,
                token: response.data.token
            });
        } catch (error) {
            throw new Error(error.response.data.message || "An error occured while sending the request!");
        }
    },
    async login(context, payload) {
        let response;
        try {
            response = await axios.post('http://localhost:8081/login', {
                username: payload.username,
                email: payload.email,
                password: payload.password
            });
            // reposnose is ok 
            console.log('Going into commit event');
            context.commit("setUser", {
                userId: response.data._id,
                token: response.data.token
            });
            console.log('Passed commit event.');
        } catch (error) {
            throw new Error(error.response.data.message || "An error occured while sending the request!");
        }
    },
    logout(context) {
        context.commit('setUser', {
            userId: null,
            token: null
        });
    }
};