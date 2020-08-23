const express = require("express");
const router = express.Router();

//Cat model
const Cat = require("../models/Cat");

//@route GET api/Cats
//@desc Get all Cats
//@access Public
router.get("/", (req, res) => {
  Cat.find((err, cat) => {
    if (err) {
      console.log(err);
    } else {
      res.json(cat);
    }
  });
});

//@route GET api/Cats
//@desc Get specific Cats
//@access Public
router.get("/:id", (req, res) => {
  Cat.findById(req.params.id)
    .then((cat) => res.json(cat))
    .catch((err) => res.status(404).json({ nocatfound: "No Cat found" }));
});

//@route POST api/Cats
//@desc Create an Cat
//@access Public
router.post("/add", (req, res) => {
  const newCat = new Cat(req.body);
  newCat
    .save()
    .then((cat) =>
      res.status(200).json({
        id: cat.id,
        name: cat.name,
        nickName: cat.nickName,
        clicks: cat.clicks,
        image: cat.image,
      })
    )
    .catch((err) => {
      res.status(400).send("Cat isn't added");
    });
});

//@route Delete api/cats/:id
//@desc Delete an cat
//@access Public
router.delete("/:id", (req, res) => {
  Cat.findById(req.params.id)
    .then((cat) => cat.remove())
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

//@route UPdate api/Cats/:id
//@desc UPdate an Cat
//@access Public
router.post("/update/:id", (req, res) => {
  Cat.findById(req.params.id, (err, cat) => {
    if (!cat) {
      res.status(404).json("Data not found");
    } else {
      (cat.name = req.body.name),
        (cat.nickName = req.body.nickName),
        (cat.clicks = req.body.clicks),
        (cat.image = req.body.image);

      cat
        .save()
        .then((cat) => {
          res.json({
            id: cat.id,
            name: cat.name,
            nickName: cat.nickName,
            clicks: cat.clicks,
            image: cat.image,
          });
        })
        .catch((err) => {
          res.status(400).json("Update not possible");
        });
    }
  });
});

module.exports = router;
