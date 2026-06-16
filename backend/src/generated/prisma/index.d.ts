
/**
 * Client
**/

import * as runtime from './runtime/client.js';
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
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Guest
 * 
 */
export type Guest = $Result.DefaultSelection<Prisma.$GuestPayload>
/**
 * Model EventMedia
 * 
 */
export type EventMedia = $Result.DefaultSelection<Prisma.$EventMediaPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EventStatus: {
  ACTIVO: 'ACTIVO',
  FINALIZADO: 'FINALIZADO'
};

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus]


export const GuestStatus: {
  PENDIENTE: 'PENDIENTE',
  AUSENTE: 'AUSENTE',
  PRESENTE: 'PRESENTE'
};

export type GuestStatus = (typeof GuestStatus)[keyof typeof GuestStatus]


export const QrJobStatus: {
  IDLE: 'IDLE',
  PROCESSING: 'PROCESSING',
  DONE: 'DONE',
  ERROR: 'ERROR'
};

export type QrJobStatus = (typeof QrJobStatus)[keyof typeof QrJobStatus]

}

export type EventStatus = $Enums.EventStatus

export const EventStatus: typeof $Enums.EventStatus

export type GuestStatus = $Enums.GuestStatus

export const GuestStatus: typeof $Enums.GuestStatus

export type QrJobStatus = $Enums.QrJobStatus

