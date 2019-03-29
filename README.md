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

---

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

### methods

#### on( handlers )

@param

handlers : object

original event を bind する method。日本語なのに日本語表記が少ない。

```
$( 'input[type=file]' ).filednd( 'on', {
	dropdone: function( $event ){
		console.log( 'drop done!' );
	}
} );
```

#### off( eventName )

@param

eventName : string

original event を unbind する。

```
$( 'input[type=file]' ).filednd( 'off', 'dropdone' );
```

### events

jQuery.Widget で original event を定義するには、event 名に widget 名を含む必要がありますが、面倒なので省略できるようにしました。面倒なので。（重要）

`draghover()` は、内部では `filednddraghover()` で処理されますが、bind するときは `.filednd( 'on', { 'draghover': function(){} } )` の記述のみで、正確に bind & run されます。

変わりに、 native event は bind できますが、正しく処理されないかもしれません。（未テスト）

---

#### draghover( \[$event\]\[, widget\] )

@param

$event : jQuery Event object

jQuery のイベントオブジェクト

@param

widget : jQuery FileDnD

ファイルがドラッグされた際に発火するイベント。

正しくは、`options.types` で指定した、許可する `DataTransfer.types` を、Drag & Hover させた時のみ発火します。
だんだん書くの面倒になってきた。

#### dragfail( \[$event\]\[, widget\] )

@param

$event : jQuery Event object

jQuery のイベントオブジェクト

@param

widget : jQuery FileDnD

ファイルがドラッグされた際に発火するイベント。

正しくは、`options.types` で指定していない `DataTransfer.types` を、Drag & Hover させた時のみ発火します。

`draghover()` の逆みたいな。

#### dropbefore( \[$event\]\[, widget\] )

@param

$event : jQuery Event object

jQuery のイベントオブジェクト

@param

widget : jQuery FileDnD

ファイルがドロップされた際に常に発火するイベント。

正確に言うと、`options.types` で指定した、許可する `DataTransfer.types` を、Drag & Drop させた時のみ発火します。

で、後述しますが、`dropbefore()` -> `dropdone()` or `dropfail()` -> `dropalways()`の順で動作します。

役割としては、`dropdone()`の前に何かしらの処理をしたい時とか。

#### dropdone( \[$event\]\[, widget\] )

@param

$event : jQuery Event object

jQuery のイベントオブジェクト

@param

widget : jQuery FileDnD

ファイルがドロップされた際に、許可されたファイルの種類だった場合、発火するイベント。

正確に言うと、`options.accepts` で指定したファイルの種類が、Drop された時のみ発火します。

Drop される前に判定しろと言いたいところですが、 `native drop()` イベント内でしか `DataTransfer.files` って参照できない仕様っぽい。ちなみに、`native dragover()` -> `native dragenter()` -> `native drop()` と event を正しい道順で通り、通った event 内で `DataTransfer`を正しく設定し、native event を 正しく cancel しないと、`native drop()` 自体が発火しません。 誰かが発狂してましたが仕様なのです。


#### dropfail( \[$event\]\[, widget\] )

@param

$event : jQuery Event object

jQuery のイベントオブジェクト

@param

widget : jQuery FileDnD

`dropdone()` の逆。


#### dropalways( \[$event\]\[, widget\] )

@param

$event : jQuery Event object

jQuery のイベントオブジェクト

@param

widget : jQuery FileDnD

`dropbefore()`と同様。

常に最後に呼び出されます。
