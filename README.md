# 説明

ファイルのドラッグ＆ドロップ(DnD)の実装を補助する jQuery Widget(https://api.jqueryui.com/jQuery.widget/) です。
PC向け。
例えば、ファイルをWebサーバーにアップロードする機能を実装する時に、ブラウザにファイルをDnDするだけで操作完了とする様にするのはクソ面倒ですが、DnDの部分だけでもプラグイン化されていれば何ぼかマシです。


# 使い方

HTML上の `<form>` 要素以下に `<input type="file">` 要素を配置するだけです。

# CDN

`<script type="text/javascript" src="https://rksan.github.io/js/jquery.filednd.js"></script>`

## 例

```
<head>
	<script type="text/javascript" src="https://rksan.github.io/js/jquery.filednd.js"></script>
</head>
<body>
	<form action="">
		<input type="file" name="imagefile" accept="image/*">
	</form>
</body>
```
