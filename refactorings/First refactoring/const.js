export const PLAY_PROPERTIES_BY_TYPE = {
    tragedy: {
        getCosts: (audience) => {
            let result = 40000;
            if (audience > 30) {
                result += 1000 * (audience - 30);
            }
            return result;
        },
        getAdditionalCredits: () => 0,
    },
    comedy: {
        getCosts: (audience) => {
            let result = 30000 + 300 * audience;
            if (audience > 20) {
                result += 10000 + 500 * (audience - 20);
            }
            return result;
        },
        getAdditionalCredits: (audience) => {
            return Math.floor(audience / 5);
        },
    },
};
