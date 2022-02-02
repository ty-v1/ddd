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
 * @interface MoveTaskRequest
 */
export interface MoveTaskRequest {
    /**
     * 移動先のカラムのID
     * @type {string}
     * @memberof MoveTaskRequest
     */
    columnId: string;
    /**
     * 移動先での位置
     * top, bottom, after:<id>のいずれか
     * @type {string}
     * @memberof MoveTaskRequest
     */
    position: string;
}

export function MoveTaskRequestFromJSON(json: any): MoveTaskRequest {
    return MoveTaskRequestFromJSONTyped(json, false);
}

export function MoveTaskRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): MoveTaskRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'columnId': json['columnId'],
        'position': json['position'],
    };
}

export function MoveTaskRequestToJSON(value?: MoveTaskRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'columnId': value.columnId,
        'position': value.position,
    };
}


