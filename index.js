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
            const newAmount = getRandomInt(10) + 1;
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

const seedCreator = async() => {
    const usersFile = await getCSVFiles('users');  
    const idFile = await getCSVFiles('id');

    const {content} = await getContentCSVFiles(usersFile[0], ';');
    const idFileData = await getContentCSVFiles(idFile[0], ';');

    let result = 'userid;creatorid \n';
    const startIdSeriePos = getRandomInt(10000 - 2000);
    await Promise.map(
        content,
        async (line, index) => {
            const field = cleanField(line.split(';'));
            result += field[0] + ';' + cleanField(idFileData.content[index + startIdSeriePos].split(','))[1] + '\n';
        }
    )
    await writeFile('/home/khanhnd/Data/sota/nft/my_node/data/newCreatorId.csv', result.substring(0, result.length - 1));
}
// seedCreator();

const seedSerieData = async() => {
    const idSerieFile = await getCSVFiles('idSerie');   
    const {content} = await getContentCSVFiles(idSerieFile[0], ';');

    const episodeFile = await getCSVFiles('newEpisode');   
    const episodeData = await getContentCSVFiles(episodeFile[0], ';');

    const creatorIdFile = await getCSVFiles('newCreatorId'); 
    const CreatorIdData = await getContentCSVFiles(creatorIdFile[0], ';');

    const headers = [
        "https://nftjapan.s3.ap-southeast-1.amazonaws.com/image/f0c37c95-af79-42d4-bd96-5888181031e8-AriumWeb20x9.004.png",
        "https://nftjapan.s3.ap-southeast-1.amazonaws.com/image/7a688421-b94a-48ad-9431-ae618a13cd40-AriumWeb20x9.002.png",
        "https://nftjapan.s3.ap-southeast-1.amazonaws.com/image/e84c4301-3e79-4813-ae80-4611552b4304-AriumWeb20x9.003.png",
    ];

    const thumbnails = [
        "https://nftjapan.s3.ap-southeast-1.amazonaws.com/image/346fa06b-c795-405d-b12c-63b8c21860d7-AriumWeb1x1.028.png",
        "https://nftjapan.s3.ap-southeast-1.amazonaws.com/image/45ed8c91-c904-4c35-b57e-1e15a4dfa883-AriumWeb1x1.003.png",
        "https://nftjapan.s3.ap-southeast-1.amazonaws.com/image/17a0393f-bbff-494a-bb7d-e32f36413ced-AriumWeb1x1.031.png",
        "https://nftjapan.s3.ap-southeast-1.amazonaws.com/image/7fa5fc19-e318-4c92-9478-1fc566b92e23-AriumWeb1x1.015.png"
    ];

    let result = '\n';
    await Promise.map(
        content,
        async (line, index) => {
            const serieFileField = cleanField(line.split(';'));

            const newSerieId = serieFileField[0];
            const newCate = serieFileField[1];
            
            let arrEpisodes = "[";
            let newUserCreater = "";
            let newCreatedBy = '';
            let newTimeRealed = '';
            episodeData.content.forEach(episo => {
                const arrData = cleanField(episo.split(';'));
                if(arrData[7] == newSerieId){
                    arrEpisodes += '"' + arrData[5] +'"' + ',';
                    newUserCreater = arrData[10];
                }
                if(newTimeRealed == '' && arrData[12] != 'null') newTimeRealed = arrData[12];
                else {
                    if(arrData[12] != 'null' && new Date(newTimeRealed) < new Date(arrData[12])) 
                        newTimeRealed = arrData[12];
                }
            })
            arrEpisodes = arrEpisodes.substring(0, arrEpisodes.length - 1) + ']';

            CreatorIdData.content.forEach(data => {
                const field = cleanField(data.split(';'));
                if(field[0] == newUserCreater)newCreatedBy = field[1];
            })

            const newName = generateNameSerie();
            const newSumary = generateDes();
            const newHeader = headers[index % headers.length];
            const newThumbnail = thumbnails[index % thumbnails.length];
            
            result += newSerieId + ';' + arrEpisodes + ';' + newCate + ';' + newName + ';' + newSumary + ';' + newHeader + ';' +
            newThumbnail + ';' + newCreatedBy + ';' + newUserCreater + ';' + newTimeRealed + '\n';
        }
    )
    await writeFile('/home/khanhnd/Data/sota/nft/my_node/data/newSeries.csv', result.substring(0, result.length - 1));
}

