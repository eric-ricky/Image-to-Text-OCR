import UploadComponent from "@/components/upload";

const HeroSection = () => {
  return (
    <section className="">
      <div className="max-w-screen-2xl mx-auto px-4 py-20 md:py-32 grid grid-cols-1 gap-10">
        <div className="mx-auto text-center">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Image to Text
            <strong className="font-extrabold text-indigo-600"> OCR</strong>
          </h1>

          <p className="mt-4 sm:text-lg/relaxed">
            An online image to text converter to quickly and easily convert
            images into editable text.
          </p>

          {/* <div>
            <span id="ProgressLabel" className="sr-only">
              Loading
            </span>

            <span
              role="progressbar"
              aria-labelledby="ProgressLabel"
              aria-valuenow={75}
              className="relative block rounded-full bg-gray-200"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[10px]/4">
                <span className="font-bold text-white"> 75% </span>
              </span>

              <span
                className="block h-4 rounded-full bg-indigo-600 text-center"
                style={{ width: "75%" }}
              >
                {" "}
              </span>
            </span>
          </div> */}
        </div>

        <UploadComponent />
      </div>
    </section>
  );
};

export default HeroSection;
