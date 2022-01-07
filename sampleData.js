import fs from 'fs';

//const { config } = JSON.parse(fs.readFileSync('output.json'));
const readFile = () => new Promise((resolve, reject)  => {
    fs.readFile('output3.json', (err, data) => {
        if (err) throw err;
        resolve(JSON.parse(data));
    });
});

(async () => {

  let posts = [];

  posts = await readFile();
  posts = posts.slice(0, 10);
  let safety = [];
    let equipment = [];
    let state = [];

    for (let i in posts) {
        let post = posts[i];
        if (post[`Kilometraža`]) {
            post[`Kilometraža`] = Number(post[`Kilometraža`].split(' ')[0]);
        }
        if (post[`Kubikaža`]) {
            post[`Kubikaža`] = Number(post[`Kubikaža`].split(' ')[0]);
        }
        if (post[`Godište`]) {
            post[`Godište`] = Number(post[`Godište`].replace('.',''));
        }
        if (post[`Snaga motora`]) {
            post[`Snaga motora`] = post[`Snaga motora`].split(' ')[0];
        }
        if (post[`Broj sedišta`]) {
            post[`Broj sedišta`] = Number(post[`Broj sedišta`].split(' ')[0]);
        }
        if (post[`Broj vrata`]) {
            post[`Broj vrata`] = post[`Broj vrata`].split(' ')[0];
        }
       
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
  console.log(posts);
  let dataJSON = JSON.stringify(updatedPosts, null, 2);
  fs.writeFile("sampleData.json", dataJSON, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
  });


})()