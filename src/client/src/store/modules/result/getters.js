export default {
    getResults(state) {
        return state.results;
    },
    getResultById(state) {
        return (id) => {
            return state.results.filter(result => result._id === id);
        }
    },
    getPrivileges(state) {
        return state.privileges;
    }
};