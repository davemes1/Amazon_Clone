/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 * 
 * 
 */
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { setGlobalOptions } = require("firebase-functions");
dotenv.config()
const stripe = require("stripe")(
    process.env.STRIPE_KEY
);


const app = express()
setGlobalOptions({maxInstances:10})
app.use(cors({origin:true}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Success !",
    });
});

app.post("/payment/create",async(req,res)=>{
    const total=req.query.total;
    if (total > 0){
const paymentIntent=await stripe.paymentIntents.create({
    amount:total,
    currency :"usd"
})
// res.status(201).json(paymentIntent) /**after we get the client secret we will send that as below */
res.status(201).json({
    clientSecret : paymentIntent.client_secret
})


    }else{
        res.status(403).json({
            message : "Total must be greater than 0"})
    }
})




exports.api = onRequest(app)

