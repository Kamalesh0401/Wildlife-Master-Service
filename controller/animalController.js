const axios = require('axios');
const Animal = require('../models/animalDataModel');
const RawAnimalData = require('../models/rawAnimalDataModel');

// List of 200 animal names (from your provided data)
// const animalNames = [
//     "Tiger",
//     "Lion",
//     "Elephant",
//     "Leopard",
//     "Bear",
//     "Rhinoceros",
//     "Bison",
//     "Buffalo",
//     "Antelope",
//     "Deer",
//     "Stag",
//     "Ass",
//     "Tahr",
//     "Sheep",
//     "Ibex",
//     "Goral",
//     "Serow",
//     "Wolf",
//     "Dog",
//     "Jackal",
//     "Fox",
//     "Panda",
//     "Hyena",
//     "Cat",
//     "Civet",
//     "Binturong",
//     "Otter",
//     "Macaque",
//     "Langur",
//     "Gibbon",
//     "Loris",
//     "Pangolin",
//     "Mongoose",
//     "Bat",
//     "Squirrel",
//     "Porpoise",
//     "Dolphin",
//     "Hare",
//     "Porcupine",
//     "Pig",
//     "Hog",
//     "Peafowl",
//     "Bustard",
//     "Crane",
//     "Vulture",
//     "Eagle",
//     "Kite",
//     "Buzzard",
//     "Heron",
//     "Egret",
//     "Stork",
//     "Ibis",
//     "Spoonbill",
//     "Flamingo",
//     "Goose",
//     "Duck",
//     "Pochard",
//     "Junglefowl",
//     "Monal",
//     "Tragopan",
//     "Pheasant",
//     "Pitta",
//     "Roller",
//     "Hoopoe",
//     "Hornbill",
//     "Pigeon",
//     "Thrush",
//     "Bulbul",
//     "Courser",
//     "Liocichla",
//     "Pelican",
//     "Darter",
//     "Harrier",
//     "Shikra",
//     "Waterhen",
//     "Koel",
//     "Bee-Eater",
//     "Woodpecker",
//     "Flameback",
//     "Quail",
//     "Skimmer",
//     "Flycatcher",
//     "Kingfisher",
//     "Crake",
//     "Crocodile",
//     "Gharial",
//     "Python",
//     "Cobra",
//     "Viper",
//     "Krait",
//     "Snake",
//     "Keelback",
//     "Monitor",
//     "Chameleon",
//     "Lizard",
//     "Gecko",
//     "Tortoise",
//     "Turtle",
//     "Skink",
//     "Agama",
//     "Frog",
//     "Toad",
//     "Newt",
//     "Camel",
//     "Yak",
//     "Tapir",
//     "Marten",
//     "Badger",
//     "Shrew",
//     "Mole",
//     "Hedgehog",
//     "Pika",
//     "Marmot",
//     "Argali",
//     "Urial",
//     "Chevrotain",
//     "Banteng",
//     "Gayal",
//     "Nilgau",
//     "Takin",
//     "Kiang",
//     "Capuchin",
//     "Tamarin",
//     "Lemur",
//     "Tarsier",
//     "Caracal",
//     "Serval",
//     "Lynx",
//     "Genet",
//     "Peccary",
//     "Moose",
//     "Elk",
//     "Armadillo",
//     "Anteater",
//     "Sloth",
//     "Manatee",
//     "Dugong",
//     "Tenrec",
//     "Aardvark",
//     "Wombat",
//     "Koala",
//     "Wallaby",
//     "Kangaroo",
//     "Platypus",
//     "Okapi",
//     "Zorilla",
//     "Quokka",
//     "Parrot",
//     "Macaw",
//     "Toucan",
//     "Cockatoo",
//     "Cassowary",
//     "Emu",
//     "Rhea",
//     "Osprey",
//     "Condor",
//     "Falcon",
//     "Goshawk",
//     "Kestrel",
//     "Merlin",
//     "Hobby",
//     "Owl",
//     "Nightjar",
//     "Swift",
//     "Hummingbird",
//     "Loon",
//     "Grebe",
//     "Albatross",
//     "Petrel",
//     "Shearwater",
//     "Cormorant",
//     "Gannet",
//     "Booby",
//     "Frigatebird",
//     "Lark",
//     "Swallow",
//     "Martin",
//     "Wagtail",
//     "Pipit",
//     "Wren",
//     "Dipper",
//     "Robin",
//     "Nightingale",
//     "Warbler",
//     "Tit",
//     "Nuthatch",
//     "Treecreeper",
//     "Shrike",
//     "Babbler",
//     "Waxwing",
//     "Starling",
//     "Mynah",
//     "Oriole",
//     "Drongo",
//     "Jay",
//     "Magpie",
//     "Raven",
//     "Crow",
//     "Finch",
//     "Sparrow",
//     "Bunting",
//     "Tanager",
//     "Cardinal",
//     "Grosbeak",
//     "Weaver",
//     "Alligator",
//     "Caiman",
//     "Iguana",
//     "Anole",
//     "Boa",
//     "Anaconda",
//     "Sidewinder",
//     "Adder",
//     "Mamba",
//     "Racer",
//     "Alligator Lizard",
//     "Tuatara",
//     "Komodo Dragon",
//     "Amphisbaena",
//     "Salamander",
//     "Axolotl",
//     "Caecilian",
//     "Hellbender",
//     "Mudpuppy",
//     "Treefrog",
//     "Dart Frog",
//     "Clawed Frog",
//     "Spadefoot",
//     "Agouti",
//     "Alpaca",
//     "Bandicoot",
//     "Bongo",
//     "Capybara",
//     "Chamois",
//     "Chinchilla",
//     "Chiru",
//     "Coati",
//     "Colugo",
//     "Coyote",
//     "Cuscus",
//     "Dhole",
//     "Dik-dik",
//     "Duiker",
//     "Echidna",
//     "Eland",
//     "Fossa",
//     "Gerenuk",
//     "Giraffe",
//     "Gnu",
//     "Guanaco",
//     "Hartebeest",
//     "Hippopotamus",
//     "Impala",
//     "Jaguarundi",
//     "Jerboa",
//     "Kinkajou",
//     "Klipspringer",
//     "Kob",
//     "Kudu",
//     "Linsang",
//     "Mara",
//     "Margay",
//     "Mink",
//     "Muntjac",
//     "Muskox",
//     "Nyala",
//     "Ocelot",
//     "Olingo",
//     "Opossum",
//     "Oryx",
//     "Pacarana",
//     "Paca",
//     "Phalanger",
//     "Pronghorn",
//     "Pudu",
//     "Quoll",
//     "Raccoon",
//     "Ringtail",
//     "Reedbuck",
//     "Roan",
//     "Sable",
//     "Saiga",
//     "Saola",
//     "Sitatunga",
//     "Skunk",
//     "Springbok",
//     "Steenbok",
//     "Suni",
//     "Tamaraw",
//     "Tamandua",
//     "Topi",
//     "Vicuna",
//     "Viscacha",
//     "Vole",
//     "Wapiti",
//     "Waterbuck",
//     "Wisent",
//     "Wolverine",
//     "Woylie",
//     "Zebu",
//     "Avocet",
//     "Bittern",
//     "Bobolink",
//     "Broadbill",
//     "Bullfinch",
//     "Bushchat",
//     "Canary",
//     "Chough",
//     "Cisticola",
//     "Coot",
//     "Cotinga",
//     "Crossbill",
//     "Cuckoo",
//     "Curlew",
//     "Dickcissel",
//     "Dotterel",
//     "Dove",
//     "Dunlin",
//     "Fieldfare",
//     "Flowerpecker",
//     "Francolin",
//     "Fulmar",
//     "Gadwall",
//     "Gallinule",
//     "Godwit",
//     "Goldfinch",
//     "Grackle",
//     "Guillemot",
//     "Gull",
//     "Hamerkop",
//     "Hawfinch",
//     "Honeyeater",
//     "Jacamar",
//     "Jacana",
//     "Jaeger",
//     "Kagu",
//     "Killdeer",
//     "Kinglet",
//     "Lapwing",
//     "Limpkin",
//     "Linnet",
//     "Longspur",
//     "Lyrebird",
//     "Malkoha",
//     "Manakin",
//     "Meadowlark",
//     "Megapode",
//     "Merganser",
//     "Moorhen",
//     "Motmot",
//     "Mousebird",
//     "Murre",
//     "Noddy",
//     "Oystercatcher",
//     "Pardalote",
//     "Partridge",
//     "Peewee",
//     "Penduline",
//     "Phalarope",
//     "Pintail",
//     "Plover",
//     "Potoo",
//     "Puffin",
//     "Rail",
//     "Redpoll",
//     "Redstart",
//     "Roadrunner",
//     "Rockfowl",
//     "Rook",
//     "Sanderling",
//     "Sandgrouse",
//     "Sandpiper",
//     "Scaup",
//     "Scoter",
//     "Scrubwren",
//     "Secretarybird",
//     "Seriema",
//     "Shelduck",
//     "Siskin",
//     "Skua",
//     "Snipe",
//     "Solitaire",
//     "Sparrowhawk",
//     "Stint",
//     "Stonechat",
//     "Sunbird",
//     "Swamphen",
//     "Takahe",
//     "Teal",
//     "Tern",
//     "Thrasher",
//     "Tinamou",
//     "Titmouse",
//     "Tody",
//     "Turnstone",
//     "Veery",
//     "Vireo",
//     "Waxbill",
//     "Wheatear",
//     "Whimbrel",
//     "Whinchat",
//     "Whitethroat",
//     "Widowbird",
//     "Woodcock",
//     "Woodswallow",
//     "Whydah",
//     "Yellowlegs",
//     "Amphisbaenian",
//     "Angwantibo",
//     "Blindworm",
//     "Cottonmouth",
//     "Copperhead",
//     "Fer-de-lance",
//     "Gila Monster",
//     "Indri",
//     "Lamprey",
//     "Lancehead",
//     "Pygmy Mulga",
//     "Radiated Tortoise",
//     "Rattlesnake",
//     "Rinkhals",
//     "Sea Krait",
//     "Slow Worm",
//     "Taipan",
//     "Tiger Snake",
//     "Tilefish",
//     "Xenops",
//     "Yellowhammer",
//     "Aye-aye",
//     "Babirusa",
//     "Barasingha",
//     "Basilisk",
//     "Beluga",
//     "Bichir",
//     "Bilby",
//     "Bitterling",
//     "Blesbok",
//     "Bonefish",
//     "Bontebok",
//     "Boomslang",
//     "Bushtit",
//     "Bushbaby",
//     "Caddisfly",
//     "Cacique",
//     "Chachalaca",
//     "Chacma",
//     "Cheetah",
//     "Chipmunk",
//     "Chuckwalla",
//     "Cichlid",
//     "Colobus",
//     "Corella",
//     "Coypu",
//     "Crombec",
//     "Culpeo",
//     "Dabchick",
//     "Dassie",
//     "Desman",
//     "Dibbler",
//     "Dingo",
//     "Diprotodon",
//     "Douroucouli",
//     "Dowitcher",
//     "Dragonet",
//     "Dropwing",
//     "Dusky",
//     "Elephant Seal",
//     "Elver",
//     "Emeu",
//     "Eurypterid",
//     "Ewe",
//     "Falanouc",
//     "Fangtooth",
//     "Feathertail",
//     "Fennec",
//     "Ferret",
//     "Flannel",
//     "Flicker",
//     "Frogmouth",
//     "Galago",
//     "Galagos",
//     "Galliwasp",
//     "Gambusia",
//     "Garpike",
//     "Gavial",
//     "Gemsbok",
//     "Gerbil",
//     "Gerenuks",
//     "Gharr",
//     "Glider",
//     "Globefish",
//     "Goby",
//     "Goldeneye",
//     "Grampus",
//     "Grassquit",
//     "Grenadier",
//     "Grison",
//     "Grysbok",
//     "Guacharo",
//     "Gudgeon",
//     "Guenon",
//     "Gundi",
//     "Gymnure",
//     "Hammerkop",
//     "Hemipode",
//     "Hermit Crab",
//     "Hocco",
//     "Hoatzin",
//     "Hornero",
//     "Hutia",
//     "Hyrax",
//     "Ibisbill",
//     "Iora",
//     "Jabiru",
//     "Jaça",
//     "Jaçana",
//     "Javelina",
//     "Jerboas",
//     "Kakapo",
//     "Kangaroo Rat",
//     "Kea",
//     "Kittiwake",
//     "Knobbed Hornbill",
//     "Kodkod",
//     "Korhaan",
//     "Kouprey",
//     "Kultarr",
//     "Langaha",
//     "Leadbeater",
//     "Lechwe",
//     "Lionfish",
//     "Loach",
//     "Lovebird",
//     "Lungfish",
//     "Maleo",
//     "Mandrill",
//     "Markhor",
//     "Marlin",
//     "Marmoset",
//     "Meerkat",
//     "Moa",
//     "Mollymawk",
//     "Moonrat",
//     "Morepork",
//     "Mudskipper",
//     "Muskrat",
//     "Nailtail Wallaby",
//     "Narwhal",
//     "Needlefish",
//     "Nilgai",
//     "Numbat",
//     "Nutcracker",
//     "Nymph",
//     "Olm",
//     "Oropendola",
//     "Pademelon",
//     "Parakeet",
//     "Patas",
//     "Peewit",
//     "Pichiciego",
//     "Piculet",
//     "Pike",
//     "Pilchard",
//     "Pinyon Jay",
//     "Pipistrelle",
//     "Polecat",
//     "Potto",
//     "Potoroo",
//     "Prion",
//     "Puffbird",
//     "Puku",
//     "Raccoon Dog",
//     "Rhebok",
//     "Rockhopper",
//     "Rorqual",
//     "Saki",
//     "Saluki",
//     "Sambar",
//     "Savanna",
//     "Scolopendra",
//     "Scorpionfish",
//     "Screamer",
//     "Shoveler",
//     "Siamang",
//     "Sifaka",
//     "Silverfish",
//     "Solenodon",
//     "Sora",
//     "Spadebill",
//     "Springhare",
//     "Squirrelfish",
//     "Stilt",
//     "Sunbittern",
//     "Sungrebe",
//     "Suricate",
//     "Tarpan",
//     "Tasmanian Devil",
//     "Tayra",
//     "Tetra",
//     "Thylacine",
//     "Titi",
//     "Toucanet",
//     "Trogon",
//     "Turaco",
//     "Uakari",
//     "Umbrellabird",
//     "Urubu",
//     "Utila",
//     "Vanga",
//     "Vervet",
//     "Vicuña",
//     "Vizcacha",
//     "Wader",
//     "Wallaroo",
//     "Whirligig",
//     "Wildebeest",
//     "Woodchuck",
//     "Xerus",
//     "Yapok",
//     "Zebra Finch",
//     "Zorro"
// ];

