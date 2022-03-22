import axios from 'axios';
export default {
    login(){

    },
    async register(context, payload){
        const response = await axios.post('/register', {
            username: payload.username,
            password: payload.password 
          });
        if (!response.ok){
            //error occured
            console.log(response);
            const error = new Error(response.message || "An error occured while sending the request!");
            throw error;
        }
        // reposnose is ok 
        console.log(response);
        context.commit("setUser", {
            
        });
    }
};