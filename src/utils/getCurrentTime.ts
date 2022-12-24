export const getCurrentTime = (): { time: string, greeting: string } => {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();

    let hhNew = (hh < 10) ? "0" + hh : hh;
    let mmNew = (mm < 10) ? "0" + mm : mm;
    let time = hhNew + ":" + mmNew;

    const greetingTypes = ["Good Morning", "Good Afternoon", "Good Evening"];
    let greeting = "";

    if (hh < 12) greeting = greetingTypes[0];
    else if (hh < 18) greeting = greetingTypes[1];
    else greeting = greetingTypes[2];

    return { time, greeting };
}