const express = require('express');
const { fetchCategories, createCategory } = require('../controller/Category');

const router = express.Router();

//  /categories is already added to base path     
router.get('/', fetchCategories).post('/',createCategory)

exports.router = router;