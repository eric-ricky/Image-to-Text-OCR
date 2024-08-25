"use client";

import { cn } from "@/lib/utils";
import {
  CheckCheck,
  Copy,
  Download,
  ListRestart,
  Loader,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useDropzone } from "react-dropzone";
import { createWorker } from "tesseract.js";
import FileIcon from "./icons/file";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface IFileData {
  name: string;
  imageData: string;
  size: number;
}
interface IResultData extends IFileData {
  content: string;
}

const UploadComponent = () => {
  const [progress, setProgress] = useState(0);
  const [activeFile, setActiveFile] = useState<IFileData>();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IResultData[]>([]);
  const [files, setFiles] = useState<IFileData[]>([]);

  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedResult, setCopiedResult] = useState<IResultData>();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles?.length) {
        for (const file of acceptedFiles) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const imageData = reader.result as string;
            setFiles((prev) => [
              ...prev,
              {
                imageData,
                name: file.name,
                size: file.size,
              },
            ]);
          };
          reader.readAsDataURL(file);
        }
      }
    },
  });

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!files.length) return console.log("NO FILES SELECTED");

  //   try {
  //     setLoading(true);

  //     for (const file of files) {
  //       const res = await axios.post("/api/convert", {
  //         file,
  //       });
  //       const data: IResultData = res.data.data;
  //       setResults((prev) => [...prev, data]);
  //     }
  //   } catch (error) {
  //     console.log("ERROR ===>", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCopyAll = () => {
    if (!results.length) return;

    const content = results.map((r) => r.content).join("\n\n\n\n");
    navigator.clipboard.writeText(content);
    setCopiedAll(true);

    setTimeout(() => {
      setCopiedAll(false);
    }, 2000);
  };

  const handleReset = () => {
    setFiles([]);
    setResults([]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!files.length) return console.log("NO FILES SELECTED");

    try {
      setLoading(true);

      console.log("STARTING.....");
      const worker = await createWorker("eng", 1, {
        logger: (m) => {
          // console.log("MESSAGE ===>", m);
          if (m.status === "recognizing text")
            setProgress(Math.floor(m.progress * 100));
        },
      });

      console.log(`WORKER READY.... EXTRACTING TEXT FROM ${files[0].name}`);

      for (const file of files) {
        setActiveFile(file);

        const initialData: IResultData = { ...file, content: "" };
        setResults((prev) =>
          !prev.length
            ? [initialData]
            : [...prev.filter((p) => p.name !== file.name), initialData]
        );
        const {
          data: { text },
        } = await worker.recognize(file.imageData);
        console.log("TEXT =====>", text);
        const data: IResultData = {
          ...file,
          content: text,
        };
        setResults((prev) => [
          ...prev.map((p) => (p.name === file.name ? { ...data } : p)),
        ]);
      }

      setActiveFile(undefined);
      setProgress(0);
      await worker.terminate();
      console.log("DONE.....");
    } catch (error) {
      console.log("ERROR EXTRACTING ===>", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!results.length && (
        <form onSubmit={handleSubmit}>
          <div
            className={cn(
              "max-w-screen-md mx-auto w-full p-4 bg-white shadow rounded-xl grid grid-cols-1 relative",
              { "md:grid-cols-2": !!files.length }
            )}
          >
            <div className="flex flex-col">
              <div
                {...getRootProps()}
                className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-1 grid border-dashed"
              >
                <div className="grid">
                  <FileIcon />
                  {isDragActive ? (
                    <h4 className="text-center text-gray-900 text-sm font-medium leading-snug my-4">
                      Drop your file(s) here ...
                    </h4>
                  ) : (
                    <>
                      <h2 className="text-center text-gray-400   text-xs leading-4 mt-1">
                        PNG, JPG or SVG, smaller than 15MB
                      </h2>

                      <h4 className="text-center text-gray-900 text-sm font-medium leading-snug mt-2">
                        Drag and Drop your file here or
                      </h4>
                    </>
                  )}
                </div>

                <div className="grid">
                  <div className="flex flex-col items-center justify-center">
                    <input {...getInputProps()} />
                    <div className="flex items-center justify-center w-28 h-9 px-2 bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 cursor-pointer focus:outline-none">
                      <Upload size={14} className="mr-1" />
                      Choose File
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs p-2 italic">
                No data is transmitted or stored! Everything is done locally.
              </p>
            </div>

            {!!files.length && (
              <div className="flex flex-col pb-20 overflow-y-auto scrollbar-thin scrollbar-track-indigo-50 scrollbar-thumb-indigo-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-80 relative">
                <div className="p-2 flex flex-col gap-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-2 flex items-center gap-2"
                    >
                      <div className="relative w-14 h-14 border  rounded-xl overflow-hidden">
                        <Image
                          src={file.imageData || "/images/1.png"}
                          alt="."
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <p className="text-sm font-medium leading-snug text-gray-900 mt-2">
                          {file.name}
                        </p>
                        <p className="text-xs leading-4 text-gray-400 mt-1">
                          {file.size} MB
                        </p>
                      </div>

                      <X
                        size={20}
                        role="button"
                        onClick={() => {
                          setFiles((prev) =>
                            prev.filter((f) => f.imageData !== file.imageData)
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!!files.length && (
              <div className="absolute bottom-0 left-0 w-full flex items-center justify-between p-4 bg-white z-20">
                <Button
                  disabled={loading}
                  type="button"
                  size={"sm"}
                  variant={"outline"}
                  onClick={() => {
                    setFiles([]);
                  }}
                >
                  Clear All
                </Button>

                <Button size={"sm"} disabled={loading}>
                  {loading && (
                    <Loader size={20} className="mr-1 animate-spin" />
                  )}
                  Convert
                </Button>
              </div>
            )}
          </div>
        </form>
      )}

      {!!results.length && (
        <div className="max-w-screen-md mx-auto w-full p-4 bg-white shadow rounded-xl grid grid-cols-1 relative">
          <div className="flex items-center gap-2">
            <h2 className="font-medium">Result ({results.length})</h2>

            <div className="flex-1 flex items-center justify-end gap-4">
              <Button
                disabled={!!progress}
                onClick={handleReset}
                size={"sm"}
                variant={"outline"}
              >
                <ListRestart size={20} className="mr-2" />
                <span className="hidden md:flex">Reset</span>
              </Button>
              <Button
                disabled={!!progress || copiedAll}
                onClick={handleCopyAll}
                size={"sm"}
              >
                {copiedAll ? (
                  <>
                    <CheckCheck size={20} className="mr-2" />
                    <span className="hidden md:flex">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={20} className="mr-2" />
                    <span className="hidden md:flex">Copy all</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator className="my-5" />

          <div className="flex flex-col py-2">
            <div className="p-2 flex flex-col gap-2">
              {results.map((result, index) => {
                const isCopied = copiedResult?.imageData === result.imageData;

                return (
                  <div
                    key={index}
                    className="border rounded-xl overflow-hidden p-2 flex items-center gap-2 relative"
                  >
                    <div className="relative w-20 h-20 border  rounded-xl overflow-hidden">
                      <Image
                        src={result.imageData || "/images/1.png"}
                        alt="."
                        fill
                        className="object-cover"
                      />

                      <div className="absolute bottom-0 left-0 w-full text-xs font-medium p-1.5 text-center bg-white/75 uppercase">
                        {result.name}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="line-clamp-3 text-xs text-muted-foreground">
                        {result.content.substring(0, 300)}
                      </div>
                    </div>

                    {result.content && (
                      <div className="flex flex-col h-full p-1">
                        <Button
                          disabled={isCopied}
                          onClick={() => {
                            navigator.clipboard.writeText(result.content);
                            setCopiedResult(result);

                            setTimeout(() => {
                              setCopiedResult(undefined);
                            }, 2000);
                          }}
                          size={"sm"}
                          variant={"ghost"}
                          className="bg-white"
                        >
                          {isCopied ? (
                            <CheckCheck size={14} />
                          ) : (
                            <Copy size={14} />
                          )}
                        </Button>

                        <Button
                          size={"sm"}
                          variant={"ghost"}
                          className="hidden"
                        >
                          <Download size={14} />
                        </Button>
                      </div>
                    )}

                    {activeFile?.name === result.name && (
                      <div className="absolute bottom-0 left-0 col-span-2 w-full bg-slate-200">
                        <div>
                          <span id="ProgressLabel" className="sr-only">
                            Loading
                          </span>

                          <span
                            role="progressbar"
                            aria-labelledby="ProgressLabel"
                            aria-valuenow={progress}
                            className="block rounded-full bg-gray-200"
                          >
                            <span
                              className="block h-4 rounded-full bg-indigo-600 text-center text-[10px]/4"
                              style={{ width: `${progress}%` }}
                            >
                              <span className="font-bold text-white">
                                {" "}
                                {progress}%{" "}
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* {results.length !== files.length && (
              <div className="flex items-center justify-center p-10">
                <div className="flex items-center space-x-2 text-indigo-600">
                  <Loader className="animate-spin" />

                  <span className="font-medium text-sm">Loading...</span>
                </div>
              </div>
            )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default UploadComponent;
