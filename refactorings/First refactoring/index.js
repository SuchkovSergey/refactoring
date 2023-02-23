import { formatCost, getPlayPropertiesByType, getPlayCost, getPlayCredits } from './utils';
import _ from 'lodash';

const getStatementData = (invoice, plays) => {
    const playsData = invoice.performances.map((performance) => {
        const currentPlay = plays[performance.playID];
        const playProperties = getPlayPropertiesByType(currentPlay.type);
        return {
            name: currentPlay.name,
            cost: getPlayCost(performance.audience, playProperties),
            creditsAmount: getPlayCredits(performance.audience, playProperties),
            seatsAmount: performance.audience,
        };
    });

    return {
        customer: invoice.customer,
        playsData,
        totalCost: _.sumBy(playsData, 'cost'),
        totalCredits: _.sumBy(playsData, 'creditsAmount'),
    };
};

const getFormattedStatement = (statementData) => {
    const headerText = `Statement for ${statementData.customer}`;
    const playsTexts = statementData.playsData.map((playData) => {
        const { name, seatsAmount, cost } = playData;
        return `  ${name}: ${formatCost(cost)}  (${seatsAmount} seats)`;
    });
    const owedAmountText = `Amount owed is ${formatCost(statementData.totalCost)}`;
    const earnedText = `You earned ${statementData.totalCredits} credits\n`;

    return [
        headerText,
        ...playsTexts,
        owedAmountText,
        earnedText,
    ].join('\n');
};

const getStatement = (invoice, plays) => {
    const statementData = getStatementData(invoice, plays);
    return getFormattedStatement(statementData);
};

export default getStatement;