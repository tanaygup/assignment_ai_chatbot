"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileText, Send, Upload } from "lucide-react";
import { extractTextFromPDF } from "@/lib/pdfUtils";
import { chatWithPDF, summarizePDF } from "@/lib/gemini";

export default function DashboardPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfContent, setPdfContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      setError(null);
      setIsLoading(true);
      try {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        
        // Extract text from PDF
        const text = await extractTextFromPDF(file);
        if (!text || text.trim().length === 0) {
          throw new Error("No text could be extracted from the PDF");
        }
        setPdfContent(text);
        
        // Get initial summary
        const summary = await summarizePDF(text);
        
        setMessages([
          {
            id: Date.now(),
            content: `I've read your PDF "${file.name}". Here's a summary:\n\n${summary}`,
            sender: "bot",
            timestamp: new Date().toISOString(),
          },
        ]);
      } catch (error) {
        console.error("Error processing PDF:", error);
        setError(error.message);
        setMessages([
          {
            id: Date.now(),
            content: "Sorry, there was an error processing your PDF. Please try uploading a different PDF file.",
            sender: "bot",
            timestamp: new Date().toISOString(),
          },
        ]);
        setPdfContent("");
        setSelectedFile(null);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !pdfContent) return;

    const userMessage = {
      id: Date.now(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await chatWithPDF(inputMessage, pdfContent);
      
      const botMessage = {
        id: Date.now() + 1,
        content: response,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      const errorMessage = {
        id: Date.now() + 1,
        content: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Upload PDF</h2>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              error ? 'border-destructive/50 bg-destructive/10' : 'hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className={`mx-auto h-12 w-12 mb-4 ${error ? 'text-destructive' : 'text-muted-foreground'}`} />
            <p className={`${error ? 'text-destructive' : 'text-muted-foreground'}`}>
              {isLoading ? "Processing PDF..." : error || "Drag & drop a PDF file here, or click to select one"}
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
                  <p className="whitespace-pre-wrap">{message.content}</p>
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
                    <p className="whitespace-pre-wrap">{message.content}</p>
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
              placeholder={pdfContent ? "Ask a question about your PDF..." : "Upload a PDF to start chatting..."}
              disabled={!pdfContent || isLoading}
              className="flex-1 px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              onKeyPress={(e) => {
                if (e.key === "Enter" && !isLoading) handleSendMessage();
              }}
            />
            <Button onClick={handleSendMessage} disabled={!pdfContent || isLoading}>
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? "Processing..." : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}