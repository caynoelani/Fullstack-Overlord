import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';

const PORT = 5000;

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'The Fullstack Overlord has given you his ear'
    })
})

app.post('/', async(req, res) => {
    try{
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 2500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        res.status(200).send({
            overlord: response.data.choices[0].text
        })
    } catch (error){
        console.log(error);
        res.status(500).send({ error })
    }
});

app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`))
