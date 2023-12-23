
function createDocsArray (docs, oldOrderNumbers, newOrderNumbers) {
    const newDocs = [];
    if(docs.length === 0) {
        newOrderNumbers.forEach((order) =>
            newDocs.push({
                PI: false,
                CI: false,
                PL: false,
                SS_DS: false,
                contract_agrees: false,
                cost_agrees: false,
                instruction: false,
                ED: false,
                bill: false,
                order_number: order,
            })
        );
        return newDocs;
    }
    if (oldOrderNumbers.length < newOrderNumbers.length) {
        const missedOrders = newOrderNumbers.filter(
            (order) => !oldOrderNumbers.includes(order)
        );
        if(missedOrders.length > oldOrderNumbers.length) {
            oldOrderNumbers.forEach((order, index) => {
                newDocs.push({...docs[index], order_number: missedOrders[index]})
                missedOrders.shift();
            })
            missedOrders.forEach((order) =>
                newDocs.push({
                    PI: false,
                    CI: false,
                    PL: false,
                    SS_DS: false,
                    contract_agrees: false,
                    cost_agrees: false,
                    instruction: false,
                    ED: false,
                    bill: false,
                    order_number: order,
                })
            );
            return newDocs;
        }
        docs.forEach((doc) => {
            newDocs.push(doc);
        });
        missedOrders.forEach((order) =>
            newDocs.push({
                PI: false,
                CI: false,
                PL: false,
                SS_DS: false,
                contract_agrees: false,
                cost_agrees: false,
                instruction: false,
                ED: false,
                bill: false,
                order_number: order,
            })
        );
    } else if (oldOrderNumbers.length > newOrderNumbers.length) {
        const missedOrders = oldOrderNumbers.filter(
            (order) => !newOrderNumbers.includes(order)
        );
        if(missedOrders.join('') === oldOrderNumbers.join('')) {
            return null
        }
        const filteredDocs = docs.filter(
            (doc) => !missedOrders.includes(doc.order_number)
        );
        filteredDocs.map((doc) => newDocs.push(doc));
    } else {
        //fix
        //make from order number object like {order_number:string, uuid:string} - not the best idea, will affect full client
        docs.forEach((doc, index) => {
            newDocs.push({ ...doc, order_number: newOrderNumbers[index] });
        });
    }

    return newDocs;
}

module.exports = { createDocsArray };

