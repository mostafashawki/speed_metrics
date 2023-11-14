const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');


const uri = 'mongodb://localhost:27017/ecommerce_db' 
console.log(uri);
const client = new MongoClient(uri);

const generateRandomNumber = (max) => {
    //range from 0 to max
    return Math.floor(Math.random() * max);
}

const mobilePhoneBrands = [
    "Condor Electronics",
    "Kogan",
    "5Star",
    "Agetel",
    "Bengal Mobile",
    "GDL",
    "Geo",
    "Gretel",
    "Halima Mobile",
    "Icon Mobile",
    "Imam Mobile",
    "Linnex",
    "Marcel",
    "Mars",
    "Marlax",
    "Maximus",
    "Migo",
    "MyCell",
    "Proton",
    "Stylus",
    "Symphony",
    "Vision",
    "Walton",
    "Winmax",
    "Gradiente",
    "Multilaser",
    "Positivo",
    "Tectoy",
    "10.Or (Tenor)",
    "OUKITEL",
    "Amoi",
    "BBK",
    "Coolpad",
    "Cubot",
    "Doogee",
    "Gfive",
    "Haier",
    "Hisense",
    "Honor",
    "Huawei",
    "Itel Mobile",
    "iQOO",
    "LeEco",
    "Meitu",
    "Meizu",
    "Ningbo Bird",
    "OnePlus",
    "Oppo",
    "Realme",
    "Smartisan",
    "TCL Corporation",
    "Technology Happy Life",
    "Tecno Mobile",
    "Umidigi",
    "Vivo",
    "Vsun",
    "Wasam",
    "Unihertz",
    "Xiaomi",
    "ZTE",
    "Jablotron",
    "Verzo",
    "SICO Technology",
    "Jolla",
    "Nokia Corporation",
    "HMD Global",
    "Bittium",
    "Archos",
    "Alcatel Mobile",
    "Crosscall",
    "Groupe Bull",
    "Kapsys",
    "Logicom",
    "MobiWire",
    "Wiko",
    "Gigaset",
    "Medion",
    "SHIFT",
    "TechniSat",
    "Tiptel",
    "MLS",
    "X-tigi Mobile",
    "Lenovo",
    "Infinix",
    "Karbonn Mobiles",
    "Lava International",
    "Jio",
    "LYF",
    "Micromax Informatics",
    "Xolo",
    "GLX",
    "Advan",
    "Evercoss",
    "SPC",
    "Brondi",
    "Q.Bell",
    "New Generation Mobile",
    "Olivetti",
    "Akai",
    "Fujitsu",
    "Casio",
    "Hitachi",
    "JRC",
    "Kyocera",
    "Mitsubishi Electric",
    "NEC",
    "Panasonic",
    "Sharp",
    "Sony",
    "Toshiba",
    "Just5",
    "Kyoto Electronics",
    "Lanix",
    "Zonda",
    "Fairphone",
    "John's Phone",
    "Philips",
    "Arirang",
    "QMobile",
    "Cherry Mobile",
    "Firefly Mobile (PH)",
    "Starmobile",
    "Cloudfone",
    "MyPhone",
    "Torque",
    "Kruger&Matz",
    "Manta Multimedia",
    "myPhone (Poland)",
    "Allview",
    "Evolio",
    "E-Boda",
    "Myria",
    "Utok",
    "Beeline",
    "Explay",
    "Gresso",
    "Highscreen",
    "Megafon",
    "MTS",
    "RoverPC",
    "teXet",
    "Sitronics",
    "Yotaphone",
    "Cell C",
    "MTN",
    "Mobicel",
    "Telkom",
    "Vodacom",
    "KT Tech",
    "Pantech",
    "Samsung",
    "Doro",
    "Acer",
    "Asus",
    "BenQ",
    "DBTel",
    "Foxconn",
    "HTC",
    "AIS",
    "DTAC",
    "True",
    "Wellcom",
    "EvertekTunisie",
    "ASELSAN",
    "Vestel",
    "Thuraya",
    "Bullitt Group",
    "Nothing",
    "SwishTech",
    "Apple",
    "BLU Products",
    "Caterpillar",
    "Garmin",
    "Google Pixel",
    "HP",
    "InFocus",
    "InfoSonics",
    "Microsoft",
    "Motorola Mobility",
    "Purism, SPC",
    "BPhone",
    "Masstel",
    "Masscom",
    "Vsmart",
    "GTel"
];

const tags = ["smartphone", "electronics", "touchscreen", "4G", "5G", "OLED"]
const ramOptions = ["2 GB", "4 GB", "6 GB", "8 GB", "12 GB", "16 GB", "32 GB", "64 GB", "128 GB"];
const storageOptions = ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"];
const allUSBCables = ["USB to C cable", "USB to micro USB cable", "USB to lightning cable"];
const accessoriesOptions = ["Charger", "Earphones", "User manual", [...allUSBCables]];



async function seedDB() {
    try {
        const rest = await client.connect();
        console.log(rest);
        const database = client.db("ecommerce_db"); // Replace with your database name
        const products = database.collection("products");
        const productDetails = database.collection("product_details");

        for (let i = 0; i < 1000000; i++) { // Generate 1M products
            const product = {
                name: 'Smartphone ' + faker.commerce.productName(),
                category: faker.commerce.department(),
                manufacturer: mobilePhoneBrands[generateRandomNumber(mobilePhoneBrands.length)],
                price: faker.commerce.price(),
                stock: generateRandomNumber(1000),
                tags: [tags[generateRandomNumber(tags.length)], tags[generateRandomNumber(tags.length)]],
                launch_date: faker.date.past()
            };
            const result = await products.insertOne(product);

            const detail = {
                product_id: result.insertedId,
                specifications: {
                    dimensions: "6.1 x 2.9 x 0.3 inches",
                    weight: `${generateRandomNumber(250)} grams`,
                    memory: {
                        ram: ramOptions[generateRandomNumber(ramOptions.length)],
                        storage_options: [storageOptions[generateRandomNumber(storageOptions.length)], storageOptions[generateRandomNumber(storageOptions.length), storageOptions[generateRandomNumber(storageOptions.length)]]]
                      },
                },
                warranty: `${generateRandomNumber(5)} years`,
                accessories_included: [accessoriesOptions[generateRandomNumber(accessoriesOptions.length)], accessoriesOptions[generateRandomNumber(accessoriesOptions.length)]]

            };
            await productDetails.insertOne(detail);
        }

        console.log("Data seeded successfully");
    } finally {
        await client.close();
    }
}

seedDB().catch(console.error);
