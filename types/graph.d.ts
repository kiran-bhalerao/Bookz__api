export const typeDefs = ["directive @authenticated on FIELD_DEFINITION\n\nscalar Date\n\ninput SellerInput {\n  name: String!\n  url: String\n  price: String\n}\n\ntype Seller {\n  name: String!\n  url: String\n  price: String\n}\n\ntype Book {\n  id: String!\n  user: User!\n  title: String!\n  description: String\n  verified: Boolean!\n  author: String\n  publisher: String\n  photos: [String]\n  pages: Int\n  language: String\n  isbn10: String\n  isbn13: String\n  publishDate: Date\n  sellers: [Seller]\n}\n\ntype Comment {\n  id: String!\n  comment: String!\n  bookId: String!\n  reviewId: String!\n  user: User!\n  likes: [User]\n  dislikes: [User]\n}\n\ntype Review {\n  id: String!\n  book: Book!\n  user: User!\n  title: String!\n  description: String!\n  rating: Int!\n  upvotes: [User]\n  approved: Boolean!\n}\n\nenum Role {\n  ADMIN\n  MEMBER\n  CONTRIBUTOR\n}\n\ntype User {\n  id: String!\n  email: String!\n  name: String!\n  role: Role!\n  photo: String\n  about: String\n  wishlist: [Book]\n}\n\ntype CreateBookResponse {\n  message: String!\n  book: Book\n}\n\ntype Mutation {\n  CreateBook(title: String!, description: String, author: String, publisher: String, photos: [String], pages: Int, language: String, isbn10: String, isbn13: String, publishDate: Date, sellers: [SellerInput]): CreateBookResponse! @authenticated\n  DeleteBook(bookId: String): DeleteBookResponse!\n  UnWishlistBook(bookId: String!): UnWishlistBookResponse!\n  UpdateBook(bookId: String!, update: UpdateBookInputs!, options: UpdateBookOptions): Book @authenticated\n  WishlistBook(bookId: String!): WishlistBookResponse! @authenticated\n  CommentReview(comment: String!, reviewId: String!): Comment @authenticated\n  DeleteComment(commentId: String!): DeleteCommentResponse! @authenticated\n  DislikeComment(commentId: String!): DislikeCommentResponse! @authenticated\n  LikeComment(commentId: String!): LikeCommentResponse! @authenticated\n  UpdateComment(commentId: String!, updates: UpdateCommentUpdate!): Comment @authenticated\n  DeleteReview(reviewId: String!): DeleteReviewResponse! @authenticated\n  ReviewBook(bookId: String!, title: String!, description: String!, rating: Int!): ReviewBookResponse! @authenticated\n  UpdateReview(reviewId: String!, update: UpdateReviewInputs!): UpdateReviewResponse!\n  UpvoteReview(reviewId: String!): UpvoteReviewResponse! @authenticated\n  Login(email: String!, password: String!): LoginResponse!\n  Signup(email: String!, password: String!, name: String!): SignupResponse!\n  UpdateProfile(name: String, photo: String, about: String, password: String): User! @authenticated\n}\n\ntype DeleteBookResponse {\n  message: String!\n}\n\ntype Query {\n  GetBook(bookId: String!): Book\n  GetProfile: User @authenticated\n  GetUser(userId: String!): GetUserResponse\n}\n\ntype UnWishlistBookResponse {\n  message: String!\n  success: Boolean!\n}\n\ninput UpdateBookInputs {\n  title: String\n  description: String\n  author: String\n  publisher: String\n  photos: [String]\n  pages: Int\n  language: String\n  isbn10: String\n  isbn13: String\n  publishDate: Date\n  sellers: [SellerInput]\n}\n\ninput UpdateBookOptions {\n  appendSellers: Boolean\n}\n\ntype WishlistBookResponse {\n  message: String!\n  success: Boolean!\n}\n\ntype DeleteCommentResponse {\n  message: String!\n  success: Boolean!\n}\n\ntype DislikeCommentResponse {\n  message: String!\n  comment: Comment\n}\n\ntype LikeCommentResponse {\n  message: String!\n  comment: Comment\n}\n\ninput UpdateCommentUpdate {\n  comment: String!\n}\n\ntype DeleteReviewResponse {\n  message: String\n  success: Boolean\n}\n\ntype ReviewBookResponse {\n  message: String!\n  review: Review\n}\n\ntype UpdateReviewResponse {\n  message: String!\n  review: Review\n}\n\ninput UpdateReviewInputs {\n  title: String\n  description: String\n  rating: Int\n}\n\ntype UpvoteReviewResponse {\n  message: String!\n  isUpvoted: Boolean!\n}\n\ntype GetUserResponse {\n  id: String\n  name: String\n  role: Role\n  about: String\n  photo: String\n}\n\ntype LoginResponse {\n  message: String\n  token: String\n}\n\ntype SignupResponse {\n  message: String!\n  token: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetBook: Book | null;
  GetProfile: User | null;
  GetUser: GetUserResponse | null;
}

export interface GetBookQueryArgs {
  bookId: string;
}

export interface GetUserQueryArgs {
  userId: string;
}

