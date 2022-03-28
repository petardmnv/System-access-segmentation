export default {
    setModels(state, payload) {
        state.models = payload.models;
    },
    setCurrentModel(state, payload) {
        state.currentModel = payload.model;
    }
};