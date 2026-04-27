
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model StudentProgress
 * 
 */
export type StudentProgress = $Result.DefaultSelection<Prisma.$StudentProgressPayload>
/**
 * Model WeekProgress
 * 
 */
export type WeekProgress = $Result.DefaultSelection<Prisma.$WeekProgressPayload>
/**
 * Model Class
 * 
 */
export type Class = $Result.DefaultSelection<Prisma.$ClassPayload>
/**
 * Model Enrollment
 * 
 */
export type Enrollment = $Result.DefaultSelection<Prisma.$EnrollmentPayload>
/**
 * Model QuizSession
 * 
 */
export type QuizSession = $Result.DefaultSelection<Prisma.$QuizSessionPayload>
/**
 * Model ImportBatch
 * 
 */
export type ImportBatch = $Result.DefaultSelection<Prisma.$ImportBatchPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.studentProgress`: Exposes CRUD operations for the **StudentProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentProgresses
    * const studentProgresses = await prisma.studentProgress.findMany()
    * ```
    */
  get studentProgress(): Prisma.StudentProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weekProgress`: Exposes CRUD operations for the **WeekProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeekProgresses
    * const weekProgresses = await prisma.weekProgress.findMany()
    * ```
    */
  get weekProgress(): Prisma.WeekProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.class`: Exposes CRUD operations for the **Class** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classes
    * const classes = await prisma.class.findMany()
    * ```
    */
  get class(): Prisma.ClassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.enrollment`: Exposes CRUD operations for the **Enrollment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enrollments
    * const enrollments = await prisma.enrollment.findMany()
    * ```
    */
  get enrollment(): Prisma.EnrollmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quizSession`: Exposes CRUD operations for the **QuizSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuizSessions
    * const quizSessions = await prisma.quizSession.findMany()
    * ```
    */
  get quizSession(): Prisma.QuizSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.importBatch`: Exposes CRUD operations for the **ImportBatch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ImportBatches
    * const importBatches = await prisma.importBatch.findMany()
    * ```
    */
  get importBatch(): Prisma.ImportBatchDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    StudentProgress: 'StudentProgress',
    WeekProgress: 'WeekProgress',
    Class: 'Class',
    Enrollment: 'Enrollment',
    QuizSession: 'QuizSession',
    ImportBatch: 'ImportBatch'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "session" | "verificationToken" | "studentProgress" | "weekProgress" | "class" | "enrollment" | "quizSession" | "importBatch"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      StudentProgress: {
        payload: Prisma.$StudentProgressPayload<ExtArgs>
        fields: Prisma.StudentProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProgressPayload>
          }
          findFirst: {
            args: Prisma.StudentProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProgressPayload>
          }
          findMany: {
            args: Prisma.StudentProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProgressPayload>[]
          }
          create: {
            args: Prisma.StudentProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProgressPayload>
          }
          createMany: {
            args: Prisma.StudentProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProgressPayload>[]
          }
          delete: {
            args: Prisma.StudentProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProgressPayload>
          }
          update: {
            args: Prisma.StudentProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProgressPayload>
          }
          deleteMany: {
            args: Prisma.StudentProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProgressPayload>[]
          }
          upsert: {
            args: Prisma.StudentProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProgressPayload>
          }
          aggregate: {
            args: Prisma.StudentProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentProgress>
          }
          groupBy: {
            args: Prisma.StudentProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentProgressCountArgs<ExtArgs>
            result: $Utils.Optional<StudentProgressCountAggregateOutputType> | number
          }
        }
      }
      WeekProgress: {
        payload: Prisma.$WeekProgressPayload<ExtArgs>
        fields: Prisma.WeekProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeekProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeekProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekProgressPayload>
          }
          findFirst: {
            args: Prisma.WeekProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeekProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekProgressPayload>
          }
          findMany: {
            args: Prisma.WeekProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekProgressPayload>[]
          }
          create: {
            args: Prisma.WeekProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekProgressPayload>
          }
          createMany: {
            args: Prisma.WeekProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeekProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekProgressPayload>[]
          }
          delete: {
            args: Prisma.WeekProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekProgressPayload>
          }
          update: {
            args: Prisma.WeekProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekProgressPayload>
          }
          deleteMany: {
            args: Prisma.WeekProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeekProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WeekProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekProgressPayload>[]
          }
          upsert: {
            args: Prisma.WeekProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekProgressPayload>
          }
          aggregate: {
            args: Prisma.WeekProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeekProgress>
          }
          groupBy: {
            args: Prisma.WeekProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeekProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeekProgressCountArgs<ExtArgs>
            result: $Utils.Optional<WeekProgressCountAggregateOutputType> | number
          }
        }
      }
      Class: {
        payload: Prisma.$ClassPayload<ExtArgs>
        fields: Prisma.ClassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findFirst: {
            args: Prisma.ClassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findMany: {
            args: Prisma.ClassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          create: {
            args: Prisma.ClassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          createMany: {
            args: Prisma.ClassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          delete: {
            args: Prisma.ClassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          update: {
            args: Prisma.ClassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          deleteMany: {
            args: Prisma.ClassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClassUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          upsert: {
            args: Prisma.ClassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          aggregate: {
            args: Prisma.ClassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClass>
          }
          groupBy: {
            args: Prisma.ClassGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassCountArgs<ExtArgs>
            result: $Utils.Optional<ClassCountAggregateOutputType> | number
          }
        }
      }
      Enrollment: {
        payload: Prisma.$EnrollmentPayload<ExtArgs>
        fields: Prisma.EnrollmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnrollmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnrollmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findFirst: {
            args: Prisma.EnrollmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnrollmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findMany: {
            args: Prisma.EnrollmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          create: {
            args: Prisma.EnrollmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          createMany: {
            args: Prisma.EnrollmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnrollmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          delete: {
            args: Prisma.EnrollmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          update: {
            args: Prisma.EnrollmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          deleteMany: {
            args: Prisma.EnrollmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnrollmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EnrollmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          upsert: {
            args: Prisma.EnrollmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          aggregate: {
            args: Prisma.EnrollmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnrollment>
          }
          groupBy: {
            args: Prisma.EnrollmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnrollmentCountArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentCountAggregateOutputType> | number
          }
        }
      }
      QuizSession: {
        payload: Prisma.$QuizSessionPayload<ExtArgs>
        fields: Prisma.QuizSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>
          }
          findFirst: {
            args: Prisma.QuizSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>
          }
          findMany: {
            args: Prisma.QuizSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>[]
          }
          create: {
            args: Prisma.QuizSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>
          }
          createMany: {
            args: Prisma.QuizSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>[]
          }
          delete: {
            args: Prisma.QuizSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>
          }
          update: {
            args: Prisma.QuizSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>
          }
          deleteMany: {
            args: Prisma.QuizSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuizSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>[]
          }
          upsert: {
            args: Prisma.QuizSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizSessionPayload>
          }
          aggregate: {
            args: Prisma.QuizSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuizSession>
          }
          groupBy: {
            args: Prisma.QuizSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizSessionCountArgs<ExtArgs>
            result: $Utils.Optional<QuizSessionCountAggregateOutputType> | number
          }
        }
      }
      ImportBatch: {
        payload: Prisma.$ImportBatchPayload<ExtArgs>
        fields: Prisma.ImportBatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImportBatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportBatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImportBatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportBatchPayload>
          }
          findFirst: {
            args: Prisma.ImportBatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportBatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImportBatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportBatchPayload>
          }
          findMany: {
            args: Prisma.ImportBatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportBatchPayload>[]
          }
          create: {
            args: Prisma.ImportBatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportBatchPayload>
          }
          createMany: {
            args: Prisma.ImportBatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImportBatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportBatchPayload>[]
          }
          delete: {
            args: Prisma.ImportBatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportBatchPayload>
          }
          update: {
            args: Prisma.ImportBatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportBatchPayload>
          }
          deleteMany: {
            args: Prisma.ImportBatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImportBatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImportBatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportBatchPayload>[]
          }
          upsert: {
            args: Prisma.ImportBatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportBatchPayload>
          }
          aggregate: {
            args: Prisma.ImportBatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImportBatch>
          }
          groupBy: {
            args: Prisma.ImportBatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImportBatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImportBatchCountArgs<ExtArgs>
            result: $Utils.Optional<ImportBatchCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    studentProgress?: StudentProgressOmit
    weekProgress?: WeekProgressOmit
    class?: ClassOmit
    enrollment?: EnrollmentOmit
    quizSession?: QuizSessionOmit
    importBatch?: ImportBatchOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    studentProgress: number
    teacherClasses: number
    accounts: number
    sessions: number
    enrollments: number
    quizSessions: number
    importBatches: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProgress?: boolean | UserCountOutputTypeCountStudentProgressArgs
    teacherClasses?: boolean | UserCountOutputTypeCountTeacherClassesArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    enrollments?: boolean | UserCountOutputTypeCountEnrollmentsArgs
    quizSessions?: boolean | UserCountOutputTypeCountQuizSessionsArgs
    importBatches?: boolean | UserCountOutputTypeCountImportBatchesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStudentProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentProgressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTeacherClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQuizSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountImportBatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImportBatchWhereInput
  }


  /**
   * Count Type StudentProgressCountOutputType
   */

  export type StudentProgressCountOutputType = {
    weekProgress: number
  }

  export type StudentProgressCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    weekProgress?: boolean | StudentProgressCountOutputTypeCountWeekProgressArgs
  }

  // Custom InputTypes
  /**
   * StudentProgressCountOutputType without action
   */
  export type StudentProgressCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgressCountOutputType
     */
    select?: StudentProgressCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentProgressCountOutputType without action
   */
  export type StudentProgressCountOutputTypeCountWeekProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeekProgressWhereInput
  }


  /**
   * Count Type ClassCountOutputType
   */

  export type ClassCountOutputType = {
    enrollments: number
    importBatches: number
  }

  export type ClassCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | ClassCountOutputTypeCountEnrollmentsArgs
    importBatches?: boolean | ClassCountOutputTypeCountImportBatchesArgs
  }

  // Custom InputTypes
  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassCountOutputType
     */
    select?: ClassCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountImportBatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImportBatchWhereInput
  }


  /**
   * Count Type ImportBatchCountOutputType
   */

  export type ImportBatchCountOutputType = {
    enrollments: number
  }

  export type ImportBatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | ImportBatchCountOutputTypeCountEnrollmentsArgs
  }

  // Custom InputTypes
  /**
   * ImportBatchCountOutputType without action
   */
  export type ImportBatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatchCountOutputType
     */
    select?: ImportBatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ImportBatchCountOutputType without action
   */
  export type ImportBatchCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    image: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    image: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    image: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    password: string | null
    image: string | null
    role: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProgress?: boolean | User$studentProgressArgs<ExtArgs>
    teacherClasses?: boolean | User$teacherClassesArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    enrollments?: boolean | User$enrollmentsArgs<ExtArgs>
    quizSessions?: boolean | User$quizSessionsArgs<ExtArgs>
    importBatches?: boolean | User$importBatchesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "image" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProgress?: boolean | User$studentProgressArgs<ExtArgs>
    teacherClasses?: boolean | User$teacherClassesArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    enrollments?: boolean | User$enrollmentsArgs<ExtArgs>
    quizSessions?: boolean | User$quizSessionsArgs<ExtArgs>
    importBatches?: boolean | User$importBatchesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      studentProgress: Prisma.$StudentProgressPayload<ExtArgs>[]
      teacherClasses: Prisma.$ClassPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      quizSessions: Prisma.$QuizSessionPayload<ExtArgs>[]
      importBatches: Prisma.$ImportBatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      password: string | null
      image: string | null
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    studentProgress<T extends User$studentProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$studentProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teacherClasses<T extends User$teacherClassesArgs<ExtArgs> = {}>(args?: Subset<T, User$teacherClassesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    enrollments<T extends User$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quizSessions<T extends User$quizSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$quizSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    importBatches<T extends User$importBatchesArgs<ExtArgs> = {}>(args?: Subset<T, User$importBatchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.studentProgress
   */
  export type User$studentProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgress
     */
    select?: StudentProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProgress
     */
    omit?: StudentProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProgressInclude<ExtArgs> | null
    where?: StudentProgressWhereInput
    orderBy?: StudentProgressOrderByWithRelationInput | StudentProgressOrderByWithRelationInput[]
    cursor?: StudentProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentProgressScalarFieldEnum | StudentProgressScalarFieldEnum[]
  }

  /**
   * User.teacherClasses
   */
  export type User$teacherClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    cursor?: ClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.enrollments
   */
  export type User$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * User.quizSessions
   */
  export type User$quizSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    where?: QuizSessionWhereInput
    orderBy?: QuizSessionOrderByWithRelationInput | QuizSessionOrderByWithRelationInput[]
    cursor?: QuizSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizSessionScalarFieldEnum | QuizSessionScalarFieldEnum[]
  }

  /**
   * User.importBatches
   */
  export type User$importBatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchInclude<ExtArgs> | null
    where?: ImportBatchWhereInput
    orderBy?: ImportBatchOrderByWithRelationInput | ImportBatchOrderByWithRelationInput[]
    cursor?: ImportBatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImportBatchScalarFieldEnum | ImportBatchScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model StudentProgress
   */

  export type AggregateStudentProgress = {
    _count: StudentProgressCountAggregateOutputType | null
    _avg: StudentProgressAvgAggregateOutputType | null
    _sum: StudentProgressSumAggregateOutputType | null
    _min: StudentProgressMinAggregateOutputType | null
    _max: StudentProgressMaxAggregateOutputType | null
  }

  export type StudentProgressAvgAggregateOutputType = {
    totalScore: number | null
    overallProgress: number | null
  }

  export type StudentProgressSumAggregateOutputType = {
    totalScore: number | null
    overallProgress: number | null
  }

  export type StudentProgressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    grade: string | null
    subject: string | null
    difficulty: string | null
    totalScore: number | null
    overallProgress: number | null
    currentPlantStage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    grade: string | null
    subject: string | null
    difficulty: string | null
    totalScore: number | null
    overallProgress: number | null
    currentPlantStage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentProgressCountAggregateOutputType = {
    id: number
    userId: number
    grade: number
    subject: number
    difficulty: number
    totalScore: number
    overallProgress: number
    currentPlantStage: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentProgressAvgAggregateInputType = {
    totalScore?: true
    overallProgress?: true
  }

  export type StudentProgressSumAggregateInputType = {
    totalScore?: true
    overallProgress?: true
  }

  export type StudentProgressMinAggregateInputType = {
    id?: true
    userId?: true
    grade?: true
    subject?: true
    difficulty?: true
    totalScore?: true
    overallProgress?: true
    currentPlantStage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    grade?: true
    subject?: true
    difficulty?: true
    totalScore?: true
    overallProgress?: true
    currentPlantStage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentProgressCountAggregateInputType = {
    id?: true
    userId?: true
    grade?: true
    subject?: true
    difficulty?: true
    totalScore?: true
    overallProgress?: true
    currentPlantStage?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentProgress to aggregate.
     */
    where?: StudentProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentProgresses to fetch.
     */
    orderBy?: StudentProgressOrderByWithRelationInput | StudentProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentProgresses
    **/
    _count?: true | StudentProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentProgressMaxAggregateInputType
  }

  export type GetStudentProgressAggregateType<T extends StudentProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentProgress[P]>
      : GetScalarType<T[P], AggregateStudentProgress[P]>
  }




  export type StudentProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentProgressWhereInput
    orderBy?: StudentProgressOrderByWithAggregationInput | StudentProgressOrderByWithAggregationInput[]
    by: StudentProgressScalarFieldEnum[] | StudentProgressScalarFieldEnum
    having?: StudentProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentProgressCountAggregateInputType | true
    _avg?: StudentProgressAvgAggregateInputType
    _sum?: StudentProgressSumAggregateInputType
    _min?: StudentProgressMinAggregateInputType
    _max?: StudentProgressMaxAggregateInputType
  }

  export type StudentProgressGroupByOutputType = {
    id: string
    userId: string
    grade: string
    subject: string
    difficulty: string
    totalScore: number
    overallProgress: number
    currentPlantStage: string
    createdAt: Date
    updatedAt: Date
    _count: StudentProgressCountAggregateOutputType | null
    _avg: StudentProgressAvgAggregateOutputType | null
    _sum: StudentProgressSumAggregateOutputType | null
    _min: StudentProgressMinAggregateOutputType | null
    _max: StudentProgressMaxAggregateOutputType | null
  }

  type GetStudentProgressGroupByPayload<T extends StudentProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentProgressGroupByOutputType[P]>
            : GetScalarType<T[P], StudentProgressGroupByOutputType[P]>
        }
      >
    >


  export type StudentProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    grade?: boolean
    subject?: boolean
    difficulty?: boolean
    totalScore?: boolean
    overallProgress?: boolean
    currentPlantStage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    weekProgress?: boolean | StudentProgress$weekProgressArgs<ExtArgs>
    _count?: boolean | StudentProgressCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentProgress"]>

  export type StudentProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    grade?: boolean
    subject?: boolean
    difficulty?: boolean
    totalScore?: boolean
    overallProgress?: boolean
    currentPlantStage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentProgress"]>

  export type StudentProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    grade?: boolean
    subject?: boolean
    difficulty?: boolean
    totalScore?: boolean
    overallProgress?: boolean
    currentPlantStage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentProgress"]>

  export type StudentProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    grade?: boolean
    subject?: boolean
    difficulty?: boolean
    totalScore?: boolean
    overallProgress?: boolean
    currentPlantStage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "grade" | "subject" | "difficulty" | "totalScore" | "overallProgress" | "currentPlantStage" | "createdAt" | "updatedAt", ExtArgs["result"]["studentProgress"]>
  export type StudentProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    weekProgress?: boolean | StudentProgress$weekProgressArgs<ExtArgs>
    _count?: boolean | StudentProgressCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StudentProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StudentProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentProgress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      weekProgress: Prisma.$WeekProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      grade: string
      subject: string
      difficulty: string
      totalScore: number
      overallProgress: number
      currentPlantStage: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["studentProgress"]>
    composites: {}
  }

  type StudentProgressGetPayload<S extends boolean | null | undefined | StudentProgressDefaultArgs> = $Result.GetResult<Prisma.$StudentProgressPayload, S>

  type StudentProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentProgressCountAggregateInputType | true
    }

  export interface StudentProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentProgress'], meta: { name: 'StudentProgress' } }
    /**
     * Find zero or one StudentProgress that matches the filter.
     * @param {StudentProgressFindUniqueArgs} args - Arguments to find a StudentProgress
     * @example
     * // Get one StudentProgress
     * const studentProgress = await prisma.studentProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentProgressFindUniqueArgs>(args: SelectSubset<T, StudentProgressFindUniqueArgs<ExtArgs>>): Prisma__StudentProgressClient<$Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StudentProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentProgressFindUniqueOrThrowArgs} args - Arguments to find a StudentProgress
     * @example
     * // Get one StudentProgress
     * const studentProgress = await prisma.studentProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentProgressClient<$Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProgressFindFirstArgs} args - Arguments to find a StudentProgress
     * @example
     * // Get one StudentProgress
     * const studentProgress = await prisma.studentProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentProgressFindFirstArgs>(args?: SelectSubset<T, StudentProgressFindFirstArgs<ExtArgs>>): Prisma__StudentProgressClient<$Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProgressFindFirstOrThrowArgs} args - Arguments to find a StudentProgress
     * @example
     * // Get one StudentProgress
     * const studentProgress = await prisma.studentProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentProgressClient<$Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StudentProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentProgresses
     * const studentProgresses = await prisma.studentProgress.findMany()
     * 
     * // Get first 10 StudentProgresses
     * const studentProgresses = await prisma.studentProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentProgressWithIdOnly = await prisma.studentProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentProgressFindManyArgs>(args?: SelectSubset<T, StudentProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StudentProgress.
     * @param {StudentProgressCreateArgs} args - Arguments to create a StudentProgress.
     * @example
     * // Create one StudentProgress
     * const StudentProgress = await prisma.studentProgress.create({
     *   data: {
     *     // ... data to create a StudentProgress
     *   }
     * })
     * 
     */
    create<T extends StudentProgressCreateArgs>(args: SelectSubset<T, StudentProgressCreateArgs<ExtArgs>>): Prisma__StudentProgressClient<$Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StudentProgresses.
     * @param {StudentProgressCreateManyArgs} args - Arguments to create many StudentProgresses.
     * @example
     * // Create many StudentProgresses
     * const studentProgress = await prisma.studentProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentProgressCreateManyArgs>(args?: SelectSubset<T, StudentProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentProgresses and returns the data saved in the database.
     * @param {StudentProgressCreateManyAndReturnArgs} args - Arguments to create many StudentProgresses.
     * @example
     * // Create many StudentProgresses
     * const studentProgress = await prisma.studentProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentProgresses and only return the `id`
     * const studentProgressWithIdOnly = await prisma.studentProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StudentProgress.
     * @param {StudentProgressDeleteArgs} args - Arguments to delete one StudentProgress.
     * @example
     * // Delete one StudentProgress
     * const StudentProgress = await prisma.studentProgress.delete({
     *   where: {
     *     // ... filter to delete one StudentProgress
     *   }
     * })
     * 
     */
    delete<T extends StudentProgressDeleteArgs>(args: SelectSubset<T, StudentProgressDeleteArgs<ExtArgs>>): Prisma__StudentProgressClient<$Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StudentProgress.
     * @param {StudentProgressUpdateArgs} args - Arguments to update one StudentProgress.
     * @example
     * // Update one StudentProgress
     * const studentProgress = await prisma.studentProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentProgressUpdateArgs>(args: SelectSubset<T, StudentProgressUpdateArgs<ExtArgs>>): Prisma__StudentProgressClient<$Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StudentProgresses.
     * @param {StudentProgressDeleteManyArgs} args - Arguments to filter StudentProgresses to delete.
     * @example
     * // Delete a few StudentProgresses
     * const { count } = await prisma.studentProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentProgressDeleteManyArgs>(args?: SelectSubset<T, StudentProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentProgresses
     * const studentProgress = await prisma.studentProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentProgressUpdateManyArgs>(args: SelectSubset<T, StudentProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentProgresses and returns the data updated in the database.
     * @param {StudentProgressUpdateManyAndReturnArgs} args - Arguments to update many StudentProgresses.
     * @example
     * // Update many StudentProgresses
     * const studentProgress = await prisma.studentProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StudentProgresses and only return the `id`
     * const studentProgressWithIdOnly = await prisma.studentProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StudentProgress.
     * @param {StudentProgressUpsertArgs} args - Arguments to update or create a StudentProgress.
     * @example
     * // Update or create a StudentProgress
     * const studentProgress = await prisma.studentProgress.upsert({
     *   create: {
     *     // ... data to create a StudentProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentProgress we want to update
     *   }
     * })
     */
    upsert<T extends StudentProgressUpsertArgs>(args: SelectSubset<T, StudentProgressUpsertArgs<ExtArgs>>): Prisma__StudentProgressClient<$Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StudentProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProgressCountArgs} args - Arguments to filter StudentProgresses to count.
     * @example
     * // Count the number of StudentProgresses
     * const count = await prisma.studentProgress.count({
     *   where: {
     *     // ... the filter for the StudentProgresses we want to count
     *   }
     * })
    **/
    count<T extends StudentProgressCountArgs>(
      args?: Subset<T, StudentProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentProgressAggregateArgs>(args: Subset<T, StudentProgressAggregateArgs>): Prisma.PrismaPromise<GetStudentProgressAggregateType<T>>

    /**
     * Group by StudentProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentProgressGroupByArgs['orderBy'] }
        : { orderBy?: StudentProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentProgress model
   */
  readonly fields: StudentProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    weekProgress<T extends StudentProgress$weekProgressArgs<ExtArgs> = {}>(args?: Subset<T, StudentProgress$weekProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeekProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudentProgress model
   */
  interface StudentProgressFieldRefs {
    readonly id: FieldRef<"StudentProgress", 'String'>
    readonly userId: FieldRef<"StudentProgress", 'String'>
    readonly grade: FieldRef<"StudentProgress", 'String'>
    readonly subject: FieldRef<"StudentProgress", 'String'>
    readonly difficulty: FieldRef<"StudentProgress", 'String'>
    readonly totalScore: FieldRef<"StudentProgress", 'Int'>
    readonly overallProgress: FieldRef<"StudentProgress", 'Float'>
    readonly currentPlantStage: FieldRef<"StudentProgress", 'String'>
    readonly createdAt: FieldRef<"StudentProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"StudentProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StudentProgress findUnique
   */
  export type StudentProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgress
     */
    select?: StudentProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProgress
     */
    omit?: StudentProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProgressInclude<ExtArgs> | null
    /**
     * Filter, which StudentProgress to fetch.
     */
    where: StudentProgressWhereUniqueInput
  }

  /**
   * StudentProgress findUniqueOrThrow
   */
  export type StudentProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgress
     */
    select?: StudentProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProgress
     */
    omit?: StudentProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProgressInclude<ExtArgs> | null
    /**
     * Filter, which StudentProgress to fetch.
     */
    where: StudentProgressWhereUniqueInput
  }

  /**
   * StudentProgress findFirst
   */
  export type StudentProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgress
     */
    select?: StudentProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProgress
     */
    omit?: StudentProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProgressInclude<ExtArgs> | null
    /**
     * Filter, which StudentProgress to fetch.
     */
    where?: StudentProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentProgresses to fetch.
     */
    orderBy?: StudentProgressOrderByWithRelationInput | StudentProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentProgresses.
     */
    cursor?: StudentProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentProgresses.
     */
    distinct?: StudentProgressScalarFieldEnum | StudentProgressScalarFieldEnum[]
  }

  /**
   * StudentProgress findFirstOrThrow
   */
  export type StudentProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgress
     */
    select?: StudentProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProgress
     */
    omit?: StudentProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProgressInclude<ExtArgs> | null
    /**
     * Filter, which StudentProgress to fetch.
     */
    where?: StudentProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentProgresses to fetch.
     */
    orderBy?: StudentProgressOrderByWithRelationInput | StudentProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentProgresses.
     */
    cursor?: StudentProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentProgresses.
     */
    distinct?: StudentProgressScalarFieldEnum | StudentProgressScalarFieldEnum[]
  }

  /**
   * StudentProgress findMany
   */
  export type StudentProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgress
     */
    select?: StudentProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProgress
     */
    omit?: StudentProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProgressInclude<ExtArgs> | null
    /**
     * Filter, which StudentProgresses to fetch.
     */
    where?: StudentProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentProgresses to fetch.
     */
    orderBy?: StudentProgressOrderByWithRelationInput | StudentProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentProgresses.
     */
    cursor?: StudentProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentProgresses.
     */
    skip?: number
    distinct?: StudentProgressScalarFieldEnum | StudentProgressScalarFieldEnum[]
  }

  /**
   * StudentProgress create
   */
  export type StudentProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgress
     */
    select?: StudentProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProgress
     */
    omit?: StudentProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentProgress.
     */
    data: XOR<StudentProgressCreateInput, StudentProgressUncheckedCreateInput>
  }

  /**
   * StudentProgress createMany
   */
  export type StudentProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentProgresses.
     */
    data: StudentProgressCreateManyInput | StudentProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudentProgress createManyAndReturn
   */
  export type StudentProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgress
     */
    select?: StudentProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProgress
     */
    omit?: StudentProgressOmit<ExtArgs> | null
    /**
     * The data used to create many StudentProgresses.
     */
    data: StudentProgressCreateManyInput | StudentProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentProgress update
   */
  export type StudentProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgress
     */
    select?: StudentProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProgress
     */
    omit?: StudentProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentProgress.
     */
    data: XOR<StudentProgressUpdateInput, StudentProgressUncheckedUpdateInput>
    /**
     * Choose, which StudentProgress to update.
     */
    where: StudentProgressWhereUniqueInput
  }

  /**
   * StudentProgress updateMany
   */
  export type StudentProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentProgresses.
     */
    data: XOR<StudentProgressUpdateManyMutationInput, StudentProgressUncheckedUpdateManyInput>
    /**
     * Filter which StudentProgresses to update
     */
    where?: StudentProgressWhereInput
    /**
     * Limit how many StudentProgresses to update.
     */
    limit?: number
  }

  /**
   * StudentProgress updateManyAndReturn
   */
  export type StudentProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgress
     */
    select?: StudentProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProgress
     */
    omit?: StudentProgressOmit<ExtArgs> | null
    /**
     * The data used to update StudentProgresses.
     */
    data: XOR<StudentProgressUpdateManyMutationInput, StudentProgressUncheckedUpdateManyInput>
    /**
     * Filter which StudentProgresses to update
     */
    where?: StudentProgressWhereInput
    /**
     * Limit how many StudentProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentProgress upsert
   */
  export type StudentProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgress
     */
    select?: StudentProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProgress
     */
    omit?: StudentProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentProgress to update in case it exists.
     */
    where: StudentProgressWhereUniqueInput
    /**
     * In case the StudentProgress found by the `where` argument doesn't exist, create a new StudentProgress with this data.
     */
    create: XOR<StudentProgressCreateInput, StudentProgressUncheckedCreateInput>
    /**
     * In case the StudentProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentProgressUpdateInput, StudentProgressUncheckedUpdateInput>
  }

  /**
   * StudentProgress delete
   */
  export type StudentProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgress
     */
    select?: StudentProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProgress
     */
    omit?: StudentProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProgressInclude<ExtArgs> | null
    /**
     * Filter which StudentProgress to delete.
     */
    where: StudentProgressWhereUniqueInput
  }

  /**
   * StudentProgress deleteMany
   */
  export type StudentProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentProgresses to delete
     */
    where?: StudentProgressWhereInput
    /**
     * Limit how many StudentProgresses to delete.
     */
    limit?: number
  }

  /**
   * StudentProgress.weekProgress
   */
  export type StudentProgress$weekProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekProgress
     */
    select?: WeekProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekProgress
     */
    omit?: WeekProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekProgressInclude<ExtArgs> | null
    where?: WeekProgressWhereInput
    orderBy?: WeekProgressOrderByWithRelationInput | WeekProgressOrderByWithRelationInput[]
    cursor?: WeekProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeekProgressScalarFieldEnum | WeekProgressScalarFieldEnum[]
  }

  /**
   * StudentProgress without action
   */
  export type StudentProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProgress
     */
    select?: StudentProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProgress
     */
    omit?: StudentProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProgressInclude<ExtArgs> | null
  }


  /**
   * Model WeekProgress
   */

  export type AggregateWeekProgress = {
    _count: WeekProgressCountAggregateOutputType | null
    _avg: WeekProgressAvgAggregateOutputType | null
    _sum: WeekProgressSumAggregateOutputType | null
    _min: WeekProgressMinAggregateOutputType | null
    _max: WeekProgressMaxAggregateOutputType | null
  }

  export type WeekProgressAvgAggregateOutputType = {
    weekId: number | null
    score: number | null
    questionsCorrect: number | null
    questionsTotal: number | null
    readingCompCorrect: number | null
    readingCompTotal: number | null
  }

  export type WeekProgressSumAggregateOutputType = {
    weekId: number | null
    score: number | null
    questionsCorrect: number | null
    questionsTotal: number | null
    readingCompCorrect: number | null
    readingCompTotal: number | null
  }

  export type WeekProgressMinAggregateOutputType = {
    id: string | null
    studentProgressId: string | null
    weekId: number | null
    completed: boolean | null
    locked: boolean | null
    score: number | null
    questionsCorrect: number | null
    questionsTotal: number | null
    readingCompCorrect: number | null
    readingCompTotal: number | null
    keywordsMastered: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeekProgressMaxAggregateOutputType = {
    id: string | null
    studentProgressId: string | null
    weekId: number | null
    completed: boolean | null
    locked: boolean | null
    score: number | null
    questionsCorrect: number | null
    questionsTotal: number | null
    readingCompCorrect: number | null
    readingCompTotal: number | null
    keywordsMastered: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeekProgressCountAggregateOutputType = {
    id: number
    studentProgressId: number
    weekId: number
    completed: number
    locked: number
    score: number
    questionsCorrect: number
    questionsTotal: number
    readingCompCorrect: number
    readingCompTotal: number
    keywordsMastered: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WeekProgressAvgAggregateInputType = {
    weekId?: true
    score?: true
    questionsCorrect?: true
    questionsTotal?: true
    readingCompCorrect?: true
    readingCompTotal?: true
  }

  export type WeekProgressSumAggregateInputType = {
    weekId?: true
    score?: true
    questionsCorrect?: true
    questionsTotal?: true
    readingCompCorrect?: true
    readingCompTotal?: true
  }

  export type WeekProgressMinAggregateInputType = {
    id?: true
    studentProgressId?: true
    weekId?: true
    completed?: true
    locked?: true
    score?: true
    questionsCorrect?: true
    questionsTotal?: true
    readingCompCorrect?: true
    readingCompTotal?: true
    keywordsMastered?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeekProgressMaxAggregateInputType = {
    id?: true
    studentProgressId?: true
    weekId?: true
    completed?: true
    locked?: true
    score?: true
    questionsCorrect?: true
    questionsTotal?: true
    readingCompCorrect?: true
    readingCompTotal?: true
    keywordsMastered?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeekProgressCountAggregateInputType = {
    id?: true
    studentProgressId?: true
    weekId?: true
    completed?: true
    locked?: true
    score?: true
    questionsCorrect?: true
    questionsTotal?: true
    readingCompCorrect?: true
    readingCompTotal?: true
    keywordsMastered?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WeekProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeekProgress to aggregate.
     */
    where?: WeekProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeekProgresses to fetch.
     */
    orderBy?: WeekProgressOrderByWithRelationInput | WeekProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeekProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeekProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeekProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeekProgresses
    **/
    _count?: true | WeekProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WeekProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WeekProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeekProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeekProgressMaxAggregateInputType
  }

  export type GetWeekProgressAggregateType<T extends WeekProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateWeekProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeekProgress[P]>
      : GetScalarType<T[P], AggregateWeekProgress[P]>
  }




  export type WeekProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeekProgressWhereInput
    orderBy?: WeekProgressOrderByWithAggregationInput | WeekProgressOrderByWithAggregationInput[]
    by: WeekProgressScalarFieldEnum[] | WeekProgressScalarFieldEnum
    having?: WeekProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeekProgressCountAggregateInputType | true
    _avg?: WeekProgressAvgAggregateInputType
    _sum?: WeekProgressSumAggregateInputType
    _min?: WeekProgressMinAggregateInputType
    _max?: WeekProgressMaxAggregateInputType
  }

  export type WeekProgressGroupByOutputType = {
    id: string
    studentProgressId: string
    weekId: number
    completed: boolean
    locked: boolean
    score: number
    questionsCorrect: number
    questionsTotal: number
    readingCompCorrect: number
    readingCompTotal: number
    keywordsMastered: string
    createdAt: Date
    updatedAt: Date
    _count: WeekProgressCountAggregateOutputType | null
    _avg: WeekProgressAvgAggregateOutputType | null
    _sum: WeekProgressSumAggregateOutputType | null
    _min: WeekProgressMinAggregateOutputType | null
    _max: WeekProgressMaxAggregateOutputType | null
  }

  type GetWeekProgressGroupByPayload<T extends WeekProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeekProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeekProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeekProgressGroupByOutputType[P]>
            : GetScalarType<T[P], WeekProgressGroupByOutputType[P]>
        }
      >
    >


  export type WeekProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProgressId?: boolean
    weekId?: boolean
    completed?: boolean
    locked?: boolean
    score?: boolean
    questionsCorrect?: boolean
    questionsTotal?: boolean
    readingCompCorrect?: boolean
    readingCompTotal?: boolean
    keywordsMastered?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProgress?: boolean | StudentProgressDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weekProgress"]>

  export type WeekProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProgressId?: boolean
    weekId?: boolean
    completed?: boolean
    locked?: boolean
    score?: boolean
    questionsCorrect?: boolean
    questionsTotal?: boolean
    readingCompCorrect?: boolean
    readingCompTotal?: boolean
    keywordsMastered?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProgress?: boolean | StudentProgressDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weekProgress"]>

  export type WeekProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentProgressId?: boolean
    weekId?: boolean
    completed?: boolean
    locked?: boolean
    score?: boolean
    questionsCorrect?: boolean
    questionsTotal?: boolean
    readingCompCorrect?: boolean
    readingCompTotal?: boolean
    keywordsMastered?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentProgress?: boolean | StudentProgressDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weekProgress"]>

  export type WeekProgressSelectScalar = {
    id?: boolean
    studentProgressId?: boolean
    weekId?: boolean
    completed?: boolean
    locked?: boolean
    score?: boolean
    questionsCorrect?: boolean
    questionsTotal?: boolean
    readingCompCorrect?: boolean
    readingCompTotal?: boolean
    keywordsMastered?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WeekProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentProgressId" | "weekId" | "completed" | "locked" | "score" | "questionsCorrect" | "questionsTotal" | "readingCompCorrect" | "readingCompTotal" | "keywordsMastered" | "createdAt" | "updatedAt", ExtArgs["result"]["weekProgress"]>
  export type WeekProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProgress?: boolean | StudentProgressDefaultArgs<ExtArgs>
  }
  export type WeekProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProgress?: boolean | StudentProgressDefaultArgs<ExtArgs>
  }
  export type WeekProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentProgress?: boolean | StudentProgressDefaultArgs<ExtArgs>
  }

  export type $WeekProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeekProgress"
    objects: {
      studentProgress: Prisma.$StudentProgressPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentProgressId: string
      weekId: number
      completed: boolean
      locked: boolean
      score: number
      questionsCorrect: number
      questionsTotal: number
      readingCompCorrect: number
      readingCompTotal: number
      keywordsMastered: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["weekProgress"]>
    composites: {}
  }

  type WeekProgressGetPayload<S extends boolean | null | undefined | WeekProgressDefaultArgs> = $Result.GetResult<Prisma.$WeekProgressPayload, S>

  type WeekProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeekProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeekProgressCountAggregateInputType | true
    }

  export interface WeekProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeekProgress'], meta: { name: 'WeekProgress' } }
    /**
     * Find zero or one WeekProgress that matches the filter.
     * @param {WeekProgressFindUniqueArgs} args - Arguments to find a WeekProgress
     * @example
     * // Get one WeekProgress
     * const weekProgress = await prisma.weekProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeekProgressFindUniqueArgs>(args: SelectSubset<T, WeekProgressFindUniqueArgs<ExtArgs>>): Prisma__WeekProgressClient<$Result.GetResult<Prisma.$WeekProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WeekProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeekProgressFindUniqueOrThrowArgs} args - Arguments to find a WeekProgress
     * @example
     * // Get one WeekProgress
     * const weekProgress = await prisma.weekProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeekProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, WeekProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeekProgressClient<$Result.GetResult<Prisma.$WeekProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeekProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekProgressFindFirstArgs} args - Arguments to find a WeekProgress
     * @example
     * // Get one WeekProgress
     * const weekProgress = await prisma.weekProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeekProgressFindFirstArgs>(args?: SelectSubset<T, WeekProgressFindFirstArgs<ExtArgs>>): Prisma__WeekProgressClient<$Result.GetResult<Prisma.$WeekProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeekProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekProgressFindFirstOrThrowArgs} args - Arguments to find a WeekProgress
     * @example
     * // Get one WeekProgress
     * const weekProgress = await prisma.weekProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeekProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, WeekProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeekProgressClient<$Result.GetResult<Prisma.$WeekProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WeekProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeekProgresses
     * const weekProgresses = await prisma.weekProgress.findMany()
     * 
     * // Get first 10 WeekProgresses
     * const weekProgresses = await prisma.weekProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weekProgressWithIdOnly = await prisma.weekProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeekProgressFindManyArgs>(args?: SelectSubset<T, WeekProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeekProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WeekProgress.
     * @param {WeekProgressCreateArgs} args - Arguments to create a WeekProgress.
     * @example
     * // Create one WeekProgress
     * const WeekProgress = await prisma.weekProgress.create({
     *   data: {
     *     // ... data to create a WeekProgress
     *   }
     * })
     * 
     */
    create<T extends WeekProgressCreateArgs>(args: SelectSubset<T, WeekProgressCreateArgs<ExtArgs>>): Prisma__WeekProgressClient<$Result.GetResult<Prisma.$WeekProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WeekProgresses.
     * @param {WeekProgressCreateManyArgs} args - Arguments to create many WeekProgresses.
     * @example
     * // Create many WeekProgresses
     * const weekProgress = await prisma.weekProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeekProgressCreateManyArgs>(args?: SelectSubset<T, WeekProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeekProgresses and returns the data saved in the database.
     * @param {WeekProgressCreateManyAndReturnArgs} args - Arguments to create many WeekProgresses.
     * @example
     * // Create many WeekProgresses
     * const weekProgress = await prisma.weekProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeekProgresses and only return the `id`
     * const weekProgressWithIdOnly = await prisma.weekProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeekProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, WeekProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeekProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WeekProgress.
     * @param {WeekProgressDeleteArgs} args - Arguments to delete one WeekProgress.
     * @example
     * // Delete one WeekProgress
     * const WeekProgress = await prisma.weekProgress.delete({
     *   where: {
     *     // ... filter to delete one WeekProgress
     *   }
     * })
     * 
     */
    delete<T extends WeekProgressDeleteArgs>(args: SelectSubset<T, WeekProgressDeleteArgs<ExtArgs>>): Prisma__WeekProgressClient<$Result.GetResult<Prisma.$WeekProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WeekProgress.
     * @param {WeekProgressUpdateArgs} args - Arguments to update one WeekProgress.
     * @example
     * // Update one WeekProgress
     * const weekProgress = await prisma.weekProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeekProgressUpdateArgs>(args: SelectSubset<T, WeekProgressUpdateArgs<ExtArgs>>): Prisma__WeekProgressClient<$Result.GetResult<Prisma.$WeekProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WeekProgresses.
     * @param {WeekProgressDeleteManyArgs} args - Arguments to filter WeekProgresses to delete.
     * @example
     * // Delete a few WeekProgresses
     * const { count } = await prisma.weekProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeekProgressDeleteManyArgs>(args?: SelectSubset<T, WeekProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeekProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeekProgresses
     * const weekProgress = await prisma.weekProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeekProgressUpdateManyArgs>(args: SelectSubset<T, WeekProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeekProgresses and returns the data updated in the database.
     * @param {WeekProgressUpdateManyAndReturnArgs} args - Arguments to update many WeekProgresses.
     * @example
     * // Update many WeekProgresses
     * const weekProgress = await prisma.weekProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WeekProgresses and only return the `id`
     * const weekProgressWithIdOnly = await prisma.weekProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WeekProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, WeekProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeekProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WeekProgress.
     * @param {WeekProgressUpsertArgs} args - Arguments to update or create a WeekProgress.
     * @example
     * // Update or create a WeekProgress
     * const weekProgress = await prisma.weekProgress.upsert({
     *   create: {
     *     // ... data to create a WeekProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeekProgress we want to update
     *   }
     * })
     */
    upsert<T extends WeekProgressUpsertArgs>(args: SelectSubset<T, WeekProgressUpsertArgs<ExtArgs>>): Prisma__WeekProgressClient<$Result.GetResult<Prisma.$WeekProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WeekProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekProgressCountArgs} args - Arguments to filter WeekProgresses to count.
     * @example
     * // Count the number of WeekProgresses
     * const count = await prisma.weekProgress.count({
     *   where: {
     *     // ... the filter for the WeekProgresses we want to count
     *   }
     * })
    **/
    count<T extends WeekProgressCountArgs>(
      args?: Subset<T, WeekProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeekProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeekProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WeekProgressAggregateArgs>(args: Subset<T, WeekProgressAggregateArgs>): Prisma.PrismaPromise<GetWeekProgressAggregateType<T>>

    /**
     * Group by WeekProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WeekProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeekProgressGroupByArgs['orderBy'] }
        : { orderBy?: WeekProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WeekProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeekProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeekProgress model
   */
  readonly fields: WeekProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeekProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeekProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    studentProgress<T extends StudentProgressDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentProgressDefaultArgs<ExtArgs>>): Prisma__StudentProgressClient<$Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WeekProgress model
   */
  interface WeekProgressFieldRefs {
    readonly id: FieldRef<"WeekProgress", 'String'>
    readonly studentProgressId: FieldRef<"WeekProgress", 'String'>
    readonly weekId: FieldRef<"WeekProgress", 'Int'>
    readonly completed: FieldRef<"WeekProgress", 'Boolean'>
    readonly locked: FieldRef<"WeekProgress", 'Boolean'>
    readonly score: FieldRef<"WeekProgress", 'Int'>
    readonly questionsCorrect: FieldRef<"WeekProgress", 'Int'>
    readonly questionsTotal: FieldRef<"WeekProgress", 'Int'>
    readonly readingCompCorrect: FieldRef<"WeekProgress", 'Int'>
    readonly readingCompTotal: FieldRef<"WeekProgress", 'Int'>
    readonly keywordsMastered: FieldRef<"WeekProgress", 'String'>
    readonly createdAt: FieldRef<"WeekProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"WeekProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WeekProgress findUnique
   */
  export type WeekProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekProgress
     */
    select?: WeekProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekProgress
     */
    omit?: WeekProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekProgressInclude<ExtArgs> | null
    /**
     * Filter, which WeekProgress to fetch.
     */
    where: WeekProgressWhereUniqueInput
  }

  /**
   * WeekProgress findUniqueOrThrow
   */
  export type WeekProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekProgress
     */
    select?: WeekProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekProgress
     */
    omit?: WeekProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekProgressInclude<ExtArgs> | null
    /**
     * Filter, which WeekProgress to fetch.
     */
    where: WeekProgressWhereUniqueInput
  }

  /**
   * WeekProgress findFirst
   */
  export type WeekProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekProgress
     */
    select?: WeekProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekProgress
     */
    omit?: WeekProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekProgressInclude<ExtArgs> | null
    /**
     * Filter, which WeekProgress to fetch.
     */
    where?: WeekProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeekProgresses to fetch.
     */
    orderBy?: WeekProgressOrderByWithRelationInput | WeekProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeekProgresses.
     */
    cursor?: WeekProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeekProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeekProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeekProgresses.
     */
    distinct?: WeekProgressScalarFieldEnum | WeekProgressScalarFieldEnum[]
  }

  /**
   * WeekProgress findFirstOrThrow
   */
  export type WeekProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekProgress
     */
    select?: WeekProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekProgress
     */
    omit?: WeekProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekProgressInclude<ExtArgs> | null
    /**
     * Filter, which WeekProgress to fetch.
     */
    where?: WeekProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeekProgresses to fetch.
     */
    orderBy?: WeekProgressOrderByWithRelationInput | WeekProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeekProgresses.
     */
    cursor?: WeekProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeekProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeekProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeekProgresses.
     */
    distinct?: WeekProgressScalarFieldEnum | WeekProgressScalarFieldEnum[]
  }

  /**
   * WeekProgress findMany
   */
  export type WeekProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekProgress
     */
    select?: WeekProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekProgress
     */
    omit?: WeekProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekProgressInclude<ExtArgs> | null
    /**
     * Filter, which WeekProgresses to fetch.
     */
    where?: WeekProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeekProgresses to fetch.
     */
    orderBy?: WeekProgressOrderByWithRelationInput | WeekProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeekProgresses.
     */
    cursor?: WeekProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeekProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeekProgresses.
     */
    skip?: number
    distinct?: WeekProgressScalarFieldEnum | WeekProgressScalarFieldEnum[]
  }

  /**
   * WeekProgress create
   */
  export type WeekProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekProgress
     */
    select?: WeekProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekProgress
     */
    omit?: WeekProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a WeekProgress.
     */
    data: XOR<WeekProgressCreateInput, WeekProgressUncheckedCreateInput>
  }

  /**
   * WeekProgress createMany
   */
  export type WeekProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeekProgresses.
     */
    data: WeekProgressCreateManyInput | WeekProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeekProgress createManyAndReturn
   */
  export type WeekProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekProgress
     */
    select?: WeekProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeekProgress
     */
    omit?: WeekProgressOmit<ExtArgs> | null
    /**
     * The data used to create many WeekProgresses.
     */
    data: WeekProgressCreateManyInput | WeekProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeekProgress update
   */
  export type WeekProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekProgress
     */
    select?: WeekProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekProgress
     */
    omit?: WeekProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a WeekProgress.
     */
    data: XOR<WeekProgressUpdateInput, WeekProgressUncheckedUpdateInput>
    /**
     * Choose, which WeekProgress to update.
     */
    where: WeekProgressWhereUniqueInput
  }

  /**
   * WeekProgress updateMany
   */
  export type WeekProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeekProgresses.
     */
    data: XOR<WeekProgressUpdateManyMutationInput, WeekProgressUncheckedUpdateManyInput>
    /**
     * Filter which WeekProgresses to update
     */
    where?: WeekProgressWhereInput
    /**
     * Limit how many WeekProgresses to update.
     */
    limit?: number
  }

  /**
   * WeekProgress updateManyAndReturn
   */
  export type WeekProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekProgress
     */
    select?: WeekProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeekProgress
     */
    omit?: WeekProgressOmit<ExtArgs> | null
    /**
     * The data used to update WeekProgresses.
     */
    data: XOR<WeekProgressUpdateManyMutationInput, WeekProgressUncheckedUpdateManyInput>
    /**
     * Filter which WeekProgresses to update
     */
    where?: WeekProgressWhereInput
    /**
     * Limit how many WeekProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeekProgress upsert
   */
  export type WeekProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekProgress
     */
    select?: WeekProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekProgress
     */
    omit?: WeekProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the WeekProgress to update in case it exists.
     */
    where: WeekProgressWhereUniqueInput
    /**
     * In case the WeekProgress found by the `where` argument doesn't exist, create a new WeekProgress with this data.
     */
    create: XOR<WeekProgressCreateInput, WeekProgressUncheckedCreateInput>
    /**
     * In case the WeekProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeekProgressUpdateInput, WeekProgressUncheckedUpdateInput>
  }

  /**
   * WeekProgress delete
   */
  export type WeekProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekProgress
     */
    select?: WeekProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekProgress
     */
    omit?: WeekProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekProgressInclude<ExtArgs> | null
    /**
     * Filter which WeekProgress to delete.
     */
    where: WeekProgressWhereUniqueInput
  }

  /**
   * WeekProgress deleteMany
   */
  export type WeekProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeekProgresses to delete
     */
    where?: WeekProgressWhereInput
    /**
     * Limit how many WeekProgresses to delete.
     */
    limit?: number
  }

  /**
   * WeekProgress without action
   */
  export type WeekProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekProgress
     */
    select?: WeekProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekProgress
     */
    omit?: WeekProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekProgressInclude<ExtArgs> | null
  }


  /**
   * Model Class
   */

  export type AggregateClass = {
    _count: ClassCountAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  export type ClassMinAggregateOutputType = {
    id: string | null
    name: string | null
    teacherId: string | null
    grade: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClassMaxAggregateOutputType = {
    id: string | null
    name: string | null
    teacherId: string | null
    grade: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClassCountAggregateOutputType = {
    id: number
    name: number
    teacherId: number
    grade: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClassMinAggregateInputType = {
    id?: true
    name?: true
    teacherId?: true
    grade?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClassMaxAggregateInputType = {
    id?: true
    name?: true
    teacherId?: true
    grade?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClassCountAggregateInputType = {
    id?: true
    name?: true
    teacherId?: true
    grade?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class to aggregate.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classes
    **/
    _count?: true | ClassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassMaxAggregateInputType
  }

  export type GetClassAggregateType<T extends ClassAggregateArgs> = {
        [P in keyof T & keyof AggregateClass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClass[P]>
      : GetScalarType<T[P], AggregateClass[P]>
  }




  export type ClassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithAggregationInput | ClassOrderByWithAggregationInput[]
    by: ClassScalarFieldEnum[] | ClassScalarFieldEnum
    having?: ClassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassCountAggregateInputType | true
    _min?: ClassMinAggregateInputType
    _max?: ClassMaxAggregateInputType
  }

  export type ClassGroupByOutputType = {
    id: string
    name: string
    teacherId: string
    grade: string
    createdAt: Date
    updatedAt: Date
    _count: ClassCountAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  type GetClassGroupByPayload<T extends ClassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassGroupByOutputType[P]>
            : GetScalarType<T[P], ClassGroupByOutputType[P]>
        }
      >
    >


  export type ClassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    teacherId?: boolean
    grade?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    enrollments?: boolean | Class$enrollmentsArgs<ExtArgs>
    importBatches?: boolean | Class$importBatchesArgs<ExtArgs>
    _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    teacherId?: boolean
    grade?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    teacherId?: boolean
    grade?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectScalar = {
    id?: boolean
    name?: boolean
    teacherId?: boolean
    grade?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "teacherId" | "grade" | "createdAt" | "updatedAt", ExtArgs["result"]["class"]>
  export type ClassInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    enrollments?: boolean | Class$enrollmentsArgs<ExtArgs>
    importBatches?: boolean | Class$importBatchesArgs<ExtArgs>
    _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClassIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClassIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Class"
    objects: {
      teacher: Prisma.$UserPayload<ExtArgs>
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      importBatches: Prisma.$ImportBatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      teacherId: string
      grade: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["class"]>
    composites: {}
  }

  type ClassGetPayload<S extends boolean | null | undefined | ClassDefaultArgs> = $Result.GetResult<Prisma.$ClassPayload, S>

  type ClassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClassCountAggregateInputType | true
    }

  export interface ClassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Class'], meta: { name: 'Class' } }
    /**
     * Find zero or one Class that matches the filter.
     * @param {ClassFindUniqueArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassFindUniqueArgs>(args: SelectSubset<T, ClassFindUniqueArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Class that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClassFindUniqueOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassFindFirstArgs>(args?: SelectSubset<T, ClassFindFirstArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Classes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classes
     * const classes = await prisma.class.findMany()
     * 
     * // Get first 10 Classes
     * const classes = await prisma.class.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classWithIdOnly = await prisma.class.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassFindManyArgs>(args?: SelectSubset<T, ClassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Class.
     * @param {ClassCreateArgs} args - Arguments to create a Class.
     * @example
     * // Create one Class
     * const Class = await prisma.class.create({
     *   data: {
     *     // ... data to create a Class
     *   }
     * })
     * 
     */
    create<T extends ClassCreateArgs>(args: SelectSubset<T, ClassCreateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Classes.
     * @param {ClassCreateManyArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassCreateManyArgs>(args?: SelectSubset<T, ClassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classes and returns the data saved in the database.
     * @param {ClassCreateManyAndReturnArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classes and only return the `id`
     * const classWithIdOnly = await prisma.class.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Class.
     * @param {ClassDeleteArgs} args - Arguments to delete one Class.
     * @example
     * // Delete one Class
     * const Class = await prisma.class.delete({
     *   where: {
     *     // ... filter to delete one Class
     *   }
     * })
     * 
     */
    delete<T extends ClassDeleteArgs>(args: SelectSubset<T, ClassDeleteArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Class.
     * @param {ClassUpdateArgs} args - Arguments to update one Class.
     * @example
     * // Update one Class
     * const class = await prisma.class.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassUpdateArgs>(args: SelectSubset<T, ClassUpdateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Classes.
     * @param {ClassDeleteManyArgs} args - Arguments to filter Classes to delete.
     * @example
     * // Delete a few Classes
     * const { count } = await prisma.class.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassDeleteManyArgs>(args?: SelectSubset<T, ClassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassUpdateManyArgs>(args: SelectSubset<T, ClassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes and returns the data updated in the database.
     * @param {ClassUpdateManyAndReturnArgs} args - Arguments to update many Classes.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Classes and only return the `id`
     * const classWithIdOnly = await prisma.class.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClassUpdateManyAndReturnArgs>(args: SelectSubset<T, ClassUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Class.
     * @param {ClassUpsertArgs} args - Arguments to update or create a Class.
     * @example
     * // Update or create a Class
     * const class = await prisma.class.upsert({
     *   create: {
     *     // ... data to create a Class
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Class we want to update
     *   }
     * })
     */
    upsert<T extends ClassUpsertArgs>(args: SelectSubset<T, ClassUpsertArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassCountArgs} args - Arguments to filter Classes to count.
     * @example
     * // Count the number of Classes
     * const count = await prisma.class.count({
     *   where: {
     *     // ... the filter for the Classes we want to count
     *   }
     * })
    **/
    count<T extends ClassCountArgs>(
      args?: Subset<T, ClassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassAggregateArgs>(args: Subset<T, ClassAggregateArgs>): Prisma.PrismaPromise<GetClassAggregateType<T>>

    /**
     * Group by Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassGroupByArgs['orderBy'] }
        : { orderBy?: ClassGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Class model
   */
  readonly fields: ClassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Class.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    enrollments<T extends Class$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Class$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    importBatches<T extends Class$importBatchesArgs<ExtArgs> = {}>(args?: Subset<T, Class$importBatchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Class model
   */
  interface ClassFieldRefs {
    readonly id: FieldRef<"Class", 'String'>
    readonly name: FieldRef<"Class", 'String'>
    readonly teacherId: FieldRef<"Class", 'String'>
    readonly grade: FieldRef<"Class", 'String'>
    readonly createdAt: FieldRef<"Class", 'DateTime'>
    readonly updatedAt: FieldRef<"Class", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Class findUnique
   */
  export type ClassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findUniqueOrThrow
   */
  export type ClassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findFirst
   */
  export type ClassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findFirstOrThrow
   */
  export type ClassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findMany
   */
  export type ClassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Classes to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class create
   */
  export type ClassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to create a Class.
     */
    data: XOR<ClassCreateInput, ClassUncheckedCreateInput>
  }

  /**
   * Class createMany
   */
  export type ClassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class createManyAndReturn
   */
  export type ClassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Class update
   */
  export type ClassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to update a Class.
     */
    data: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
    /**
     * Choose, which Class to update.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class updateMany
   */
  export type ClassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to update.
     */
    limit?: number
  }

  /**
   * Class updateManyAndReturn
   */
  export type ClassUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Class upsert
   */
  export type ClassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The filter to search for the Class to update in case it exists.
     */
    where: ClassWhereUniqueInput
    /**
     * In case the Class found by the `where` argument doesn't exist, create a new Class with this data.
     */
    create: XOR<ClassCreateInput, ClassUncheckedCreateInput>
    /**
     * In case the Class was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
  }

  /**
   * Class delete
   */
  export type ClassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter which Class to delete.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class deleteMany
   */
  export type ClassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classes to delete
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to delete.
     */
    limit?: number
  }

  /**
   * Class.enrollments
   */
  export type Class$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Class.importBatches
   */
  export type Class$importBatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchInclude<ExtArgs> | null
    where?: ImportBatchWhereInput
    orderBy?: ImportBatchOrderByWithRelationInput | ImportBatchOrderByWithRelationInput[]
    cursor?: ImportBatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImportBatchScalarFieldEnum | ImportBatchScalarFieldEnum[]
  }

  /**
   * Class without action
   */
  export type ClassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
  }


  /**
   * Model Enrollment
   */

  export type AggregateEnrollment = {
    _count: EnrollmentCountAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  export type EnrollmentMinAggregateOutputType = {
    id: string | null
    classId: string | null
    studentId: string | null
    enrolledAt: Date | null
    parentEmail: string | null
    parentPhone: string | null
    importBatchId: string | null
    comments: string | null
  }

  export type EnrollmentMaxAggregateOutputType = {
    id: string | null
    classId: string | null
    studentId: string | null
    enrolledAt: Date | null
    parentEmail: string | null
    parentPhone: string | null
    importBatchId: string | null
    comments: string | null
  }

  export type EnrollmentCountAggregateOutputType = {
    id: number
    classId: number
    studentId: number
    enrolledAt: number
    parentEmail: number
    parentPhone: number
    importBatchId: number
    comments: number
    _all: number
  }


  export type EnrollmentMinAggregateInputType = {
    id?: true
    classId?: true
    studentId?: true
    enrolledAt?: true
    parentEmail?: true
    parentPhone?: true
    importBatchId?: true
    comments?: true
  }

  export type EnrollmentMaxAggregateInputType = {
    id?: true
    classId?: true
    studentId?: true
    enrolledAt?: true
    parentEmail?: true
    parentPhone?: true
    importBatchId?: true
    comments?: true
  }

  export type EnrollmentCountAggregateInputType = {
    id?: true
    classId?: true
    studentId?: true
    enrolledAt?: true
    parentEmail?: true
    parentPhone?: true
    importBatchId?: true
    comments?: true
    _all?: true
  }

  export type EnrollmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollment to aggregate.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Enrollments
    **/
    _count?: true | EnrollmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnrollmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnrollmentMaxAggregateInputType
  }

  export type GetEnrollmentAggregateType<T extends EnrollmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEnrollment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnrollment[P]>
      : GetScalarType<T[P], AggregateEnrollment[P]>
  }




  export type EnrollmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithAggregationInput | EnrollmentOrderByWithAggregationInput[]
    by: EnrollmentScalarFieldEnum[] | EnrollmentScalarFieldEnum
    having?: EnrollmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnrollmentCountAggregateInputType | true
    _min?: EnrollmentMinAggregateInputType
    _max?: EnrollmentMaxAggregateInputType
  }

  export type EnrollmentGroupByOutputType = {
    id: string
    classId: string
    studentId: string
    enrolledAt: Date
    parentEmail: string | null
    parentPhone: string | null
    importBatchId: string | null
    comments: string | null
    _count: EnrollmentCountAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  type GetEnrollmentGroupByPayload<T extends EnrollmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnrollmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnrollmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
            : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
        }
      >
    >


  export type EnrollmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classId?: boolean
    studentId?: boolean
    enrolledAt?: boolean
    parentEmail?: boolean
    parentPhone?: boolean
    importBatchId?: boolean
    comments?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
    importBatch?: boolean | Enrollment$importBatchArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classId?: boolean
    studentId?: boolean
    enrolledAt?: boolean
    parentEmail?: boolean
    parentPhone?: boolean
    importBatchId?: boolean
    comments?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
    importBatch?: boolean | Enrollment$importBatchArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classId?: boolean
    studentId?: boolean
    enrolledAt?: boolean
    parentEmail?: boolean
    parentPhone?: boolean
    importBatchId?: boolean
    comments?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
    importBatch?: boolean | Enrollment$importBatchArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectScalar = {
    id?: boolean
    classId?: boolean
    studentId?: boolean
    enrolledAt?: boolean
    parentEmail?: boolean
    parentPhone?: boolean
    importBatchId?: boolean
    comments?: boolean
  }

  export type EnrollmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "classId" | "studentId" | "enrolledAt" | "parentEmail" | "parentPhone" | "importBatchId" | "comments", ExtArgs["result"]["enrollment"]>
  export type EnrollmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
    importBatch?: boolean | Enrollment$importBatchArgs<ExtArgs>
  }
  export type EnrollmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
    importBatch?: boolean | Enrollment$importBatchArgs<ExtArgs>
  }
  export type EnrollmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
    importBatch?: boolean | Enrollment$importBatchArgs<ExtArgs>
  }

  export type $EnrollmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Enrollment"
    objects: {
      class: Prisma.$ClassPayload<ExtArgs>
      student: Prisma.$UserPayload<ExtArgs>
      importBatch: Prisma.$ImportBatchPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      classId: string
      studentId: string
      enrolledAt: Date
      parentEmail: string | null
      parentPhone: string | null
      importBatchId: string | null
      comments: string | null
    }, ExtArgs["result"]["enrollment"]>
    composites: {}
  }

  type EnrollmentGetPayload<S extends boolean | null | undefined | EnrollmentDefaultArgs> = $Result.GetResult<Prisma.$EnrollmentPayload, S>

  type EnrollmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnrollmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnrollmentCountAggregateInputType | true
    }

  export interface EnrollmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Enrollment'], meta: { name: 'Enrollment' } }
    /**
     * Find zero or one Enrollment that matches the filter.
     * @param {EnrollmentFindUniqueArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnrollmentFindUniqueArgs>(args: SelectSubset<T, EnrollmentFindUniqueArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Enrollment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnrollmentFindUniqueOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnrollmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EnrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnrollmentFindFirstArgs>(args?: SelectSubset<T, EnrollmentFindFirstArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnrollmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EnrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Enrollments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enrollments
     * const enrollments = await prisma.enrollment.findMany()
     * 
     * // Get first 10 Enrollments
     * const enrollments = await prisma.enrollment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnrollmentFindManyArgs>(args?: SelectSubset<T, EnrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Enrollment.
     * @param {EnrollmentCreateArgs} args - Arguments to create a Enrollment.
     * @example
     * // Create one Enrollment
     * const Enrollment = await prisma.enrollment.create({
     *   data: {
     *     // ... data to create a Enrollment
     *   }
     * })
     * 
     */
    create<T extends EnrollmentCreateArgs>(args: SelectSubset<T, EnrollmentCreateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Enrollments.
     * @param {EnrollmentCreateManyArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnrollmentCreateManyArgs>(args?: SelectSubset<T, EnrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Enrollments and returns the data saved in the database.
     * @param {EnrollmentCreateManyAndReturnArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Enrollments and only return the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnrollmentCreateManyAndReturnArgs>(args?: SelectSubset<T, EnrollmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Enrollment.
     * @param {EnrollmentDeleteArgs} args - Arguments to delete one Enrollment.
     * @example
     * // Delete one Enrollment
     * const Enrollment = await prisma.enrollment.delete({
     *   where: {
     *     // ... filter to delete one Enrollment
     *   }
     * })
     * 
     */
    delete<T extends EnrollmentDeleteArgs>(args: SelectSubset<T, EnrollmentDeleteArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Enrollment.
     * @param {EnrollmentUpdateArgs} args - Arguments to update one Enrollment.
     * @example
     * // Update one Enrollment
     * const enrollment = await prisma.enrollment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnrollmentUpdateArgs>(args: SelectSubset<T, EnrollmentUpdateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Enrollments.
     * @param {EnrollmentDeleteManyArgs} args - Arguments to filter Enrollments to delete.
     * @example
     * // Delete a few Enrollments
     * const { count } = await prisma.enrollment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnrollmentDeleteManyArgs>(args?: SelectSubset<T, EnrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnrollmentUpdateManyArgs>(args: SelectSubset<T, EnrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments and returns the data updated in the database.
     * @param {EnrollmentUpdateManyAndReturnArgs} args - Arguments to update many Enrollments.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Enrollments and only return the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EnrollmentUpdateManyAndReturnArgs>(args: SelectSubset<T, EnrollmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Enrollment.
     * @param {EnrollmentUpsertArgs} args - Arguments to update or create a Enrollment.
     * @example
     * // Update or create a Enrollment
     * const enrollment = await prisma.enrollment.upsert({
     *   create: {
     *     // ... data to create a Enrollment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Enrollment we want to update
     *   }
     * })
     */
    upsert<T extends EnrollmentUpsertArgs>(args: SelectSubset<T, EnrollmentUpsertArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentCountArgs} args - Arguments to filter Enrollments to count.
     * @example
     * // Count the number of Enrollments
     * const count = await prisma.enrollment.count({
     *   where: {
     *     // ... the filter for the Enrollments we want to count
     *   }
     * })
    **/
    count<T extends EnrollmentCountArgs>(
      args?: Subset<T, EnrollmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnrollmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnrollmentAggregateArgs>(args: Subset<T, EnrollmentAggregateArgs>): Prisma.PrismaPromise<GetEnrollmentAggregateType<T>>

    /**
     * Group by Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnrollmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnrollmentGroupByArgs['orderBy'] }
        : { orderBy?: EnrollmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Enrollment model
   */
  readonly fields: EnrollmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Enrollment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnrollmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    class<T extends ClassDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassDefaultArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    student<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    importBatch<T extends Enrollment$importBatchArgs<ExtArgs> = {}>(args?: Subset<T, Enrollment$importBatchArgs<ExtArgs>>): Prisma__ImportBatchClient<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Enrollment model
   */
  interface EnrollmentFieldRefs {
    readonly id: FieldRef<"Enrollment", 'String'>
    readonly classId: FieldRef<"Enrollment", 'String'>
    readonly studentId: FieldRef<"Enrollment", 'String'>
    readonly enrolledAt: FieldRef<"Enrollment", 'DateTime'>
    readonly parentEmail: FieldRef<"Enrollment", 'String'>
    readonly parentPhone: FieldRef<"Enrollment", 'String'>
    readonly importBatchId: FieldRef<"Enrollment", 'String'>
    readonly comments: FieldRef<"Enrollment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Enrollment findUnique
   */
  export type EnrollmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findUniqueOrThrow
   */
  export type EnrollmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findFirst
   */
  export type EnrollmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findFirstOrThrow
   */
  export type EnrollmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findMany
   */
  export type EnrollmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollments to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment create
   */
  export type EnrollmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Enrollment.
     */
    data: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
  }

  /**
   * Enrollment createMany
   */
  export type EnrollmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Enrollment createManyAndReturn
   */
  export type EnrollmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enrollment update
   */
  export type EnrollmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Enrollment.
     */
    data: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
    /**
     * Choose, which Enrollment to update.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment updateMany
   */
  export type EnrollmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
  }

  /**
   * Enrollment updateManyAndReturn
   */
  export type EnrollmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enrollment upsert
   */
  export type EnrollmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Enrollment to update in case it exists.
     */
    where: EnrollmentWhereUniqueInput
    /**
     * In case the Enrollment found by the `where` argument doesn't exist, create a new Enrollment with this data.
     */
    create: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
    /**
     * In case the Enrollment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
  }

  /**
   * Enrollment delete
   */
  export type EnrollmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter which Enrollment to delete.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment deleteMany
   */
  export type EnrollmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollments to delete
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to delete.
     */
    limit?: number
  }

  /**
   * Enrollment.importBatch
   */
  export type Enrollment$importBatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchInclude<ExtArgs> | null
    where?: ImportBatchWhereInput
  }

  /**
   * Enrollment without action
   */
  export type EnrollmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
  }


  /**
   * Model QuizSession
   */

  export type AggregateQuizSession = {
    _count: QuizSessionCountAggregateOutputType | null
    _avg: QuizSessionAvgAggregateOutputType | null
    _sum: QuizSessionSumAggregateOutputType | null
    _min: QuizSessionMinAggregateOutputType | null
    _max: QuizSessionMaxAggregateOutputType | null
  }

  export type QuizSessionAvgAggregateOutputType = {
    weekId: number | null
    currentQuestionIndex: number | null
    timeRemaining: number | null
    livesRemaining: number | null
    scoreThisQuestion: number | null
    correctCount: number | null
    speedBonusCount: number | null
  }

  export type QuizSessionSumAggregateOutputType = {
    weekId: number | null
    currentQuestionIndex: number | null
    timeRemaining: number | null
    livesRemaining: number | null
    scoreThisQuestion: number | null
    correctCount: number | null
    speedBonusCount: number | null
  }

  export type QuizSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    grade: string | null
    subject: string | null
    weekId: number | null
    difficulty: string | null
    currentQuestionIndex: number | null
    selectedAnswer: string | null
    isAnswered: boolean | null
    isCorrect: boolean | null
    timeRemaining: number | null
    livesRemaining: number | null
    scoreThisQuestion: number | null
    correctCount: number | null
    speedBonusCount: number | null
    answersHistory: string | null
    status: string | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type QuizSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    grade: string | null
    subject: string | null
    weekId: number | null
    difficulty: string | null
    currentQuestionIndex: number | null
    selectedAnswer: string | null
    isAnswered: boolean | null
    isCorrect: boolean | null
    timeRemaining: number | null
    livesRemaining: number | null
    scoreThisQuestion: number | null
    correctCount: number | null
    speedBonusCount: number | null
    answersHistory: string | null
    status: string | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type QuizSessionCountAggregateOutputType = {
    id: number
    userId: number
    grade: number
    subject: number
    weekId: number
    difficulty: number
    currentQuestionIndex: number
    selectedAnswer: number
    isAnswered: number
    isCorrect: number
    timeRemaining: number
    livesRemaining: number
    scoreThisQuestion: number
    correctCount: number
    speedBonusCount: number
    answersHistory: number
    status: number
    startedAt: number
    completedAt: number
    _all: number
  }


  export type QuizSessionAvgAggregateInputType = {
    weekId?: true
    currentQuestionIndex?: true
    timeRemaining?: true
    livesRemaining?: true
    scoreThisQuestion?: true
    correctCount?: true
    speedBonusCount?: true
  }

  export type QuizSessionSumAggregateInputType = {
    weekId?: true
    currentQuestionIndex?: true
    timeRemaining?: true
    livesRemaining?: true
    scoreThisQuestion?: true
    correctCount?: true
    speedBonusCount?: true
  }

  export type QuizSessionMinAggregateInputType = {
    id?: true
    userId?: true
    grade?: true
    subject?: true
    weekId?: true
    difficulty?: true
    currentQuestionIndex?: true
    selectedAnswer?: true
    isAnswered?: true
    isCorrect?: true
    timeRemaining?: true
    livesRemaining?: true
    scoreThisQuestion?: true
    correctCount?: true
    speedBonusCount?: true
    answersHistory?: true
    status?: true
    startedAt?: true
    completedAt?: true
  }

  export type QuizSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    grade?: true
    subject?: true
    weekId?: true
    difficulty?: true
    currentQuestionIndex?: true
    selectedAnswer?: true
    isAnswered?: true
    isCorrect?: true
    timeRemaining?: true
    livesRemaining?: true
    scoreThisQuestion?: true
    correctCount?: true
    speedBonusCount?: true
    answersHistory?: true
    status?: true
    startedAt?: true
    completedAt?: true
  }

  export type QuizSessionCountAggregateInputType = {
    id?: true
    userId?: true
    grade?: true
    subject?: true
    weekId?: true
    difficulty?: true
    currentQuestionIndex?: true
    selectedAnswer?: true
    isAnswered?: true
    isCorrect?: true
    timeRemaining?: true
    livesRemaining?: true
    scoreThisQuestion?: true
    correctCount?: true
    speedBonusCount?: true
    answersHistory?: true
    status?: true
    startedAt?: true
    completedAt?: true
    _all?: true
  }

  export type QuizSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizSession to aggregate.
     */
    where?: QuizSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizSessions to fetch.
     */
    orderBy?: QuizSessionOrderByWithRelationInput | QuizSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuizSessions
    **/
    _count?: true | QuizSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuizSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuizSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizSessionMaxAggregateInputType
  }

  export type GetQuizSessionAggregateType<T extends QuizSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuizSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuizSession[P]>
      : GetScalarType<T[P], AggregateQuizSession[P]>
  }




  export type QuizSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizSessionWhereInput
    orderBy?: QuizSessionOrderByWithAggregationInput | QuizSessionOrderByWithAggregationInput[]
    by: QuizSessionScalarFieldEnum[] | QuizSessionScalarFieldEnum
    having?: QuizSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizSessionCountAggregateInputType | true
    _avg?: QuizSessionAvgAggregateInputType
    _sum?: QuizSessionSumAggregateInputType
    _min?: QuizSessionMinAggregateInputType
    _max?: QuizSessionMaxAggregateInputType
  }

  export type QuizSessionGroupByOutputType = {
    id: string
    userId: string
    grade: string
    subject: string
    weekId: number
    difficulty: string
    currentQuestionIndex: number
    selectedAnswer: string | null
    isAnswered: boolean
    isCorrect: boolean
    timeRemaining: number
    livesRemaining: number
    scoreThisQuestion: number
    correctCount: number
    speedBonusCount: number
    answersHistory: string
    status: string
    startedAt: Date
    completedAt: Date | null
    _count: QuizSessionCountAggregateOutputType | null
    _avg: QuizSessionAvgAggregateOutputType | null
    _sum: QuizSessionSumAggregateOutputType | null
    _min: QuizSessionMinAggregateOutputType | null
    _max: QuizSessionMaxAggregateOutputType | null
  }

  type GetQuizSessionGroupByPayload<T extends QuizSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizSessionGroupByOutputType[P]>
            : GetScalarType<T[P], QuizSessionGroupByOutputType[P]>
        }
      >
    >


  export type QuizSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    grade?: boolean
    subject?: boolean
    weekId?: boolean
    difficulty?: boolean
    currentQuestionIndex?: boolean
    selectedAnswer?: boolean
    isAnswered?: boolean
    isCorrect?: boolean
    timeRemaining?: boolean
    livesRemaining?: boolean
    scoreThisQuestion?: boolean
    correctCount?: boolean
    speedBonusCount?: boolean
    answersHistory?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizSession"]>

  export type QuizSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    grade?: boolean
    subject?: boolean
    weekId?: boolean
    difficulty?: boolean
    currentQuestionIndex?: boolean
    selectedAnswer?: boolean
    isAnswered?: boolean
    isCorrect?: boolean
    timeRemaining?: boolean
    livesRemaining?: boolean
    scoreThisQuestion?: boolean
    correctCount?: boolean
    speedBonusCount?: boolean
    answersHistory?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizSession"]>

  export type QuizSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    grade?: boolean
    subject?: boolean
    weekId?: boolean
    difficulty?: boolean
    currentQuestionIndex?: boolean
    selectedAnswer?: boolean
    isAnswered?: boolean
    isCorrect?: boolean
    timeRemaining?: boolean
    livesRemaining?: boolean
    scoreThisQuestion?: boolean
    correctCount?: boolean
    speedBonusCount?: boolean
    answersHistory?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizSession"]>

  export type QuizSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    grade?: boolean
    subject?: boolean
    weekId?: boolean
    difficulty?: boolean
    currentQuestionIndex?: boolean
    selectedAnswer?: boolean
    isAnswered?: boolean
    isCorrect?: boolean
    timeRemaining?: boolean
    livesRemaining?: boolean
    scoreThisQuestion?: boolean
    correctCount?: boolean
    speedBonusCount?: boolean
    answersHistory?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
  }

  export type QuizSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "grade" | "subject" | "weekId" | "difficulty" | "currentQuestionIndex" | "selectedAnswer" | "isAnswered" | "isCorrect" | "timeRemaining" | "livesRemaining" | "scoreThisQuestion" | "correctCount" | "speedBonusCount" | "answersHistory" | "status" | "startedAt" | "completedAt", ExtArgs["result"]["quizSession"]>
  export type QuizSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QuizSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QuizSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $QuizSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuizSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      grade: string
      subject: string
      weekId: number
      difficulty: string
      currentQuestionIndex: number
      selectedAnswer: string | null
      isAnswered: boolean
      isCorrect: boolean
      timeRemaining: number
      livesRemaining: number
      scoreThisQuestion: number
      correctCount: number
      speedBonusCount: number
      answersHistory: string
      status: string
      startedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["quizSession"]>
    composites: {}
  }

  type QuizSessionGetPayload<S extends boolean | null | undefined | QuizSessionDefaultArgs> = $Result.GetResult<Prisma.$QuizSessionPayload, S>

  type QuizSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuizSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizSessionCountAggregateInputType | true
    }

  export interface QuizSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuizSession'], meta: { name: 'QuizSession' } }
    /**
     * Find zero or one QuizSession that matches the filter.
     * @param {QuizSessionFindUniqueArgs} args - Arguments to find a QuizSession
     * @example
     * // Get one QuizSession
     * const quizSession = await prisma.quizSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizSessionFindUniqueArgs>(args: SelectSubset<T, QuizSessionFindUniqueArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuizSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuizSessionFindUniqueOrThrowArgs} args - Arguments to find a QuizSession
     * @example
     * // Get one QuizSession
     * const quizSession = await prisma.quizSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionFindFirstArgs} args - Arguments to find a QuizSession
     * @example
     * // Get one QuizSession
     * const quizSession = await prisma.quizSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizSessionFindFirstArgs>(args?: SelectSubset<T, QuizSessionFindFirstArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionFindFirstOrThrowArgs} args - Arguments to find a QuizSession
     * @example
     * // Get one QuizSession
     * const quizSession = await prisma.quizSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuizSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuizSessions
     * const quizSessions = await prisma.quizSession.findMany()
     * 
     * // Get first 10 QuizSessions
     * const quizSessions = await prisma.quizSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizSessionWithIdOnly = await prisma.quizSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizSessionFindManyArgs>(args?: SelectSubset<T, QuizSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuizSession.
     * @param {QuizSessionCreateArgs} args - Arguments to create a QuizSession.
     * @example
     * // Create one QuizSession
     * const QuizSession = await prisma.quizSession.create({
     *   data: {
     *     // ... data to create a QuizSession
     *   }
     * })
     * 
     */
    create<T extends QuizSessionCreateArgs>(args: SelectSubset<T, QuizSessionCreateArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuizSessions.
     * @param {QuizSessionCreateManyArgs} args - Arguments to create many QuizSessions.
     * @example
     * // Create many QuizSessions
     * const quizSession = await prisma.quizSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizSessionCreateManyArgs>(args?: SelectSubset<T, QuizSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuizSessions and returns the data saved in the database.
     * @param {QuizSessionCreateManyAndReturnArgs} args - Arguments to create many QuizSessions.
     * @example
     * // Create many QuizSessions
     * const quizSession = await prisma.quizSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuizSessions and only return the `id`
     * const quizSessionWithIdOnly = await prisma.quizSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuizSession.
     * @param {QuizSessionDeleteArgs} args - Arguments to delete one QuizSession.
     * @example
     * // Delete one QuizSession
     * const QuizSession = await prisma.quizSession.delete({
     *   where: {
     *     // ... filter to delete one QuizSession
     *   }
     * })
     * 
     */
    delete<T extends QuizSessionDeleteArgs>(args: SelectSubset<T, QuizSessionDeleteArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuizSession.
     * @param {QuizSessionUpdateArgs} args - Arguments to update one QuizSession.
     * @example
     * // Update one QuizSession
     * const quizSession = await prisma.quizSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizSessionUpdateArgs>(args: SelectSubset<T, QuizSessionUpdateArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuizSessions.
     * @param {QuizSessionDeleteManyArgs} args - Arguments to filter QuizSessions to delete.
     * @example
     * // Delete a few QuizSessions
     * const { count } = await prisma.quizSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizSessionDeleteManyArgs>(args?: SelectSubset<T, QuizSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuizSessions
     * const quizSession = await prisma.quizSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizSessionUpdateManyArgs>(args: SelectSubset<T, QuizSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizSessions and returns the data updated in the database.
     * @param {QuizSessionUpdateManyAndReturnArgs} args - Arguments to update many QuizSessions.
     * @example
     * // Update many QuizSessions
     * const quizSession = await prisma.quizSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuizSessions and only return the `id`
     * const quizSessionWithIdOnly = await prisma.quizSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuizSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuizSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuizSession.
     * @param {QuizSessionUpsertArgs} args - Arguments to update or create a QuizSession.
     * @example
     * // Update or create a QuizSession
     * const quizSession = await prisma.quizSession.upsert({
     *   create: {
     *     // ... data to create a QuizSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuizSession we want to update
     *   }
     * })
     */
    upsert<T extends QuizSessionUpsertArgs>(args: SelectSubset<T, QuizSessionUpsertArgs<ExtArgs>>): Prisma__QuizSessionClient<$Result.GetResult<Prisma.$QuizSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuizSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionCountArgs} args - Arguments to filter QuizSessions to count.
     * @example
     * // Count the number of QuizSessions
     * const count = await prisma.quizSession.count({
     *   where: {
     *     // ... the filter for the QuizSessions we want to count
     *   }
     * })
    **/
    count<T extends QuizSessionCountArgs>(
      args?: Subset<T, QuizSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuizSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuizSessionAggregateArgs>(args: Subset<T, QuizSessionAggregateArgs>): Prisma.PrismaPromise<GetQuizSessionAggregateType<T>>

    /**
     * Group by QuizSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuizSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizSessionGroupByArgs['orderBy'] }
        : { orderBy?: QuizSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuizSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuizSession model
   */
  readonly fields: QuizSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuizSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuizSession model
   */
  interface QuizSessionFieldRefs {
    readonly id: FieldRef<"QuizSession", 'String'>
    readonly userId: FieldRef<"QuizSession", 'String'>
    readonly grade: FieldRef<"QuizSession", 'String'>
    readonly subject: FieldRef<"QuizSession", 'String'>
    readonly weekId: FieldRef<"QuizSession", 'Int'>
    readonly difficulty: FieldRef<"QuizSession", 'String'>
    readonly currentQuestionIndex: FieldRef<"QuizSession", 'Int'>
    readonly selectedAnswer: FieldRef<"QuizSession", 'String'>
    readonly isAnswered: FieldRef<"QuizSession", 'Boolean'>
    readonly isCorrect: FieldRef<"QuizSession", 'Boolean'>
    readonly timeRemaining: FieldRef<"QuizSession", 'Int'>
    readonly livesRemaining: FieldRef<"QuizSession", 'Int'>
    readonly scoreThisQuestion: FieldRef<"QuizSession", 'Int'>
    readonly correctCount: FieldRef<"QuizSession", 'Int'>
    readonly speedBonusCount: FieldRef<"QuizSession", 'Int'>
    readonly answersHistory: FieldRef<"QuizSession", 'String'>
    readonly status: FieldRef<"QuizSession", 'String'>
    readonly startedAt: FieldRef<"QuizSession", 'DateTime'>
    readonly completedAt: FieldRef<"QuizSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuizSession findUnique
   */
  export type QuizSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * Filter, which QuizSession to fetch.
     */
    where: QuizSessionWhereUniqueInput
  }

  /**
   * QuizSession findUniqueOrThrow
   */
  export type QuizSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * Filter, which QuizSession to fetch.
     */
    where: QuizSessionWhereUniqueInput
  }

  /**
   * QuizSession findFirst
   */
  export type QuizSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * Filter, which QuizSession to fetch.
     */
    where?: QuizSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizSessions to fetch.
     */
    orderBy?: QuizSessionOrderByWithRelationInput | QuizSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizSessions.
     */
    cursor?: QuizSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizSessions.
     */
    distinct?: QuizSessionScalarFieldEnum | QuizSessionScalarFieldEnum[]
  }

  /**
   * QuizSession findFirstOrThrow
   */
  export type QuizSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * Filter, which QuizSession to fetch.
     */
    where?: QuizSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizSessions to fetch.
     */
    orderBy?: QuizSessionOrderByWithRelationInput | QuizSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizSessions.
     */
    cursor?: QuizSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizSessions.
     */
    distinct?: QuizSessionScalarFieldEnum | QuizSessionScalarFieldEnum[]
  }

  /**
   * QuizSession findMany
   */
  export type QuizSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * Filter, which QuizSessions to fetch.
     */
    where?: QuizSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizSessions to fetch.
     */
    orderBy?: QuizSessionOrderByWithRelationInput | QuizSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuizSessions.
     */
    cursor?: QuizSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizSessions.
     */
    skip?: number
    distinct?: QuizSessionScalarFieldEnum | QuizSessionScalarFieldEnum[]
  }

  /**
   * QuizSession create
   */
  export type QuizSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a QuizSession.
     */
    data: XOR<QuizSessionCreateInput, QuizSessionUncheckedCreateInput>
  }

  /**
   * QuizSession createMany
   */
  export type QuizSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuizSessions.
     */
    data: QuizSessionCreateManyInput | QuizSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuizSession createManyAndReturn
   */
  export type QuizSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * The data used to create many QuizSessions.
     */
    data: QuizSessionCreateManyInput | QuizSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizSession update
   */
  export type QuizSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a QuizSession.
     */
    data: XOR<QuizSessionUpdateInput, QuizSessionUncheckedUpdateInput>
    /**
     * Choose, which QuizSession to update.
     */
    where: QuizSessionWhereUniqueInput
  }

  /**
   * QuizSession updateMany
   */
  export type QuizSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuizSessions.
     */
    data: XOR<QuizSessionUpdateManyMutationInput, QuizSessionUncheckedUpdateManyInput>
    /**
     * Filter which QuizSessions to update
     */
    where?: QuizSessionWhereInput
    /**
     * Limit how many QuizSessions to update.
     */
    limit?: number
  }

  /**
   * QuizSession updateManyAndReturn
   */
  export type QuizSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * The data used to update QuizSessions.
     */
    data: XOR<QuizSessionUpdateManyMutationInput, QuizSessionUncheckedUpdateManyInput>
    /**
     * Filter which QuizSessions to update
     */
    where?: QuizSessionWhereInput
    /**
     * Limit how many QuizSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizSession upsert
   */
  export type QuizSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the QuizSession to update in case it exists.
     */
    where: QuizSessionWhereUniqueInput
    /**
     * In case the QuizSession found by the `where` argument doesn't exist, create a new QuizSession with this data.
     */
    create: XOR<QuizSessionCreateInput, QuizSessionUncheckedCreateInput>
    /**
     * In case the QuizSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizSessionUpdateInput, QuizSessionUncheckedUpdateInput>
  }

  /**
   * QuizSession delete
   */
  export type QuizSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
    /**
     * Filter which QuizSession to delete.
     */
    where: QuizSessionWhereUniqueInput
  }

  /**
   * QuizSession deleteMany
   */
  export type QuizSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizSessions to delete
     */
    where?: QuizSessionWhereInput
    /**
     * Limit how many QuizSessions to delete.
     */
    limit?: number
  }

  /**
   * QuizSession without action
   */
  export type QuizSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizSession
     */
    select?: QuizSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizSession
     */
    omit?: QuizSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizSessionInclude<ExtArgs> | null
  }


  /**
   * Model ImportBatch
   */

  export type AggregateImportBatch = {
    _count: ImportBatchCountAggregateOutputType | null
    _avg: ImportBatchAvgAggregateOutputType | null
    _sum: ImportBatchSumAggregateOutputType | null
    _min: ImportBatchMinAggregateOutputType | null
    _max: ImportBatchMaxAggregateOutputType | null
  }

  export type ImportBatchAvgAggregateOutputType = {
    recordsCount: number | null
    successCount: number | null
    failureCount: number | null
  }

  export type ImportBatchSumAggregateOutputType = {
    recordsCount: number | null
    successCount: number | null
    failureCount: number | null
  }

  export type ImportBatchMinAggregateOutputType = {
    id: string | null
    teacherId: string | null
    classId: string | null
    fileName: string | null
    recordsCount: number | null
    successCount: number | null
    failureCount: number | null
    errorLog: string | null
    createdAt: Date | null
  }

  export type ImportBatchMaxAggregateOutputType = {
    id: string | null
    teacherId: string | null
    classId: string | null
    fileName: string | null
    recordsCount: number | null
    successCount: number | null
    failureCount: number | null
    errorLog: string | null
    createdAt: Date | null
  }

  export type ImportBatchCountAggregateOutputType = {
    id: number
    teacherId: number
    classId: number
    fileName: number
    recordsCount: number
    successCount: number
    failureCount: number
    errorLog: number
    createdAt: number
    _all: number
  }


  export type ImportBatchAvgAggregateInputType = {
    recordsCount?: true
    successCount?: true
    failureCount?: true
  }

  export type ImportBatchSumAggregateInputType = {
    recordsCount?: true
    successCount?: true
    failureCount?: true
  }

  export type ImportBatchMinAggregateInputType = {
    id?: true
    teacherId?: true
    classId?: true
    fileName?: true
    recordsCount?: true
    successCount?: true
    failureCount?: true
    errorLog?: true
    createdAt?: true
  }

  export type ImportBatchMaxAggregateInputType = {
    id?: true
    teacherId?: true
    classId?: true
    fileName?: true
    recordsCount?: true
    successCount?: true
    failureCount?: true
    errorLog?: true
    createdAt?: true
  }

  export type ImportBatchCountAggregateInputType = {
    id?: true
    teacherId?: true
    classId?: true
    fileName?: true
    recordsCount?: true
    successCount?: true
    failureCount?: true
    errorLog?: true
    createdAt?: true
    _all?: true
  }

  export type ImportBatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImportBatch to aggregate.
     */
    where?: ImportBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportBatches to fetch.
     */
    orderBy?: ImportBatchOrderByWithRelationInput | ImportBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImportBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ImportBatches
    **/
    _count?: true | ImportBatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImportBatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImportBatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImportBatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImportBatchMaxAggregateInputType
  }

  export type GetImportBatchAggregateType<T extends ImportBatchAggregateArgs> = {
        [P in keyof T & keyof AggregateImportBatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImportBatch[P]>
      : GetScalarType<T[P], AggregateImportBatch[P]>
  }




  export type ImportBatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImportBatchWhereInput
    orderBy?: ImportBatchOrderByWithAggregationInput | ImportBatchOrderByWithAggregationInput[]
    by: ImportBatchScalarFieldEnum[] | ImportBatchScalarFieldEnum
    having?: ImportBatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImportBatchCountAggregateInputType | true
    _avg?: ImportBatchAvgAggregateInputType
    _sum?: ImportBatchSumAggregateInputType
    _min?: ImportBatchMinAggregateInputType
    _max?: ImportBatchMaxAggregateInputType
  }

  export type ImportBatchGroupByOutputType = {
    id: string
    teacherId: string
    classId: string
    fileName: string
    recordsCount: number
    successCount: number
    failureCount: number
    errorLog: string | null
    createdAt: Date
    _count: ImportBatchCountAggregateOutputType | null
    _avg: ImportBatchAvgAggregateOutputType | null
    _sum: ImportBatchSumAggregateOutputType | null
    _min: ImportBatchMinAggregateOutputType | null
    _max: ImportBatchMaxAggregateOutputType | null
  }

  type GetImportBatchGroupByPayload<T extends ImportBatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImportBatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImportBatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImportBatchGroupByOutputType[P]>
            : GetScalarType<T[P], ImportBatchGroupByOutputType[P]>
        }
      >
    >


  export type ImportBatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    classId?: boolean
    fileName?: boolean
    recordsCount?: boolean
    successCount?: boolean
    failureCount?: boolean
    errorLog?: boolean
    createdAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
    enrollments?: boolean | ImportBatch$enrollmentsArgs<ExtArgs>
    _count?: boolean | ImportBatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importBatch"]>

  export type ImportBatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    classId?: boolean
    fileName?: boolean
    recordsCount?: boolean
    successCount?: boolean
    failureCount?: boolean
    errorLog?: boolean
    createdAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importBatch"]>

  export type ImportBatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    classId?: boolean
    fileName?: boolean
    recordsCount?: boolean
    successCount?: boolean
    failureCount?: boolean
    errorLog?: boolean
    createdAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importBatch"]>

  export type ImportBatchSelectScalar = {
    id?: boolean
    teacherId?: boolean
    classId?: boolean
    fileName?: boolean
    recordsCount?: boolean
    successCount?: boolean
    failureCount?: boolean
    errorLog?: boolean
    createdAt?: boolean
  }

  export type ImportBatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teacherId" | "classId" | "fileName" | "recordsCount" | "successCount" | "failureCount" | "errorLog" | "createdAt", ExtArgs["result"]["importBatch"]>
  export type ImportBatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
    enrollments?: boolean | ImportBatch$enrollmentsArgs<ExtArgs>
    _count?: boolean | ImportBatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ImportBatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }
  export type ImportBatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }

  export type $ImportBatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ImportBatch"
    objects: {
      teacher: Prisma.$UserPayload<ExtArgs>
      class: Prisma.$ClassPayload<ExtArgs>
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teacherId: string
      classId: string
      fileName: string
      recordsCount: number
      successCount: number
      failureCount: number
      errorLog: string | null
      createdAt: Date
    }, ExtArgs["result"]["importBatch"]>
    composites: {}
  }

  type ImportBatchGetPayload<S extends boolean | null | undefined | ImportBatchDefaultArgs> = $Result.GetResult<Prisma.$ImportBatchPayload, S>

  type ImportBatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImportBatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImportBatchCountAggregateInputType | true
    }

  export interface ImportBatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ImportBatch'], meta: { name: 'ImportBatch' } }
    /**
     * Find zero or one ImportBatch that matches the filter.
     * @param {ImportBatchFindUniqueArgs} args - Arguments to find a ImportBatch
     * @example
     * // Get one ImportBatch
     * const importBatch = await prisma.importBatch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImportBatchFindUniqueArgs>(args: SelectSubset<T, ImportBatchFindUniqueArgs<ExtArgs>>): Prisma__ImportBatchClient<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ImportBatch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImportBatchFindUniqueOrThrowArgs} args - Arguments to find a ImportBatch
     * @example
     * // Get one ImportBatch
     * const importBatch = await prisma.importBatch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImportBatchFindUniqueOrThrowArgs>(args: SelectSubset<T, ImportBatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImportBatchClient<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImportBatch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportBatchFindFirstArgs} args - Arguments to find a ImportBatch
     * @example
     * // Get one ImportBatch
     * const importBatch = await prisma.importBatch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImportBatchFindFirstArgs>(args?: SelectSubset<T, ImportBatchFindFirstArgs<ExtArgs>>): Prisma__ImportBatchClient<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImportBatch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportBatchFindFirstOrThrowArgs} args - Arguments to find a ImportBatch
     * @example
     * // Get one ImportBatch
     * const importBatch = await prisma.importBatch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImportBatchFindFirstOrThrowArgs>(args?: SelectSubset<T, ImportBatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImportBatchClient<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ImportBatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportBatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ImportBatches
     * const importBatches = await prisma.importBatch.findMany()
     * 
     * // Get first 10 ImportBatches
     * const importBatches = await prisma.importBatch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const importBatchWithIdOnly = await prisma.importBatch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImportBatchFindManyArgs>(args?: SelectSubset<T, ImportBatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ImportBatch.
     * @param {ImportBatchCreateArgs} args - Arguments to create a ImportBatch.
     * @example
     * // Create one ImportBatch
     * const ImportBatch = await prisma.importBatch.create({
     *   data: {
     *     // ... data to create a ImportBatch
     *   }
     * })
     * 
     */
    create<T extends ImportBatchCreateArgs>(args: SelectSubset<T, ImportBatchCreateArgs<ExtArgs>>): Prisma__ImportBatchClient<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ImportBatches.
     * @param {ImportBatchCreateManyArgs} args - Arguments to create many ImportBatches.
     * @example
     * // Create many ImportBatches
     * const importBatch = await prisma.importBatch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImportBatchCreateManyArgs>(args?: SelectSubset<T, ImportBatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ImportBatches and returns the data saved in the database.
     * @param {ImportBatchCreateManyAndReturnArgs} args - Arguments to create many ImportBatches.
     * @example
     * // Create many ImportBatches
     * const importBatch = await prisma.importBatch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ImportBatches and only return the `id`
     * const importBatchWithIdOnly = await prisma.importBatch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImportBatchCreateManyAndReturnArgs>(args?: SelectSubset<T, ImportBatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ImportBatch.
     * @param {ImportBatchDeleteArgs} args - Arguments to delete one ImportBatch.
     * @example
     * // Delete one ImportBatch
     * const ImportBatch = await prisma.importBatch.delete({
     *   where: {
     *     // ... filter to delete one ImportBatch
     *   }
     * })
     * 
     */
    delete<T extends ImportBatchDeleteArgs>(args: SelectSubset<T, ImportBatchDeleteArgs<ExtArgs>>): Prisma__ImportBatchClient<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ImportBatch.
     * @param {ImportBatchUpdateArgs} args - Arguments to update one ImportBatch.
     * @example
     * // Update one ImportBatch
     * const importBatch = await prisma.importBatch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImportBatchUpdateArgs>(args: SelectSubset<T, ImportBatchUpdateArgs<ExtArgs>>): Prisma__ImportBatchClient<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ImportBatches.
     * @param {ImportBatchDeleteManyArgs} args - Arguments to filter ImportBatches to delete.
     * @example
     * // Delete a few ImportBatches
     * const { count } = await prisma.importBatch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImportBatchDeleteManyArgs>(args?: SelectSubset<T, ImportBatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImportBatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportBatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ImportBatches
     * const importBatch = await prisma.importBatch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImportBatchUpdateManyArgs>(args: SelectSubset<T, ImportBatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImportBatches and returns the data updated in the database.
     * @param {ImportBatchUpdateManyAndReturnArgs} args - Arguments to update many ImportBatches.
     * @example
     * // Update many ImportBatches
     * const importBatch = await prisma.importBatch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ImportBatches and only return the `id`
     * const importBatchWithIdOnly = await prisma.importBatch.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ImportBatchUpdateManyAndReturnArgs>(args: SelectSubset<T, ImportBatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ImportBatch.
     * @param {ImportBatchUpsertArgs} args - Arguments to update or create a ImportBatch.
     * @example
     * // Update or create a ImportBatch
     * const importBatch = await prisma.importBatch.upsert({
     *   create: {
     *     // ... data to create a ImportBatch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ImportBatch we want to update
     *   }
     * })
     */
    upsert<T extends ImportBatchUpsertArgs>(args: SelectSubset<T, ImportBatchUpsertArgs<ExtArgs>>): Prisma__ImportBatchClient<$Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ImportBatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportBatchCountArgs} args - Arguments to filter ImportBatches to count.
     * @example
     * // Count the number of ImportBatches
     * const count = await prisma.importBatch.count({
     *   where: {
     *     // ... the filter for the ImportBatches we want to count
     *   }
     * })
    **/
    count<T extends ImportBatchCountArgs>(
      args?: Subset<T, ImportBatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImportBatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ImportBatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportBatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImportBatchAggregateArgs>(args: Subset<T, ImportBatchAggregateArgs>): Prisma.PrismaPromise<GetImportBatchAggregateType<T>>

    /**
     * Group by ImportBatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportBatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImportBatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImportBatchGroupByArgs['orderBy'] }
        : { orderBy?: ImportBatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImportBatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImportBatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ImportBatch model
   */
  readonly fields: ImportBatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ImportBatch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImportBatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    class<T extends ClassDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassDefaultArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    enrollments<T extends ImportBatch$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, ImportBatch$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ImportBatch model
   */
  interface ImportBatchFieldRefs {
    readonly id: FieldRef<"ImportBatch", 'String'>
    readonly teacherId: FieldRef<"ImportBatch", 'String'>
    readonly classId: FieldRef<"ImportBatch", 'String'>
    readonly fileName: FieldRef<"ImportBatch", 'String'>
    readonly recordsCount: FieldRef<"ImportBatch", 'Int'>
    readonly successCount: FieldRef<"ImportBatch", 'Int'>
    readonly failureCount: FieldRef<"ImportBatch", 'Int'>
    readonly errorLog: FieldRef<"ImportBatch", 'String'>
    readonly createdAt: FieldRef<"ImportBatch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ImportBatch findUnique
   */
  export type ImportBatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchInclude<ExtArgs> | null
    /**
     * Filter, which ImportBatch to fetch.
     */
    where: ImportBatchWhereUniqueInput
  }

  /**
   * ImportBatch findUniqueOrThrow
   */
  export type ImportBatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchInclude<ExtArgs> | null
    /**
     * Filter, which ImportBatch to fetch.
     */
    where: ImportBatchWhereUniqueInput
  }

  /**
   * ImportBatch findFirst
   */
  export type ImportBatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchInclude<ExtArgs> | null
    /**
     * Filter, which ImportBatch to fetch.
     */
    where?: ImportBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportBatches to fetch.
     */
    orderBy?: ImportBatchOrderByWithRelationInput | ImportBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImportBatches.
     */
    cursor?: ImportBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImportBatches.
     */
    distinct?: ImportBatchScalarFieldEnum | ImportBatchScalarFieldEnum[]
  }

  /**
   * ImportBatch findFirstOrThrow
   */
  export type ImportBatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchInclude<ExtArgs> | null
    /**
     * Filter, which ImportBatch to fetch.
     */
    where?: ImportBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportBatches to fetch.
     */
    orderBy?: ImportBatchOrderByWithRelationInput | ImportBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImportBatches.
     */
    cursor?: ImportBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImportBatches.
     */
    distinct?: ImportBatchScalarFieldEnum | ImportBatchScalarFieldEnum[]
  }

  /**
   * ImportBatch findMany
   */
  export type ImportBatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchInclude<ExtArgs> | null
    /**
     * Filter, which ImportBatches to fetch.
     */
    where?: ImportBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportBatches to fetch.
     */
    orderBy?: ImportBatchOrderByWithRelationInput | ImportBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ImportBatches.
     */
    cursor?: ImportBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportBatches.
     */
    skip?: number
    distinct?: ImportBatchScalarFieldEnum | ImportBatchScalarFieldEnum[]
  }

  /**
   * ImportBatch create
   */
  export type ImportBatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchInclude<ExtArgs> | null
    /**
     * The data needed to create a ImportBatch.
     */
    data: XOR<ImportBatchCreateInput, ImportBatchUncheckedCreateInput>
  }

  /**
   * ImportBatch createMany
   */
  export type ImportBatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ImportBatches.
     */
    data: ImportBatchCreateManyInput | ImportBatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ImportBatch createManyAndReturn
   */
  export type ImportBatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * The data used to create many ImportBatches.
     */
    data: ImportBatchCreateManyInput | ImportBatchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImportBatch update
   */
  export type ImportBatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchInclude<ExtArgs> | null
    /**
     * The data needed to update a ImportBatch.
     */
    data: XOR<ImportBatchUpdateInput, ImportBatchUncheckedUpdateInput>
    /**
     * Choose, which ImportBatch to update.
     */
    where: ImportBatchWhereUniqueInput
  }

  /**
   * ImportBatch updateMany
   */
  export type ImportBatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ImportBatches.
     */
    data: XOR<ImportBatchUpdateManyMutationInput, ImportBatchUncheckedUpdateManyInput>
    /**
     * Filter which ImportBatches to update
     */
    where?: ImportBatchWhereInput
    /**
     * Limit how many ImportBatches to update.
     */
    limit?: number
  }

  /**
   * ImportBatch updateManyAndReturn
   */
  export type ImportBatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * The data used to update ImportBatches.
     */
    data: XOR<ImportBatchUpdateManyMutationInput, ImportBatchUncheckedUpdateManyInput>
    /**
     * Filter which ImportBatches to update
     */
    where?: ImportBatchWhereInput
    /**
     * Limit how many ImportBatches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImportBatch upsert
   */
  export type ImportBatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchInclude<ExtArgs> | null
    /**
     * The filter to search for the ImportBatch to update in case it exists.
     */
    where: ImportBatchWhereUniqueInput
    /**
     * In case the ImportBatch found by the `where` argument doesn't exist, create a new ImportBatch with this data.
     */
    create: XOR<ImportBatchCreateInput, ImportBatchUncheckedCreateInput>
    /**
     * In case the ImportBatch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImportBatchUpdateInput, ImportBatchUncheckedUpdateInput>
  }

  /**
   * ImportBatch delete
   */
  export type ImportBatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchInclude<ExtArgs> | null
    /**
     * Filter which ImportBatch to delete.
     */
    where: ImportBatchWhereUniqueInput
  }

  /**
   * ImportBatch deleteMany
   */
  export type ImportBatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImportBatches to delete
     */
    where?: ImportBatchWhereInput
    /**
     * Limit how many ImportBatches to delete.
     */
    limit?: number
  }

  /**
   * ImportBatch.enrollments
   */
  export type ImportBatch$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * ImportBatch without action
   */
  export type ImportBatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportBatch
     */
    select?: ImportBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportBatch
     */
    omit?: ImportBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportBatchInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    image: 'image',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const StudentProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    grade: 'grade',
    subject: 'subject',
    difficulty: 'difficulty',
    totalScore: 'totalScore',
    overallProgress: 'overallProgress',
    currentPlantStage: 'currentPlantStage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudentProgressScalarFieldEnum = (typeof StudentProgressScalarFieldEnum)[keyof typeof StudentProgressScalarFieldEnum]


  export const WeekProgressScalarFieldEnum: {
    id: 'id',
    studentProgressId: 'studentProgressId',
    weekId: 'weekId',
    completed: 'completed',
    locked: 'locked',
    score: 'score',
    questionsCorrect: 'questionsCorrect',
    questionsTotal: 'questionsTotal',
    readingCompCorrect: 'readingCompCorrect',
    readingCompTotal: 'readingCompTotal',
    keywordsMastered: 'keywordsMastered',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WeekProgressScalarFieldEnum = (typeof WeekProgressScalarFieldEnum)[keyof typeof WeekProgressScalarFieldEnum]


  export const ClassScalarFieldEnum: {
    id: 'id',
    name: 'name',
    teacherId: 'teacherId',
    grade: 'grade',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClassScalarFieldEnum = (typeof ClassScalarFieldEnum)[keyof typeof ClassScalarFieldEnum]


  export const EnrollmentScalarFieldEnum: {
    id: 'id',
    classId: 'classId',
    studentId: 'studentId',
    enrolledAt: 'enrolledAt',
    parentEmail: 'parentEmail',
    parentPhone: 'parentPhone',
    importBatchId: 'importBatchId',
    comments: 'comments'
  };

  export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum]


  export const QuizSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    grade: 'grade',
    subject: 'subject',
    weekId: 'weekId',
    difficulty: 'difficulty',
    currentQuestionIndex: 'currentQuestionIndex',
    selectedAnswer: 'selectedAnswer',
    isAnswered: 'isAnswered',
    isCorrect: 'isCorrect',
    timeRemaining: 'timeRemaining',
    livesRemaining: 'livesRemaining',
    scoreThisQuestion: 'scoreThisQuestion',
    correctCount: 'correctCount',
    speedBonusCount: 'speedBonusCount',
    answersHistory: 'answersHistory',
    status: 'status',
    startedAt: 'startedAt',
    completedAt: 'completedAt'
  };

  export type QuizSessionScalarFieldEnum = (typeof QuizSessionScalarFieldEnum)[keyof typeof QuizSessionScalarFieldEnum]


  export const ImportBatchScalarFieldEnum: {
    id: 'id',
    teacherId: 'teacherId',
    classId: 'classId',
    fileName: 'fileName',
    recordsCount: 'recordsCount',
    successCount: 'successCount',
    failureCount: 'failureCount',
    errorLog: 'errorLog',
    createdAt: 'createdAt'
  };

  export type ImportBatchScalarFieldEnum = (typeof ImportBatchScalarFieldEnum)[keyof typeof ImportBatchScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    studentProgress?: StudentProgressListRelationFilter
    teacherClasses?: ClassListRelationFilter
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    enrollments?: EnrollmentListRelationFilter
    quizSessions?: QuizSessionListRelationFilter
    importBatches?: ImportBatchListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentProgress?: StudentProgressOrderByRelationAggregateInput
    teacherClasses?: ClassOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    enrollments?: EnrollmentOrderByRelationAggregateInput
    quizSessions?: QuizSessionOrderByRelationAggregateInput
    importBatches?: ImportBatchOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    studentProgress?: StudentProgressListRelationFilter
    teacherClasses?: ClassListRelationFilter
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    enrollments?: EnrollmentListRelationFilter
    quizSessions?: QuizSessionListRelationFilter
    importBatches?: ImportBatchListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type StudentProgressWhereInput = {
    AND?: StudentProgressWhereInput | StudentProgressWhereInput[]
    OR?: StudentProgressWhereInput[]
    NOT?: StudentProgressWhereInput | StudentProgressWhereInput[]
    id?: StringFilter<"StudentProgress"> | string
    userId?: StringFilter<"StudentProgress"> | string
    grade?: StringFilter<"StudentProgress"> | string
    subject?: StringFilter<"StudentProgress"> | string
    difficulty?: StringFilter<"StudentProgress"> | string
    totalScore?: IntFilter<"StudentProgress"> | number
    overallProgress?: FloatFilter<"StudentProgress"> | number
    currentPlantStage?: StringFilter<"StudentProgress"> | string
    createdAt?: DateTimeFilter<"StudentProgress"> | Date | string
    updatedAt?: DateTimeFilter<"StudentProgress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    weekProgress?: WeekProgressListRelationFilter
  }

  export type StudentProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    subject?: SortOrder
    difficulty?: SortOrder
    totalScore?: SortOrder
    overallProgress?: SortOrder
    currentPlantStage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    weekProgress?: WeekProgressOrderByRelationAggregateInput
  }

  export type StudentProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_grade_subject?: StudentProgressUserId_grade_subjectCompoundUniqueInput
    AND?: StudentProgressWhereInput | StudentProgressWhereInput[]
    OR?: StudentProgressWhereInput[]
    NOT?: StudentProgressWhereInput | StudentProgressWhereInput[]
    userId?: StringFilter<"StudentProgress"> | string
    grade?: StringFilter<"StudentProgress"> | string
    subject?: StringFilter<"StudentProgress"> | string
    difficulty?: StringFilter<"StudentProgress"> | string
    totalScore?: IntFilter<"StudentProgress"> | number
    overallProgress?: FloatFilter<"StudentProgress"> | number
    currentPlantStage?: StringFilter<"StudentProgress"> | string
    createdAt?: DateTimeFilter<"StudentProgress"> | Date | string
    updatedAt?: DateTimeFilter<"StudentProgress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    weekProgress?: WeekProgressListRelationFilter
  }, "id" | "userId_grade_subject">

  export type StudentProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    subject?: SortOrder
    difficulty?: SortOrder
    totalScore?: SortOrder
    overallProgress?: SortOrder
    currentPlantStage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentProgressCountOrderByAggregateInput
    _avg?: StudentProgressAvgOrderByAggregateInput
    _max?: StudentProgressMaxOrderByAggregateInput
    _min?: StudentProgressMinOrderByAggregateInput
    _sum?: StudentProgressSumOrderByAggregateInput
  }

  export type StudentProgressScalarWhereWithAggregatesInput = {
    AND?: StudentProgressScalarWhereWithAggregatesInput | StudentProgressScalarWhereWithAggregatesInput[]
    OR?: StudentProgressScalarWhereWithAggregatesInput[]
    NOT?: StudentProgressScalarWhereWithAggregatesInput | StudentProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudentProgress"> | string
    userId?: StringWithAggregatesFilter<"StudentProgress"> | string
    grade?: StringWithAggregatesFilter<"StudentProgress"> | string
    subject?: StringWithAggregatesFilter<"StudentProgress"> | string
    difficulty?: StringWithAggregatesFilter<"StudentProgress"> | string
    totalScore?: IntWithAggregatesFilter<"StudentProgress"> | number
    overallProgress?: FloatWithAggregatesFilter<"StudentProgress"> | number
    currentPlantStage?: StringWithAggregatesFilter<"StudentProgress"> | string
    createdAt?: DateTimeWithAggregatesFilter<"StudentProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StudentProgress"> | Date | string
  }

  export type WeekProgressWhereInput = {
    AND?: WeekProgressWhereInput | WeekProgressWhereInput[]
    OR?: WeekProgressWhereInput[]
    NOT?: WeekProgressWhereInput | WeekProgressWhereInput[]
    id?: StringFilter<"WeekProgress"> | string
    studentProgressId?: StringFilter<"WeekProgress"> | string
    weekId?: IntFilter<"WeekProgress"> | number
    completed?: BoolFilter<"WeekProgress"> | boolean
    locked?: BoolFilter<"WeekProgress"> | boolean
    score?: IntFilter<"WeekProgress"> | number
    questionsCorrect?: IntFilter<"WeekProgress"> | number
    questionsTotal?: IntFilter<"WeekProgress"> | number
    readingCompCorrect?: IntFilter<"WeekProgress"> | number
    readingCompTotal?: IntFilter<"WeekProgress"> | number
    keywordsMastered?: StringFilter<"WeekProgress"> | string
    createdAt?: DateTimeFilter<"WeekProgress"> | Date | string
    updatedAt?: DateTimeFilter<"WeekProgress"> | Date | string
    studentProgress?: XOR<StudentProgressScalarRelationFilter, StudentProgressWhereInput>
  }

  export type WeekProgressOrderByWithRelationInput = {
    id?: SortOrder
    studentProgressId?: SortOrder
    weekId?: SortOrder
    completed?: SortOrder
    locked?: SortOrder
    score?: SortOrder
    questionsCorrect?: SortOrder
    questionsTotal?: SortOrder
    readingCompCorrect?: SortOrder
    readingCompTotal?: SortOrder
    keywordsMastered?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentProgress?: StudentProgressOrderByWithRelationInput
  }

  export type WeekProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentProgressId_weekId?: WeekProgressStudentProgressIdWeekIdCompoundUniqueInput
    AND?: WeekProgressWhereInput | WeekProgressWhereInput[]
    OR?: WeekProgressWhereInput[]
    NOT?: WeekProgressWhereInput | WeekProgressWhereInput[]
    studentProgressId?: StringFilter<"WeekProgress"> | string
    weekId?: IntFilter<"WeekProgress"> | number
    completed?: BoolFilter<"WeekProgress"> | boolean
    locked?: BoolFilter<"WeekProgress"> | boolean
    score?: IntFilter<"WeekProgress"> | number
    questionsCorrect?: IntFilter<"WeekProgress"> | number
    questionsTotal?: IntFilter<"WeekProgress"> | number
    readingCompCorrect?: IntFilter<"WeekProgress"> | number
    readingCompTotal?: IntFilter<"WeekProgress"> | number
    keywordsMastered?: StringFilter<"WeekProgress"> | string
    createdAt?: DateTimeFilter<"WeekProgress"> | Date | string
    updatedAt?: DateTimeFilter<"WeekProgress"> | Date | string
    studentProgress?: XOR<StudentProgressScalarRelationFilter, StudentProgressWhereInput>
  }, "id" | "studentProgressId_weekId">

  export type WeekProgressOrderByWithAggregationInput = {
    id?: SortOrder
    studentProgressId?: SortOrder
    weekId?: SortOrder
    completed?: SortOrder
    locked?: SortOrder
    score?: SortOrder
    questionsCorrect?: SortOrder
    questionsTotal?: SortOrder
    readingCompCorrect?: SortOrder
    readingCompTotal?: SortOrder
    keywordsMastered?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WeekProgressCountOrderByAggregateInput
    _avg?: WeekProgressAvgOrderByAggregateInput
    _max?: WeekProgressMaxOrderByAggregateInput
    _min?: WeekProgressMinOrderByAggregateInput
    _sum?: WeekProgressSumOrderByAggregateInput
  }

  export type WeekProgressScalarWhereWithAggregatesInput = {
    AND?: WeekProgressScalarWhereWithAggregatesInput | WeekProgressScalarWhereWithAggregatesInput[]
    OR?: WeekProgressScalarWhereWithAggregatesInput[]
    NOT?: WeekProgressScalarWhereWithAggregatesInput | WeekProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeekProgress"> | string
    studentProgressId?: StringWithAggregatesFilter<"WeekProgress"> | string
    weekId?: IntWithAggregatesFilter<"WeekProgress"> | number
    completed?: BoolWithAggregatesFilter<"WeekProgress"> | boolean
    locked?: BoolWithAggregatesFilter<"WeekProgress"> | boolean
    score?: IntWithAggregatesFilter<"WeekProgress"> | number
    questionsCorrect?: IntWithAggregatesFilter<"WeekProgress"> | number
    questionsTotal?: IntWithAggregatesFilter<"WeekProgress"> | number
    readingCompCorrect?: IntWithAggregatesFilter<"WeekProgress"> | number
    readingCompTotal?: IntWithAggregatesFilter<"WeekProgress"> | number
    keywordsMastered?: StringWithAggregatesFilter<"WeekProgress"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WeekProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WeekProgress"> | Date | string
  }

  export type ClassWhereInput = {
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    id?: StringFilter<"Class"> | string
    name?: StringFilter<"Class"> | string
    teacherId?: StringFilter<"Class"> | string
    grade?: StringFilter<"Class"> | string
    createdAt?: DateTimeFilter<"Class"> | Date | string
    updatedAt?: DateTimeFilter<"Class"> | Date | string
    teacher?: XOR<UserScalarRelationFilter, UserWhereInput>
    enrollments?: EnrollmentListRelationFilter
    importBatches?: ImportBatchListRelationFilter
  }

  export type ClassOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    teacherId?: SortOrder
    grade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teacher?: UserOrderByWithRelationInput
    enrollments?: EnrollmentOrderByRelationAggregateInput
    importBatches?: ImportBatchOrderByRelationAggregateInput
  }

  export type ClassWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    name?: StringFilter<"Class"> | string
    teacherId?: StringFilter<"Class"> | string
    grade?: StringFilter<"Class"> | string
    createdAt?: DateTimeFilter<"Class"> | Date | string
    updatedAt?: DateTimeFilter<"Class"> | Date | string
    teacher?: XOR<UserScalarRelationFilter, UserWhereInput>
    enrollments?: EnrollmentListRelationFilter
    importBatches?: ImportBatchListRelationFilter
  }, "id">

  export type ClassOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    teacherId?: SortOrder
    grade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClassCountOrderByAggregateInput
    _max?: ClassMaxOrderByAggregateInput
    _min?: ClassMinOrderByAggregateInput
  }

  export type ClassScalarWhereWithAggregatesInput = {
    AND?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    OR?: ClassScalarWhereWithAggregatesInput[]
    NOT?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Class"> | string
    name?: StringWithAggregatesFilter<"Class"> | string
    teacherId?: StringWithAggregatesFilter<"Class"> | string
    grade?: StringWithAggregatesFilter<"Class"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Class"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Class"> | Date | string
  }

  export type EnrollmentWhereInput = {
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    id?: StringFilter<"Enrollment"> | string
    classId?: StringFilter<"Enrollment"> | string
    studentId?: StringFilter<"Enrollment"> | string
    enrolledAt?: DateTimeFilter<"Enrollment"> | Date | string
    parentEmail?: StringNullableFilter<"Enrollment"> | string | null
    parentPhone?: StringNullableFilter<"Enrollment"> | string | null
    importBatchId?: StringNullableFilter<"Enrollment"> | string | null
    comments?: StringNullableFilter<"Enrollment"> | string | null
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    importBatch?: XOR<ImportBatchNullableScalarRelationFilter, ImportBatchWhereInput> | null
  }

  export type EnrollmentOrderByWithRelationInput = {
    id?: SortOrder
    classId?: SortOrder
    studentId?: SortOrder
    enrolledAt?: SortOrder
    parentEmail?: SortOrderInput | SortOrder
    parentPhone?: SortOrderInput | SortOrder
    importBatchId?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    class?: ClassOrderByWithRelationInput
    student?: UserOrderByWithRelationInput
    importBatch?: ImportBatchOrderByWithRelationInput
  }

  export type EnrollmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    classId_studentId?: EnrollmentClassIdStudentIdCompoundUniqueInput
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    classId?: StringFilter<"Enrollment"> | string
    studentId?: StringFilter<"Enrollment"> | string
    enrolledAt?: DateTimeFilter<"Enrollment"> | Date | string
    parentEmail?: StringNullableFilter<"Enrollment"> | string | null
    parentPhone?: StringNullableFilter<"Enrollment"> | string | null
    importBatchId?: StringNullableFilter<"Enrollment"> | string | null
    comments?: StringNullableFilter<"Enrollment"> | string | null
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    importBatch?: XOR<ImportBatchNullableScalarRelationFilter, ImportBatchWhereInput> | null
  }, "id" | "classId_studentId">

  export type EnrollmentOrderByWithAggregationInput = {
    id?: SortOrder
    classId?: SortOrder
    studentId?: SortOrder
    enrolledAt?: SortOrder
    parentEmail?: SortOrderInput | SortOrder
    parentPhone?: SortOrderInput | SortOrder
    importBatchId?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    _count?: EnrollmentCountOrderByAggregateInput
    _max?: EnrollmentMaxOrderByAggregateInput
    _min?: EnrollmentMinOrderByAggregateInput
  }

  export type EnrollmentScalarWhereWithAggregatesInput = {
    AND?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    OR?: EnrollmentScalarWhereWithAggregatesInput[]
    NOT?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Enrollment"> | string
    classId?: StringWithAggregatesFilter<"Enrollment"> | string
    studentId?: StringWithAggregatesFilter<"Enrollment"> | string
    enrolledAt?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string
    parentEmail?: StringNullableWithAggregatesFilter<"Enrollment"> | string | null
    parentPhone?: StringNullableWithAggregatesFilter<"Enrollment"> | string | null
    importBatchId?: StringNullableWithAggregatesFilter<"Enrollment"> | string | null
    comments?: StringNullableWithAggregatesFilter<"Enrollment"> | string | null
  }

  export type QuizSessionWhereInput = {
    AND?: QuizSessionWhereInput | QuizSessionWhereInput[]
    OR?: QuizSessionWhereInput[]
    NOT?: QuizSessionWhereInput | QuizSessionWhereInput[]
    id?: StringFilter<"QuizSession"> | string
    userId?: StringFilter<"QuizSession"> | string
    grade?: StringFilter<"QuizSession"> | string
    subject?: StringFilter<"QuizSession"> | string
    weekId?: IntFilter<"QuizSession"> | number
    difficulty?: StringFilter<"QuizSession"> | string
    currentQuestionIndex?: IntFilter<"QuizSession"> | number
    selectedAnswer?: StringNullableFilter<"QuizSession"> | string | null
    isAnswered?: BoolFilter<"QuizSession"> | boolean
    isCorrect?: BoolFilter<"QuizSession"> | boolean
    timeRemaining?: IntFilter<"QuizSession"> | number
    livesRemaining?: IntFilter<"QuizSession"> | number
    scoreThisQuestion?: IntFilter<"QuizSession"> | number
    correctCount?: IntFilter<"QuizSession"> | number
    speedBonusCount?: IntFilter<"QuizSession"> | number
    answersHistory?: StringFilter<"QuizSession"> | string
    status?: StringFilter<"QuizSession"> | string
    startedAt?: DateTimeFilter<"QuizSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"QuizSession"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type QuizSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    subject?: SortOrder
    weekId?: SortOrder
    difficulty?: SortOrder
    currentQuestionIndex?: SortOrder
    selectedAnswer?: SortOrderInput | SortOrder
    isAnswered?: SortOrder
    isCorrect?: SortOrder
    timeRemaining?: SortOrder
    livesRemaining?: SortOrder
    scoreThisQuestion?: SortOrder
    correctCount?: SortOrder
    speedBonusCount?: SortOrder
    answersHistory?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type QuizSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuizSessionWhereInput | QuizSessionWhereInput[]
    OR?: QuizSessionWhereInput[]
    NOT?: QuizSessionWhereInput | QuizSessionWhereInput[]
    userId?: StringFilter<"QuizSession"> | string
    grade?: StringFilter<"QuizSession"> | string
    subject?: StringFilter<"QuizSession"> | string
    weekId?: IntFilter<"QuizSession"> | number
    difficulty?: StringFilter<"QuizSession"> | string
    currentQuestionIndex?: IntFilter<"QuizSession"> | number
    selectedAnswer?: StringNullableFilter<"QuizSession"> | string | null
    isAnswered?: BoolFilter<"QuizSession"> | boolean
    isCorrect?: BoolFilter<"QuizSession"> | boolean
    timeRemaining?: IntFilter<"QuizSession"> | number
    livesRemaining?: IntFilter<"QuizSession"> | number
    scoreThisQuestion?: IntFilter<"QuizSession"> | number
    correctCount?: IntFilter<"QuizSession"> | number
    speedBonusCount?: IntFilter<"QuizSession"> | number
    answersHistory?: StringFilter<"QuizSession"> | string
    status?: StringFilter<"QuizSession"> | string
    startedAt?: DateTimeFilter<"QuizSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"QuizSession"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type QuizSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    subject?: SortOrder
    weekId?: SortOrder
    difficulty?: SortOrder
    currentQuestionIndex?: SortOrder
    selectedAnswer?: SortOrderInput | SortOrder
    isAnswered?: SortOrder
    isCorrect?: SortOrder
    timeRemaining?: SortOrder
    livesRemaining?: SortOrder
    scoreThisQuestion?: SortOrder
    correctCount?: SortOrder
    speedBonusCount?: SortOrder
    answersHistory?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: QuizSessionCountOrderByAggregateInput
    _avg?: QuizSessionAvgOrderByAggregateInput
    _max?: QuizSessionMaxOrderByAggregateInput
    _min?: QuizSessionMinOrderByAggregateInput
    _sum?: QuizSessionSumOrderByAggregateInput
  }

  export type QuizSessionScalarWhereWithAggregatesInput = {
    AND?: QuizSessionScalarWhereWithAggregatesInput | QuizSessionScalarWhereWithAggregatesInput[]
    OR?: QuizSessionScalarWhereWithAggregatesInput[]
    NOT?: QuizSessionScalarWhereWithAggregatesInput | QuizSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuizSession"> | string
    userId?: StringWithAggregatesFilter<"QuizSession"> | string
    grade?: StringWithAggregatesFilter<"QuizSession"> | string
    subject?: StringWithAggregatesFilter<"QuizSession"> | string
    weekId?: IntWithAggregatesFilter<"QuizSession"> | number
    difficulty?: StringWithAggregatesFilter<"QuizSession"> | string
    currentQuestionIndex?: IntWithAggregatesFilter<"QuizSession"> | number
    selectedAnswer?: StringNullableWithAggregatesFilter<"QuizSession"> | string | null
    isAnswered?: BoolWithAggregatesFilter<"QuizSession"> | boolean
    isCorrect?: BoolWithAggregatesFilter<"QuizSession"> | boolean
    timeRemaining?: IntWithAggregatesFilter<"QuizSession"> | number
    livesRemaining?: IntWithAggregatesFilter<"QuizSession"> | number
    scoreThisQuestion?: IntWithAggregatesFilter<"QuizSession"> | number
    correctCount?: IntWithAggregatesFilter<"QuizSession"> | number
    speedBonusCount?: IntWithAggregatesFilter<"QuizSession"> | number
    answersHistory?: StringWithAggregatesFilter<"QuizSession"> | string
    status?: StringWithAggregatesFilter<"QuizSession"> | string
    startedAt?: DateTimeWithAggregatesFilter<"QuizSession"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"QuizSession"> | Date | string | null
  }

  export type ImportBatchWhereInput = {
    AND?: ImportBatchWhereInput | ImportBatchWhereInput[]
    OR?: ImportBatchWhereInput[]
    NOT?: ImportBatchWhereInput | ImportBatchWhereInput[]
    id?: StringFilter<"ImportBatch"> | string
    teacherId?: StringFilter<"ImportBatch"> | string
    classId?: StringFilter<"ImportBatch"> | string
    fileName?: StringFilter<"ImportBatch"> | string
    recordsCount?: IntFilter<"ImportBatch"> | number
    successCount?: IntFilter<"ImportBatch"> | number
    failureCount?: IntFilter<"ImportBatch"> | number
    errorLog?: StringNullableFilter<"ImportBatch"> | string | null
    createdAt?: DateTimeFilter<"ImportBatch"> | Date | string
    teacher?: XOR<UserScalarRelationFilter, UserWhereInput>
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    enrollments?: EnrollmentListRelationFilter
  }

  export type ImportBatchOrderByWithRelationInput = {
    id?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
    fileName?: SortOrder
    recordsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    errorLog?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    teacher?: UserOrderByWithRelationInput
    class?: ClassOrderByWithRelationInput
    enrollments?: EnrollmentOrderByRelationAggregateInput
  }

  export type ImportBatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ImportBatchWhereInput | ImportBatchWhereInput[]
    OR?: ImportBatchWhereInput[]
    NOT?: ImportBatchWhereInput | ImportBatchWhereInput[]
    teacherId?: StringFilter<"ImportBatch"> | string
    classId?: StringFilter<"ImportBatch"> | string
    fileName?: StringFilter<"ImportBatch"> | string
    recordsCount?: IntFilter<"ImportBatch"> | number
    successCount?: IntFilter<"ImportBatch"> | number
    failureCount?: IntFilter<"ImportBatch"> | number
    errorLog?: StringNullableFilter<"ImportBatch"> | string | null
    createdAt?: DateTimeFilter<"ImportBatch"> | Date | string
    teacher?: XOR<UserScalarRelationFilter, UserWhereInput>
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    enrollments?: EnrollmentListRelationFilter
  }, "id">

  export type ImportBatchOrderByWithAggregationInput = {
    id?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
    fileName?: SortOrder
    recordsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    errorLog?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ImportBatchCountOrderByAggregateInput
    _avg?: ImportBatchAvgOrderByAggregateInput
    _max?: ImportBatchMaxOrderByAggregateInput
    _min?: ImportBatchMinOrderByAggregateInput
    _sum?: ImportBatchSumOrderByAggregateInput
  }

  export type ImportBatchScalarWhereWithAggregatesInput = {
    AND?: ImportBatchScalarWhereWithAggregatesInput | ImportBatchScalarWhereWithAggregatesInput[]
    OR?: ImportBatchScalarWhereWithAggregatesInput[]
    NOT?: ImportBatchScalarWhereWithAggregatesInput | ImportBatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ImportBatch"> | string
    teacherId?: StringWithAggregatesFilter<"ImportBatch"> | string
    classId?: StringWithAggregatesFilter<"ImportBatch"> | string
    fileName?: StringWithAggregatesFilter<"ImportBatch"> | string
    recordsCount?: IntWithAggregatesFilter<"ImportBatch"> | number
    successCount?: IntWithAggregatesFilter<"ImportBatch"> | number
    failureCount?: IntWithAggregatesFilter<"ImportBatch"> | number
    errorLog?: StringNullableWithAggregatesFilter<"ImportBatch"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ImportBatch"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressCreateNestedManyWithoutUserInput
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    quizSessions?: QuizSessionCreateNestedManyWithoutUserInput
    importBatches?: ImportBatchCreateNestedManyWithoutTeacherInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressUncheckedCreateNestedManyWithoutUserInput
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    quizSessions?: QuizSessionUncheckedCreateNestedManyWithoutUserInput
    importBatches?: ImportBatchUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUpdateManyWithoutUserNestedInput
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    quizSessions?: QuizSessionUpdateManyWithoutUserNestedInput
    importBatches?: ImportBatchUpdateManyWithoutTeacherNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUncheckedUpdateManyWithoutUserNestedInput
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    quizSessions?: QuizSessionUncheckedUpdateManyWithoutUserNestedInput
    importBatches?: ImportBatchUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentProgressCreateInput = {
    id?: string
    grade: string
    subject: string
    difficulty?: string
    totalScore?: number
    overallProgress?: number
    currentPlantStage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStudentProgressInput
    weekProgress?: WeekProgressCreateNestedManyWithoutStudentProgressInput
  }

  export type StudentProgressUncheckedCreateInput = {
    id?: string
    userId: string
    grade: string
    subject: string
    difficulty?: string
    totalScore?: number
    overallProgress?: number
    currentPlantStage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weekProgress?: WeekProgressUncheckedCreateNestedManyWithoutStudentProgressInput
  }

  export type StudentProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    totalScore?: IntFieldUpdateOperationsInput | number
    overallProgress?: FloatFieldUpdateOperationsInput | number
    currentPlantStage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStudentProgressNestedInput
    weekProgress?: WeekProgressUpdateManyWithoutStudentProgressNestedInput
  }

  export type StudentProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    totalScore?: IntFieldUpdateOperationsInput | number
    overallProgress?: FloatFieldUpdateOperationsInput | number
    currentPlantStage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weekProgress?: WeekProgressUncheckedUpdateManyWithoutStudentProgressNestedInput
  }

  export type StudentProgressCreateManyInput = {
    id?: string
    userId: string
    grade: string
    subject: string
    difficulty?: string
    totalScore?: number
    overallProgress?: number
    currentPlantStage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    totalScore?: IntFieldUpdateOperationsInput | number
    overallProgress?: FloatFieldUpdateOperationsInput | number
    currentPlantStage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    totalScore?: IntFieldUpdateOperationsInput | number
    overallProgress?: FloatFieldUpdateOperationsInput | number
    currentPlantStage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeekProgressCreateInput = {
    id?: string
    weekId: number
    completed?: boolean
    locked?: boolean
    score?: number
    questionsCorrect?: number
    questionsTotal?: number
    readingCompCorrect?: number
    readingCompTotal?: number
    keywordsMastered: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress: StudentProgressCreateNestedOneWithoutWeekProgressInput
  }

  export type WeekProgressUncheckedCreateInput = {
    id?: string
    studentProgressId: string
    weekId: number
    completed?: boolean
    locked?: boolean
    score?: number
    questionsCorrect?: number
    questionsTotal?: number
    readingCompCorrect?: number
    readingCompTotal?: number
    keywordsMastered: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeekProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    locked?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    questionsCorrect?: IntFieldUpdateOperationsInput | number
    questionsTotal?: IntFieldUpdateOperationsInput | number
    readingCompCorrect?: IntFieldUpdateOperationsInput | number
    readingCompTotal?: IntFieldUpdateOperationsInput | number
    keywordsMastered?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUpdateOneRequiredWithoutWeekProgressNestedInput
  }

  export type WeekProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentProgressId?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    locked?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    questionsCorrect?: IntFieldUpdateOperationsInput | number
    questionsTotal?: IntFieldUpdateOperationsInput | number
    readingCompCorrect?: IntFieldUpdateOperationsInput | number
    readingCompTotal?: IntFieldUpdateOperationsInput | number
    keywordsMastered?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeekProgressCreateManyInput = {
    id?: string
    studentProgressId: string
    weekId: number
    completed?: boolean
    locked?: boolean
    score?: number
    questionsCorrect?: number
    questionsTotal?: number
    readingCompCorrect?: number
    readingCompTotal?: number
    keywordsMastered: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeekProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    locked?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    questionsCorrect?: IntFieldUpdateOperationsInput | number
    questionsTotal?: IntFieldUpdateOperationsInput | number
    readingCompCorrect?: IntFieldUpdateOperationsInput | number
    readingCompTotal?: IntFieldUpdateOperationsInput | number
    keywordsMastered?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeekProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentProgressId?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    locked?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    questionsCorrect?: IntFieldUpdateOperationsInput | number
    questionsTotal?: IntFieldUpdateOperationsInput | number
    readingCompCorrect?: IntFieldUpdateOperationsInput | number
    readingCompTotal?: IntFieldUpdateOperationsInput | number
    keywordsMastered?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassCreateInput = {
    id?: string
    name: string
    grade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher: UserCreateNestedOneWithoutTeacherClassesInput
    enrollments?: EnrollmentCreateNestedManyWithoutClassInput
    importBatches?: ImportBatchCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateInput = {
    id?: string
    name: string
    teacherId: string
    grade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutClassInput
    importBatches?: ImportBatchUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutTeacherClassesNestedInput
    enrollments?: EnrollmentUpdateManyWithoutClassNestedInput
    importBatches?: ImportBatchUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutClassNestedInput
    importBatches?: ImportBatchUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassCreateManyInput = {
    id?: string
    name: string
    teacherId: string
    grade: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClassUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateInput = {
    id?: string
    enrolledAt?: Date | string
    parentEmail?: string | null
    parentPhone?: string | null
    comments?: string | null
    class: ClassCreateNestedOneWithoutEnrollmentsInput
    student: UserCreateNestedOneWithoutEnrollmentsInput
    importBatch?: ImportBatchCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateInput = {
    id?: string
    classId: string
    studentId: string
    enrolledAt?: Date | string
    parentEmail?: string | null
    parentPhone?: string | null
    importBatchId?: string | null
    comments?: string | null
  }

  export type EnrollmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    class?: ClassUpdateOneRequiredWithoutEnrollmentsNestedInput
    student?: UserUpdateOneRequiredWithoutEnrollmentsNestedInput
    importBatch?: ImportBatchUpdateOneWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnrollmentCreateManyInput = {
    id?: string
    classId: string
    studentId: string
    enrolledAt?: Date | string
    parentEmail?: string | null
    parentPhone?: string | null
    importBatchId?: string | null
    comments?: string | null
  }

  export type EnrollmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnrollmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuizSessionCreateInput = {
    id?: string
    grade: string
    subject: string
    weekId: number
    difficulty: string
    currentQuestionIndex?: number
    selectedAnswer?: string | null
    isAnswered?: boolean
    isCorrect?: boolean
    timeRemaining?: number
    livesRemaining?: number
    scoreThisQuestion?: number
    correctCount?: number
    speedBonusCount?: number
    answersHistory: string
    status?: string
    startedAt?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutQuizSessionsInput
  }

  export type QuizSessionUncheckedCreateInput = {
    id?: string
    userId: string
    grade: string
    subject: string
    weekId: number
    difficulty: string
    currentQuestionIndex?: number
    selectedAnswer?: string | null
    isAnswered?: boolean
    isCorrect?: boolean
    timeRemaining?: number
    livesRemaining?: number
    scoreThisQuestion?: number
    correctCount?: number
    speedBonusCount?: number
    answersHistory: string
    status?: string
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type QuizSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    currentQuestionIndex?: IntFieldUpdateOperationsInput | number
    selectedAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    timeRemaining?: IntFieldUpdateOperationsInput | number
    livesRemaining?: IntFieldUpdateOperationsInput | number
    scoreThisQuestion?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    speedBonusCount?: IntFieldUpdateOperationsInput | number
    answersHistory?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutQuizSessionsNestedInput
  }

  export type QuizSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    currentQuestionIndex?: IntFieldUpdateOperationsInput | number
    selectedAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    timeRemaining?: IntFieldUpdateOperationsInput | number
    livesRemaining?: IntFieldUpdateOperationsInput | number
    scoreThisQuestion?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    speedBonusCount?: IntFieldUpdateOperationsInput | number
    answersHistory?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuizSessionCreateManyInput = {
    id?: string
    userId: string
    grade: string
    subject: string
    weekId: number
    difficulty: string
    currentQuestionIndex?: number
    selectedAnswer?: string | null
    isAnswered?: boolean
    isCorrect?: boolean
    timeRemaining?: number
    livesRemaining?: number
    scoreThisQuestion?: number
    correctCount?: number
    speedBonusCount?: number
    answersHistory: string
    status?: string
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type QuizSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    currentQuestionIndex?: IntFieldUpdateOperationsInput | number
    selectedAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    timeRemaining?: IntFieldUpdateOperationsInput | number
    livesRemaining?: IntFieldUpdateOperationsInput | number
    scoreThisQuestion?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    speedBonusCount?: IntFieldUpdateOperationsInput | number
    answersHistory?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuizSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    currentQuestionIndex?: IntFieldUpdateOperationsInput | number
    selectedAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    timeRemaining?: IntFieldUpdateOperationsInput | number
    livesRemaining?: IntFieldUpdateOperationsInput | number
    scoreThisQuestion?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    speedBonusCount?: IntFieldUpdateOperationsInput | number
    answersHistory?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ImportBatchCreateInput = {
    id?: string
    fileName: string
    recordsCount: number
    successCount: number
    failureCount: number
    errorLog?: string | null
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutImportBatchesInput
    class: ClassCreateNestedOneWithoutImportBatchesInput
    enrollments?: EnrollmentCreateNestedManyWithoutImportBatchInput
  }

  export type ImportBatchUncheckedCreateInput = {
    id?: string
    teacherId: string
    classId: string
    fileName: string
    recordsCount: number
    successCount: number
    failureCount: number
    errorLog?: string | null
    createdAt?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutImportBatchInput
  }

  export type ImportBatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    recordsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutImportBatchesNestedInput
    class?: ClassUpdateOneRequiredWithoutImportBatchesNestedInput
    enrollments?: EnrollmentUpdateManyWithoutImportBatchNestedInput
  }

  export type ImportBatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    recordsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutImportBatchNestedInput
  }

  export type ImportBatchCreateManyInput = {
    id?: string
    teacherId: string
    classId: string
    fileName: string
    recordsCount: number
    successCount: number
    failureCount: number
    errorLog?: string | null
    createdAt?: Date | string
  }

  export type ImportBatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    recordsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportBatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    recordsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StudentProgressListRelationFilter = {
    every?: StudentProgressWhereInput
    some?: StudentProgressWhereInput
    none?: StudentProgressWhereInput
  }

  export type ClassListRelationFilter = {
    every?: ClassWhereInput
    some?: ClassWhereInput
    none?: ClassWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type EnrollmentListRelationFilter = {
    every?: EnrollmentWhereInput
    some?: EnrollmentWhereInput
    none?: EnrollmentWhereInput
  }

  export type QuizSessionListRelationFilter = {
    every?: QuizSessionWhereInput
    some?: QuizSessionWhereInput
    none?: QuizSessionWhereInput
  }

  export type ImportBatchListRelationFilter = {
    every?: ImportBatchWhereInput
    some?: ImportBatchWhereInput
    none?: ImportBatchWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StudentProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClassOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EnrollmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuizSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ImportBatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type WeekProgressListRelationFilter = {
    every?: WeekProgressWhereInput
    some?: WeekProgressWhereInput
    none?: WeekProgressWhereInput
  }

  export type WeekProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentProgressUserId_grade_subjectCompoundUniqueInput = {
    userId: string
    grade: string
    subject: string
  }

  export type StudentProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    subject?: SortOrder
    difficulty?: SortOrder
    totalScore?: SortOrder
    overallProgress?: SortOrder
    currentPlantStage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentProgressAvgOrderByAggregateInput = {
    totalScore?: SortOrder
    overallProgress?: SortOrder
  }

  export type StudentProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    subject?: SortOrder
    difficulty?: SortOrder
    totalScore?: SortOrder
    overallProgress?: SortOrder
    currentPlantStage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    subject?: SortOrder
    difficulty?: SortOrder
    totalScore?: SortOrder
    overallProgress?: SortOrder
    currentPlantStage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentProgressSumOrderByAggregateInput = {
    totalScore?: SortOrder
    overallProgress?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StudentProgressScalarRelationFilter = {
    is?: StudentProgressWhereInput
    isNot?: StudentProgressWhereInput
  }

  export type WeekProgressStudentProgressIdWeekIdCompoundUniqueInput = {
    studentProgressId: string
    weekId: number
  }

  export type WeekProgressCountOrderByAggregateInput = {
    id?: SortOrder
    studentProgressId?: SortOrder
    weekId?: SortOrder
    completed?: SortOrder
    locked?: SortOrder
    score?: SortOrder
    questionsCorrect?: SortOrder
    questionsTotal?: SortOrder
    readingCompCorrect?: SortOrder
    readingCompTotal?: SortOrder
    keywordsMastered?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeekProgressAvgOrderByAggregateInput = {
    weekId?: SortOrder
    score?: SortOrder
    questionsCorrect?: SortOrder
    questionsTotal?: SortOrder
    readingCompCorrect?: SortOrder
    readingCompTotal?: SortOrder
  }

  export type WeekProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    studentProgressId?: SortOrder
    weekId?: SortOrder
    completed?: SortOrder
    locked?: SortOrder
    score?: SortOrder
    questionsCorrect?: SortOrder
    questionsTotal?: SortOrder
    readingCompCorrect?: SortOrder
    readingCompTotal?: SortOrder
    keywordsMastered?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeekProgressMinOrderByAggregateInput = {
    id?: SortOrder
    studentProgressId?: SortOrder
    weekId?: SortOrder
    completed?: SortOrder
    locked?: SortOrder
    score?: SortOrder
    questionsCorrect?: SortOrder
    questionsTotal?: SortOrder
    readingCompCorrect?: SortOrder
    readingCompTotal?: SortOrder
    keywordsMastered?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeekProgressSumOrderByAggregateInput = {
    weekId?: SortOrder
    score?: SortOrder
    questionsCorrect?: SortOrder
    questionsTotal?: SortOrder
    readingCompCorrect?: SortOrder
    readingCompTotal?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ClassCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    teacherId?: SortOrder
    grade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    teacherId?: SortOrder
    grade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    teacherId?: SortOrder
    grade?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassScalarRelationFilter = {
    is?: ClassWhereInput
    isNot?: ClassWhereInput
  }

  export type ImportBatchNullableScalarRelationFilter = {
    is?: ImportBatchWhereInput | null
    isNot?: ImportBatchWhereInput | null
  }

  export type EnrollmentClassIdStudentIdCompoundUniqueInput = {
    classId: string
    studentId: string
  }

  export type EnrollmentCountOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    studentId?: SortOrder
    enrolledAt?: SortOrder
    parentEmail?: SortOrder
    parentPhone?: SortOrder
    importBatchId?: SortOrder
    comments?: SortOrder
  }

  export type EnrollmentMaxOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    studentId?: SortOrder
    enrolledAt?: SortOrder
    parentEmail?: SortOrder
    parentPhone?: SortOrder
    importBatchId?: SortOrder
    comments?: SortOrder
  }

  export type EnrollmentMinOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    studentId?: SortOrder
    enrolledAt?: SortOrder
    parentEmail?: SortOrder
    parentPhone?: SortOrder
    importBatchId?: SortOrder
    comments?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type QuizSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    subject?: SortOrder
    weekId?: SortOrder
    difficulty?: SortOrder
    currentQuestionIndex?: SortOrder
    selectedAnswer?: SortOrder
    isAnswered?: SortOrder
    isCorrect?: SortOrder
    timeRemaining?: SortOrder
    livesRemaining?: SortOrder
    scoreThisQuestion?: SortOrder
    correctCount?: SortOrder
    speedBonusCount?: SortOrder
    answersHistory?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type QuizSessionAvgOrderByAggregateInput = {
    weekId?: SortOrder
    currentQuestionIndex?: SortOrder
    timeRemaining?: SortOrder
    livesRemaining?: SortOrder
    scoreThisQuestion?: SortOrder
    correctCount?: SortOrder
    speedBonusCount?: SortOrder
  }

  export type QuizSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    subject?: SortOrder
    weekId?: SortOrder
    difficulty?: SortOrder
    currentQuestionIndex?: SortOrder
    selectedAnswer?: SortOrder
    isAnswered?: SortOrder
    isCorrect?: SortOrder
    timeRemaining?: SortOrder
    livesRemaining?: SortOrder
    scoreThisQuestion?: SortOrder
    correctCount?: SortOrder
    speedBonusCount?: SortOrder
    answersHistory?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type QuizSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    subject?: SortOrder
    weekId?: SortOrder
    difficulty?: SortOrder
    currentQuestionIndex?: SortOrder
    selectedAnswer?: SortOrder
    isAnswered?: SortOrder
    isCorrect?: SortOrder
    timeRemaining?: SortOrder
    livesRemaining?: SortOrder
    scoreThisQuestion?: SortOrder
    correctCount?: SortOrder
    speedBonusCount?: SortOrder
    answersHistory?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type QuizSessionSumOrderByAggregateInput = {
    weekId?: SortOrder
    currentQuestionIndex?: SortOrder
    timeRemaining?: SortOrder
    livesRemaining?: SortOrder
    scoreThisQuestion?: SortOrder
    correctCount?: SortOrder
    speedBonusCount?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ImportBatchCountOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
    fileName?: SortOrder
    recordsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    errorLog?: SortOrder
    createdAt?: SortOrder
  }

  export type ImportBatchAvgOrderByAggregateInput = {
    recordsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
  }

  export type ImportBatchMaxOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
    fileName?: SortOrder
    recordsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    errorLog?: SortOrder
    createdAt?: SortOrder
  }

  export type ImportBatchMinOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
    fileName?: SortOrder
    recordsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    errorLog?: SortOrder
    createdAt?: SortOrder
  }

  export type ImportBatchSumOrderByAggregateInput = {
    recordsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
  }

  export type StudentProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<StudentProgressCreateWithoutUserInput, StudentProgressUncheckedCreateWithoutUserInput> | StudentProgressCreateWithoutUserInput[] | StudentProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StudentProgressCreateOrConnectWithoutUserInput | StudentProgressCreateOrConnectWithoutUserInput[]
    createMany?: StudentProgressCreateManyUserInputEnvelope
    connect?: StudentProgressWhereUniqueInput | StudentProgressWhereUniqueInput[]
  }

  export type ClassCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput> | ClassCreateWithoutTeacherInput[] | ClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutTeacherInput | ClassCreateOrConnectWithoutTeacherInput[]
    createMany?: ClassCreateManyTeacherInputEnvelope
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type EnrollmentCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type QuizSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<QuizSessionCreateWithoutUserInput, QuizSessionUncheckedCreateWithoutUserInput> | QuizSessionCreateWithoutUserInput[] | QuizSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuizSessionCreateOrConnectWithoutUserInput | QuizSessionCreateOrConnectWithoutUserInput[]
    createMany?: QuizSessionCreateManyUserInputEnvelope
    connect?: QuizSessionWhereUniqueInput | QuizSessionWhereUniqueInput[]
  }

  export type ImportBatchCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ImportBatchCreateWithoutTeacherInput, ImportBatchUncheckedCreateWithoutTeacherInput> | ImportBatchCreateWithoutTeacherInput[] | ImportBatchUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ImportBatchCreateOrConnectWithoutTeacherInput | ImportBatchCreateOrConnectWithoutTeacherInput[]
    createMany?: ImportBatchCreateManyTeacherInputEnvelope
    connect?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
  }

  export type StudentProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StudentProgressCreateWithoutUserInput, StudentProgressUncheckedCreateWithoutUserInput> | StudentProgressCreateWithoutUserInput[] | StudentProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StudentProgressCreateOrConnectWithoutUserInput | StudentProgressCreateOrConnectWithoutUserInput[]
    createMany?: StudentProgressCreateManyUserInputEnvelope
    connect?: StudentProgressWhereUniqueInput | StudentProgressWhereUniqueInput[]
  }

  export type ClassUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput> | ClassCreateWithoutTeacherInput[] | ClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutTeacherInput | ClassCreateOrConnectWithoutTeacherInput[]
    createMany?: ClassCreateManyTeacherInputEnvelope
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type QuizSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<QuizSessionCreateWithoutUserInput, QuizSessionUncheckedCreateWithoutUserInput> | QuizSessionCreateWithoutUserInput[] | QuizSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuizSessionCreateOrConnectWithoutUserInput | QuizSessionCreateOrConnectWithoutUserInput[]
    createMany?: QuizSessionCreateManyUserInputEnvelope
    connect?: QuizSessionWhereUniqueInput | QuizSessionWhereUniqueInput[]
  }

  export type ImportBatchUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ImportBatchCreateWithoutTeacherInput, ImportBatchUncheckedCreateWithoutTeacherInput> | ImportBatchCreateWithoutTeacherInput[] | ImportBatchUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ImportBatchCreateOrConnectWithoutTeacherInput | ImportBatchCreateOrConnectWithoutTeacherInput[]
    createMany?: ImportBatchCreateManyTeacherInputEnvelope
    connect?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StudentProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<StudentProgressCreateWithoutUserInput, StudentProgressUncheckedCreateWithoutUserInput> | StudentProgressCreateWithoutUserInput[] | StudentProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StudentProgressCreateOrConnectWithoutUserInput | StudentProgressCreateOrConnectWithoutUserInput[]
    upsert?: StudentProgressUpsertWithWhereUniqueWithoutUserInput | StudentProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StudentProgressCreateManyUserInputEnvelope
    set?: StudentProgressWhereUniqueInput | StudentProgressWhereUniqueInput[]
    disconnect?: StudentProgressWhereUniqueInput | StudentProgressWhereUniqueInput[]
    delete?: StudentProgressWhereUniqueInput | StudentProgressWhereUniqueInput[]
    connect?: StudentProgressWhereUniqueInput | StudentProgressWhereUniqueInput[]
    update?: StudentProgressUpdateWithWhereUniqueWithoutUserInput | StudentProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StudentProgressUpdateManyWithWhereWithoutUserInput | StudentProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StudentProgressScalarWhereInput | StudentProgressScalarWhereInput[]
  }

  export type ClassUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput> | ClassCreateWithoutTeacherInput[] | ClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutTeacherInput | ClassCreateOrConnectWithoutTeacherInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutTeacherInput | ClassUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ClassCreateManyTeacherInputEnvelope
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutTeacherInput | ClassUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutTeacherInput | ClassUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type EnrollmentUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type QuizSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<QuizSessionCreateWithoutUserInput, QuizSessionUncheckedCreateWithoutUserInput> | QuizSessionCreateWithoutUserInput[] | QuizSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuizSessionCreateOrConnectWithoutUserInput | QuizSessionCreateOrConnectWithoutUserInput[]
    upsert?: QuizSessionUpsertWithWhereUniqueWithoutUserInput | QuizSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QuizSessionCreateManyUserInputEnvelope
    set?: QuizSessionWhereUniqueInput | QuizSessionWhereUniqueInput[]
    disconnect?: QuizSessionWhereUniqueInput | QuizSessionWhereUniqueInput[]
    delete?: QuizSessionWhereUniqueInput | QuizSessionWhereUniqueInput[]
    connect?: QuizSessionWhereUniqueInput | QuizSessionWhereUniqueInput[]
    update?: QuizSessionUpdateWithWhereUniqueWithoutUserInput | QuizSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QuizSessionUpdateManyWithWhereWithoutUserInput | QuizSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QuizSessionScalarWhereInput | QuizSessionScalarWhereInput[]
  }

  export type ImportBatchUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ImportBatchCreateWithoutTeacherInput, ImportBatchUncheckedCreateWithoutTeacherInput> | ImportBatchCreateWithoutTeacherInput[] | ImportBatchUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ImportBatchCreateOrConnectWithoutTeacherInput | ImportBatchCreateOrConnectWithoutTeacherInput[]
    upsert?: ImportBatchUpsertWithWhereUniqueWithoutTeacherInput | ImportBatchUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ImportBatchCreateManyTeacherInputEnvelope
    set?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    disconnect?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    delete?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    connect?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    update?: ImportBatchUpdateWithWhereUniqueWithoutTeacherInput | ImportBatchUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ImportBatchUpdateManyWithWhereWithoutTeacherInput | ImportBatchUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ImportBatchScalarWhereInput | ImportBatchScalarWhereInput[]
  }

  export type StudentProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StudentProgressCreateWithoutUserInput, StudentProgressUncheckedCreateWithoutUserInput> | StudentProgressCreateWithoutUserInput[] | StudentProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StudentProgressCreateOrConnectWithoutUserInput | StudentProgressCreateOrConnectWithoutUserInput[]
    upsert?: StudentProgressUpsertWithWhereUniqueWithoutUserInput | StudentProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StudentProgressCreateManyUserInputEnvelope
    set?: StudentProgressWhereUniqueInput | StudentProgressWhereUniqueInput[]
    disconnect?: StudentProgressWhereUniqueInput | StudentProgressWhereUniqueInput[]
    delete?: StudentProgressWhereUniqueInput | StudentProgressWhereUniqueInput[]
    connect?: StudentProgressWhereUniqueInput | StudentProgressWhereUniqueInput[]
    update?: StudentProgressUpdateWithWhereUniqueWithoutUserInput | StudentProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StudentProgressUpdateManyWithWhereWithoutUserInput | StudentProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StudentProgressScalarWhereInput | StudentProgressScalarWhereInput[]
  }

  export type ClassUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput> | ClassCreateWithoutTeacherInput[] | ClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutTeacherInput | ClassCreateOrConnectWithoutTeacherInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutTeacherInput | ClassUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ClassCreateManyTeacherInputEnvelope
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutTeacherInput | ClassUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutTeacherInput | ClassUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type QuizSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<QuizSessionCreateWithoutUserInput, QuizSessionUncheckedCreateWithoutUserInput> | QuizSessionCreateWithoutUserInput[] | QuizSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuizSessionCreateOrConnectWithoutUserInput | QuizSessionCreateOrConnectWithoutUserInput[]
    upsert?: QuizSessionUpsertWithWhereUniqueWithoutUserInput | QuizSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QuizSessionCreateManyUserInputEnvelope
    set?: QuizSessionWhereUniqueInput | QuizSessionWhereUniqueInput[]
    disconnect?: QuizSessionWhereUniqueInput | QuizSessionWhereUniqueInput[]
    delete?: QuizSessionWhereUniqueInput | QuizSessionWhereUniqueInput[]
    connect?: QuizSessionWhereUniqueInput | QuizSessionWhereUniqueInput[]
    update?: QuizSessionUpdateWithWhereUniqueWithoutUserInput | QuizSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QuizSessionUpdateManyWithWhereWithoutUserInput | QuizSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QuizSessionScalarWhereInput | QuizSessionScalarWhereInput[]
  }

  export type ImportBatchUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ImportBatchCreateWithoutTeacherInput, ImportBatchUncheckedCreateWithoutTeacherInput> | ImportBatchCreateWithoutTeacherInput[] | ImportBatchUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ImportBatchCreateOrConnectWithoutTeacherInput | ImportBatchCreateOrConnectWithoutTeacherInput[]
    upsert?: ImportBatchUpsertWithWhereUniqueWithoutTeacherInput | ImportBatchUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ImportBatchCreateManyTeacherInputEnvelope
    set?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    disconnect?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    delete?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    connect?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    update?: ImportBatchUpdateWithWhereUniqueWithoutTeacherInput | ImportBatchUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ImportBatchUpdateManyWithWhereWithoutTeacherInput | ImportBatchUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ImportBatchScalarWhereInput | ImportBatchScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutStudentProgressInput = {
    create?: XOR<UserCreateWithoutStudentProgressInput, UserUncheckedCreateWithoutStudentProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentProgressInput
    connect?: UserWhereUniqueInput
  }

  export type WeekProgressCreateNestedManyWithoutStudentProgressInput = {
    create?: XOR<WeekProgressCreateWithoutStudentProgressInput, WeekProgressUncheckedCreateWithoutStudentProgressInput> | WeekProgressCreateWithoutStudentProgressInput[] | WeekProgressUncheckedCreateWithoutStudentProgressInput[]
    connectOrCreate?: WeekProgressCreateOrConnectWithoutStudentProgressInput | WeekProgressCreateOrConnectWithoutStudentProgressInput[]
    createMany?: WeekProgressCreateManyStudentProgressInputEnvelope
    connect?: WeekProgressWhereUniqueInput | WeekProgressWhereUniqueInput[]
  }

  export type WeekProgressUncheckedCreateNestedManyWithoutStudentProgressInput = {
    create?: XOR<WeekProgressCreateWithoutStudentProgressInput, WeekProgressUncheckedCreateWithoutStudentProgressInput> | WeekProgressCreateWithoutStudentProgressInput[] | WeekProgressUncheckedCreateWithoutStudentProgressInput[]
    connectOrCreate?: WeekProgressCreateOrConnectWithoutStudentProgressInput | WeekProgressCreateOrConnectWithoutStudentProgressInput[]
    createMany?: WeekProgressCreateManyStudentProgressInputEnvelope
    connect?: WeekProgressWhereUniqueInput | WeekProgressWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutStudentProgressNestedInput = {
    create?: XOR<UserCreateWithoutStudentProgressInput, UserUncheckedCreateWithoutStudentProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentProgressInput
    upsert?: UserUpsertWithoutStudentProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStudentProgressInput, UserUpdateWithoutStudentProgressInput>, UserUncheckedUpdateWithoutStudentProgressInput>
  }

  export type WeekProgressUpdateManyWithoutStudentProgressNestedInput = {
    create?: XOR<WeekProgressCreateWithoutStudentProgressInput, WeekProgressUncheckedCreateWithoutStudentProgressInput> | WeekProgressCreateWithoutStudentProgressInput[] | WeekProgressUncheckedCreateWithoutStudentProgressInput[]
    connectOrCreate?: WeekProgressCreateOrConnectWithoutStudentProgressInput | WeekProgressCreateOrConnectWithoutStudentProgressInput[]
    upsert?: WeekProgressUpsertWithWhereUniqueWithoutStudentProgressInput | WeekProgressUpsertWithWhereUniqueWithoutStudentProgressInput[]
    createMany?: WeekProgressCreateManyStudentProgressInputEnvelope
    set?: WeekProgressWhereUniqueInput | WeekProgressWhereUniqueInput[]
    disconnect?: WeekProgressWhereUniqueInput | WeekProgressWhereUniqueInput[]
    delete?: WeekProgressWhereUniqueInput | WeekProgressWhereUniqueInput[]
    connect?: WeekProgressWhereUniqueInput | WeekProgressWhereUniqueInput[]
    update?: WeekProgressUpdateWithWhereUniqueWithoutStudentProgressInput | WeekProgressUpdateWithWhereUniqueWithoutStudentProgressInput[]
    updateMany?: WeekProgressUpdateManyWithWhereWithoutStudentProgressInput | WeekProgressUpdateManyWithWhereWithoutStudentProgressInput[]
    deleteMany?: WeekProgressScalarWhereInput | WeekProgressScalarWhereInput[]
  }

  export type WeekProgressUncheckedUpdateManyWithoutStudentProgressNestedInput = {
    create?: XOR<WeekProgressCreateWithoutStudentProgressInput, WeekProgressUncheckedCreateWithoutStudentProgressInput> | WeekProgressCreateWithoutStudentProgressInput[] | WeekProgressUncheckedCreateWithoutStudentProgressInput[]
    connectOrCreate?: WeekProgressCreateOrConnectWithoutStudentProgressInput | WeekProgressCreateOrConnectWithoutStudentProgressInput[]
    upsert?: WeekProgressUpsertWithWhereUniqueWithoutStudentProgressInput | WeekProgressUpsertWithWhereUniqueWithoutStudentProgressInput[]
    createMany?: WeekProgressCreateManyStudentProgressInputEnvelope
    set?: WeekProgressWhereUniqueInput | WeekProgressWhereUniqueInput[]
    disconnect?: WeekProgressWhereUniqueInput | WeekProgressWhereUniqueInput[]
    delete?: WeekProgressWhereUniqueInput | WeekProgressWhereUniqueInput[]
    connect?: WeekProgressWhereUniqueInput | WeekProgressWhereUniqueInput[]
    update?: WeekProgressUpdateWithWhereUniqueWithoutStudentProgressInput | WeekProgressUpdateWithWhereUniqueWithoutStudentProgressInput[]
    updateMany?: WeekProgressUpdateManyWithWhereWithoutStudentProgressInput | WeekProgressUpdateManyWithWhereWithoutStudentProgressInput[]
    deleteMany?: WeekProgressScalarWhereInput | WeekProgressScalarWhereInput[]
  }

  export type StudentProgressCreateNestedOneWithoutWeekProgressInput = {
    create?: XOR<StudentProgressCreateWithoutWeekProgressInput, StudentProgressUncheckedCreateWithoutWeekProgressInput>
    connectOrCreate?: StudentProgressCreateOrConnectWithoutWeekProgressInput
    connect?: StudentProgressWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StudentProgressUpdateOneRequiredWithoutWeekProgressNestedInput = {
    create?: XOR<StudentProgressCreateWithoutWeekProgressInput, StudentProgressUncheckedCreateWithoutWeekProgressInput>
    connectOrCreate?: StudentProgressCreateOrConnectWithoutWeekProgressInput
    upsert?: StudentProgressUpsertWithoutWeekProgressInput
    connect?: StudentProgressWhereUniqueInput
    update?: XOR<XOR<StudentProgressUpdateToOneWithWhereWithoutWeekProgressInput, StudentProgressUpdateWithoutWeekProgressInput>, StudentProgressUncheckedUpdateWithoutWeekProgressInput>
  }

  export type UserCreateNestedOneWithoutTeacherClassesInput = {
    create?: XOR<UserCreateWithoutTeacherClassesInput, UserUncheckedCreateWithoutTeacherClassesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeacherClassesInput
    connect?: UserWhereUniqueInput
  }

  export type EnrollmentCreateNestedManyWithoutClassInput = {
    create?: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput> | EnrollmentCreateWithoutClassInput[] | EnrollmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutClassInput | EnrollmentCreateOrConnectWithoutClassInput[]
    createMany?: EnrollmentCreateManyClassInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type ImportBatchCreateNestedManyWithoutClassInput = {
    create?: XOR<ImportBatchCreateWithoutClassInput, ImportBatchUncheckedCreateWithoutClassInput> | ImportBatchCreateWithoutClassInput[] | ImportBatchUncheckedCreateWithoutClassInput[]
    connectOrCreate?: ImportBatchCreateOrConnectWithoutClassInput | ImportBatchCreateOrConnectWithoutClassInput[]
    createMany?: ImportBatchCreateManyClassInputEnvelope
    connect?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput> | EnrollmentCreateWithoutClassInput[] | EnrollmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutClassInput | EnrollmentCreateOrConnectWithoutClassInput[]
    createMany?: EnrollmentCreateManyClassInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type ImportBatchUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<ImportBatchCreateWithoutClassInput, ImportBatchUncheckedCreateWithoutClassInput> | ImportBatchCreateWithoutClassInput[] | ImportBatchUncheckedCreateWithoutClassInput[]
    connectOrCreate?: ImportBatchCreateOrConnectWithoutClassInput | ImportBatchCreateOrConnectWithoutClassInput[]
    createMany?: ImportBatchCreateManyClassInputEnvelope
    connect?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutTeacherClassesNestedInput = {
    create?: XOR<UserCreateWithoutTeacherClassesInput, UserUncheckedCreateWithoutTeacherClassesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeacherClassesInput
    upsert?: UserUpsertWithoutTeacherClassesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTeacherClassesInput, UserUpdateWithoutTeacherClassesInput>, UserUncheckedUpdateWithoutTeacherClassesInput>
  }

  export type EnrollmentUpdateManyWithoutClassNestedInput = {
    create?: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput> | EnrollmentCreateWithoutClassInput[] | EnrollmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutClassInput | EnrollmentCreateOrConnectWithoutClassInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutClassInput | EnrollmentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: EnrollmentCreateManyClassInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutClassInput | EnrollmentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutClassInput | EnrollmentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type ImportBatchUpdateManyWithoutClassNestedInput = {
    create?: XOR<ImportBatchCreateWithoutClassInput, ImportBatchUncheckedCreateWithoutClassInput> | ImportBatchCreateWithoutClassInput[] | ImportBatchUncheckedCreateWithoutClassInput[]
    connectOrCreate?: ImportBatchCreateOrConnectWithoutClassInput | ImportBatchCreateOrConnectWithoutClassInput[]
    upsert?: ImportBatchUpsertWithWhereUniqueWithoutClassInput | ImportBatchUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: ImportBatchCreateManyClassInputEnvelope
    set?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    disconnect?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    delete?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    connect?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    update?: ImportBatchUpdateWithWhereUniqueWithoutClassInput | ImportBatchUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: ImportBatchUpdateManyWithWhereWithoutClassInput | ImportBatchUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: ImportBatchScalarWhereInput | ImportBatchScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput> | EnrollmentCreateWithoutClassInput[] | EnrollmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutClassInput | EnrollmentCreateOrConnectWithoutClassInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutClassInput | EnrollmentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: EnrollmentCreateManyClassInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutClassInput | EnrollmentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutClassInput | EnrollmentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type ImportBatchUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<ImportBatchCreateWithoutClassInput, ImportBatchUncheckedCreateWithoutClassInput> | ImportBatchCreateWithoutClassInput[] | ImportBatchUncheckedCreateWithoutClassInput[]
    connectOrCreate?: ImportBatchCreateOrConnectWithoutClassInput | ImportBatchCreateOrConnectWithoutClassInput[]
    upsert?: ImportBatchUpsertWithWhereUniqueWithoutClassInput | ImportBatchUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: ImportBatchCreateManyClassInputEnvelope
    set?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    disconnect?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    delete?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    connect?: ImportBatchWhereUniqueInput | ImportBatchWhereUniqueInput[]
    update?: ImportBatchUpdateWithWhereUniqueWithoutClassInput | ImportBatchUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: ImportBatchUpdateManyWithWhereWithoutClassInput | ImportBatchUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: ImportBatchScalarWhereInput | ImportBatchScalarWhereInput[]
  }

  export type ClassCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<ClassCreateWithoutEnrollmentsInput, ClassUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutEnrollmentsInput
    connect?: ClassWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEnrollmentsInput
    connect?: UserWhereUniqueInput
  }

  export type ImportBatchCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<ImportBatchCreateWithoutEnrollmentsInput, ImportBatchUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: ImportBatchCreateOrConnectWithoutEnrollmentsInput
    connect?: ImportBatchWhereUniqueInput
  }

  export type ClassUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<ClassCreateWithoutEnrollmentsInput, ClassUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutEnrollmentsInput
    upsert?: ClassUpsertWithoutEnrollmentsInput
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutEnrollmentsInput, ClassUpdateWithoutEnrollmentsInput>, ClassUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type UserUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEnrollmentsInput
    upsert?: UserUpsertWithoutEnrollmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEnrollmentsInput, UserUpdateWithoutEnrollmentsInput>, UserUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type ImportBatchUpdateOneWithoutEnrollmentsNestedInput = {
    create?: XOR<ImportBatchCreateWithoutEnrollmentsInput, ImportBatchUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: ImportBatchCreateOrConnectWithoutEnrollmentsInput
    upsert?: ImportBatchUpsertWithoutEnrollmentsInput
    disconnect?: ImportBatchWhereInput | boolean
    delete?: ImportBatchWhereInput | boolean
    connect?: ImportBatchWhereUniqueInput
    update?: XOR<XOR<ImportBatchUpdateToOneWithWhereWithoutEnrollmentsInput, ImportBatchUpdateWithoutEnrollmentsInput>, ImportBatchUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type UserCreateNestedOneWithoutQuizSessionsInput = {
    create?: XOR<UserCreateWithoutQuizSessionsInput, UserUncheckedCreateWithoutQuizSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuizSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutQuizSessionsNestedInput = {
    create?: XOR<UserCreateWithoutQuizSessionsInput, UserUncheckedCreateWithoutQuizSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuizSessionsInput
    upsert?: UserUpsertWithoutQuizSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQuizSessionsInput, UserUpdateWithoutQuizSessionsInput>, UserUncheckedUpdateWithoutQuizSessionsInput>
  }

  export type UserCreateNestedOneWithoutImportBatchesInput = {
    create?: XOR<UserCreateWithoutImportBatchesInput, UserUncheckedCreateWithoutImportBatchesInput>
    connectOrCreate?: UserCreateOrConnectWithoutImportBatchesInput
    connect?: UserWhereUniqueInput
  }

  export type ClassCreateNestedOneWithoutImportBatchesInput = {
    create?: XOR<ClassCreateWithoutImportBatchesInput, ClassUncheckedCreateWithoutImportBatchesInput>
    connectOrCreate?: ClassCreateOrConnectWithoutImportBatchesInput
    connect?: ClassWhereUniqueInput
  }

  export type EnrollmentCreateNestedManyWithoutImportBatchInput = {
    create?: XOR<EnrollmentCreateWithoutImportBatchInput, EnrollmentUncheckedCreateWithoutImportBatchInput> | EnrollmentCreateWithoutImportBatchInput[] | EnrollmentUncheckedCreateWithoutImportBatchInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutImportBatchInput | EnrollmentCreateOrConnectWithoutImportBatchInput[]
    createMany?: EnrollmentCreateManyImportBatchInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutImportBatchInput = {
    create?: XOR<EnrollmentCreateWithoutImportBatchInput, EnrollmentUncheckedCreateWithoutImportBatchInput> | EnrollmentCreateWithoutImportBatchInput[] | EnrollmentUncheckedCreateWithoutImportBatchInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutImportBatchInput | EnrollmentCreateOrConnectWithoutImportBatchInput[]
    createMany?: EnrollmentCreateManyImportBatchInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutImportBatchesNestedInput = {
    create?: XOR<UserCreateWithoutImportBatchesInput, UserUncheckedCreateWithoutImportBatchesInput>
    connectOrCreate?: UserCreateOrConnectWithoutImportBatchesInput
    upsert?: UserUpsertWithoutImportBatchesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutImportBatchesInput, UserUpdateWithoutImportBatchesInput>, UserUncheckedUpdateWithoutImportBatchesInput>
  }

  export type ClassUpdateOneRequiredWithoutImportBatchesNestedInput = {
    create?: XOR<ClassCreateWithoutImportBatchesInput, ClassUncheckedCreateWithoutImportBatchesInput>
    connectOrCreate?: ClassCreateOrConnectWithoutImportBatchesInput
    upsert?: ClassUpsertWithoutImportBatchesInput
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutImportBatchesInput, ClassUpdateWithoutImportBatchesInput>, ClassUncheckedUpdateWithoutImportBatchesInput>
  }

  export type EnrollmentUpdateManyWithoutImportBatchNestedInput = {
    create?: XOR<EnrollmentCreateWithoutImportBatchInput, EnrollmentUncheckedCreateWithoutImportBatchInput> | EnrollmentCreateWithoutImportBatchInput[] | EnrollmentUncheckedCreateWithoutImportBatchInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutImportBatchInput | EnrollmentCreateOrConnectWithoutImportBatchInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutImportBatchInput | EnrollmentUpsertWithWhereUniqueWithoutImportBatchInput[]
    createMany?: EnrollmentCreateManyImportBatchInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutImportBatchInput | EnrollmentUpdateWithWhereUniqueWithoutImportBatchInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutImportBatchInput | EnrollmentUpdateManyWithWhereWithoutImportBatchInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutImportBatchNestedInput = {
    create?: XOR<EnrollmentCreateWithoutImportBatchInput, EnrollmentUncheckedCreateWithoutImportBatchInput> | EnrollmentCreateWithoutImportBatchInput[] | EnrollmentUncheckedCreateWithoutImportBatchInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutImportBatchInput | EnrollmentCreateOrConnectWithoutImportBatchInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutImportBatchInput | EnrollmentUpsertWithWhereUniqueWithoutImportBatchInput[]
    createMany?: EnrollmentCreateManyImportBatchInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutImportBatchInput | EnrollmentUpdateWithWhereUniqueWithoutImportBatchInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutImportBatchInput | EnrollmentUpdateManyWithWhereWithoutImportBatchInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StudentProgressCreateWithoutUserInput = {
    id?: string
    grade: string
    subject: string
    difficulty?: string
    totalScore?: number
    overallProgress?: number
    currentPlantStage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weekProgress?: WeekProgressCreateNestedManyWithoutStudentProgressInput
  }

  export type StudentProgressUncheckedCreateWithoutUserInput = {
    id?: string
    grade: string
    subject: string
    difficulty?: string
    totalScore?: number
    overallProgress?: number
    currentPlantStage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weekProgress?: WeekProgressUncheckedCreateNestedManyWithoutStudentProgressInput
  }

  export type StudentProgressCreateOrConnectWithoutUserInput = {
    where: StudentProgressWhereUniqueInput
    create: XOR<StudentProgressCreateWithoutUserInput, StudentProgressUncheckedCreateWithoutUserInput>
  }

  export type StudentProgressCreateManyUserInputEnvelope = {
    data: StudentProgressCreateManyUserInput | StudentProgressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ClassCreateWithoutTeacherInput = {
    id?: string
    name: string
    grade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    enrollments?: EnrollmentCreateNestedManyWithoutClassInput
    importBatches?: ImportBatchCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutTeacherInput = {
    id?: string
    name: string
    grade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutClassInput
    importBatches?: ImportBatchUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutTeacherInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput>
  }

  export type ClassCreateManyTeacherInputEnvelope = {
    data: ClassCreateManyTeacherInput | ClassCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentCreateWithoutStudentInput = {
    id?: string
    enrolledAt?: Date | string
    parentEmail?: string | null
    parentPhone?: string | null
    comments?: string | null
    class: ClassCreateNestedOneWithoutEnrollmentsInput
    importBatch?: ImportBatchCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutStudentInput = {
    id?: string
    classId: string
    enrolledAt?: Date | string
    parentEmail?: string | null
    parentPhone?: string | null
    importBatchId?: string | null
    comments?: string | null
  }

  export type EnrollmentCreateOrConnectWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentCreateManyStudentInputEnvelope = {
    data: EnrollmentCreateManyStudentInput | EnrollmentCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type QuizSessionCreateWithoutUserInput = {
    id?: string
    grade: string
    subject: string
    weekId: number
    difficulty: string
    currentQuestionIndex?: number
    selectedAnswer?: string | null
    isAnswered?: boolean
    isCorrect?: boolean
    timeRemaining?: number
    livesRemaining?: number
    scoreThisQuestion?: number
    correctCount?: number
    speedBonusCount?: number
    answersHistory: string
    status?: string
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type QuizSessionUncheckedCreateWithoutUserInput = {
    id?: string
    grade: string
    subject: string
    weekId: number
    difficulty: string
    currentQuestionIndex?: number
    selectedAnswer?: string | null
    isAnswered?: boolean
    isCorrect?: boolean
    timeRemaining?: number
    livesRemaining?: number
    scoreThisQuestion?: number
    correctCount?: number
    speedBonusCount?: number
    answersHistory: string
    status?: string
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type QuizSessionCreateOrConnectWithoutUserInput = {
    where: QuizSessionWhereUniqueInput
    create: XOR<QuizSessionCreateWithoutUserInput, QuizSessionUncheckedCreateWithoutUserInput>
  }

  export type QuizSessionCreateManyUserInputEnvelope = {
    data: QuizSessionCreateManyUserInput | QuizSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ImportBatchCreateWithoutTeacherInput = {
    id?: string
    fileName: string
    recordsCount: number
    successCount: number
    failureCount: number
    errorLog?: string | null
    createdAt?: Date | string
    class: ClassCreateNestedOneWithoutImportBatchesInput
    enrollments?: EnrollmentCreateNestedManyWithoutImportBatchInput
  }

  export type ImportBatchUncheckedCreateWithoutTeacherInput = {
    id?: string
    classId: string
    fileName: string
    recordsCount: number
    successCount: number
    failureCount: number
    errorLog?: string | null
    createdAt?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutImportBatchInput
  }

  export type ImportBatchCreateOrConnectWithoutTeacherInput = {
    where: ImportBatchWhereUniqueInput
    create: XOR<ImportBatchCreateWithoutTeacherInput, ImportBatchUncheckedCreateWithoutTeacherInput>
  }

  export type ImportBatchCreateManyTeacherInputEnvelope = {
    data: ImportBatchCreateManyTeacherInput | ImportBatchCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type StudentProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: StudentProgressWhereUniqueInput
    update: XOR<StudentProgressUpdateWithoutUserInput, StudentProgressUncheckedUpdateWithoutUserInput>
    create: XOR<StudentProgressCreateWithoutUserInput, StudentProgressUncheckedCreateWithoutUserInput>
  }

  export type StudentProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: StudentProgressWhereUniqueInput
    data: XOR<StudentProgressUpdateWithoutUserInput, StudentProgressUncheckedUpdateWithoutUserInput>
  }

  export type StudentProgressUpdateManyWithWhereWithoutUserInput = {
    where: StudentProgressScalarWhereInput
    data: XOR<StudentProgressUpdateManyMutationInput, StudentProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type StudentProgressScalarWhereInput = {
    AND?: StudentProgressScalarWhereInput | StudentProgressScalarWhereInput[]
    OR?: StudentProgressScalarWhereInput[]
    NOT?: StudentProgressScalarWhereInput | StudentProgressScalarWhereInput[]
    id?: StringFilter<"StudentProgress"> | string
    userId?: StringFilter<"StudentProgress"> | string
    grade?: StringFilter<"StudentProgress"> | string
    subject?: StringFilter<"StudentProgress"> | string
    difficulty?: StringFilter<"StudentProgress"> | string
    totalScore?: IntFilter<"StudentProgress"> | number
    overallProgress?: FloatFilter<"StudentProgress"> | number
    currentPlantStage?: StringFilter<"StudentProgress"> | string
    createdAt?: DateTimeFilter<"StudentProgress"> | Date | string
    updatedAt?: DateTimeFilter<"StudentProgress"> | Date | string
  }

  export type ClassUpsertWithWhereUniqueWithoutTeacherInput = {
    where: ClassWhereUniqueInput
    update: XOR<ClassUpdateWithoutTeacherInput, ClassUncheckedUpdateWithoutTeacherInput>
    create: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput>
  }

  export type ClassUpdateWithWhereUniqueWithoutTeacherInput = {
    where: ClassWhereUniqueInput
    data: XOR<ClassUpdateWithoutTeacherInput, ClassUncheckedUpdateWithoutTeacherInput>
  }

  export type ClassUpdateManyWithWhereWithoutTeacherInput = {
    where: ClassScalarWhereInput
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyWithoutTeacherInput>
  }

  export type ClassScalarWhereInput = {
    AND?: ClassScalarWhereInput | ClassScalarWhereInput[]
    OR?: ClassScalarWhereInput[]
    NOT?: ClassScalarWhereInput | ClassScalarWhereInput[]
    id?: StringFilter<"Class"> | string
    name?: StringFilter<"Class"> | string
    teacherId?: StringFilter<"Class"> | string
    grade?: StringFilter<"Class"> | string
    createdAt?: DateTimeFilter<"Class"> | Date | string
    updatedAt?: DateTimeFilter<"Class"> | Date | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutStudentInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutStudentInput>
  }

  export type EnrollmentScalarWhereInput = {
    AND?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    OR?: EnrollmentScalarWhereInput[]
    NOT?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    id?: StringFilter<"Enrollment"> | string
    classId?: StringFilter<"Enrollment"> | string
    studentId?: StringFilter<"Enrollment"> | string
    enrolledAt?: DateTimeFilter<"Enrollment"> | Date | string
    parentEmail?: StringNullableFilter<"Enrollment"> | string | null
    parentPhone?: StringNullableFilter<"Enrollment"> | string | null
    importBatchId?: StringNullableFilter<"Enrollment"> | string | null
    comments?: StringNullableFilter<"Enrollment"> | string | null
  }

  export type QuizSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: QuizSessionWhereUniqueInput
    update: XOR<QuizSessionUpdateWithoutUserInput, QuizSessionUncheckedUpdateWithoutUserInput>
    create: XOR<QuizSessionCreateWithoutUserInput, QuizSessionUncheckedCreateWithoutUserInput>
  }

  export type QuizSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: QuizSessionWhereUniqueInput
    data: XOR<QuizSessionUpdateWithoutUserInput, QuizSessionUncheckedUpdateWithoutUserInput>
  }

  export type QuizSessionUpdateManyWithWhereWithoutUserInput = {
    where: QuizSessionScalarWhereInput
    data: XOR<QuizSessionUpdateManyMutationInput, QuizSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type QuizSessionScalarWhereInput = {
    AND?: QuizSessionScalarWhereInput | QuizSessionScalarWhereInput[]
    OR?: QuizSessionScalarWhereInput[]
    NOT?: QuizSessionScalarWhereInput | QuizSessionScalarWhereInput[]
    id?: StringFilter<"QuizSession"> | string
    userId?: StringFilter<"QuizSession"> | string
    grade?: StringFilter<"QuizSession"> | string
    subject?: StringFilter<"QuizSession"> | string
    weekId?: IntFilter<"QuizSession"> | number
    difficulty?: StringFilter<"QuizSession"> | string
    currentQuestionIndex?: IntFilter<"QuizSession"> | number
    selectedAnswer?: StringNullableFilter<"QuizSession"> | string | null
    isAnswered?: BoolFilter<"QuizSession"> | boolean
    isCorrect?: BoolFilter<"QuizSession"> | boolean
    timeRemaining?: IntFilter<"QuizSession"> | number
    livesRemaining?: IntFilter<"QuizSession"> | number
    scoreThisQuestion?: IntFilter<"QuizSession"> | number
    correctCount?: IntFilter<"QuizSession"> | number
    speedBonusCount?: IntFilter<"QuizSession"> | number
    answersHistory?: StringFilter<"QuizSession"> | string
    status?: StringFilter<"QuizSession"> | string
    startedAt?: DateTimeFilter<"QuizSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"QuizSession"> | Date | string | null
  }

  export type ImportBatchUpsertWithWhereUniqueWithoutTeacherInput = {
    where: ImportBatchWhereUniqueInput
    update: XOR<ImportBatchUpdateWithoutTeacherInput, ImportBatchUncheckedUpdateWithoutTeacherInput>
    create: XOR<ImportBatchCreateWithoutTeacherInput, ImportBatchUncheckedCreateWithoutTeacherInput>
  }

  export type ImportBatchUpdateWithWhereUniqueWithoutTeacherInput = {
    where: ImportBatchWhereUniqueInput
    data: XOR<ImportBatchUpdateWithoutTeacherInput, ImportBatchUncheckedUpdateWithoutTeacherInput>
  }

  export type ImportBatchUpdateManyWithWhereWithoutTeacherInput = {
    where: ImportBatchScalarWhereInput
    data: XOR<ImportBatchUpdateManyMutationInput, ImportBatchUncheckedUpdateManyWithoutTeacherInput>
  }

  export type ImportBatchScalarWhereInput = {
    AND?: ImportBatchScalarWhereInput | ImportBatchScalarWhereInput[]
    OR?: ImportBatchScalarWhereInput[]
    NOT?: ImportBatchScalarWhereInput | ImportBatchScalarWhereInput[]
    id?: StringFilter<"ImportBatch"> | string
    teacherId?: StringFilter<"ImportBatch"> | string
    classId?: StringFilter<"ImportBatch"> | string
    fileName?: StringFilter<"ImportBatch"> | string
    recordsCount?: IntFilter<"ImportBatch"> | number
    successCount?: IntFilter<"ImportBatch"> | number
    failureCount?: IntFilter<"ImportBatch"> | number
    errorLog?: StringNullableFilter<"ImportBatch"> | string | null
    createdAt?: DateTimeFilter<"ImportBatch"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressCreateNestedManyWithoutUserInput
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    quizSessions?: QuizSessionCreateNestedManyWithoutUserInput
    importBatches?: ImportBatchCreateNestedManyWithoutTeacherInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressUncheckedCreateNestedManyWithoutUserInput
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    quizSessions?: QuizSessionUncheckedCreateNestedManyWithoutUserInput
    importBatches?: ImportBatchUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUpdateManyWithoutUserNestedInput
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    quizSessions?: QuizSessionUpdateManyWithoutUserNestedInput
    importBatches?: ImportBatchUpdateManyWithoutTeacherNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUncheckedUpdateManyWithoutUserNestedInput
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    quizSessions?: QuizSessionUncheckedUpdateManyWithoutUserNestedInput
    importBatches?: ImportBatchUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressCreateNestedManyWithoutUserInput
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    quizSessions?: QuizSessionCreateNestedManyWithoutUserInput
    importBatches?: ImportBatchCreateNestedManyWithoutTeacherInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressUncheckedCreateNestedManyWithoutUserInput
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    quizSessions?: QuizSessionUncheckedCreateNestedManyWithoutUserInput
    importBatches?: ImportBatchUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUpdateManyWithoutUserNestedInput
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    quizSessions?: QuizSessionUpdateManyWithoutUserNestedInput
    importBatches?: ImportBatchUpdateManyWithoutTeacherNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUncheckedUpdateManyWithoutUserNestedInput
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    quizSessions?: QuizSessionUncheckedUpdateManyWithoutUserNestedInput
    importBatches?: ImportBatchUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type UserCreateWithoutStudentProgressInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    quizSessions?: QuizSessionCreateNestedManyWithoutUserInput
    importBatches?: ImportBatchCreateNestedManyWithoutTeacherInput
  }

  export type UserUncheckedCreateWithoutStudentProgressInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    quizSessions?: QuizSessionUncheckedCreateNestedManyWithoutUserInput
    importBatches?: ImportBatchUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type UserCreateOrConnectWithoutStudentProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStudentProgressInput, UserUncheckedCreateWithoutStudentProgressInput>
  }

  export type WeekProgressCreateWithoutStudentProgressInput = {
    id?: string
    weekId: number
    completed?: boolean
    locked?: boolean
    score?: number
    questionsCorrect?: number
    questionsTotal?: number
    readingCompCorrect?: number
    readingCompTotal?: number
    keywordsMastered: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeekProgressUncheckedCreateWithoutStudentProgressInput = {
    id?: string
    weekId: number
    completed?: boolean
    locked?: boolean
    score?: number
    questionsCorrect?: number
    questionsTotal?: number
    readingCompCorrect?: number
    readingCompTotal?: number
    keywordsMastered: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeekProgressCreateOrConnectWithoutStudentProgressInput = {
    where: WeekProgressWhereUniqueInput
    create: XOR<WeekProgressCreateWithoutStudentProgressInput, WeekProgressUncheckedCreateWithoutStudentProgressInput>
  }

  export type WeekProgressCreateManyStudentProgressInputEnvelope = {
    data: WeekProgressCreateManyStudentProgressInput | WeekProgressCreateManyStudentProgressInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutStudentProgressInput = {
    update: XOR<UserUpdateWithoutStudentProgressInput, UserUncheckedUpdateWithoutStudentProgressInput>
    create: XOR<UserCreateWithoutStudentProgressInput, UserUncheckedCreateWithoutStudentProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStudentProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStudentProgressInput, UserUncheckedUpdateWithoutStudentProgressInput>
  }

  export type UserUpdateWithoutStudentProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    quizSessions?: QuizSessionUpdateManyWithoutUserNestedInput
    importBatches?: ImportBatchUpdateManyWithoutTeacherNestedInput
  }

  export type UserUncheckedUpdateWithoutStudentProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    quizSessions?: QuizSessionUncheckedUpdateManyWithoutUserNestedInput
    importBatches?: ImportBatchUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type WeekProgressUpsertWithWhereUniqueWithoutStudentProgressInput = {
    where: WeekProgressWhereUniqueInput
    update: XOR<WeekProgressUpdateWithoutStudentProgressInput, WeekProgressUncheckedUpdateWithoutStudentProgressInput>
    create: XOR<WeekProgressCreateWithoutStudentProgressInput, WeekProgressUncheckedCreateWithoutStudentProgressInput>
  }

  export type WeekProgressUpdateWithWhereUniqueWithoutStudentProgressInput = {
    where: WeekProgressWhereUniqueInput
    data: XOR<WeekProgressUpdateWithoutStudentProgressInput, WeekProgressUncheckedUpdateWithoutStudentProgressInput>
  }

  export type WeekProgressUpdateManyWithWhereWithoutStudentProgressInput = {
    where: WeekProgressScalarWhereInput
    data: XOR<WeekProgressUpdateManyMutationInput, WeekProgressUncheckedUpdateManyWithoutStudentProgressInput>
  }

  export type WeekProgressScalarWhereInput = {
    AND?: WeekProgressScalarWhereInput | WeekProgressScalarWhereInput[]
    OR?: WeekProgressScalarWhereInput[]
    NOT?: WeekProgressScalarWhereInput | WeekProgressScalarWhereInput[]
    id?: StringFilter<"WeekProgress"> | string
    studentProgressId?: StringFilter<"WeekProgress"> | string
    weekId?: IntFilter<"WeekProgress"> | number
    completed?: BoolFilter<"WeekProgress"> | boolean
    locked?: BoolFilter<"WeekProgress"> | boolean
    score?: IntFilter<"WeekProgress"> | number
    questionsCorrect?: IntFilter<"WeekProgress"> | number
    questionsTotal?: IntFilter<"WeekProgress"> | number
    readingCompCorrect?: IntFilter<"WeekProgress"> | number
    readingCompTotal?: IntFilter<"WeekProgress"> | number
    keywordsMastered?: StringFilter<"WeekProgress"> | string
    createdAt?: DateTimeFilter<"WeekProgress"> | Date | string
    updatedAt?: DateTimeFilter<"WeekProgress"> | Date | string
  }

  export type StudentProgressCreateWithoutWeekProgressInput = {
    id?: string
    grade: string
    subject: string
    difficulty?: string
    totalScore?: number
    overallProgress?: number
    currentPlantStage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStudentProgressInput
  }

  export type StudentProgressUncheckedCreateWithoutWeekProgressInput = {
    id?: string
    userId: string
    grade: string
    subject: string
    difficulty?: string
    totalScore?: number
    overallProgress?: number
    currentPlantStage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentProgressCreateOrConnectWithoutWeekProgressInput = {
    where: StudentProgressWhereUniqueInput
    create: XOR<StudentProgressCreateWithoutWeekProgressInput, StudentProgressUncheckedCreateWithoutWeekProgressInput>
  }

  export type StudentProgressUpsertWithoutWeekProgressInput = {
    update: XOR<StudentProgressUpdateWithoutWeekProgressInput, StudentProgressUncheckedUpdateWithoutWeekProgressInput>
    create: XOR<StudentProgressCreateWithoutWeekProgressInput, StudentProgressUncheckedCreateWithoutWeekProgressInput>
    where?: StudentProgressWhereInput
  }

  export type StudentProgressUpdateToOneWithWhereWithoutWeekProgressInput = {
    where?: StudentProgressWhereInput
    data: XOR<StudentProgressUpdateWithoutWeekProgressInput, StudentProgressUncheckedUpdateWithoutWeekProgressInput>
  }

  export type StudentProgressUpdateWithoutWeekProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    totalScore?: IntFieldUpdateOperationsInput | number
    overallProgress?: FloatFieldUpdateOperationsInput | number
    currentPlantStage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStudentProgressNestedInput
  }

  export type StudentProgressUncheckedUpdateWithoutWeekProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    totalScore?: IntFieldUpdateOperationsInput | number
    overallProgress?: FloatFieldUpdateOperationsInput | number
    currentPlantStage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutTeacherClassesInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    quizSessions?: QuizSessionCreateNestedManyWithoutUserInput
    importBatches?: ImportBatchCreateNestedManyWithoutTeacherInput
  }

  export type UserUncheckedCreateWithoutTeacherClassesInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    quizSessions?: QuizSessionUncheckedCreateNestedManyWithoutUserInput
    importBatches?: ImportBatchUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type UserCreateOrConnectWithoutTeacherClassesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTeacherClassesInput, UserUncheckedCreateWithoutTeacherClassesInput>
  }

  export type EnrollmentCreateWithoutClassInput = {
    id?: string
    enrolledAt?: Date | string
    parentEmail?: string | null
    parentPhone?: string | null
    comments?: string | null
    student: UserCreateNestedOneWithoutEnrollmentsInput
    importBatch?: ImportBatchCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutClassInput = {
    id?: string
    studentId: string
    enrolledAt?: Date | string
    parentEmail?: string | null
    parentPhone?: string | null
    importBatchId?: string | null
    comments?: string | null
  }

  export type EnrollmentCreateOrConnectWithoutClassInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput>
  }

  export type EnrollmentCreateManyClassInputEnvelope = {
    data: EnrollmentCreateManyClassInput | EnrollmentCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type ImportBatchCreateWithoutClassInput = {
    id?: string
    fileName: string
    recordsCount: number
    successCount: number
    failureCount: number
    errorLog?: string | null
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutImportBatchesInput
    enrollments?: EnrollmentCreateNestedManyWithoutImportBatchInput
  }

  export type ImportBatchUncheckedCreateWithoutClassInput = {
    id?: string
    teacherId: string
    fileName: string
    recordsCount: number
    successCount: number
    failureCount: number
    errorLog?: string | null
    createdAt?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutImportBatchInput
  }

  export type ImportBatchCreateOrConnectWithoutClassInput = {
    where: ImportBatchWhereUniqueInput
    create: XOR<ImportBatchCreateWithoutClassInput, ImportBatchUncheckedCreateWithoutClassInput>
  }

  export type ImportBatchCreateManyClassInputEnvelope = {
    data: ImportBatchCreateManyClassInput | ImportBatchCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTeacherClassesInput = {
    update: XOR<UserUpdateWithoutTeacherClassesInput, UserUncheckedUpdateWithoutTeacherClassesInput>
    create: XOR<UserCreateWithoutTeacherClassesInput, UserUncheckedCreateWithoutTeacherClassesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTeacherClassesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTeacherClassesInput, UserUncheckedUpdateWithoutTeacherClassesInput>
  }

  export type UserUpdateWithoutTeacherClassesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    quizSessions?: QuizSessionUpdateManyWithoutUserNestedInput
    importBatches?: ImportBatchUpdateManyWithoutTeacherNestedInput
  }

  export type UserUncheckedUpdateWithoutTeacherClassesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    quizSessions?: QuizSessionUncheckedUpdateManyWithoutUserNestedInput
    importBatches?: ImportBatchUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutClassInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutClassInput, EnrollmentUncheckedUpdateWithoutClassInput>
    create: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutClassInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutClassInput, EnrollmentUncheckedUpdateWithoutClassInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutClassInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutClassInput>
  }

  export type ImportBatchUpsertWithWhereUniqueWithoutClassInput = {
    where: ImportBatchWhereUniqueInput
    update: XOR<ImportBatchUpdateWithoutClassInput, ImportBatchUncheckedUpdateWithoutClassInput>
    create: XOR<ImportBatchCreateWithoutClassInput, ImportBatchUncheckedCreateWithoutClassInput>
  }

  export type ImportBatchUpdateWithWhereUniqueWithoutClassInput = {
    where: ImportBatchWhereUniqueInput
    data: XOR<ImportBatchUpdateWithoutClassInput, ImportBatchUncheckedUpdateWithoutClassInput>
  }

  export type ImportBatchUpdateManyWithWhereWithoutClassInput = {
    where: ImportBatchScalarWhereInput
    data: XOR<ImportBatchUpdateManyMutationInput, ImportBatchUncheckedUpdateManyWithoutClassInput>
  }

  export type ClassCreateWithoutEnrollmentsInput = {
    id?: string
    name: string
    grade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher: UserCreateNestedOneWithoutTeacherClassesInput
    importBatches?: ImportBatchCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutEnrollmentsInput = {
    id?: string
    name: string
    teacherId: string
    grade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    importBatches?: ImportBatchUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutEnrollmentsInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutEnrollmentsInput, ClassUncheckedCreateWithoutEnrollmentsInput>
  }

  export type UserCreateWithoutEnrollmentsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressCreateNestedManyWithoutUserInput
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    quizSessions?: QuizSessionCreateNestedManyWithoutUserInput
    importBatches?: ImportBatchCreateNestedManyWithoutTeacherInput
  }

  export type UserUncheckedCreateWithoutEnrollmentsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressUncheckedCreateNestedManyWithoutUserInput
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    quizSessions?: QuizSessionUncheckedCreateNestedManyWithoutUserInput
    importBatches?: ImportBatchUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type UserCreateOrConnectWithoutEnrollmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>
  }

  export type ImportBatchCreateWithoutEnrollmentsInput = {
    id?: string
    fileName: string
    recordsCount: number
    successCount: number
    failureCount: number
    errorLog?: string | null
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutImportBatchesInput
    class: ClassCreateNestedOneWithoutImportBatchesInput
  }

  export type ImportBatchUncheckedCreateWithoutEnrollmentsInput = {
    id?: string
    teacherId: string
    classId: string
    fileName: string
    recordsCount: number
    successCount: number
    failureCount: number
    errorLog?: string | null
    createdAt?: Date | string
  }

  export type ImportBatchCreateOrConnectWithoutEnrollmentsInput = {
    where: ImportBatchWhereUniqueInput
    create: XOR<ImportBatchCreateWithoutEnrollmentsInput, ImportBatchUncheckedCreateWithoutEnrollmentsInput>
  }

  export type ClassUpsertWithoutEnrollmentsInput = {
    update: XOR<ClassUpdateWithoutEnrollmentsInput, ClassUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<ClassCreateWithoutEnrollmentsInput, ClassUncheckedCreateWithoutEnrollmentsInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutEnrollmentsInput, ClassUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type ClassUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutTeacherClassesNestedInput
    importBatches?: ImportBatchUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    importBatches?: ImportBatchUncheckedUpdateManyWithoutClassNestedInput
  }

  export type UserUpsertWithoutEnrollmentsInput = {
    update: XOR<UserUpdateWithoutEnrollmentsInput, UserUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEnrollmentsInput, UserUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type UserUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUpdateManyWithoutUserNestedInput
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    quizSessions?: QuizSessionUpdateManyWithoutUserNestedInput
    importBatches?: ImportBatchUpdateManyWithoutTeacherNestedInput
  }

  export type UserUncheckedUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUncheckedUpdateManyWithoutUserNestedInput
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    quizSessions?: QuizSessionUncheckedUpdateManyWithoutUserNestedInput
    importBatches?: ImportBatchUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type ImportBatchUpsertWithoutEnrollmentsInput = {
    update: XOR<ImportBatchUpdateWithoutEnrollmentsInput, ImportBatchUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<ImportBatchCreateWithoutEnrollmentsInput, ImportBatchUncheckedCreateWithoutEnrollmentsInput>
    where?: ImportBatchWhereInput
  }

  export type ImportBatchUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: ImportBatchWhereInput
    data: XOR<ImportBatchUpdateWithoutEnrollmentsInput, ImportBatchUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type ImportBatchUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    recordsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutImportBatchesNestedInput
    class?: ClassUpdateOneRequiredWithoutImportBatchesNestedInput
  }

  export type ImportBatchUncheckedUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    recordsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutQuizSessionsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressCreateNestedManyWithoutUserInput
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    importBatches?: ImportBatchCreateNestedManyWithoutTeacherInput
  }

  export type UserUncheckedCreateWithoutQuizSessionsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressUncheckedCreateNestedManyWithoutUserInput
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    importBatches?: ImportBatchUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type UserCreateOrConnectWithoutQuizSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQuizSessionsInput, UserUncheckedCreateWithoutQuizSessionsInput>
  }

  export type UserUpsertWithoutQuizSessionsInput = {
    update: XOR<UserUpdateWithoutQuizSessionsInput, UserUncheckedUpdateWithoutQuizSessionsInput>
    create: XOR<UserCreateWithoutQuizSessionsInput, UserUncheckedCreateWithoutQuizSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQuizSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQuizSessionsInput, UserUncheckedUpdateWithoutQuizSessionsInput>
  }

  export type UserUpdateWithoutQuizSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUpdateManyWithoutUserNestedInput
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    importBatches?: ImportBatchUpdateManyWithoutTeacherNestedInput
  }

  export type UserUncheckedUpdateWithoutQuizSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUncheckedUpdateManyWithoutUserNestedInput
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    importBatches?: ImportBatchUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type UserCreateWithoutImportBatchesInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressCreateNestedManyWithoutUserInput
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    quizSessions?: QuizSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutImportBatchesInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentProgress?: StudentProgressUncheckedCreateNestedManyWithoutUserInput
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    quizSessions?: QuizSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutImportBatchesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutImportBatchesInput, UserUncheckedCreateWithoutImportBatchesInput>
  }

  export type ClassCreateWithoutImportBatchesInput = {
    id?: string
    name: string
    grade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher: UserCreateNestedOneWithoutTeacherClassesInput
    enrollments?: EnrollmentCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutImportBatchesInput = {
    id?: string
    name: string
    teacherId: string
    grade: string
    createdAt?: Date | string
    updatedAt?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutImportBatchesInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutImportBatchesInput, ClassUncheckedCreateWithoutImportBatchesInput>
  }

  export type EnrollmentCreateWithoutImportBatchInput = {
    id?: string
    enrolledAt?: Date | string
    parentEmail?: string | null
    parentPhone?: string | null
    comments?: string | null
    class: ClassCreateNestedOneWithoutEnrollmentsInput
    student: UserCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutImportBatchInput = {
    id?: string
    classId: string
    studentId: string
    enrolledAt?: Date | string
    parentEmail?: string | null
    parentPhone?: string | null
    comments?: string | null
  }

  export type EnrollmentCreateOrConnectWithoutImportBatchInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutImportBatchInput, EnrollmentUncheckedCreateWithoutImportBatchInput>
  }

  export type EnrollmentCreateManyImportBatchInputEnvelope = {
    data: EnrollmentCreateManyImportBatchInput | EnrollmentCreateManyImportBatchInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutImportBatchesInput = {
    update: XOR<UserUpdateWithoutImportBatchesInput, UserUncheckedUpdateWithoutImportBatchesInput>
    create: XOR<UserCreateWithoutImportBatchesInput, UserUncheckedCreateWithoutImportBatchesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutImportBatchesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutImportBatchesInput, UserUncheckedUpdateWithoutImportBatchesInput>
  }

  export type UserUpdateWithoutImportBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUpdateManyWithoutUserNestedInput
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    quizSessions?: QuizSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutImportBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentProgress?: StudentProgressUncheckedUpdateManyWithoutUserNestedInput
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    quizSessions?: QuizSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ClassUpsertWithoutImportBatchesInput = {
    update: XOR<ClassUpdateWithoutImportBatchesInput, ClassUncheckedUpdateWithoutImportBatchesInput>
    create: XOR<ClassCreateWithoutImportBatchesInput, ClassUncheckedCreateWithoutImportBatchesInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutImportBatchesInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutImportBatchesInput, ClassUncheckedUpdateWithoutImportBatchesInput>
  }

  export type ClassUpdateWithoutImportBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutTeacherClassesNestedInput
    enrollments?: EnrollmentUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutImportBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutClassNestedInput
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutImportBatchInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutImportBatchInput, EnrollmentUncheckedUpdateWithoutImportBatchInput>
    create: XOR<EnrollmentCreateWithoutImportBatchInput, EnrollmentUncheckedCreateWithoutImportBatchInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutImportBatchInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutImportBatchInput, EnrollmentUncheckedUpdateWithoutImportBatchInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutImportBatchInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutImportBatchInput>
  }

  export type StudentProgressCreateManyUserInput = {
    id?: string
    grade: string
    subject: string
    difficulty?: string
    totalScore?: number
    overallProgress?: number
    currentPlantStage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClassCreateManyTeacherInput = {
    id?: string
    name: string
    grade: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type EnrollmentCreateManyStudentInput = {
    id?: string
    classId: string
    enrolledAt?: Date | string
    parentEmail?: string | null
    parentPhone?: string | null
    importBatchId?: string | null
    comments?: string | null
  }

  export type QuizSessionCreateManyUserInput = {
    id?: string
    grade: string
    subject: string
    weekId: number
    difficulty: string
    currentQuestionIndex?: number
    selectedAnswer?: string | null
    isAnswered?: boolean
    isCorrect?: boolean
    timeRemaining?: number
    livesRemaining?: number
    scoreThisQuestion?: number
    correctCount?: number
    speedBonusCount?: number
    answersHistory: string
    status?: string
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ImportBatchCreateManyTeacherInput = {
    id?: string
    classId: string
    fileName: string
    recordsCount: number
    successCount: number
    failureCount: number
    errorLog?: string | null
    createdAt?: Date | string
  }

  export type StudentProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    totalScore?: IntFieldUpdateOperationsInput | number
    overallProgress?: FloatFieldUpdateOperationsInput | number
    currentPlantStage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weekProgress?: WeekProgressUpdateManyWithoutStudentProgressNestedInput
  }

  export type StudentProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    totalScore?: IntFieldUpdateOperationsInput | number
    overallProgress?: FloatFieldUpdateOperationsInput | number
    currentPlantStage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weekProgress?: WeekProgressUncheckedUpdateManyWithoutStudentProgressNestedInput
  }

  export type StudentProgressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    totalScore?: IntFieldUpdateOperationsInput | number
    overallProgress?: FloatFieldUpdateOperationsInput | number
    currentPlantStage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUpdateManyWithoutClassNestedInput
    importBatches?: ImportBatchUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutClassNestedInput
    importBatches?: ImportBatchUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    class?: ClassUpdateOneRequiredWithoutEnrollmentsNestedInput
    importBatch?: ImportBatchUpdateOneWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuizSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    currentQuestionIndex?: IntFieldUpdateOperationsInput | number
    selectedAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    timeRemaining?: IntFieldUpdateOperationsInput | number
    livesRemaining?: IntFieldUpdateOperationsInput | number
    scoreThisQuestion?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    speedBonusCount?: IntFieldUpdateOperationsInput | number
    answersHistory?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuizSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    currentQuestionIndex?: IntFieldUpdateOperationsInput | number
    selectedAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    timeRemaining?: IntFieldUpdateOperationsInput | number
    livesRemaining?: IntFieldUpdateOperationsInput | number
    scoreThisQuestion?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    speedBonusCount?: IntFieldUpdateOperationsInput | number
    answersHistory?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuizSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    currentQuestionIndex?: IntFieldUpdateOperationsInput | number
    selectedAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    timeRemaining?: IntFieldUpdateOperationsInput | number
    livesRemaining?: IntFieldUpdateOperationsInput | number
    scoreThisQuestion?: IntFieldUpdateOperationsInput | number
    correctCount?: IntFieldUpdateOperationsInput | number
    speedBonusCount?: IntFieldUpdateOperationsInput | number
    answersHistory?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ImportBatchUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    recordsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: ClassUpdateOneRequiredWithoutImportBatchesNestedInput
    enrollments?: EnrollmentUpdateManyWithoutImportBatchNestedInput
  }

  export type ImportBatchUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    recordsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutImportBatchNestedInput
  }

  export type ImportBatchUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    recordsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeekProgressCreateManyStudentProgressInput = {
    id?: string
    weekId: number
    completed?: boolean
    locked?: boolean
    score?: number
    questionsCorrect?: number
    questionsTotal?: number
    readingCompCorrect?: number
    readingCompTotal?: number
    keywordsMastered: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeekProgressUpdateWithoutStudentProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    locked?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    questionsCorrect?: IntFieldUpdateOperationsInput | number
    questionsTotal?: IntFieldUpdateOperationsInput | number
    readingCompCorrect?: IntFieldUpdateOperationsInput | number
    readingCompTotal?: IntFieldUpdateOperationsInput | number
    keywordsMastered?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeekProgressUncheckedUpdateWithoutStudentProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    locked?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    questionsCorrect?: IntFieldUpdateOperationsInput | number
    questionsTotal?: IntFieldUpdateOperationsInput | number
    readingCompCorrect?: IntFieldUpdateOperationsInput | number
    readingCompTotal?: IntFieldUpdateOperationsInput | number
    keywordsMastered?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeekProgressUncheckedUpdateManyWithoutStudentProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekId?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    locked?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    questionsCorrect?: IntFieldUpdateOperationsInput | number
    questionsTotal?: IntFieldUpdateOperationsInput | number
    readingCompCorrect?: IntFieldUpdateOperationsInput | number
    readingCompTotal?: IntFieldUpdateOperationsInput | number
    keywordsMastered?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateManyClassInput = {
    id?: string
    studentId: string
    enrolledAt?: Date | string
    parentEmail?: string | null
    parentPhone?: string | null
    importBatchId?: string | null
    comments?: string | null
  }

  export type ImportBatchCreateManyClassInput = {
    id?: string
    teacherId: string
    fileName: string
    recordsCount: number
    successCount: number
    failureCount: number
    errorLog?: string | null
    createdAt?: Date | string
  }

  export type EnrollmentUpdateWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    student?: UserUpdateOneRequiredWithoutEnrollmentsNestedInput
    importBatch?: ImportBatchUpdateOneWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnrollmentUncheckedUpdateManyWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ImportBatchUpdateWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    recordsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutImportBatchesNestedInput
    enrollments?: EnrollmentUpdateManyWithoutImportBatchNestedInput
  }

  export type ImportBatchUncheckedUpdateWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    recordsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutImportBatchNestedInput
  }

  export type ImportBatchUncheckedUpdateManyWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    recordsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorLog?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateManyImportBatchInput = {
    id?: string
    classId: string
    studentId: string
    enrolledAt?: Date | string
    parentEmail?: string | null
    parentPhone?: string | null
    comments?: string | null
  }

  export type EnrollmentUpdateWithoutImportBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    class?: ClassUpdateOneRequiredWithoutEnrollmentsNestedInput
    student?: UserUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutImportBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnrollmentUncheckedUpdateManyWithoutImportBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmail?: NullableStringFieldUpdateOperationsInput | string | null
    parentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}