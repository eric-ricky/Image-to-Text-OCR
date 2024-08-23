import { createWorker } from "tesseract.js";

export const getWorker = async () => {
  // const { createWorker } = require('tesseract.js');

  // const worker = await createWorker('eng', 1, {
  //   logger: m => console.log(m), // Add logger here
  // });

  // (async () => {
  //   const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
  //   console.log(text);
  //   await worker.terminate();
  // })();
  const worker = await createWorker("eng", 1, {
    logger: (m) => {
      console.log("MESSAGE ===>", m);
    },
  });

  return worker;
};
