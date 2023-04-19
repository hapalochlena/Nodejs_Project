const express = require('express');
const router = express.Router();


// Controller
// ! => Make Controller functions ASYNC
// ! => Read out the relevant info from request (body/params)
// ! => Await the functions where the business logic happens
// ! => Pass relevant info from request as arguments into the await functions
const createOrder = async (req, res, next) => {
	// grab what we need from the request...
	const {customerId, orderTotal, orderItems, paymentDetails} = req.body;

	try {
		// ...then route it to the appropriate business-logic-processing functions...
		const customerData = await getCustomerData(customerId);
		await processOrder(orderTotal, orderItems, paymentDetails, customerData);
		await sendConfirmationEmailToCustomer(customerId, orderItems);

		// ...then fulfill the request with the response object
		res.sendStatus(201);

		return;
	} catch (err) {
		res.sendStatus(500);

		return;
	}
};

// Route definition
router.post('/order', createOrder);

module.exports = router;
