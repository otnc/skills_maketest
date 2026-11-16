# maketest

**English** | [日本語](README.ja.md)

An Agent Skill for designing and writing tests that catch unintended behavior changes while keeping CI fast.

## How it works

The skill guides the agent through test design and verification using the project's existing test runner.

- **Set expectations from the requirements.** Derive expected outcomes from the specification, agreed examples, or interface contracts. If the goal of a refactor is to preserve undocumented behavior, label checks for that behavior explicitly.
- **Choose cases by risk.** Check boundaries, errors, and state changes where they could affect users. Reuse existing tests that cover the same risk.
- **Use the fastest test that can catch the failure.** Test business rules in isolation, use integration tests for guarantees such as persistence, and reserve end-to-end tests for journeys that need the full system.
- **Check what makes the test fail.** For a regression test, run the same test on the known buggy version and the fix when possible. Report which checks ran and what remains unverified.

## Install

Install from the published repository with the following command.

```sh
npx skills add otnc/skills_maketest --skill maketest
```

To try a local checkout, run the following command from the repository root.

```sh
npx skills add . --skill maketest
```

## Use

Ask your agent to add or design tests. You can also invoke `$maketest` in clients that support explicit skill selection.

- “Write a regression test for issue #42. Show that it fails on the old version and passes on the fix.”
- “Design test cases for this pricing rule. Cover the important boundaries without duplicating existing end-to-end tests.”
- “Pin the current CSV output before this refactor. Flag any behavior that looks accidental.”

The [skill instructions](skills/maketest/SKILL.md) cover TDD, acceptance tests, specification-based design, contract tests, domain rules, regression tests, and characterization tests.

## Development

Use the Node.js version in `.node-version`. Edit `base/README.base.md` to change this README.

```sh
npm ci
npm run docs:build
npm run check
```

To release, update the package version and lockfile together. After the changes are on the default branch, run the `release` workflow with the version from `package.json` (without the leading `v`).

## References

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

## License

[MIT](LICENSE)
