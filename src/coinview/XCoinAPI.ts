/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as CryptoJS from 'crypto-js';
import request from 'request';

class XCoinAPI {
  private apiUrl: string = 'https://api.bithumb.com';
  private api_key: string;
  private api_secret: string;

  constructor(api_key: string, api_secret: string) {
    this.api_key = api_key;
    this.api_secret = api_secret;
  }

  public xcoinApiCall(endPoint: string, params?: any): Promise<any> {
    const rgParams: any = {
      endPoint: endPoint,
    };

    if (params) {
      for (const o in params) {
        rgParams[o] = params[o];
      }
    }

    const api_host: string = this.apiUrl + endPoint;
    const httpHeaders: any = this._getHttpHeaders(
      endPoint,
      rgParams,
      this.api_key,
      this.api_secret,
    );

    const options: request.OptionsWithUrl = {
      method: 'POST',
      url: api_host,
      headers: httpHeaders,
      form: rgParams,
    };

    return new Promise((resolve, reject) => {
      request(options, (error, response, _body) => {
        if (!error && response.statusCode == 200) {
          resolve(response);
        } 
        else {
          reject(error);
        }
      });
    });
  }

  private _getHttpHeaders(
    endPoint: string,
    rgParams: any,
    api_key: string,
    api_secret: string,
  ): any {
    const strData: string = this.http_build_query(rgParams);
    const nNonce: number = this.usecTime();
    return {
      'Api-Key': api_key,
      'Api-Sign': this.base64_encode(
        CryptoJS.HmacSHA512(
          endPoint + '\x00' + strData + '\x00' + nNonce,
          api_secret,
        ).toString(),
      ),
      'Api-Nonce': nNonce,
    };
  }

  private usecTime(): number {
    const rgMicrotime: string[] = this.microtime().split(' ');
    const usec: string = rgMicrotime[0];
    const sec: string = rgMicrotime[1];
    return Number(sec + usec.substr(2, 3));
  }

  private microtime(get_as_float?: boolean): any {
    const now: number = new Date().getTime() / 1000;
    const s: number = parseInt(now.toString(), 10);

    return get_as_float ? now : Math.round((now - s) * 1000) / 1000 + ' ' + s;
  }

  private http_build_query(obj: any): string {
    const output_string: string[] = [];
    Object.keys(obj).forEach((val) => {
      let key: string = val;
      key = encodeURIComponent(key.replace(/[!'()*]/g, escape));

      if (typeof obj[val] === 'object') {
        const query: string = this.http_build_query(obj[val]);
        output_string.push(query);
      } else {
        const value: string = encodeURIComponent(
          obj[val].replace(/[!'()*]/g, escape),
        );
        output_string.push(key + '=' + value);
      }
    });

    return output_string.join('&');
  }

  private base64_encode(data: string): string {
    const b64: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let o1: number,
      o2: number,
      o3: number,
      h1: number,
      h2: number,
      h3: number,
      h4: number,
      bits: number,
      i: number = 0,
      ac: number = 0,
      enc: string = '',
      tmp_arr: string[] = [];

    if (!data) {
      return data;
    }

    do {
      o1 = data.charCodeAt(i++);
      o2 = data.charCodeAt(i++);
      o3 = data.charCodeAt(i++);

      bits = (o1 << 16) | (o2 << 8) | o3;

      h1 = (bits >> 18) & 0x3f;
      h2 = (bits >> 12) & 0x3f;
      h3 = (bits >> 6) & 0x3f;
      h4 = bits & 0x3f;

      tmp_arr[ac++] =
        b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    const r: number = data.length % 3;

    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
  }
}

export { XCoinAPI };
