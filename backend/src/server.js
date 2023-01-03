import express from 'express';
import cors from 'cors';
import mongo from './mongo';
import routes from './routes';

const app = express();
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production")
    app.use(cors());
app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 4000;
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}
app.listen(port, () =>
    console.log(`WordCard App listening on port ${port}!`),
);

mongo.connect();
