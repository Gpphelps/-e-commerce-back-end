const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Finds all categories and their associated products
router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  }).then(categoryData => {
    if(!categoryData) {
      res.status(404).json({message: 'No categories were found.'});
      return;
    }
    res.status(200).json(categoryData);
  }).catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// Finds one category by its id and its associated products
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  }).then(categoryData => {
    if(!categoryData) {
      res.status(404).json({message: 'No categories were found.'})
      return;
    }
    res.status(200).json(categoryData);
  }).catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// Creates a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(categoryData => res.status(200).json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Updates a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update({
    where: {
      id: req.params.id
    }
  }).then(categoryData =>{
    if (!categoryData) {
      res.status(404).json({message: 'No category was found with the given id.'});
      return;
    }
    res.status(200).json(categoryData);
  }).catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

 // Deletes a category by its `id` value
router.delete('/:id', (req, res) => {
 Category.destory({
   where: {
     id: req.params.id
   }
 }).then(categoryData => {
   if (!categoryData) {
     res.status(404).json({message: 'No category could be found with the given id.'});
   }
   res.status(200).json(categoryData);
 }).catch(err => {
   console.log(err);
   res.status(400).json(err);
 });
});

module.exports = router;
