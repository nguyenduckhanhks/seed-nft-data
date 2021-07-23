const Promise = require('bluebird');
import { getCSVFiles, getContentCSVFiles, cleanField } from './scanDataFile';
const { writeFile } = require('./file-utils');
import {generateName, randomDate, generateDateTime, generateNameSerie, generateDes} from './random';

const getRandomInt = max => {
    return Math.floor(Math.random() * max);
}

const randomBetween = (min, max ) => {
    return Math.random(new Date()) * (max - min) + min;
}

const formatSeriesCsv = async () => {
    const category = [
        [
            "60f6423e8947a20489a9605e",
            "60f6423e8947a20489a9605f",
            "60f6423e8947a20489a96051",
            "60f6423e8947a20489a96052",
            "60f6423e8947a20489a96053",
            "60f6423e8947a20489a96054",
            "60f6423e8947a20489a96055"
        ],
        [
            "60f6423e8947a20489a9606e",
            "60f6423e8947a20489a9606f",
            "60f6423e8947a20489a96061"
        ],
        [
            "60f6423e8947a20489a9607e",
            "60f6423e8947a20489a9607f",
            "60f6423e8947a20489a96071",
            "60f6423e8947a20489a96072"
        ],
        [
            "60f6423e8947a20489a9608e",
            "60f6423e8947a20489a9608f",
            "60f6423e8947a20489a96081",
            "60f6423e8947a20489a96082",
            "60f6423e8947a20489a96083"
        ]
    ];

    const dataFile = await getCSVFiles('series');
    const { header, content } = await getContentCSVFiles(dataFile[0], ';');
    let result = '';

    await Promise.map(
        content,
        async (line) => {
            const field = cleanField(line.split(';'));
            const randomCate = getRandomInt(category.length);
            const randomNumberCate = getRandomInt(3);
            let newCata = '[';
            const arrIndex = [];
            while(arrIndex.length <= randomNumberCate) {
                const randIndex = getRandomInt(category[randomCate].length);
                if(arrIndex.indexOf(randIndex) == -1) {
                    newCata += '"' + (category[randomCate][randIndex]) + '"' + ',';
                    arrIndex.push(randIndex);
                }
            }
            newCata = newCata.substring(0, newCata.length - 1) + ']';

            header.forEach((ele, index) => {
                if(ele == 'category') result += newCata + ';'
                else result += field[index] + ';'
            });
            result = result.substring(0, result.length - 1) + '\n'
        }
    )

    await writeFile('/home/khanhnd/Data/sota/nft/my_node/data/formatSeries.csv', result);
}

const seedUserCreator = async (count, role, email) => {
    const idFile = await getCSVFiles('id');
    const { content } = await getContentCSVFiles(idFile[0], ';');

    let result = '';
    const startIdPos = getRandomInt(10000 - count);
    for(let i = 0; i < count; i++) {
        const newId = content[startIdPos + i].split(',')[1];
        const newName = generateName();
        result += newId + ';' + email + i + '@gmail.com' + ';' + newName + ';' + randomDate(new Date(1990,1,1), new Date(2000,1,1,)) + ';' + role + '\n';
    }

    await writeFile('/home/khanhnd/Data/sota/nft/my_node/data/users.csv', result);
}

const seedSerieId = async(countSerie) => {
    const category = [
        [
            "60f6423e8947a20489a9605e",
            "60f6423e8947a20489a9605f",
            "60f6423e8947a20489a96051",
            "60f6423e8947a20489a96052",
            "60f6423e8947a20489a96053",
            "60f6423e8947a20489a96054",
            "60f6423e8947a20489a96055"
        ],
        [
            "60f6423e8947a20489a9606e",
            "60f6423e8947a20489a9606f",
            "60f6423e8947a20489a96061"
        ],
        [
            "60f6423e8947a20489a9607e",
            "60f6423e8947a20489a9607f",
            "60f6423e8947a20489a96071",
            "60f6423e8947a20489a96072"
        ],
        [
            "60f6423e8947a20489a9608e",
            "60f6423e8947a20489a9608f",
            "60f6423e8947a20489a96081",
            "60f6423e8947a20489a96082",
            "60f6423e8947a20489a96083"
        ]
    ];

    const idFile = await getCSVFiles('id');
    const { content } = await getContentCSVFiles(idFile[0], ';');
    const startIdSeriePos = getRandomInt(10000 - countSerie);
    let result = '\n';

    for(let i = 0; i < countSerie; i++) {
        const randomCate = getRandomInt(category.length);
        const randomNumberCate = getRandomInt(3);
        let newCata = '[';
            const arrIndex = [];
            while(arrIndex.length <= randomNumberCate) {
                const randIndex = getRandomInt(category[randomCate].length);
                if(arrIndex.indexOf(randIndex) == -1) {
                    newCata += '"' + (category[randomCate][randIndex]) + '"' + ',';
                    arrIndex.push(randIndex);
                }
            }
        newCata = newCata.substring(0, newCata.length - 1) + ']';

        result += content[startIdSeriePos + i].split(',')[1] + ';' + newCata + '\n';
    }

    await writeFile('/home/khanhnd/Data/sota/nft/my_node/data/idSerie.csv', result.substring(0, result.length - 2));
}

