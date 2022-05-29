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
/**
 * 
 * @export
 * @interface CreateCommentRequest
 */
export interface CreateCommentRequest {
    /**
     * カラム名
     * @type {string}
     * @memberof CreateCommentRequest
     */
    description: string;
}

export function CreateCommentRequestFromJSON(json: any): CreateCommentRequest {
    return CreateCommentRequestFromJSONTyped(json, false);
}

export function CreateCommentRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateCommentRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': json['description'],
    };
}

export function CreateCommentRequestToJSON(value?: CreateCommentRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
    };
}

