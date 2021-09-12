const Promise = require('bluebird');
import { getCSVFiles, getContentCSVFiles, cleanField } from './scanDataFile';
const { writeFile } = require('./file-utils');
import {generateName, randomDate, generateDateTime, generateNameSerie, generateDes} from './random';


const getRandomInt = max => {
    return Math.floor(Math.random() * max);
}

const genTotalLikeSerie = async() => {
    const serieFile = '/home/khanhnd/Data/sota/nft/my_node/oldData/serie.csv'; 
    const {content} = await getContentCSVFiles(serieFile, ';');
    
    let result = '\n';
    await Promise.map(
        content,
        async(row, index) => {
            const typeTotaLike = Math.floor(Math.random(new Date()) * 5);
            let totalLike = 0;
            if(typeTotaLike == 0) {
                totalLike = Math.random(new Date()) * (1000 - 0) + 0
            }
            if(typeTotaLike == 1) {
                totalLike = Math.random(new Date()) * (10000 - 1000) + 1000
            }
            if(typeTotaLike == 2) {
                totalLike = Math.random(new Date()) * (100000 - 10000) + 10000
            }
            if(typeTotaLike == 3) {
                totalLike = Math.random(new Date()) * (1000000 - 100000) + 100000
            }
            if(typeTotaLike == 4) {
                totalLike = Math.random(new Date()) * (10000000 - 1000000) + 1000000
            }
            result += row + ';' + parseInt(totalLike) + '\n';
        }
    )
    await writeFile('/home/khanhnd/Data/sota/nft/my_node/newSerie.csv', result.substring(0, result.length - 1));
}


const genTotalLikeEpisode = async() => {
    const episodeFile = '/home/khanhnd/Data/sota/nft/my_node/oldData/episode.csv'; 
    const {content} = await getContentCSVFiles(episodeFile, ';');
    
    let result = '\n';
    await Promise.map(
        content,
        async(row, index) => {
            const typeTotaLike = Math.floor(Math.random(new Date()) * 5);
            let totalLike = 0;
            if(typeTotaLike == 0) {
                totalLike = Math.random(new Date()) * (1000 - 0) + 0
            }
            if(typeTotaLike == 1) {
                totalLike = Math.random(new Date()) * (10000 - 1000) + 1000
            }
            if(typeTotaLike == 2) {
                totalLike = Math.random(new Date()) * (100000 - 10000) + 10000
            }
            if(typeTotaLike == 3) {
                totalLike = Math.random(new Date()) * (1000000 - 100000) + 100000
            }
            if(typeTotaLike == 4) {
                totalLike = Math.random(new Date()) * (10000000 - 1000000) + 1000000
            }
            result += row + ';' + parseInt(totalLike) + '\n';
        }
    )
    await writeFile('/home/khanhnd/Data/sota/nft/my_node/newEpisode.csv', result.substring(0, result.length - 1));
}


const genTotalFollower = async() => {
    const creatorFile = '/home/khanhnd/Data/sota/nft/my_node/oldData/creator.csv'; 
    const {content} = await getContentCSVFiles(creatorFile, ';');
    
    let result = '\n';
    await Promise.map(
        content,
        async(row, index) => {
            const typeTotaLike = Math.floor(Math.random(new Date()) * 5);
            let totalLike = 0;
            if(typeTotaLike == 0) {
                totalLike = Math.random(new Date()) * (1000 - 0) + 0
            }
            if(typeTotaLike == 1) {
                totalLike = Math.random(new Date()) * (10000 - 1000) + 1000
            }
            if(typeTotaLike == 2) {
                totalLike = Math.random(new Date()) * (100000 - 10000) + 10000
            }
            if(typeTotaLike == 3) {
                totalLike = Math.random(new Date()) * (1000000 - 100000) + 100000
            }
            if(typeTotaLike == 4) {
                totalLike = Math.random(new Date()) * (10000000 - 1000000) + 1000000
            }
            result += row + ';' + parseInt(totalLike) + '\n';
        }
    )
    await writeFile('/home/khanhnd/Data/sota/nft/my_node/newCreator.csv', result.substring(0, result.length - 1));
}

