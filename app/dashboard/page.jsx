"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileText, Send, Upload } from "lucide-react";

export default function DashboardPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    // TODO: Integrate with Gemini API
    const botResponse = {
      id: Date.now() + 1,
      content: "This is a placeholder response. Gemini API integration pending.",
      sender: "bot",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, botResponse]);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Upload PDF</h2>
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Drag & drop a PDF file here, or click to select one
            </p>
          </div>
          {selectedFile && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium">{selectedFile.name}</span>
            </div>
          )}
        </div>

        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Chat History</h2>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted"
                  } max-w-[80%] ${message.sender === "user" ? "ml-auto" : ""}`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="flex-1 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-4">Chat with PDF</h2>
          <ScrollArea className="flex-1 mb-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    } max-w-[80%]`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}