const originalSet = new Set([
    "Tiger", "Lion", "Elephant", "Leopard", "Bear", "Rhinoceros", "Bison", "Buffalo", "Antelope", "Deer",
    "Stag", "Ass", "Tahr", "Sheep", "Ibex", "Goral", "Serow", "Wolf", "Dog", "Jackal", "Fox", "Panda",
    "Hyena", "Cat", "Civet", "Binturong", "Otter", "Macaque", "Langur", "Gibbon", "Loris", "Pangolin",
    "Mongoose", "Bat", "Squirrel", "Porpoise", "Dolphin", "Hare", "Porcupine", "Pig", "Hog", "Peafowl",
    "Bustard", "Crane", "Vulture", "Eagle", "Kite", "Buzzard", "Heron", "Egret", "Stork", "Ibis", "Spoonbill",
    "Flamingo", "Goose", "Duck", "Pochard", "Junglefowl", "Monal", "Tragopan", "Pheasant", "Pitta", "Roller",
    "Hoopoe", "Hornbill", "Pigeon", "Thrush", "Bulbul", "Courser", "Liocichla", "Pelican", "Darter", "Harrier",
    "Shikra", "Waterhen", "Koel", "Bee-Eater", "Woodpecker", "Flameback", "Quail", "Skimmer", "Flycatcher",
    "Kingfisher", "Crake", "Crocodile", "Gharial", "Python", "Cobra", "Viper", "Krait", "Snake", "Keelback",
    "Monitor", "Chameleon", "Lizard", "Gecko", "Tortoise", "Turtle", "Skink", "Agama", "Frog", "Toad", "Newt",
    "Camel", "Yak", "Tapir", "Marten", "Badger", "Shrew", "Mole", "Hedgehog", "Pika", "Marmot", "Argali",
    "Urial", "Chevrotain", "Banteng", "Gayal", "Nilgau", "Takin", "Kiang", "Capuchin", "Tamarin", "Lemur",
    "Tarsier", "Caracal", "Serval", "Lynx", "Genet", "Peccary", "Moose", "Elk", "Armadillo", "Anteater",
    "Sloth", "Manatee", "Dugong", "Tenrec", "Aardvark", "Wombat", "Koala", "Wallaby", "Kangaroo", "Platypus",
    "Okapi", "Zorilla", "Quokka", "Parrot", "Macaw", "Toucan", "Cockatoo", "Cassowary", "Emu", "Rhea",
    "Osprey", "Condor", "Falcon", "Goshawk", "Kestrel", "Merlin", "Hobby", "Owl", "Nightjar", "Swift",
    "Hummingbird", "Loon", "Grebe", "Albatross", "Petrel", "Shearwater", "Cormorant", "Gannet", "Booby",
    "Frigatebird", "Lark", "Swallow", "Martin", "Wagtail", "Pipit", "Wren", "Dipper", "Robin", "Nightingale",
    "Warbler", "Tit", "Nuthatch", "Treecreeper", "Shrike", "Babbler", "Waxwing", "Starling", "Mynah", "Oriole",
    "Drongo", "Jay", "Magpie", "Raven", "Crow", "Finch", "Sparrow", "Bunting", "Tanager", "Cardinal", "Grosbeak",
    "Weaver", "Alligator", "Caiman", "Iguana", "Anole", "Boa", "Anaconda", "Sidewinder", "Adder", "Mamba",
    "Racer", "Alligator Lizard", "Tuatara", "Komodo Dragon", "Amphisbaena", "Salamander", "Axolotl", "Caecilian",
    "Hellbender", "Mudpuppy", "Treefrog", "Dart Frog", "Clawed Frog", "Spadefoot", "Agouti", "Alpaca", "Bandicoot",
    "Bongo", "Capybara", "Chamois", "Chinchilla", "Chiru", "Coati", "Colugo", "Coyote", "Cuscus", "Dhole",
    "Dik-dik", "Duiker", "Echidna", "Eland", "Fossa", "Gerenuk", "Giraffe", "Gnu", "Guanaco", "Hartebeest",
    "Hippopotamus", "Impala", "Jaguarundi", "Jerboa", "Kinkajou", "Klipspringer", "Kob", "Kudu", "Linsang",
    "Mara", "Margay", "Mink", "Muntjac", "Muskox", "Nyala", "Ocelot", "Olingo", "Opossum", "Oryx", "Pacarana",
    "Paca", "Phalanger", "Pronghorn", "Pudu", "Quoll", "Raccoon", "Ringtail", "Reedbuck", "Roan", "Sable",
    "Saiga", "Saola", "Sitatunga", "Skunk", "Springbok", "Steenbok", "Suni", "Tamaraw", "Tamandua", "Topi",
    "Vicuna", "Viscacha", "Vole", "Wapiti", "Waterbuck", "Wisent", "Wolverine", "Woylie", "Zebu", "Avocet",
    "Bittern", "Bobolink", "Broadbill", "Bullfinch", "Bushchat", "Canary", "Chough", "Cisticola", "Coot",
    "Cotinga", "Crossbill", "Cuckoo", "Curlew", "Dickcissel", "Dotterel", "Dove", "Dunlin", "Fieldfare",
    "Flowerpecker", "Francolin", "Fulmar", "Gadwall", "Gallinule", "Godwit", "Goldfinch", "Grackle", "Guillemot",
    "Gull", "Hamerkop", "Hawfinch", "Honeyeater", "Jacamar", "Jacana", "Jaeger", "Kagu", "Killdeer", "Kinglet",
    "Lapwing", "Limpkin", "Linnet", "Longspur", "Lyrebird", "Malkoha", "Manakin", "Meadowlark", "Megapode",
    "Merganser", "Moorhen", "Motmot", "Mousebird", "Murre", "Noddy", "Oystercatcher", "Pardalote", "Partridge",
    "Peewee", "Penduline", "Phalarope", "Pintail", "Plover", "Potoo", "Puffin", "Rail", "Redpoll", "Redstart",
    "Roadrunner", "Rockfowl", "Rook", "Sanderling", "Sandgrouse", "Sandpiper", "Scaup", "Scoter", "Scrubwren",
    "Secretarybird", "Seriema", "Shelduck", "Siskin", "Skua", "Snipe", "Solitaire", "Sparrowhawk", "Stint",
    "Stonechat", "Sunbird", "Swamphen", "Takahe", "Teal", "Tern", "Thrasher", "Tinamou", "Titmouse", "Tody",
    "Turnstone", "Veery", "Vireo", "Waxbill", "Wheatear", "Whimbrel", "Whinchat", "Whitethroat", "Widowbird",
    "Woodcock", "Woodswallow", "Whydah", "Yellowlegs", "Amphisbaenian", "Angwantibo", "Blindworm", "Cottonmouth",
    "Copperhead", "Fer-de-lance", "Gila Monster", "Indri", "Lamprey", "Lancehead", "Pygmy Mulga", "Radiated Tortoise",
    "Rattlesnake", "Rinkhals", "Sea Krait", "Slow Worm", "Taipan", "Tiger Snake", "Tilefish", "Xenops", "Yellowhammer",
    "Aye-aye", "Babirusa", "Barasingha", "Basilisk", "Beluga", "Bichir", "Bilby", "Bitterling", "Blesbok", "Bonefish",
    "Bontebok", "Boomslang", "Bushtit", "Bushbaby", "Caddisfly", "Cacique", "Chachalaca", "Chacma", "Cheetah",
    "Chipmunk", "Chuckwalla", "Cichlid", "Colobus", "Corella", "Coypu", "Crombec", "Culpeo", "Dabchick", "Dassie",
    "Desman", "Dibbler", "Dingo", "Diprotodon", "Douroucouli", "Dowitcher", "Dragonet", "Dropwing", "Dusky",
    "Elephant Seal", "Elver", "Emeu", "Eurypterid", "Ewe", "Falanouc", "Fangtooth", "Feathertail", "Fennec",
    "Ferret", "Flannel", "Flicker", "Frogmouth", "Galago", "Galagos", "Galliwasp", "Gambusia", "Garpike", "Gavial",
    "Gemsbok", "Gerbil", "Gerenuks", "Gharr", "Glider", "Globefish", "Goby", "Goldeneye", "Grampus", "Grassquit",
    "Grenadier", "Grison", "Grysbok", "Guacharo", "Gudgeon", "Guenon", "Gundi", "Gymnure", "Hammerkop", "Hemipode",
    "Hermit Crab", "Hocco", "Hoatzin", "Hornero", "Hutia", "Hyrax", "Ibisbill", "Iora", "Jabiru", "Jaça", "Jaçana",
    "Javelina", "Jerboas", "Kakapo", "Kangaroo Rat", "Kea", "Kittiwake", "Knobbed Hornbill", "Kodkod", "Korhaan",
    "Kouprey", "Kultarr", "Langaha", "Leadbeater", "Lechwe", "Lionfish", "Loach", "Lovebird", "Lungfish", "Maleo",
    "Mandrill", "Markhor", "Marlin", "Marmoset", "Meerkat", "Moa", "Mollymawk", "Moonrat", "Morepork", "Mudskipper",
    "Muskrat", "Nailtail Wallaby", "Narwhal", "Needlefish", "Nilgai", "Numbat", "Nutcracker", "Nymph", "Olm",
    "Oropendola", "Pademelon", "Parakeet", "Patas", "Peewit", "Pichiciego", "Piculet", "Pike", "Pilchard", "Pinyon Jay",
    "Pipistrelle", "Polecat", "Potto", "Potoroo", "Prion", "Puffbird", "Puku", "Raccoon Dog", "Rhebok", "Rockhopper",
    "Rorqual", "Saki", "Saluki", "Sambar", "Savanna", "Scolopendra", "Scorpionfish", "Screamer", "Shoveler", "Siamang",
    "Sifaka", "Silverfish", "Solenodon", "Sora", "Spadebill", "Springhare", "Squirrelfish", "Stilt", "Sunbittern",
    "Sungrebe", "Suricate", "Tarpan", "Tasmanian Devil", "Tayra", "Tetra", "Thylacine", "Titi", "Toucanet", "Trogon",
    "Turaco", "Uakari", "Umbrellabird", "Urubu", "Utila", "Vanga", "Vervet", "Vicuña", "Vizcacha", "Wader", "Wallaroo",
    "Whirligig", "Wildebeest", "Woodchuck", "Xerus", "Yapok", "Zebra Finch", "Zorro"
]);

