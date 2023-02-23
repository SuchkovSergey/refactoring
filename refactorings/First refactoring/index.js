import { getPlayPropertiesByType, getPlayCost, getPlayCredits } from './utils';
import { renderStatement } from './formatters';
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

const getStatement = (invoice, plays, formatType = 'plain') => {
    const statementData = getStatementData(invoice, plays);
    return renderStatement(statementData, formatType);
};

export default getStatement;