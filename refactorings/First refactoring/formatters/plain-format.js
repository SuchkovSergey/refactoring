import { formatCost } from '../utils';

export default (statementData) => {
    let result = `Statement for ${statementData.customer}\n`;
    statementData.playsData.forEach((playData) => {
        const { name, seatsAmount, cost } = playData;
        result += `  ${name}: ${formatCost(cost)}  (${seatsAmount} seats)\n`;
    });
    result += `Amount owed is ${formatCost(statementData.totalCost)}\n`;
    result += `You earned ${statementData.totalCredits} credits\n`;
    return result;
};