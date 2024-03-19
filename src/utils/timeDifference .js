module.exports = calculateDaysLeft = (today,targetDate) => {
    today = new Date();
    const target = new Date(targetDate);
    const timeDifference = target - today;


    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

    return daysLeft
}
