// const { notices } = require('../controllers');
const { Notice, User } = require('../models');
// const { id } = require('../schemas/joiSignupSchema');

const createNotice = async req => {
  const { _id, email, phone } = req.user;
  const createdNotice = await Notice.create({ ...req.body, owner: _id, email, phone });
  return createdNotice;
};

const getAllByCategories = async req => {
  const { category } = req.params;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  
  const notices = await Notice.find({ category });

  return notices;
};

const getOneById = async req => {
  const { noticeId } = req.params;
  const notice = await Notice.findById(noticeId);
  return notice;
};

const addDeleteToFavorite = async req => {
  const { noticeId } = req.params;
  const { _id } = req.user;
  const user = await User.findById(_id);
  // const notice = await Notice.findOne({ _id: noticeId, owner: user.id });

  if (!user) return null;

  const isNotice = user.favorite.find(el => el.toString() === noticeId);

  if (isNotice) {
    const arr = user.favorite.filter(notice => notice.toString() !== noticeId);
    user.favorite = arr;
    await user.save();
  } else if (!isNotice) {
    user.favorite.push(noticeId);
    await user.save();
    // await User.findOneAndUpdate({_id}, {$push: {favorite: [noticeId]}});
  }

  return user.favorite;
};

const getFavoriteNotices = async req => {
  const { _id } = req.user;
  const { favorite } = await User.findById(_id);
  const ids = favorite.map(el => el.toString());

  const notices = await Notice.find({});

  const favoriteNotices = ids.map(id => {
    return notices.find(notice => notice._id.toString() === id);
  });

  return favoriteNotices;
};

const getNoticesByUser = async req => {
  const { _id } = req.user;
  const notices = await Notice.find({ owner: _id });

  return notices;
};

const removeUserNotice = async req => {
  const { _id } = req.user;
  const { noticeId } = req.params;
  const deletedNotice = await Notice.findOneAndRemove({ _id: noticeId, owner: _id });

  if (!deletedNotice) return null;

  return true;
};

module.exports = {
  createNotice,
  getAllByCategories,
  getOneById,
  addDeleteToFavorite,
  getFavoriteNotices,
  getNoticesByUser,
  removeUserNotice,
};
