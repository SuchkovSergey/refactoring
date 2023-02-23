import plainFormatMethod from './plain-format';
import htmlFormatMethod from './html-format';

const FORMAT_METHODS_BY_TYPE = {
    plain: plainFormatMethod,
    html: htmlFormatMethod,
};

export const renderStatement = (statementData, formatType) => {
    const method = FORMAT_METHODS_BY_TYPE[formatType];
    if (!method) {
        throw new Error(`unknown format type: ${formatType}`);
    }
    return method(statementData);
};