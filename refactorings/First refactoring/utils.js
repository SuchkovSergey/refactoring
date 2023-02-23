import { PLAY_PROPERTIES_BY_TYPE } from './const';

const format = new Intl
    .NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format;

export const formatCost = (cost) => format(cost / 100);

export const getPlayPropertiesByType = (playType) => {
    const properties = PLAY_PROPERTIES_BY_TYPE[playType];
    if (!properties) {
        throw new Error(`unknown type: ${playType}`);
    }
    return properties;
};

export const getPlayCost = (audience, playProperties) => playProperties.getCosts(audience);

export const getPlayCredits = (audience, playProperties) => Math.max(audience - 30, 0)
    + playProperties.getAdditionalCredits(audience);