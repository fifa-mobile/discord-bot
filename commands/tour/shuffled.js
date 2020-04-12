module.exports = (_y, data, rows) => {
  let value = [];
  for (let i = 0; i < data.count; i++) {
    const row = rows[i];
    value.push(row.team);
  }
  return value;
};