const notFoundData = [
    "Tahr", "Goral", "Serow", "Langur", "Loris", "Peafowl", "Pochard", "Monal", "Tragopan", "Pitta", "Roller",
    "Bulbul", "Courser", "Liocichla", "Darter", "Shikra", "Waterhen", "Koel", "Flameback", "Skimmer", "Crake",
    "Krait", "Keelback", "Argali", "Urial", "Chevrotain", "Banteng", "Gayal", "Nilgau", "Kiang", "Tenrec",
    "Zorilla", "Osprey", "Condor", "Merlin", "Hobby", "Nightjar", "Swift", "Grebe", "Petrel", "Shearwater",
    "Cormorant", "Gannet", "Lark", "Martin", "Wagtail", "Pipit", "Dipper", "Shrike", "Babbler", "Waxwing",
    "Starling", "Mynah", "Drongo", "Tanager", "Sidewinder", "Amphisbaena", "Treefrog", "Agouti", "Chiru",
    "Colugo", "Duiker", "Gerenuk", "Gnu", "Guanaco", "Hartebeest", "Klipspringer", "Kob", "Linsang", "Margay",
    "Olingo", "Pacarana", "Phalanger", "Pudu", "Ringtail", "Reedbuck", "Roan", "Sitatunga", "Steenbok", "Suni",
    "Tamaraw", "Tamandua", "Topi", "Vicuna", "Viscacha", "Wapiti", "Waterbuck", "Wisent", "Woylie", "Bittern",
    "Broadbill", "Bullfinch", "Bushchat", "Canary", "Chough", "Cisticola", "Cotinga", "Crossbill", "Curlew",
    "Dickcissel", "Dotterel", "Dunlin", "Fieldfare", "Flowerpecker", "Francolin", "Fulmar", "Gadwall", "Gallinule",
    "Godwit", "Goldfinch", "Grackle", "Guillemot", "Hamerkop", "Hawfinch", "Honeyeater", "Jacamar", "Jaeger",
    "Kagu", "Killdeer", "Kinglet", "Lapwing", "Limpkin", "Linnet", "Longspur", "Malkoha", "Manakin", "Meadowlark",
    "Meg immigrationde", "Merganser", "Motmot", "Mousebird", "Murre", "Noddy", "Oystercatcher", "Pardalote",
    "Partridge", "Peewee", "Penduline", "Phalarope", "Pintail", "Plover", "Rail", "Redpoll", "Redstart",
    "Roadrunner", "Rockfowl", "Sanderling", "Sandgrouse", "Sandpiper", "Scaup", "Scoter", "Scrubwren",
    "Secretarybird", "Seriema", "Shelduck", "Siskin", "Skua", "Snipe", "Solitaire", "Stint", "Stonechat",
    "Sunbird", "Swamphen", "Takahe", "Teal", "Thrasher", "Tinamou", "Titmouse", "Tody", "Veery", "Vireo",
    "Waxbill", "Wheatear", "Whimbrel", "Whitethroat", "Widowbird", "Woodcock", "Woodswallow", "Whydah",
    "Yellowlegs", "Amphisbaenian", "Angwantibo", "Blindworm", "Pygmy Mulga", "Sea Krait", "Taipan", "Tiger Snake",
    "Tilefish", "Xenops", "Yellowhammer", "Aye-aye", "Barasingha", "Bitterling", "Blesbok", "Bonefish",
    "Bontebok", "Bushtit", "Bushbaby", "Caddisfly", "Cacique", "Chachalaca", "Chacma", "Chuckwalla", "Colobus",
    "Corella", "Coypu", "Crombec", "Culpeo", "Dabchick", "Dassie", "Desman", "Dibbler", "Diprotodon",
    "Douroucouli", "Dowitcher", "Dragonet", "Dropwing", "Elver", "Emeu", "Eurypterid", "Falanouc", "Feathertail",
    "Flannel", "Flicker", "Frogmouth", "Galago", "Galagos", "Galliwasp", "Gambusia", "Garpike", "Gavial",
    "Gemsbok", "Gerenuks", "Gharr", "Globefish", "Goby", "Goldeneye", "Grampus", "Grassquit", "Grenadier",
    "Grison", "Grysbok", "Guacharo", "Gudgeon", "Guenon", "Gundi", "Gymnure", "Hammerkop", "Hemipode", "Hocco",
    "Hoatzin", "Hornero", "Hutia", "Ibisbill", "Iora", "Jabiru", "Jaça", "Jaçana", "Javelina", "Jerboas", "Kea",
    "Kittiwake", "Knobbed Hornbill", "Korhaan", "Kouprey", "Kultarr", "Langaha", "Leadbeater", "Lechwe",
    "Lovebird", "Maleo", "Moa", "Mollymawk", "Moonrat", "Morepork", "Mudskipper", "Nailtail Wallaby", "Nutcracker",
    "Nymph", "Oropendola", "Peewit", "Pichiciego", "Piculet", "Pilchard", "Pinyon Jay", "Pipistrelle", "Potto",
    "Prion", "Puffbird", "Puku", "Rhebok", "Rorqual", "Saki", "Scolopendra", "Scorpionfish", "Screamer",
    "Shoveler", "Siamang", "Sifaka", "Silverfish", "Solenodon", "Sora", "Spadebill", "Springhare", "Stilt",
    "Sunbittern", "Sungrebe", "Suricate", "Tarpan", "Tayra", "Thylacine", "Titi", "Toucanet", "Trogon", "Turaco",
    "Urubu", "Utila", "Vanga", "Vizcacha", "Wader", "Wallaroo", "Whirligig", "Yapok", "Zorro"
];

