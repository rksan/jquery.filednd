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

#### types

Type : String Array

Default : ['File']

許可する DataTransfer のタイプ。 `DataTransfer.type`

※変更は推奨しません。

```
$( 'input[type=file]' ).filednd( {
	options: {
		types: ['File']
	}
} );
```

#### accepts

Type : String Array

Default : [image/\*]

ドロップを許可するファイルの種類。 `image/*` 等のファイルの種類や `.png` 等の拡張子で指定する。

基本的には `<input type="file">` の `accept` に指定する値と同値。

```
$( 'input[type=file]' ).filednd( {
	options: {
		accepts: [image/*, .png]
	}
} );
```

#### text

Type : String

Default : 'Tap to select a file or drag a file.'

ドロップエリアに表示されるテキスト文字列。

```
$( 'input[type=file]' ).filednd( {
	options: {
		text: 'Tap to select a file or drag a file.'
	}
} );
```

#### classes

Type : Object

Default : { classname objects }

とりあえず用意してあるけど、内容については考えていない。
※変更は推奨しません。

### events

jQuery.Widget で original event を定義するには、event 名に widget 名を含む必要がありますが、面倒なので省略できるようにしました。

`draghover()` は、内部では `filednddraghover()` で処理されますが、bind するときは `.filednd( 'on', { 'draghover': function(){} } )` の記述のみで、正確に bind & run されます。

変わりに、 native event は bind できますが、正しく処理されないかもしれません。（未テスト）

#### draghover( \[$event\]\[, widget\] )

@param

$event : jQuery Event object

jQuery のイベントオブジェクト

@param

widget : jQuery FileDnD

ファイルがドラッグされた際に発火するイベント。

正しくは、`options.types` で指定した、許可する `DataTransfer.type` を、Drag & Hover させた時のみ発火します。
