# 开发贡献指南

## 目录结构

todo

## 开发说明

[什么是 lerna？](https://lerna.js.org/)

### 安装依赖

安装最外层的依赖（Installs lerna and dev dependencies）

```
npm install
```

> `lerna`可以全局安装

安装每个包的依赖（Links packages and installs regular dependencies）

```
npm run packages:bootstrap
```

### 脚本

-   "packages:bootstrap" - 安装所有包的依赖，如果引用的是本地包，则会以软链接的方式安装依赖
-   "packages:changed" - 列出从上次发包以来的变更
-   "packages:list" - 列出所有的包
-   "packages:publish" - 发包
-   "packages:publish-log" - 发包，并生成日志文件
-   "lint" - 检测并修复 eslint 错误
-   "clean" - 清空当前项目所有的依赖包
-   "precommit" - git commit 前执行的内容

更多关于 lerna 的指令：[https://github.com/lerna/lerna/tree/master/commands](https://github.com/lerna/lerna/tree/master/commands)

### 其他待补充

## 发布

```bash
npm run packages:publish-log
```

> 如果要发布「预发布」版本，需要在 publish 后加上版本号规则的参数：`'premajor', 'preminor', 'prepatch', 'prerelease'`，如：`lerna publish preminor`
>
> `registry` 在 `lerna.json` 中指定了，所以可以直接执行 publish
>
> 只会发布已经做了变更的包，如果要强制全部一起发布，可以加参数：`--force-publish`

## 待办

-   [ ] `eslint`、`stylelint`需要增加单元测试
