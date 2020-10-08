module.exports = async (m, args) => {
  const y = require('../core/base');
  const { GoogleSpreadsheet } = require(
    'google-spreadsheet'
  );
  args = args.filter(
    arg =>
    !y.Discord.MessageMentions.CHANNELS_PATTERN.test(
      arg
    )
  );

  for (let i = 0; i < 4; i++) {
    if (!args[i]) {
      return m.channel.send(
        `<:info:751794158162935838> | 4 arguments needed:OVR1 Chem1 OVR2 Chem2`
      );
    }
    if (isNaN(Number(args[i]))) {
      return m.channel.send(
        `<:info:751794158162935838> | Argument #${i+1} isNaN (Not a Number)!`
      );
    }
  }

  const spreadSheet = y.c.insource.spreadSheets.chance;
  const doc = new GoogleSpreadsheet(spreadSheet.id);

  await doc.useServiceAccountAuth(y.c.google);
  await doc.loadInfo();

  console.log(doc.title);

  const sheet = doc.sheetsByIndex[0];

  console.log(
    sheet.title, sheet.rowCount
  );

  const rows = await sheet.getRows();
  const data = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const datum = [
      Number(row.ovr), Number(row.great),
      Number(row.good),
      isNaN(
        Number(row.basic)
      ) ? 0 : Number(row.basic),
      isNaN(
        Number(row.counter)
      ) ? 0 : Number(row.counter),
    ];
    data.push(datum);
  }

  const rating = new Rating(
    args[0], args[1], args[2], args[3], data
  );

  return m.channel.send(rating.toString());
};

class Rating {
  constructor (ovr1, chm1, ovr2, chm2, data) {
    this.ovr1 = ovr1;
    this.chm1 = chm1;
    this.total1 = Number(ovr1) + Math.floor(
      Number(chm1) / 10
    );
    this.ovr2 = ovr2;
    this.chm2 = chm2;
    this.total2 = Number(ovr2) + Math.floor(
      Number(chm2) / 10
    );

    this.stat1 = this.total1 - this.total2;
    this.stat2 = this.total2 - this.total1;
    this.data = data;
  }

  toChances(stat) {
    /*
    console.log(`finding chances for stat`, stat);
    console.log(this.data);
    */

    let result = '';
    let chances = [];

    chances = [...(this.data.find(e => e[0] === stat))];

    if (chances === undefined) {
      if (stat > 0) {
        chances = [...(this.data[this.data.length - 1])];
      }
      if (stat < 0) {
        chances = [...this.data[0]];
      }
    }

    /*
    console.log(chances);
    */

    chances.shift();
    chances = chances.filter(value => value > 0);
    result += `${chances.join('-')}`;

    return result;
  }

  toString() {
    let result = '';
    result +=
      `${this.total1}(${this.stat1})`
      + ` vs `
      + `${this.total2}(${this.stat2})`;
    result += `\n`;

    /*
    for (let i = 0; i < this.data.length; i++) {
      const datum = this.data[i];
      console.log(`#${i}`, datum);
    }
    */

    result += `1st player chances: `;
    result += `${this.toChances(this.stat1)}`;

    result += `\n`;

    result += `2nd player chances: `;
    result += `${this.toChances(this.stat2)}`;

    result += `\n`;

    return result
  }
}
