import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { Input } from "../ui/input";

export default function DropdownMenuOption({ setPreviews }: any) {
  const [isShowInput, setIsShowInput] = useState(false);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const filesArray = Array.from(event.target.files);

    // Chuyển đổi file thành base64 bằng Promise
    const readFileAsBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // Chuyển file sang Base64
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      const base64Images = await Promise.all(filesArray.map(readFileAsBase64));
      setPreviews((prev: any) => [...prev, ...base64Images]); // Cập nhật state sau khi có Base64
      setIsShowInput(false);
    } catch (error) {
      console.error("Error converting files to base64:", error);
    }
  };

  return (
    <div>
      <DropdownMenu open={isShowInput} onOpenChange={setIsShowInput}>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" variant="outline">
            <FaPlus />
          </Button>
        </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <>
                <label className="cursor-pointer flex items-center gap-2 w-full px-2 py-1">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  Upload Image
                  <DropdownMenuShortcut>
                    <FaImages />
                  </DropdownMenuShortcut>
                </label>
              </>
            </DropdownMenuGroup>
          </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
