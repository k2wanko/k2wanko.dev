---
slug: tips-firebase-bigquery
title: BigQueryでGoogle Analytics for Firebaseのevent_paramsを扱いやすいように取り出す。
date: 2020-04-05T08:17:13.601Z
tags:
  - tips
  - firebase
  - analytics
  - bigquery
  - sql
thumbnail: /img/thumbnail_bq_firebase.png
description: BigQueryでGoogle Analytics for Firebaseのevent_paramsを扱いやすいように取り出す。
---
Google Analytics for FirebaseのBigQuery 連携をすると、BigQuery にAnalyticsで収集されるイベントデータが溜まっていくが、全部1テーブルに詰め込む関係でeventのparameterはevent_paramsにkeyと各型ごとのカラムに詰め込まれている。

集計や分析を行うとき、まずは利用したいパラメーターを抽出してから加工を行うのが基本なのでGoogle Analyticsでやる場合どうすればいいかのメモ

例として `firebase_screen_class` の場合は まずString型なので `event_params.value.string_value` に入っているので次のような形で取得する `(select value.string_value from unnest(event_params) x where x.key = 'firebase_screen_class')`

実際に実行できるSQLまで落とし込むと次のようになり

```sql
select
  user_pseudo_id, event_name, event_timestamp,
  (select value.string_value from unnest(event_params) x where x.key = 'firebase_screen_class') firebase_screen_class
  from `firebase-public-project.analytics_153293282.events_20181003`
```

実行すると次のような形で`firebase_screen_class`を取得することができる。

![result](/img/screen-shot-2020-04-05-at-19.38.36.png "SQLの実行結果")

# Reference

1. https://support.google.com/firebase/answer/7061705?hl=ja&ref_topic=7029512