
const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const{LogModel} = require('../models');

// router.get('/practice', validateJWT, (req, res) => {
//     res.send('Hey!! This is a practice route!')
// });

//create log entry

router.post('/', validateJWT, async(req, res) => {
    const { description, definition, result } = req.body;
    const id  = req.user.id
    ;
    console.log(req.user)
    const logEntry = {
        description,
        definition,
        result,
        owner: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    LogModel.create(logEntry)
    }
);

//get all workout logs


router.get("/all", async (req, res) => {
    try {
    const entries = await LogModel.findAll();
    res.status(200).json(entries);
    } catch (err) {
    res.status(500).json({error: err});
    }
});

//get log with user id of logged in user

router.get("/", validateJWT, async (req, res) =>{
    let { id } = req.user;
    try {
        const userLogs = await LogModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//updates log by log id

router.put("/:id", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body;
       
    try {
        await LogModel.update(
            { description, definition, result },
            { where: {id: req.params.id }, returning: true }
        ).then((result) => {
            res.status(200).json({
                message: "Log successfully updated",
                updatedWorkoutLog: result,
            });
        });
    } catch (err) {
        res.status(500).json({
            message: `Failed to update log: ${err}`,
        });
    }
});

  


// Delete entry

router.delete("/:id", validateJWT, async (req, res) => {
    try {
        const deletedLog = await LogModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ 
            message: "Log Entry Removed",
            deletedLog,
         });
    } catch (err) {
        res.status(500).json({ 
            message: "Failed to delete log.",
            error: e
         });
    }
});

module.exports = router;