

const handlePutImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

const handleApiCall = (req, res) => {
    const PAT = 'e53f23ed7b07471caf0bec6692c20a1d';
    const USER_ID = 'norris52';       
    const APP_ID = 'smart-brain';
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = req.body.input;
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
}

module.exports = {
    handlePutImage: handlePutImage,
    handleApiCall: handleApiCall
};