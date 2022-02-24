## eslint prettier ts-node-dev setting etc...

    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc -p tsconfig.json",

## GraphQL 設定

- 必要なパッケージ

  yarn add apollo-server, graphql add

  yarn add @graphql-tools/graphql-file-loader @graphql-tools/load @graphql-tools/schema

- scheme.graphql 作成

- index.ts で scheme.graphql を読み込み apollo-server を設定する

- graphql-codegen でスキーマ設定値から typescript の型情報を生成

  yarn add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers

  ↓

  yarn graphql-codegen init 全部 yes scripts「codegen」とする

  codegen.yml が生成されるので必要な記述をして yarn codegen

## Prisma 設定

- 必要なパッケージ

  yarn add prisma @prisma/client

  yarn prisma init

- .env に DATABASE_URL を設定（SQLite）

- scheme.prisma を設定

- prisma migrate dev --name init マイグレーション

## DB 出来上がり!!!

## prisma クライアントをインスタンス化して apolo-server の resolver で Query、Mutation を設定していく
