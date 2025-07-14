export const notfound = (req, res) => {
  res.status(404).json({ message: "Sorry can't find that!" });
};