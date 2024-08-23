import { NextResponse } from "next/server";

export async function GET() {
  // const file = "";

  // const ocrResult = await Tesseract.recognize(file, "eng", {
  //   workerPath: "./node_modules/tesseract.js/src/worker-script/node/index.js",
  // });
  // const content = ocrResult.data.text;

  return NextResponse.json({
    success: true,
    message: "Successfully uploaded pdf to supabase",
    // data: { docs, content },
    data: "content",
  });
}
