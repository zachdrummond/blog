import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Author as AuthorModel, Post as PostModel, Role } from '@prisma/client';
import { GraphQLContext } from '../src/server.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = undefined | T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date; output: Date; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  author?: Maybe<Author>;
  token?: Maybe<Scalars['String']['output']>;
};

export type Author = {
  __typename?: 'Author';
  author_id: Scalars['Int']['output'];
  date_created: Scalars['Date']['output'];
  date_updated: Scalars['Date']['output'];
  email?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Post>>;
  role: Role;
  username: Scalars['String']['output'];
};

export type Feed = {
  __typename?: 'Feed';
  items: Array<Post>;
  total: Scalars['Int']['output'];
};

export enum IncrementType {
  Like = 'LIKE',
  Share = 'SHARE',
  View = 'VIEW'
}

export type Mutation = {
  __typename?: 'Mutation';
  addPost: Post;
  deleteAuthor: Author;
  deletePost: Post;
  incrementPost: Post;
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
  updateAuthor: Author;
  updatePost: Post;
};


export type MutationAddPostArgs = {
  categories: Array<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};


export type MutationDeleteAuthorArgs = {
  author_id?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeletePostArgs = {
  post_id?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationIncrementPostArgs = {
  post_id: Scalars['Int']['input'];
  type: IncrementType;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateAuthorArgs = {
  author_id: Scalars['Int']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdatePostArgs = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  post_id: Scalars['Int']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  author: Author;
  author_id: Scalars['Int']['output'];
  categories: Array<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  date_created: Scalars['Date']['output'];
  date_updated: Scalars['Date']['output'];
  likes?: Maybe<Scalars['Int']['output']>;
  post_id: Scalars['Int']['output'];
  published: Scalars['Boolean']['output'];
  shares?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  views?: Maybe<Scalars['Int']['output']>;
};

export type PostOrderBy = {
  date_created?: InputMaybe<Sort>;
  date_updated?: InputMaybe<Sort>;
  likes?: InputMaybe<Sort>;
  shares?: InputMaybe<Sort>;
  title?: InputMaybe<Sort>;
  views?: InputMaybe<Sort>;
};

export type Query = {
  __typename?: 'Query';
  getAuthors: Array<Author>;
  getPosts: Feed;
};


export type QueryGetAuthorsArgs = {
  author_ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  emails?: InputMaybe<Array<Scalars['String']['input']>>;
  role?: InputMaybe<Role>;
  usernames?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryGetPostsArgs = {
  author_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  order_by?: InputMaybe<PostOrderBy>;
  post_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  titles?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum Role {
  Admin = 'ADMIN',
  Author = 'AUTHOR'
}

export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, 'author'> & { author?: Maybe<ResolversTypes['Author']> }>;
  Author: ResolverTypeWrapper<AuthorModel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Feed: ResolverTypeWrapper<Omit<Feed, 'items'> & { items: Array<ResolversTypes['Post']> }>;
  IncrementType: IncrementType;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<PostModel>;
  PostOrderBy: PostOrderBy;
  Query: ResolverTypeWrapper<{}>;
  Role: ResolverTypeWrapper<Role>;
  Sort: Sort;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthPayload: Omit<AuthPayload, 'author'> & { author?: Maybe<ResolversParentTypes['Author']> };
  Author: AuthorModel;
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  Feed: Omit<Feed, 'items'> & { items: Array<ResolversParentTypes['Post']> };
  Int: Scalars['Int']['output'];
  Mutation: {};
  Post: PostModel;
  PostOrderBy: PostOrderBy;
  Query: {};
  String: Scalars['String']['output'];
}>;

export type AuthDirectiveArgs = {
  requires?: Maybe<Role>;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = GraphQLContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthPayloadResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = ResolversObject<{
  author_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  date_created?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  date_updated?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FeedResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Feed'] = ResolversParentTypes['Feed']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationAddPostArgs, 'categories' | 'content' | 'title'>>;
  deleteAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, Partial<MutationDeleteAuthorArgs>>;
  deletePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, Partial<MutationDeletePostArgs>>;
  incrementPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationIncrementPostArgs, 'post_id' | 'type'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  signup?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'first_name' | 'last_name' | 'password' | 'username'>>;
  updateAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationUpdateAuthorArgs, 'author_id'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'post_id'>>;
}>;

export type PostResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  author_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date_created?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  date_updated?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  post_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shares?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  views?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAuthors?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType, Partial<QueryGetAuthorsArgs>>;
  getPosts?: Resolver<ResolversTypes['Feed'], ParentType, ContextType, Partial<QueryGetPostsArgs>>;
}>;

export type RoleResolvers = EnumResolverSignature<{ ADMIN?: any, AUTHOR?: any }, ResolversTypes['Role']>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Author?: AuthorResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Feed?: FeedResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers;
}>;

export type DirectiveResolvers<ContextType = GraphQLContext> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
}>;
