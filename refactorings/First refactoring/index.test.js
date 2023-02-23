import getStatement from './index';

const testData = {
    plays: {
        hamlet: {
            name: "Hamlet",
            type: "tragedy",
        },
        'as-like': {
            name: "As you like It",
            type: "comedy",
        },
        othello: {
            name: "Othello",
            type: "tragedy",
        },

    },
    invoice: {
        customer: "BigCo",
        performances: [
            {
                playID: "hamlet",
                audience: 55,
            },
            {
                playID: "as-like",
                audience: 35,
            },
            {
                playID: "othello",
                audience: 40,
            },
        ],
    },
};

describe('getStatement', () => {
    it('plain format', () => {
        const result = 'Statement for BigCo\n' +
            '  Hamlet: $650.00  (55 seats)\n' +
            '  As you like It: $580.00  (35 seats)\n' +
            '  Othello: $500.00  (40 seats)\n' +
            'Amount owed is $1,730.00\n' +
            'You earned 47 credits\n';

        expect(getStatement(testData.invoice, testData.plays)).toBe(result);
    });

    it('html format', () => {
        const result =
            '<h1>Statement for BigCo</h1>\n'
            + '<table>\n'
            + '<tr><th>play</th><th>seats</th><th>cost</th></tr>\n'
            + '<tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n'
            + '<tr><td>As you like It</td><td>35</td><td>$580.00</td></tr>\n'
            + '<tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n'
            + '</table>\n'
            + '<p>Amount owed is <em>$1,730.00</em></p>\n'
            + '<p>You earned <em>47</em> credits</p>\n';

        expect(getStatement(testData.invoice, testData.plays, 'html')).toBe(result);
    });
});
