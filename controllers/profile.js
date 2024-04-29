


const handleGetUser = (db) => (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found')
            }
        })
        // .catch(err => res.status(400).json('error getting user'))
        .catch(err => console.log("profile error"))
}

module.exports = {
    handleGetUser: handleGetUser
};