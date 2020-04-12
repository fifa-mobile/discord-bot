module.exports = (_y, data, teams) => {
  const groupCount = data.groups;
  let id = 0;
  let groups = [];
  for (let i = 0; i < groupCount.length; i++) {
    let group = [];
    for (let j = 0; j < groupCount[i]; j++) {
      group.push(teams[id]);
      id++;
    }
    groups.push(group);
  }
  return groups;
};
