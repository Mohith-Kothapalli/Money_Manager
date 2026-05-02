import moment from "moment";

const prepareIncomeLineChartData = (transactions = []) => {
    const grouped = {};

    transactions.forEach((t) => {
        const date = moment(t.date).format("Do MMM"); // e.g. 8th Jul

        if (!grouped[date]) {
            grouped[date] = 0;
        }

        grouped[date] += Number(t.amount);
    });

    const result = Object.keys(grouped).map((date) => ({
        date,
        amount: grouped[date]
    }));

    return result;
};

export default prepareIncomeLineChartData;