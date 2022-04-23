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
    ProjectResponse,
    ProjectResponseFromJSON,
    ProjectResponseFromJSONTyped,
    ProjectResponseToJSON,
} from './';

/**
 * 
 * @export
 * @interface ListProjectResponse
 */
export interface ListProjectResponse {
    /**
     * 
     * @type {Array<ProjectResponse>}
     * @memberof ListProjectResponse
     */
    projects?: Array<ProjectResponse>;
}

export function ListProjectResponseFromJSON(json: any): ListProjectResponse {
    return ListProjectResponseFromJSONTyped(json, false);
}

export function ListProjectResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListProjectResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'projects': !exists(json, 'projects') ? undefined : ((json['projects'] as Array<any>).map(ProjectResponseFromJSON)),
    };
}

export function ListProjectResponseToJSON(value?: ListProjectResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'projects': value.projects === undefined ? undefined : ((value.projects as Array<any>).map(ProjectResponseToJSON)),
    };
}

