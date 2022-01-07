import fetch from 'node-fetch';
import jsdom from 'jsdom';
import ObjectsToCsv from 'objects-to-csv';
import fs from 'fs';
//const fs = require('fs');

const { JSDOM } = jsdom;

const sleep = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

console.log("run");



(async () => {
    try {
        let links = [];
        let postData = [];
        for (let page = 1; page < 2; page++) {
            console.log(">>>>>>>")
            console.log(page)
            
            const response = await fetch(`https://www.polovniautomobili.com/auto-oglasi/pretraga?page=${page}&sort=basic&city_distance=0&showOldNew=all&without_price=1`)
            const data = await response.text();
        
            
            //let links = [];
            let postData = [];
            const dom = new JSDOM(data);

            let article = Array.from(dom.window.document.querySelectorAll("article"));
        
            article.forEach(item => {
                //console.log(item.querySelector(`.textContentHolder`));
                if (item.querySelector(`.textContentHolder`) != null) {
                    let link = `https://www.polovniautomobili.com`.concat(item.querySelector(`.textContentHolder > .textContent > h2 > a`).getAttribute('href'));
                    if (!links.includes(link)) {
                        links.push(link);
                    }
                    
                }
            });
            //console.log(links);
            let ul = dom.window.document.querySelector('.uk-pagination');
            let li = ul.querySelectorAll('li');
        
            if (li[li.length - 1].getAttribute('class') != null && li[li.length - 1].getAttribute('class') == 'uk-active') {
                console.log("here is last");
                break;
            }
        
            await sleep(2);
        }
        console.log(links);

        //links.forEach( item => {
        for (let i in links) {
            const response = await fetch(`${links[i]}`);
            const dataResponse = await response.text();
            const domPost = new JSDOM(dataResponse);
            console.log("56" + links[i]);
            //let sections = Array.from(domPost.window.document.querySelectorAll(`section > section`));
            let sections = domPost.window.document.querySelector(`section > section`);
            let price = domPost.window.document.querySelector(`.financing > span`);
            let priceValue;
            try {
                priceValue = Number(price.innerHTML.match(/\d+/g).join(''));
            } catch(err) {
                console.log(err);
                continue;
            }
            //sekcija opste inf , dodatne inf
            //console.log("41" + sections);
            //sections.map( item => {
            let objToSave = {};
            objToSave[`link`] = links[i];
            objToSave[`price`] = priceValue;
            console.log(priceValue)
            let infoBox =  sections.querySelector(`.infoBox`);
            if (infoBox) { 
            // console.log("70" + infoBox.innerHTML);
                let basicInfDiv = infoBox.querySelector(`.uk-width-1-1 > .uk-grid`);
                if (basicInfDiv) { 
                    let allLeftData  = basicInfDiv.querySelector(`.uk-width-large-1-2.uk-width-medium-1-1.uk-width-1-1`);
                    let allDividerLeft =  Array.from(allLeftData.querySelectorAll(`.divider`));
                    allDividerLeft.map(item => {
                        let label = item.querySelector(`.uk-grid`).firstElementChild.innerHTML;
                        let value = item.querySelector(`.uk-grid`).firstElementChild.nextElementSibling.innerHTML
                        label = label.replace(':', '');
                        objToSave[`${label}`] = value;
                        //console.log(label + ' ' + value);
                    });
                    let allRightData  = basicInfDiv.querySelector(`.uk-width-medium-1-2`);
                    let allDividerRight = Array.from(allRightData.querySelectorAll(`.divider`));
                    allDividerRight.map(item => {
                        let label = item.querySelector(`.uk-grid`).firstElementChild.innerHTML;
                        let value = item.querySelector(`.uk-grid`).firstElementChild.nextElementSibling.innerHTML
                        label = label.replace(':', '');
                        objToSave[`${label}`] = value;
                        //console.log(label + ' ' + value);
                    });
                }
            }
        
            let sections4 =  Array.from(domPost.window.document.querySelectorAll(`section > .uk-width-1-1 > .infoBox > .uk-grid.js-hidden.uk-margin-top`));
            let aditionalInfo = sections4[0];
            //console.log( ' ' + aditionalInfo.innerHTML);
            if (aditionalInfo) {
                let leftInfo = aditionalInfo.firstElementChild;
                let rightInfo = aditionalInfo.firstElementChild.nextElementSibling;
                let allDividerLeft =  Array.from(leftInfo.querySelectorAll(`.divider`));
                allDividerLeft.map(item => {
                    let label = item.querySelector(`.uk-grid`).firstElementChild.textContent;
                    let value = item.querySelector(`.uk-grid`).firstElementChild.nextElementSibling.textContent
                    label = label.replace(':', '');
                    objToSave[`${label}`] = value;
                    //console.log(label + ' ' + value);
                });
                let allDividerRight = Array.from(rightInfo.querySelectorAll(`.divider`));
                allDividerRight.map(item => {
                    let label = item.querySelector(`.uk-grid`).firstElementChild.textContent;
                    let value = item.querySelector(`.uk-grid`).firstElementChild.nextElementSibling.textContent
                    label = label.replace(':', '');
                    objToSave[`${label}`] = value;
                    //console.log(label + ' ' + value);
                });
            }
            let safety = sections4[1];
            if (safety) {
                let allSafety=  Array.from(safety.querySelectorAll(`.uk-width-medium-1-4.uk-width-1-2.uk-margin-small-bottom`));
                let arrSafety = [];
                allSafety.map(item => {
                    arrSafety.push(`${item.innerHTML}`);
                });
                objToSave[`safety`] = arrSafety;
            } else {
                objToSave[`safety`] = [];
            }
        
            let equipment = sections4[2];
            if (equipment) {
                let allEquipment =  Array.from(equipment.querySelectorAll(`.uk-width-medium-1-4.uk-width-1-2.uk-margin-small-bottom`));
                let arrEquipment = [];
                allEquipment.map(item => {
                    arrEquipment.push(`${item.innerHTML}`);
                });
                objToSave[`equipment`] = arrEquipment;
            } else {
                objToSave[`equipment`] = [];
            }
        
            let state = sections4[3];
            if (state) {
                let allState = Array.from(state.querySelectorAll(`.uk-width-medium-1-4.uk-width-1-2.uk-margin-small-bottom`));
                let arrState = [];
                allState.map(item => {
                    console.log(item.innerHTML);
                    arrState.push(`${item.innerHTML}`);
                });
                objToSave[`state`] = arrState;
            } else {
                objToSave[`state`] = [];
            }
            
            let desc = domPost.window.document.querySelector(`section > .uk-width-1-1 > .infoBox > .uk-grid.uk-margin-top > .uk-width-1-1.description-wrapper`);
            if (desc) {
                let descText = desc.innerHTML.replace(/<br>/g, '');
                descText = descText.replace(/\s/g, ' ') ;
                objToSave[`description`] =  `${descText}`;
            } else {
                objToSave[`description`] = '';
            }
            postData.push(objToSave)
            //}) 
            await sleep(2);
        }
        //});

        //console.log(postData);
        let dataJSON = JSON.stringify(postData);
        //console.log(postData[0]);
        //console.log(dataJSON);
        fs.writeFile("output.json", dataJSON, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
        
            console.log("JSON file has been saved.");
        });
    } catch (err) {
        console.log(err.toString);
    }
    //const csv = new ObjectsToCsv(postData);
    //await csv.toDisk('./data4.csv');
})();



