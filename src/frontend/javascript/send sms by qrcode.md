---
lang: zh-CN
title: 扫码发短信
description: 扫码发短信的实现方法
category:
  - JavaScript
date: 2024-09-29
tags:
  - 短信
  - 扫码
---

今天注册126的邮箱发现个新功能，扫码发短信，借鉴下实现通过扫码的方式快捷发送短信的实现方法。

<!-- more -->

## 创建一个网页挂到线上

首先，我们需要创建一个网页，并添加如下 js 代码：

```javascript
var to = "目标手机号(多个用,隔开)";

var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //判断是否是 android终端
var isUc = u.indexOf("UCBrowser") > -1;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

if (isIOS && !isUc) {
  window.location.href = "sms:" + to + "&body=测试";
} else if (isAndroid || isUc) {
  window.location.href = "sms:" + to + "?body=测试";
}
```

## 将网页挂到线上，并将其链接生成二维码
1. 将网页挂到线上，如：https://example.com/send-sms.php
2. 将网页链接生成二维码，如：https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fexample.com%2Fsend-sms.php
