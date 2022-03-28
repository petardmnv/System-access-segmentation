const Model = require('../../models/model.js');
const AppError = require('../../utils/appError.js');

module.exports = {
    getAllModels: async (req, res, next) => {
        try {
            let models = await Model.find({}, 'name description');
            if (!models) {
                return next(new AppError(error.message || "Empty models data.", 500));
            }
            res.status(200).send(models);
        } catch (error) {
            return next(new AppError(error.message || "Failed to load models data", 500));
        }
    },
    getModel: async (req, res, next) => {
        const id = req.params.id;
        try {
            let model = await Model.findById({_id: id});
            if (!model) {
                return next(new AppError(error.message || "Empty model data.", 500));
            }
            res.status(200).send(model);
        } catch (error) {
            return next(new AppError(error.message || "Failed to load model data", 500));
        }
    }
};

