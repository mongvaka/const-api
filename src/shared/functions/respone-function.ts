import { BasicResponseDto, Pageable } from "../basics/basic-response.dto";
import { BasicsearchDto } from "../basics/basic-search.dto";

export function getRespones(data: any[], dto: BasicsearchDto) {
    const result = new BasicResponseDto();
    const count = data.length
    const limit = dto.limit ?? 10
    const empty = data.length == 0
    result.content = data;
    result.empty = count == 0;
    result.first = dto.offset == 1;
    result.last = true;
    result.numberOfElements = 0;
    result.totalPages = Math.ceil(count / limit);
    result.number = dto.offset
    result.pageable = new Pageable()
    result.pageable.sort = {
      empty,
      sorted: true,
      unsorted: false
    }
    result.pageable.offset = dto.offset
    result.pageable.pageNumber = dto.offset
    result.pageable.pageSize = dto.limit
    result.pageable.paged = true
    result.pageable.unpaged = false
    return result
  }