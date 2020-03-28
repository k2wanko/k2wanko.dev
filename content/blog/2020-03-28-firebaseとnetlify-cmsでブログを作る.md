---
title: FirebaseとNetlify CMSでブログを作る
date: 2020-03-28T08:42:35.031Z
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

\[TBD Image]

今回はNetlify CMSをCMSとして使いGatsbyをフレームワークにし、Firebase Hostingにデプロイしてみます。\
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

```js
plugins: [
  `gatsby-plugin-netlify-cms`
]
```


# Netlify CMSのバックエンドにFirebase 認証を利用する