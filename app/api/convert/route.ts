import { NextResponse } from "next/server";
import { createWorker } from "tesseract.js";

export async function POST(req: Request) {
  try {
    const { file } = await req.json();

    if (!file)
      return NextResponse.json(
        {
          error: "File is required",
        },
        { status: 400 }
      );

    const worker = await createWorker("eng");
    const ocrResult = await worker.recognize(file.imageData);

    // const ocrResult = await Tesseract.recognize(file.imageData, "eng", {
    //   workerPath: "./tesseract.js/src/worker-script/node/index.js",
    // });
    const content = ocrResult.data.text;

    return NextResponse.json({
      success: true,
      message: "Successfully uploaded pdf to supabase",
      data: { content, ...file },
    });
  } catch (error) {
    console.log("[ERROR CONERTING]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
