'use strict'

const router = require('express').Router()


router.get('/',(req, res, next) => {
    res.render("index",{
        title: "JKLU File Upload"
    })
})


module.exports = router