export interface Book {
  id: string;
  user: User;
  title: string;
  description: string | null;
  verified: boolean;
  author: string | null;
  publisher: string | null;
  photos: Array<string> | null;
  pages: number | null;
  language: string | null;
  isbn10: string | null;
  isbn13: string | null;
  publishDate: Date | null;
  sellers: Array<Seller> | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  photo: string | null;
  about: string | null;
  wishlist: Array<Book> | null;
}

export type Role = "ADMIN" | "MEMBER" | "CONTRIBUTOR";

export type Date = any;

export interface Seller {
  name: string;
  url: string | null;
  price: string | null;
}

export interface GetUserResponse {
  id: string | null;
  name: string | null;
  role: Role | null;
  about: string | null;
  photo: string | null;
}

export interface Mutation {
  CreateBook: CreateBookResponse;
  DeleteBook: DeleteBookResponse;
  UnWishlistBook: UnWishlistBookResponse;
  UpdateBook: Book | null;
  WishlistBook: WishlistBookResponse;
  CommentReview: Comment | null;
  DeleteComment: DeleteCommentResponse;
  DislikeComment: DislikeCommentResponse;
  LikeComment: LikeCommentResponse;
  UpdateComment: Comment | null;
  DeleteReview: DeleteReviewResponse;
  ReviewBook: ReviewBookResponse;
  UpdateReview: UpdateReviewResponse;
  UpvoteReview: UpvoteReviewResponse;
  Login: LoginResponse;
  Signup: SignupResponse;
  UpdateProfile: User;
}

export interface CreateBookMutationArgs {
  title: string;
  description: string | null;
  author: string | null;
  publisher: string | null;
  photos: Array<string> | null;
  pages: number | null;
  language: string | null;
  isbn10: string | null;
  isbn13: string | null;
  publishDate: Date | null;
  sellers: Array<SellerInput> | null;
}

export interface DeleteBookMutationArgs {
  bookId: string | null;
}

export interface UnWishlistBookMutationArgs {
  bookId: string;
}

export interface UpdateBookMutationArgs {
  bookId: string;
  update: UpdateBookInputs;
  options: UpdateBookOptions | null;
}

export interface WishlistBookMutationArgs {
  bookId: string;
}

export interface CommentReviewMutationArgs {
  comment: string;
  reviewId: string;
}

export interface DeleteCommentMutationArgs {
  commentId: string;
}

export interface DislikeCommentMutationArgs {
  commentId: string;
}

export interface LikeCommentMutationArgs {
  commentId: string;
}

export interface UpdateCommentMutationArgs {
  commentId: string;
  updates: UpdateCommentUpdate;
}

export interface DeleteReviewMutationArgs {
  reviewId: string;
}

export interface ReviewBookMutationArgs {
  bookId: string;
  title: string;
  description: string;
  rating: number;
}

export interface UpdateReviewMutationArgs {
  reviewId: string;
  update: UpdateReviewInputs;
}

export interface UpvoteReviewMutationArgs {
  reviewId: string;
}

export interface LoginMutationArgs {
  email: string;
  password: string;
}

export interface SignupMutationArgs {
  email: string;
  password: string;
  name: string;
}

export interface UpdateProfileMutationArgs {
  name: string | null;
  photo: string | null;
  about: string | null;
  password: string | null;
}

export interface SellerInput {
  name: string;
  url: string | null;
  price: string | null;
}

export interface CreateBookResponse {
  message: string;
  book: Book | null;
}

export interface DeleteBookResponse {
  message: string;
}

export interface UnWishlistBookResponse {
  message: string;
  success: boolean;
}

export interface UpdateBookInputs {
  title: string | null;
  description: string | null;
  author: string | null;
  publisher: string | null;
  photos: Array<string> | null;
  pages: number | null;
  language: string | null;
  isbn10: string | null;
  isbn13: string | null;
  publishDate: Date | null;
  sellers: Array<SellerInput> | null;
}

export interface UpdateBookOptions {
  appendSellers: boolean | null;
}

export interface WishlistBookResponse {
  message: string;
  success: boolean;
}

export interface Comment {
  id: string;
  comment: string;
  bookId: string;
  reviewId: string;
  user: User;
  likes: Array<User> | null;
  dislikes: Array<User> | null;
}

export interface DeleteCommentResponse {
  message: string;
  success: boolean;
}

export interface DislikeCommentResponse {
  message: string;
  comment: Comment | null;
}

export interface LikeCommentResponse {
  message: string;
  comment: Comment | null;
}

export interface UpdateCommentUpdate {
  comment: string;
}

export interface DeleteReviewResponse {
  message: string | null;
  success: boolean | null;
}

export interface ReviewBookResponse {
  message: string;
  review: Review | null;
}

export interface Review {
  id: string;
  book: Book;
  user: User;
  title: string;
  description: string;
  rating: number;
  upvotes: Array<User> | null;
  approved: boolean;
}

export interface UpdateReviewInputs {
  title: string | null;
  description: string | null;
  rating: number | null;
}

export interface UpdateReviewResponse {
  message: string;
  review: Review | null;
}

export interface UpvoteReviewResponse {
  message: string;
  isUpvoted: boolean;
}

export interface LoginResponse {
  message: string | null;
  token: string | null;
}

export interface SignupResponse {
  message: string;
  token: string | null;
}
