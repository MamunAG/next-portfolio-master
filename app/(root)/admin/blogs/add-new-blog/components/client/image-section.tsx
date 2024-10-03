/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { MouseEventHandler, useState } from "react";
import { FiArrowUp, FiArrowDown, FiTrash } from "react-icons/fi";

const ImageSection = ({
  section,
  onImageChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  section: {
    id: string;
    sectionType: string;
    imagePreview?: any;
  };
  onImageChange: Function;
  onRemove: MouseEventHandler;
  onMoveUp: MouseEventHandler;
  onMoveDown: MouseEventHandler;
}) => (
  <div className="p-2 border bg-gray-100 shadow-sm rounded mt-3">
    <div className="flex justify-between items-center">
      <div></div>
      <div>
        <Button size="sm" variant="outline" onClick={onMoveUp}>
          <FiArrowUp /> Move Up
        </Button>
        <Button
          size="sm"
          className="ml-1"
          variant="outline"
          onClick={onMoveDown}
        >
          <FiArrowDown /> Move Down
        </Button>
        <Button size="sm" className="ml-1" variant="outline" onClick={onRemove}>
          <FiTrash /> Remove
        </Button>
      </div>
    </div>
    <div className="mt-1">
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => onImageChange(section.id, e)}
        className="mt-2 shadow-none bg-white"
      />
      {section.imagePreview && (
        <div className="mt-2 flex justify-center">
          <img
            src={section.imagePreview}
            alt="Image Preview"
            className="w-1/3 h-auto"
          />
        </div>
      )}
    </div>
  </div>
);

export default ImageSection;
