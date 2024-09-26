"use client";
import checkUser from "./checkUser";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import ReviewDialog from "./reviewContent";
import { useRouter } from "next/router";
import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ReviewProps {
  task: string;
}

const QRCodeScanner: React.FC = () => {
  const [data, setData] = useState("");
  const [checkUserResult, setCheckUserResult] = useState(false);
  const handleCheckUser = async (data: string) => {
    setCheckUserResult(await checkUser(data));

    console.log("114515", checkUserResult);
  };
  useEffect(() => {
    handleCheckUser(data);
  }, [data]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <Label className="min-w-10">考生:</Label>
        <Input
          value={data}
          onChange={(e) => setData(e.target.value)} // 添加onChange事件处理器
          placeholder="请输入考生学号或扫描考生个人识别二维码"
        />
        {checkUserResult ? (
          <Link href={"/dashboard/review/marking?user=" + data}>
            <div className="flex-none">
              <Button
                size="sm"
                onClick={() => {
                  handleCheckUser;
                }}
              >
                开始阅卷
              </Button>
            </div>
          </Link>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                onClick={() => {
                  handleCheckUser;
                }}
              >
                开始阅卷
              </Button>
            </DialogTrigger>
            <DialogContent>
              <text>错误的考生学号，请重新输入或扫描</text>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.getText());
            }

            if (!!error) {
              console.info(error);
            }
          }}
          constraints={{ facingMode: "user" }}
          containerStyle={{
            width: "80%",
            height: "60vw",
            maxWidth: "400px",
            maxHeight: "300px",
          }} // 设置宽度为最大宽度的80%，高度为宽度的60%
        />
      </div>
    </div>
  );
};

export default QRCodeScanner;