// Convert notFoundData to a Set for efficient lookup
const notFoundSet = new Set(notFoundData);



// Function to delay execution (for rate limiting)
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


// Controller to download and store animal data
exports.downloadAnimalData = async (req, res) => {
    try {

        // Filter originalSet to exclude notFoundData
        const filteredSet = new Set([...originalSet].filter(name => !notFoundSet.has(name)));

        // Convert to sorted array
        const animalNames = [...filteredSet].sort();

        console.log('animalNames :', animalNames.length);

        let successCount = 0;
        let skipCount = 0;
        const errors = [];
        const notFoundData = [];
        const successData = [];
        let i = 1;
        for (const name of animalNames) {
            try {
                console.log(`Fetching data for: ${name}`);
                const response = await axios.get(`https://api.api-ninjas.com/v1/animals?name=${encodeURIComponent(name)}`, {
                    headers: { 'X-Api-Key': process.env.API_KEY }
                });

                if (response.status === 200 && response.data.length > 0) {
                    // Store raw API data in RawAnimalData collection
                    const rawAnimals = response.data.map(animal => ({
                        ...animal,
                        queryName: name
                    }));
                    await RawAnimalData.insertMany(rawAnimals);
                    console.log(`Stored raw data for: ${name}`);

                    // Transform each animal object to match the MongoDB schema
                    const transformedAnimals = response.data.map(animal => ({
                        ...transformAnimalData(animal),
                        queryName: name
                    }));

                    // Store transformed data in Animal collection
                    await Animal.insertMany(transformedAnimals);
                    //console.log(`transformedAnimals for: ${name} = ${JSON.stringify(transformedAnimals)}`);
                    console.log(`Stored transformed data for: ${name}`);
                    successCount++;
                    successData.push(name);
                } else {
                    console.log(`No data found for: ${name}`);
                    notFoundData.push(name);
                    //console.log("notFoundData", notFoundData);
                    skipCount++;
                }
            } catch (error) {
                console.error(`Error fetching/storing data for ${name}:`, error.message);
                errors.push({ name, error: error.message });
            }

            // Delay 1 second to respect API rate limits
            await delay(1000);
            console.log('Loop Count : ', i);
            i++;
        }

        res.status(200).json({
            message: 'Animal data download completed',
            successCount,
            skipCount,
            notFoundData,
            successData,
            errors
        });
    } catch (error) {
        console.error('Download error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller to list stored animals (optional, for testing)
exports.listAnimals = async (req, res) => {
    try {
        const animals = await Animal.find({}, { name: 1, queryName: 1, _id: 0 });
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller to add one or multiple animals
exports.addAnimal = async (req, res) => {
    try {
        let animalsToInsert = [];
        let validationErrors = [];
        let duplicates = [];

        // Handle array of animals
        if (req.body && Array.isArray(req.body)) {
            for (const element of req.body) {
                const {
                    name,
                    scientificName,
                    habitat,
                    description,
                    conservationStatus,
                    geographicRange,
                    threats,
                    weight,
                    lifespan,
                    diet,
                    foundIn,
                    topSpeed,
                    height,
                    commonName,
                    type,
                    image,
                    queryName
                } = element;

                // Validate required fields
                if (!name || !scientificName || !habitat || !description || !conservationStatus) {
                    validationErrors.push({
                        name: element.name || 'Unnamed Animal',
                        message: 'Missing required fields: name, scientificName, habitat, description, and conservationStatus are required',
                    });
                    continue;
                }

                const id = generateIdFromName(name);

                // Check if animal with this ID already exists
                const existingAnimal = await Animal.findOne({ id });
                if (existingAnimal) {
                    duplicates.push({
                        name,
                        message: `Animal with name '${name}' already exists with ID '${id}'`,
                    });
                    continue;
                }

                animalsToInsert.push({
                    id,
                    name,
                    scientificName,
                    habitat,
                    description,
                    conservationStatus,
                    geographicRange: geographicRange || [],
                    threats: threats || [],
                    weight: weight || 'Unknown',
                    lifespan: lifespan || 'Unknown',
                    diet: diet || 'Unknown',
                    foundIn: foundIn || [],
                    topSpeed: topSpeed || 'Unknown',
                    height: height || 'Unknown',
                    commonName: commonName || name,
                    type: type || 'Unknown',
                    image: image || '',
                    queryName: queryName || name
                });
            }

            if (validationErrors.length > 0 || duplicates.length > 0) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Validation or duplicate check failed for one or more animals',
                    errors: validationErrors,
                    duplicates,
                });
            }

            if (animalsToInsert.length > 0) {
                const insertedAnimals = await Animal.insertMany(animalsToInsert);
                return res.status(201).json({
                    status: 'success',
                    data: { animals: insertedAnimals },
                });
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: 'No valid animals to add',
                    data: [],
                });
            }
        }
        // Handle single animal
        else if (req.body && typeof req.body === 'object') {
            const {
                name,
                scientificName,
                habitat,
                description,
                conservationStatus,
                geographicRange,
                threats,
                weight,
                lifespan,
                diet,
                foundIn,
                topSpeed,
                height,
                commonName,
                type,
                image,
                queryName
            } = req.body;

            // Validate required fields
            if (!name || !scientificName || !habitat || !description || !conservationStatus) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Missing required fields: name, scientificName, habitat, description, and conservationStatus are required',
                });
            }

            const id = generateIdFromName(name);

            // Check if animal with this ID already exists
            const existingAnimal = await Animal.findOne({ id });
            if (existingAnimal) {
                return res.status(400).json({
                    status: 'fail',
                    message: `Animal with name '${name}' already exists with ID '${id}'`,
                });
            }

            const newAnimal = new Animal({
                id,
                name,
                scientificName,
                habitat,
                description,
                conservationStatus,
                geographicRange: geographicRange || [],
                threats: threats || [],
                weight: weight || 'Unknown',
                lifespan: lifespan || 'Unknown',
                diet: diet || 'Unknown',
                foundIn: foundIn || [],
                topSpeed: topSpeed || 'Unknown',
                height: height || 'Unknown',
                commonName: commonName || name,
                type: type || 'Unknown',
                image: image || '',
                queryName: queryName || name
            });

            const savedAnimal = await newAnimal.save();
            return res.status(201).json({
                status: 'success',
                data: { animal: savedAnimal },
            });
        }
        // Invalid request body
        else {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid request body. Expected a single animal object or an array of animal objects.',
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to add animal(s)',
            error: error.message,
        });
    }
};
// Get animal by ID
exports.getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get animal by name (queryName field)
exports.getAnimalByName = async (req, res) => {
    try {
        const animal = await Animal.find();//{ name: req.params.name }
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller to update an animal
exports.updateAnimal = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        // If name is provided, check for ID conflicts
        if (req.body.name) {
            const newId = generateIdFromName(req.body.name);
            const existingAnimal = await Animal.findOne({ id: newId });
            if (existingAnimal && existingAnimal._id.toString() !== req.params.id) {
                return res.status(400).json({
                    status: 'fail',
                    message: `Another animal with name '${req.body.name}' already exists with ID '${newId}'`,
                });
            }
        }

        // Update only the fields provided in the request body
        const updatedData = {
            id: req.body.name ? generateIdFromName(req.body.name) : animal.id,
            name: req.body.name || animal.name,
            scientificName: req.body.scientificName || animal.scientificName,
            habitat: req.body.habitat || animal.habitat,
            description: req.body.description || animal.description,
            conservationStatus: req.body.conservationStatus || animal.conservationStatus,
            populationTrend: req.body.populationTrend || animal.populationTrend,
            geographicRange: req.body.geographicRange || animal.geographicRange,
            threats: req.body.threats || animal.threats,
            weight: req.body.weight || animal.weight,
            lifespan: req.body.lifespan || animal.lifespan,
            diet: req.body.diet || animal.diet,
            foundIn: req.body.foundIn || animal.foundIn,
            topSpeed: req.body.topSpeed || animal.topSpeed,
            height: req.body.height || animal.height,
            commonName: req.body.commonName || animal.commonName,
            type: req.body.type || animal.type,
            image: req.body.image || animal.image,
            queryName: req.body.queryName || animal.queryName
        };

        const updatedAnimal = await Animal.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedAnimal);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteAnimalById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Animal.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ message: "Species not found" });
        }
        res.status(200).json({ message: "Species deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}

const transformAnimalData = (animal) => {
    const {
        name,
        taxonomy = {},
        locations = [],
        characteristics = {}
    } = animal;

    // Generate ID from name (lowercase, no spaces)
    const id = name.toLowerCase().replace(/\s+/g, '');

    // Map fields to desired schema
    return {
        id,
        name,
        scientificName: taxonomy.scientific_name || 'Unknown',
        habitat: characteristics.habitat || 'Unknown',
        description: characteristics.description || `The ${name} is a ${characteristics.type || 'animal'} native to ${locations.join(', ') || 'unknown regions'}. It is known for ${characteristics.most_distinctive_feature || 'its unique traits'}.`,
        conservationStatus: characteristics.conservationStatus || 'Unknown', // Default if not provided
        populationTrend: characteristics.populationTrend || 'Unknown', // Default if not provided
        geographicRange: locations.length > 0 ? locations : [characteristics.location || 'Unknown'],
        threats: characteristics.biggest_threat ? characteristics.biggest_threat.split(' and ').map(t => t.trim()) : ['Unknown'],
        weight: characteristics.weight || 'Unknown',
        lifespan: characteristics.lifespan || 'Unknown',
        diet: characteristics.diet || 'Unknown',
        foundIn: [characteristics.origin || locations[0] || 'Unknown'], // Use origin or first location
        topSpeed: characteristics.top_speed || 'Unknown',
        height: characteristics.height || 'Unknown',
        commonName: characteristics.common_name || name,
        type: characteristics.type || characteristics.group || 'Unknown',
        image: name.toLowerCase().split(' ')[1] || name.toLowerCase(), // E.g., 'lion' from 'Cape Lion'
        slogan: characteristics.slogan || ""
    };
};
// Function to generate ID from name
const generateIdFromName = (name) => name.toLowerCase().replace(/\s+/g, '');