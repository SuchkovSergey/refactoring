import { PLAY_PROPERTIES_BY_TYPE } from './const';
import sumBy from 'lodash/sumBy';

const formatToUsd = new Intl
    .NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format;

export const formatCost = (cost) => formatToUsd(cost / 100);

const getPlayPropertiesByType = (playType) => {
    const properties = PLAY_PROPERTIES_BY_TYPE[playType];
    if (!properties) {
        throw new Error(`unknown type: ${playType}`);
    }
    return properties;
};

const getPlayCost = (audience, playProperties) => playProperties.getCosts(audience);

const getPlayCredits = (audience, playProperties) => Math.max(audience - 30, 0)
    + playProperties.getAdditionalCredits(audience);

export const getTotalCost = (playsData) => sumBy(playsData, 'cost');

export const getTotalCredits = (playsData) => sumBy(playsData, 'creditsAmount');

export const createPlayData = (plays) => (performance) => {
    const currentPlay = plays[performance.playID];
    const playProperties = getPlayPropertiesByType(currentPlay.type);
    return {
        name: currentPlay.name,
        seatsAmount: performance.audience,
        cost: getPlayCost(performance.audience, playProperties),
        creditsAmount: getPlayCredits(performance.audience, playProperties),
    };
};