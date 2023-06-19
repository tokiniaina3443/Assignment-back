function getOK(req, res) {
  res.json(req.user);
}

module.exports = { getOK };
