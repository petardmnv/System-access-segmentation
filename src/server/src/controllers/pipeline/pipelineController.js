const Result = require('../../models/result.js');
const multer = require('multer');
const AppError = require('../../utils/appError.js');

const storage = multer.diskStorage({
    // req -  current request state, file - current uploaded file, 
    // cb - callback function simular to next()
    destination: (req, res, cb) => {
        cb(null, 'public/data');
    },
    // I found interesting SO page for extention types returned in 
    //resp https://stackoverflow.com/questions/974079/setting-mime-type-for-excel-document
    // If I am going to add more possible extentions
    filename: function (req, file, cb) {
        // get file extention
        const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
        const newFileName = `User-${req.user.id}-${Date.now()}.${ext}`;
        req.body.filename = newFileName;
        cb(null, newFileName);
    }
});

// fileter uploaded files. If the uploaded fil is image for example
// than i want to reqect it. 
const fileFilter = (req, file, cb) => {
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
    const extentionsList = ["xlsx", "csv"];
    if (extentionsList.indexOf(ext) > -1) {
        cb(null, true);
    }else {
        cb(new AppError("File is not .csv or .xlsx. Please upload only (.csv, .xlsx) types of files.", 400), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


module.exports = {
    uploadFile: upload.single('file'),
    runPipeline(req, res) {
        // Provide data to model functions
        let { department, job, filename } = req.body;
        // runModel(filename, departmen, job);
        // Simulate model result 
        let result = ['QLOOR1', 'RST23', '23RTY4', 'QTRL721', 'RTWE34', 'RS6', 'ASDF', 'PRIV1', 'PRIV2', 'PRIV3'];
        setTimeout(() => {
            res.status(200).send({ privileges: result });
        }, 1 * 1000);
    },
    async saveResult(req, res, next) {
        try {
            // get params from request body and check if they are null
            let {role, privileges} = req.body
            let userId = req.user.id;
            if (!role || !privileges) {
                return next(new AppError("Role or privileges is empty", 400));
            }
            const result = await Result.create({
                role: role,
                privileges: privileges,
                userId: userId
            });

            if (!result) {
                return next(new AppError("Error while caving result.", 500));
            }
            res.sendStatus(200);
        } catch (error) {
            return next(new AppError(error.message, 500));
        }
    },
    async getResults(req, res, next) {
        try {
            let results = await Result.find({userId: req.user.id});
            if (!results) {
                return next(new AppError('There are no results for this user.', 404));
            }
            res.status(200).send({results: results});
        } catch (error) {
            return next(new AppError(error.message, 500));
        }
    }
};