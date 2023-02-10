import { ILike } from 'typeorm';
import { IHash } from '../interfaces/ihash.interface';
import { map, chain, each, transform } from 'lodash';

export const getCommonQueryForBuilder = (
  table: string,
  deleted: boolean,
  active: boolean,
) => {
  const _queries = [`${table}.deleted = :deleted`] as string[];
  const commonParams: IHash<any> = {
    deleted,
  };

  if (active !== null && active !== undefined) {
    _queries.push(`${table}.active = :active`);
    commonParams['active'] = active;
  }
  let commonQueries = _queries.join(' AND ');
  commonQueries = `(${commonQueries})`;
  console.log(commonQueries);
  return { commonQueries, commonParams };
};

export const getCommonQueryForBuilderTable = (
  table: string,
  deleted: boolean,
  active: boolean,
  status: boolean,
) => {
  const _queries = [
    `${table}.deleted = :deleted`,
    `${table}.active = :active`,
  ] as string[];

  const commonParams: IHash<any> = {
    deleted,
    active,
  };
  if (status !== null && status !== undefined) {
    _queries.push(`${table}.status = :status`);
    commonParams['status'] = status;
  }
  let commonQueries = _queries.join(' AND ');
  commonQueries = `(${commonQueries})`;
  console.log(commonQueries);
  return { commonQueries, commonParams };
};

export const createOrQueriesForBuilder = (search: string, fields: string[]) => {
  let querySql = null;
  let params = {};
  if (search) {
    const queries = map(fields, (field) => {
      return `${field}::text  ILIKE :query`;
    });
    params = {
      query: `%${search}%`,
    };
    querySql = queries.join(' OR ');
    querySql = `(${querySql})`;
  }
  return { querySql, params };
};

export const createOrQueriesForBuilderId = (
  search: string,
  fields: string[],
  searchId: string,
  fieldsId: string[],
) => {
  let querySql = null;
  let params = {};
  let queryIdSql = null;
  let paramsId = {};

  if (search) {
    const queries = map(fields, (field) => {
      return `${field}::text ILIKE :query `;
    });
    params = {
      query: `%${search}%`,
    };
    querySql = queries.join(' OR ');
    querySql = `(${querySql})`;
  }
  if (searchId) {
    const queries = map(fieldsId, (field) => {
      return `${field} = :queryId`;
    });
    paramsId = {
      queryId: searchId,
    };
    queryIdSql = queries.join(' OR ');
    queryIdSql = `(${queryIdSql})`;
  }
  return { querySql, params, queryIdSql, paramsId };
};

export const createFilterParamsForBuilder = (params: any) => {
  const fields = Object.keys(params);
  const filterSql = chain(fields)
    .map((field) => `"${field}"::text ILIKE :${field}`)
    .join(' AND ')
    .value();
  const filterParams = transform(params, (r, v, k) => {
    r[k] = `%${v}%`;
  });
  return { filterSql, filterParams };
};

export const createExactMatchFilterParamsForBuilder = (params: any) => {
  const fields = Object.keys(params);
  let filterSql = null;
  let filterParams = null;
  filterSql = chain(fields)
    .filter((e) => {
      return e !== null && e !== undefined;
    })
    .map((field) => `"${field}"::text = :${field}`)
    .join(' AND ')
    .value();
  filterParams = transform(params, (r, v, k) => {
    r[k] = `${v}`;
  });
  return { filterSql, filterParams };
};

export const createOrQueries = (query: string, fields, commonQuery) => {
  const _query = map(fields, (field) => {
    const _q = {};
    _q[field] = ILike(`%${query}%`);
    return { ...commonQuery, ...(query && { ..._q }) };
  });
  return _query;
};

export const createOrderForBuilder = (
  table: string,
  sortBy: string,
  orderBy: string,
) => {
  sortBy = sortBy || `createdAt`;
  orderBy = orderBy || 'DESC';
  let _order = {};
  _order[`${table}.${sortBy}`] = orderBy;
  if (sortBy.indexOf(',') !== -1) {
    const fields = sortBy.split(',');
    _order = {};
    each(fields, (field) => {
      _order[`${table}.${field}`] = orderBy;
    });
  }

  return _order;
};

export const createOrder = (sortBy: string, orderBy: string) => {
  orderBy = orderBy || 'DESC';
  sortBy = sortBy || 'createdAt';
  const _order = {};
  _order[sortBy] = orderBy;
  return _order;
};

export const calculatePaging = (page: number, size: number) => {
  page = page || 1;
  size = size || 10;
  const limit = size;
  const skip = (page - 1) * limit;
  return { skip, limit };
};
