//import someName from "./output.json";
import fs from 'fs';
import ObjectsToCsv from 'objects-to-csv';
//const { config } = JSON.parse(fs.readFileSync('output.json'));
const readFile = () => new Promise((resolve, reject)  => {
    fs.readFile('output.json', (err, data) => {
        if (err) throw err;
        resolve(JSON.parse(data));
    });
});
(async () => {
    let posts = [];

    posts = await readFile();
    let safety = [];
    let equipment = [];
    let state = [];

    for (let i in posts) {
        let post = posts[i];
        for (let i in post.safety) {
            let safetyItem = post.safety[i];
            if (!safety.includes(safetyItem)) {
                safety.push(safetyItem);
            }
        }
        for (let i in post.equipment) {
            let equipmentItem = post.equipment[i];
            if (!equipment.includes(equipmentItem)) {
                equipment.push(equipmentItem);
            }
        }
        for (let i in post.state) {
            let stateItem = post.state[i];
            if (!state.includes(stateItem)) {
                state.push(stateItem);
            }
        }
    }
    
    let updatedPosts = [];
    for (let i in posts) {
        let post = posts[i];
        for (let i in safety) {
            if (post.safety.includes(safety[i])) {
                post[`${safety[i]}`] = `1`;
            } else {
                post[`${safety[i]}`] = `0`; //ne ukljucuje
            }
        }
        for (let i in equipment) { 
            if (post.equipment.includes(equipment[i])) {
                post[`${equipment[i]}`] = `1`;
            } else {
                post[`${equipment[i]}`] = `0`; //ne ukljucuje
            }
        }
        for (let i in state) { 
            if (post.state.includes(state[i])) {
                post[`${state[i]}`] = `1`;
            } else {
                post[`${state[i]}`] = `0`;
            }
        }
        delete post.safety;
        delete post.equipment;
        delete post.state;
        updatedPosts.push(post);
        //console.log(post);
    }
    console.log(updatedPosts[0]);

    let dataJSON = JSON.stringify(updatedPosts);
    fs.writeFile("podaci.json", dataJSON, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });

    const csv = new ObjectsToCsv(updatedPosts);
    await csv.toDisk('./data_for_test.csv');
})();