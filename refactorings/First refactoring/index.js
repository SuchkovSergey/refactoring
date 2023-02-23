import {
    createPlayData,
    getTotalCost,
    getTotalCredits,
} from './utils';

import { renderStatement } from './formatters';

const getStatementData = (invoice, plays) => {
    const playsData = invoice.performances.map(createPlayData(plays));

    return {
        customer: invoice.customer,
        playsData,
        totalCost: getTotalCost(playsData),
        totalCredits: getTotalCredits(playsData),
    };
};

const getStatement = (invoice, plays, formatType = 'plain') => {
    const statementData = getStatementData(invoice, plays);
    return renderStatement(statementData, formatType);
};

export default getStatement;