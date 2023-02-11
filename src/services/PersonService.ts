import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";
import Person from "../models/Person";
import getResponse from "./getResponse";

export interface FetchPeopleListResponse {
  list: Array<Person>;
  count: number;
}

class PersonService {
  // @todo: replace url with variable
  private url = `http://localhost:3000/api/people`;

  public fetchPeopleList(page: number, perPage: number, query: string): Observable<FetchPeopleListResponse> {
    return ajax<FetchPeopleListResponse>({
      method: "GET",
      url: `${ this.url }?page=${ page }&perPage=${ perPage }&query=${ query }`,
    }).pipe(
      map(getResponse),
    );
  }

  public deletePerson(id: number): Observable<any> {
    return ajax({
      method: "DELETE",
      url: `${ this.url }/${ id }`,
    }).pipe(
      map(getResponse),
    );
  }

  public updatePerson(person: Person): Observable<Person> {
    return ajax<Person>({
      method: "PUT",
      url: `${ this.url }/${ person.id }`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).pipe(
      map(getResponse),
    );
  }

  public createPerson(person: Omit<Person, 'id'>): Observable<Person> {
    return ajax<Person>({
      method: "POST",
      url: `${ this.url }`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).pipe(
      map(getResponse),
    );
  }
}

export default new PersonService();
