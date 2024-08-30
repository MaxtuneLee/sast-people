"use client";
import axios from "axios";
import Script from "next/script";
import React, { useEffect } from "react";

export const FeishuSDKInject: React.FC = () => {
	useEffect(() => {
		if ((window as any).h5sdk) {
			const url = window.location.href;
			axios.get(`/api/auth?url=${url}`).then((res) => {
				console.log(res);
				const { appid, timestamp, nonceStr, signature } = res.data;
				(window as any).h5sdk.config({
					appId: appid,
					timestamp,
					nonceStr,
					signature,
					onSuccess: (res: any) => {
						console.log(`config success: ${JSON.stringify(res)}`);
					},
					//鉴权失败回调
					onFail: (err: any) => {
						throw `config failed: ${JSON.stringify(err)}`;
					},
				});
			});
			(window as any).h5sdk.ready(() => {
				console.log("h5sdk is ready");
				(window as any).tt.requestAccess({
					appID: "cli_a6f925ecf836100c",
					scopeList: [],
					success: (res: any) => {
						const { code } = res;
					},
					fail: (error: any) => {
						console.error(`requestAccess failed: `, error);
					},
				});
			});
		}
	}, []);
	return (
		<>
			<Script
				src="https://lf1-cdn-tos.bytegoofy.com/goofy/lark/op/h5-js-sdk-1.5.29.js"
				strategy="beforeInteractive"
			></Script>
			<Script
				src="https://sf1-scmcdn-cn.feishucdn.com/obj/feishu-static/op/fe/devtools_frontend/remote-debug-0.0.1-alpha.6.js"
				strategy="beforeInteractive"
			></Script>
		</>
	);
};
