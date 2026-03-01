import cron from "node-cron";
import { sendRemindersForToday } from "../controllers/transactions/reminder.controller.js";

// console.log(process.env);

// const cronSchedule = process.env.REMINDER_CRON_SCHEDULE || "0 9 * * *";
// const cronEnabled = process.env.REMINDER_CRON_ENABLED != "false";

function startReminderCron(cronSchedule,cronEnabled) {
    if (!cronEnabled) {
        console.info("Reminder cron disabled");
        return;
    }

    cron.schedule(cronSchedule, async () => {
        try {
            const sentCount = await sendRemindersForToday();
            console.info(`Reminder cron ran. Emails sent: ${sentCount}`);
        } catch (error) {
            console.error("Reminder cron failed", error);
        }
    });

    console.info(`Reminder cron scheduled with pattern: ${cronSchedule}`);
}

export { startReminderCron };
