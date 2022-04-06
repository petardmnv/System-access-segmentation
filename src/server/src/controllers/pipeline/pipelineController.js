const Result = require('../../models/result.js');
const multer = require('multer');
const AppError = require('../../utils/appError.js');
const axios = require('axios')

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
    async runPipeline(req, res, next) {
        let { department, job, filename } = req.body;
        // Set data to ml python server and get results
        // set up data to be posted to pyrhon server
        let data = JSON.stringify({
            "job": job,
            "department": department,
            "filename": filename
          });
          // Set up axios configuration
          let config = {
            method: 'post',
            url: 'http://127.0.0.1:8082/run',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          let response;
          try {
            response  = await axios(config);
            let result = response['data']['result']
            res.status(200).send({ privileges: result })
          } catch (error) {
                return next(new AppError("You provided error data in the form", 404));
          };
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
                return next(new AppError("Error while saving result.", 500));
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