const genMoreEpisode = async(serieId, cate) => {
    const idFile = await getCSVFiles('id');

    const idFileData = await getContentCSVFiles(idFile[0], ';');

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

    const chapters = [
        2,   6,  10,  14,  18,  22,  26,  30,  34,  38,  42,
       46,  50,  54,  58,  62,  66,  70,  74,  78,  82,  86,
       90,  94,  98, 102, 106, 110, 114, 118, 122, 126, 130,
      134, 138, 142, 146, 150, 154, 158, 162, 166, 170, 174,
      178, 182, 186, 190, 194, 198, 202, 206, 210, 214, 218,
      222, 226, 230, 234, 238, 242, 246, 250, 254, 258, 262,
      266, 270, 274, 278
    ];
    const pageNumbers = [18,21,6];
    const startIdSeriePos = Math.floor(Math.random(new Date()) * 10000 - 2000);

    let result = '';

    let isFree = true;
    let arr_ID = [];
    chapters.forEach((chap, index) => {
        const newName = generateNameSerie() + chap;
        const newCate = cate;
        const newSerieId = serieId;
        const newkey = keys[index % keys.length];
        const newPageNumber = pageNumbers[index % keys.length];
        const newDes = generateDes() + chap;
        const newThumbnail = thumbnails[index % keys.length];
        const newAmount = getRandomInt(10) + 1;
        const newUserCreater = '60cabc8c27a131004ccec0bb';
        const newPrice = isFree ? 0 : getRandomInt(100);
        const new_id = cleanField(idFileData.content[index + startIdSeriePos].split(','))[1];
        const timeFirstPublish = generateDateTime(new Date(2021, 6, 19), new Date(2021,6,22)).toString();

        const typeTotaLike = Math.floor(Math.random(new Date()) * 5);
        let totalLike = 0;
        if(typeTotaLike == 0) {
            totalLike = Math.random(new Date()) * (1000 - 0) + 0
        }
        if(typeTotaLike == 1) {
            totalLike = Math.random(new Date()) * (10000 - 1000) + 1000
        }
        if(typeTotaLike == 2) {
            totalLike = Math.random(new Date()) * (100000 - 10000) + 10000
        }
        if(typeTotaLike == 3) {
            totalLike = Math.random(new Date()) * (1000000 - 100000) + 100000
        }
        if(typeTotaLike == 4) {
            totalLike = Math.random(new Date()) * (10000000 - 1000000) + 1000000
        }

        const isPublish = 1;

        if(isPublish == 1){
            result += chap + ';' + newName + ';' + newCate + ';' + newkey + ';' + newPageNumber + ';' + new_id + ';'
                    + newDes + ';' + newSerieId + ';' + newThumbnail + ';' + newAmount + ';' + newUserCreater + ';' + newPrice + ';' + timeFirstPublish + ';' + parseInt(totalLike) + '\n';
            arr_ID.push(new_id);
        }
        isFree = !isFree;
    })
    await writeFile('/home/khanhnd/Data/sota/nft/my_node/newEpisodeMore.csv', result.substring(0, result.length - 1));
    await writeFile('/home/khanhnd/Data/sota/nft/my_node/hihi.csv', JSON.stringify(arr_ID));
}

const genMoreEdition = async() => {
    const episodeFile = '/home/khanhnd/Data/sota/nft/my_node/newEpisodeMore.csv';
    const {content} = await getContentCSVFiles(episodeFile, ';');

    let result='';
    await Promise.map(
        content,
        async(row, index) => {
            const tokenId = 100001500 + index;
            const episode = cleanField(row.split(';'))[5]
            const amount = cleanField(row.split(';'))[9];
            const buyer = '[]';
            const amountPublish = getRandomInt(amount);

            result += tokenId + ';' + episode + ';' + amount + ';' + buyer + ';' + amountPublish + '\n';
        }
    )
    await writeFile('/home/khanhnd/Data/sota/nft/my_node/eidtion.csv', result);
}

const gentMoreEpisode = async() => {
    const idFile = await getCSVFiles('id');
    const idFileData = await getContentCSVFiles(idFile[0], ';');
    const startIdSeriePos = getRandomInt(10000 - 100);

    const createdBy = '60cabc7c27a131004ccea628';
    const userCreator = '60cabc8c27a131004ccec0bb';

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

    let arrId = '';
    let result = '';
    for (let i = 0; i <50; i++) {
        const newSerieId = cleanField(idFileData.content[i + startIdSeriePos].split(','))[1];
        const episodes = "";
        const category = `["60f6423e8947a20489a9605f","60f6423e8947a20489a96052"]`;
        const name = generateNameSerie();
        const summary = generateDes();
        const header = headers[i % headers.length];
        const newThumbnail = thumbnails[i % thumbnails.length];
        const newTimeRealed = generateDateTime(new Date(2021, 6, 19), new Date(2021,6,22)).toString();

        const typeTotaLike = Math.floor(Math.random(new Date()) * 5);
        let totalLike = 0;
        if(typeTotaLike == 0) {
            totalLike = Math.random(new Date()) * (1000 - 0) + 0
        }
        if(typeTotaLike == 1) {
            totalLike = Math.random(new Date()) * (10000 - 1000) + 1000
        }
        if(typeTotaLike == 2) {
            totalLike = Math.random(new Date()) * (100000 - 10000) + 10000
        }
        if(typeTotaLike == 3) {
            totalLike = Math.random(new Date()) * (1000000 - 100000) + 100000
        }
        if(typeTotaLike == 4) {
            totalLike = Math.random(new Date()) * (10000000 - 1000000) + 1000000
        }

        arrId += '"' + newSerieId + '",' ;

        result += newSerieId + ';' + episodes + ';' + category + ';' + name + ';' + summary + ';' + header + ';' + newThumbnail
        + ';' + createdBy + ';' + userCreator + ';' + newTimeRealed + ';' + parseInt(totalLike) + '\n';

    }

    result += arrId.toString();
    await writeFile('/home/khanhnd/Data/sota/nft/my_node/MORE_SERIE.csv', result.substring(0, result.length - 1));

}

gentMoreEpisode();