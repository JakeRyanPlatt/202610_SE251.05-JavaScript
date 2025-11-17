const express = require(`express`)
const app = express()
const fs = require(`fs`);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.get('/favicon.ico', (req, res) => res.status(204));

const readFile = (path)=>{
  return new Promise(
    (resolve, reject)=>
    {
      fs.readFile(path, `utf8`, (err, data) => {
        if (err) {
         reject(err)
        }
        else
        {
          resolve(data)
        }
      });
    })
}


app.get(`/add`, (req, res)=>{
  const filePath = path.join(__dirname, `public`, `testform.html`)
  res.sendFile(filePath);
})

app.get('/jeep', async (req, res) => {
  var data = await readFile(`./data/jeep.json`);
  res.send(JSON.parse(data));
  });

app.post('/jeep', async (req, res) => { 
    var oldData =  await readFile(`./data/jeep.json`)
    var newData =  await JSON.parse(oldData)
    newData.push(req.body)
    const jsonString = JSON.stringify(newData);
    await fs.writeFile('./data/jeep.json', jsonString, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
    });
    res.send(jsonString);
});

app.post('/delete', async (req, res) => { 
<<<<<<< HEAD
  //add the delete functionality here.
  //read in the jeep.json file
  //splice out the correct index from the array
  //write the file again
});

//Start up the server on port 3000.
var port = process.env.PORT || 80
app.listen(port, ()=>{
    console.log("Server Running at Localhost:80")
=======
  try {
    const body = req.body || {};
    console.log('DELETE request body:', body);
    const index = parseInt(body.index);
    console.log('Parsed index:', index);
    const oldData = await readFile(`./data/jeep.json`);
    const arr = JSON.parse(oldData);
    console.log('Current array length:', arr.length);
    if (!Number.isInteger(index) || index < 0 || index >= arr.length) {
      return res.status(400).send({ error: 'Invalid index' });
    }
    arr.splice(index, 1);
    const jsonString = JSON.stringify(arr, null, 2);
    fs.writeFile('./data/jeep.json', jsonString, err => {
      if (err) {
        console.log('Error writing file', err)
        return res.status(500).send({ error: 'Failed to write file' })
      } else {
        console.log('Successfully wrote file')
        return res.send(arr)
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Server error' })
  }
});

//Start up the server on port 3000.
var port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Server Running at Localhost:3000")
>>>>>>> 3f3eb2ceacdf4ed5fae31a93be73321e40f2e3a9
})