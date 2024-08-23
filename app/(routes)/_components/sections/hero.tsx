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
        </div>

        <UploadComponent />
      </div>
    </section>
  );
};

export default HeroSection;
