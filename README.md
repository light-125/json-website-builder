# Installation / 適用の仕方

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>TypeScript-Driven Page</title>
    <!-- Configuration JSON / 設定JSON -->
    <script  id="wb" type="application/json"></script>
    <!-- Engine Core (TypeScript) / エンジン本体 -->
    <script src="https://cdn.jsdelivr.net/gh/light-125/json-website-builder@main/JavaScript/index.min.js"></script>
</head>
<body>
    <h1>JSON Engine Running</h1>
</body>
</html>
```

\---

## JSON Formatting Rules / JSONの書き方

### 1\. html Attributes / html 属性の書き方

Separate multiple attributes using a **comma (`,`)**.
複数の属性を設定する場合は、**カンマ（`,`）** で区切ります。

```json
"html": "lang='en',dir='ltr'"
```

### 2\. meta / link / script Attributes / 各タグの属性の書き方

Separate attributes inside these tags using a **single space**. Enclose the values in single quotes (`'`).
タグの中に設定する属性は、**半角スペース** で区切ります。値はシングルクォーテーション（`'`）で囲んで記述してください。

```json
"link": "rel='stylesheet' href='style.css'"
```

### 3\. Writing Raw Code Inside script / script の中に「生コード」を書く方法

To inject raw JavaScript code directly inside a `<script>` tag, write your attributes first, insert a **space single-quote space (`'`)** as a separator, and follow it with your code.
`<script>` タグの中に直接実行したいJavaScriptプログラムを書く場合は、属性を書き終えたあとに **空白 `' 空白** （シングルクォーテーション）を挟んでから、後ろにコードを記述します。

```json
"script": "id='alert-js' ' window.alert('Hello World!')"
```
