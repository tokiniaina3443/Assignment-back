function getOK(req, res) {
    res.json({message:req.user});
}

module.exports = { getOK };