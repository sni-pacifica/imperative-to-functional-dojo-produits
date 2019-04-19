import { of, Observable } from "rxjs";
import { delay } from "rxjs/operators";

export class PriceService {

  priceForRef = (ref: string): Observable<number> => of(Math.random() * 10);
  
  // priceForRef = (ref: string): Observable<number> => of(Math.random() * 10).pipe(delay(100));

}