import express from 'express';
import axios from 'axios';
const app = express();
const apiKey =
  '1c8fdafb3ac839ad4639fee21f92bd77add2a9acb10c4f563fe9bf9bfe939802';
app.use(express.urlencoded());
app.use(express.json());

app.post('/over-adresu', async (req, res) => {
  const zadaneData = req.body;
  const streetName = zadaneData.adresa;
  const cp = zadaneData.cp;
  const municipalityName = zadaneData.mesto;

  const ruian = await axios.get(
    `https://ruian.fnx.io/api/v1/ruian/validate?apiKey=${apiKey}&municipalityName=${municipalityName}&cp=${cp}&street=${streetName}`
  );

  var data = ruian.data.place;

  console.log(ruian.data);
  res.write(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <h2>Adresa: ${data.streetName} ${data.cp}/${data.co}</h2>
      <h2>Město: ${data.municipalityName}, ${data.municipalityPartName}</h2>
      <h2>PSČ: ${data.zip}</h2>
      <h2>Kraj: ${data.regionName}</h2>
      <a href="/">zpět</a>
    </body
  </html>
  `);

  res.end();
});

app.get('/pevna-adresa', async (req, res) => {
  const municipalityName = 'Havířov';
  const cp = '513';
  const streetName = 'Makarenkova';

  const ruian = await axios.get(
    `https://ruian.fnx.io/api/v1/ruian/validate?apiKey=${apiKey}&municipalityName=${municipalityName}&cp=${cp}&street=${streetName}`
  );

  var data = ruian.data.place;

  console.log(ruian.data);
  res.write(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <h2>Adresa: ${data.streetName} ${data.cp}/${data.co}</h2>
      <h2>Město: ${data.municipalityName}, ${data.municipalityPartName}</h2>
      <h2>PSČ: ${data.zip}</h2>
      <h2>Kraj: ${data.regionName}</h2>
      <a href="/">zpět</a>
    </body
  </html>
  `);

  res.end();
});

app.get('/', (req, res) => {
  res.write(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <h1>vyhledávač adres</h1>
      <a href="/pevna-adresa">Makarenkova 513, Havířov</a>
      <br>
      <form method="POST" action="/over-adresu">
        <table>
          <tr>
            <td>
              <label>*Adresa</label>
            </td>
            <td>
              <input name="adresa" required>
            </td>
          </tr>
          <tr>
            <td>
              <label>*č.p.</label>
            </td>
            <td>
              <input name="cp" required>
            </td>
          </tr>
          <tr>
            <td>
              <label>*Město</label>
            </td>
            <td>
              <input name="mesto" required>
            </td>
          </tr>
          <tr>
          <td></td>
            <td style="float:right">
              <input type="submit">
            </td>
          </tr>
        <table>
      </form>
    </body
  </html>
  `);

  res.end();
  //res.json({ ok: 1 });
});

app.listen(1337, () => {
  console.log('XDDDDDDDDDDDD');
});