const seedEpisode = async (coutPerSerie) => {
    const idFile = await getCSVFiles('id');
    const oldEpisodeFile = await getCSVFiles('oldEpisode');
    const idSerieFile = await getCSVFiles('idSerie');
    const userFile = await getCSVFiles('users');

    const idFileData = await getContentCSVFiles(idFile[0], ';');
    const oldEpisodeFileData = await getContentCSVFiles(oldEpisodeFile[0], ';');
    const idSerieFileData = await getContentCSVFiles(idSerieFile[0], ';');
    const userFileData = await getContentCSVFiles(userFile[0], ';');

    const keys = [
        "read/526e9d01-592f-44c9-9669-8b9d812e731a_TEN2_sample_210224",
        "read/0401ed50-7505-4b79-9b41-527e0745a4c6_TEN1_sample_210224",
        "read/d3c14d48-c040-455e-b2df-63cf9c6f46c0_TEN0_sample_210224",
    ];

    const thumbnails = [
        "https://nftjapan.s3.ap-southeast-1.amazonaws.com/image/a284ee5c-2323-4a50-86e9-54ff155d7d30-AriumWeb1x1.011.png",
        "https://nftjapan.s3.ap-southeast-1.amazonaws.com/image/17a0393f-bbff-494a-bb7d-e32f36413ced-AriumWeb1x1.031.png",
        "https://nftjapan.s3.ap-southeast-1.amazonaws.com/image/2cc26488-faf9-43fc-9214-da6fb8cf71b1-ep1.png",
    ];

    const chapters = [2,6,10,14,18,22,26,30,34,38,42,46,50,54,58,62,66];
    const pageNumbers = [18,21,6];

    const startIdSeriePos = getRandomInt(10000 - 2000);
    let result = '';
    let count = 0;
    let userIndex = 0;
    let userCountEpisode = 0;

    for(let i = 0; i < 120; i++) {
        const oldEpisodeField = cleanField(oldEpisodeFileData.content[i].split(';'));
        chapters.forEach((chap, index) => {
            if(!idSerieFileData.content[parseInt(count / coutPerSerie)]) return;
            if(!userFileData.content[userIndex]) return;

            const newName = oldEpisodeField[1].substring(0, oldEpisodeField[1].length - 1) + chap;
            const idSerieField = cleanField(idSerieFileData.content[parseInt(count / coutPerSerie)].split(';'))
            const newCate = idSerieField[1];
            const newSerieId = idSerieField[0];
            const newkey = keys[count % keys.length];
            const newPageNumber = pageNumbers[count % keys.length];
            const newDes = oldEpisodeField[6].substring(0, oldEpisodeField[6].length - 1) + chap;
            const newThumbnail = thumbnails[count % keys.length];
            const newAmount = "1";
            const newUserCreater = cleanField(userFileData.content[userIndex].split(';'))[0];
            const newPrice = getRandomInt(100);
            const new_id = cleanField(idFileData.content[count + startIdSeriePos].split(','))[1];
            const timeFirstPublish = generateDateTime(new Date(2021, 6, 19), new Date(2021,6,22)).toString();

            const isPublish = getRandomInt(2);

            if(userIndex < 10) {
                if(userCountEpisode < 99) userCountEpisode++;
                else {
                    userIndex++;
                    userCountEpisode = 0;
                }
            } else {
                if(userCountEpisode < 9) userCountEpisode++;
                else {
                    userIndex++;
                    userCountEpisode = 0;
                }
            }
            if(isPublish == 1){
                result += chap + ';' + newName + ';' + newCate + ';' + newkey + ';' + newPageNumber + ';' + new_id + ';'
                        + newDes + ';' + newSerieId + ';' + newThumbnail + ';' + newAmount + ';' + newUserCreater + ';' + newPrice + ';' + timeFirstPublish + '\n';
            }
            if(isPublish == 0){
                result += chap + ';' + newName + ';' + newCate + ';' + newkey + ';' + newPageNumber + ';' + new_id + ';'
                        + newDes + ';' + newSerieId + ';' + newThumbnail + ';' + newAmount + ';' + newUserCreater + ';' + newPrice + ';' + 'null' + '\n';
            }
            
            count++;
        })
    }

    await writeFile('/home/khanhnd/Data/sota/nft/my_node/data/newEpisode.csv', result.substring(0, result.length - 1));
}


// seedSerieId(200);
// seedEpisode(10);
