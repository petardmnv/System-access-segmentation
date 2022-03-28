export default {
    getModels(state) {
        return state.models;
    },
    getCurrentModel(state){
        return state.currentModel;
    },
    // getModelById(state) {
    //     return (id) => {
    //         state.models.filter(model => model._id === id);
    //     }
    // }
};