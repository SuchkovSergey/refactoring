import { formatCost } from './utils';
import { PLAY_PROPERTIES_BY_TYPE } from './const';

const getPlayPropertiesByType = (playType) => {
    const settings = PLAY_PROPERTIES_BY_TYPE[playType];
    if (!settings) {
        throw new Error(`unknown type: ${playType}`);
    }
    return settings;
};

const getPlayCost = (audience, playProperties) => playProperties.getCosts(audience);

const getPlayCredits = (audience, playProperties) => Math.max(audience - 30, 0)
    + playProperties.getAdditionalCredits(audience);

const getInvoiceData = (invoice, plays) => {
    const getPlay = (performance) => plays[performance.playID];

    const playsData = invoice.performances.map((performance) => {
        const currentPlay = getPlay(performance);
        const playProperties = getPlayPropertiesByType(currentPlay.type);
        return {
            name: currentPlay.name,
            cost: getPlayCost(performance.audience, playProperties),
            creditsAmount: getPlayCredits(performance.audience, playProperties),
            seatsAmount: performance.audience,
        };
    });

    const totalCredits = playsData.reduce((acc, { creditsAmount }) => acc + creditsAmount, 0);
    const totalCost = playsData.reduce((acc, { cost }) => acc + cost, 0);

    return {
        customer: invoice.customer,
        playsData,
        totalCost,
        totalCredits,
    };
};

const getFormattedStatement = (invoiceData) => {
    const headerText = `Statement for ${invoiceData.customer}`;
    const totalPlaysTexts = invoiceData.playsData.map((playData) => {
        const { name, seatsAmount, cost } = playData;
        return `  ${name}: ${formatCost(cost)}  (${seatsAmount} seats)`;
    });
    const owedAmountText = `Amount owed is ${formatCost(invoiceData.totalCost)}`;
    const earnedText = `You earned ${invoiceData.totalCredits} credits\n`;

    return [
        headerText,
        ...totalPlaysTexts,
        owedAmountText,
        earnedText,
    ].join('\n');
};

const getStatement = (invoice, plays) => {
    const invoiceData = getInvoiceData(invoice, plays);
    return getFormattedStatement(invoiceData);
};

export default getStatement;