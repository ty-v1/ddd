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
    TaskResponse,
    TaskResponseFromJSON,
    TaskResponseFromJSONTyped,
    TaskResponseToJSON,
} from './';

/**
 * 
 * @export
 * @interface ListTaskResponse
 */
export interface ListTaskResponse {
    /**
     * 
     * @type {Array<TaskResponse>}
     * @memberof ListTaskResponse
     */
    tasks: Array<TaskResponse>;
    /**
     * 
     * @type {number}
     * @memberof ListTaskResponse
     */
    total: number;
    /**
     * 
     * @type {number}
     * @memberof ListTaskResponse
     */
    todoCount: number;
    /**
     * 
     * @type {number}
     * @memberof ListTaskResponse
     */
    doingCount: number;
    /**
     * 
     * @type {number}
     * @memberof ListTaskResponse
     */
    doneCount: number;
}

export function ListTaskResponseFromJSON(json: any): ListTaskResponse {
    return ListTaskResponseFromJSONTyped(json, false);
}

export function ListTaskResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListTaskResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'tasks': ((json['tasks'] as Array<any>).map(TaskResponseFromJSON)),
        'total': json['total'],
        'todoCount': json['todoCount'],
        'doingCount': json['doingCount'],
        'doneCount': json['doneCount'],
    };
}

export function ListTaskResponseToJSON(value?: ListTaskResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'tasks': ((value.tasks as Array<any>).map(TaskResponseToJSON)),
        'total': value.total,
        'todoCount': value.todoCount,
        'doingCount': value.doingCount,
        'doneCount': value.doneCount,
    };
}


