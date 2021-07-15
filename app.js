const express = require('express');
const multer = require('multer');

// const cors = require("cors");



// // const cors = require('cors');


// const app = express();
// // app.use(cors({ origin: "*" }));
// // app.use(express.json());


// const PORT = 3000;

// app.listen(PORT, () => {
//     console.log("The server started on port 3000 !!!!!");
// });

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, '/uploads')
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, `Heuristic_${file.originalname}`)
//     }
// })

// var upload = multer({ storage: storage })

// // var upload = multer({dest: 'uploads/'})

// app.get("/", (req, res) => {
//     res.send(
//         `<h1 Style='text-align: center'>Welcome to backend</h1>;
//         `
//     );
// })

// app.post('/file', upload.single('file'), (req, res, next) => {
//     const file = req.file;
//     console.log(file.filename);
//     if (!file) {
//         const error = new Error('Please upload a file')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     res.send(file);
// })

const app = express();

// app.use(cors({ origin: "*" }));
// app.use(bodyParser.json());


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
})

const upload = multer({ storage: fileStorageEngine });


app.get("/", (req, res) => {
    res.send(`<div><h1>Welcome to server side</h1></div>`)
})

app.post("/file", upload.single("file"), (req, res) => {
    console.log(req.file);
    res.send("Single File upload success");
});


app.post("/multiple", upload.array("files"), (req, res) => {
    console.log(req.files)
    res.send('Multiple Files Upload Success')
})

app.listen(5000, () => {
    console.log("server started on port 5000");
});