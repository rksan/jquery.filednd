# 説明

ファイルのドラッグ＆ドロップ(DnD)の実装を補助する jQuery Widget(https://api.jqueryui.com/jQuery.widget/) です。
PC向け。
例えば、ファイルをWebサーバーにアップロードする機能を実装する時に、ブラウザにファイルをDnDするだけで操作完了とする様にするのはクソ面倒ですが、DnDの部分だけでもプラグイン化されていれば何ぼかマシです。


# 使い方

HTML上の `<form>` 要素以下に `<input type="file">` 要素を配置するだけです。

デモ(https://rksan.github.io/index.html)

# CDN

`<script type="text/javascript" src="https://rksan.github.io/js/jquery.filednd.js"></script>`

## 例

```
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
	<script type="text/javascript" src="https://rksan.github.io/js/jquery.filednd.js"></script>
</head>
<body>
	<form action="">
		<input type="file" name="imagefile" accept="image/*">
	</form>
</body>
```

# API

### options

##### types

Type : String Array
Default : ['File']

許可する DataTransfer のタイプ。 `DataTransfer.type`

##### accepts

許可するファイルの種類。

### events

##### draghover

ファイルがドラッグされた際に発火するイベント。
