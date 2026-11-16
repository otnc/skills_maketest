# maketest

[English](README.md) | **日本語**

CI の実行時間を抑えながら、意図しない挙動の変化を検出するテストを設計・作成する Agent Skill です。

## テストの作り方

エージェントが次のルールに沿ってテストを設計し、プロジェクトで使っているテストランナーで検証します。

- **仕様から期待結果を決める。** 仕様や合意した例、インターフェースの契約を根拠にします。リファクタリング前に仕様書にない挙動を固定するときは、現状の挙動を記録するテストだと明記します。
- **リスクに応じてケースを選ぶ。** 利用者に影響する境界値、エラー、状態の変化を確認します。同じリスクを既存のテストで確認できるなら、そのテストを活用します。
- **不具合を検出できる最も速いテストを選ぶ。** 業務ルールは単体テストで確認し、データの保存などは結合テストで確かめます。E2E テストはシステム全体を通す必要がある操作に絞ります。
- **どんな不具合でテストが失敗するかを確かめる。** 回帰テストでは、可能なら不具合のある旧版と修正版で同じテストを実行します。実行できた確認と未検証の項目を報告します。

## インストール

公開済みのリポジトリからインストールするには、次のコマンドを実行します。

```sh
npx skills add otnc/skills_maketest --skill maketest
```

手元にチェックアウトしたスキルを試すには、リポジトリのルートで次のコマンドを実行します。

```sh
npx skills add . --skill maketest
```

## 使い方

エージェントにテストの追加や設計を依頼します。スキルを明示的に選べるクライアントでは、`$maketest` でも呼び出せます。

- 「Issue #42 の回帰テストを書いて。修正前は失敗し、修正後は成功することを確認して。」
- 「この料金ルールのテストケースを設計して。既存の E2E テストと重複しないように、重要な境界値を押さえて。」
- 「リファクタリング前に、現在の CSV 出力をテストで固定して。たまたまそうなっているように見える挙動があれば教えて。」

[スキル本文](skills/maketest/SKILL.md)では、TDD、受け入れテスト、仕様に基づくテスト設計、契約テスト、ドメインルールの検証、回帰テスト、既存の挙動を固定するテストを扱います。

## 開発

開発には `.node-version` に記載されたバージョンの Node.js を使います。README を更新するには、`base/README.base.md` を編集してから次のコマンドで生成・検証します。

```sh
npm ci
npm run docs:build
npm run check
```

リリースするには、GitHub の **Actions → release → Run workflow** でデフォルトブランチを選び、`0.2.0` のように先頭に `v` を付けずにバージョンを入力します。ワークフローは `npm version` で `package.json` と `package-lock.json` を更新し、`npm run check` を実行します。チェックが通ると、バージョンの変更をデフォルトブランチにコミットして、`v0.2.0` のタグと GitHub Release を作成します。両ファイルに指定のバージョンが入っていれば、更新コミットは省略します。

## 参考文献

- [Kent Beck, Canon TDD](https://newsletter.kentbeck.com/p/canon-tdd)
- [ISTQB, Certified Tester Foundation Level Syllabus v4.0.1](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf)
- [NIST, Practical Combinatorial Testing](https://csrc.nist.gov/pubs/sp/800/142/final)
- [Cucumber, Example Mapping](https://cucumber.io/docs/bdd/example-mapping/)
- [Pact, Testing Scope](https://docs.pact.io/getting_started/testing-scope)
- [Software Engineering at Google, Testing Overview](https://abseil.io/resources/swe-book/html/ch11.html) and [Test Doubles](https://abseil.io/resources/swe-book/html/ch13.html)
- [Inozemtseva and Holmes, Coverage Is Not Strongly Correlated with Test Suite Effectiveness](https://cs.uwaterloo.ca/~m2nagapp/courses/CS846/1171/papers/inozemtseva_icse14.pdf)
- [Petrović et al., Practical Mutation Testing at Scale](https://arxiv.org/abs/2102.11378)
- [Lam et al., A Large-Scale Longitudinal Study of Flaky Tests](https://cs.stanford.edu/~anjiang/papers/LamETAL20LongitudinalFlakyTests.pdf)
- [AIにテストを書かせると、決まって同じ場所が抜ける（Qiita）](https://qiita.com/suwa_nobu/items/a0fa9752528e2b3def71)
- [カバレッジ 99% のテストに mutation testing をかけたら、監査ログの穴が見つかった（Qiita）](https://qiita.com/SeckeyJP/items/b136d6d0bb2d830fb508)
- [AIでユニットテストも結合テストも書かせて全pass。でもだめだった。（Zenn）](https://zenn.dev/ryuka_lucas/articles/agent-teams-test-it-validation)
- [AIが書いたテスト24件、バグありアプリで全部『成功』。直したら9件『失敗』した（Zenn）](https://zenn.dev/sumumu26/articles/b1afde3b0e06f2)

## ライセンス

[MIT](LICENSE)
