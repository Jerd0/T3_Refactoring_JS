const invoice=[
    {
        "customer": "MDT",
        "performance": [
            {
                "playId": "Гамлет",
                "audience": 55,
                "type": "tragedy"
            },
            {
                "playId": "Ромео и Джульетта",
                "audience": 35,
                "type": "tragedy"
            },
            {
                "playId": "Отелло",
                "audience": 40,
                "type": "comedy"
            }
            ]
    }
]

//не понял зачем нужен параметр plays - поэтому убрал его.
function statement(invoice) {
    let perf;
    let volumeCredits = 0;
    let amount = 0;
    let result = `Счет для ${invoice.customer} \n`;
    const format = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 2
    }).format;
    for (perf of invoice.performance) {
        let thisAmount = 0;
        switch (perf.type) {
            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                //Сюда можно добавить проверку на положительное число зрителей, но это глупо т.к. такое могут ввести только по ошибке.
                volumeCredits += Math.floor(perf.audience / 10);
                break;
            default:
                throw new Error(`неизвестный тип: ${perf.type}`);
        }

// Добавление бонусов
        volumeCredits += Math.max(perf.audience - 30, 0);
// Дополнительный бонус за каждые 10 комедий

// Вывод строки счета
        result += `${perf.playId}: ${format(thisAmount / 100)} (${perf.audience} мест)\n`;
        amount += thisAmount
    }
    result += `Итого с вас ${format(amount / 100)}
Вы заработали ${volumeCredits} бонусов\n`;
    return result;
}
//Вывод для теста напрямую
// console.log(statement(invoice[0]))
