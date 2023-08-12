const express = require('express');
const expenseController = require('../controller/expense');

const router= express.Router();

router.post('/add-expense',expenseController.saveDataToDatabase)

router.delete('/delete-expense/:id',expenseController.deleteFromDatabase)

router.get('/get-expense',expenseController.getAllDataFromDatabase);

module.exports = router;