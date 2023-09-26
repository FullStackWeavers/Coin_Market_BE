declare module 'express' {
  interface Request {
    logout: () => void;
  }

  interface Response {
    redirect: (url: string) => void;
  }
}