export const QrJobStatus: typeof $Enums.QrJobStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

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
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guest`: Exposes CRUD operations for the **Guest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Guests
    * const guests = await prisma.guest.findMany()
    * ```
    */
  get guest(): Prisma.GuestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventMedia`: Exposes CRUD operations for the **EventMedia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventMedias
    * const eventMedias = await prisma.eventMedia.findMany()
    * ```
    */
  get eventMedia(): Prisma.EventMediaDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
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
    Event: 'Event',
    Guest: 'Guest',
    EventMedia: 'EventMedia'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "event" | "guest" | "eventMedia"
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
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Guest: {
        payload: Prisma.$GuestPayload<ExtArgs>
        fields: Prisma.GuestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          findFirst: {
            args: Prisma.GuestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          findMany: {
            args: Prisma.GuestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          create: {
            args: Prisma.GuestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          createMany: {
            args: Prisma.GuestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          delete: {
            args: Prisma.GuestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          update: {
            args: Prisma.GuestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          deleteMany: {
            args: Prisma.GuestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          upsert: {
            args: Prisma.GuestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          aggregate: {
            args: Prisma.GuestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuest>
          }
          groupBy: {
            args: Prisma.GuestGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuestGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuestCountArgs<ExtArgs>
            result: $Utils.Optional<GuestCountAggregateOutputType> | number
          }
        }
      }
      EventMedia: {
        payload: Prisma.$EventMediaPayload<ExtArgs>
        fields: Prisma.EventMediaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventMediaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventMediaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventMediaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventMediaPayload>
          }
          findFirst: {
            args: Prisma.EventMediaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventMediaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventMediaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventMediaPayload>
          }
          findMany: {
            args: Prisma.EventMediaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventMediaPayload>[]
          }
          create: {
            args: Prisma.EventMediaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventMediaPayload>
          }
          createMany: {
            args: Prisma.EventMediaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventMediaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventMediaPayload>[]
          }
          delete: {
            args: Prisma.EventMediaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventMediaPayload>
          }
          update: {
            args: Prisma.EventMediaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventMediaPayload>
          }
          deleteMany: {
            args: Prisma.EventMediaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventMediaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventMediaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventMediaPayload>[]
          }
          upsert: {
            args: Prisma.EventMediaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventMediaPayload>
          }
          aggregate: {
            args: Prisma.EventMediaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventMedia>
          }
          groupBy: {
            args: Prisma.EventMediaGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventMediaGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventMediaCountArgs<ExtArgs>
            result: $Utils.Optional<EventMediaCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    event?: EventOmit
    guest?: GuestOmit
    eventMedia?: EventMediaOmit
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
    events: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | UserCountOutputTypeCountEventsArgs
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
  export type UserCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    guests: number
    media: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guests?: boolean | EventCountOutputTypeCountGuestsArgs
    media?: boolean | EventCountOutputTypeCountMediaArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountGuestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountMediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventMediaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    contrasena: string | null
    nombre: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    contrasena: string | null
    nombre: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    contrasena: number
    nombre: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    contrasena?: true
    nombre?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    contrasena?: true
    nombre?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    contrasena?: true
    nombre?: true
    createdAt?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    contrasena: string
    nombre: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    contrasena?: boolean
    nombre?: boolean
    createdAt?: boolean
    events?: boolean | User$eventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    contrasena?: boolean
    nombre?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    contrasena?: boolean
    nombre?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    contrasena?: boolean
    nombre?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "contrasena" | "nombre" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | User$eventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      events: Prisma.$EventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      contrasena: string
      nombre: string
      createdAt: Date
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
    events<T extends User$eventsArgs<ExtArgs> = {}>(args?: Subset<T, User$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly contrasena: FieldRef<"User", 'String'>
    readonly nombre: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
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
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
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
   * User.events
   */
  export type User$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
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
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    id_evento: number | null
    cant_invitados: number | null
    porcentajeAsistencia: number | null
    ownerId: number | null
    qrJobTotal: number | null
    qrJobProcessed: number | null
    qrJobRequestedBy: number | null
    invitationQrX: number | null
    invitationQrY: number | null
    invitationQrSize: number | null
    checkedInCount: number | null
  }

  export type EventSumAggregateOutputType = {
    id_evento: number | null
    cant_invitados: number | null
    porcentajeAsistencia: number | null
    ownerId: number | null
    qrJobTotal: number | null
    qrJobProcessed: number | null
    qrJobRequestedBy: number | null
    invitationQrX: number | null
    invitationQrY: number | null
    invitationQrSize: number | null
    checkedInCount: number | null
  }

  export type EventMinAggregateOutputType = {
    id_evento: number | null
    nombre: string | null
    fecha: Date | null
    locacion: string | null
    tipo: string | null
    salon: string | null
    cant_invitados: number | null
    coverImage: string | null
    Estado: $Enums.EventStatus | null
    porcentajeAsistencia: number | null
    ownerId: number | null
    qrJobStatus: $Enums.QrJobStatus | null
    qrGeneratedAt: Date | null
    qrJobStartedAt: Date | null
    qrJobFinishedAt: Date | null
    qrJobError: string | null
    qrJobTotal: number | null
    qrJobProcessed: number | null
    qrJobRequestedBy: number | null
    invitationBaseImageUrl: string | null
    invitationQrX: number | null
    invitationQrY: number | null
    invitationQrSize: number | null
    checkedInCount: number | null
    createdAt: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id_evento: number | null
    nombre: string | null
    fecha: Date | null
    locacion: string | null
    tipo: string | null
    salon: string | null
    cant_invitados: number | null
    coverImage: string | null
    Estado: $Enums.EventStatus | null
    porcentajeAsistencia: number | null
    ownerId: number | null
    qrJobStatus: $Enums.QrJobStatus | null
    qrGeneratedAt: Date | null
    qrJobStartedAt: Date | null
    qrJobFinishedAt: Date | null
    qrJobError: string | null
    qrJobTotal: number | null
    qrJobProcessed: number | null
    qrJobRequestedBy: number | null
    invitationBaseImageUrl: string | null
    invitationQrX: number | null
    invitationQrY: number | null
    invitationQrSize: number | null
    checkedInCount: number | null
    createdAt: Date | null
  }

  export type EventCountAggregateOutputType = {
    id_evento: number
    nombre: number
    fecha: number
    locacion: number
    tipo: number
    salon: number
    cant_invitados: number
    coverImage: number
    Estado: number
    porcentajeAsistencia: number
    ownerId: number
    qrJobStatus: number
    qrGeneratedAt: number
    qrJobStartedAt: number
    qrJobFinishedAt: number
    qrJobError: number
    qrJobTotal: number
    qrJobProcessed: number
    qrJobRequestedBy: number
    invitationBaseImageUrl: number
    invitationQrX: number
    invitationQrY: number
    invitationQrSize: number
    checkedInCount: number
    createdAt: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    id_evento?: true
    cant_invitados?: true
    porcentajeAsistencia?: true
    ownerId?: true
    qrJobTotal?: true
    qrJobProcessed?: true
    qrJobRequestedBy?: true
    invitationQrX?: true
    invitationQrY?: true
    invitationQrSize?: true
    checkedInCount?: true
  }

  export type EventSumAggregateInputType = {
    id_evento?: true
    cant_invitados?: true
    porcentajeAsistencia?: true
    ownerId?: true
    qrJobTotal?: true
    qrJobProcessed?: true
    qrJobRequestedBy?: true
    invitationQrX?: true
    invitationQrY?: true
    invitationQrSize?: true
    checkedInCount?: true
  }

  export type EventMinAggregateInputType = {
    id_evento?: true
    nombre?: true
    fecha?: true
    locacion?: true
    tipo?: true
    salon?: true
    cant_invitados?: true
    coverImage?: true
    Estado?: true
    porcentajeAsistencia?: true
    ownerId?: true
    qrJobStatus?: true
    qrGeneratedAt?: true
    qrJobStartedAt?: true
    qrJobFinishedAt?: true
    qrJobError?: true
    qrJobTotal?: true
    qrJobProcessed?: true
    qrJobRequestedBy?: true
    invitationBaseImageUrl?: true
    invitationQrX?: true
    invitationQrY?: true
    invitationQrSize?: true
    checkedInCount?: true
    createdAt?: true
  }

  export type EventMaxAggregateInputType = {
    id_evento?: true
    nombre?: true
    fecha?: true
    locacion?: true
    tipo?: true
    salon?: true
    cant_invitados?: true
    coverImage?: true
    Estado?: true
    porcentajeAsistencia?: true
    ownerId?: true
    qrJobStatus?: true
    qrGeneratedAt?: true
    qrJobStartedAt?: true
    qrJobFinishedAt?: true
    qrJobError?: true
    qrJobTotal?: true
    qrJobProcessed?: true
    qrJobRequestedBy?: true
    invitationBaseImageUrl?: true
    invitationQrX?: true
    invitationQrY?: true
    invitationQrSize?: true
    checkedInCount?: true
    createdAt?: true
  }

  export type EventCountAggregateInputType = {
    id_evento?: true
    nombre?: true
    fecha?: true
    locacion?: true
    tipo?: true
    salon?: true
    cant_invitados?: true
    coverImage?: true
    Estado?: true
    porcentajeAsistencia?: true
    ownerId?: true
    qrJobStatus?: true
    qrGeneratedAt?: true
    qrJobStartedAt?: true
    qrJobFinishedAt?: true
    qrJobError?: true
    qrJobTotal?: true
    qrJobProcessed?: true
    qrJobRequestedBy?: true
    invitationBaseImageUrl?: true
    invitationQrX?: true
    invitationQrY?: true
    invitationQrSize?: true
    checkedInCount?: true
    createdAt?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id_evento: number
    nombre: string
    fecha: Date
    locacion: string
    tipo: string
    salon: string
    cant_invitados: number
    coverImage: string | null
    Estado: $Enums.EventStatus
    porcentajeAsistencia: number
    ownerId: number
    qrJobStatus: $Enums.QrJobStatus
    qrGeneratedAt: Date | null
    qrJobStartedAt: Date | null
    qrJobFinishedAt: Date | null
    qrJobError: string | null
    qrJobTotal: number | null
    qrJobProcessed: number | null
    qrJobRequestedBy: number | null
    invitationBaseImageUrl: string | null
    invitationQrX: number | null
    invitationQrY: number | null
    invitationQrSize: number | null
    checkedInCount: number
    createdAt: Date
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_evento?: boolean
    nombre?: boolean
    fecha?: boolean
    locacion?: boolean
    tipo?: boolean
    salon?: boolean
    cant_invitados?: boolean
    coverImage?: boolean
    Estado?: boolean
    porcentajeAsistencia?: boolean
    ownerId?: boolean
    qrJobStatus?: boolean
    qrGeneratedAt?: boolean
    qrJobStartedAt?: boolean
    qrJobFinishedAt?: boolean
    qrJobError?: boolean
    qrJobTotal?: boolean
    qrJobProcessed?: boolean
    qrJobRequestedBy?: boolean
    invitationBaseImageUrl?: boolean
    invitationQrX?: boolean
    invitationQrY?: boolean
    invitationQrSize?: boolean
    checkedInCount?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    guests?: boolean | Event$guestsArgs<ExtArgs>
    media?: boolean | Event$mediaArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_evento?: boolean
    nombre?: boolean
    fecha?: boolean
    locacion?: boolean
    tipo?: boolean
    salon?: boolean
    cant_invitados?: boolean
    coverImage?: boolean
    Estado?: boolean
    porcentajeAsistencia?: boolean
    ownerId?: boolean
    qrJobStatus?: boolean
    qrGeneratedAt?: boolean
    qrJobStartedAt?: boolean
    qrJobFinishedAt?: boolean
    qrJobError?: boolean
    qrJobTotal?: boolean
    qrJobProcessed?: boolean
    qrJobRequestedBy?: boolean
    invitationBaseImageUrl?: boolean
    invitationQrX?: boolean
    invitationQrY?: boolean
    invitationQrSize?: boolean
    checkedInCount?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_evento?: boolean
    nombre?: boolean
    fecha?: boolean
    locacion?: boolean
    tipo?: boolean
    salon?: boolean
    cant_invitados?: boolean
    coverImage?: boolean
    Estado?: boolean
    porcentajeAsistencia?: boolean
    ownerId?: boolean
    qrJobStatus?: boolean
    qrGeneratedAt?: boolean
    qrJobStartedAt?: boolean
    qrJobFinishedAt?: boolean
    qrJobError?: boolean
    qrJobTotal?: boolean
    qrJobProcessed?: boolean
    qrJobRequestedBy?: boolean
    invitationBaseImageUrl?: boolean
    invitationQrX?: boolean
    invitationQrY?: boolean
    invitationQrSize?: boolean
    checkedInCount?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id_evento?: boolean
    nombre?: boolean
    fecha?: boolean
    locacion?: boolean
    tipo?: boolean
    salon?: boolean
    cant_invitados?: boolean
    coverImage?: boolean
    Estado?: boolean
    porcentajeAsistencia?: boolean
    ownerId?: boolean
    qrJobStatus?: boolean
    qrGeneratedAt?: boolean
    qrJobStartedAt?: boolean
    qrJobFinishedAt?: boolean
    qrJobError?: boolean
    qrJobTotal?: boolean
    qrJobProcessed?: boolean
    qrJobRequestedBy?: boolean
    invitationBaseImageUrl?: boolean
    invitationQrX?: boolean
    invitationQrY?: boolean
    invitationQrSize?: boolean
    checkedInCount?: boolean
    createdAt?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_evento" | "nombre" | "fecha" | "locacion" | "tipo" | "salon" | "cant_invitados" | "coverImage" | "Estado" | "porcentajeAsistencia" | "ownerId" | "qrJobStatus" | "qrGeneratedAt" | "qrJobStartedAt" | "qrJobFinishedAt" | "qrJobError" | "qrJobTotal" | "qrJobProcessed" | "qrJobRequestedBy" | "invitationBaseImageUrl" | "invitationQrX" | "invitationQrY" | "invitationQrSize" | "checkedInCount" | "createdAt", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    guests?: boolean | Event$guestsArgs<ExtArgs>
    media?: boolean | Event$mediaArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      guests: Prisma.$GuestPayload<ExtArgs>[]
      media: Prisma.$EventMediaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_evento: number
      nombre: string
      fecha: Date
      locacion: string
      tipo: string
      salon: string
      cant_invitados: number
      coverImage: string | null
      Estado: $Enums.EventStatus
      porcentajeAsistencia: number
      ownerId: number
      qrJobStatus: $Enums.QrJobStatus
      qrGeneratedAt: Date | null
      qrJobStartedAt: Date | null
      qrJobFinishedAt: Date | null
      qrJobError: string | null
      qrJobTotal: number | null
      qrJobProcessed: number | null
      qrJobRequestedBy: number | null
      invitationBaseImageUrl: string | null
      invitationQrX: number | null
      invitationQrY: number | null
      invitationQrSize: number | null
      checkedInCount: number
      createdAt: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id_evento`
     * const eventWithId_eventoOnly = await prisma.event.findMany({ select: { id_evento: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id_evento`
     * const eventWithId_eventoOnly = await prisma.event.createManyAndReturn({
     *   select: { id_evento: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id_evento`
     * const eventWithId_eventoOnly = await prisma.event.updateManyAndReturn({
     *   select: { id_evento: true },
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
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
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
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    guests<T extends Event$guestsArgs<ExtArgs> = {}>(args?: Subset<T, Event$guestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    media<T extends Event$mediaArgs<ExtArgs> = {}>(args?: Subset<T, Event$mediaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventMediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id_evento: FieldRef<"Event", 'Int'>
    readonly nombre: FieldRef<"Event", 'String'>
    readonly fecha: FieldRef<"Event", 'DateTime'>
    readonly locacion: FieldRef<"Event", 'String'>
    readonly tipo: FieldRef<"Event", 'String'>
    readonly salon: FieldRef<"Event", 'String'>
    readonly cant_invitados: FieldRef<"Event", 'Int'>
    readonly coverImage: FieldRef<"Event", 'String'>
    readonly Estado: FieldRef<"Event", 'EventStatus'>
    readonly porcentajeAsistencia: FieldRef<"Event", 'Int'>
    readonly ownerId: FieldRef<"Event", 'Int'>
    readonly qrJobStatus: FieldRef<"Event", 'QrJobStatus'>
    readonly qrGeneratedAt: FieldRef<"Event", 'DateTime'>
    readonly qrJobStartedAt: FieldRef<"Event", 'DateTime'>
    readonly qrJobFinishedAt: FieldRef<"Event", 'DateTime'>
    readonly qrJobError: FieldRef<"Event", 'String'>
    readonly qrJobTotal: FieldRef<"Event", 'Int'>
    readonly qrJobProcessed: FieldRef<"Event", 'Int'>
    readonly qrJobRequestedBy: FieldRef<"Event", 'Int'>
    readonly invitationBaseImageUrl: FieldRef<"Event", 'String'>
    readonly invitationQrX: FieldRef<"Event", 'Int'>
    readonly invitationQrY: FieldRef<"Event", 'Int'>
    readonly invitationQrSize: FieldRef<"Event", 'Int'>
    readonly checkedInCount: FieldRef<"Event", 'Int'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.guests
   */
  export type Event$guestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    where?: GuestWhereInput
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    cursor?: GuestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Event.media
   */
  export type Event$mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventMedia
     */
    select?: EventMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventMedia
     */
    omit?: EventMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventMediaInclude<ExtArgs> | null
    where?: EventMediaWhereInput
    orderBy?: EventMediaOrderByWithRelationInput | EventMediaOrderByWithRelationInput[]
    cursor?: EventMediaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventMediaScalarFieldEnum | EventMediaScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model Guest
   */

  export type AggregateGuest = {
    _count: GuestCountAggregateOutputType | null
    _avg: GuestAvgAggregateOutputType | null
    _sum: GuestSumAggregateOutputType | null
    _min: GuestMinAggregateOutputType | null
    _max: GuestMaxAggregateOutputType | null
  }

  export type GuestAvgAggregateOutputType = {
    id: number | null
    cant_acompanantes: number | null
    eventId: number | null
  }

  export type GuestSumAggregateOutputType = {
    id: number | null
    cant_acompanantes: number | null
    eventId: number | null
  }

  export type GuestMinAggregateOutputType = {
    id: number | null
    documento: string | null
    nombre: string | null
    apellido: string | null
    email: string | null
    numero: string | null
    mesa: string | null
    status: $Enums.GuestStatus | null
    cant_acompanantes: number | null
    invitacionEnviada: boolean | null
    video: string | null
    foto: string | null
    qrImageUrl: string | null
    qrGeneratedAt: Date | null
    qrHash: string | null
    checkInTime: Date | null
    eventId: number | null
  }

  export type GuestMaxAggregateOutputType = {
    id: number | null
    documento: string | null
    nombre: string | null
    apellido: string | null
    email: string | null
    numero: string | null
    mesa: string | null
    status: $Enums.GuestStatus | null
    cant_acompanantes: number | null
    invitacionEnviada: boolean | null
    video: string | null
    foto: string | null
    qrImageUrl: string | null
    qrGeneratedAt: Date | null
    qrHash: string | null
    checkInTime: Date | null
    eventId: number | null
  }

  export type GuestCountAggregateOutputType = {
    id: number
    documento: number
    nombre: number
    apellido: number
    email: number
    numero: number
    mesa: number
    status: number
    cant_acompanantes: number
    invitacionEnviada: number
    video: number
    foto: number
    qrImageUrl: number
    qrGeneratedAt: number
    qrHash: number
    checkInTime: number
    eventId: number
    _all: number
  }


  export type GuestAvgAggregateInputType = {
    id?: true
    cant_acompanantes?: true
    eventId?: true
  }

  export type GuestSumAggregateInputType = {
    id?: true
    cant_acompanantes?: true
    eventId?: true
  }

  export type GuestMinAggregateInputType = {
    id?: true
    documento?: true
    nombre?: true
    apellido?: true
    email?: true
    numero?: true
    mesa?: true
    status?: true
    cant_acompanantes?: true
    invitacionEnviada?: true
    video?: true
    foto?: true
    qrImageUrl?: true
    qrGeneratedAt?: true
    qrHash?: true
    checkInTime?: true
    eventId?: true
  }

  export type GuestMaxAggregateInputType = {
    id?: true
    documento?: true
    nombre?: true
    apellido?: true
    email?: true
    numero?: true
    mesa?: true
    status?: true
    cant_acompanantes?: true
    invitacionEnviada?: true
    video?: true
    foto?: true
    qrImageUrl?: true
    qrGeneratedAt?: true
    qrHash?: true
    checkInTime?: true
    eventId?: true
  }

  export type GuestCountAggregateInputType = {
    id?: true
    documento?: true
    nombre?: true
    apellido?: true
    email?: true
    numero?: true
    mesa?: true
    status?: true
    cant_acompanantes?: true
    invitacionEnviada?: true
    video?: true
    foto?: true
    qrImageUrl?: true
    qrGeneratedAt?: true
    qrHash?: true
    checkInTime?: true
    eventId?: true
    _all?: true
  }

  export type GuestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guest to aggregate.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Guests
    **/
    _count?: true | GuestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GuestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GuestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuestMaxAggregateInputType
  }

  export type GetGuestAggregateType<T extends GuestAggregateArgs> = {
        [P in keyof T & keyof AggregateGuest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuest[P]>
      : GetScalarType<T[P], AggregateGuest[P]>
  }




  export type GuestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestWhereInput
    orderBy?: GuestOrderByWithAggregationInput | GuestOrderByWithAggregationInput[]
    by: GuestScalarFieldEnum[] | GuestScalarFieldEnum
    having?: GuestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuestCountAggregateInputType | true
    _avg?: GuestAvgAggregateInputType
    _sum?: GuestSumAggregateInputType
    _min?: GuestMinAggregateInputType
    _max?: GuestMaxAggregateInputType
  }

  export type GuestGroupByOutputType = {
    id: number
    documento: string
    nombre: string
    apellido: string
    email: string | null
    numero: string | null
    mesa: string | null
    status: $Enums.GuestStatus
    cant_acompanantes: number | null
    invitacionEnviada: boolean
    video: string | null
    foto: string | null
    qrImageUrl: string | null
    qrGeneratedAt: Date | null
    qrHash: string
    checkInTime: Date | null
    eventId: number
    _count: GuestCountAggregateOutputType | null
    _avg: GuestAvgAggregateOutputType | null
    _sum: GuestSumAggregateOutputType | null
    _min: GuestMinAggregateOutputType | null
    _max: GuestMaxAggregateOutputType | null
  }

  type GetGuestGroupByPayload<T extends GuestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuestGroupByOutputType[P]>
            : GetScalarType<T[P], GuestGroupByOutputType[P]>
        }
      >
    >


  export type GuestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documento?: boolean
    nombre?: boolean
    apellido?: boolean
    email?: boolean
    numero?: boolean
    mesa?: boolean
    status?: boolean
    cant_acompanantes?: boolean
    invitacionEnviada?: boolean
    video?: boolean
    foto?: boolean
    qrImageUrl?: boolean
    qrGeneratedAt?: boolean
    qrHash?: boolean
    checkInTime?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documento?: boolean
    nombre?: boolean
    apellido?: boolean
    email?: boolean
    numero?: boolean
    mesa?: boolean
    status?: boolean
    cant_acompanantes?: boolean
    invitacionEnviada?: boolean
    video?: boolean
    foto?: boolean
    qrImageUrl?: boolean
    qrGeneratedAt?: boolean
    qrHash?: boolean
    checkInTime?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documento?: boolean
    nombre?: boolean
    apellido?: boolean
    email?: boolean
    numero?: boolean
    mesa?: boolean
    status?: boolean
    cant_acompanantes?: boolean
    invitacionEnviada?: boolean
    video?: boolean
    foto?: boolean
    qrImageUrl?: boolean
    qrGeneratedAt?: boolean
    qrHash?: boolean
    checkInTime?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectScalar = {
    id?: boolean
    documento?: boolean
    nombre?: boolean
    apellido?: boolean
    email?: boolean
    numero?: boolean
    mesa?: boolean
    status?: boolean
    cant_acompanantes?: boolean
    invitacionEnviada?: boolean
    video?: boolean
    foto?: boolean
    qrImageUrl?: boolean
    qrGeneratedAt?: boolean
    qrHash?: boolean
    checkInTime?: boolean
    eventId?: boolean
  }

  export type GuestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documento" | "nombre" | "apellido" | "email" | "numero" | "mesa" | "status" | "cant_acompanantes" | "invitacionEnviada" | "video" | "foto" | "qrImageUrl" | "qrGeneratedAt" | "qrHash" | "checkInTime" | "eventId", ExtArgs["result"]["guest"]>
  export type GuestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type GuestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type GuestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $GuestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Guest"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      documento: string
      nombre: string
      apellido: string
      email: string | null
      numero: string | null
      mesa: string | null
      status: $Enums.GuestStatus
      cant_acompanantes: number | null
      invitacionEnviada: boolean
      video: string | null
      foto: string | null
      qrImageUrl: string | null
      qrGeneratedAt: Date | null
      qrHash: string
      checkInTime: Date | null
      eventId: number
    }, ExtArgs["result"]["guest"]>
    composites: {}
  }

  type GuestGetPayload<S extends boolean | null | undefined | GuestDefaultArgs> = $Result.GetResult<Prisma.$GuestPayload, S>

  type GuestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuestCountAggregateInputType | true
    }

  export interface GuestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Guest'], meta: { name: 'Guest' } }
    /**
     * Find zero or one Guest that matches the filter.
     * @param {GuestFindUniqueArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuestFindUniqueArgs>(args: SelectSubset<T, GuestFindUniqueArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Guest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuestFindUniqueOrThrowArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuestFindUniqueOrThrowArgs>(args: SelectSubset<T, GuestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindFirstArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuestFindFirstArgs>(args?: SelectSubset<T, GuestFindFirstArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindFirstOrThrowArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuestFindFirstOrThrowArgs>(args?: SelectSubset<T, GuestFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Guests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Guests
     * const guests = await prisma.guest.findMany()
     * 
     * // Get first 10 Guests
     * const guests = await prisma.guest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guestWithIdOnly = await prisma.guest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GuestFindManyArgs>(args?: SelectSubset<T, GuestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Guest.
     * @param {GuestCreateArgs} args - Arguments to create a Guest.
     * @example
     * // Create one Guest
     * const Guest = await prisma.guest.create({
     *   data: {
     *     // ... data to create a Guest
     *   }
     * })
     * 
     */
    create<T extends GuestCreateArgs>(args: SelectSubset<T, GuestCreateArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Guests.
     * @param {GuestCreateManyArgs} args - Arguments to create many Guests.
     * @example
     * // Create many Guests
     * const guest = await prisma.guest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuestCreateManyArgs>(args?: SelectSubset<T, GuestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Guests and returns the data saved in the database.
     * @param {GuestCreateManyAndReturnArgs} args - Arguments to create many Guests.
     * @example
     * // Create many Guests
     * const guest = await prisma.guest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Guests and only return the `id`
     * const guestWithIdOnly = await prisma.guest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuestCreateManyAndReturnArgs>(args?: SelectSubset<T, GuestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Guest.
     * @param {GuestDeleteArgs} args - Arguments to delete one Guest.
     * @example
     * // Delete one Guest
     * const Guest = await prisma.guest.delete({
     *   where: {
     *     // ... filter to delete one Guest
     *   }
     * })
     * 
     */
    delete<T extends GuestDeleteArgs>(args: SelectSubset<T, GuestDeleteArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Guest.
     * @param {GuestUpdateArgs} args - Arguments to update one Guest.
     * @example
     * // Update one Guest
     * const guest = await prisma.guest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuestUpdateArgs>(args: SelectSubset<T, GuestUpdateArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Guests.
     * @param {GuestDeleteManyArgs} args - Arguments to filter Guests to delete.
     * @example
     * // Delete a few Guests
     * const { count } = await prisma.guest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuestDeleteManyArgs>(args?: SelectSubset<T, GuestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Guests
     * const guest = await prisma.guest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuestUpdateManyArgs>(args: SelectSubset<T, GuestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guests and returns the data updated in the database.
     * @param {GuestUpdateManyAndReturnArgs} args - Arguments to update many Guests.
     * @example
     * // Update many Guests
     * const guest = await prisma.guest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Guests and only return the `id`
     * const guestWithIdOnly = await prisma.guest.updateManyAndReturn({
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
    updateManyAndReturn<T extends GuestUpdateManyAndReturnArgs>(args: SelectSubset<T, GuestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Guest.
     * @param {GuestUpsertArgs} args - Arguments to update or create a Guest.
     * @example
     * // Update or create a Guest
     * const guest = await prisma.guest.upsert({
     *   create: {
     *     // ... data to create a Guest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Guest we want to update
     *   }
     * })
     */
    upsert<T extends GuestUpsertArgs>(args: SelectSubset<T, GuestUpsertArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Guests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestCountArgs} args - Arguments to filter Guests to count.
     * @example
     * // Count the number of Guests
     * const count = await prisma.guest.count({
     *   where: {
     *     // ... the filter for the Guests we want to count
     *   }
     * })
    **/
    count<T extends GuestCountArgs>(
      args?: Subset<T, GuestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Guest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GuestAggregateArgs>(args: Subset<T, GuestAggregateArgs>): Prisma.PrismaPromise<GetGuestAggregateType<T>>

    /**
     * Group by Guest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestGroupByArgs} args - Group by arguments.
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
      T extends GuestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuestGroupByArgs['orderBy'] }
        : { orderBy?: GuestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GuestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Guest model
   */
  readonly fields: GuestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Guest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Guest model
   */
  interface GuestFieldRefs {
    readonly id: FieldRef<"Guest", 'Int'>
    readonly documento: FieldRef<"Guest", 'String'>
    readonly nombre: FieldRef<"Guest", 'String'>
    readonly apellido: FieldRef<"Guest", 'String'>
    readonly email: FieldRef<"Guest", 'String'>
    readonly numero: FieldRef<"Guest", 'String'>
    readonly mesa: FieldRef<"Guest", 'String'>
    readonly status: FieldRef<"Guest", 'GuestStatus'>
    readonly cant_acompanantes: FieldRef<"Guest", 'Int'>
    readonly invitacionEnviada: FieldRef<"Guest", 'Boolean'>
    readonly video: FieldRef<"Guest", 'String'>
    readonly foto: FieldRef<"Guest", 'String'>
    readonly qrImageUrl: FieldRef<"Guest", 'String'>
    readonly qrGeneratedAt: FieldRef<"Guest", 'DateTime'>
    readonly qrHash: FieldRef<"Guest", 'String'>
    readonly checkInTime: FieldRef<"Guest", 'DateTime'>
    readonly eventId: FieldRef<"Guest", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Guest findUnique
   */
  export type GuestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest findUniqueOrThrow
   */
  export type GuestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest findFirst
   */
  export type GuestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guests.
     */
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest findFirstOrThrow
   */
  export type GuestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guests.
     */
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest findMany
   */
  export type GuestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guests to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guests.
     */
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest create
   */
  export type GuestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * The data needed to create a Guest.
     */
    data: XOR<GuestCreateInput, GuestUncheckedCreateInput>
  }

  /**
   * Guest createMany
   */
  export type GuestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Guests.
     */
    data: GuestCreateManyInput | GuestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Guest createManyAndReturn
   */
  export type GuestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * The data used to create many Guests.
     */
    data: GuestCreateManyInput | GuestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Guest update
   */
  export type GuestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * The data needed to update a Guest.
     */
    data: XOR<GuestUpdateInput, GuestUncheckedUpdateInput>
    /**
     * Choose, which Guest to update.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest updateMany
   */
  export type GuestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Guests.
     */
    data: XOR<GuestUpdateManyMutationInput, GuestUncheckedUpdateManyInput>
    /**
     * Filter which Guests to update
     */
    where?: GuestWhereInput
    /**
     * Limit how many Guests to update.
     */
    limit?: number
  }

  /**
   * Guest updateManyAndReturn
   */
  export type GuestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * The data used to update Guests.
     */
    data: XOR<GuestUpdateManyMutationInput, GuestUncheckedUpdateManyInput>
    /**
     * Filter which Guests to update
     */
    where?: GuestWhereInput
    /**
     * Limit how many Guests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Guest upsert
   */
  export type GuestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * The filter to search for the Guest to update in case it exists.
     */
    where: GuestWhereUniqueInput
    /**
     * In case the Guest found by the `where` argument doesn't exist, create a new Guest with this data.
     */
    create: XOR<GuestCreateInput, GuestUncheckedCreateInput>
    /**
     * In case the Guest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuestUpdateInput, GuestUncheckedUpdateInput>
  }

  /**
   * Guest delete
   */
  export type GuestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter which Guest to delete.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest deleteMany
   */
  export type GuestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guests to delete
     */
    where?: GuestWhereInput
    /**
     * Limit how many Guests to delete.
     */
    limit?: number
  }

  /**
   * Guest without action
   */
  export type GuestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
  }


  /**
   * Model EventMedia
   */

  export type AggregateEventMedia = {
    _count: EventMediaCountAggregateOutputType | null
    _avg: EventMediaAvgAggregateOutputType | null
    _sum: EventMediaSumAggregateOutputType | null
    _min: EventMediaMinAggregateOutputType | null
    _max: EventMediaMaxAggregateOutputType | null
  }

  export type EventMediaAvgAggregateOutputType = {
    id: number | null
    eventId: number | null
    mesa: number | null
    duracion: number | null
  }

  export type EventMediaSumAggregateOutputType = {
    id: number | null
    eventId: number | null
    mesa: number | null
    duracion: number | null
  }

  export type EventMediaMinAggregateOutputType = {
    id: number | null
    eventId: number | null
    publicId: string | null
    videoUrl: string | null
    nombre: string | null
    tipo: string | null
    mesa: number | null
    formato: string | null
    duracion: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventMediaMaxAggregateOutputType = {
    id: number | null
    eventId: number | null
    publicId: string | null
    videoUrl: string | null
    nombre: string | null
    tipo: string | null
    mesa: number | null
    formato: string | null
    duracion: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventMediaCountAggregateOutputType = {
    id: number
    eventId: number
    publicId: number
    videoUrl: number
    nombre: number
    tipo: number
    mesa: number
    formato: number
    duracion: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventMediaAvgAggregateInputType = {
    id?: true
    eventId?: true
    mesa?: true
    duracion?: true
  }

  export type EventMediaSumAggregateInputType = {
    id?: true
    eventId?: true
    mesa?: true
    duracion?: true
  }

  export type EventMediaMinAggregateInputType = {
    id?: true
    eventId?: true
    publicId?: true
    videoUrl?: true
    nombre?: true
    tipo?: true
    mesa?: true
    formato?: true
    duracion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventMediaMaxAggregateInputType = {
    id?: true
    eventId?: true
    publicId?: true
    videoUrl?: true
    nombre?: true
    tipo?: true
    mesa?: true
    formato?: true
    duracion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventMediaCountAggregateInputType = {
    id?: true
    eventId?: true
    publicId?: true
    videoUrl?: true
    nombre?: true
    tipo?: true
    mesa?: true
    formato?: true
    duracion?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventMediaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventMedia to aggregate.
     */
    where?: EventMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventMedias to fetch.
     */
    orderBy?: EventMediaOrderByWithRelationInput | EventMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventMedias
    **/
    _count?: true | EventMediaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventMediaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventMediaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMediaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMediaMaxAggregateInputType
  }

  export type GetEventMediaAggregateType<T extends EventMediaAggregateArgs> = {
        [P in keyof T & keyof AggregateEventMedia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventMedia[P]>
      : GetScalarType<T[P], AggregateEventMedia[P]>
  }




  export type EventMediaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventMediaWhereInput
    orderBy?: EventMediaOrderByWithAggregationInput | EventMediaOrderByWithAggregationInput[]
    by: EventMediaScalarFieldEnum[] | EventMediaScalarFieldEnum
    having?: EventMediaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventMediaCountAggregateInputType | true
    _avg?: EventMediaAvgAggregateInputType
    _sum?: EventMediaSumAggregateInputType
    _min?: EventMediaMinAggregateInputType
    _max?: EventMediaMaxAggregateInputType
  }

  export type EventMediaGroupByOutputType = {
    id: number
    eventId: number
    publicId: string
    videoUrl: string
    nombre: string
    tipo: string
    mesa: number | null
    formato: string | null
    duracion: number | null
    createdAt: Date
    updatedAt: Date
    _count: EventMediaCountAggregateOutputType | null
    _avg: EventMediaAvgAggregateOutputType | null
    _sum: EventMediaSumAggregateOutputType | null
    _min: EventMediaMinAggregateOutputType | null
    _max: EventMediaMaxAggregateOutputType | null
  }

  type GetEventMediaGroupByPayload<T extends EventMediaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventMediaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventMediaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventMediaGroupByOutputType[P]>
            : GetScalarType<T[P], EventMediaGroupByOutputType[P]>
        }
      >
    >


  export type EventMediaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    publicId?: boolean
    videoUrl?: boolean
    nombre?: boolean
    tipo?: boolean
    mesa?: boolean
    formato?: boolean
    duracion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventMedia"]>

  export type EventMediaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    publicId?: boolean
    videoUrl?: boolean
    nombre?: boolean
    tipo?: boolean
    mesa?: boolean
    formato?: boolean
    duracion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventMedia"]>

  export type EventMediaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    publicId?: boolean
    videoUrl?: boolean
    nombre?: boolean
    tipo?: boolean
    mesa?: boolean
    formato?: boolean
    duracion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventMedia"]>

  export type EventMediaSelectScalar = {
    id?: boolean
    eventId?: boolean
    publicId?: boolean
    videoUrl?: boolean
    nombre?: boolean
    tipo?: boolean
    mesa?: boolean
    formato?: boolean
    duracion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventMediaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventId" | "publicId" | "videoUrl" | "nombre" | "tipo" | "mesa" | "formato" | "duracion" | "createdAt" | "updatedAt", ExtArgs["result"]["eventMedia"]>
  export type EventMediaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type EventMediaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type EventMediaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $EventMediaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventMedia"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      eventId: number
      publicId: string
      videoUrl: string
      nombre: string
      tipo: string
      mesa: number | null
      formato: string | null
      duracion: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["eventMedia"]>
    composites: {}
  }

  type EventMediaGetPayload<S extends boolean | null | undefined | EventMediaDefaultArgs> = $Result.GetResult<Prisma.$EventMediaPayload, S>

  type EventMediaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventMediaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventMediaCountAggregateInputType | true
    }

  export interface EventMediaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventMedia'], meta: { name: 'EventMedia' } }
    /**
     * Find zero or one EventMedia that matches the filter.
     * @param {EventMediaFindUniqueArgs} args - Arguments to find a EventMedia
     * @example
     * // Get one EventMedia
     * const eventMedia = await prisma.eventMedia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventMediaFindUniqueArgs>(args: SelectSubset<T, EventMediaFindUniqueArgs<ExtArgs>>): Prisma__EventMediaClient<$Result.GetResult<Prisma.$EventMediaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventMedia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventMediaFindUniqueOrThrowArgs} args - Arguments to find a EventMedia
     * @example
     * // Get one EventMedia
     * const eventMedia = await prisma.eventMedia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventMediaFindUniqueOrThrowArgs>(args: SelectSubset<T, EventMediaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventMediaClient<$Result.GetResult<Prisma.$EventMediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventMedia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventMediaFindFirstArgs} args - Arguments to find a EventMedia
     * @example
     * // Get one EventMedia
     * const eventMedia = await prisma.eventMedia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventMediaFindFirstArgs>(args?: SelectSubset<T, EventMediaFindFirstArgs<ExtArgs>>): Prisma__EventMediaClient<$Result.GetResult<Prisma.$EventMediaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventMedia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventMediaFindFirstOrThrowArgs} args - Arguments to find a EventMedia
     * @example
     * // Get one EventMedia
     * const eventMedia = await prisma.eventMedia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventMediaFindFirstOrThrowArgs>(args?: SelectSubset<T, EventMediaFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventMediaClient<$Result.GetResult<Prisma.$EventMediaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventMedias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventMediaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventMedias
     * const eventMedias = await prisma.eventMedia.findMany()
     * 
     * // Get first 10 EventMedias
     * const eventMedias = await prisma.eventMedia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventMediaWithIdOnly = await prisma.eventMedia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventMediaFindManyArgs>(args?: SelectSubset<T, EventMediaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventMediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventMedia.
     * @param {EventMediaCreateArgs} args - Arguments to create a EventMedia.
     * @example
     * // Create one EventMedia
     * const EventMedia = await prisma.eventMedia.create({
     *   data: {
     *     // ... data to create a EventMedia
     *   }
     * })
     * 
     */
    create<T extends EventMediaCreateArgs>(args: SelectSubset<T, EventMediaCreateArgs<ExtArgs>>): Prisma__EventMediaClient<$Result.GetResult<Prisma.$EventMediaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventMedias.
     * @param {EventMediaCreateManyArgs} args - Arguments to create many EventMedias.
     * @example
     * // Create many EventMedias
     * const eventMedia = await prisma.eventMedia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventMediaCreateManyArgs>(args?: SelectSubset<T, EventMediaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventMedias and returns the data saved in the database.
     * @param {EventMediaCreateManyAndReturnArgs} args - Arguments to create many EventMedias.
     * @example
     * // Create many EventMedias
     * const eventMedia = await prisma.eventMedia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventMedias and only return the `id`
     * const eventMediaWithIdOnly = await prisma.eventMedia.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventMediaCreateManyAndReturnArgs>(args?: SelectSubset<T, EventMediaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventMediaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventMedia.
     * @param {EventMediaDeleteArgs} args - Arguments to delete one EventMedia.
     * @example
     * // Delete one EventMedia
     * const EventMedia = await prisma.eventMedia.delete({
     *   where: {
     *     // ... filter to delete one EventMedia
     *   }
     * })
     * 
     */
    delete<T extends EventMediaDeleteArgs>(args: SelectSubset<T, EventMediaDeleteArgs<ExtArgs>>): Prisma__EventMediaClient<$Result.GetResult<Prisma.$EventMediaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventMedia.
     * @param {EventMediaUpdateArgs} args - Arguments to update one EventMedia.
     * @example
     * // Update one EventMedia
     * const eventMedia = await prisma.eventMedia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventMediaUpdateArgs>(args: SelectSubset<T, EventMediaUpdateArgs<ExtArgs>>): Prisma__EventMediaClient<$Result.GetResult<Prisma.$EventMediaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventMedias.
     * @param {EventMediaDeleteManyArgs} args - Arguments to filter EventMedias to delete.
     * @example
     * // Delete a few EventMedias
     * const { count } = await prisma.eventMedia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventMediaDeleteManyArgs>(args?: SelectSubset<T, EventMediaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventMedias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventMediaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventMedias
     * const eventMedia = await prisma.eventMedia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventMediaUpdateManyArgs>(args: SelectSubset<T, EventMediaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventMedias and returns the data updated in the database.
     * @param {EventMediaUpdateManyAndReturnArgs} args - Arguments to update many EventMedias.
     * @example
     * // Update many EventMedias
     * const eventMedia = await prisma.eventMedia.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventMedias and only return the `id`
     * const eventMediaWithIdOnly = await prisma.eventMedia.updateManyAndReturn({
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
    updateManyAndReturn<T extends EventMediaUpdateManyAndReturnArgs>(args: SelectSubset<T, EventMediaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventMediaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventMedia.
     * @param {EventMediaUpsertArgs} args - Arguments to update or create a EventMedia.
     * @example
     * // Update or create a EventMedia
     * const eventMedia = await prisma.eventMedia.upsert({
     *   create: {
     *     // ... data to create a EventMedia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventMedia we want to update
     *   }
     * })
     */
    upsert<T extends EventMediaUpsertArgs>(args: SelectSubset<T, EventMediaUpsertArgs<ExtArgs>>): Prisma__EventMediaClient<$Result.GetResult<Prisma.$EventMediaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventMedias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventMediaCountArgs} args - Arguments to filter EventMedias to count.
     * @example
     * // Count the number of EventMedias
     * const count = await prisma.eventMedia.count({
     *   where: {
     *     // ... the filter for the EventMedias we want to count
     *   }
     * })
    **/
    count<T extends EventMediaCountArgs>(
      args?: Subset<T, EventMediaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventMediaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventMedia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventMediaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventMediaAggregateArgs>(args: Subset<T, EventMediaAggregateArgs>): Prisma.PrismaPromise<GetEventMediaAggregateType<T>>

    /**
     * Group by EventMedia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventMediaGroupByArgs} args - Group by arguments.
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
      T extends EventMediaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventMediaGroupByArgs['orderBy'] }
        : { orderBy?: EventMediaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventMediaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventMediaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventMedia model
   */
  readonly fields: EventMediaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventMedia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventMediaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the EventMedia model
   */
  interface EventMediaFieldRefs {
    readonly id: FieldRef<"EventMedia", 'Int'>
    readonly eventId: FieldRef<"EventMedia", 'Int'>
    readonly publicId: FieldRef<"EventMedia", 'String'>
    readonly videoUrl: FieldRef<"EventMedia", 'String'>
    readonly nombre: FieldRef<"EventMedia", 'String'>
    readonly tipo: FieldRef<"EventMedia", 'String'>
    readonly mesa: FieldRef<"EventMedia", 'Int'>
    readonly formato: FieldRef<"EventMedia", 'String'>
    readonly duracion: FieldRef<"EventMedia", 'Int'>
    readonly createdAt: FieldRef<"EventMedia", 'DateTime'>
    readonly updatedAt: FieldRef<"EventMedia", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventMedia findUnique
   */
  export type EventMediaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventMedia
     */
    select?: EventMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventMedia
     */
    omit?: EventMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventMediaInclude<ExtArgs> | null
    /**
     * Filter, which EventMedia to fetch.
     */
    where: EventMediaWhereUniqueInput
  }

  /**
   * EventMedia findUniqueOrThrow
   */
  export type EventMediaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventMedia
     */
    select?: EventMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventMedia
     */
    omit?: EventMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventMediaInclude<ExtArgs> | null
    /**
     * Filter, which EventMedia to fetch.
     */
    where: EventMediaWhereUniqueInput
  }

  /**
   * EventMedia findFirst
   */
  export type EventMediaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventMedia
     */
    select?: EventMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventMedia
     */
    omit?: EventMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventMediaInclude<ExtArgs> | null
    /**
     * Filter, which EventMedia to fetch.
     */
    where?: EventMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventMedias to fetch.
     */
    orderBy?: EventMediaOrderByWithRelationInput | EventMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventMedias.
     */
    cursor?: EventMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventMedias.
     */
    distinct?: EventMediaScalarFieldEnum | EventMediaScalarFieldEnum[]
  }

  /**
   * EventMedia findFirstOrThrow
   */
  export type EventMediaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventMedia
     */
    select?: EventMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventMedia
     */
    omit?: EventMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventMediaInclude<ExtArgs> | null
    /**
     * Filter, which EventMedia to fetch.
     */
    where?: EventMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventMedias to fetch.
     */
    orderBy?: EventMediaOrderByWithRelationInput | EventMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventMedias.
     */
    cursor?: EventMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventMedias.
     */
    distinct?: EventMediaScalarFieldEnum | EventMediaScalarFieldEnum[]
  }

  /**
   * EventMedia findMany
   */
  export type EventMediaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventMedia
     */
    select?: EventMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventMedia
     */
    omit?: EventMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventMediaInclude<ExtArgs> | null
    /**
     * Filter, which EventMedias to fetch.
     */
    where?: EventMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventMedias to fetch.
     */
    orderBy?: EventMediaOrderByWithRelationInput | EventMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventMedias.
     */
    cursor?: EventMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventMedias.
     */
    distinct?: EventMediaScalarFieldEnum | EventMediaScalarFieldEnum[]
  }

  /**
   * EventMedia create
   */
  export type EventMediaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventMedia
     */
    select?: EventMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventMedia
     */
    omit?: EventMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventMediaInclude<ExtArgs> | null
    /**
     * The data needed to create a EventMedia.
     */
    data: XOR<EventMediaCreateInput, EventMediaUncheckedCreateInput>
  }

  /**
   * EventMedia createMany
   */
  export type EventMediaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventMedias.
     */
    data: EventMediaCreateManyInput | EventMediaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventMedia createManyAndReturn
   */
  export type EventMediaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventMedia
     */
    select?: EventMediaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventMedia
     */
    omit?: EventMediaOmit<ExtArgs> | null
    /**
     * The data used to create many EventMedias.
     */
    data: EventMediaCreateManyInput | EventMediaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventMediaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventMedia update
   */
  export type EventMediaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventMedia
     */
    select?: EventMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventMedia
     */
    omit?: EventMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventMediaInclude<ExtArgs> | null
    /**
     * The data needed to update a EventMedia.
     */
    data: XOR<EventMediaUpdateInput, EventMediaUncheckedUpdateInput>
    /**
     * Choose, which EventMedia to update.
     */
    where: EventMediaWhereUniqueInput
  }

  /**
   * EventMedia updateMany
   */
  export type EventMediaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventMedias.
     */
    data: XOR<EventMediaUpdateManyMutationInput, EventMediaUncheckedUpdateManyInput>
    /**
     * Filter which EventMedias to update
     */
    where?: EventMediaWhereInput
    /**
     * Limit how many EventMedias to update.
     */
    limit?: number
  }

  /**
   * EventMedia updateManyAndReturn
   */
  export type EventMediaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventMedia
     */
    select?: EventMediaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventMedia
     */
    omit?: EventMediaOmit<ExtArgs> | null
    /**
     * The data used to update EventMedias.
     */
    data: XOR<EventMediaUpdateManyMutationInput, EventMediaUncheckedUpdateManyInput>
    /**
     * Filter which EventMedias to update
     */
    where?: EventMediaWhereInput
    /**
     * Limit how many EventMedias to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventMediaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventMedia upsert
   */
  export type EventMediaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventMedia
     */
    select?: EventMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventMedia
     */
    omit?: EventMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventMediaInclude<ExtArgs> | null
    /**
     * The filter to search for the EventMedia to update in case it exists.
     */
    where: EventMediaWhereUniqueInput
    /**
     * In case the EventMedia found by the `where` argument doesn't exist, create a new EventMedia with this data.
     */
    create: XOR<EventMediaCreateInput, EventMediaUncheckedCreateInput>
    /**
     * In case the EventMedia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventMediaUpdateInput, EventMediaUncheckedUpdateInput>
  }

  /**
   * EventMedia delete
   */
  export type EventMediaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventMedia
     */
    select?: EventMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventMedia
     */
    omit?: EventMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventMediaInclude<ExtArgs> | null
    /**
     * Filter which EventMedia to delete.
     */
    where: EventMediaWhereUniqueInput
  }

  /**
   * EventMedia deleteMany
   */
  export type EventMediaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventMedias to delete
     */
    where?: EventMediaWhereInput
    /**
     * Limit how many EventMedias to delete.
     */
    limit?: number
  }

  /**
   * EventMedia without action
   */
  export type EventMediaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventMedia
     */
    select?: EventMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventMedia
     */
    omit?: EventMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventMediaInclude<ExtArgs> | null
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
    contrasena: 'contrasena',
    nombre: 'nombre',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id_evento: 'id_evento',
    nombre: 'nombre',
    fecha: 'fecha',
    locacion: 'locacion',
    tipo: 'tipo',
    salon: 'salon',
    cant_invitados: 'cant_invitados',
    coverImage: 'coverImage',
    Estado: 'Estado',
    porcentajeAsistencia: 'porcentajeAsistencia',
    ownerId: 'ownerId',
    qrJobStatus: 'qrJobStatus',
    qrGeneratedAt: 'qrGeneratedAt',
    qrJobStartedAt: 'qrJobStartedAt',
    qrJobFinishedAt: 'qrJobFinishedAt',
    qrJobError: 'qrJobError',
    qrJobTotal: 'qrJobTotal',
    qrJobProcessed: 'qrJobProcessed',
    qrJobRequestedBy: 'qrJobRequestedBy',
    invitationBaseImageUrl: 'invitationBaseImageUrl',
    invitationQrX: 'invitationQrX',
    invitationQrY: 'invitationQrY',
    invitationQrSize: 'invitationQrSize',
    checkedInCount: 'checkedInCount',
    createdAt: 'createdAt'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const GuestScalarFieldEnum: {
    id: 'id',
    documento: 'documento',
    nombre: 'nombre',
    apellido: 'apellido',
    email: 'email',
    numero: 'numero',
    mesa: 'mesa',
    status: 'status',
    cant_acompanantes: 'cant_acompanantes',
    invitacionEnviada: 'invitacionEnviada',
    video: 'video',
    foto: 'foto',
    qrImageUrl: 'qrImageUrl',
    qrGeneratedAt: 'qrGeneratedAt',
    qrHash: 'qrHash',
    checkInTime: 'checkInTime',
    eventId: 'eventId'
  };

  export type GuestScalarFieldEnum = (typeof GuestScalarFieldEnum)[keyof typeof GuestScalarFieldEnum]


  export const EventMediaScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    publicId: 'publicId',
    videoUrl: 'videoUrl',
    nombre: 'nombre',
    tipo: 'tipo',
    mesa: 'mesa',
    formato: 'formato',
    duracion: 'duracion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventMediaScalarFieldEnum = (typeof EventMediaScalarFieldEnum)[keyof typeof EventMediaScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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
   * Reference to a field of type 'EventStatus'
   */
  export type EnumEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventStatus'>
    


  /**
   * Reference to a field of type 'EventStatus[]'
   */
  export type ListEnumEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventStatus[]'>
    


  /**
   * Reference to a field of type 'QrJobStatus'
   */
  export type EnumQrJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QrJobStatus'>
    


  /**
   * Reference to a field of type 'QrJobStatus[]'
   */
  export type ListEnumQrJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QrJobStatus[]'>
    


  /**
   * Reference to a field of type 'GuestStatus'
   */
  export type EnumGuestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GuestStatus'>
    


  /**
   * Reference to a field of type 'GuestStatus[]'
   */
  export type ListEnumGuestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GuestStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    contrasena?: StringFilter<"User"> | string
    nombre?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    events?: EventListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    contrasena?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    events?: EventOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    contrasena?: StringFilter<"User"> | string
    nombre?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    events?: EventListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    contrasena?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    contrasena?: StringWithAggregatesFilter<"User"> | string
    nombre?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id_evento?: IntFilter<"Event"> | number
    nombre?: StringFilter<"Event"> | string
    fecha?: DateTimeFilter<"Event"> | Date | string
    locacion?: StringFilter<"Event"> | string
    tipo?: StringFilter<"Event"> | string
    salon?: StringFilter<"Event"> | string
    cant_invitados?: IntFilter<"Event"> | number
    coverImage?: StringNullableFilter<"Event"> | string | null
    Estado?: EnumEventStatusFilter<"Event"> | $Enums.EventStatus
    porcentajeAsistencia?: IntFilter<"Event"> | number
    ownerId?: IntFilter<"Event"> | number
    qrJobStatus?: EnumQrJobStatusFilter<"Event"> | $Enums.QrJobStatus
    qrGeneratedAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    qrJobStartedAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    qrJobFinishedAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    qrJobError?: StringNullableFilter<"Event"> | string | null
    qrJobTotal?: IntNullableFilter<"Event"> | number | null
    qrJobProcessed?: IntNullableFilter<"Event"> | number | null
    qrJobRequestedBy?: IntNullableFilter<"Event"> | number | null
    invitationBaseImageUrl?: StringNullableFilter<"Event"> | string | null
    invitationQrX?: IntNullableFilter<"Event"> | number | null
    invitationQrY?: IntNullableFilter<"Event"> | number | null
    invitationQrSize?: IntNullableFilter<"Event"> | number | null
    checkedInCount?: IntFilter<"Event"> | number
    createdAt?: DateTimeFilter<"Event"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    guests?: GuestListRelationFilter
    media?: EventMediaListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id_evento?: SortOrder
    nombre?: SortOrder
    fecha?: SortOrder
    locacion?: SortOrder
    tipo?: SortOrder
    salon?: SortOrder
    cant_invitados?: SortOrder
    coverImage?: SortOrderInput | SortOrder
    Estado?: SortOrder
    porcentajeAsistencia?: SortOrder
    ownerId?: SortOrder
    qrJobStatus?: SortOrder
    qrGeneratedAt?: SortOrderInput | SortOrder
    qrJobStartedAt?: SortOrderInput | SortOrder
    qrJobFinishedAt?: SortOrderInput | SortOrder
    qrJobError?: SortOrderInput | SortOrder
    qrJobTotal?: SortOrderInput | SortOrder
    qrJobProcessed?: SortOrderInput | SortOrder
    qrJobRequestedBy?: SortOrderInput | SortOrder
    invitationBaseImageUrl?: SortOrderInput | SortOrder
    invitationQrX?: SortOrderInput | SortOrder
    invitationQrY?: SortOrderInput | SortOrder
    invitationQrSize?: SortOrderInput | SortOrder
    checkedInCount?: SortOrder
    createdAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    guests?: GuestOrderByRelationAggregateInput
    media?: EventMediaOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id_evento?: number
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    nombre?: StringFilter<"Event"> | string
    fecha?: DateTimeFilter<"Event"> | Date | string
    locacion?: StringFilter<"Event"> | string
    tipo?: StringFilter<"Event"> | string
    salon?: StringFilter<"Event"> | string
    cant_invitados?: IntFilter<"Event"> | number
    coverImage?: StringNullableFilter<"Event"> | string | null
    Estado?: EnumEventStatusFilter<"Event"> | $Enums.EventStatus
    porcentajeAsistencia?: IntFilter<"Event"> | number
    ownerId?: IntFilter<"Event"> | number
    qrJobStatus?: EnumQrJobStatusFilter<"Event"> | $Enums.QrJobStatus
    qrGeneratedAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    qrJobStartedAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    qrJobFinishedAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    qrJobError?: StringNullableFilter<"Event"> | string | null
    qrJobTotal?: IntNullableFilter<"Event"> | number | null
    qrJobProcessed?: IntNullableFilter<"Event"> | number | null
    qrJobRequestedBy?: IntNullableFilter<"Event"> | number | null
    invitationBaseImageUrl?: StringNullableFilter<"Event"> | string | null
    invitationQrX?: IntNullableFilter<"Event"> | number | null
    invitationQrY?: IntNullableFilter<"Event"> | number | null
    invitationQrSize?: IntNullableFilter<"Event"> | number | null
    checkedInCount?: IntFilter<"Event"> | number
    createdAt?: DateTimeFilter<"Event"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    guests?: GuestListRelationFilter
    media?: EventMediaListRelationFilter
  }, "id_evento">

  export type EventOrderByWithAggregationInput = {
    id_evento?: SortOrder
    nombre?: SortOrder
    fecha?: SortOrder
    locacion?: SortOrder
    tipo?: SortOrder
    salon?: SortOrder
    cant_invitados?: SortOrder
    coverImage?: SortOrderInput | SortOrder
    Estado?: SortOrder
    porcentajeAsistencia?: SortOrder
    ownerId?: SortOrder
    qrJobStatus?: SortOrder
    qrGeneratedAt?: SortOrderInput | SortOrder
    qrJobStartedAt?: SortOrderInput | SortOrder
    qrJobFinishedAt?: SortOrderInput | SortOrder
    qrJobError?: SortOrderInput | SortOrder
    qrJobTotal?: SortOrderInput | SortOrder
    qrJobProcessed?: SortOrderInput | SortOrder
    qrJobRequestedBy?: SortOrderInput | SortOrder
    invitationBaseImageUrl?: SortOrderInput | SortOrder
    invitationQrX?: SortOrderInput | SortOrder
    invitationQrY?: SortOrderInput | SortOrder
    invitationQrSize?: SortOrderInput | SortOrder
    checkedInCount?: SortOrder
    createdAt?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id_evento?: IntWithAggregatesFilter<"Event"> | number
    nombre?: StringWithAggregatesFilter<"Event"> | string
    fecha?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    locacion?: StringWithAggregatesFilter<"Event"> | string
    tipo?: StringWithAggregatesFilter<"Event"> | string
    salon?: StringWithAggregatesFilter<"Event"> | string
    cant_invitados?: IntWithAggregatesFilter<"Event"> | number
    coverImage?: StringNullableWithAggregatesFilter<"Event"> | string | null
    Estado?: EnumEventStatusWithAggregatesFilter<"Event"> | $Enums.EventStatus
    porcentajeAsistencia?: IntWithAggregatesFilter<"Event"> | number
    ownerId?: IntWithAggregatesFilter<"Event"> | number
    qrJobStatus?: EnumQrJobStatusWithAggregatesFilter<"Event"> | $Enums.QrJobStatus
    qrGeneratedAt?: DateTimeNullableWithAggregatesFilter<"Event"> | Date | string | null
    qrJobStartedAt?: DateTimeNullableWithAggregatesFilter<"Event"> | Date | string | null
    qrJobFinishedAt?: DateTimeNullableWithAggregatesFilter<"Event"> | Date | string | null
    qrJobError?: StringNullableWithAggregatesFilter<"Event"> | string | null
    qrJobTotal?: IntNullableWithAggregatesFilter<"Event"> | number | null
    qrJobProcessed?: IntNullableWithAggregatesFilter<"Event"> | number | null
    qrJobRequestedBy?: IntNullableWithAggregatesFilter<"Event"> | number | null
    invitationBaseImageUrl?: StringNullableWithAggregatesFilter<"Event"> | string | null
    invitationQrX?: IntNullableWithAggregatesFilter<"Event"> | number | null
    invitationQrY?: IntNullableWithAggregatesFilter<"Event"> | number | null
    invitationQrSize?: IntNullableWithAggregatesFilter<"Event"> | number | null
    checkedInCount?: IntWithAggregatesFilter<"Event"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type GuestWhereInput = {
    AND?: GuestWhereInput | GuestWhereInput[]
    OR?: GuestWhereInput[]
    NOT?: GuestWhereInput | GuestWhereInput[]
    id?: IntFilter<"Guest"> | number
    documento?: StringFilter<"Guest"> | string
    nombre?: StringFilter<"Guest"> | string
    apellido?: StringFilter<"Guest"> | string
    email?: StringNullableFilter<"Guest"> | string | null
    numero?: StringNullableFilter<"Guest"> | string | null
    mesa?: StringNullableFilter<"Guest"> | string | null
    status?: EnumGuestStatusFilter<"Guest"> | $Enums.GuestStatus
    cant_acompanantes?: IntNullableFilter<"Guest"> | number | null
    invitacionEnviada?: BoolFilter<"Guest"> | boolean
    video?: StringNullableFilter<"Guest"> | string | null
    foto?: StringNullableFilter<"Guest"> | string | null
    qrImageUrl?: StringNullableFilter<"Guest"> | string | null
    qrGeneratedAt?: DateTimeNullableFilter<"Guest"> | Date | string | null
    qrHash?: StringFilter<"Guest"> | string
    checkInTime?: DateTimeNullableFilter<"Guest"> | Date | string | null
    eventId?: IntFilter<"Guest"> | number
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }

  export type GuestOrderByWithRelationInput = {
    id?: SortOrder
    documento?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrderInput | SortOrder
    numero?: SortOrderInput | SortOrder
    mesa?: SortOrderInput | SortOrder
    status?: SortOrder
    cant_acompanantes?: SortOrderInput | SortOrder
    invitacionEnviada?: SortOrder
    video?: SortOrderInput | SortOrder
    foto?: SortOrderInput | SortOrder
    qrImageUrl?: SortOrderInput | SortOrder
    qrGeneratedAt?: SortOrderInput | SortOrder
    qrHash?: SortOrder
    checkInTime?: SortOrderInput | SortOrder
    eventId?: SortOrder
    event?: EventOrderByWithRelationInput
  }

  export type GuestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email_eventId?: GuestEmailEventIdCompoundUniqueInput
    eventId_qrHash?: GuestEventIdQrHashCompoundUniqueInput
    AND?: GuestWhereInput | GuestWhereInput[]
    OR?: GuestWhereInput[]
    NOT?: GuestWhereInput | GuestWhereInput[]
    documento?: StringFilter<"Guest"> | string
    nombre?: StringFilter<"Guest"> | string
    apellido?: StringFilter<"Guest"> | string
    email?: StringNullableFilter<"Guest"> | string | null
    numero?: StringNullableFilter<"Guest"> | string | null
    mesa?: StringNullableFilter<"Guest"> | string | null
    status?: EnumGuestStatusFilter<"Guest"> | $Enums.GuestStatus
    cant_acompanantes?: IntNullableFilter<"Guest"> | number | null
    invitacionEnviada?: BoolFilter<"Guest"> | boolean
    video?: StringNullableFilter<"Guest"> | string | null
    foto?: StringNullableFilter<"Guest"> | string | null
    qrImageUrl?: StringNullableFilter<"Guest"> | string | null
    qrGeneratedAt?: DateTimeNullableFilter<"Guest"> | Date | string | null
    qrHash?: StringFilter<"Guest"> | string
    checkInTime?: DateTimeNullableFilter<"Guest"> | Date | string | null
    eventId?: IntFilter<"Guest"> | number
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }, "id" | "email_eventId" | "eventId_qrHash">

  export type GuestOrderByWithAggregationInput = {
    id?: SortOrder
    documento?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrderInput | SortOrder
    numero?: SortOrderInput | SortOrder
    mesa?: SortOrderInput | SortOrder
    status?: SortOrder
    cant_acompanantes?: SortOrderInput | SortOrder
    invitacionEnviada?: SortOrder
    video?: SortOrderInput | SortOrder
    foto?: SortOrderInput | SortOrder
    qrImageUrl?: SortOrderInput | SortOrder
    qrGeneratedAt?: SortOrderInput | SortOrder
    qrHash?: SortOrder
    checkInTime?: SortOrderInput | SortOrder
    eventId?: SortOrder
    _count?: GuestCountOrderByAggregateInput
    _avg?: GuestAvgOrderByAggregateInput
    _max?: GuestMaxOrderByAggregateInput
    _min?: GuestMinOrderByAggregateInput
    _sum?: GuestSumOrderByAggregateInput
  }

  export type GuestScalarWhereWithAggregatesInput = {
    AND?: GuestScalarWhereWithAggregatesInput | GuestScalarWhereWithAggregatesInput[]
    OR?: GuestScalarWhereWithAggregatesInput[]
    NOT?: GuestScalarWhereWithAggregatesInput | GuestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Guest"> | number
    documento?: StringWithAggregatesFilter<"Guest"> | string
    nombre?: StringWithAggregatesFilter<"Guest"> | string
    apellido?: StringWithAggregatesFilter<"Guest"> | string
    email?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    numero?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    mesa?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    status?: EnumGuestStatusWithAggregatesFilter<"Guest"> | $Enums.GuestStatus
    cant_acompanantes?: IntNullableWithAggregatesFilter<"Guest"> | number | null
    invitacionEnviada?: BoolWithAggregatesFilter<"Guest"> | boolean
    video?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    foto?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    qrImageUrl?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    qrGeneratedAt?: DateTimeNullableWithAggregatesFilter<"Guest"> | Date | string | null
    qrHash?: StringWithAggregatesFilter<"Guest"> | string
    checkInTime?: DateTimeNullableWithAggregatesFilter<"Guest"> | Date | string | null
    eventId?: IntWithAggregatesFilter<"Guest"> | number
  }

  export type EventMediaWhereInput = {
    AND?: EventMediaWhereInput | EventMediaWhereInput[]
    OR?: EventMediaWhereInput[]
    NOT?: EventMediaWhereInput | EventMediaWhereInput[]
    id?: IntFilter<"EventMedia"> | number
    eventId?: IntFilter<"EventMedia"> | number
    publicId?: StringFilter<"EventMedia"> | string
    videoUrl?: StringFilter<"EventMedia"> | string
    nombre?: StringFilter<"EventMedia"> | string
    tipo?: StringFilter<"EventMedia"> | string
    mesa?: IntNullableFilter<"EventMedia"> | number | null
    formato?: StringNullableFilter<"EventMedia"> | string | null
    duracion?: IntNullableFilter<"EventMedia"> | number | null
    createdAt?: DateTimeFilter<"EventMedia"> | Date | string
    updatedAt?: DateTimeFilter<"EventMedia"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }

  export type EventMediaOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    publicId?: SortOrder
    videoUrl?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    mesa?: SortOrderInput | SortOrder
    formato?: SortOrderInput | SortOrder
    duracion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    event?: EventOrderByWithRelationInput
  }

  export type EventMediaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EventMediaWhereInput | EventMediaWhereInput[]
    OR?: EventMediaWhereInput[]
    NOT?: EventMediaWhereInput | EventMediaWhereInput[]
    eventId?: IntFilter<"EventMedia"> | number
    publicId?: StringFilter<"EventMedia"> | string
    videoUrl?: StringFilter<"EventMedia"> | string
    nombre?: StringFilter<"EventMedia"> | string
    tipo?: StringFilter<"EventMedia"> | string
    mesa?: IntNullableFilter<"EventMedia"> | number | null
    formato?: StringNullableFilter<"EventMedia"> | string | null
    duracion?: IntNullableFilter<"EventMedia"> | number | null
    createdAt?: DateTimeFilter<"EventMedia"> | Date | string
    updatedAt?: DateTimeFilter<"EventMedia"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }, "id">

  export type EventMediaOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    publicId?: SortOrder
    videoUrl?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    mesa?: SortOrderInput | SortOrder
    formato?: SortOrderInput | SortOrder
    duracion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventMediaCountOrderByAggregateInput
    _avg?: EventMediaAvgOrderByAggregateInput
    _max?: EventMediaMaxOrderByAggregateInput
    _min?: EventMediaMinOrderByAggregateInput
    _sum?: EventMediaSumOrderByAggregateInput
  }

  export type EventMediaScalarWhereWithAggregatesInput = {
    AND?: EventMediaScalarWhereWithAggregatesInput | EventMediaScalarWhereWithAggregatesInput[]
    OR?: EventMediaScalarWhereWithAggregatesInput[]
    NOT?: EventMediaScalarWhereWithAggregatesInput | EventMediaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EventMedia"> | number
    eventId?: IntWithAggregatesFilter<"EventMedia"> | number
    publicId?: StringWithAggregatesFilter<"EventMedia"> | string
    videoUrl?: StringWithAggregatesFilter<"EventMedia"> | string
    nombre?: StringWithAggregatesFilter<"EventMedia"> | string
    tipo?: StringWithAggregatesFilter<"EventMedia"> | string
    mesa?: IntNullableWithAggregatesFilter<"EventMedia"> | number | null
    formato?: StringNullableWithAggregatesFilter<"EventMedia"> | string | null
    duracion?: IntNullableWithAggregatesFilter<"EventMedia"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"EventMedia"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EventMedia"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    contrasena: string
    nombre: string
    createdAt?: Date | string
    events?: EventCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    contrasena: string
    nombre: string
    createdAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    contrasena: string
    nombre: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    nombre: string
    fecha: Date | string
    locacion: string
    tipo: string
    salon: string
    cant_invitados: number
    coverImage?: string | null
    Estado?: $Enums.EventStatus
    porcentajeAsistencia?: number
    qrJobStatus?: $Enums.QrJobStatus
    qrGeneratedAt?: Date | string | null
    qrJobStartedAt?: Date | string | null
    qrJobFinishedAt?: Date | string | null
    qrJobError?: string | null
    qrJobTotal?: number | null
    qrJobProcessed?: number | null
    qrJobRequestedBy?: number | null
    invitationBaseImageUrl?: string | null
    invitationQrX?: number | null
    invitationQrY?: number | null
    invitationQrSize?: number | null
    checkedInCount?: number
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutEventsInput
    guests?: GuestCreateNestedManyWithoutEventInput
    media?: EventMediaCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id_evento?: number
    nombre: string
    fecha: Date | string
    locacion: string
    tipo: string
    salon: string
    cant_invitados: number
    coverImage?: string | null
    Estado?: $Enums.EventStatus
    porcentajeAsistencia?: number
    ownerId: number
    qrJobStatus?: $Enums.QrJobStatus
    qrGeneratedAt?: Date | string | null
    qrJobStartedAt?: Date | string | null
    qrJobFinishedAt?: Date | string | null
    qrJobError?: string | null
    qrJobTotal?: number | null
    qrJobProcessed?: number | null
    qrJobRequestedBy?: number | null
    invitationBaseImageUrl?: string | null
    invitationQrX?: number | null
    invitationQrY?: number | null
    invitationQrSize?: number | null
    checkedInCount?: number
    createdAt?: Date | string
    guests?: GuestUncheckedCreateNestedManyWithoutEventInput
    media?: EventMediaUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    locacion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    salon?: StringFieldUpdateOperationsInput | string
    cant_invitados?: IntFieldUpdateOperationsInput | number
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    Estado?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    porcentajeAsistencia?: IntFieldUpdateOperationsInput | number
    qrJobStatus?: EnumQrJobStatusFieldUpdateOperationsInput | $Enums.QrJobStatus
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobFinishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobError?: NullableStringFieldUpdateOperationsInput | string | null
    qrJobTotal?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobRequestedBy?: NullableIntFieldUpdateOperationsInput | number | null
    invitationBaseImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invitationQrX?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrY?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrSize?: NullableIntFieldUpdateOperationsInput | number | null
    checkedInCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutEventsNestedInput
    guests?: GuestUpdateManyWithoutEventNestedInput
    media?: EventMediaUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id_evento?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    locacion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    salon?: StringFieldUpdateOperationsInput | string
    cant_invitados?: IntFieldUpdateOperationsInput | number
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    Estado?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    porcentajeAsistencia?: IntFieldUpdateOperationsInput | number
    ownerId?: IntFieldUpdateOperationsInput | number
    qrJobStatus?: EnumQrJobStatusFieldUpdateOperationsInput | $Enums.QrJobStatus
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobFinishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobError?: NullableStringFieldUpdateOperationsInput | string | null
    qrJobTotal?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobRequestedBy?: NullableIntFieldUpdateOperationsInput | number | null
    invitationBaseImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invitationQrX?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrY?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrSize?: NullableIntFieldUpdateOperationsInput | number | null
    checkedInCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guests?: GuestUncheckedUpdateManyWithoutEventNestedInput
    media?: EventMediaUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id_evento?: number
    nombre: string
    fecha: Date | string
    locacion: string
    tipo: string
    salon: string
    cant_invitados: number
    coverImage?: string | null
    Estado?: $Enums.EventStatus
    porcentajeAsistencia?: number
    ownerId: number
    qrJobStatus?: $Enums.QrJobStatus
    qrGeneratedAt?: Date | string | null
    qrJobStartedAt?: Date | string | null
    qrJobFinishedAt?: Date | string | null
    qrJobError?: string | null
    qrJobTotal?: number | null
    qrJobProcessed?: number | null
    qrJobRequestedBy?: number | null
    invitationBaseImageUrl?: string | null
    invitationQrX?: number | null
    invitationQrY?: number | null
    invitationQrSize?: number | null
    checkedInCount?: number
    createdAt?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    locacion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    salon?: StringFieldUpdateOperationsInput | string
    cant_invitados?: IntFieldUpdateOperationsInput | number
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    Estado?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    porcentajeAsistencia?: IntFieldUpdateOperationsInput | number
    qrJobStatus?: EnumQrJobStatusFieldUpdateOperationsInput | $Enums.QrJobStatus
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobFinishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobError?: NullableStringFieldUpdateOperationsInput | string | null
    qrJobTotal?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobRequestedBy?: NullableIntFieldUpdateOperationsInput | number | null
    invitationBaseImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invitationQrX?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrY?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrSize?: NullableIntFieldUpdateOperationsInput | number | null
    checkedInCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id_evento?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    locacion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    salon?: StringFieldUpdateOperationsInput | string
    cant_invitados?: IntFieldUpdateOperationsInput | number
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    Estado?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    porcentajeAsistencia?: IntFieldUpdateOperationsInput | number
    ownerId?: IntFieldUpdateOperationsInput | number
    qrJobStatus?: EnumQrJobStatusFieldUpdateOperationsInput | $Enums.QrJobStatus
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobFinishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobError?: NullableStringFieldUpdateOperationsInput | string | null
    qrJobTotal?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobRequestedBy?: NullableIntFieldUpdateOperationsInput | number | null
    invitationBaseImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invitationQrX?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrY?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrSize?: NullableIntFieldUpdateOperationsInput | number | null
    checkedInCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestCreateInput = {
    documento: string
    nombre: string
    apellido: string
    email?: string | null
    numero?: string | null
    mesa?: string | null
    status?: $Enums.GuestStatus
    cant_acompanantes?: number | null
    invitacionEnviada?: boolean
    video?: string | null
    foto?: string | null
    qrImageUrl?: string | null
    qrGeneratedAt?: Date | string | null
    qrHash: string
    checkInTime?: Date | string | null
    event: EventCreateNestedOneWithoutGuestsInput
  }

  export type GuestUncheckedCreateInput = {
    id?: number
    documento: string
    nombre: string
    apellido: string
    email?: string | null
    numero?: string | null
    mesa?: string | null
    status?: $Enums.GuestStatus
    cant_acompanantes?: number | null
    invitacionEnviada?: boolean
    video?: string | null
    foto?: string | null
    qrImageUrl?: string | null
    qrGeneratedAt?: Date | string | null
    qrHash: string
    checkInTime?: Date | string | null
    eventId: number
  }

  export type GuestUpdateInput = {
    documento?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    mesa?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    cant_acompanantes?: NullableIntFieldUpdateOperationsInput | number | null
    invitacionEnviada?: BoolFieldUpdateOperationsInput | boolean
    video?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    qrImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrHash?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    event?: EventUpdateOneRequiredWithoutGuestsNestedInput
  }

  export type GuestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    documento?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    mesa?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    cant_acompanantes?: NullableIntFieldUpdateOperationsInput | number | null
    invitacionEnviada?: BoolFieldUpdateOperationsInput | boolean
    video?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    qrImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrHash?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eventId?: IntFieldUpdateOperationsInput | number
  }

  export type GuestCreateManyInput = {
    id?: number
    documento: string
    nombre: string
    apellido: string
    email?: string | null
    numero?: string | null
    mesa?: string | null
    status?: $Enums.GuestStatus
    cant_acompanantes?: number | null
    invitacionEnviada?: boolean
    video?: string | null
    foto?: string | null
    qrImageUrl?: string | null
    qrGeneratedAt?: Date | string | null
    qrHash: string
    checkInTime?: Date | string | null
    eventId: number
  }

  export type GuestUpdateManyMutationInput = {
    documento?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    mesa?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    cant_acompanantes?: NullableIntFieldUpdateOperationsInput | number | null
    invitacionEnviada?: BoolFieldUpdateOperationsInput | boolean
    video?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    qrImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrHash?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GuestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    documento?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    mesa?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    cant_acompanantes?: NullableIntFieldUpdateOperationsInput | number | null
    invitacionEnviada?: BoolFieldUpdateOperationsInput | boolean
    video?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    qrImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrHash?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eventId?: IntFieldUpdateOperationsInput | number
  }

  export type EventMediaCreateInput = {
    publicId: string
    videoUrl: string
    nombre: string
    tipo: string
    mesa?: number | null
    formato?: string | null
    duracion?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutMediaInput
  }

  export type EventMediaUncheckedCreateInput = {
    id?: number
    eventId: number
    publicId: string
    videoUrl: string
    nombre: string
    tipo: string
    mesa?: number | null
    formato?: string | null
    duracion?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventMediaUpdateInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    mesa?: NullableIntFieldUpdateOperationsInput | number | null
    formato?: NullableStringFieldUpdateOperationsInput | string | null
    duracion?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutMediaNestedInput
  }

  export type EventMediaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    publicId?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    mesa?: NullableIntFieldUpdateOperationsInput | number | null
    formato?: NullableStringFieldUpdateOperationsInput | string | null
    duracion?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventMediaCreateManyInput = {
    id?: number
    eventId: number
    publicId: string
    videoUrl: string
    nombre: string
    tipo: string
    mesa?: number | null
    formato?: string | null
    duracion?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventMediaUpdateManyMutationInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    mesa?: NullableIntFieldUpdateOperationsInput | number | null
    formato?: NullableStringFieldUpdateOperationsInput | string | null
    duracion?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventMediaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    publicId?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    mesa?: NullableIntFieldUpdateOperationsInput | number | null
    formato?: NullableStringFieldUpdateOperationsInput | string | null
    duracion?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    contrasena?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    contrasena?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    contrasena?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type EnumEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusFilter<$PrismaModel> | $Enums.EventStatus
  }

  export type EnumQrJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QrJobStatus | EnumQrJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QrJobStatus[] | ListEnumQrJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QrJobStatus[] | ListEnumQrJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQrJobStatusFilter<$PrismaModel> | $Enums.QrJobStatus
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

  export type GuestListRelationFilter = {
    every?: GuestWhereInput
    some?: GuestWhereInput
    none?: GuestWhereInput
  }

  export type EventMediaListRelationFilter = {
    every?: EventMediaWhereInput
    some?: EventMediaWhereInput
    none?: EventMediaWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GuestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventMediaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    id_evento?: SortOrder
    nombre?: SortOrder
    fecha?: SortOrder
    locacion?: SortOrder
    tipo?: SortOrder
    salon?: SortOrder
    cant_invitados?: SortOrder
    coverImage?: SortOrder
    Estado?: SortOrder
    porcentajeAsistencia?: SortOrder
    ownerId?: SortOrder
    qrJobStatus?: SortOrder
    qrGeneratedAt?: SortOrder
    qrJobStartedAt?: SortOrder
    qrJobFinishedAt?: SortOrder
    qrJobError?: SortOrder
    qrJobTotal?: SortOrder
    qrJobProcessed?: SortOrder
    qrJobRequestedBy?: SortOrder
    invitationBaseImageUrl?: SortOrder
    invitationQrX?: SortOrder
    invitationQrY?: SortOrder
    invitationQrSize?: SortOrder
    checkedInCount?: SortOrder
    createdAt?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    id_evento?: SortOrder
    cant_invitados?: SortOrder
    porcentajeAsistencia?: SortOrder
    ownerId?: SortOrder
    qrJobTotal?: SortOrder
    qrJobProcessed?: SortOrder
    qrJobRequestedBy?: SortOrder
    invitationQrX?: SortOrder
    invitationQrY?: SortOrder
    invitationQrSize?: SortOrder
    checkedInCount?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id_evento?: SortOrder
    nombre?: SortOrder
    fecha?: SortOrder
    locacion?: SortOrder
    tipo?: SortOrder
    salon?: SortOrder
    cant_invitados?: SortOrder
    coverImage?: SortOrder
    Estado?: SortOrder
    porcentajeAsistencia?: SortOrder
    ownerId?: SortOrder
    qrJobStatus?: SortOrder
    qrGeneratedAt?: SortOrder
    qrJobStartedAt?: SortOrder
    qrJobFinishedAt?: SortOrder
    qrJobError?: SortOrder
    qrJobTotal?: SortOrder
    qrJobProcessed?: SortOrder
    qrJobRequestedBy?: SortOrder
    invitationBaseImageUrl?: SortOrder
    invitationQrX?: SortOrder
    invitationQrY?: SortOrder
    invitationQrSize?: SortOrder
    checkedInCount?: SortOrder
    createdAt?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id_evento?: SortOrder
    nombre?: SortOrder
    fecha?: SortOrder
    locacion?: SortOrder
    tipo?: SortOrder
    salon?: SortOrder
    cant_invitados?: SortOrder
    coverImage?: SortOrder
    Estado?: SortOrder
    porcentajeAsistencia?: SortOrder
    ownerId?: SortOrder
    qrJobStatus?: SortOrder
    qrGeneratedAt?: SortOrder
    qrJobStartedAt?: SortOrder
    qrJobFinishedAt?: SortOrder
    qrJobError?: SortOrder
    qrJobTotal?: SortOrder
    qrJobProcessed?: SortOrder
    qrJobRequestedBy?: SortOrder
    invitationBaseImageUrl?: SortOrder
    invitationQrX?: SortOrder
    invitationQrY?: SortOrder
    invitationQrSize?: SortOrder
    checkedInCount?: SortOrder
    createdAt?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    id_evento?: SortOrder
    cant_invitados?: SortOrder
    porcentajeAsistencia?: SortOrder
    ownerId?: SortOrder
    qrJobTotal?: SortOrder
    qrJobProcessed?: SortOrder
    qrJobRequestedBy?: SortOrder
    invitationQrX?: SortOrder
    invitationQrY?: SortOrder
    invitationQrSize?: SortOrder
    checkedInCount?: SortOrder
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

  export type EnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }

  export type EnumQrJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QrJobStatus | EnumQrJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QrJobStatus[] | ListEnumQrJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QrJobStatus[] | ListEnumQrJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQrJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.QrJobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQrJobStatusFilter<$PrismaModel>
    _max?: NestedEnumQrJobStatusFilter<$PrismaModel>
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

  export type EnumGuestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GuestStatus | EnumGuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGuestStatusFilter<$PrismaModel> | $Enums.GuestStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type GuestEmailEventIdCompoundUniqueInput = {
    email: string
    eventId: number
  }

  export type GuestEventIdQrHashCompoundUniqueInput = {
    eventId: number
    qrHash: string
  }

  export type GuestCountOrderByAggregateInput = {
    id?: SortOrder
    documento?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    numero?: SortOrder
    mesa?: SortOrder
    status?: SortOrder
    cant_acompanantes?: SortOrder
    invitacionEnviada?: SortOrder
    video?: SortOrder
    foto?: SortOrder
    qrImageUrl?: SortOrder
    qrGeneratedAt?: SortOrder
    qrHash?: SortOrder
    checkInTime?: SortOrder
    eventId?: SortOrder
  }

  export type GuestAvgOrderByAggregateInput = {
    id?: SortOrder
    cant_acompanantes?: SortOrder
    eventId?: SortOrder
  }

  export type GuestMaxOrderByAggregateInput = {
    id?: SortOrder
    documento?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    numero?: SortOrder
    mesa?: SortOrder
    status?: SortOrder
    cant_acompanantes?: SortOrder
    invitacionEnviada?: SortOrder
    video?: SortOrder
    foto?: SortOrder
    qrImageUrl?: SortOrder
    qrGeneratedAt?: SortOrder
    qrHash?: SortOrder
    checkInTime?: SortOrder
    eventId?: SortOrder
  }

  export type GuestMinOrderByAggregateInput = {
    id?: SortOrder
    documento?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    numero?: SortOrder
    mesa?: SortOrder
    status?: SortOrder
    cant_acompanantes?: SortOrder
    invitacionEnviada?: SortOrder
    video?: SortOrder
    foto?: SortOrder
    qrImageUrl?: SortOrder
    qrGeneratedAt?: SortOrder
    qrHash?: SortOrder
    checkInTime?: SortOrder
    eventId?: SortOrder
  }

  export type GuestSumOrderByAggregateInput = {
    id?: SortOrder
    cant_acompanantes?: SortOrder
    eventId?: SortOrder
  }

  export type EnumGuestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GuestStatus | EnumGuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGuestStatusWithAggregatesFilter<$PrismaModel> | $Enums.GuestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGuestStatusFilter<$PrismaModel>
    _max?: NestedEnumGuestStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EventMediaCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    publicId?: SortOrder
    videoUrl?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    mesa?: SortOrder
    formato?: SortOrder
    duracion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventMediaAvgOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    mesa?: SortOrder
    duracion?: SortOrder
  }

  export type EventMediaMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    publicId?: SortOrder
    videoUrl?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    mesa?: SortOrder
    formato?: SortOrder
    duracion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventMediaMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    publicId?: SortOrder
    videoUrl?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    mesa?: SortOrder
    formato?: SortOrder
    duracion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventMediaSumOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    mesa?: SortOrder
    duracion?: SortOrder
  }

  export type EventCreateNestedManyWithoutOwnerInput = {
    create?: XOR<EventCreateWithoutOwnerInput, EventUncheckedCreateWithoutOwnerInput> | EventCreateWithoutOwnerInput[] | EventUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOwnerInput | EventCreateOrConnectWithoutOwnerInput[]
    createMany?: EventCreateManyOwnerInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<EventCreateWithoutOwnerInput, EventUncheckedCreateWithoutOwnerInput> | EventCreateWithoutOwnerInput[] | EventUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOwnerInput | EventCreateOrConnectWithoutOwnerInput[]
    createMany?: EventCreateManyOwnerInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EventUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<EventCreateWithoutOwnerInput, EventUncheckedCreateWithoutOwnerInput> | EventCreateWithoutOwnerInput[] | EventUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOwnerInput | EventCreateOrConnectWithoutOwnerInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutOwnerInput | EventUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: EventCreateManyOwnerInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutOwnerInput | EventUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: EventUpdateManyWithWhereWithoutOwnerInput | EventUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EventUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<EventCreateWithoutOwnerInput, EventUncheckedCreateWithoutOwnerInput> | EventCreateWithoutOwnerInput[] | EventUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOwnerInput | EventCreateOrConnectWithoutOwnerInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutOwnerInput | EventUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: EventCreateManyOwnerInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutOwnerInput | EventUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: EventUpdateManyWithWhereWithoutOwnerInput | EventUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEventsInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    connect?: UserWhereUniqueInput
  }

  export type GuestCreateNestedManyWithoutEventInput = {
    create?: XOR<GuestCreateWithoutEventInput, GuestUncheckedCreateWithoutEventInput> | GuestCreateWithoutEventInput[] | GuestUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutEventInput | GuestCreateOrConnectWithoutEventInput[]
    createMany?: GuestCreateManyEventInputEnvelope
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
  }

  export type EventMediaCreateNestedManyWithoutEventInput = {
    create?: XOR<EventMediaCreateWithoutEventInput, EventMediaUncheckedCreateWithoutEventInput> | EventMediaCreateWithoutEventInput[] | EventMediaUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventMediaCreateOrConnectWithoutEventInput | EventMediaCreateOrConnectWithoutEventInput[]
    createMany?: EventMediaCreateManyEventInputEnvelope
    connect?: EventMediaWhereUniqueInput | EventMediaWhereUniqueInput[]
  }

  export type GuestUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<GuestCreateWithoutEventInput, GuestUncheckedCreateWithoutEventInput> | GuestCreateWithoutEventInput[] | GuestUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutEventInput | GuestCreateOrConnectWithoutEventInput[]
    createMany?: GuestCreateManyEventInputEnvelope
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
  }

  export type EventMediaUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<EventMediaCreateWithoutEventInput, EventMediaUncheckedCreateWithoutEventInput> | EventMediaCreateWithoutEventInput[] | EventMediaUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventMediaCreateOrConnectWithoutEventInput | EventMediaCreateOrConnectWithoutEventInput[]
    createMany?: EventMediaCreateManyEventInputEnvelope
    connect?: EventMediaWhereUniqueInput | EventMediaWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumEventStatusFieldUpdateOperationsInput = {
    set?: $Enums.EventStatus
  }

  export type EnumQrJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.QrJobStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    upsert?: UserUpsertWithoutEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEventsInput, UserUpdateWithoutEventsInput>, UserUncheckedUpdateWithoutEventsInput>
  }

  export type GuestUpdateManyWithoutEventNestedInput = {
    create?: XOR<GuestCreateWithoutEventInput, GuestUncheckedCreateWithoutEventInput> | GuestCreateWithoutEventInput[] | GuestUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutEventInput | GuestCreateOrConnectWithoutEventInput[]
    upsert?: GuestUpsertWithWhereUniqueWithoutEventInput | GuestUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: GuestCreateManyEventInputEnvelope
    set?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    disconnect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    delete?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    update?: GuestUpdateWithWhereUniqueWithoutEventInput | GuestUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: GuestUpdateManyWithWhereWithoutEventInput | GuestUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: GuestScalarWhereInput | GuestScalarWhereInput[]
  }

  export type EventMediaUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventMediaCreateWithoutEventInput, EventMediaUncheckedCreateWithoutEventInput> | EventMediaCreateWithoutEventInput[] | EventMediaUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventMediaCreateOrConnectWithoutEventInput | EventMediaCreateOrConnectWithoutEventInput[]
    upsert?: EventMediaUpsertWithWhereUniqueWithoutEventInput | EventMediaUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventMediaCreateManyEventInputEnvelope
    set?: EventMediaWhereUniqueInput | EventMediaWhereUniqueInput[]
    disconnect?: EventMediaWhereUniqueInput | EventMediaWhereUniqueInput[]
    delete?: EventMediaWhereUniqueInput | EventMediaWhereUniqueInput[]
    connect?: EventMediaWhereUniqueInput | EventMediaWhereUniqueInput[]
    update?: EventMediaUpdateWithWhereUniqueWithoutEventInput | EventMediaUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventMediaUpdateManyWithWhereWithoutEventInput | EventMediaUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventMediaScalarWhereInput | EventMediaScalarWhereInput[]
  }

  export type GuestUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<GuestCreateWithoutEventInput, GuestUncheckedCreateWithoutEventInput> | GuestCreateWithoutEventInput[] | GuestUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutEventInput | GuestCreateOrConnectWithoutEventInput[]
    upsert?: GuestUpsertWithWhereUniqueWithoutEventInput | GuestUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: GuestCreateManyEventInputEnvelope
    set?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    disconnect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    delete?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    update?: GuestUpdateWithWhereUniqueWithoutEventInput | GuestUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: GuestUpdateManyWithWhereWithoutEventInput | GuestUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: GuestScalarWhereInput | GuestScalarWhereInput[]
  }

  export type EventMediaUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventMediaCreateWithoutEventInput, EventMediaUncheckedCreateWithoutEventInput> | EventMediaCreateWithoutEventInput[] | EventMediaUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventMediaCreateOrConnectWithoutEventInput | EventMediaCreateOrConnectWithoutEventInput[]
    upsert?: EventMediaUpsertWithWhereUniqueWithoutEventInput | EventMediaUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventMediaCreateManyEventInputEnvelope
    set?: EventMediaWhereUniqueInput | EventMediaWhereUniqueInput[]
    disconnect?: EventMediaWhereUniqueInput | EventMediaWhereUniqueInput[]
    delete?: EventMediaWhereUniqueInput | EventMediaWhereUniqueInput[]
    connect?: EventMediaWhereUniqueInput | EventMediaWhereUniqueInput[]
    update?: EventMediaUpdateWithWhereUniqueWithoutEventInput | EventMediaUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventMediaUpdateManyWithWhereWithoutEventInput | EventMediaUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventMediaScalarWhereInput | EventMediaScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutGuestsInput = {
    create?: XOR<EventCreateWithoutGuestsInput, EventUncheckedCreateWithoutGuestsInput>
    connectOrCreate?: EventCreateOrConnectWithoutGuestsInput
    connect?: EventWhereUniqueInput
  }

  export type EnumGuestStatusFieldUpdateOperationsInput = {
    set?: $Enums.GuestStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EventUpdateOneRequiredWithoutGuestsNestedInput = {
    create?: XOR<EventCreateWithoutGuestsInput, EventUncheckedCreateWithoutGuestsInput>
    connectOrCreate?: EventCreateOrConnectWithoutGuestsInput
    upsert?: EventUpsertWithoutGuestsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutGuestsInput, EventUpdateWithoutGuestsInput>, EventUncheckedUpdateWithoutGuestsInput>
  }

  export type EventCreateNestedOneWithoutMediaInput = {
    create?: XOR<EventCreateWithoutMediaInput, EventUncheckedCreateWithoutMediaInput>
    connectOrCreate?: EventCreateOrConnectWithoutMediaInput
    connect?: EventWhereUniqueInput
  }

  export type EventUpdateOneRequiredWithoutMediaNestedInput = {
    create?: XOR<EventCreateWithoutMediaInput, EventUncheckedCreateWithoutMediaInput>
    connectOrCreate?: EventCreateOrConnectWithoutMediaInput
    upsert?: EventUpsertWithoutMediaInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutMediaInput, EventUpdateWithoutMediaInput>, EventUncheckedUpdateWithoutMediaInput>
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

  export type NestedEnumEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusFilter<$PrismaModel> | $Enums.EventStatus
  }

  export type NestedEnumQrJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QrJobStatus | EnumQrJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QrJobStatus[] | ListEnumQrJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QrJobStatus[] | ListEnumQrJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQrJobStatusFilter<$PrismaModel> | $Enums.QrJobStatus
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

  export type NestedEnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }

  export type NestedEnumQrJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QrJobStatus | EnumQrJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QrJobStatus[] | ListEnumQrJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QrJobStatus[] | ListEnumQrJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQrJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.QrJobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQrJobStatusFilter<$PrismaModel>
    _max?: NestedEnumQrJobStatusFilter<$PrismaModel>
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

  export type NestedEnumGuestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GuestStatus | EnumGuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGuestStatusFilter<$PrismaModel> | $Enums.GuestStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumGuestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GuestStatus | EnumGuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuestStatus[] | ListEnumGuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGuestStatusWithAggregatesFilter<$PrismaModel> | $Enums.GuestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGuestStatusFilter<$PrismaModel>
    _max?: NestedEnumGuestStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EventCreateWithoutOwnerInput = {
    nombre: string
    fecha: Date | string
    locacion: string
    tipo: string
    salon: string
    cant_invitados: number
    coverImage?: string | null
    Estado?: $Enums.EventStatus
    porcentajeAsistencia?: number
    qrJobStatus?: $Enums.QrJobStatus
    qrGeneratedAt?: Date | string | null
    qrJobStartedAt?: Date | string | null
    qrJobFinishedAt?: Date | string | null
    qrJobError?: string | null
    qrJobTotal?: number | null
    qrJobProcessed?: number | null
    qrJobRequestedBy?: number | null
    invitationBaseImageUrl?: string | null
    invitationQrX?: number | null
    invitationQrY?: number | null
    invitationQrSize?: number | null
    checkedInCount?: number
    createdAt?: Date | string
    guests?: GuestCreateNestedManyWithoutEventInput
    media?: EventMediaCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutOwnerInput = {
    id_evento?: number
    nombre: string
    fecha: Date | string
    locacion: string
    tipo: string
    salon: string
    cant_invitados: number
    coverImage?: string | null
    Estado?: $Enums.EventStatus
    porcentajeAsistencia?: number
    qrJobStatus?: $Enums.QrJobStatus
    qrGeneratedAt?: Date | string | null
    qrJobStartedAt?: Date | string | null
    qrJobFinishedAt?: Date | string | null
    qrJobError?: string | null
    qrJobTotal?: number | null
    qrJobProcessed?: number | null
    qrJobRequestedBy?: number | null
    invitationBaseImageUrl?: string | null
    invitationQrX?: number | null
    invitationQrY?: number | null
    invitationQrSize?: number | null
    checkedInCount?: number
    createdAt?: Date | string
    guests?: GuestUncheckedCreateNestedManyWithoutEventInput
    media?: EventMediaUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutOwnerInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutOwnerInput, EventUncheckedCreateWithoutOwnerInput>
  }

  export type EventCreateManyOwnerInputEnvelope = {
    data: EventCreateManyOwnerInput | EventCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type EventUpsertWithWhereUniqueWithoutOwnerInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutOwnerInput, EventUncheckedUpdateWithoutOwnerInput>
    create: XOR<EventCreateWithoutOwnerInput, EventUncheckedCreateWithoutOwnerInput>
  }

  export type EventUpdateWithWhereUniqueWithoutOwnerInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutOwnerInput, EventUncheckedUpdateWithoutOwnerInput>
  }

  export type EventUpdateManyWithWhereWithoutOwnerInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutOwnerInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id_evento?: IntFilter<"Event"> | number
    nombre?: StringFilter<"Event"> | string
    fecha?: DateTimeFilter<"Event"> | Date | string
    locacion?: StringFilter<"Event"> | string
    tipo?: StringFilter<"Event"> | string
    salon?: StringFilter<"Event"> | string
    cant_invitados?: IntFilter<"Event"> | number
    coverImage?: StringNullableFilter<"Event"> | string | null
    Estado?: EnumEventStatusFilter<"Event"> | $Enums.EventStatus
    porcentajeAsistencia?: IntFilter<"Event"> | number
    ownerId?: IntFilter<"Event"> | number
    qrJobStatus?: EnumQrJobStatusFilter<"Event"> | $Enums.QrJobStatus
    qrGeneratedAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    qrJobStartedAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    qrJobFinishedAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    qrJobError?: StringNullableFilter<"Event"> | string | null
    qrJobTotal?: IntNullableFilter<"Event"> | number | null
    qrJobProcessed?: IntNullableFilter<"Event"> | number | null
    qrJobRequestedBy?: IntNullableFilter<"Event"> | number | null
    invitationBaseImageUrl?: StringNullableFilter<"Event"> | string | null
    invitationQrX?: IntNullableFilter<"Event"> | number | null
    invitationQrY?: IntNullableFilter<"Event"> | number | null
    invitationQrSize?: IntNullableFilter<"Event"> | number | null
    checkedInCount?: IntFilter<"Event"> | number
    createdAt?: DateTimeFilter<"Event"> | Date | string
  }

  export type UserCreateWithoutEventsInput = {
    email: string
    contrasena: string
    nombre: string
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutEventsInput = {
    id?: number
    email: string
    contrasena: string
    nombre: string
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
  }

  export type GuestCreateWithoutEventInput = {
    documento: string
    nombre: string
    apellido: string
    email?: string | null
    numero?: string | null
    mesa?: string | null
    status?: $Enums.GuestStatus
    cant_acompanantes?: number | null
    invitacionEnviada?: boolean
    video?: string | null
    foto?: string | null
    qrImageUrl?: string | null
    qrGeneratedAt?: Date | string | null
    qrHash: string
    checkInTime?: Date | string | null
  }

  export type GuestUncheckedCreateWithoutEventInput = {
    id?: number
    documento: string
    nombre: string
    apellido: string
    email?: string | null
    numero?: string | null
    mesa?: string | null
    status?: $Enums.GuestStatus
    cant_acompanantes?: number | null
    invitacionEnviada?: boolean
    video?: string | null
    foto?: string | null
    qrImageUrl?: string | null
    qrGeneratedAt?: Date | string | null
    qrHash: string
    checkInTime?: Date | string | null
  }

  export type GuestCreateOrConnectWithoutEventInput = {
    where: GuestWhereUniqueInput
    create: XOR<GuestCreateWithoutEventInput, GuestUncheckedCreateWithoutEventInput>
  }

  export type GuestCreateManyEventInputEnvelope = {
    data: GuestCreateManyEventInput | GuestCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type EventMediaCreateWithoutEventInput = {
    publicId: string
    videoUrl: string
    nombre: string
    tipo: string
    mesa?: number | null
    formato?: string | null
    duracion?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventMediaUncheckedCreateWithoutEventInput = {
    id?: number
    publicId: string
    videoUrl: string
    nombre: string
    tipo: string
    mesa?: number | null
    formato?: string | null
    duracion?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventMediaCreateOrConnectWithoutEventInput = {
    where: EventMediaWhereUniqueInput
    create: XOR<EventMediaCreateWithoutEventInput, EventMediaUncheckedCreateWithoutEventInput>
  }

  export type EventMediaCreateManyEventInputEnvelope = {
    data: EventMediaCreateManyEventInput | EventMediaCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutEventsInput = {
    update: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
  }

  export type UserUpdateWithoutEventsInput = {
    email?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestUpsertWithWhereUniqueWithoutEventInput = {
    where: GuestWhereUniqueInput
    update: XOR<GuestUpdateWithoutEventInput, GuestUncheckedUpdateWithoutEventInput>
    create: XOR<GuestCreateWithoutEventInput, GuestUncheckedCreateWithoutEventInput>
  }

  export type GuestUpdateWithWhereUniqueWithoutEventInput = {
    where: GuestWhereUniqueInput
    data: XOR<GuestUpdateWithoutEventInput, GuestUncheckedUpdateWithoutEventInput>
  }

  export type GuestUpdateManyWithWhereWithoutEventInput = {
    where: GuestScalarWhereInput
    data: XOR<GuestUpdateManyMutationInput, GuestUncheckedUpdateManyWithoutEventInput>
  }

  export type GuestScalarWhereInput = {
    AND?: GuestScalarWhereInput | GuestScalarWhereInput[]
    OR?: GuestScalarWhereInput[]
    NOT?: GuestScalarWhereInput | GuestScalarWhereInput[]
    id?: IntFilter<"Guest"> | number
    documento?: StringFilter<"Guest"> | string
    nombre?: StringFilter<"Guest"> | string
    apellido?: StringFilter<"Guest"> | string
    email?: StringNullableFilter<"Guest"> | string | null
    numero?: StringNullableFilter<"Guest"> | string | null
    mesa?: StringNullableFilter<"Guest"> | string | null
    status?: EnumGuestStatusFilter<"Guest"> | $Enums.GuestStatus
    cant_acompanantes?: IntNullableFilter<"Guest"> | number | null
    invitacionEnviada?: BoolFilter<"Guest"> | boolean
    video?: StringNullableFilter<"Guest"> | string | null
    foto?: StringNullableFilter<"Guest"> | string | null
    qrImageUrl?: StringNullableFilter<"Guest"> | string | null
    qrGeneratedAt?: DateTimeNullableFilter<"Guest"> | Date | string | null
    qrHash?: StringFilter<"Guest"> | string
    checkInTime?: DateTimeNullableFilter<"Guest"> | Date | string | null
    eventId?: IntFilter<"Guest"> | number
  }

  export type EventMediaUpsertWithWhereUniqueWithoutEventInput = {
    where: EventMediaWhereUniqueInput
    update: XOR<EventMediaUpdateWithoutEventInput, EventMediaUncheckedUpdateWithoutEventInput>
    create: XOR<EventMediaCreateWithoutEventInput, EventMediaUncheckedCreateWithoutEventInput>
  }

  export type EventMediaUpdateWithWhereUniqueWithoutEventInput = {
    where: EventMediaWhereUniqueInput
    data: XOR<EventMediaUpdateWithoutEventInput, EventMediaUncheckedUpdateWithoutEventInput>
  }

  export type EventMediaUpdateManyWithWhereWithoutEventInput = {
    where: EventMediaScalarWhereInput
    data: XOR<EventMediaUpdateManyMutationInput, EventMediaUncheckedUpdateManyWithoutEventInput>
  }

  export type EventMediaScalarWhereInput = {
    AND?: EventMediaScalarWhereInput | EventMediaScalarWhereInput[]
    OR?: EventMediaScalarWhereInput[]
    NOT?: EventMediaScalarWhereInput | EventMediaScalarWhereInput[]
    id?: IntFilter<"EventMedia"> | number
    eventId?: IntFilter<"EventMedia"> | number
    publicId?: StringFilter<"EventMedia"> | string
    videoUrl?: StringFilter<"EventMedia"> | string
    nombre?: StringFilter<"EventMedia"> | string
    tipo?: StringFilter<"EventMedia"> | string
    mesa?: IntNullableFilter<"EventMedia"> | number | null
    formato?: StringNullableFilter<"EventMedia"> | string | null
    duracion?: IntNullableFilter<"EventMedia"> | number | null
    createdAt?: DateTimeFilter<"EventMedia"> | Date | string
    updatedAt?: DateTimeFilter<"EventMedia"> | Date | string
  }

  export type EventCreateWithoutGuestsInput = {
    nombre: string
    fecha: Date | string
    locacion: string
    tipo: string
    salon: string
    cant_invitados: number
    coverImage?: string | null
    Estado?: $Enums.EventStatus
    porcentajeAsistencia?: number
    qrJobStatus?: $Enums.QrJobStatus
    qrGeneratedAt?: Date | string | null
    qrJobStartedAt?: Date | string | null
    qrJobFinishedAt?: Date | string | null
    qrJobError?: string | null
    qrJobTotal?: number | null
    qrJobProcessed?: number | null
    qrJobRequestedBy?: number | null
    invitationBaseImageUrl?: string | null
    invitationQrX?: number | null
    invitationQrY?: number | null
    invitationQrSize?: number | null
    checkedInCount?: number
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutEventsInput
    media?: EventMediaCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutGuestsInput = {
    id_evento?: number
    nombre: string
    fecha: Date | string
    locacion: string
    tipo: string
    salon: string
    cant_invitados: number
    coverImage?: string | null
    Estado?: $Enums.EventStatus
    porcentajeAsistencia?: number
    ownerId: number
    qrJobStatus?: $Enums.QrJobStatus
    qrGeneratedAt?: Date | string | null
    qrJobStartedAt?: Date | string | null
    qrJobFinishedAt?: Date | string | null
    qrJobError?: string | null
    qrJobTotal?: number | null
    qrJobProcessed?: number | null
    qrJobRequestedBy?: number | null
    invitationBaseImageUrl?: string | null
    invitationQrX?: number | null
    invitationQrY?: number | null
    invitationQrSize?: number | null
    checkedInCount?: number
    createdAt?: Date | string
    media?: EventMediaUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutGuestsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutGuestsInput, EventUncheckedCreateWithoutGuestsInput>
  }

  export type EventUpsertWithoutGuestsInput = {
    update: XOR<EventUpdateWithoutGuestsInput, EventUncheckedUpdateWithoutGuestsInput>
    create: XOR<EventCreateWithoutGuestsInput, EventUncheckedCreateWithoutGuestsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutGuestsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutGuestsInput, EventUncheckedUpdateWithoutGuestsInput>
  }

  export type EventUpdateWithoutGuestsInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    locacion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    salon?: StringFieldUpdateOperationsInput | string
    cant_invitados?: IntFieldUpdateOperationsInput | number
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    Estado?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    porcentajeAsistencia?: IntFieldUpdateOperationsInput | number
    qrJobStatus?: EnumQrJobStatusFieldUpdateOperationsInput | $Enums.QrJobStatus
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobFinishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobError?: NullableStringFieldUpdateOperationsInput | string | null
    qrJobTotal?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobRequestedBy?: NullableIntFieldUpdateOperationsInput | number | null
    invitationBaseImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invitationQrX?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrY?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrSize?: NullableIntFieldUpdateOperationsInput | number | null
    checkedInCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutEventsNestedInput
    media?: EventMediaUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutGuestsInput = {
    id_evento?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    locacion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    salon?: StringFieldUpdateOperationsInput | string
    cant_invitados?: IntFieldUpdateOperationsInput | number
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    Estado?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    porcentajeAsistencia?: IntFieldUpdateOperationsInput | number
    ownerId?: IntFieldUpdateOperationsInput | number
    qrJobStatus?: EnumQrJobStatusFieldUpdateOperationsInput | $Enums.QrJobStatus
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobFinishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobError?: NullableStringFieldUpdateOperationsInput | string | null
    qrJobTotal?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobRequestedBy?: NullableIntFieldUpdateOperationsInput | number | null
    invitationBaseImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invitationQrX?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrY?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrSize?: NullableIntFieldUpdateOperationsInput | number | null
    checkedInCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: EventMediaUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateWithoutMediaInput = {
    nombre: string
    fecha: Date | string
    locacion: string
    tipo: string
    salon: string
    cant_invitados: number
    coverImage?: string | null
    Estado?: $Enums.EventStatus
    porcentajeAsistencia?: number
    qrJobStatus?: $Enums.QrJobStatus
    qrGeneratedAt?: Date | string | null
    qrJobStartedAt?: Date | string | null
    qrJobFinishedAt?: Date | string | null
    qrJobError?: string | null
    qrJobTotal?: number | null
    qrJobProcessed?: number | null
    qrJobRequestedBy?: number | null
    invitationBaseImageUrl?: string | null
    invitationQrX?: number | null
    invitationQrY?: number | null
    invitationQrSize?: number | null
    checkedInCount?: number
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutEventsInput
    guests?: GuestCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutMediaInput = {
    id_evento?: number
    nombre: string
    fecha: Date | string
    locacion: string
    tipo: string
    salon: string
    cant_invitados: number
    coverImage?: string | null
    Estado?: $Enums.EventStatus
    porcentajeAsistencia?: number
    ownerId: number
    qrJobStatus?: $Enums.QrJobStatus
    qrGeneratedAt?: Date | string | null
    qrJobStartedAt?: Date | string | null
    qrJobFinishedAt?: Date | string | null
    qrJobError?: string | null
    qrJobTotal?: number | null
    qrJobProcessed?: number | null
    qrJobRequestedBy?: number | null
    invitationBaseImageUrl?: string | null
    invitationQrX?: number | null
    invitationQrY?: number | null
    invitationQrSize?: number | null
    checkedInCount?: number
    createdAt?: Date | string
    guests?: GuestUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutMediaInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutMediaInput, EventUncheckedCreateWithoutMediaInput>
  }

  export type EventUpsertWithoutMediaInput = {
    update: XOR<EventUpdateWithoutMediaInput, EventUncheckedUpdateWithoutMediaInput>
    create: XOR<EventCreateWithoutMediaInput, EventUncheckedCreateWithoutMediaInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutMediaInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutMediaInput, EventUncheckedUpdateWithoutMediaInput>
  }

  export type EventUpdateWithoutMediaInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    locacion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    salon?: StringFieldUpdateOperationsInput | string
    cant_invitados?: IntFieldUpdateOperationsInput | number
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    Estado?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    porcentajeAsistencia?: IntFieldUpdateOperationsInput | number
    qrJobStatus?: EnumQrJobStatusFieldUpdateOperationsInput | $Enums.QrJobStatus
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobFinishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobError?: NullableStringFieldUpdateOperationsInput | string | null
    qrJobTotal?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobRequestedBy?: NullableIntFieldUpdateOperationsInput | number | null
    invitationBaseImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invitationQrX?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrY?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrSize?: NullableIntFieldUpdateOperationsInput | number | null
    checkedInCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutEventsNestedInput
    guests?: GuestUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutMediaInput = {
    id_evento?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    locacion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    salon?: StringFieldUpdateOperationsInput | string
    cant_invitados?: IntFieldUpdateOperationsInput | number
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    Estado?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    porcentajeAsistencia?: IntFieldUpdateOperationsInput | number
    ownerId?: IntFieldUpdateOperationsInput | number
    qrJobStatus?: EnumQrJobStatusFieldUpdateOperationsInput | $Enums.QrJobStatus
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobFinishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobError?: NullableStringFieldUpdateOperationsInput | string | null
    qrJobTotal?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobRequestedBy?: NullableIntFieldUpdateOperationsInput | number | null
    invitationBaseImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invitationQrX?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrY?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrSize?: NullableIntFieldUpdateOperationsInput | number | null
    checkedInCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guests?: GuestUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyOwnerInput = {
    id_evento?: number
    nombre: string
    fecha: Date | string
    locacion: string
    tipo: string
    salon: string
    cant_invitados: number
    coverImage?: string | null
    Estado?: $Enums.EventStatus
    porcentajeAsistencia?: number
    qrJobStatus?: $Enums.QrJobStatus
    qrGeneratedAt?: Date | string | null
    qrJobStartedAt?: Date | string | null
    qrJobFinishedAt?: Date | string | null
    qrJobError?: string | null
    qrJobTotal?: number | null
    qrJobProcessed?: number | null
    qrJobRequestedBy?: number | null
    invitationBaseImageUrl?: string | null
    invitationQrX?: number | null
    invitationQrY?: number | null
    invitationQrSize?: number | null
    checkedInCount?: number
    createdAt?: Date | string
  }

  export type EventUpdateWithoutOwnerInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    locacion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    salon?: StringFieldUpdateOperationsInput | string
    cant_invitados?: IntFieldUpdateOperationsInput | number
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    Estado?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    porcentajeAsistencia?: IntFieldUpdateOperationsInput | number
    qrJobStatus?: EnumQrJobStatusFieldUpdateOperationsInput | $Enums.QrJobStatus
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobFinishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobError?: NullableStringFieldUpdateOperationsInput | string | null
    qrJobTotal?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobRequestedBy?: NullableIntFieldUpdateOperationsInput | number | null
    invitationBaseImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invitationQrX?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrY?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrSize?: NullableIntFieldUpdateOperationsInput | number | null
    checkedInCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guests?: GuestUpdateManyWithoutEventNestedInput
    media?: EventMediaUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutOwnerInput = {
    id_evento?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    locacion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    salon?: StringFieldUpdateOperationsInput | string
    cant_invitados?: IntFieldUpdateOperationsInput | number
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    Estado?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    porcentajeAsistencia?: IntFieldUpdateOperationsInput | number
    qrJobStatus?: EnumQrJobStatusFieldUpdateOperationsInput | $Enums.QrJobStatus
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobFinishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobError?: NullableStringFieldUpdateOperationsInput | string | null
    qrJobTotal?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobRequestedBy?: NullableIntFieldUpdateOperationsInput | number | null
    invitationBaseImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invitationQrX?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrY?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrSize?: NullableIntFieldUpdateOperationsInput | number | null
    checkedInCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guests?: GuestUncheckedUpdateManyWithoutEventNestedInput
    media?: EventMediaUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutOwnerInput = {
    id_evento?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    locacion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    salon?: StringFieldUpdateOperationsInput | string
    cant_invitados?: IntFieldUpdateOperationsInput | number
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    Estado?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    porcentajeAsistencia?: IntFieldUpdateOperationsInput | number
    qrJobStatus?: EnumQrJobStatusFieldUpdateOperationsInput | $Enums.QrJobStatus
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobFinishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrJobError?: NullableStringFieldUpdateOperationsInput | string | null
    qrJobTotal?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    qrJobRequestedBy?: NullableIntFieldUpdateOperationsInput | number | null
    invitationBaseImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invitationQrX?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrY?: NullableIntFieldUpdateOperationsInput | number | null
    invitationQrSize?: NullableIntFieldUpdateOperationsInput | number | null
    checkedInCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestCreateManyEventInput = {
    id?: number
    documento: string
    nombre: string
    apellido: string
    email?: string | null
    numero?: string | null
    mesa?: string | null
    status?: $Enums.GuestStatus
    cant_acompanantes?: number | null
    invitacionEnviada?: boolean
    video?: string | null
    foto?: string | null
    qrImageUrl?: string | null
    qrGeneratedAt?: Date | string | null
    qrHash: string
    checkInTime?: Date | string | null
  }

  export type EventMediaCreateManyEventInput = {
    id?: number
    publicId: string
    videoUrl: string
    nombre: string
    tipo: string
    mesa?: number | null
    formato?: string | null
    duracion?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GuestUpdateWithoutEventInput = {
    documento?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    mesa?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    cant_acompanantes?: NullableIntFieldUpdateOperationsInput | number | null
    invitacionEnviada?: BoolFieldUpdateOperationsInput | boolean
    video?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    qrImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrHash?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GuestUncheckedUpdateWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    documento?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    mesa?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    cant_acompanantes?: NullableIntFieldUpdateOperationsInput | number | null
    invitacionEnviada?: BoolFieldUpdateOperationsInput | boolean
    video?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    qrImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrHash?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GuestUncheckedUpdateManyWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    documento?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    mesa?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuestStatusFieldUpdateOperationsInput | $Enums.GuestStatus
    cant_acompanantes?: NullableIntFieldUpdateOperationsInput | number | null
    invitacionEnviada?: BoolFieldUpdateOperationsInput | boolean
    video?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    qrImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrHash?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventMediaUpdateWithoutEventInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    mesa?: NullableIntFieldUpdateOperationsInput | number | null
    formato?: NullableStringFieldUpdateOperationsInput | string | null
    duracion?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventMediaUncheckedUpdateWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    publicId?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    mesa?: NullableIntFieldUpdateOperationsInput | number | null
    formato?: NullableStringFieldUpdateOperationsInput | string | null
    duracion?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventMediaUncheckedUpdateManyWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    publicId?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    mesa?: NullableIntFieldUpdateOperationsInput | number | null
    formato?: NullableStringFieldUpdateOperationsInput | string | null
    duracion?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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