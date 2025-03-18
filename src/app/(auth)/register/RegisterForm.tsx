import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createUser } from "@/service/api";

interface formValue{
  name: string;
  email: string;
  password: string;
}

const schema = z.object({
  name: z.string().min(3, "Username phải có ít nhất 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: formValue) => {
    setLoading(true);
    try {
      const result = await createUser(data);
      console.log('User created successfully:', result);
      toast.success("Đăng ký thành công 🎉");
      setLoading(false);
      router.push("/login");
    } catch (error) {
      console.error('Failed to create user:', error);
      toast.error("Đăng ký thất bại 😢");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Đăng ký</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name" className="mb-2">Name</Label>
              <Input id="name" {...register("name")} placeholder="Nhập name" />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="mb-2">Email</Label>
              <Input id="email" {...register("email")} placeholder="Nhập email" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password" className="mb-2">Mật khẩu</Label>
              <Input id="password" type="password" {...register("password")} placeholder="Nhập mật khẩu" />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
