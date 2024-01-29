// include environment variables
import * as dotenv from 'dotenv';
dotenv.config();

// import API
import OpenAI from 'openai';

// config API with key
const openai = new OpenAI({
  apiKey: process.env.OPENAIA_API_KEY,
});

// middleware
import  express  from 'express';
import cors from 'cors';

// set up the server
const app = express();
app.use(cors());
app.use(express.json());

// post request for ai image generate
app.post('/Generator', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const image = aiResponse.data[0].url;
    res.send({image});
  }
  catch (error) {
    console.log("i am in");
    res.status(500).send('wrong');
  }
});

app.listen(8080, () => console.log('generate art on http://localhost:8080/Generator'));