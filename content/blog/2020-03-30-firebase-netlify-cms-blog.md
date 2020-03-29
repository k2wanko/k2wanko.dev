---
slug: firebase-netlify-cms-blog
title: FirebaseとNetlify CMSでブログを作る
date: 2020-03-30T10:00:00.000Z
tags:
  - tech
  - firebase
  - netlify
  - cms
thumbnail: /img/thumbnail_netlify-cms_firebase.png
description: Firebase Hostingと、Netlify CMSを使ってブログを作った話
---


k2wanko.dev ドメインを取ってからあんまり活かせてなかったのでブログで使ってみようかなと考えていて、じゃあブログシステムはどうしようかなと思っていたところにNetlify CMSがよさそうだなと知ってとりあえず使ってみることにしました。

最近Mediumやnoteで記事を書いてて思ったのはMarkdownで長文書くのはエディター支援がないとつらいなーと思っていたところだったので

# Netlify CMSとは

[Netlify CMS](https://www.netlifycms.org/)

Netlifyが作るOSSのCMSです。SPAで動作をし、GitHubと連携すると直接GitHubにコミットしてブログを書いたり、ドラフトとしてPull Requestを作ってくれたりします。GitHub以外にもGitLabとの連携もできます。

書き出されるファイルはMarkdownなんですがこのようにリッチなテキストエディタもついています。

![](/img/screen-shot-2020-03-29-at-18.40.49.png)

今回はNetlify CMSをCMSとして使いGatsbyをフレームワークにし、Firebase Hostingにデプロイしてみます。\
GitHub Pagesもいいかもと思ったんですが、ビルドした成果物をコミットする必要もないし認証にFirebase Authenticationを利用するので慣れているFirebase Hostingを利用します。

# Setup

まずはGatsbyのセットアップを行います。次のコマンドでGatsbyのCLIをインストールします。

```shell
npm install -g gatsby-cli
```

そして`gatsby-cli`を使ってブログの雛形からディレクトリを生成します。

```shell
gatsby new blog https://github.com/gatsbyjs/gatsby-starter-blog
```

次に`gatsby-plugin-netlify-cms`をインストールします。

```shell
npm install --save netlify-cms-app gatsby-plugin-netlify-cms
```

`gatsby-config.js`に追記します。

```javascript
plugins: [
  {
    resolve: `gatsby-plugin-netlify-cms`,
    options: {
      modulePath: `${__dirname}/src/cms/cms.js`,
      manualInit: true,
    },
  },
]
```

`src/cms/cms.js` は次のような形でファイルを作成してください。 このコードで動作環境に応じて設定を書き換えることを目的にしています。 `base_url` は常に動作している環境のoriginを向くようにしています。

```javascript
import CMS from "netlify-cms-app"

CMS.init({
  config: {
    backend: {
      base_url: window.location.origin,
    },
  },
})
```

次にNetlify CMSの設定ファイルを作成します。今回の場合は `static/admin/config.yml` に作成します。 `{username}` にはホストする予定のGitHubのユーザー名か、Orgの名前を指定してください。`blog`部分も任意のリポジトリ名で大丈夫です。 `auth_endpoint` は後ほど解説します。

```yaml
backend:
  name: github
  repo: {username}/blog
  auth_endpoint: /auth
  api_root: https://api.github.com

media_folder: static/img
public_folder: /img

collections:
  - name: "blog"
    label: "Blog"
    folder: "content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    editor:
      preview: false
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Description", name: "description", widget: "string" }
      - { label: "Body", name: "body", widget: "markdown" }
```

この設定では次のようなファイルパスで記事が作成されます。 `content/blog/{{year}}-{{month}}-{{day}}-{{slug}}.md` gatsbyでビルドする際に全くファイルがないとビルドに失敗するので適当にファイルを作成しておきましょう。

# Netlify CMSのバックエンドにFirebase 認証を利用する

デフォルトではNetlify CMSはNetlifyのAPIを使ってGitHub認証をサポートしてくれますが、それ以外だと自前でサーバーを用意する必要がありそうで、Firebaseでできる方法がないか調べたところ\
Cloud Functionsを使ってNetlify CMSの認証をしているサンプルがあり、中を見てみたらどうもGitHubのトークンさえ渡せればいいだけで自分で一切サーバーを持たなくてもなんとかなりそうだったのでその方法を紹介します。

[Herohtar/netlify-cms-oauth-firebase: Firebase Cloud Function based OAuth2 GitHub backend for Netlify CMS](https://github.com/Herohtar/netlify-cms-oauth-firebase)

Netlify CMSにログインするときはGitHubのログインボタンを押すとポップアップが出てきます。このポップアップウィンドウとpostMessageでGitHubのトークンを渡せばよいようです。

ポップアップウィンドウのpathは`static/admin/config.yml`の`auth_endpoint`で指定します。

今回はGatsbyで作成を行っているので`src/pages/auth.js`にファイルを作成しポップアップウィンドウで開くページにします。

まず`auhotizing:github`を送ってGitHubの認証を開始します。

```javascript
window.opener.postMessage(`authorizing:github`, "*")
```

Firebaseのリダイレクト方式でGitHubのサインインを行います。

```javascript
const provider = new firebase.auth.GithubAuthProvider()
      provider.addScope('repo') // 必要なスコープを追加
      firebase.auth().signInWithRedirect(provider)
```

無事にサインインが完了すると次のコードでGitHubのトークンを取得できます。`result.credential.accessToken`に入っています。トークンを再度`postMessage`でCMS側に伝達します。

```javascript
firebase.auth()
    .getRedirectResult()
    .then(result => {
      if (result.credential) {
        const token = result.credential.accessToken
        window.opener.postMessage(
          `authorization:github:success:${JSON.stringify({
            provider: "github",
            token,
          })}`,
          location.origin // 送り先を自身のoriginに限定
        )
      }
```

これで認証はおしまいです。

FirebaseでのGitHub認証については公式のドキュメントを確認してみてください。

[Authenticate Using GitHub with JavaScript | Firebase](https://firebase.google.com/docs/auth/web/github-auth)

あとは`npm start` でDevサーバーが起動し `http://localhost:8000/admin` にアクセスし、GitHubログインできれば完了です。

![Netlify CMSのTop](/img/screen-shot-2020-03-29-at-18.32.14.png "Netlify CMSのTop")

# まとめ

まだ、使いだしてみて間もないのでNetlify CMS自体の使いやすさは触れませんが、この記事の執筆に利用してみてますが日本語入力時の挙動が怪しかったり、画像の添付がファイルへのコミットになるのがちょっとイケてないかなーと思っています。ただ幸いなことに、Pluginを書くのはさほど苦じゃない気がするので自分でカスタマイズできるかどうか今後試していきたいと思います。

ちなみにこのサイトは[GitHub](https://github.com/k2wanko/k2wanko.dev)で管理しているので、気になる人はそっちも合わせて確認してみてください。