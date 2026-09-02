# Installation / 適用の仕方

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>TypeScript-Driven Page</title>
    <!-- In-browser translation engine for TypeScript / TSブラウザ翻訳エンジン -->
    <script src="https://unpkg.com"></script>
    <!-- Configuration JSON / 設定JSON -->
    <script id="wb" type="application/json">
    {
      "html": "lang='en'",
      "meta": "charset='UTF-8'",
      "link": "rel='stylesheet' href='https://jsdelivr.net'",
      "script": "id='my-script' ' window.alert('Engine started successfully!')"
    }
    </script>
    <!-- Engine Core (TypeScript) / エンジン本体 -->
    <script type="text/typescript">
    window.console.error = window.alert;

    interface PageConfig {
      html?: string;
      meta?: string;
      link?: string;
      script?: string;
      \[key: string]: string | undefined;
    }

    try {
      const configElement = document.getElementById('page-config');
      if (!configElement || !configElement.textContent) {
        throw new Error('Configuration file not found');
      }

      const c: PageConfig = JSON.parse(configElement.textContent);

      if (c.html \&\& typeof c.html === 'string') {
        c.html.split(',').forEach((a: string) => {
          const \[k, v] = a.split('=');
          if (k \&\& /^\[a-zA-Z-]+\\$/.test(k.trim())) {
            document.documentElement.setAttribute(k.trim(), (v || '').replace(/\['"]/g, ''));
          }
        });
      }

      const tags = \['meta', 'link', 'script'] as const;

      tags.forEach(t => {
        const data = c\[t];
        if (data \&\& typeof data === 'string') {
          const i = data.indexOf("'");
          const p = i === -1 ? data : data.slice(0, i);
          const s = i === -1 ? '' : data.slice(i + 1);
          
          const e = document.createElement(t as any);

          p.trim().split(/\\s+/).forEach((a: string) => {
            const \[k, v] = a.split('=');
            if (k \&\& /^\[a-zA-Z-]+\\$/.test(k.trim())) {
              const n = k.trim();
              const m = (v || '').replace(/\['"]/g, '');
              if (t === 'script' \&\& (n.toLowerCase() === 'src' || n.toLowerCase().startsWith('on'))) return;
              e.setAttribute(n, m);
            }
          });

          if (s.trim()) {
            if (t === 'script') {
              (e as HTMLScriptElement).textContent = s;
            } else {
              e.setAttribute('content', s);
            }
          }
          document.head.appendChild(e);
        }
      });
    } catch (e) {
      console.error('Engine Error: ' + (e as any).message);
    }
    </script>
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

