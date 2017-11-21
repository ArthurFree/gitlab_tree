import { Param } from './common'

export interface GetTopicParam extends Param {
    page?: number;
    limit?: number;
    tab?: 'ask' | 'share' | 'job' | 'good';
    mdrender?: boolean;
}
