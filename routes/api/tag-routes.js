const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Finds all tags and their associated product data
router.get('/', (req, res) => {
 Tag.findAll({
   include: {
     model: Product,
     attributes: ['product_name', 'price', 'stock', 'category_id']
   }
 }).then(tagData => res.status(200).json(tagData))
    .catch(err => {
      console.log(err);
      res.status(400).json.prototype(err);
    });
});

// Finds a single tag by its id and its associated product data
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  }).then(tagData => res.status(200).json(tagData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Creates a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(tagData => res.status(200).json(tagData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Updates a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(tagData => {
    if (!tagData) {
      res.status(404).json({message: 'No tag could be found with the given id.'})
    }
    res.status(200).json(tagData)
  }).catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// Deletes on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    },
  }).then(tagData => {
    if (!tagData) {
      res.status(404).json({message: 'No tag could be found with the given id.'})
    }
    res.status(200).json(tagData)
  }).catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;
