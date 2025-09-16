require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


app.use(bodyParser.json());
app.use(cors())

app.post("/send", async (req, res) => {
    const auth = req.headers.auth;
    if(auth == "0UMsZXCygUiGlu43zUnPpmbfpYG1EePkYLr6Kie668p1zFkYON"){
        const prompt = req.body.prompt;
        try {
            if (prompt == null) {
                return res.status(400).send('No Prompt Provided');
            }
            const response = await openai.chat.completions.create({
                messages: [{ role: 'user', content: prompt }, { role: 'system', content: 'You are an ai that takes in a list of ingredients and returns a dish made out of those ingredients and the instructions to make that dish. Give it to me in this format: {"name": YOUR_RESPONSE, "steps": {"0": "STEP1", "1": "STEP2"}} with NO additional words or symbols' }],
                model: 'gpt-3.5-turbo',
            });
            // const completion = response.choices[0].message.content;
            // return res.status(200).json({
            //     success: true,
            //     message: completion,
            // });

            const data = {

                response: JSON.parse(response.choices[0].message.content),
            
            };
            res.json(data);
        } catch (error) {
        console.log(error.message);
        }
    } else{
        return res.status(401).send('Unauthorized Access');
    }
});

app.listen(PORT, host, () => {
    console.log(`Server is running on port ${PORT}`);

});

  
  