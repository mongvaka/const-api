import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicResponseDto } from 'src/shared/basics/basic-response.dto';
import { BasicsearchDto } from 'src/shared/basics/basic-search.dto';
import {
  getCommonQueryForBuilder,
  createOrderForBuilder,
  calculatePaging,
} from 'src/shared/helpers/typeorm-query.helper';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const en: Category = {
      ...createCategoryDto,
      createdBy: '',
      id: undefined,
    };    
    return this.categoriesRepository.save(this.categoriesRepository.create(en));
  }

  async findAll(search: BasicsearchDto) {
    const { page, size, query, active, deleted, sortBy, orderBy } = search;
    const { commonQueries, commonParams } = getCommonQueryForBuilder(
      'category',
      deleted,
      active,
    );
    const _order = createOrderForBuilder('category', sortBy, orderBy);
    const { skip, limit } = calculatePaging(page, size);
    const builder = this.categoriesRepository.createQueryBuilder('category');


    builder.where(commonQueries, commonParams);
    if(search.text){
      builder.andWhere('(category.code LIKE :text OR category.name LIKE :text)',{text:`%${search.text}%`})
    }
    
    const [data, count] = await builder
      .orderBy({ ..._order })
      .addOrderBy('category.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    const result = new BasicResponseDto();
    result.currentPage = page;
    result.total = count;
    result.perPage = limit;
    result.success = true;
    result.error = [];
    result.totalPage = Math.ceil(count / limit);
    result.data = data;
    return result;
  }

  findOne(id: number) {
    return this.categoriesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    let en: Category = await this.categoriesRepository.findOne({
      where: { id },
    });
    en = {
      ...en,
      ...updateCategoryDto,
    };    
    return this.categoriesRepository.update(id,en);
  }

  async remove(id: number) {    
    return this.categoriesRepository.save(
      await this.categoriesRepository.softRemove(
        await this.categoriesRepository.findOne({ where: { id:id } }),
      ),
    );
  }
}
