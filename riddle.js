
const { OpenAI } = require('openai');
const classes = [
    "apple",
    "banana",
    "bat",
    "bread",
    "bucket",
    "grapes",
    "pineapple",
    "cat",
    "dog",
    "car",
    "tree",
    "house",
    "sun",
    "moon",
    "star",
    "heart",
    "flower",
    "cloud",
    "bird"
  ];

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function makeRiddle() {
    const randomIndex = Math.floor(Math.random() * classes.length);
    const randomDoodle = classes[randomIndex];
    const prompt = `Generate a riddle based on the following doodle: ${randomDoodle}`;
    // const response = await openai.completions.create({
    //     model: "gpt-3.5-turbo-instruct",
    //     prompt,
    //     temperature: 0.7,
    //     max_tokens: 100
    // });
    // if (response) {
    //     console.log(response.data.choices[0].text)
    //     return response.data.choices[0].text;
    // } else {
    //     return "Could not generate a riddle.";
    // }
}

module.exports = makeRiddle
