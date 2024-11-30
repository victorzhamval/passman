const bcrypt = require("bcrypt");
const DB = require("./../configs/config.db.js");
const JWTutils = require("../utils/util.jwt.js");
const storage = require("../utils/util.storage.js");
const { randomUUID } = require("crypto");

const uploadPfp = async (file) => {
  const { bytes, type } = file;
  const ext = type ? type.slice(type.indexOf("/") + 1) : "png";
  const name = randomUUID();
  await storage.uploadFile("uploads", name, ext, bytes);
  return `${name}.${ext}`;
}

const uploadDefaultPfp = async () => {
  const imageName = randomUUID();
  await storage.copyFile("user.png", imageName);
  return `${imageName}.png`;
}

const deletePfp = async (file) => {
  await storage.deleteFile(`uploads/${file}`);
}

const verifyToken = (_req, res) => {
  res.status(200).json({ message: "Valid token."});
}

const add = async (req, res) => {
  const { username, password, profileImage } = req.body;
  const userQuery = "SELECT username FROM users WHERE LOWER(username) = $1;";
  const userResult = await DB.query(userQuery, [username.toLowerCase()]);
  const userExists = userResult.rowCount > 0;
  if (!userExists) {
    const pfp = profileImage.bytes.length !== 0 ? await uploadPfp(profileImage) : await uploadDefaultPfp();
    const userID = randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserQuery = "INSERT INTO users (user_id, username, password, profile_image) VALUES ($1 ,$2, $3, $4);";
    const newUserQueryValues = [userID, username, hashedPassword, pfp];
    await DB.query(newUserQuery, newUserQueryValues);
    res.status(200).json({ message: "Account created correctly." });
  } else {
    res.status(400).json({ message: "User already exists." });
  }
}

const login = async (req, res) => {
  const { username, password } = req.body;
  const usersQuery = "SELECT * FROM users WHERE username=$1;";
  const usersList = await DB.query(usersQuery, [username]);
  const userExists = usersList.rowCount > 0;
  if (userExists) {
    const user = usersList.rows[0];
    const matchPasswords = await bcrypt.compare(password, user.password);
    if (matchPasswords) {
      const payload = { userID: user.user_id }
      const token = JWTutils.generate(payload);
      res.status(200).send({ message: `Welcome, ${username}`, token: token })
    } else {
      res.status(401).send({ message: "Incorrect password." })
    }
  } else {
    res.status(400).send({ message: "User doesn't exist." })
  }
}

const deleteUser = async (req, res) => {
  const { userID } = req.tokenData;
  const { password } = req.body;
  const userQuery = "SELECT password, profile_image FROM users WHERE user_id=$1;";
  const userResult = await DB.query(userQuery, [userID]);
  const user = userResult.rows[0];
  const passwordsMatches = await bcrypt.compare(password, user.password);
  if (passwordsMatches) {
    const deleteVaultsQuery = "DELETE FROM vaults where user_id=$1";
    const deleteUserQuery = "DELETE FROM users where user_id=$1;";
    await DB.query(deleteVaultsQuery, [userID]);
    await DB.query(deleteUserQuery, [userID]);
    await deletePfp(user.profile_image);
    res.status(200).json({ message: `Your account has been deleted.` });
  } else {
    res.status(401).send({ message: "Incorrect password." });
  }
}

const getProfile = async (req, res) => {
  const { userID } = req.tokenData;
  const query = "SELECT username, profile_image, description, created_at FROM users WHERE user_id = $1;";
  const queryResult = await DB.query(query, [userID]);
  const profile = queryResult.rows[0];
  const parsedProfile = {
    username: profile.username,
    profileImage: profile.profile_image,
    description: profile.description,
    createdAt: profile.created_at
  }
  res.status(200).json({ message: "Profile info loaded correctly.", profile: parsedProfile});
}

const changePassword = async (req, res) => {
  const { userID } = req.tokenData;
  const { password, newPassword } = req.body;
  const realPasswordQuery = "SELECT password FROM users WHERE user_id=$1;";
  const realPasswordResult = await DB.query(realPasswordQuery, [userID]);
  const realPassword = realPasswordResult.rows[0].password;
  const passwordsMatches = await bcrypt.compare(password, realPassword);
  if (passwordsMatches) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const changePasswordQuery = "UPDATE users SET password = $1 WHERE user_id = $2;";
    const changePasswordQueryValues = [hashedPassword, userID];
    await DB.query(changePasswordQuery, changePasswordQueryValues);
    res.status(200).send({ message: "Passsword changed successfully." });
  } else {
    res.status(401).send({ message: "Incorrect password." })
  }
}

const changeProfileImage = async (req, res) => {
  const { userID } = req.tokenData;
  const { profileImage } = req.body;
  const currPfpQuery = "SELECT profile_image FROM users WHERE user_id = $1;";
  const currPfpResult = await DB.query(currPfpQuery, [userID]);
  const currPfp = currPfpResult.rows[0].profile_image;
  const newPfpQuery = "UPDATE users SET profile_image = $1 WHERE user_id = $2;"
  const newPfp = await uploadPfp(profileImage);
  const newPfpQueryValues = [newPfp, userID];
  await DB.query(newPfpQuery, newPfpQueryValues);
  await deletePfp(currPfp);
  res.status(200).json({ message: "Profile picture successfully changed."});
}

const deleteProfileImage = async (req, res) => {
  const { userID } = req.tokenData;
  const pfpQuery = "SELECT profile_image FROM users WHERE user_id = $1;";
  const pfpResult = await DB.query(pfpQuery, [userID]);
  const pfp = pfpResult.rows[0].profile_image;
  const deletePfpQuery = "UPDATE users SET profile_image = $1 WHERE user_id = $2;";
  const defaultPfp = await uploadDefaultPfp();
  const deletePfpQueryValues = [defaultPfp, userID];
  await deletePfp(pfp);
  await DB.query(deletePfpQuery, deletePfpQueryValues);
  res.status(200).json({ message: "Profile picture successfully deleted."});
}

module.exports = {
  verifyToken,
  add,
  login,
  deleteUser,
  getProfile,
  changePassword,
  changeProfileImage,
  deleteProfileImage
}
