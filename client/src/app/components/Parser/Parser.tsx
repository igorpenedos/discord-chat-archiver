"use client";

import { useState } from "react";
import Markdown from "markdown-to-jsx";

export const Parser = () => {
  const [content, setContent] = useState([]);
  const [showParser, setShowParser] = useState<Boolean>(false);

  const fileUploaded = (e: any) => {
    const file: File = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(file);

    fileReader.onload = (event) => {
      const result: any = event.target!.result;
      setContent(JSON.parse(result));
      setShowParser(true);
    };
  };

  const timestampTranslater = (timestamp: number) => {
    var date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <input type="file" accept="application/json" onChange={fileUploaded} />
      {showParser ? (
        <div className="flex flex-col justify-start min-w-1/2 bg-neutral-900 p-6 m-6 gap-4 rounded">
          {content?.map((c: any, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex flex-row justify-between">
                <span className="font-bold text-xl">{c?.author}</span>
                <span className="flex justify-end">
                  {timestampTranslater(c?.timestamp)}
                </span>
              </div>
              <div>
                <div>
                  {!c?.message.includes("tenor.com") ? (
                    <Markdown>{c?.message}</Markdown>
                  ) : (
                    <img src={c?.message + ".gif"} alt={c?.message} />
                  )}
                </div>
                <div>
                  {c?.attachments?.map((a: any, i: number) => {
                    console.log(a);
                    return (
                      <img
                        src={`data:${a.contentType};base64,${a.base64}`}
                        alt={a.name}
                        width={a.width}
                        height={a.height}
                        key={i}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
