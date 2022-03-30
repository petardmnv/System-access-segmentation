import axios from 'axios';

// set global tiumer valiable which stores a setTimeout function;
let timer;

export default {
    async register(context, payload) {
        return context.dispatch('setAuthentication', {
            ...payload,
            route: 'register'
        });
    },
    async login(context, payload) {
        return context.dispatch('setAuthentication', {
            ...payload,
            route: 'login'
        });
    },
    async setAuthentication(context, payload) {
        const route = payload.route;
        try {
            const response = await axios.post(`http://localhost:8081/${route}`, {
                username: payload.username,
                email: payload.email,
                password: payload.password
            });
            // set token and user id in local storage
            let tokenExpiration = response.data.expiresIn;
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data._id);
            localStorage.setItem('tokenExpiration', tokenExpiration);


            // Log out if tokenexpiration has ended
            timer = setTimeout(function () {
                context.dispatch('logout');
            }, tokenExpiration - new Date().getTime());

            // reposnose is ok 
            context.commit("setUser", {
                userId: response.data._id,
                token: response.data.token
            });
        } catch (error) {
            throw new Error(error.response.data.message || "An error occured while sending the request!");
        }
    },
    logout(context) {
        // remove token and userId from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        // Clear timeout
        clearTimeout(timer);

        // Set their values to null
        context.commit('setUser', {
            userId: null,
            token: null
        });
    },
    attemptLogIn(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        // If token and user id exist then log out function was not called
        if (token && userId && tokenExpiration) {

            let remainingTokenTime = tokenExpiration - new Date().getTime();
            // If remaining time is less than 1 second don't log in automaticaly
            if (remainingTokenTime < 1* 1000) {
                return;
            }

            // Log out if tokenexpiration has ended
            timer = setTimeout(function () {
                context.dispatch('logout');
            }, remainingTokenTime);

            // Set token and user again
            context.commit('setUser', {
                token,
                userId
            });
        }
    }
};