'use client'
import { useState, useEffect } from "react";
import { getTextRecords, addTextRecord } from "./firebase/firestore";
import { getFiles, addFile } from "./firebase/storage";
import { FileModel } from "./models/File";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [textRecords, setTextRecords] = useState<string[]>([]);
  const [textRecordToAdd, setTextRecordToAdd] = useState<string>("");
  const [files, setFiles] = useState<FileModel[]>([]);
  const [fileToAdd, setFileToAdd] = useState<File | null>(null);

  useEffect(() => {
    loadInformation();
  }, []);

  const loadInformation = async () => {
    setIsLoading(true);
    const records = await getTextRecords();
    setTextRecords(records)
    const files = await getFiles();
    setFiles(files);
    setIsLoading(false);
  }

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileToAdd(e.target.files[0]);
    }
  }

  const handleFileSave = async () => {
    setIsLoading(true);
    await addFile(fileToAdd);
    await loadInformation()
    setFileToAdd(null);
  }

  const handleTextRecordSave = async () => {
    setIsLoading(true);
    await addTextRecord(textRecordToAdd);
    await loadInformation()
    setTextRecordToAdd("");
  }

  const handleFileClick = (file: FileModel) => {
    console.log(file.downloadURL)
  }

  return (
    <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-blue-500 min-h-screen flex justify-center">
      <div className="flex flex-col items-center max-w-2xl w-full m-4 p-4 bg-white rounded-md">
      <div className="flex flex-col w-full items-center">

        <div className="flex flex-col w-10/12">
          <div className="mt-4 md:mt-8 text-lg md:text-2xl font-bold text-center text-gray-800">Firebase Upload Viewer</div> 
        </div>

        <div className="mt-8 flex flex-col w-10/12">
          <div className="text-base md:text-lg font-bold text-center text-gray-800">Files</div> 

          <div className="mt-4 text-sm md:text-base font-bold text-center text-gray-600">Upload</div> 
          <div className="mt-2 w-full flex flex-col gap-2">
            <input type="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" onChange={handleFileInputChange} disabled={isLoading} />
              <button
                className="w-full rounded-lg hover:bg-blue-800 bg-blue-600 text-white h-10 px-3 disabled:opacity-50"
                disabled={isLoading || !Boolean(fileToAdd)}
                onClick={handleFileSave}
              >
                Save File
              </button>
          </div>

          <div className="mt-4 text-sm md:text-base font-bold text-center text-gray-600">Files</div> 
          <div className="mt-2  w-full flex flex-col gap-2">
            {files && files.map((file, index) => 
              <a 
                key={index + file.fileName} 
                className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-300 text-left text-gray-800 text-sm p-2 rounded-lg"
                href={file.downloadURL}
                download
                target="_blank"
              >
                {file.fileName}
              </a>
              )}
          </div>
        </div>

        <div className="mt-8 flex flex-col w-10/12">
          <div className="text-base md:text-lg font-bold text-center text-gray-800">Text Records</div> 

          <div className="mt-4 text-sm md:text-base font-bold text-center text-gray-600">Upload</div> 
          <div className="mt-2 w-full flex flex-col gap-2">
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="Please type" value={textRecordToAdd || ""} onChange={(e) => setTextRecordToAdd(e.target.value)} />
            <button
              className="w-full rounded-lg hover:bg-blue-800 bg-blue-600 text-white h-10 px-3 disabled:opacity-50"
              disabled={isLoading || textRecordToAdd.length <= 0}
              onClick={handleTextRecordSave}
            >
              Save Text
            </button>
          </div>

          <div className="mt-4 text-sm md:text-base font-bold text-center text-gray-600">Records</div> 
          <div className="mt-2  w-full flex flex-col gap-2">
            {textRecords && textRecords.map((record, index) => 
              <div key={index + record} className="w-full bg-gray-50 border border-gray-300 text-left text-gray-800 text-sm p-2 rounded-lg">
                {record}
              </div>
              )}
          </div>
        </div>

        </div>
      </div>
    </div>
  )
}
