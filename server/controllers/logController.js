
const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const{ LogModel } = require('../models');

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
});

//create log entry

router.post('/', validateJWT, async(req, res) => {
    const { description, definition, result } = req.body.workoutLog;
    const { id } = req.user;
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



// router.get("/", async (req, res) => {
//     try {
//     const entries = await LogModel.findAll();
//     res.status(200).json(entries);
//     } catch (err) {
//     res.status(500).json({error: err});
//     }
// });

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
    const { description, definition, result } = req.body.workoutLog;
    const logEntryId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: logEntryId,
            owner: userId
        }
    };

    const updateLogEntry = {
        description,
        definition,
        result
    };

    try {
        const update = await LogModel.update(updatedLogEntry, query);
        res.status(200).json(update);
    }   catch (err) {
        res.status(500).json({ error: err });
    }
});


// Delete entry

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const journalId = req.params.id;

    try {
        const query = {
            where: {
                id: logEntryId,
                owner: ownerId
            }
        };
        await LogModel.destroy(query);
        res.status(200).json({ message: "Log Entry Removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;