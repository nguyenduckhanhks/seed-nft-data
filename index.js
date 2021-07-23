const Promise = require('bluebird');
import { getCSVFiles, getContentCSVFiles, cleanField } from './scanDataFile';
const { writeFile } = require('./file-utils');
import {generateName, randomDate} from './random';

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

