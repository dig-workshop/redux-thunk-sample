# Redux-Thunkを勧める会

## Reduxとは
- Redux（リダックス）とは2015年にDan Abramov氏とAndrew Clark氏によって作成された状態管理ライブラリ。  
Fluxアーキテクチャの影響を受けており、フロントエンドでのデータ管理を容易かつ堅牢なものにしてくれる。

- Fluxアーキテクチャとは Meta社が提唱しているアプリケーション上でのデータフロー管理のためのアーキテクチャパターン。
View, Action, Dispatcher, Storeの4つの要素で構成され、単方向へデータが流れていくことでデータの流れを追いやすくなるという特徴がある。

- Reduxでは「Action」と呼ばれるイベントを使用して、アプリケーションのState（状態）を管理し、更新する。  
アプリケーションの多くの部分で必要なStateを、グローバルなStateとして一元管理するのに役立つ。

- Redux自体は純粋なJSで書かれているため、Vanila JSやjQueryで使えるのはもちろん、React専用のAPIが用意された『react-redux』も存在し、幅広いフレームワーク上で動作する。  

### Reduxデータフロー
1. ユーザーの入力をもとにActionを作成
2. ActionをStoreへDispatch（送信）する
3. ActionをもとにReducerがStateを更新
4. StateをもとにUIを更新

![Redux-Anim](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)
出典：Redux Application Data Flow (https://redux.js.org/tutorials/essentials/part-1-overview-concepts#redux-application-data-flow)

### Reduxの何がいいのか
- 求められる要件が複雑であればある程、Webアプリケーションの状態管理も難しくなってきます。  
例えば小中規模のWebサイトなら比較的少ないstate管理(UseStateの増大)で済みますが、多くの機能を想定したWebアプリケーションなら数多くのStateを抱えることになり、管理が大変かつ煩雑になりがち(バケツリレーなど)です。  
そこでReduxを実装することでフロントエンド上でのstate管理を簡素なものにし、堅牢（純粋関数や読取り専用であること）故にバグも発生しにくくなるなど多くのメリットをもたらしてくれます。  
また、Redux-Thunkなどのミドルウェアを使用して機能拡張できるのもメリットです。  

### reduxの導入方法
- reduxの導入にはredux-toolkitがおすすめなので、下記コマンドでredux-toolkitとreact-reduxをインストール。  

#### 純粋なredux
```
npm install redux
```

#### おすすめのredux-toolkit
```
npm install @reduxjs/toolkit react-redux
```
reduxのView, Action, Dispatcher, Storeの4つの要素の理解を深めるためにはノーマルのreduxで実装してみるのもアリ。

## Redux-Thunkとは
- Reduxにおける非同期処理のためのミドルウェア。  
- Redux Style Guide優先度Cのルールにも非同期ロジックにRedux Thunkを使うということが書かれている公式推奨の非同期用ミドルウェア。  
- Redux-Thunkではdispatchするときにaction以外に専用の非同期関数を渡すことができ、ミドルウェア(Redux-Thunk)が処理を待ってからステートを更新する。
- 一連の処理の中で非同期処理とステートの更新を行うような場合に有用。例えばボタンを押したらAPIを叩いてその結果をステートに反映するような時、よくあるのはAPIをfetchして非同期処理を待ってからステートに反映させることだが、 Redux-Thunkでは下記のgifのようになりミドルウェアで非同期処理の結果に応じてreducerによるステート更新をさせることができる。  

**APIの結果でステートの値を変えるのは大体のアプリで発生するパターンだと思うが、この動作がreduxのアクションひとつで行えることがredux(thunk)を使うメリットだと思う（veiwのコード量低減、テストの簡素化など）**
![Redux-Anim](https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif)
出典：Redux Async Data Flow (https://redux.js.org/tutorials/fundamentals/part-6-async-logic#redux-async-data-flow)

### redux-thunkのインストールコマンド
- redux-toolkitをインストールしている場合、そっちにあるのでこれは不要。
```
npm install redux-thunk
```