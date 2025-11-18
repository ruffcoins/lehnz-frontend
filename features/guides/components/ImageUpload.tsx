"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/features/shared/ui/button";
import { Card } from "@/features/shared/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter(file => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      toast.error("Please select valid image files");
      return;
    }

    if (images.length + imageFiles.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload process
      const uploadPromises = imageFiles.map(async file => {
        // In a real app, you would upload to your storage service here
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Create a preview URL
        return URL.createObjectURL(file);
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      onImagesChange([...images, ...uploadedUrls]);
      toast.success(`${imageFiles.length} image(s) uploaded successfully`);
    } catch (error) {
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Architecture Diagrams & Images</h3>

      {/* Upload Area */}
      <Card
        className={`relative cursor-pointer border-2 border-dashed transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="p-8 text-center">
          <motion.div animate={{ scale: isDragging ? 1.05 : 1 }} transition={{ duration: 0.2 }}>
            <Upload className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h4 className="mb-2 font-medium">
              {isDragging ? "Drop images here" : "Upload images"}
            </h4>
            <p className="text-muted-foreground mb-4 text-sm">
              Drag and drop or click to select images
            </p>
            <Button variant="outline" size="sm">
              Choose Files
            </Button>
          </motion.div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={e => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </Card>

      {/* Uploaded Images */}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-3"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative"
              >
                <Card className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={e => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Status */}
      {isUploading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground flex items-center gap-2 text-sm"
        >
          <div className="border-primary h-4 w-4 animate-spin rounded-full border-b-2"></div>
          Uploading images...
        </motion.div>
      )}

      {/* Help Text */}
      <div className="text-muted-foreground flex items-start gap-2 text-sm">
        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
        <div>
          <p>Upload architecture diagrams, screenshots, or other images to enhance your guide.</p>
          <p>Supported formats: JPG, PNG, GIF (max {maxImages} images)</p>
        </div>
      </div>
    </div>
  );
}
