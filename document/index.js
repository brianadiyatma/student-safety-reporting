module.exports = (args) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <style>
      table,
      th,
      td {
        border: 1px solid black;
        border-collapse: collapse;
      }
      th,
      td {
        padding: 5px;
        text-align: left;
      }
    </style>
  </head>
  <body>
    <h2 style="text-align: center">${args.accident}</h2>

    <table style="width: 100%">
      <tr style="height: 80px">
        <th>CALLSIGN</th>
        <td>${args.callsign}</td>
      </tr>
      <tr style="height: 80px">
        <th>TYPE OF AIRCRAFT</th>
        <td>${args.aircraftType}</td>
      </tr>
      <tr style="height: 80px">
        <th>TIME</th>
        <td>${args.time}</td>
      </tr>
      <tr style="height: 80px">
        <th>POB</th>
        <td>${args.personOnBoard}</td>
      </tr>
      <tr style="height: 80px">
        <th>OCCURANCE</th>
        <td>${args.occurance}</td>
      </tr>
      <tr style="height: 80px">
        <th>CAUSED</th>
        <td>${args.cause}</td>
      </tr>
      <tr style="height: 80px">
        <th>ADDITIONAL THE DETAIL OF THE OCCURENCE</th>
        <td>${args.details}</td>
      </tr>
      <tr style="height: 80px">
        <th>Safety Index</th>
        <td>${args.score}</td>
      </tr>
    </table>
  </body>
</html>
`;
};
