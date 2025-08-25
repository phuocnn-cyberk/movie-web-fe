export const ROUTES = {
  // Main routes
  home: "/",
  moviesShows: "/movies-shows",
  subscriptions: "/subscriptions",
  support: "/support",
  notifications: "/notifications",
  favorites: "/favorites",

  // User routes
  profile: "/profile",
  accountManagement: "/account-management",

  // Auth routes
  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",

  // Movie routes
  movieDetail: (movieId: number) => `/movie/${movieId}`,
} as const;