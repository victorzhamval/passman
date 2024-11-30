const DB = require('./../configs/config.db.js');
const { randomUUID } = require('crypto');

const camelizeVaults = (vaults) => {
  let camelizedVaults = [];
  let camelizedVault =  {};

  for (let vault of vaults) {
    const {vault_id: id, site_url: siteUrl, ...others} = vault;
    camelizedVault = {
      id,
      siteUrl,
      ...others
    }
    camelizedVaults.push(camelizedVault);
  }
  return camelizedVaults;
}

const getVaults = async (req, res) => {
  const { userID } = req.tokenData;
  const query = 'SELECT * FROM vaults WHERE user_id = $1 ORDER BY created_at DESC;';
  const queryResult = await DB.query(query, [userID]);
  const vaults = queryResult.rows;
  const camelizedVaults = camelizeVaults(vaults);
  res.status(200).json({ message: "Vaults loaded successfully.", vaults: camelizedVaults});
}

const addVault = async (req, res) => {
  const { userID } = req.tokenData;
  const { title, username, password, siteUrl, description } = req.body;
  const vaultID = randomUUID();
  const query = 'INSERT INTO vaults (vault_id, title, username, password, site_url, description, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  const queryValues = [vaultID, title, username, password, siteUrl, description, userID];
  await DB.query(query, queryValues);
  res.status(200).json({ message: "Vault added successfully." });
}

const deleteVault = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM vaults where vault_id = $1";
  await DB.query(query, [id]);
  res.status(200).json({ message: "Vault deleted successfully." });
}

const updateVault = async (req, res) => {
  const { id } = req.params;
  const { title, username, password, siteUrl, description } = req.body;
  const query = 'UPDATE vaults SET title = $1, username = $2, password = $3, site_url = $4, description = $5 WHERE vault_id = $6;';
  const queryValues = [title, username, password, siteUrl, description, id];
  await DB.query(query, queryValues);
  res.status(200).json({ message: "Vault updated successfully." });
}

module.exports = {
  getVaults,
  addVault,
  deleteVault,
  updateVault
}
