const Room = require("../models/roomModel");
const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY; 
const openai = new OpenAI({ apiKey: apiKey });

// Signup Controller for Registering USers
// async function createRiddle (ROOMID) {
//     try {
//         console.log(ROOMID, "ROOMID");
//         const { roomId } = req.body 

//         const room = await Room.find({ name: roomId })
//         if (room) {
//             //create riddle
//             const classes = ["apple", "banana", "bat", "bread", "bucket", "grapes", "pineapple"]
//             roomRiddleLen = room[0].riddlesChecked.length;
//             const difference = classes.filter(element => !room[0].riddlesChecked.includes(element));
//             const len = difference.length;
//             if (len !== 0) {
//                 const answer = difference[Math.floor(Math.random() * len - 1)]
//                 try {
//                     // const response = await openai.completions.create({
//                     //     prompt: `create a riddle for the answer ${answer}`,
//                     //     temperature: 0.5,
//                     //     max_tokens: 30,
//                     //     model: 'text-davinci-002',
//                     // });



//                     // const riddle = response.choices[0].text.trim();
//                 const riddle = `I'm red or green, sometimes even yellow,
//                 A juicy delight, crisp and mellow.
//                 With a core at my center, seeds in my heart,
//                 In pies and orchards, I play a sweet part.
//                 What am I?`
//                 const ans= 'apple'

//                     const riddleObject = await Room.findByIdAndUpdate({_id:room[0]._id}, {
//                         riddleObj: {
//                             ans:answer,
//                             riddle:riddle,
//                         }
//                     })
//                     console.log(riddle,answee);
//                     return riddle, answer;
//                     // return res.status(200).json({
//                     //     success: true,
//                     //     riddle,
//                     //     ans,
//                     //     // updatedRiddleChecked,
//                     //     message: "Riddle created",
//                     // });
//                 } catch (error) {
//                     console.error('Error:', error);
//                     // return res.status(500).json({
//                     //     success: false,
//                     //     message: "Error creating riddle openai",
//                     // });
//                 }
//             }
//         } else {
//             console.error(error);
//             // return res.status(401).json({
//             //     success: false,
//             //     message: "Creating riddle failed. Room not found",
//             // });
//         }
//     } catch (error) {
//         console.error(error);
//         // res.status(500).json({
//         //     success: false,
//         //     message: "Cannot create riddle.",
//         // });
//     }
// };

// module.exports = createRiddle()