const asyncHandler = require('express-async-handler');
const { getOneById } = require('../../services/noticesService');

const getById = asyncHandler(async (req, res) => {
  const notice = await getOneById(req);

  if (!notice) {
    res.status(400).json({
      code: 400,
      status: 'bad request',
    });
  }

  res.status(200).json({
    code: 200,
    status: 'success',
    result: notice,
  });
});

module.exports = getById;
