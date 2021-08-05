const mongoose = require("mongoose");
const Campground = require("../models/campground");

const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection refused:"));
db.once("open", () => {
    console.log("Connected to database");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 999) + 1;
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // #############################################
            // My UserID, replace it when reseeding users.
            // #############################################
            author: "61034da632f78699ea75db22",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt enim accusamus mollitia tenetur doloremque adipisci voluptatibus officia placeat, esse ab deleniti assumenda nobis, non, eos provident illum amet illo nostrum.",
            price: price,
            geometry: {
                type: "Point",
                coordinates: [-110.58823, 44.427765],
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dhw5ap8io/image/upload/v1628050334/YelpCamp/photo-1627844718626-4c6b963baac0_qlggix.jpg",
                    filename: "YelpCamp/vyufcmjeog1aolaocpoo",
                },
                {
                    url: "https://res.cloudinary.com/dhw5ap8io/image/upload/v1628050334/YelpCamp/photo-1627835079593-0ce9a87cffe4_pchev2.jpg",
                    filename: "YelpCamp/toan7zioe2cyjn9kofht",
                },
            ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
