require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const cron = require('node-cron');
const moment = require('moment');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xdpsuxi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const run = async () => {
    try {
        await client.connect();
        const db = client.db('nyntax-car');
        const chargesCollection = db.collection("charges-summary");

        app.post("/api/create-chargeSummary", async (req, res) => {

            const ID = req.body;
            const vehicle_id = ID.vehicle_id;
            const existingCar = await chargesCollection.findOne({ vehicle_id });

            if (existingCar) {
                return res.status(400).json({ success: false, message: "This Car is already taken" });
            }
            const reservation = req.body;
            const reservation_id = reservation.reservation_id;
            const existingReservationID = await chargesCollection.findOne({ reservation_id });

            if (existingReservationID) {
                return res.status(400).json({ success: false, message: "Reservation ID is already exist" });
            }


            try {

                const {
                    duration_daily,
                    duration_hourly,
                    duration_weekly,
                    discount,
                    daily_rate,
                    hourly_rate,
                    weekly_rate,               
                    additionalCharges,
                    
                    email,
                    phone,
                    first_name,
                    last_name,
                    pick_date,
                    return_date,
                    reservation_id,
                    vehicle,
                    vehicle_id,
                    vehicle_type,
                    vehicle_model

                } = req.body;
                // const additionalChargesTotal = additionalCharges.reduce((sum, charge) => sum + charge.value, 0);
                let valueOne = 0, valueTwo = 0, valueThree = 0;
                additionalCharges.forEach((charge, index) => {
                    if (index === 0) valueOne = charge.value ;
                    if (index === 1) valueTwo = charge.value;
                    if (index === 2) valueThree = charge.value;
                });

                const finalValueOne = valueOne && valueOne === 11.5 ? 0 : valueOne 
                const finalValueTwo = valueTwo && valueTwo === 11.5 ? 0 : valueTwo 
                const finalValueThree = valueThree && valueThree === 11.5 ? 0 : valueThree 

                const hourly_charged_total = duration_hourly * hourly_rate;
                const weekly_charged_total = duration_weekly * weekly_rate;
                const daily_charged_total = duration_daily * daily_rate;


                const taxValueOne = valueOne && valueOne === 11.5 && 11.5 
                const taxValueTwo = valueTwo && valueTwo === 11.5 && 11.5 
                const taxValueThree = valueThree && valueThree === 11.5 && 11.5 

                console.log(taxValueOne, taxValueTwo, taxValueThree)

                const subTotal = (hourly_charged_total + weekly_charged_total + daily_charged_total) * (taxValueOne || taxValueTwo || taxValueThree)
                const tax = subTotal / 100
                const total = tax + (hourly_charged_total + weekly_charged_total + daily_charged_total + finalValueOne + finalValueTwo + finalValueThree ) 
                const grandTotal = total - discount

                console.log(grandTotal)
                const result = {
                    duration_daily,
                    duration_hourly,
                    duration_weekly,
                    discount,
                    daily_rate,
                    hourly_rate,
                    weekly_rate,

                    email,
                    phone,
                    first_name,
                    last_name,
                    pick_date,
                    return_date,
                    reservation_id,
                    vehicle,
                    vehicle_id,
                    vehicle_type,
                    vehicle_model,

                    tax,
                    hourly_charged_total,
                    weekly_charged_total,
                    daily_charged_total,
                    additionalCharges,
                    grandTotal

                }
                const insertionResult = await chargesCollection.insertOne(result);

                if (insertionResult.acknowledged) {
                    return res.status(200).json({ success: true, message: "Charge Summary created successfully", result });
                } else {
                    return res.status(400).json({ success: false, message: "Failed to create" });
                }
            } catch (error) {
                console.error("Error added charges summary:", error);
                return res.status(500).json({ success: false, message: "Internal server error" });
            }

        })

        app.get("/api/chargesSummary/Fetch", async (req, res) => {
            const cursor = chargesCollection.find({});
            const allInfo = await cursor.toArray();

            res.send({ status: true, data: allInfo });
        });


        app.get("/api/chargeSummary/:id", async (req, res) => {
            const id = req.params.id;
            const result = await chargesCollection.findOne({ _id: new ObjectId(id) });
            console.log(result);
            res.send(result);
        });

        app.delete("/api/charge/:id", async (req, res) => {
            const id = req.params.id;

            const result = await chargesCollection.deleteOne({ _id: new ObjectId(id) });
            console.log(result);
            res.send(result);
        });


    }

    finally {

    }
}
run().catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("nyntax-car server running successfully");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});