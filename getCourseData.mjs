import axios from 'axios';

const getDateString = (date) => {
  const DD = date.getDate().toString().padStart(2, '0');
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const YYYY = date.getFullYear();
  return `${DD}-${MM}-${YYYY}`;
};

/**
 * Gets class material for current/next course day
 * @param daysObj object: "days" key from JSON file object (response.data.days)
 * @param dayType string: 'today' or 'tomorrow'
 * @returns object: {courseInfo}
 */
const getCourseDayInfo = (daysObj, dayType) => {
  // dayType vars
  const TODAY = 'today';
  const TMR = 'tomorrow';

  const courseDate = new Date();
  // If before 10am, get previous day's material
  if (courseDate.getHours() < 10) courseDate.setDate(courseDate.getDate() - 1);
  if (dayType === TMR) courseDate.setDate(courseDate.getDate() + 1);

  // 1. Convert daysObj to array of arrays [[date,courseInfo],...]
  // where 0 in arr[i][0] is the date
  // and 1 in arr[i][1]is the object with all the courseday info
  const daysArr = Object.entries(daysObj);

  const getInfoIndex = () => daysArr
    .findIndex(([date, courseDayInfo]) => (
      date === getDateString(courseDate) // check for class on courseDate
    && courseDayInfo.courseDay // check if courseDate is a valid course day
    ));

  // 2. Find index for course material
  let infoIndex = getInfoIndex();

  // 3. If no course material for courseDate (eg weekend, public hol)
  // increment/decrement date and get material from that date
  while (infoIndex === -1) {
    // if today is not a valid course day, get previous day's material
    if (dayType === TODAY) courseDate.setDate(courseDate.getDate() - 1);
    // if tomorrow is not a valid course day, get next day's material
    else if (dayType === TMR) courseDate.setDate(courseDate.getDate() + 1);

    infoIndex = getInfoIndex();
  }

  // 4. Return course material as obj: {courseDayInfo}
  // (daysArr is an array of [ [date, {courseDayInfo}], ...])
  return daysArr[infoIndex][1];
};

/**
 * Filters material based on class type
 * @param courseDayInfo object: containing course day's info
 * @param classType string: 'preClass' or 'postClass'
 * @returns array: [ {name: 'lesson name', url: 'lesson url'}, ...]
 */
const getClassInfo = (courseDayInfo, classType) => {
  const classMaterial = [];

  Object.values(courseDayInfo.dateTypes)
    .filter((value) => typeof value !== 'string')
    .filter((obj) => Object.values(obj[classType]).length > 0)
    .map((moduleObj) => moduleObj[classType].items)
    .forEach((arr) => arr.forEach((obj) => {
      obj.courseDate = courseDayInfo.courseDate;
      classMaterial.push(obj);
    }));

  return classMaterial;
};

export function getCleanData(data) {
  const { days } = data;

  // getCourseDayInfo() returns ['date',{courseInfo}]
  const todayInfo = getCourseDayInfo(days, 'today');
  const todayPoce = getClassInfo(todayInfo, 'postClass');

  const nextDayInfo = getCourseDayInfo(days, 'tomorrow');
  const tmrPce = getClassInfo(nextDayInfo, 'preClass');

  const cleanData = {
    poceDate: todayInfo.courseDate,
    poce: todayPoce,
    pceDate: nextDayInfo.courseDate,
    pce: tmrPce,
  };

  console.log(cleanData);
  return cleanData;
}

export function getScheduleJsonUrl(bootcampBatch) {
  switch (bootcampBatch) {
    case 'FTBC6':
      return 'https://raw.githubusercontent.com/rocketacademy/scheduler/main/src/data/10-01-2022_01-07-2022_FTBC6.json';
    case 'FTBC7':
      return 'https://raw.githubusercontent.com/rocketacademy/scheduler/main/src/data/28-03-2022_19-09-2022_FTBC7.json';
    case 'PTBC1':
      return 'https://raw.githubusercontent.com/rocketacademy/scheduler/main/src/data/17-08-2021_26-07-2022_PTBC1.json';
    case 'PTBC2':
      return 'https://raw.githubusercontent.com/rocketacademy/scheduler/main/src/data/16-11-2021_29-10-2022_PTBC2.json';
    case 'PTBC3':
      return 'https://raw.githubusercontent.com/rocketacademy/scheduler/main/src/data/12-03-2022_11-03-2023_PTBC3.json';
    default:
      return '';
  }
}

export function getNewTasks() {
  const batches = ['FTBC6', 'FTBC7', 'PTBC1', 'PTBC2', 'PTBC3'];
  batches.forEach((batch) => {
    const jsonUrl = getScheduleJsonUrl(batch);
    axios.get(jsonUrl)
      .then((response) => {
        const homework = getCleanData(response.data);
        axios.post('http://localhost:3004/tasks/get-new', { homework, batch });
      });
  });
}