const seedCreatorTable = async () => {
    const creatorIdFile = await getCSVFiles('newCreatorId'); 
    const CreatorIdData = await getContentCSVFiles(creatorIdFile[0], ';');

    const seriesFile = await getCSVFiles('newSeries'); 
    const seriesData = await getContentCSVFiles(seriesFile[0], ';');

    let result = "\n";
    await Promise.map(
        CreatorIdData.content,
        async (line, index) => {
            const CreatorIdField = cleanField(line.split(';'));   
            const new_id = CreatorIdField[1];
            const newUser = CreatorIdField[0];
            let newSeries = '[';
            seriesData.content.forEach(data => {
                const field = cleanField(data.split(';'));
                if(field[8] == newUser){
                    newSeries += '"' + field[0] +'"' + ',';
                }
            })
            newSeries = newSeries.substring(0, newSeries.length - 1) + ']';

            result += new_id + ';' + newSeries + ';' + newUser + '\n';
        }
    )

    await writeFile('/home/khanhnd/Data/sota/nft/my_node/data/newCreator.csv', result.substring(0, result.length - 1));
}

const renderCustomer1 = async () => {
    const customerUserFile = await getCSVFiles('customerUser');
    const idFile = await getCSVFiles('id');

    const customerUserData = await getContentCSVFiles(customerUserFile[0], ';');
    const idFileData = await getContentCSVFiles(idFile[0], ';');

    let result = '\n';
    const startIdSeriePos = getRandomInt(10000 - 100);
    const customer = await Promise.map(
        customerUserData.content,
        async (line, index) => {
            const newUser = cleanField(line.split(';'))[0];
            const new_id = cleanField(idFileData.content[index + startIdSeriePos].split(','))[1];
            const newCarts = [];
            const newPayment = [];
            const newBookshelf = [];
            return {
                newUser,
                new_id,
                newCarts,
                newPayment,
                newBookshelf,
            }
        }
    )

    const episodeFile = await getCSVFiles('newTmp');
    const episodeData = await getContentCSVFiles(episodeFile[0], ';');

    const episodes = await Promise.map(episodeData.content,
        async (line) => {
            const field = cleanField(line.split(';'));
            return {
                _id: field[5],
                amount: field[9],
                price: field[11]
            }
        }    
    )

    let startTokenId = 100000000;
    const editions = episodes.map((data, index) => {
        return {
            episode: data._id,
            tokenId: startTokenId + index,
            amount: data.amount,
            buyer: [],
            amountPublish: Math.floor(Math.random(new Date()) * data.amount) + 1
        }
    })

    const txhash = [
        "0x2f70b15429e710b21e0990b624aac970b4897b92d906add1205e2eb828654842",
        "0x004ab2af0b8ee2a91425926b6fff58c29da4014c53aaa6032971e6fb3c1cafc9",
        "0x6c1f9edea3280f6152d2497b995893c42e661a8e579dbde5468f794a286c801b",
        "0xf2c368389ec2125b82f552f43fa0a602da8a5bcce7af5472e11b4eb1f937a3a7"
    ];

    const carts = [];
    const transactions = [];
    const startIdCartPos = getRandomInt(10000 - 100);

    await Promise.map(
        customer,
        async (customerData, index) => {
            const amoutBuy = Math.floor(Math.random(new Date()) * 10 + 10);

            const newCart = {
                _id: cleanField(idFileData.content[index + startIdCartPos].split(','))[1],
                isShopping: '',
                cartItems: [],
                user: customerData['new_id'], // customer id
            };
            for(let i = 0; i < amoutBuy; i++) {
                let randomEpisodeIndex = Math.floor(Math.random(new Date()) * episodes.length)
                let randomAmountBuy = getRandomInt(2) + 1;
                do{
                    randomEpisodeIndex = Math.floor(Math.random(new Date()) * episodes.length)
                    const editionData = editions[randomEpisodeIndex];
                    randomAmountBuy = getRandomInt(2) + 1;

                    let amountBuyed = 0;
                    editionData['buyer'].forEach(data => {
                        amountBuyed += data['amount'];
                    })

                } while(editions[randomEpisodeIndex]['amountPublish'] <= (randomAmountBuy + amountBuyed));

                const editionData = editions[randomEpisodeIndex];

                let amountBuyed = 0;
                editionData['buyer'].forEach(data => {
                    amountBuyed += data['amount'];
                })

                if(editionData['amountPublish'] > (randomAmountBuy + amountBuyed) ) {
                    const newBuyer = {
                        customer: customerData['new_id'],
                        amount: randomAmountBuy
                    }
                    editions[randomEpisodeIndex]['buyer'].push(newBuyer);
                    newCart['cartItems'].push({
                        quantity: randomAmountBuy,
                        episode: episodes[randomEpisodeIndex]['_id'],
                        price: episodes[randomEpisodeIndex]['price']
                    })
                    customer[index]['newBookshelf'].push(episodes[randomEpisodeIndex]['_id'])
                }
            }
            carts.push(newCart);
            transactions.push({
                fee:Math.floor(Math.random(new Date()) * 100000 + 100000),
                buyer: customerData['new_id'],
                txHash: txhash[index % txhash.length],
                cart: newCart['_id']
            });
        }
    )

    let resultCus = '\n';
    customer.forEach(cus => {
        resultCus += cus['new_id'] + ';' + '[]' + ';' + '[]' + ';' + JSON.stringify(cus['newBookshelf']) 
                    + ';' + cus['newUser'] + '\n';
    })
    await writeFile('/home/khanhnd/Data/sota/nft/my_node/data/newCustomer.csv', resultCus);

    let resultEdition = 'tokenId;episode;amount;buyer;amountPublish\n';
    editions.forEach(edi => {
        resultEdition += edi['tokenId'] + ';' + edi['episode'] + ';' + edi['amount'] + ';' + JSON.stringify(edi['buyer'])
                        + ';' + edi['amountPublish'] + '\n';
    })
    await writeFile('/home/khanhnd/Data/sota/nft/my_node/data/newEdittion.csv', resultEdition);

    let resultCart = '\n';
    carts.forEach(cart => {
        resultCart += cart['_id'] + ';' + cart['isShopping'] + ';' + JSON.stringify(cart['cartItems']) + ';' + cart['user'] + '\n';
    })
    await writeFile('/home/khanhnd/Data/sota/nft/my_node/data/newCart.csv', resultCart);

    let resultTransactions = '\n';
    transactions.forEach(tran => {
        resultTransactions += tran['fee'] + ';' + tran['buyer'] + ';' + tran['txHash'] + ';' + tran['cart'] + '\n';
    }) 
    await writeFile('/home/khanhnd/Data/sota/nft/my_node/data/newTransaction.csv', resultTransactions);
}
renderCustomer1();

// seedSerieId(200);
// seedEpisode(10);
// seedSerieData();
// seedCreatorTable();

const format = async() => {
    const file = await getCSVFiles('tmp');
    const {content} = await getContentCSVFiles(file[0], ';');

    let result = "\n";
    await Promise.map(
        content,
        async (line) => {
            const field = cleanField(line.split(';'));
            field.forEach((data, index) => {
                if(index != 9) result += data + ';';
                else {
                    result += getRandomInt(10) + 1 + ';';
                }
            })
            result = result.substring(0, result.length - 1) + '\n';
        }
    )

    await writeFile('/home/khanhnd/Data/sota/nft/my_node/data/newTmp.csv', result.substring(0, result.length - 1));
}

// format();