/*await links.forEach(async (item) => {
    
    const response = await fetch(`${item}`);
    const dataResponse = await response.text();
    const domPost = new JSDOM(dataResponse);
    console.log(item);
    //let sections = Array.from(domPost.window.document.querySelectorAll(`section > section`));
    let sections = domPost.window.document.querySelector(`section > section`);
    //sekcija opste inf , dodatne inf
    //console.log("41" + sections);
    //sections.map( item => {
    let objToSave = {};
    objToSave[`link`] = item;
    let infoBox =  sections.querySelector(`.infoBox`);
    if (infoBox) { 
       // console.log("70" + infoBox.innerHTML);
        let basicInfDiv = infoBox.querySelector(`.uk-width-1-1 > .uk-grid`);
        if (basicInfDiv) { 
            let allLeftData  = basicInfDiv.querySelector(`.uk-width-large-1-2.uk-width-medium-1-1.uk-width-1-1`);
            let allDividerLeft =  Array.from(allLeftData.querySelectorAll(`.divider`));
            allDividerLeft.map(item => {
                let label = item.querySelector(`.uk-grid`).firstElementChild.innerHTML;
                let value = item.querySelector(`.uk-grid`).firstElementChild.nextElementSibling.innerHTML
                label = label.replace(':', '');
                objToSave[`${label}`] = value;
                //console.log(label + ' ' + value);
            });
            let allRightData  = basicInfDiv.querySelector(`.uk-width-medium-1-2`);
            let allDividerRight = Array.from(allRightData.querySelectorAll(`.divider`));
            allDividerRight.map(item => {
                let label = item.querySelector(`.uk-grid`).firstElementChild.innerHTML;
                let value = item.querySelector(`.uk-grid`).firstElementChild.nextElementSibling.innerHTML
                label = label.replace(':', '');
                objToSave[`${label}`] = value;
                //console.log(label + ' ' + value);
            });
        }
    }

    let sections4 =  Array.from(domPost.window.document.querySelectorAll(`section > .uk-width-1-1 > .infoBox > .uk-grid.js-hidden.uk-margin-top`));
    let aditionalInfo = sections4[0];
    //console.log( ' ' + aditionalInfo.innerHTML);
    if (aditionalInfo) {
        let leftInfo = aditionalInfo.firstElementChild;
        let rightInfo = aditionalInfo.firstElementChild.nextElementSibling;
        let allDividerLeft =  Array.from(leftInfo.querySelectorAll(`.divider`));
        allDividerLeft.map(item => {
            let label = item.querySelector(`.uk-grid`).firstElementChild.innerHTML;
            let value = item.querySelector(`.uk-grid`).firstElementChild.nextElementSibling.innerHTML
            label = label.replace(':', '');
            objToSave[`${label}`] = value;
            //console.log(label + ' ' + value);
        });
        let allDividerRight = Array.from(rightInfo.querySelectorAll(`.divider`));
        allDividerRight.map(item => {
            let label = item.querySelector(`.uk-grid`).firstElementChild.innerHTML;
            let value = item.querySelector(`.uk-grid`).firstElementChild.nextElementSibling.innerHTML
            label = label.replace(':', '');
            objToSave[`${label}`] = value;
            //console.log(label + ' ' + value);
        });
    }
    let safety = sections4[1];
    if (safety) {
     
        let allSafety=  Array.from(safety.querySelectorAll(`.uk-width-medium-1-4.uk-width-1-2.uk-margin-small-bottom`));
        let arrSafety = [];
        allSafety.map(item => {
            arrSafety.push(item.innerHTML);
        });
        objToSave[`safety`] = arrSafety;
    } else {
        objToSave[`safety`] = [];
    }

    let equipment = sections4[2];
    if (equipment) {
        let allEquipment =  Array.from(equipment.querySelectorAll(`.uk-width-medium-1-4.uk-width-1-2.uk-margin-small-bottom`));
        let arrEquipment = [];
        allEquipment.map(item => {
            arrEquipment.push(item.innerHTML);
        });
        objToSave[`equipment`] = arrEquipment;
    } else {
        objToSave[`equipment`] = [];
    }

    let state = sections4[3];
    if (state) {
        let allState = Array.from(equipment.querySelectorAll(`.uk-width-medium-1-4.uk-width-1-2.uk-margin-small-bottom`));
        let arrState = [];
        allState.map(item => {
            arrState.push(item.innerHTML);
        });
        objToSave[`state`] = arrState;
    } else {
        objToSave[`state`] = [];
    }
    
    let desc = domPost.window.document.querySelector(`section > .uk-width-1-1 > .infoBox > .uk-grid.uk-margin-top > .uk-width-1-1.description-wrapper`);
    objToSave[`description`] = desc ? desc.innerHTML : '';
    
    //console.log(objToSave);
    postData.push(objToSave)
    //}) 

    await sleep(2);
});*/