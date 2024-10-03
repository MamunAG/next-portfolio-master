import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import React from "react";

export default function Blogs() {
  return (
    <div className="container">
      {/* Action */}
      <div className="flex justify-between flex-wrap">
        <div className="flex justify-start flex-col space-x-2 w-56">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default">Publish this post</Button>
              </TooltipTrigger>
              <TooltipContent>
                <Label className="text-gray-500">
                  This post is not published yet.
                </Label>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-2">
          <Button variant={"default"} className="w-56">
            Add new text section
          </Button>
          <Button variant={"default"} className="w-56">
            Add new image section
          </Button>
        </div>
      </div>
      {/*end Action */}
    </div>
  );
}
