/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { signIn } from "next-auth/react";

interface formValue {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(3, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: formValue) => {
    setLoading(true);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (result?.error) {
      toast.error("Đăng nhập thất bại 😢");
      setLoading(false);
      console.log("CHECK ERROR: ", result.error);
      return;
    } else {
      console.log("Login successfully:", result);
      toast.success("Đăng nhập thành công 🎉");
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl flex items-center justify-center space-x-2">
            <div className="font-bold">Real Chat</div>
            <div className="text-neutral-500 dark:text-neutral-400">
              | Đăng nhập
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                {...register("email")}
                placeholder="Nhập email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="mb-2">
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>

            <div
              onClick={() => router.push("/register")}
              className="text-right mt-1 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer transition-colors duration-200"
            >
              Bạn chưa có tài khoản?
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
