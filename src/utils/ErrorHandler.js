const ErrorHandler = (res, e) => {
  console.error(e.message);
  return res.status(400).json({ message: "Error in request" });
}

module.exports = {
  ErrorHandler
}