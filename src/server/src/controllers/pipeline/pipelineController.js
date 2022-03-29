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
        cb(null, `User-${req.user.id}-${Date.now()}.${ext}`);
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
    uploadFile: upload.single('file')
};