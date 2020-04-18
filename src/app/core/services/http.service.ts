import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ISignupDetails } from '../interface/signup-details.interface';
import { ILoginDetails } from '../interface/login-details.interface';
import { AuthService } from './auth.service';
import { Article } from '../article';
import { IArticle, IArticlesList } from '../interface/article.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITag } from '../interface/tag.interface';
import { IProfile } from '../interface/profile.interface';
import { IUser } from '../interface/user.interface';
import { ErrorClass } from '../error.class';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, public authService: AuthService) { }

  getGlobalFeed(): Observable<{articles: IArticlesList}> {
    return this.http.get<{articles: IArticlesList}> ('https://eblog-api.encentrals.com/api/articles');
  }

  getUserFeed(): Observable<{articles: IArticlesList}> {
    return this.http.get<{articles: IArticlesList}>('https://eblog-api.encentrals.com/api/articles/feed');
  }

  getUser(): Observable<{user: IUser}> {
    return this.http.get<{user: IUser}>('https://eblog-api.encentrals.com/api/user');
  }

  updateUser(userDetails): Observable<{user: IUser}> {
    const user = {user: userDetails};
    console.log(user);
    return this.http.put<{user: IUser}>('https://eblog-api.encentrals.com/api/user', user);
  }

  getSingleArticle(slug): Observable<{article: IArticle}> {
    return this.http.get<{article: IArticle}>(`https://eblog-api.encentrals.com/api/articles/${slug}`);
  }

  createArticle(form) {
    const article = {article: new Article(form.title, form.description, form.body, form.tags)};
    return this.http.post('https://eblog-api.encentrals.com/api/articles', article);
  }
  updateArticle(form, slug) {
    const article = {article: new Article(form.title, form.description, form.body, form.tags)};
    return this.http.put(`https://eblog-api.encentrals.com/api/articles/${slug}`, article);
  }

  deleteArticle(slug) {
    return this.http.delete(`https://eblog-api.encentrals.com/api/articles/${slug}`);
  }

  getTags(): Observable<{tags: ITag}> {
    return this.http.get<{tags: ITag}>('https://eblog-api.encentrals.com/api/tags');
  }

  getUserProfile(username): Observable<{profile: IProfile}> {
    return this.http.get<{profile: IProfile}>(`https://eblog-api.encentrals.com/api/profiles/${username}`);
  }

  getUserArticles(username): Observable<{articles: IArticlesList}> {
    return this.http.get<{articles: IArticlesList}>(`https://eblog-api.encentrals.com/api/articles?author=${username}`);
  }

  getUserFavoriteArticles(username): Observable<{articles: IArticlesList}> {
    return this.http.get<{articles: IArticlesList}>(`https://eblog-api.encentrals.com/api/articles?favorited=${username}`);
  }

  favoriteArticle(slug: string) {
    return this.http.post(`https://eblog-api.encentrals.com/api/articles/${slug}/favorite`, '' );
  }

  unFavoriteArticle(slug: string) {
    return this.http.delete(`https://eblog-api.encentrals.com/api/articles/${slug}/favorite`);
  }

  getArticlesByTag(tag): Observable<{articles: IArticlesList}> {
    return this.http.get<{articles: IArticlesList}>(`https://eblog-api.encentrals.com/api/articles?tag=${tag}`);
  }

  signUp(signUpDetails: ISignupDetails): Observable<{user: IUser} | ErrorClass> {
    const user = {user: signUpDetails};
    return this.http.post<{user: IUser}>(`https://eblog-api.encentrals.com/api/users`, user)
    .pipe(
      catchError((error: HttpErrorResponse) => this.handleHttpError(error))
    );
  }

  logIn(loginDetails: ILoginDetails): Observable<{user: IUser} | ErrorClass> {
    const user = {user: loginDetails};
    return this.http.post<{user: IUser}>(`https://eblog-api.encentrals.com/api/users/login`, user)
    .pipe(
      catchError((error: HttpErrorResponse) => this.handleHttpError(error))
    );
  }

  followUser(username) {
    return this.http.post(`https://eblog-api.encentrals.com/api/profiles/${username}/follow`, '' );
  }
  unfollowUser(username) {
    return this.http.delete(`https://eblog-api.encentrals.com/api/profiles/${username}/follow`);
  }
private handleHttpError(error) {
  if (error.status === 422) {
    const errorMessage = new ErrorClass();
    errorMessage.message = error.error.errors.body[0];
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
}

