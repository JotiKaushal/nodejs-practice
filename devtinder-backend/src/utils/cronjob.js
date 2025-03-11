const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns")
const ConnectionRequests = require("../Models/connectionRequest");
const email = require("./email");
cron.schedule("59 8 * * *", async () => {
    // send email to all people who got requests the previous day
    try {
        const yesterday = subDays(new Date(), 1);
        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);
        console.log();
        
        const pendingRequests = await ConnectionRequests.find({
            status: "interested",
            // createdAt: {
            //     $gte: yesterdayStart,
            //     $lt: yesterdayEnd
            // }
        }).populate("fromUserId toUserId");
        console.log(pendingRequests);
        
        const listOfEmails = [...new Set(pendingRequests.map(req => req.toUserId.emailId))];
        //use bee queue or bullmq npm packages to process emails in queues instead of below code because it can cause blockage as we are using loop
        for (const mail of listOfEmails) {
            try {
                const res = await email.run("New Friend Request for " + mail, "There are so many friend requests pending, please login to devlopertinder.in to accept or reject");
                console.log(res);
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    catch (err) {
        console.log(err);

    }

})

//https://crontab.guru/#0_8_*_*_*
// * * * * * *
//second(optional) min hour dayofmonth month dayofweek

//0 8 * * * //every day at 8 am