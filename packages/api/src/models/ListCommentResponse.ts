/* tslint:disable */
/* eslint-disable */
/**
 * DDD
 * Title
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    CommentResponse,
    CommentResponseFromJSON,
    CommentResponseFromJSONTyped,
    CommentResponseToJSON,
} from './';

/**
 * 
 * @export
 * @interface ListCommentResponse
 */
export interface ListCommentResponse {
    /**
     * 
     * @type {Array<CommentResponse>}
     * @memberof ListCommentResponse
     */
    comments?: Array<CommentResponse>;
}

export function ListCommentResponseFromJSON(json: any): ListCommentResponse {
    return ListCommentResponseFromJSONTyped(json, false);
}

export function ListCommentResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListCommentResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'comments': !exists(json, 'comments') ? undefined : ((json['comments'] as Array<any>).map(CommentResponseFromJSON)),
    };
}

export function ListCommentResponseToJSON(value?: ListCommentResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'comments': value.comments === undefined ? undefined : ((value.comments as Array<any>).map(CommentResponseToJSON)),
    };
}


