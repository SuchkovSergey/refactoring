import { formatCost } from '../utils';

export default (statementData) => {
    let result = `<h1>Statement for ${statementData.customer}</h1>\n`;
    result += '<table>\n';
    result += '<tr><th>play</th><th>seats</th><th>cost</th></tr>\n';
    statementData.playsData.forEach((playData) => {
        const { name, seatsAmount, cost } = playData;
        result += `<tr><td>${name}</td>`;
        result += `<td>${seatsAmount}</td>`;
        result += `<td>${formatCost(cost)}</td></tr>\n`;
    });
    result += '</table>\n';
    result += '<p>Amount owed is <em>';
    result += `${formatCost(statementData.totalCost)}</em></p>\n`;
    result += `<p>You earned <em>${statementData.totalCredits}`;
    result += `</em> credits</p>\n`;
    return result;
};