# maketest

:::kiritan{locale=en}
An Agent Skill for designing and writing tests that catch unintended behavior changes while keeping CI fast.
:::

:::kiritan{locale=ja}
CI の実行時間を抑えながら、意図しない挙動の変化を検出するテストを設計・作成する Agent Skill です。
:::

:::kiritan{locale=en}
## How it works

The skill guides the agent through test design and verification using the project's existing test runner.

- **Set expectations from the requirements.** Derive expected outcomes from the specification, agreed examples, or interface contracts. If the goal of a refactor is to preserve undocumented behavior, label checks for that behavior explicitly.
- **Choose cases by risk.** Check boundaries, errors, and state changes where they could affect users. Reuse existing tests that cover the same risk.
- **Use the fastest test that can catch the failure.** Test business rules in isolation, use integration tests for guarantees such as persistence, and reserve end-to-end tests for journeys that need the full system.
- **Check what makes the test fail.** For a regression test, run the same test on the known buggy version and the fix when possible. Report which checks ran and what remains unverified.
:::

:::kiritan{locale=ja}
## テストの作り方

エージェントが次のルールに沿ってテストを設計し、プロジェクトで使っているテストランナーで検証します。

- **仕様から期待結果を決める。** 仕様や合意した例、インターフェースの契約を根拠にします。リファクタリング前に仕様書にない挙動を固定するときは、現状の挙動を記録するテストだと明記します。
- **リスクに応じてケースを選ぶ。** 利用者に影響する境界値、エラー、状態の変化を確認します。同じリスクを既存のテストで確認できるなら、そのテストを活用します。
- **不具合を検出できる最も速いテストを選ぶ。** 業務ルールは単体テストで確認し、データの保存などは結合テストで確かめます。E2E テストはシステム全体を通す必要がある操作に絞ります。
- **どんな不具合でテストが失敗するかを確かめる。** 回帰テストでは、可能なら不具合のある旧版と修正版で同じテストを実行します。実行できた確認と未検証の項目を報告します。
:::

:::kiritan{locale=en}
## Install

Install from the published repository with the following command.
:::

:::kiritan{locale=ja}
## インストール

公開済みのリポジトリからインストールするには、次のコマンドを実行します。
:::

```sh
npx skills add otnc/skills_maketest --skill maketest
```

:::kiritan{locale=en}
To try a local checkout, run the following command from the repository root.
:::

:::kiritan{locale=ja}
手元にチェックアウトしたスキルを試すには、リポジトリのルートで次のコマンドを実行します。
:::

```sh
npx skills add . --skill maketest
```

:::kiritan{locale=en}
## Use

Ask your agent to add or design tests. You can also invoke `$maketest` in clients that support explicit skill selection.

- “Write a regression test for issue #42. Show that it fails on the old version and passes on the fix.”
- “Design test cases for this pricing rule. Cover the important boundaries without duplicating existing end-to-end tests.”
- “Pin the current CSV output before this refactor. Flag any behavior that looks accidental.”

The [skill instructions](skills/maketest/SKILL.md) cover TDD, acceptance tests, specification-based design, contract tests, domain rules, regression tests, and characterization tests.
:::

:::kiritan{locale=ja}
## 使い方

エージェントにテストの追加や設計を依頼します。スキルを明示的に選べるクライアントでは、`$maketest` でも呼び出せます。

- 「Issue #42 の回帰テストを書いて。修正前は失敗し、修正後は成功することを確認して。」
- 「この料金ルールのテストケースを設計して。既存の E2E テストと重複しないように、重要な境界値を押さえて。」
- 「リファクタリング前に、現在の CSV 出力をテストで固定して。たまたまそうなっているように見える挙動があれば教えて。」

[スキル本文](skills/maketest/SKILL.md)では、TDD、受け入れテスト、仕様に基づくテスト設計、契約テスト、ドメインルールの検証、回帰テスト、既存の挙動を固定するテストを扱います。
:::

:::kiritan{locale=en}
## Development

Use the Node.js version in `.node-version`. Edit `base/README.base.md` to change this README.
:::

:::kiritan{locale=ja}
## 開発

開発には `.node-version` に記載されたバージョンの Node.js を使います。README を更新するには、`base/README.base.md` を編集してから次のコマンドで生成・検証します。
:::

```sh
npm ci
npm run docs:build
npm run check
```

:::kiritan{locale=en}
To release, update the package version and lockfile together. After the changes are on the default branch, run the `release` workflow with the version from `package.json` (without the leading `v`).
:::

:::kiritan{locale=ja}
リリースするときは、`package.json` とロックファイルのバージョンを更新します。変更をデフォルトブランチに反映したら、`package.json` のバージョンを先頭に `v` を付けずに指定して、`release` ワークフローを実行します。
:::

:::kiritan{locale=en}
## References
:::

:::kiritan{locale=ja}
## 参考文献
:::

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

:::kiritan{locale=en}
## License
:::

:::kiritan{locale=ja}
## ライセンス
:::

[MIT](LICENSE)
