const sleep = (msec) => new Promise((s) => setTimeout(s, msec));
const randomNum = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

export { sleep, randomNum };
